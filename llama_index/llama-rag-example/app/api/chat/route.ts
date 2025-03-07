import { initObservability } from "@/app/observability";
import { LlamaIndexAdapter, Message, StreamData } from "ai";
import { ChatMessage, Settings, extractText } from "llamaindex";
import { NextRequest, NextResponse } from "next/server";
import { createChatEngine } from "./engine/chat";
import { initSettings } from "./engine/settings";
import {
  isValidMessages,
  retrieveDocumentIds,
  retrieveMessageContent,
} from "./llamaindex/streaming/annotations";
import { createCallbackManager } from "./llamaindex/streaming/events";
import { generateNextQuestions } from "./llamaindex/streaming/suggestion";
import { encodingForModel } from "js-tiktoken";

initObservability();
initSettings();
const encoding = encodingForModel("gpt-4o-mini");
let tokenCount = 0;

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

Settings.callbackManager.on("llm-start", (event) => {
  console.log("llm-start:", event.detail.messages);
});

Settings.callbackManager.on("llm-end", (event) => {
  console.log("llm-end:", event.detail.response.message);
});

Settings.callbackManager.on("llm-start", (event) => {
  const { messages } = event.detail;
  messages.reduce((count: number, message: ChatMessage) => {
    return count + encoding.encode(extractText(message.content)).length;
  }, 0);
  console.log("llm-start: Token count:", tokenCount);
  // https://openai.com/pricing
  // $10.00 / 1M tokens
  // console.log(`Total Price: $${(tokenCount / 1_000_000) * 10}`);
});

Settings.callbackManager.on("llm-stream", (event) => {
  const { chunk } = event.detail;
  const { delta } = chunk;
  tokenCount += encoding.encode(extractText(delta)).length;
  console.log("llm-stream : Token count:", tokenCount);
  // if (tokenCount > 20) {
  //   // This is just an example, you can set your own limit or handle it differently
  //   throw new Error("Token limit exceeded!");
  // }
});
Settings.callbackManager.on("llm-end", () => {
  // https://openai.com/pricing
  // $30.00 / 1M tokens
  console.log("Token count:", tokenCount);
  // console.log(`Total Price: $${(tokenCount / 1_000_000) * 30}`);
});

// Settings.callbackManager.on("llm-stream", (event) => {
//   console.log("llm-stream:", event.detail);
// });

Settings.callbackManager.on("query-start", (event) => {
  console.log("query-start:", event.detail);
});

Settings.callbackManager.on("query-end", (event) => {
  console.log("query-end:", event.detail);
});

Settings.callbackManager.on("agent-start", (event) => {
  console.log("agent-start:", event.detail);
});

Settings.callbackManager.on("agent-end", (event) => {
  console.log("agent-end:", event.detail);
});

Settings.callbackManager.on("retrieve-start", (event) => {
  console.log("retrieve-start:", event.detail);
});

Settings.callbackManager.on("retrieve-end", (event) => {
  console.log("retrieve-end:", event.detail);
});

export async function POST(request: NextRequest) {
  // Init Vercel AI StreamData and timeout
  // const vercelStreamData = new StreamData();

  try {
    const body = await request.json();
    const { messages, data }: { messages: Message[]; data?: any } = body;
    if (!isValidMessages(messages)) {
      return NextResponse.json(
        {
          error:
            "messages are required in the request body and the last message must be from the user",
        },
        { status: 400 },
      );
    }

    // retrieve document ids from the annotations of all messages (if any)
    const ids = retrieveDocumentIds(messages);
    // create chat engine with index using the document ids
    const chatEngine = await createChatEngine(ids, data);

    // retrieve user message content from Vercel/AI format
    const userMessageContent = retrieveMessageContent(messages);

    // Setup callbacks
    // const callbackManager = createCallbackManager(vercelStreamData);
    const chatHistory: ChatMessage[] = messages.slice(0, -1) as ChatMessage[];

    // Calling LlamaIndex's ChatEngine to get a streamed response
    // const response = await Settings.withCallbackManager(callbackManager, () => {
    // return chatEngine.chat({
    //   message: userMessageContent,
    //   chatHistory,
    //   stream: true,
    // });
    // });

    const response = await chatEngine.chat({
      message: userMessageContent,
      chatHistory,
      stream: true,
    });

    // const onCompletion = (content: string) => {
    //   chatHistory.push({ role: "assistant", content: content });
    //   generateNextQuestions(chatHistory)
    //     .then((questions: string[]) => {
    //       if (questions.length > 0) {
    //         vercelStreamData.appendMessageAnnotation({
    //           type: "suggested_questions",
    //           data: questions,
    //         });
    //       }
    //     })
    //     .finally(() => {
    //       vercelStreamData.close();
    //     });
    // };

    return LlamaIndexAdapter.toDataStreamResponse(response
      //   , {
      //   data: vercelStreamData,
      //   callbacks: { onCompletion },
      // }
    );
  } catch (error) {
    console.error("[LlamaIndex]", error);
    return NextResponse.json(
      {
        detail: (error as Error).message,
      },
      {
        status: 500,
      },
    );
  }
}

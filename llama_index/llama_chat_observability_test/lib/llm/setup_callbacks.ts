import { ChatMessage, Settings, extractText } from "llamaindex";
import { encodingForModel } from "js-tiktoken";

// TODO : make tokenCounte resettable and global? 
let tokenCount = 0;

export function setupCallbacks(MODEL_PROVIDER: string | undefined, MODEL: string, EMBEDDING_MODEL: string) {
  // TODO :   make it handle other models too.
  const encoding = encodingForModel("gpt-4o-mini");

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

  console.log("Setting up callbacks finished.")
}


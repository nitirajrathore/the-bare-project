import { OpenAI } from "@llamaindex/openai";
import { encodingForModel } from "js-tiktoken";
import { ChatMessage, extractText } from "llamaindex";
import { Settings } from "llamaindex/Settings";

import { initialize } from '@/lib/llm/init-settings';
import dotenv from "dotenv";
dotenv.config();


const encoding = encodingForModel("gpt-4o-mini");

const llm = new OpenAI({
  // currently is "gpt-4-turbo-2024-04-09"
  model: "gpt-4o-mini",
});

let tokenCount = 0;

Settings.callbackManager.on("llm-start", (event) => {
  const { messages } = event.detail;
  messages.reduce((count: number, message: ChatMessage) => {
    return count + encoding.encode(extractText(message.content)).length;
  }, 0);
  console.log("Token count:", tokenCount);
  // https://openai.com/pricing
  // $10.00 / 1M tokens
  console.log(`Total Price: $${(tokenCount / 1_000_000) * 10}`);
});

Settings.callbackManager.on("llm-stream", (event) => {
  const { chunk } = event.detail;
  const { delta } = chunk;
  tokenCount += encoding.encode(extractText(delta)).length;
  console.log("Token count:", tokenCount);
  // if (tokenCount > 20) {
  //   // This is just an example, you can set your own limit or handle it differently
  //   throw new Error("Token limit exceeded!");
  // }
});
Settings.callbackManager.on("llm-end", () => {
  // https://openai.com/pricing
  // $30.00 / 1M tokens
  console.log(`Total Price: $${(tokenCount / 1_000_000) * 30}`);
});

const question = "Hello, how are you? Please response about 50 tokens.";
console.log("Question:", question);
void llm
  .chat({
    stream: true,
    messages: [
      {
        content: question,
        role: "user",
      },
    ],
  })
  .then(async (iter) => {
    console.log("Response:");
    for await (const chunk of iter) {
      process.stdout.write(chunk.delta);
    }
  });

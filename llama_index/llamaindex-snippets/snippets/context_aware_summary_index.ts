import {
  Document,
  storageContextFromDefaults,
  VectorStoreIndex,
  SummaryIndex,
  SummaryRetrieverMode,
  ContextChatEngine
} from "llamaindex";
import { stdin as input, stdout as output } from "node:process";
import readline from "node:readline/promises";

import essay from "./essay";

import { initialize } from '@/lib/llm/init-settings';
import dotenv from "dotenv";
dotenv.config();
initialize();



async function main() {
  console.log("Starting chat engine with stored index.");
  // load the index
  const secondStorageContext = await storageContextFromDefaults({
    persistDir: "./data/summary_index_storage",
  });
  const loadedIndex = await SummaryIndex.init({
    storageContext: secondStorageContext,
  });


  const chatEngine = new ContextChatEngine({
    retriever: loadedIndex.asRetriever({ mode: SummaryRetrieverMode.LLM }),
  });

  const rl = readline.createInterface({ input, output });

  while (true) {
    const query = await rl.question("Query: ");
    const stream = await chatEngine.chat({ message: query, stream: true });
    console.log("AI:");
    for await (const chunk of stream) {
      process.stdout.write(chunk.message.content.toString());
    }
  }
}

main().catch(console.error);

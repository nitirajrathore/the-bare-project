import {
  Document,
  storageContextFromDefaults,
  VectorStoreIndex,
  SummaryIndex,
  SummaryRetrieverMode,
} from "llamaindex";
import { stdin as input, stdout as output } from "node:process";
import readline from "node:readline/promises";

import essay from "./essay";

import { initialize } from '@/lib/llm/init-settings';
import dotenv from "dotenv";
dotenv.config();
initialize();



async function main() {
  // Create Document object with essay
  const document = new Document({ text: essay, id_: "essay" });

  // Split text and create embeddings. Store them in a VectorStoreIndex
  // persist the vector store automatically with the storage context
  const storageContext = await storageContextFromDefaults({
    persistDir: "./data/summary_index_storage",
  });
  // const index = await VectorStoreIndex.fromDocuments([document], {
  //   storageContext,
  // });
  const index = await SummaryIndex.fromDocuments([document], {
    storageContext,
  });

  const queryEngine = index.asQueryEngine();
  console.log("Question: Summarize the life of person in context in 10 bullet points.");
  const response = await queryEngine.query({
    query: "Summarize the life of person in context in 10 bullet points.",
  });

  // Output response
  console.log(response.toString());


  console.log("Starting chat engine with stored index.");
  // load the index
  const secondStorageContext = await storageContextFromDefaults({
    persistDir: "./data/summary_index_storage",
  });
  const loadedIndex = await SummaryIndex.init({
    storageContext: secondStorageContext,
  });


  const chatEngine = loadedIndex.asChatEngine({
    retriever: index.asRetriever({ mode: SummaryRetrieverMode.LLM }),
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

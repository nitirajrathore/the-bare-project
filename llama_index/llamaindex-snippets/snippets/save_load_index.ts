import {
  Document,
  storageContextFromDefaults,
  VectorStoreIndex,
} from "llamaindex";
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
    persistDir: "./data/index_storage",
  });
  const index = await VectorStoreIndex.fromDocuments([document], {
    storageContext,
  });

  // Query the index
  const queryEngine = index.asQueryEngine();
  console.log("Question: What did the author do in college?");
  const response = await queryEngine.query({
    query: "What did the author do in college?",
  });

  // Output response
  console.log(response.toString());

  // load the index
  const secondStorageContext = await storageContextFromDefaults({
    persistDir: "./data/index_storage",
  });
  const loadedIndex = await VectorStoreIndex.init({
    storageContext: secondStorageContext,
  });
  const loadedQueryEngine = loadedIndex.asQueryEngine();
  console.log("Question: What did the author do growing up?");
  const loadedResponse = await loadedQueryEngine.query({
    query: "What did the author do growing up?",
  });
  console.log(loadedResponse.toString());
}

main().catch(console.error);

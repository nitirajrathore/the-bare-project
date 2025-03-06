import {
  Document,
  SentenceSplitter,
  Settings,
  SummaryIndex,
  SummaryRetrieverMode,
} from "llamaindex";
import { stdin as input, stdout as output } from "node:process";
import readline from "node:readline/promises";


import { initialize } from '@/lib/llm/init-settings';
import dotenv from "dotenv";
dotenv.config();
initialize();

import essay from "./essay";

// Update node parser
Settings.nodeParser = new SentenceSplitter({
  chunkSize: 40,
  chunkOverlap: 5,
});

async function main() {
  const document = new Document({ text: essay, id_: "essay" });

  const index = await SummaryIndex.fromDocuments([document]);

  // Query Engine Example
  // const queryEngine = index.asQueryEngine({
  //   retriever: index.asRetriever({ mode: SummaryRetrieverMode.LLM }),
  // });
  // const response = await queryEngine.query({
  //   query: "What did the author do growing up?",
  // });
  // console.log(response.toString());


  // Chat Engine Example
  const chatEngine = index.asChatEngine({
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

main().catch((e: Error) => {
  console.error(e, e.stack);
});

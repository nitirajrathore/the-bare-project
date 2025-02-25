import { SentenceSplitter } from "llamaindex";

const splitter = new SentenceSplitter({ chunkSize: 2, chunkOverlap: 1 });

const texts = splitter.splitText("Hello World this is a test. This is a second sentence.");

console.log(texts);
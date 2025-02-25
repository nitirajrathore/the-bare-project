import fs from 'node:fs/promises';
import { MarkdownNodeParser, Document } from "llamaindex";

function main() {
  parseMDandPrint();
}

async function parseMDandPrint() {
  const markdownNodeParser = new MarkdownNodeParser();
  const text = await fs.readFile('data/markdown_file.md', 'utf-8');
  const document = new Document({ text });

  const parsedDocuments = markdownNodeParser([document]);
  console.log(parsedDocuments);
}

main();
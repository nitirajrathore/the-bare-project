import { MarkdownNodeParser } from "llamaindex";
import { MarkdownReader } from '@llamaindex/readers/markdown'

function main() {
  readMarkdown();
}

async function readMarkdown() {
  const reader = new MarkdownReader();
  const markdownNodeParser = new MarkdownNodeParser();

  const documents = await reader.loadData('data/markdown_file.md');
  const parsedDocuments = markdownNodeParser(documents);

  console.log(parsedDocuments);
}

main();
import { TextFileReader } from '@llamaindex/readers/text'
import { CodeSplitter } from '@llamaindex/node-parser/code'
import Parser from "tree-sitter";
import TS from "tree-sitter-typescript";


function main() {
  splitCodeAndPrint();
}

async function splitCodeAndPrint() {
  const parser = new Parser();
  parser.setLanguage(TS.typescript as Parser.Language);
  const codeSplitter = new CodeSplitter({
    getParser: () => parser,
    maxChars: 50,
  });
  const reader = new TextFileReader();
  const documents = await reader.loadData('data/typescript_code.ts');
  console.log("documents : \n", documents);

  const parsedDocuments = codeSplitter(documents);

  console.log("parsedDocuments : \n", parsedDocuments);
}

main();
import { SimpleDirectoryReader } from "@llamaindex/readers/directory";

async function main() {
  await printDocumentsInData();
}

async function printDocumentsInData() {
  const reader = new SimpleDirectoryReader();
  const documents = await reader.loadData("./data");

  // Print document names
  console.log('Documents:', documents);
  const texts = documents.map(doc => {
    doc.getText();
  });
}

main();
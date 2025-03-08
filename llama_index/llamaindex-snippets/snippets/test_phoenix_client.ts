
// source : https://arize-ai.github.io/phoenix/
// NOTE I had fix the env variables as show below to make ti work.

import { createClient } from "@arizeai/phoenix-client";
import { createPrompt, promptVersion } from "@arizeai/phoenix-client/prompts";

process.env["OTEL_EXPORTER_OTLP_HEADERS"] = "api_key=84a48dfbfa6aedaa645:274a608";
process.env["PHOENIX_CLIENT_HEADERS"] = `{"api_key":"84a48dfbfa6aedaa645:274a608"}`;
process.env["PHOENIX_COLLECTOR_ENDPOINT"] = "https://app.phoenix.arize.com";
process.env["PHOENIX_HOST"] = "https://app.phoenix.arize.com";

async function testPhoenix() {
  const phoenix = createClient();
  // Get all datasets
  const datasets = await phoenix.GET("/v1/datasets");

  console.log("datasets : ", datasets);
}


async function createPromptExample() {
  const version = await createPrompt({
    name: "my-prompt",
    description: "test-description",
    version: promptVersion({
      description: "version description here",
      modelProvider: "OPENAI",
      modelName: "gpt-3.5-turbo",
      template: [
        {
          role: "user",
          content: "{{ question }}",
        },
      ],
      invocationParameters: {
        temperature: 0.8,
      },
    }),
  });

  console.log("version : ", version);
}

import { getPrompt } from "@arizeai/phoenix-client/prompts";

async function getPromptExample() {
  const prompt = await getPrompt({ prompt: { name: "my-prompt" } });
  // ^ you now have a strongly-typed prompt object, in the Phoenix SDK Prompt type
  // const promptByTag = await getPrompt({ tag: "production", name: "my-prompt" });
  // // ^ you can optionally specify a tag to filter by
  // const promptByVersionId = await getPrompt({
  //   versionId: "1234567890",
  // });

  console.log("prompt : ", JSON.stringify(prompt, null, 2));
}

// ^ you can optionally specify a prompt version Id to filter by
function main() {
  // testPhoenix();
  // createPromptExample();
  getPromptExample();
}


main();
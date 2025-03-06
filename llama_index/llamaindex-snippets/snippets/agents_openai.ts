import { OpenAIAgent } from "@llamaindex/openai";
import { FunctionTool } from "llamaindex";
import { stdin as input, stdout as output } from "node:process";
import readline from "node:readline/promises";

import { initialize } from '@/lib/llm/init-settings';
import dotenv from "dotenv";
dotenv.config();
initialize();

const sumNumbers = FunctionTool.from(
  ({ a, b }: { a: number; b: number }) => {
    const result = a + b;
    console.log(`sumNumbers called with a=${a}, b=${b}, result=${result}`);
    return `${result}`;
  },
  {
    name: "sumNumbers",
    description: "Use this function to sum two numbers",
    parameters: {
      type: "object",
      properties: {
        a: {
          type: "number",
          description: "The first number",
        },
        b: {
          type: "number",
          description: "The second number",
        },
      },
      required: ["a", "b"],
    },
  },
);

const divideNumbers = FunctionTool.from(
  ({ a, b }: { a: number; b: number }) => {
    const result = a / b;
    console.log(`divideNumbers called with a=${a}, b=${b}, result=${result}`);
    return `${result}`;
  },
  {
    name: "divideNumbers",
    description: "Use this function to divide two numbers",
    parameters: {
      type: "object",
      properties: {
        a: {
          type: "number",
          description: "The dividend a to divide",
        },
        b: {
          type: "number",
          description: "The divisor b to divide by",
        },
      },
      required: ["a", "b"],
    },
  },
);

const getWeather = FunctionTool.from(
  async ({ city }: { city: string }) => {
    // Note: This is a mock implementation. Replace with actual weather API call
    const mockWeather: Record<string, string> = {
      "London": "Cloudy, 15°C",
      "Tokyo": "Sunny, 25°C",
      "New York": "Rainy, 20°C",
    };
    const result = mockWeather[city] || "Weather data not available";
    console.log(`getWeather called with city=${city}, result=${result}`);
    return result;
  },
  {
    name: "getWeather",
    description: "Get the current weather for a city",
    parameters: {
      type: "object",
      properties: {
        city: {
          type: "string",
          description: "The city name to get weather for",
        },
      },
      required: ["city"],
    },
  },
);

async function main() {
  const agent = new OpenAIAgent({
    tools: [sumNumbers, divideNumbers, getWeather],
  });

  const rl = readline.createInterface({ input, output });

  while (true) {
    const query = await rl.question("Query: ");
    const response = await agent.chat({
      message: query,
    });

    console.log("AI:");
    console.log(response.message);
  }
}

void main().then(() => {
  console.log("Done");
});

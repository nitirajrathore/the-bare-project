import { OpenAI, OpenAIEmbedding } from "@llamaindex/openai";
import { Ollama, OllamaEmbedding } from "@llamaindex/ollama";
// import { Config, Options } from 'ollama/browser';
import { Settings } from "llamaindex";
import { MockLLM } from "@llamaindex/core/utils";
import { Gemini, GEMINI_MODEL, GEMINI_EMBEDDING_MODEL, GeminiEmbedding } from "@llamaindex/google";


export function setupMockProvider() {
  console.log("Using mock Model");
  Settings.llm = new MockLLM();
  // Settings.embedModel = new MockEmbedding();
}

export function setupOpenAIProvider() {
  Settings.llm = new OpenAI({
    model: process.env.MODEL ?? "gpt-4o-mini",
    maxTokens: process.env.LLM_MAX_TOKENS
      ? Number(process.env.LLM_MAX_TOKENS)
      : undefined,
  });
  Settings.embedModel = new OpenAIEmbedding({
    model: process.env.EMBEDDING_MODEL,
    dimensions: process.env.EMBEDDING_DIM
      ? parseInt(process.env.EMBEDDING_DIM)
      : undefined,
  });
}

function getEnumFromString<T extends Record<string, string>>(enumType: T, evalue: string): T[keyof T] | undefined {
  return Object.values(enumType).find(value => value === evalue) as T[keyof T] | undefined;
}

export function setupGoogleProvider() {
  // Initialize Gemini LLM
  console.log("Using Google Gemini Model : ", getEnumFromString(GEMINI_MODEL, process.env.MODEL ?? 'gemini-2.0-flash-001'));
  Settings.llm = new Gemini({
    model: getEnumFromString(GEMINI_MODEL, process.env.MODEL ?? 'gemini-2.0-flash-001'),
  });

  // Initialize Embedding Model
  console.log("Using Google Gemini emb Model : ", getEnumFromString(GEMINI_EMBEDDING_MODEL, process.env.EMBEDDING_MODEL ?? 'text-embedding-004'));

  Settings.embedModel = new GeminiEmbedding({
    model: getEnumFromString(GEMINI_EMBEDDING_MODEL, process.env.EMBEDDING_MODEL ?? 'text-embedding-004'),
  });

  console.log("✅ LlamaIndex is configured with Gemini AI!");

}

export function setupOllamaProvider() {
  const ollamaConfig = {
    host: process.env.OLLAMA_HOST ?? "http://192.168.1.131",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const ollamaOptions = {
    num_ctx: process.env.LLM_MAX_TOKENS ? Number(process.env.LLM_MAX_TOKENS) : undefined,
    top_p: process.env.TOP_K ? Number(process.env.TOP_K) : undefined,
    temperature: process.env.LLM_TEMPERATURE ? Number(process.env.LLM_TEMPERATURE) : undefined,
  };

  Settings.llm = new Ollama({
    model: process.env.MODEL ?? "deepseek-r1:1.5b",
    config: ollamaConfig,
    options: ollamaOptions,
  });

  Settings.embedModel = new OllamaEmbedding({
    model: process.env.EMBEDDING_MODEL ? process.env.EMBEDDING_MODEL : "deepseek-r1:1.5b",
    config: ollamaConfig,
    options: ollamaOptions,
  });
  console.log("Ollama provider setup complete with Settings.embedModel: ", Settings.embedModel.name);
  console.log("Ollama provider setup complete with Settings.llm: ", Settings.llm.model);
}

import { OpenAI, OpenAIEmbedding } from "@llamaindex/openai";
import { Ollama, OllamaEmbedding } from "@llamaindex/ollama";
import { Config, Options } from 'ollama/browser';
import { Settings } from "llamaindex";

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

export function setupOllamaProvider() {
  const ollamaConfig: Partial<Config> = {
    host: process.env.OLLAMA_HOST ?? "http://192.168.1.131",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const ollamaOptions: Partial<Options> = {
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
  console.log("Ollama provider setup complete with Settings.embedModel: ", Settings.embedModel);
  console.log("Ollama provider setup complete with Settings.llm: ", Settings.llm);
}

import { Settings } from "llamaindex";
import { setupOpenAIProvider, setupOllamaProvider, setupMockProvider, setupGoogleProvider } from "./provider";
import { setupCallbacks } from "./setup_callbacks";
const CHUNK_SIZE = 512;
const CHUNK_OVERLAP = 20;
import { initObservability } from "./observability";

// Flag to track if initialization has been done
// let isInitialized = false;

export const initSettings = async (): Promise<void> => {
  // Only initialize once
  // if (isInitialized) {
  //   console.log("LlamaIndex settings already initialized, skipping...");
  //   return;
  // }

  console.log(`Using '${process.env.MODEL_PROVIDER}' model provider`);

  if (!process.env.MODEL || !process.env.EMBEDDING_MODEL) {
    throw new Error("'MODEL' and 'EMBEDDING_MODEL' env variables must be set.");
  }

  Settings.chunkSize = CHUNK_SIZE;
  Settings.chunkOverlap = CHUNK_OVERLAP;

  if (process.env.MODEL_PROVIDER === 'openai') {
    setupOpenAIProvider();
  } else if (process.env.MODEL_PROVIDER === 'ollama') {
    setupOllamaProvider();
  } else if (process.env.MODEL_PROVIDER === 'google') {
    setupGoogleProvider();
  } else {
    setupMockProvider();
  }

  // isInitialized = true;
  console.log("LlamaIndex settings initialized successfully");

  // setupCallbacks(process.env.MODEL_PROVIDER, process.env.MODEL, process.env.EMBEDDING_MODEL);

  initObservability();

};


// Initialize settings immediately when this module is imported
// This ensures it runs once when the server starts
// initSettings().catch(err => {
//   console.error("Failed to initialize LlamaIndex settings:", err);
// });

// export const initialize = (): void => {
//   isInitialized = false;
//   initSettings().catch(err => {
//     console.error("Failed to re-initialize LlamaIndex settings:", err);
//   });
// }

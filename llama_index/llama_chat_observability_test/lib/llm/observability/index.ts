import * as traceloop from "@traceloop/node-server-sdk";
import * as LlamaIndex from "llamaindex";

// import VertexAI from "@google-cloud/vertexai";

// source : https://www.traceloop.com/docs/openllmetry/getting-started-nextjs
// TODO: I don't think there is any easy support for configuring Gemini / Ollama apis. It support google cloud and vertexai but we are not using those.
// Assumes TRACELOOP_API_KEY is set in the environment
export const initObservability = () => {
  traceloop.initialize({
    appName: "llama-app",
    disableBatch: true,
    instrumentModules: {
      llamaIndex: LlamaIndex,
      // google_vertexai: VertexAI
    },
  });
};

import * as traceloop from "@traceloop/node-server-sdk";
import * as LlamaIndex from "llamaindex";

// Assumes  TRACELOOP_API_KEY is set in the environment
export const initObservability = () => {
  traceloop.initialize({
    appName: "llama-app",
    disableBatch: true,
    instrumentModules: {
      llamaIndex: LlamaIndex,
    },
    // OR YOU can set the key here manually
    // apiKey: process.env.TRACELOOP_API_KEY,
  });
};

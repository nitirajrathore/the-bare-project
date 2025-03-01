import { openai } from '@ai-sdk/openai';
import { deepseek } from '@ai-sdk/deepseek';
import { streamText } from 'ai';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, customKey } = await req.json();

    console.log("customKey", customKey);
    //  Setup for openai
    // const result = streamText({
    //   model: openai('gpt-4o-mini'),
    //   system: 'You are a helpful assistant.',
    //   messages,
    // });

    // this should work with deepseek, but I do not have api key for it so will use openrouter for testing.
    // const result = streamText({
    //   model: deepseek('deepseek-chat'),
    //   system: 'You are a helpful assistant.',
    //   messages,
    // });

    //  OpenRouter : Eg. : https://openrouter.ai/docs/quickstart
    //  This is not a reasoning model, so we will not get reasoning data.
    // const result = streamText({
    //   model: createOpenAICompatible({
    //     baseURL: 'https://openrouter.ai/api/v1',
    //     name: 'openrouter-deepseek-r1',
    //     apiKey: process.env.OPENROUTER_API_KEY,
    //   }).chatModel('deepseek/deepseek-r1:free'),
    //   system: 'You are a helpful assistant.',
    //   messages,
    // });

    // working with ollama.
    const result = streamText({
      model: createOpenAICompatible({
        baseURL: 'http://213.180.0.77:47937/v1',
        name: 'ollama-llama3.2_1b',
      }).chatModel('llama3.2:1b'),
      system: 'You are a helpful assistant.',
      messages,
    });


    return result.toDataStreamResponse({
      getErrorMessage: error => {
        if (error == null) {
          return 'unknown error';
        }

        if (typeof error === 'string') {
          return error;
        }

        if (error instanceof Error) {
          return error.message;
        }

        return JSON.stringify(error);
      },
      // sendUsage: false,
      sendReasoning: true,
    });
  } catch (error) {
    console.error('An error occurred:', error);
    return new Response(JSON.stringify({ error: 'An error occurred while processing your request.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
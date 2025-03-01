import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, customKey } = await req.json();

    console.log("customKey", customKey);
    const result = streamText({
      model: openai('gpt-4o-mini'),
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
    });
  } catch (error) {
    console.error('An error occurred:', error);
    return new Response(JSON.stringify({ error: 'An error occurred while processing your request.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
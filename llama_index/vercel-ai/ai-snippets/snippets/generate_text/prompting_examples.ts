import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { google } from '@ai-sdk/google';
import dotenv from 'dotenv';

dotenv.config();

async function execute_example() {
  // assumes OPENAI_API_KEY is set in the environment
  // const { text } = await generateText({
  //   model: openai('gpt-4o-mini'),
  //   prompt: 'What is your name?',
  // });

  // Google model: assumes GOOGLE_GENERATIVE_AI_API_KEY is set in the environment
  const { text } = await generateText({
    model: google('gemini-2.0-flash-exp', { useSearchGrounding: true }),
    system: 'You are a helpful assistant.',
    prompt: 'Where can I buy the best Currywurst in Berlin?',
  });


  console.log(text);
}

function main() {
  execute_example();
}

main();
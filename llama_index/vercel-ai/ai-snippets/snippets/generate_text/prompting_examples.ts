import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { google } from '@ai-sdk/google';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();
// source : https://sdk.vercel.ai/docs/foundations/prompts

async function execute_example() {
  // assumes OPENAI_API_KEY is set in the environment
  // const { text } = await generateText({
  //   model: openai('gpt-4o-mini'),
  //   prompt: 'What is your name?',
  // });

  // Google model: assumes GOOGLE_GENERATIVE_AI_API_KEY is set in the environment
  // const { text } = await generateText({
  //   model: google('gemini-2.0-flash-exp', { useSearchGrounding: true }),
  //   prompt: 'Where can I buy the best Currywurst in Berlin?',
  // });


  //  with parameters and system text
  // const thing = 'kurta';
  // const place = 'Bengaluru';
  // const { text } = await generateText({
  //   model: google('gemini-2.0-flash-exp', { useSearchGrounding: true }),
  //   system: 'You are a helpful assistant.',
  //   prompt: `Where can I buy the best ${thing} in ${place}?`,
  // });

  // messages instead of single prompt
  // const { text } = await generateText({
  //   model: google('gemini-2.0-flash-exp', { useSearchGrounding: true }),
  //   messages: [
  //     { role: 'user', content: 'Hi!' },
  //     { role: 'assistant', content: 'Hello, how can I help?' },
  //     { role: 'user', content: 'How to make a roti?' },
  //   ],
  // });

  // sending text parts.
  // const { text } = await generateText({
  //   model: google('gemini-2.0-flash-exp', { useSearchGrounding: true }),
  //   system: "your are an expert researcher in AI",
  //   messages: [
  //     {
  //       role: 'user',
  //       content: [
  //         {
  //           type: 'text',
  //           text: 'Give some product ideas that solopreneurs can complete and earn money?',
  //         },
  //       ],
  //     },
  //   ],
  // });

  //  sending image parts, Buffer in this example
  const { text } = await generateText({
    model: google('gemini-2.0-flash-exp', { useSearchGrounding: true }),
    system: "your are an expert researcher in AI",
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: 'Describe the image short but complete.' },
          {
            type: 'image',
            image: fs.readFileSync('data/pexels-shvets-2626720.jpg'),
          },
        ],
      },
    ],
  });
  console.log(text);
}

async function execute_example6() {

  //  sending image parts, converting to base64
  const { text } = await generateText({
    model: google('gemini-2.0-flash-exp', { useSearchGrounding: true }),
    system: "your are an expert researcher in AI",
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: 'Describe the image short but complete.' },
          {
            type: 'image',
            image: fs.readFileSync('data/photo-sfdsiconl.webp').toString('base64'),
          },
        ],
      },
    ],
  });

  console.log(text);
}

async function execute_example7() {

  //  sending image parts, direct online link.
  const { text } = await generateText({
    model: google('gemini-2.0-flash-exp', { useSearchGrounding: true }),
    system: "your are an expert image analyzer",
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: 'Name all characters in the image.' },
          {
            type: 'image',
            image:
              'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgcHs9ZREXoBfu1an8uW58vT9xANPuh8sjnz8N5-ahHLMp0A0uk7bcardVEC4IuSxmU42LjrmdgFg5tRslZEizkk7V6_45GiwfElCAi9WnzEW1aK71Rulm4BzSTkimIjWMqsTlP6EPwUpBKG9Dhr-xzqtY80WAOMMv6QymYnWRiJoiHusvhLhgjmWxB_jAt/s1600/disney-characters-2.jpg',
          },
        ],
      },
    ],
  });
  console.log(text);
}

// sending any file with mime type. as Buffer in this case. 
async function execute_example8() {

  const { text } = await generateText({
    model: google('gemini-2.0-flash-exp', { useSearchGrounding: true }),
    system: "your are an expert image analyzer",
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: 'Tell me the business model of the company in this file. List products, raw materials used, possible markets,competitors and customers. Also list the possible downside of the business. Only use information explicity provided in the document. If no information is given just state that clearly.' },
          {
            type: 'file',
            mimeType: 'application/pdf',
            data: fs.readFileSync('data/balaji_amines.pdf'),
          },
        ],
      },
    ],
  });
  console.log(text);
}

// sending any file with mime type. Audio file. a hindi song in this case. 
async function execute_example9() {

  const { text } = await generateText({
    model: google('gemini-2.0-flash-exp'),
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: 'What is the audio saying, output its caption file in SRT format.' },
          {
            type: 'file',
            mimeType: 'audio/mpeg',
            data: fs.readFileSync('data/mitwa.mp3'),
          },
        ],
      },
    ],
  });
  console.log(text);
}

// Assistant messages are messages that have a role of assistant. They are typically previous responses from the assistant and can contain text, reasoning, and tool call parts.
async function execute_example10_message() {

  const { text } = await generateText({
    model: google('gemini-2.0-flash-exp'),
    messages: [
      { role: 'user', content: 'Hi!' },
      {
        role: 'assistant',
        content: [{ type: 'text', text: 'Hello, how can I help?' }],
      },
    ],
  });
  console.log(text);
}

// assistant with tools (calling functions) 
async function call_example11_not_runnable() {

  const { text } = await generateText({
    model: google('gemini-2.0-flash-exp'),
    messages: [
      { role: 'user', content: 'How many calories are in this block of cheese?' },
      {
        role: 'assistant',
        content: [
          {
            type: 'tool-call',
            toolCallId: '12345',
            toolName: 'get-nutrition-data',
            args: { cheese: 'Roquefort' },
          },
        ],
      },
    ],
  });
  console.log(text);
}

function main() {
  execute_example10();
}

main();
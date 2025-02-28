import { Message, LlamaIndexAdapter, StreamData } from 'ai'
import "@/lib/llm-settings"
import {
  ChatMessage,
  SimpleChatEngine,
} from 'llamaindex'
import { NextResponse, type NextRequest } from 'next/server'
import { fakeStreamText } from '@/app/utils'

export const runtime = 'nodejs'
// This export ensures that the route is always dynamically rendered on the server
// regardless of any static optimization that Next.js might apply.
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { messages: Message[] }
    const messages = body.messages
    const lastMessage = messages[messages.length - 1]

    const vercelStreamData = new StreamData()

    if (!process.env.OPENAI_API_KEY) {
      // Return fake stream if API key is not set
      return new Response(fakeStreamText(), {
        headers: {
          'Content-Type': 'text/plain',
          Connection: 'keep-alive',
        },
      })
    }

    const chatEngine = new SimpleChatEngine()

    const response = await chatEngine.chat({
      message: lastMessage.content,
      chatHistory: messages as ChatMessage[],
      stream: true,
    })

    return LlamaIndexAdapter.toDataStreamResponse(response, {
      data: vercelStreamData,
      callbacks: {
        onCompletion: async () => {
          await vercelStreamData.close()
        },
      },
    })
  } catch (error) {
    const detail = (error as Error).message
    return NextResponse.json({ detail }, { status: 500 })
  }
}

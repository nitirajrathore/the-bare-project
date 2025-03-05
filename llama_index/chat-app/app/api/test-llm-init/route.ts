import { NextResponse } from 'next/server';
import { Settings } from 'llamaindex';
import { getInitStatus } from '@/lib/llm/init-settings';

export async function GET() {
  try {
    // Check if LlamaIndex settings are initialized
    const isInitialized = getInitStatus();

    // Get the current LLM provider
    const llmProvider = process.env.MODEL_PROVIDER || 'unknown';

    // Check if Settings.llm is set
    const hasLlm = !!Settings.llm;

    return NextResponse.json({
      success: true,
      isInitialized,
      llmProvider,
      hasLlm,
      llmType: Settings.llm ? Settings.llm.constructor.name : 'Not set',
    });
  } catch (error) {
    const detail = (error as Error).message;
    return NextResponse.json({ success: false, detail }, { status: 500 });
  }
}

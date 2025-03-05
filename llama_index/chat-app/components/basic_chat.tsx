"use client";

import { ChatSection } from '@llamaindex/chat-ui'
import { useChat } from '@ai-sdk/react';


export const BasicChat = () => {
  const handler = useChat()
  return <ChatSection handler={handler} />
}

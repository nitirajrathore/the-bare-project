'use client'

import { ChatSection, ChatMessages, ChatInput } from '@llamaindex/chat-ui'
import { LlamaCloudSelector } from './LlamaCloudSelector' // your custom component
import { useChat } from '@ai-sdk/react';

export const CustomChat = () => {
  const handler = useChat()
  return (
    <ChatSection handler={handler} className="flex flex-col h-screen bg-gray-100">
      <ChatMessages className="flex-1 overflow-y-auto p-4" />
      <ChatInput className="p-4 bg-white shadow-md">
        {/* <ChatInput.Preview /> */}
        <ChatInput.Form className="flex items-center space-x-2">
          <ChatInput.Field type="textarea" className="flex-1 p-2 border rounded-md" />
          <ChatInput.Upload className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" />
          <LlamaCloudSelector />
          <ChatInput.Submit className="p-2 bg-lime-500 text-white rounded-md hover:bg-lime-600" />
        </ChatInput.Form>
      </ChatInput>
    </ChatSection>
  )
}
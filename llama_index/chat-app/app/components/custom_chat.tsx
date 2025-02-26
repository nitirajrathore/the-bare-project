'use client'

import { ChatSection, ChatMessages, ChatInput } from '@llamaindex/chat-ui'
import { LlamaCloudSelector } from './LlamaCloudSelector' // your custom component
import { useChat } from 'ai/react'

export const CustomChat = () => {
  const handler = useChat()
  return (
    <ChatSection handler={handler}>
      <ChatMessages />
      <ChatInput>
        {/* <ChatInput.Preview /> */}
        <ChatInput.Form className="bg-lime-500">
          <ChatInput.Field type="textarea" />
          <ChatInput.Upload />
          <LlamaCloudSelector /> custom component
          <ChatInput.Submit />
        </ChatInput.Form>
      </ChatInput>
    </ChatSection>
  )
}
import { useChatInput, useChatUI } from '@llamaindex/chat-ui'

export const LlamaCloudSelector = () => {
  const { requestData, setRequestData } = useChatUI()
  return (
    <div>
      <select
        value={requestData?.model}
        onChange={e => setRequestData({ model: e.target.value })}
      >
        <option value="llama-3.1-70b-instruct">Pipeline 1</option>
        <option value="llama-3.1-8b-instruct">Pipeline 2</option>
      </select>
    </div>
  )
}
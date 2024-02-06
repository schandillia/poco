import { v4 as uuidv4 } from "uuid"
import Message from "@/components/research/Message"

interface ResearchChatProps {
  messages: string[]
}

function ResearchChat({ messages }: ResearchChatProps) {
  return (
    <div className="flex justify-end h-[calc(100vh-13.25rem)] items-end ml-20 overflow-auto">
      <div className="flex flex-col items-end gap-2">
        {messages.map((element) => (
          <Message key={uuidv4()} message={element} />
        ))}
      </div>
    </div>
  )
}
export default ResearchChat

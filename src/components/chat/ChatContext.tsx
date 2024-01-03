/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/naming-convention */

import { ReactNode, createContext, useRef, useState, useMemo } from "react"
import { useMutation } from "@tanstack/react-query"
import { useToast } from "../ui/use-toast"

type streamResponse = {
  addMessage: () => void
  handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  isLoading: boolean
}

export const ChatContext = createContext<streamResponse>({
  addMessage: () => {},
  message: "",
  handleInputChange: () => {},
  isLoading: false,
})

interface Props {
  fileId: string
  children: ReactNode
}

export function ChatContextProvider({ fileId, children }: Props) {
  const [message, setMessage] = useState<string>("")
  const [isLoading, setisLoading] = useState<boolean>(false)

  const { toast } = useToast()

  const { mutate: sendMessage } = useMutation({
    mutationFn: async ({ message }: { message: string }) => {
      const response = await fetch("/api/message", {
        method: "POST",
        body: JSON.stringify({ fileId, message }),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      return response.body
    },
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
  }

  const addMessage = () => sendMessage({ message })

  const contextValue = useMemo(
    () => ({
      addMessage,
      message,
      handleInputChange,
      isLoading,
    }),
    [addMessage, message, handleInputChange, isLoading],
  )

  return (
    <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>
  )
}

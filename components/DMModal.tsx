"use client"

import { useState, useEffect } from "react"
import type { User, DirectMessage } from "@/app/page"

interface DMModalProps {
  currentUser: User
  recipient: { id: number; username: string }
  onClose: () => void
}

export default function DMModal({ currentUser, recipient, onClose }: DMModalProps) {
  const [messages, setMessages] = useState<DirectMessage[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    loadMessages()
  }, [currentUser.id, recipient.id])

  const loadMessages = () => {
    const savedMessages = localStorage.getItem("directMessages")
    if (savedMessages) {
      const allMessages: DirectMessage[] = JSON.parse(savedMessages)
      const conversationMessages = allMessages
        .filter(
          (msg) =>
            (msg.fromUserId === currentUser.id && msg.toUserId === recipient.id) ||
            (msg.fromUserId === recipient.id && msg.toUserId === currentUser.id),
        )
        .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())

      setMessages(conversationMessages)
    }
  }

  const sendMessage = async () => {
    if (!newMessage.trim() || isLoading) return

    setIsLoading(true)

    const message: DirectMessage = {
      id: Date.now(),
      fromUserId: currentUser.id,
      toUserId: recipient.id,
      fromUsername: currentUser.username,
      toUsername: recipient.username,
      message: newMessage.trim(),
      timestamp: new Date().toISOString(),
      read: false,
    }

    // Save to localStorage
    const savedMessages = localStorage.getItem("directMessages")
    const allMessages: DirectMessage[] = savedMessages ? JSON.parse(savedMessages) : []
    allMessages.push(message)
    localStorage.setItem("directMessages", JSON.stringify(allMessages))

    // Update local state
    setMessages((prev) => [...prev, message])
    setNewMessage("")
    setIsLoading(false)
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="glass-effect rounded-2xl w-full max-w-md h-96 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${recipient.username}`}
              alt={recipient.username}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="font-bold text-white apple-font">{recipient.username}</h3>
              <p className="text-xs text-green-400 font-medium">Online</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors text-xl">
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.length === 0 ? (
            <div className="text-center text-gray-400 mt-8">
              <div className="text-4xl mb-2">💬</div>
              <p className="font-medium">Start a conversation with {recipient.username}!</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.fromUserId === currentUser.id ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl ${
                    message.fromUserId === currentUser.id ? "premium-gradient text-white" : "bg-gray-700 text-white"
                  }`}
                >
                  <p className="font-medium">{message.message}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.fromUserId === currentUser.id ? "text-gray-200" : "text-gray-400"
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder={`Message ${recipient.username}...`}
              className="flex-1 bg-gray-800 border border-gray-600 rounded-full px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 font-medium"
              maxLength={200}
            />
            <button
              onClick={sendMessage}
              disabled={!newMessage.trim() || isLoading}
              className="premium-gradient text-white font-bold px-4 py-2 rounded-full hover-lift transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

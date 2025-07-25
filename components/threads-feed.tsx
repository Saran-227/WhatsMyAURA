"use client"

import { useState, useEffect } from "react"
import type { User, Thread } from "@/app/page"

interface ThreadsFeedProps {
  user: User
}

export function ThreadsFeed({ user }: ThreadsFeedProps) {
  const [threads, setThreads] = useState<Thread[]>([])
  const [newThreadContent, setNewThreadContent] = useState("")
  const [showNewThread, setShowNewThread] = useState(false)

  useEffect(() => {
    loadThreads()
  }, [])

  const loadThreads = () => {
    const savedThreads = JSON.parse(localStorage.getItem("threads") || "[]")
    setThreads(savedThreads.sort((a: Thread, b: Thread) => b.timestamp - a.timestamp))
  }

  const postThread = () => {
    if (!newThreadContent.trim()) return

    const newThread: Thread = {
      id: Date.now().toString(),
      userId: user.id,
      username: user.username,
      profilePicture: user.profilePicture,
      content: newThreadContent.trim(),
      likes: 0,
      reactions: { fire: 0, skull: 0, brain: 0 },
      comments: [],
      timestamp: Date.now(),
    }

    const updatedThreads = [newThread, ...threads]
    setThreads(updatedThreads)
    localStorage.setItem("threads", JSON.stringify(updatedThreads))

    setNewThreadContent("")
    setShowNewThread(false)
  }

  const likeThread = (threadId: string) => {
    const updatedThreads = threads.map((thread) => {
      if (thread.id === threadId) {
        return { ...thread, likes: thread.likes + 1 }
      }
      return thread
    })
    setThreads(updatedThreads)
    localStorage.setItem("threads", JSON.stringify(updatedThreads))
  }

  const reactToThread = (threadId: string, reactionType: "fire" | "skull" | "brain") => {
    const updatedThreads = threads.map((thread) => {
      if (thread.id === threadId) {
        return {
          ...thread,
          reactions: {
            ...thread.reactions,
            [reactionType]: thread.reactions[reactionType] + 1,
          },
        }
      }
      return thread
    })
    setThreads(updatedThreads)
    localStorage.setItem("threads", JSON.stringify(updatedThreads))
  }

  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now()
    const diff = now - timestamp
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    if (minutes > 0) return `${minutes}m ago`
    return "Just now"
  }

  // Sample threads for demo
  useEffect(() => {
    const sampleThreads = [
      {
        id: "sample1",
        userId: "demo1",
        username: "ChaosKing",
        profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=ChaosKing",
        content: "Just convinced my teacher that my dog ate my homework... plot twist: I don't have a dog 💀",
        likes: 23,
        reactions: { fire: 12, skull: 8, brain: 3 },
        comments: [],
        timestamp: Date.now() - 3600000,
      },
      {
        id: "sample2",
        userId: "demo2",
        username: "AuraQueen",
        profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=AuraQueen",
        content:
          "Accidentally started a food fight in the cafeteria by dropping my tray... ended up being the most fun lunch ever 🔥",
        likes: 45,
        reactions: { fire: 34, skull: 2, brain: 1 },
        comments: [],
        timestamp: Date.now() - 7200000,
      },
    ]

    const existingThreads = JSON.parse(localStorage.getItem("threads") || "[]")
    if (existingThreads.length === 0) {
      localStorage.setItem("threads", JSON.stringify(sampleThreads))
      setThreads(sampleThreads)
    }
  }, [])

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-black bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent mb-4">
          Aura Threads 🧵
        </h1>
        <p className="text-xl text-white/80">Share your wildest, boldest, and funniest moments!</p>
      </div>

      {/* New Thread Button */}
      <div className="mb-8">
        {!showNewThread ? (
          <button
            onClick={() => setShowNewThread(true)}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 rounded-3xl hover:scale-105 transform transition-all duration-200 text-xl"
          >
            Share Your Chaos ✨
          </button>
        ) : (
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
            <div className="flex items-start space-x-4 mb-4">
              <img
                src={user.profilePicture || "/placeholder.svg"}
                alt={user.username}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <h3 className="text-white font-bold mb-2">{user.username}</h3>
                <textarea
                  value={newThreadContent}
                  onChange={(e) => setNewThreadContent(e.target.value)}
                  placeholder="What's your wildest story? Share your chaos... 🔥"
                  className="w-full h-32 px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"
                  maxLength={280}
                />
                <div className="text-right text-white/60 text-sm mt-2">{newThreadContent.length}/280</div>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowNewThread(false)
                  setNewThreadContent("")
                }}
                className="bg-gray-500 text-white font-bold px-6 py-2 rounded-xl hover:scale-105 transform transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={postThread}
                disabled={!newThreadContent.trim()}
                className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold px-6 py-2 rounded-xl hover:scale-105 transform transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Post Thread 🚀
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Threads Feed */}
      <div className="space-y-6">
        {threads.map((thread) => (
          <div
            key={thread.id}
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-200"
          >
            {/* Thread Header */}
            <div className="flex items-start space-x-4 mb-4">
              <img
                src={thread.profilePicture || "/placeholder.svg"}
                alt={thread.username}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-white font-bold">{thread.username}</h3>
                  <span className="text-white/60 text-sm">{formatTimeAgo(thread.timestamp)}</span>
                </div>
                <p className="text-white/90 text-lg leading-relaxed">{thread.content}</p>
              </div>
            </div>

            {/* Thread Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-white/20">
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => likeThread(thread.id)}
                  className="flex items-center space-x-2 text-white/70 hover:text-red-400 transition-colors duration-200"
                >
                  <span className="text-xl">❤️</span>
                  <span className="font-medium">{thread.likes}</span>
                </button>

                <button
                  onClick={() => reactToThread(thread.id, "fire")}
                  className="flex items-center space-x-2 text-white/70 hover:text-orange-400 transition-colors duration-200"
                >
                  <span className="text-xl">🔥</span>
                  <span className="font-medium">{thread.reactions.fire}</span>
                </button>

                <button
                  onClick={() => reactToThread(thread.id, "skull")}
                  className="flex items-center space-x-2 text-white/70 hover:text-gray-300 transition-colors duration-200"
                >
                  <span className="text-xl">💀</span>
                  <span className="font-medium">{thread.reactions.skull}</span>
                </button>

                <button
                  onClick={() => reactToThread(thread.id, "brain")}
                  className="flex items-center space-x-2 text-white/70 hover:text-purple-400 transition-colors duration-200"
                >
                  <span className="text-xl">🧠</span>
                  <span className="font-medium">{thread.reactions.brain}</span>
                </button>
              </div>

              <button className="flex items-center space-x-2 text-white/70 hover:text-blue-400 transition-colors duration-200">
                <span className="text-xl">💬</span>
                <span className="font-medium">{thread.comments.length}</span>
              </button>
            </div>
          </div>
        ))}

        {threads.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🧵</div>
            <h3 className="text-2xl font-bold text-white mb-2">No threads yet!</h3>
            <p className="text-white/70">Be the first to share your chaos and start the conversation!</p>
          </div>
        )}
      </div>
    </div>
  )
}

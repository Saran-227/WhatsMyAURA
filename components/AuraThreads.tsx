"use client"

import { useState, useEffect } from "react"
import type { User, Thread } from "@/app/page"

interface AuraThreadsProps {
  user: User | null
  setUser: (user: User) => void
  onOpenDM: (userId: number, username: string) => void
}

export default function AuraThreads({ user, setUser, onOpenDM }: AuraThreadsProps) {
  const [threads, setThreads] = useState<Thread[]>([])
  const [newThread, setNewThread] = useState("")
  const [showNewThread, setShowNewThread] = useState(false)

  // 10 Thug Life and Cool Stories with Indian names
  const coolStories = [
    {
      id: 8001,
      userId: 8001,
      username: "Rohit Mehta",
      profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=RohitMehta",
      text: "Teacher said 'You'll never amount to anything.' Fast forward 10 years, I'm now her boss at the company she applied to. Walked into her interview wearing sunglasses indoors. Thug life chose me. 😎",
      likes: 892,
      reactions: { fire: 456, heart: 234, mind: 202 },
      comments: 156,
      timestamp: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: 8002,
      userId: 8002,
      username: "Kavya Sharma",
      profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=KavyaSharma",
      text: "Bully tried to embarrass me in front of everyone by sharing my old photos. I thanked them publicly for the 'glow-up motivation' and posted my transformation. Now they're asking for fitness tips. 🔥",
      likes: 1247,
      reactions: { fire: 678, heart: 345, mind: 224 },
      comments: 203,
      timestamp: new Date(Date.now() - 172800000).toISOString(),
    },
    {
      id: 8003,
      userId: 8003,
      username: "Ankit Verma",
      profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=AnkitVerma",
      text: "Ex tried to make me jealous by posting pics with their new partner. I liked every single photo and commented 'You two look perfect together!' They blocked me within an hour. 🧊",
      likes: 756,
      reactions: { fire: 389, heart: 267, mind: 100 },
      comments: 89,
      timestamp: new Date(Date.now() - 259200000).toISOString(),
    },
    {
      id: 8004,
      userId: 8004,
      username: "Riya Agarwal",
      profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=RiyaAgarwal",
      text: "Traffic cop pulled me over for speeding. Asked if I knew why he stopped me. I said 'Because I let you.' He was so confused he just gave me a warning and walked away. 🚔",
      likes: 634,
      reactions: { fire: 423, heart: 156, mind: 55 },
      comments: 78,
      timestamp: new Date(Date.now() - 345600000).toISOString(),
    },
    {
      id: 8005,
      userId: 8005,
      username: "Aryan Joshi",
      profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=AryanJoshi",
      text: "Waiter was being rude all night. When the bill came, I left a ₹2000 tip with a note: 'This is for your acting lessons, because your customer service performance needs work.' 💸",
      likes: 923,
      reactions: { fire: 567, heart: 234, mind: 122 },
      comments: 134,
      timestamp: new Date(Date.now() - 432000000).toISOString(),
    },
    {
      id: 8006,
      userId: 8006,
      username: "Pooja Singh",
      profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=PoojaSingh",
      text: "Group project partner did zero work but wanted equal credit. Presented my part flawlessly, then said 'Now Pooja will present their contribution.' Watched them panic in 4K. 📹",
      likes: 1156,
      reactions: { fire: 689, heart: 345, mind: 122 },
      comments: 189,
      timestamp: new Date(Date.now() - 518400000).toISOString(),
    },
    {
      id: 8007,
      userId: 8007,
      username: "Karan Malhotra",
      profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=KaranMalhotra",
      text: "Neighbor kept parking in my spot. So I learned their schedule and moved their car to different legal spots every day for a month. They thought they were losing their mind. 🚗",
      likes: 845,
      reactions: { fire: 456, heart: 289, mind: 100 },
      comments: 167,
      timestamp: new Date(Date.now() - 604800000).toISOString(),
    },
    {
      id: 8008,
      userId: 8008,
      username: "Sneha Kapoor",
      profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=SnehaKapoor",
      text: "Boss tried to fire me for 'attitude problems.' I reminded him I had recordings of all his inappropriate comments. Suddenly my attitude wasn't a problem anymore. 📱🎙️",
      likes: 1034,
      reactions: { fire: 623, heart: 267, mind: 144 },
      comments: 201,
      timestamp: new Date(Date.now() - 691200000).toISOString(),
    },
    {
      id: 8009,
      userId: 8009,
      username: "Vikram Rao",
      profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=VikramRao",
      text: "Scammer called pretending to be from my bank. I played along for 30 minutes, then said 'This is actually CBI, you're under arrest.' Heard them throw their phone. 📞",
      likes: 1289,
      reactions: { fire: 734, heart: 345, mind: 210 },
      comments: 234,
      timestamp: new Date(Date.now() - 777600000).toISOString(),
    },
    {
      id: 8010,
      userId: 8010,
      username: "Ishita Gupta",
      profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=IshitaGupta",
      text: "Aunty demanded to speak to my manager at the store. I said 'Sure, one moment.' Walked to the back, put on a different shirt, came back out. 'Hi, I'm the manager. What seems to be the problem?' 👔",
      likes: 1567,
      reactions: { fire: 823, heart: 456, mind: 288 },
      comments: 312,
      timestamp: new Date(Date.now() - 864000000).toISOString(),
    },
  ]

  useEffect(() => {
    if (!user) return

    const savedThreads = localStorage.getItem("auraThreads")
    let userThreads: Thread[] = []

    if (savedThreads) {
      userThreads = JSON.parse(savedThreads)
    }

    // Combine user threads with cool stories
    const allThreads = [...coolStories, ...userThreads]
    setThreads(allThreads.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()))
  }, [user])

  const postThread = () => {
    if (newThread.trim() && user) {
      const thread: Thread = {
        id: Date.now(),
        userId: user.id,
        username: user.username,
        profilePic: user.profilePic,
        text: newThread.trim(),
        likes: 0,
        reactions: { fire: 0, heart: 0, mind: 0 },
        comments: 0,
        timestamp: new Date().toISOString(),
      }

      // Add to local state
      const updatedThreads = [thread, ...threads]
      setThreads(updatedThreads)

      // Save user threads separately
      const savedThreads = localStorage.getItem("auraThreads")
      const userThreads = savedThreads ? JSON.parse(savedThreads) : []
      userThreads.unshift(thread)
      localStorage.setItem("auraThreads", JSON.stringify(userThreads))

      setNewThread("")
      setShowNewThread(false)
    }
  }

  const followUser = (targetUserId: number) => {
    if (!user) return

    const updatedUser = {
      ...user,
      following: [...user.following, targetUserId],
    }
    setUser(updatedUser)
    localStorage.setItem("auraUser", JSON.stringify(updatedUser))
  }

  const unfollowUser = (targetUserId: number) => {
    if (!user) return

    const updatedUser = {
      ...user,
      following: user.following.filter((id) => id !== targetUserId),
    }
    setUser(updatedUser)
    localStorage.setItem("auraUser", JSON.stringify(updatedUser))
  }

  const likeThread = (threadId: number) => {
    const updatedThreads = threads.map((thread) =>
      thread.id === threadId ? { ...thread, likes: thread.likes + 1 } : thread,
    )
    setThreads(updatedThreads)

    // Update user threads in storage
    const savedThreads = localStorage.getItem("auraThreads")
    if (savedThreads) {
      const userThreads: Thread[] = JSON.parse(savedThreads)
      const updatedUserThreads = userThreads.map((thread) =>
        thread.id === threadId ? { ...thread, likes: thread.likes + 1 } : thread,
      )
      localStorage.setItem("auraThreads", JSON.stringify(updatedUserThreads))
    }
  }

  const reactToThread = (threadId: number, reactionType: keyof Thread["reactions"]) => {
    const updatedThreads = threads.map((thread) =>
      thread.id === threadId
        ? {
            ...thread,
            reactions: {
              ...thread.reactions,
              [reactionType]: thread.reactions[reactionType] + 1,
            },
          }
        : thread,
    )
    setThreads(updatedThreads)

    // Update user threads in storage
    const savedThreads = localStorage.getItem("auraThreads")
    if (savedThreads) {
      const userThreads: Thread[] = JSON.parse(savedThreads)
      const updatedUserThreads = userThreads.map((thread) =>
        thread.id === threadId
          ? {
              ...thread,
              reactions: {
                ...thread.reactions,
                [reactionType]: thread.reactions[reactionType] + 1,
              },
            }
          : thread,
      )
      localStorage.setItem("auraThreads", JSON.stringify(updatedUserThreads))
    }
  }

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  if (!user) return null

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4 apple-font">All Stories</h1>
          <p className="text-xl text-gray-400 font-medium">Share your experiences and read epic tales</p>
        </div>

        {/* New Thread */}
        <div className="mb-8 max-w-2xl mx-auto">
          {!showNewThread ? (
            <button
              onClick={() => setShowNewThread(true)}
              className="w-full glass-effect rounded-2xl p-6 text-left hover-lift transition-all duration-300"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={user.profilePic || "/placeholder.svg"}
                  alt="Your avatar"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <span className="text-gray-400 font-medium">Share your epic story...</span>
              </div>
            </button>
          ) : (
            <div className="glass-effect rounded-2xl p-6">
              <div className="flex items-start space-x-4 mb-4">
                <img
                  src={user.profilePic || "/placeholder.svg"}
                  alt="Your avatar"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <textarea
                    value={newThread}
                    onChange={(e) => setNewThread(e.target.value)}
                    placeholder="What's your story? Share an experience, lesson, or moment that shaped you..."
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg p-4 text-white placeholder-gray-400 resize-none h-32 focus:outline-none focus:border-blue-500 font-medium"
                    maxLength={280}
                  />
                  <div className="text-right text-sm text-gray-500 mt-2 font-medium">{newThread.length}/280</div>
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowNewThread(false)
                    setNewThread("")
                  }}
                  className="text-gray-400 hover:text-white transition-colors px-4 py-2 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={postThread}
                  disabled={!newThread.trim()}
                  className="premium-gradient text-white font-bold px-6 py-2 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Share Story
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Stories Grid - 2x2 Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {threads.map((thread) => {
            const isFollowing = user.following.includes(thread.userId)

            return (
              <div key={thread.id} className="glass-effect rounded-2xl p-6 hover-lift transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <img
                    src={thread.profilePic || "/placeholder.svg"}
                    alt={`${thread.username}'s avatar`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-bold text-white apple-font">{thread.username}</h3>
                        <span className="text-sm text-gray-500 font-medium">{formatTimeAgo(thread.timestamp)}</span>
                        {thread.id >= 8000 && thread.id < 9000 && (
                          <span className="bg-gradient-to-r from-yellow-400 to-red-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                            🔥 EPIC
                          </span>
                        )}
                      </div>
                      {thread.userId !== user.id && (
                        <div className="flex items-center space-x-2">
                          {isFollowing ? (
                            <button
                              onClick={() => unfollowUser(thread.userId)}
                              className="bg-gray-600 hover:bg-gray-700 text-white font-bold px-3 py-1 rounded-full text-xs transition-colors"
                            >
                              Following ✓
                            </button>
                          ) : (
                            <button
                              onClick={() => followUser(thread.userId)}
                              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1 rounded-full text-xs transition-colors"
                            >
                              Follow
                            </button>
                          )}
                          <button
                            onClick={() => onOpenDM(thread.userId, thread.username)}
                            className="bg-gray-600 hover:bg-gray-700 text-white font-bold px-3 py-1 rounded-full text-xs transition-colors"
                          >
                            Message
                          </button>
                        </div>
                      )}
                    </div>
                    <p className="text-gray-300 mb-4 leading-relaxed font-medium text-sm">{thread.text}</p>

                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => likeThread(thread.id)}
                        className="flex items-center space-x-1 text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <span className="text-sm">❤️</span>
                        <span className="text-xs font-bold">{thread.likes}</span>
                      </button>

                      <button
                        onClick={() => reactToThread(thread.id, "fire")}
                        className="flex items-center space-x-1 text-gray-400 hover:text-orange-400 transition-colors"
                      >
                        <span className="text-sm">🔥</span>
                        <span className="text-xs font-bold">{thread.reactions.fire}</span>
                      </button>

                      <button
                        onClick={() => reactToThread(thread.id, "heart")}
                        className="flex items-center space-x-1 text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <span className="text-sm">💙</span>
                        <span className="text-xs font-bold">{thread.reactions.heart}</span>
                      </button>

                      <button
                        onClick={() => reactToThread(thread.id, "mind")}
                        className="flex items-center space-x-1 text-gray-400 hover:text-purple-400 transition-colors"
                      >
                        <span className="text-sm">🧠</span>
                        <span className="text-xs font-bold">{thread.reactions.mind}</span>
                      </button>

                      <button className="flex items-center space-x-1 text-gray-400 hover:text-gray-300 transition-colors">
                        <span className="text-sm">💬</span>
                        <span className="text-xs font-bold">{thread.comments}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

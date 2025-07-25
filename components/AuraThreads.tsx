"use client"

import { useState, useEffect } from "react"
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  serverTimestamp,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore"
import { db } from "@/lib/firebase"
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
  const [loading, setLoading] = useState(true)
  const [posting, setPosting] = useState(false)

  // Sample threads for fallback
  const sampleThreads = [
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
  ]

  // Load global threads from Firebase
  useEffect(() => {
    const loadGlobalThreads = async () => {
      if (!user) return

      try {
        console.log("Loading global threads from Firebase...")
        setLoading(true)

        const threadsRef = collection(db, "threads")
        const q = query(threadsRef, orderBy("timestamp", "desc"), limit(50))
        const querySnapshot = await getDocs(q)

        const globalThreads: Thread[] = []
        querySnapshot.forEach((doc) => {
          const data = doc.data()
          globalThreads.push({
            id: doc.id,
            userId: data.userId,
            username: data.username,
            profilePic: data.profilePic,
            text: data.text,
            likes: data.likes || 0,
            reactions: data.reactions || { fire: 0, heart: 0, mind: 0 },
            comments: data.comments || 0,
            timestamp: data.timestamp?.toDate?.()?.toISOString() || new Date().toISOString(),
          })
        })

        console.log(`Loaded ${globalThreads.length} global threads`)

        // Combine with sample threads for variety
        const allThreads = [...globalThreads, ...sampleThreads]
        setThreads(allThreads.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()))
      } catch (error) {
        console.error("Error loading global threads:", error)
        // Fallback to sample threads
        setThreads(sampleThreads)
      } finally {
        setLoading(false)
      }
    }

    loadGlobalThreads()
  }, [user])

  // Post thread globally to Firebase
  const postThread = async () => {
    if (!newThread.trim() || !user || posting) return

    try {
      setPosting(true)
      console.log("Posting thread globally to Firebase...")

      const threadData = {
        userId: user.id,
        username: user.username,
        profilePic: user.profilePic,
        text: newThread.trim(),
        likes: 0,
        reactions: { fire: 0, heart: 0, mind: 0 },
        comments: 0,
        timestamp: serverTimestamp(),
        createdAt: new Date(),
      }

      // Add to Firebase
      const docRef = await addDoc(collection(db, "threads"), threadData)
      console.log("Thread posted globally with ID:", docRef.id)

      // Add to local state immediately for instant feedback
      const localThread: Thread = {
        id: docRef.id,
        userId: user.id,
        username: user.username,
        profilePic: user.profilePic,
        text: newThread.trim(),
        likes: 0,
        reactions: { fire: 0, heart: 0, mind: 0 },
        comments: 0,
        timestamp: new Date().toISOString(),
      }

      setThreads((prev) => [localThread, ...prev])
      setNewThread("")
      setShowNewThread(false)

      // Show success message
      console.log("Thread shared globally! Everyone can now see it.")
    } catch (error) {
      console.error("Error posting thread globally:", error)
      alert("Failed to share thread globally. Please try again.")
    } finally {
      setPosting(false)
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

  // Like thread globally
  const likeThread = async (threadId: string | number) => {
    try {
      // Update local state immediately
      setThreads((prev) =>
        prev.map((thread) => (thread.id === threadId ? { ...thread, likes: thread.likes + 1 } : thread)),
      )

      // Update in Firebase if it's a Firebase document
      if (typeof threadId === "string") {
        const threadRef = doc(db, "threads", threadId)
        await updateDoc(threadRef, {
          likes: increment(1),
        })
        console.log("Thread like updated globally")
      }
    } catch (error) {
      console.error("Error updating thread like:", error)
    }
  }

  // React to thread globally
  const reactToThread = async (threadId: string | number, reactionType: keyof Thread["reactions"]) => {
    try {
      // Update local state immediately
      setThreads((prev) =>
        prev.map((thread) =>
          thread.id === threadId
            ? {
                ...thread,
                reactions: {
                  ...thread.reactions,
                  [reactionType]: thread.reactions[reactionType] + 1,
                },
              }
            : thread,
        ),
      )

      // Update in Firebase if it's a Firebase document
      if (typeof threadId === "string") {
        const threadRef = doc(db, "threads", threadId)
        await updateDoc(threadRef, {
          [`reactions.${reactionType}`]: increment(1),
        })
        console.log(`Thread ${reactionType} reaction updated globally`)
      }
    } catch (error) {
      console.error("Error updating thread reaction:", error)
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
          <h1 className="text-4xl font-bold text-white mb-4 apple-font">Global Threads</h1>
          <p className="text-xl text-gray-400 font-medium">
            Share your experiences with the world - {threads.length} global threads
          </p>
          {loading && <div className="text-sm text-blue-400 mt-2">Loading global threads...</div>}
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
                <span className="text-gray-400 font-medium">Share your epic story with the world...</span>
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
                    placeholder="What's your story? Share an experience, lesson, or moment that shaped you with everyone..."
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
                  disabled={posting}
                >
                  Cancel
                </button>
                <button
                  onClick={postThread}
                  disabled={!newThread.trim() || posting}
                  className="premium-gradient text-white font-bold px-6 py-2 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {posting ? "Sharing..." : "Share Globally"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Global Threads Grid - 2x2 Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {threads.map((thread) => {
            const isFollowing = user.following.includes(thread.userId)
            const isFirebaseThread = typeof thread.id === "string"

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
                        {isFirebaseThread && (
                          <span className="bg-gradient-to-r from-green-400 to-blue-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                            🌍 GLOBAL
                          </span>
                        )}
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

        {threads.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🌍</div>
            <h3 className="text-2xl font-bold text-white mb-2">No Global Threads Yet</h3>
            <p className="text-gray-400">Be the first to share your story with the world!</p>
          </div>
        )}
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import type { User, Thread } from "@/app/page"

interface MyFeedProps {
  user: User | null
  setUser: (user: User) => void
  onOpenDM: (userId: number, username: string) => void
}

interface InstagramPost {
  id: number
  userId: number
  username: string
  profilePic: string
  image: string
  caption: string
  likes: number
  comments: number
  timestamp: string
  type: "image" | "meme" | "celebrity"
}

export default function MyFeed({ user, setUser, onOpenDM }: MyFeedProps) {
  const [feedThreads, setFeedThreads] = useState<Thread[]>([])
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([])

  // Instagram-style posts with real stock images
  const stockInstagramPosts: InstagramPost[] = [
    {
      id: 10001,
      userId: 10001,
      username: "Virat Kohli",
      profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=ViratKohli",
      image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=500&h=500&fit=crop",
      caption:
        "Another day, another century! 💯 The grind never stops. Thank you for all the love and support! 🏏 #Cricket #Century #TeamIndia",
      likes: 2847,
      comments: 456,
      timestamp: new Date(Date.now() - 900000).toISOString(),
      type: "celebrity",
    },
    {
      id: 10002,
      userId: 10002,
      username: "Deepika Padukone",
      profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=DeepikaPadukone",
      image: "https://images.unsplash.com/photo-1494790108755-2616c9c0e8e0?w=500&h=500&fit=crop",
      caption:
        "Embracing every moment with gratitude ✨ New project announcement coming soon! Stay tuned 🎬 #Bollywood #Grateful #NewBeginnings",
      likes: 3456,
      comments: 789,
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      type: "celebrity",
    },
    {
      id: 10003,
      userId: 10003,
      username: "Meme Lord India",
      profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=MemeLordIndia",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop",
      caption: "Monday morning vs Me 😂 Tag someone who needs this motivation! #MondayMood #IndianMemes #Relatable",
      likes: 1234,
      comments: 234,
      timestamp: new Date(Date.now() - 2700000).toISOString(),
      type: "meme",
    },
    {
      id: 10004,
      userId: 10004,
      username: "Ranveer Singh",
      profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=RanveerSingh",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop",
      caption:
        "Life is too short to wear boring clothes! 🌈 Express yourself, be bold, be YOU! #Fashion #BeBold #ExpressYourself #Bollywood",
      likes: 2156,
      comments: 345,
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      type: "celebrity",
    },
    {
      id: 10005,
      userId: 10005,
      username: "Desi Memes Official",
      profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=DesiMemesOfficial",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=500&fit=crop",
      caption:
        "Indian parents be like... 😅 Every desi kid can relate! Share with your friends #DesiMemes #IndianParents #Relatable #Funny",
      likes: 987,
      comments: 156,
      timestamp: new Date(Date.now() - 4500000).toISOString(),
      type: "meme",
    },
    {
      id: 10006,
      userId: 10006,
      username: "Priyanka Chopra",
      profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=PriyankaChopra",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop",
      caption:
        "Dreams don't have expiration dates 💫 Keep pushing boundaries and breaking barriers! #DreamBig #Global #Inspiration #Bollywood",
      likes: 4567,
      comments: 678,
      timestamp: new Date(Date.now() - 5400000).toISOString(),
      type: "celebrity",
    },
    {
      id: 10007,
      userId: 10007,
      username: "Viral Memes India",
      profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=ViralMemesIndia",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop",
      caption:
        "Exam season be like... 📚😭 Good luck to all students! You got this! #ExamMemes #StudentLife #IndianStudents #Motivation",
      likes: 1567,
      comments: 289,
      timestamp: new Date(Date.now() - 6300000).toISOString(),
      type: "meme",
    },
    {
      id: 10008,
      userId: 10008,
      username: "Akshay Kumar",
      profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=AkshayKumar",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=500&fit=crop",
      caption:
        "Action, discipline, and dedication - the three pillars of success! 💪 New movie trailer drops tomorrow! #Action #Bollywood #Discipline",
      likes: 3789,
      comments: 567,
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      type: "celebrity",
    },
    {
      id: 10009,
      userId: 10009,
      username: "Travel Diaries India",
      profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=TravelDiariesIndia",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop",
      caption:
        "The mountains are calling and I must go! 🏔️ Nothing beats the serenity of nature. Where's your next adventure? #Travel #Mountains #Nature #Adventure",
      likes: 1890,
      comments: 234,
      timestamp: new Date(Date.now() - 8100000).toISOString(),
      type: "image",
    },
    {
      id: 10010,
      userId: 10010,
      username: "Food Lover Mumbai",
      profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=FoodLoverMumbai",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500&h=500&fit=crop",
      caption:
        "Street food hits different! 🍕 This pizza from the local vendor is absolutely incredible. Mumbai street food never disappoints! #StreetFood #Mumbai #Pizza #Foodie",
      likes: 1456,
      comments: 189,
      timestamp: new Date(Date.now() - 9000000).toISOString(),
      type: "image",
    },
  ]

  // Text-based posts (existing)
  const temporaryFeed = [
    {
      id: 9001,
      userId: 9001,
      username: "Arjun Sharma",
      profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=ArjunSharma",
      text: "Just watched the new superhero movie and I'm convinced I could totally be a vigilante. Already practicing my dramatic cape swoosh in the mirror 🦸‍♂️",
      likes: 156,
      reactions: { fire: 89, heart: 45, mind: 22 },
      comments: 34,
      timestamp: new Date(Date.now() - 1800000).toISOString(),
    },
    {
      id: 9002,
      userId: 9002,
      username: "Priya Patel",
      profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=PriyaPatel",
      text: "My cat just brought me a dead mouse as a 'gift' and I had to pretend to be grateful. The things we do for love... 🐱💀",
      likes: 203,
      reactions: { fire: 67, heart: 134, mind: 12 },
      comments: 56,
      timestamp: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: 9003,
      userId: 9003,
      username: "Vivaan Singh",
      profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=VivaanSingh",
      text: "Took my dog to the park and he made 15 new friends while I stood there awkwardly. Pretty sure my dog has better social skills than me 🐕",
      likes: 178,
      reactions: { fire: 23, heart: 145, mind: 10 },
      comments: 42,
      timestamp: new Date(Date.now() - 5400000).toISOString(),
    },
    {
      id: 9004,
      userId: 9004,
      username: "Ananya Gupta",
      profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=AnanyaGupta",
      text: "Went scuba diving today and saw a sea turtle that was probably older than my great-grandmother. The ocean really puts life into perspective 🌊🐢",
      likes: 267,
      reactions: { fire: 45, heart: 189, mind: 33 },
      comments: 78,
      timestamp: new Date(Date.now() - 7200000).toISOString(),
    },
  ]

  useEffect(() => {
    if (!user) return

    // Load user's own posts and followed users' posts
    const savedThreads = localStorage.getItem("auraThreads")
    let userThreads: Thread[] = []

    if (savedThreads) {
      const allThreads: Thread[] = JSON.parse(savedThreads)
      userThreads = allThreads.filter((thread) => user.following.includes(thread.userId) || thread.userId === user.id)
    }

    // Combine user threads with temporary feed
    const combinedFeed = [...temporaryFeed, ...userThreads]
    setFeedThreads(combinedFeed.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()))

    // Set Instagram posts
    setInstagramPosts(stockInstagramPosts)
  }, [user])

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
    const updatedThreads = feedThreads.map((thread) =>
      thread.id === threadId ? { ...thread, likes: thread.likes + 1 } : thread,
    )
    setFeedThreads(updatedThreads)
  }

  const likeInstagramPost = (postId: number) => {
    const updatedPosts = instagramPosts.map((post) => (post.id === postId ? { ...post, likes: post.likes + 1 } : post))
    setInstagramPosts(updatedPosts)
  }

  const reactToThread = (threadId: number, reactionType: keyof Thread["reactions"]) => {
    const updatedThreads = feedThreads.map((thread) =>
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
    setFeedThreads(updatedThreads)
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

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case "celebrity":
        return "⭐"
      case "meme":
        return "😂"
      default:
        return "📸"
    }
  }

  if (!user) return null

  // Combine and sort all posts by timestamp
  const allPosts = [
    ...instagramPosts.map((post) => ({ ...post, postType: "instagram" as const })),
    ...feedThreads.map((thread) => ({ ...thread, postType: "thread" as const })),
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4 apple-font">My Feed</h1>
          <p className="text-xl text-gray-400 font-medium">Stories, memes, and updates from your network</p>
        </div>

        {/* Combined Feed */}
        <div className="space-y-6">
          {allPosts.map((post) => {
            if (post.postType === "instagram") {
              const instagramPost = post as InstagramPost & { postType: "instagram" }
              const isFollowing = user.following.includes(instagramPost.userId)

              return (
                <div
                  key={`ig-${instagramPost.id}`}
                  className="glass-effect rounded-2xl overflow-hidden hover-lift transition-all duration-300"
                >
                  {/* Post Header */}
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={instagramPost.profilePic || "/placeholder.svg"}
                        alt={`${instagramPost.username}'s avatar`}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-bold text-white apple-font">{instagramPost.username}</h3>
                          <span className="text-lg">{getPostTypeIcon(instagramPost.type)}</span>
                        </div>
                        <span className="text-sm text-gray-500 font-medium">
                          {formatTimeAgo(instagramPost.timestamp)}
                        </span>
                      </div>
                    </div>
                    {instagramPost.userId !== user.id && (
                      <div className="flex items-center space-x-2">
                        {isFollowing ? (
                          <button
                            onClick={() => unfollowUser(instagramPost.userId)}
                            className="bg-gray-600 hover:bg-gray-700 text-white font-bold px-3 py-1 rounded-full text-sm transition-colors"
                          >
                            Following ✓
                          </button>
                        ) : (
                          <button
                            onClick={() => followUser(instagramPost.userId)}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1 rounded-full text-sm transition-colors"
                          >
                            Follow
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Post Image */}
                  <div className="relative">
                    <img
                      src={instagramPost.image || "/placeholder.svg"}
                      alt="Post content"
                      className="w-full h-80 object-cover"
                      crossOrigin="anonymous"
                    />
                  </div>

                  {/* Post Actions */}
                  <div className="p-4">
                    <div className="flex items-center space-x-4 mb-3">
                      <button
                        onClick={() => likeInstagramPost(instagramPost.id)}
                        className="flex items-center space-x-2 text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <span className="text-xl">❤️</span>
                        <span className="text-sm font-bold">{instagramPost.likes}</span>
                      </button>
                      <button className="flex items-center space-x-2 text-gray-400 hover:text-gray-300 transition-colors">
                        <span className="text-xl">💬</span>
                        <span className="text-sm font-bold">{instagramPost.comments}</span>
                      </button>
                      <button
                        onClick={() => onOpenDM(instagramPost.userId, instagramPost.username)}
                        className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <span className="text-xl">📤</span>
                      </button>
                    </div>

                    {/* Caption */}
                    <p className="text-gray-300 leading-relaxed font-medium">
                      <span className="font-bold text-white">{instagramPost.username}</span> {instagramPost.caption}
                    </p>
                  </div>
                </div>
              )
            } else {
              const thread = post as Thread & { postType: "thread" }
              const isFollowing = user.following.includes(thread.userId)

              return (
                <div
                  key={`thread-${thread.id}`}
                  className="glass-effect rounded-2xl p-6 hover-lift transition-all duration-300"
                >
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
                          {thread.userId > 9000 && (
                            <span className="bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                              Trending
                            </span>
                          )}
                        </div>
                        {thread.userId !== user.id && (
                          <div className="flex items-center space-x-2">
                            {isFollowing ? (
                              <button
                                onClick={() => unfollowUser(thread.userId)}
                                className="bg-gray-600 hover:bg-gray-700 text-white font-bold px-4 py-1 rounded-full text-sm transition-colors"
                              >
                                Following ✓
                              </button>
                            ) : (
                              <button
                                onClick={() => followUser(thread.userId)}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-1 rounded-full text-sm transition-colors"
                              >
                                Follow
                              </button>
                            )}
                            <button
                              onClick={() => onOpenDM(thread.userId, thread.username)}
                              className="bg-gray-600 hover:bg-gray-700 text-white font-bold px-4 py-1 rounded-full text-sm transition-colors"
                            >
                              Message
                            </button>
                          </div>
                        )}
                      </div>
                      <p className="text-gray-300 mb-4 leading-relaxed font-medium">{thread.text}</p>

                      <div className="flex items-center space-x-6">
                        <button
                          onClick={() => likeThread(thread.id)}
                          className="flex items-center space-x-2 text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <span>❤️</span>
                          <span className="text-sm font-bold">{thread.likes}</span>
                        </button>

                        <button
                          onClick={() => reactToThread(thread.id, "fire")}
                          className="flex items-center space-x-2 text-gray-400 hover:text-orange-400 transition-colors"
                        >
                          <span>🔥</span>
                          <span className="text-sm font-bold">{thread.reactions.fire}</span>
                        </button>

                        <button
                          onClick={() => reactToThread(thread.id, "heart")}
                          className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors"
                        >
                          <span>💙</span>
                          <span className="text-sm font-bold">{thread.reactions.heart}</span>
                        </button>

                        <button
                          onClick={() => reactToThread(thread.id, "mind")}
                          className="flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition-colors"
                        >
                          <span>🧠</span>
                          <span className="text-sm font-bold">{thread.reactions.mind}</span>
                        </button>

                        <button className="flex items-center space-x-2 text-gray-400 hover:text-gray-300 transition-colors">
                          <span>💬</span>
                          <span className="text-sm font-bold">{thread.comments}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
          })}
        </div>

        {allPosts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📱</div>
            <h3 className="text-2xl font-bold text-white mb-2 apple-font">Your feed is loading...</h3>
            <p className="text-gray-400 font-medium">Check back soon for more content!</p>
          </div>
        )}
      </div>
    </div>
  )
}

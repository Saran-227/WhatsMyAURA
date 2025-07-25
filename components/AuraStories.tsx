"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  doc,
  increment,
} from "firebase/firestore"
import { db } from "@/lib/firebase"
import type { User, AuraStory } from "@/app/page"

interface AuraStoriesProps {
  user: User | null
  setUser: (user: User) => void
}

export default function AuraStories({ user, setUser }: AuraStoriesProps) {
  const [stories, setStories] = useState<AuraStory[]>([])
  const [showCreateStory, setShowCreateStory] = useState(false)
  const [selectedStory, setSelectedStory] = useState<AuraStory | null>(null)
  const [storyText, setStoryText] = useState("")
  const [storyImage, setStoryImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)

  // Load all stories from Firebase
  useEffect(() => {
    loadStories()
  }, [])

  const loadStories = async () => {
    try {
      setLoading(true)
      const storiesRef = collection(db, "stories")
      const q = query(storiesRef, orderBy("timestamp", "desc"))
      const querySnapshot = await getDocs(q)

      const loadedStories: AuraStory[] = []
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        // Filter stories from last 24 hours
        const storyTime = data.timestamp?.toDate?.() || new Date(data.timestamp)
        const isRecent = Date.now() - storyTime.getTime() < 24 * 60 * 60 * 1000

        if (isRecent) {
          loadedStories.push({
            id: doc.id,
            userId: data.userId,
            username: data.username,
            profilePic: data.profilePic,
            image: data.image,
            text: data.text,
            timestamp: storyTime.toISOString(),
            views: data.views || 0,
            likes: data.likes || 0,
          })
        }
      })

      setStories(loadedStories)
      console.log(`Loaded ${loadedStories.length} recent stories from Firebase`)
    } catch (error) {
      console.error("Error loading stories:", error)
      // Fallback to sample stories if Firebase fails
      loadSampleStories()
    } finally {
      setLoading(false)
    }
  }

  const loadSampleStories = () => {
    const sampleStories: AuraStory[] = [
      {
        id: 1001,
        userId: 1001,
        username: "Aarav Sharma",
        profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=AaravSharma",
        image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=600&fit=crop",
        text: "Just hit a century! 💯 The grind never stops! #Cricket #AURA",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        views: 234,
        likes: 45,
      },
      {
        id: 1002,
        userId: 1002,
        username: "Diya Patel",
        profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=DiyaPatel",
        image: "https://images.unsplash.com/photo-1494790108755-2616c9c0e8e0?w=400&h=600&fit=crop",
        text: "New project announcement coming soon! ✨ #Bollywood #Excited",
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        views: 567,
        likes: 89,
      },
      {
        id: 1003,
        userId: 1003,
        username: "Arjun Singh",
        profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=ArjunSingh",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
        text: "Mountain vibes! 🏔️ Nature is the best therapy #Travel #AURA",
        timestamp: new Date(Date.now() - 10800000).toISOString(),
        views: 123,
        likes: 34,
      },
    ]
    setStories(sampleStories)
  }

  const createStory = async () => {
    if (!user || (!storyText.trim() && !storyImage) || creating) return

    try {
      setCreating(true)

      const storyData = {
        userId: user.id,
        username: user.username,
        profilePic: user.profilePic,
        image: storyImage,
        text: storyText.trim(),
        timestamp: serverTimestamp(),
        views: 0,
        likes: 0,
      }

      // Add story to Firebase
      const docRef = await addDoc(collection(db, "stories"), storyData)
      console.log("Story created with ID:", docRef.id)

      // Create local story object for immediate UI update
      const newStory: AuraStory = {
        id: docRef.id,
        userId: user.id,
        username: user.username,
        profilePic: user.profilePic,
        image: storyImage,
        text: storyText.trim(),
        timestamp: new Date().toISOString(),
        views: 0,
        likes: 0,
      }

      // Add to local state for immediate feedback
      setStories((prevStories) => [newStory, ...prevStories])

      // Reset form
      setStoryText("")
      setStoryImage(null)
      setShowCreateStory(false)

      // Reload stories to get the latest from all users
      setTimeout(() => {
        loadStories()
      }, 1000)
    } catch (error) {
      console.error("Error creating story:", error)
      alert("Failed to create story. Please try again.")
    } finally {
      setCreating(false)
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setStoryImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const viewStory = async (story: AuraStory) => {
    setSelectedStory(story)

    try {
      // Increment view count in Firebase
      const storyRef = doc(db, "stories", story.id.toString())
      await updateDoc(storyRef, {
        views: increment(1),
      })

      // Update local state
      setStories((prevStories) => prevStories.map((s) => (s.id === story.id ? { ...s, views: s.views + 1 } : s)))
    } catch (error) {
      console.error("Error updating view count:", error)
    }
  }

  const likeStory = async (storyId: number | string) => {
    try {
      // Update Firebase
      const storyRef = doc(db, "stories", storyId.toString())
      await updateDoc(storyRef, {
        likes: increment(1),
      })

      // Update local state
      setStories((prevStories) =>
        prevStories.map((story) => (story.id === storyId ? { ...story, likes: story.likes + 1 } : story)),
      )
    } catch (error) {
      console.error("Error updating like count:", error)
    }
  }

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    return "1d ago"
  }

  if (!user) return null

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4 apple-font">AURA Stories</h1>
          <p className="text-xl text-gray-400 font-medium">Share your moments with the world</p>
          {loading && (
            <div className="mt-4">
              <div className="inline-flex items-center px-4 py-2 bg-gray-800 rounded-lg">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
                <span className="text-gray-300">Loading global stories...</span>
              </div>
            </div>
          )}
        </div>

        {/* Stories Row */}
        <div className="flex space-x-4 overflow-x-auto pb-4 mb-8">
          {/* Add Story Button */}
          <button
            onClick={() => setShowCreateStory(true)}
            className="flex-shrink-0 flex flex-col items-center space-y-2 group"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold group-hover:scale-105 transition-transform">
              +
            </div>
            <span className="text-sm text-gray-400 font-medium">Your Story</span>
          </button>

          {/* Stories */}
          {stories.map((story) => (
            <button
              key={story.id}
              onClick={() => viewStory(story)}
              className="flex-shrink-0 flex flex-col items-center space-y-2 group"
            >
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 to-red-500 p-0.5">
                  <img
                    src={story.profilePic || "/placeholder.svg"}
                    alt={story.username}
                    className="w-full h-full rounded-full object-cover border-2 border-black"
                  />
                </div>
                {story.userId === user.id && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">👁️</span>
                  </div>
                )}
              </div>
              <span className="text-sm text-gray-400 font-medium max-w-16 truncate">
                {story.userId === user.id ? "You" : story.username}
              </span>
            </button>
          ))}
        </div>

        {/* Create Story Modal */}
        {showCreateStory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="glass-effect rounded-2xl w-full max-w-md">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white apple-font">Share Your AURA Story</h3>
                  <button
                    onClick={() => setShowCreateStory(false)}
                    className="text-gray-400 hover:text-white transition-colors text-xl"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Add Image (Optional)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                    />
                    {storyImage && (
                      <img
                        src={storyImage || "/placeholder.svg"}
                        alt="Story preview"
                        className="mt-2 w-full h-32 object-cover rounded-lg"
                      />
                    )}
                  </div>

                  {/* Text Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Story Text</label>
                    <textarea
                      value={storyText}
                      onChange={(e) => setStoryText(e.target.value)}
                      placeholder="Share your AURA moment with the world..."
                      className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 resize-none h-24 focus:outline-none focus:border-blue-500"
                      maxLength={150}
                    />
                    <div className="text-right text-sm text-gray-500 mt-1">{storyText.length}/150</div>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
                    <p className="text-sm text-blue-300">
                      🌍 Your story will be visible to everyone who visits this app!
                    </p>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowCreateStory(false)}
                      className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition-colors"
                      disabled={creating}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={createStory}
                      disabled={(!storyText.trim() && !storyImage) || creating}
                      className="flex-1 premium-gradient text-white font-bold py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {creating ? "Sharing..." : "Share Globally"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Story Viewer Modal */}
        {selectedStory && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
            <div className="relative w-full max-w-sm h-full max-h-screen flex flex-col">
              {/* Story Header */}
              <div className="flex items-center justify-between p-4 text-white">
                <div className="flex items-center space-x-3">
                  <img
                    src={selectedStory.profilePic || "/placeholder.svg"}
                    alt={selectedStory.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold apple-font">{selectedStory.username}</h4>
                    <p className="text-sm text-gray-300">{formatTimeAgo(selectedStory.timestamp)}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedStory(null)}
                  className="text-white hover:text-gray-300 transition-colors text-xl"
                >
                  ✕
                </button>
              </div>

              {/* Story Content */}
              <div className="flex-1 relative bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg mx-4 mb-4 overflow-hidden">
                {selectedStory.image && (
                  <img
                    src={selectedStory.image || "/placeholder.svg"}
                    alt="Story content"
                    className="w-full h-full object-cover"
                    crossOrigin="anonymous"
                  />
                )}
                {selectedStory.text && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white font-medium text-lg">{selectedStory.text}</p>
                  </div>
                )}
              </div>

              {/* Story Actions */}
              <div className="flex items-center justify-between p-4 text-white">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => likeStory(selectedStory.id)}
                    className="flex items-center space-x-2 hover:text-red-400 transition-colors"
                  >
                    <span className="text-xl">❤️</span>
                    <span className="text-sm font-bold">{selectedStory.likes}</span>
                  </button>
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">👁️</span>
                    <span className="text-sm font-bold">{selectedStory.views}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Stories Grid */}
        {stories.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6 apple-font">Global Stories ({stories.length})</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {stories.slice(0, 12).map((story) => (
                <button
                  key={story.id}
                  onClick={() => viewStory(story)}
                  className="glass-effect rounded-xl overflow-hidden hover-lift transition-all duration-300"
                >
                  <div className="relative h-48">
                    {story.image ? (
                      <img
                        src={story.image || "/placeholder.svg"}
                        alt="Story thumbnail"
                        className="w-full h-full object-cover"
                        crossOrigin="anonymous"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                        <span className="text-white text-4xl">✨</span>
                      </div>
                    )}
                    <div className="absolute top-2 left-2">
                      <img
                        src={story.profilePic || "/placeholder.svg"}
                        alt={story.username}
                        className="w-8 h-8 rounded-full border-2 border-white object-cover"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                      <p className="text-white text-sm font-medium truncate">{story.username}</p>
                      <p className="text-gray-300 text-xs">{formatTimeAgo(story.timestamp)}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-300">👁️ {story.views}</span>
                        <span className="text-xs text-gray-300">❤️ {story.likes}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && stories.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📸</div>
            <h3 className="text-xl font-bold text-white mb-2">No Stories Yet</h3>
            <p className="text-gray-400 mb-6">Be the first to share your AURA story with the world!</p>
            <button
              onClick={() => setShowCreateStory(true)}
              className="premium-gradient text-white font-bold py-3 px-6 rounded-lg hover-lift transition-all duration-300"
            >
              Create First Story
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

"use client"

import type React from "react"

import { useState, useRef } from "react"
import type { User } from "@/app/page"

interface DashboardProps {
  user: User | null
  setUser: (user: User) => void
  onOpenFollowModal: (type: "followers" | "following", users: number[]) => void
}

export default function Dashboard({ user, setUser, onOpenFollowModal }: DashboardProps) {
  const [coolestThing, setCoolestThing] = useState(user?.coolestThing || "")
  const [craziestPunishment, setCraziestPunishment] = useState(user?.craziestPunishment || "")
  const [relationshipStatus, setRelationshipStatus] = useState(user?.relationshipStatus || "")
  const [state, setState] = useState(user?.state || "")
  const [city, setCity] = useState(user?.city || "")
  const [interestedIn, setInterestedIn] = useState(user?.interestedIn || "")
  const [isEditing, setIsEditing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!user) return null

  const getLevel = (auraScore: number) => Math.floor(auraScore / 100) + 1
  const getProgressToNextLevel = (auraScore: number) => auraScore % 100

  const handleSave = () => {
    const updatedUser = {
      ...user,
      coolestThing,
      craziestPunishment,
      relationshipStatus,
      state,
      city,
      interestedIn,
    }
    setUser(updatedUser)
    localStorage.setItem("auraUser", JSON.stringify(updatedUser))
    setIsEditing(false)
  }

  const handleProfilePictureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        const updatedUser = {
          ...user,
          profilePic: imageUrl,
        }
        setUser(updatedUser)
        localStorage.setItem("auraUser", JSON.stringify(updatedUser))
      }
      reader.readAsDataURL(file)
    }
  }

  const relationshipOptions = ["Single", "In a relationship", "Married", "It's complicated", "Rather not say"]

  const interestedInOptions = [
    "Gaming",
    "Music",
    "Sports",
    "Art",
    "Technology",
    "Travel",
    "Food",
    "Movies",
    "Books",
    "Fitness",
    "Photography",
    "Dancing",
  ]

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Header */}
        <div className="glass-effect rounded-2xl p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <div className="relative">
              <img
                src={user.profilePic || "/placeholder.svg"}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-gray-600 object-cover"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors"
                title="Change profile picture"
              >
                📷
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleProfilePictureUpload}
                className="hidden"
              />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-white mb-4 apple-font">{user.username}</h2>

              {/* Instagram-style Stats */}
              <div className="flex justify-center md:justify-start space-x-8 mb-6">
                <div className="text-center">
                  <div className="text-xl font-bold text-white">{user.auraScore}</div>
                  <div className="text-sm text-gray-400 font-medium">AURA</div>
                </div>
                <button
                  onClick={() => onOpenFollowModal("followers", user.followers)}
                  className="text-center hover:opacity-80 transition-opacity"
                >
                  <div className="text-xl font-bold text-white">{user.followers.length}</div>
                  <div className="text-sm text-gray-400 font-medium">followers</div>
                </button>
                <button
                  onClick={() => onOpenFollowModal("following", user.following)}
                  className="text-center hover:opacity-80 transition-opacity"
                >
                  <div className="text-xl font-bold text-white">{user.following.length}</div>
                  <div className="text-sm text-gray-400 font-medium">following</div>
                </button>
                <div className="text-center">
                  <div className="text-xl font-bold text-white">Level {getLevel(user.auraScore)}</div>
                  <div className="text-sm text-gray-400 font-medium">level</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Progress to Level {getLevel(user.auraScore) + 1}</span>
                  <span>{getProgressToNextLevel(user.auraScore)}/100</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className="premium-gradient h-2 rounded-full transition-all duration-500"
                    style={{ width: `${getProgressToNextLevel(user.auraScore)}%` }}
                  ></div>
                </div>
              </div>

              {/* Edit Button */}
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="premium-gradient text-white font-bold px-6 py-2 rounded-lg hover-lift transition-all duration-300"
              >
                {isEditing ? "Cancel ❌" : "Edit Profile ✏️"}
              </button>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass-effect rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 apple-font">📍 Location & Status</h3>
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">State</label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="Your state..."
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Your city..."
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Relationship Status</label>
                  <select
                    value={relationshipStatus}
                    onChange={(e) => setRelationshipStatus(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select status...</option>
                    {relationshipOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-gray-400">📍</span>
                  <span className="text-white font-medium">
                    {city && state ? `${city}, ${state}` : city || state || "Location not set"}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-400">💕</span>
                  <span className="text-white font-medium">{relationshipStatus || "Relationship status not set"}</span>
                </div>
              </div>
            )}
          </div>

          <div className="glass-effect rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 apple-font">🎯 Interests</h3>
            {isEditing ? (
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Interested In</label>
                <select
                  value={interestedIn}
                  onChange={(e) => setInterestedIn(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select interests...</option>
                  {interestedInOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <span className="text-gray-400">🎯</span>
                <span className="text-white font-medium">{interestedIn || "Interests not set"}</span>
              </div>
            )}
          </div>
        </div>

        {/* Profile Details */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass-effect rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 apple-font">🏆 Greatest Achievement</h3>
            {isEditing ? (
              <textarea
                value={coolestThing}
                onChange={(e) => setCoolestThing(e.target.value)}
                placeholder="Share your proudest moment..."
                className="w-full bg-gray-800 border border-gray-600 rounded-lg p-4 text-white placeholder-gray-400 resize-none h-32 focus:outline-none focus:border-blue-500"
              />
            ) : (
              <p className="text-gray-300 min-h-[8rem] flex items-center font-medium">
                {coolestThing || "Share your greatest achievement to inspire others!"}
              </p>
            )}
          </div>

          <div className="glass-effect rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 apple-font">💀 Biggest Lesson</h3>
            {isEditing ? (
              <textarea
                value={craziestPunishment}
                onChange={(e) => setCraziestPunishment(e.target.value)}
                placeholder="What taught you the most..."
                className="w-full bg-gray-800 border border-gray-600 rounded-lg p-4 text-white placeholder-gray-400 resize-none h-32 focus:outline-none focus:border-blue-500"
              />
            ) : (
              <p className="text-gray-300 min-h-[8rem] flex items-center font-medium">
                {craziestPunishment || "Share a lesson that shaped who you are today!"}
              </p>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="text-center">
            <button
              onClick={handleSave}
              className="premium-gradient text-white font-bold px-8 py-3 rounded-lg hover-lift transition-all duration-300 mr-4"
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold px-8 py-3 rounded-lg transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

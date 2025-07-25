"use client"

import { useState } from "react"
import type { User } from "@/app/page"

interface DashboardProps {
  user: User
  onUpdateUser: (user: User) => void
}

export function Dashboard({ user, onUpdateUser }: DashboardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [coolestThing, setCoolestThing] = useState(user.coolestThing)
  const [craziestPunishment, setCraziestPunishment] = useState(user.craziestPunishment)

  const handleSave = () => {
    const updatedUser = {
      ...user,
      coolestThing,
      craziestPunishment,
    }
    onUpdateUser(updatedUser)
    setIsEditing(false)
  }

  const getLevel = (auraScore: number) => {
    return Math.floor(auraScore / 100) + 1
  }

  const getProgressToNextLevel = (auraScore: number) => {
    return ((auraScore % 100) / 100) * 100
  }

  const getLevelEmoji = (level: number) => {
    if (level >= 10) return "👑"
    if (level >= 7) return "🔥"
    if (level >= 5) return "⚡"
    if (level >= 3) return "✨"
    return "🌟"
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Profile Card */}
      <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-3xl p-8 border border-white/20 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          {/* Profile Picture */}
          <div className="relative">
            <img
              src={user.profilePicture || "/placeholder.svg"}
              alt={user.username}
              className="w-32 h-32 rounded-full border-4 border-gradient-to-r from-pink-400 to-cyan-400"
            />
            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full p-2">
              <span className="text-2xl">{getLevelEmoji(getLevel(user.auraScore))}</span>
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl font-black text-white mb-2">{user.username}</h2>
            <div className="flex items-center justify-center md:justify-start space-x-4 mb-4">
              <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-full px-4 py-2">
                <span className="text-white font-bold text-xl">{user.auraScore} AURA</span>
              </div>
              <div className="bg-white/10 rounded-full px-4 py-2">
                <span className="text-white font-medium">Level {getLevel(user.auraScore)}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-white/70 mb-2">
                <span>Level {getLevel(user.auraScore)}</span>
                <span>Level {getLevel(user.auraScore) + 1}</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-pink-400 to-cyan-400 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${getProgressToNextLevel(user.auraScore)}%` }}
                />
              </div>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-6 py-2 rounded-xl hover:scale-105 transform transition-all duration-200"
            >
              {isEditing ? "Cancel ❌" : "Edit Profile ✏️"}
            </button>
          </div>
        </div>
      </div>

      {/* Editable Fields */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <span className="mr-2">😎</span>
            Coolest Thing I've Done
          </h3>
          {isEditing ? (
            <textarea
              value={coolestThing}
              onChange={(e) => setCoolestThing(e.target.value)}
              placeholder="Tell us about your coolest achievement..."
              className="w-full h-32 px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"
            />
          ) : (
            <p className="text-white/80 text-lg leading-relaxed">
              {coolestThing || "Nothing added yet... Edit to share your coolest moment! 🚀"}
            </p>
          )}
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <span className="mr-2">💀</span>
            Craziest Punishment I Got
          </h3>
          {isEditing ? (
            <textarea
              value={craziestPunishment}
              onChange={(e) => setCraziestPunishment(e.target.value)}
              placeholder="Share your wildest punishment story..."
              className="w-full h-32 px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"
            />
          ) : (
            <p className="text-white/80 text-lg leading-relaxed">
              {craziestPunishment || "No crazy punishments yet... or too embarrassed to share? 😅"}
            </p>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="text-center mt-6">
          <button
            onClick={handleSave}
            className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold text-xl px-8 py-3 rounded-xl hover:scale-105 transform transition-all duration-200"
          >
            Save Changes 💾
          </button>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-lg rounded-2xl p-4 border border-white/20 text-center">
          <div className="text-3xl mb-2">🎮</div>
          <div className="text-white font-bold text-lg">Games Played</div>
          <div className="text-white/70">Coming Soon</div>
        </div>
        <div className="bg-gradient-to-br from-green-500/20 to-teal-500/20 backdrop-blur-lg rounded-2xl p-4 border border-white/20 text-center">
          <div className="text-3xl mb-2">🧵</div>
          <div className="text-white font-bold text-lg">Threads Posted</div>
          <div className="text-white/70">Coming Soon</div>
        </div>
        <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 backdrop-blur-lg rounded-2xl p-4 border border-white/20 text-center">
          <div className="text-3xl mb-2">❤️</div>
          <div className="text-white font-bold text-lg">Likes Received</div>
          <div className="text-white/70">Coming Soon</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-lg rounded-2xl p-4 border border-white/20 text-center">
          <div className="text-3xl mb-2">🏆</div>
          <div className="text-white font-bold text-lg">Rank</div>
          <div className="text-white/70">Coming Soon</div>
        </div>
      </div>
    </div>
  )
}

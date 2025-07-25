"use client"

import { useState, useEffect } from "react"
import type { User } from "@/app/page"

export function Leaderboard() {
  const [users, setUsers] = useState<User[]>([])
  const [timeFilter, setTimeFilter] = useState<"weekly" | "alltime">("alltime")

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = () => {
    const savedUsers = JSON.parse(localStorage.getItem("users") || "[]")

    // Add some sample users if none exist
    if (savedUsers.length === 0) {
      const sampleUsers = [
        {
          id: "sample1",
          username: "AuraLegend",
          profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=AuraLegend",
          auraScore: 1250,
          coolestThing: "Organized a flash mob in the school cafeteria",
          craziestPunishment: "Had to clean the entire gym after the flash mob",
          level: 13,
        },
        {
          id: "sample2",
          username: "ChaosQueen",
          profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=ChaosQueen",
          auraScore: 980,
          coolestThing: "Started a school-wide meme that went viral",
          craziestPunishment: "Banned from using the school WiFi for a week",
          level: 10,
        },
        {
          id: "sample3",
          username: "VibeKing",
          profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=VibeKing",
          auraScore: 750,
          coolestThing: "Convinced the principal to have a pajama day",
          craziestPunishment: "Had to wear a suit to school for a month",
          level: 8,
        },
        {
          id: "sample4",
          username: "RebelRose",
          profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=RebelRose",
          auraScore: 650,
          coolestThing: "Snuck a pet hamster into class for show and tell",
          craziestPunishment: "Had to write a 10-page essay on pet responsibility",
          level: 7,
        },
        {
          id: "sample5",
          username: "NeonNinja",
          profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=NeonNinja",
          auraScore: 420,
          coolestThing: "Created a secret underground study group",
          craziestPunishment: "Caught and had to tutor younger students",
          level: 5,
        },
      ]
      localStorage.setItem("users", JSON.stringify(sampleUsers))
      setUsers(sampleUsers)
    } else {
      setUsers(savedUsers)
    }
  }

  const sortedUsers = users.sort((a, b) => b.auraScore - a.auraScore).slice(0, 50) // Top 50

  const getRankEmoji = (rank: number) => {
    switch (rank) {
      case 1:
        return "👑"
      case 2:
        return "🥈"
      case 3:
        return "🥉"
      default:
        return "🏆"
    }
  }

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "from-yellow-400 to-yellow-600"
      case 2:
        return "from-gray-300 to-gray-500"
      case 3:
        return "from-orange-400 to-orange-600"
      default:
        return "from-purple-400 to-pink-500"
    }
  }

  const getLevel = (auraScore: number) => {
    return Math.floor(auraScore / 100) + 1
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
      <div className="text-center mb-8">
        <h1 className="text-5xl font-black bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent mb-4">
          Leaderboard 🏆
        </h1>
        <p className="text-xl text-white/80">See who's got the highest AURA in the game!</p>
      </div>

      {/* Time Filter */}
      <div className="flex justify-center mb-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-2 border border-white/20">
          <button
            onClick={() => setTimeFilter("weekly")}
            className={`px-6 py-2 rounded-xl font-medium transition-all duration-200 ${
              timeFilter === "weekly"
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                : "text-white/70 hover:text-white"
            }`}
          >
            Top Weekly 📅
          </button>
          <button
            onClick={() => setTimeFilter("alltime")}
            className={`px-6 py-2 rounded-xl font-medium transition-all duration-200 ${
              timeFilter === "alltime"
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                : "text-white/70 hover:text-white"
            }`}
          >
            All-Time 🌟
          </button>
        </div>
      </div>

      {/* Top 3 Podium */}
      {sortedUsers.length >= 3 && (
        <div className="grid grid-cols-3 gap-4 mb-8">
          {/* 2nd Place */}
          <div className="text-center pt-8">
            <div className="bg-gradient-to-br from-gray-300/20 to-gray-500/20 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
              <div className="text-4xl mb-2">🥈</div>
              <img
                src={sortedUsers[1].profilePicture || "/placeholder.svg"}
                alt={sortedUsers[1].username}
                className="w-16 h-16 rounded-full mx-auto mb-3 border-2 border-gray-400"
              />
              <h3 className="text-white font-bold text-lg mb-1">{sortedUsers[1].username}</h3>
              <div className="bg-gradient-to-r from-gray-300 to-gray-500 rounded-full px-3 py-1 text-white font-bold text-sm">
                {sortedUsers[1].auraScore} AURA
              </div>
            </div>
          </div>

          {/* 1st Place */}
          <div className="text-center">
            <div className="bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 backdrop-blur-lg rounded-3xl p-6 border border-yellow-400/30 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full p-2">
                <span className="text-2xl">👑</span>
              </div>
              <div className="text-5xl mb-2 mt-4">🏆</div>
              <img
                src={sortedUsers[0].profilePicture || "/placeholder.svg"}
                alt={sortedUsers[0].username}
                className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-yellow-400"
              />
              <h3 className="text-white font-bold text-xl mb-1">{sortedUsers[0].username}</h3>
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full px-4 py-2 text-black font-bold">
                {sortedUsers[0].auraScore} AURA
              </div>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="text-center pt-8">
            <div className="bg-gradient-to-br from-orange-400/20 to-orange-600/20 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
              <div className="text-4xl mb-2">🥉</div>
              <img
                src={sortedUsers[2].profilePicture || "/placeholder.svg"}
                alt={sortedUsers[2].username}
                className="w-16 h-16 rounded-full mx-auto mb-3 border-2 border-orange-400"
              />
              <h3 className="text-white font-bold text-lg mb-1">{sortedUsers[2].username}</h3>
              <div className="bg-gradient-to-r from-orange-400 to-orange-600 rounded-full px-3 py-1 text-white font-bold text-sm">
                {sortedUsers[2].auraScore} AURA
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Leaderboard */}
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 overflow-hidden">
        <div className="p-6 border-b border-white/20">
          <h2 className="text-2xl font-bold text-white text-center">Full Rankings</h2>
        </div>

        <div className="divide-y divide-white/10">
          {sortedUsers.map((user, index) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors duration-200"
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-r ${getRankColor(index + 1)} flex items-center justify-center font-bold text-white`}
                >
                  {index < 3 ? getRankEmoji(index + 1) : index + 1}
                </div>

                <img
                  src={user.profilePicture || "/placeholder.svg"}
                  alt={user.username}
                  className="w-12 h-12 rounded-full"
                />

                <div>
                  <h3 className="text-white font-bold text-lg">{user.username}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-white/70">Level {getLevel(user.auraScore)}</span>
                    <span className="text-lg">{getLevelEmoji(getLevel(user.auraScore))}</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="bg-gradient-to-r from-purple-400 to-pink-500 rounded-full px-4 py-2">
                  <span className="text-white font-bold text-lg">{user.auraScore}</span>
                  <span className="text-white/80 text-sm ml-1">AURA</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {sortedUsers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-2xl font-bold text-white mb-2">No rankings yet!</h3>
            <p className="text-white/70">Start playing games and earning AURA to appear on the leaderboard!</p>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="bg-gradient-to-br from-green-500/20 to-teal-500/20 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center">
          <div className="text-4xl mb-2">👥</div>
          <div className="text-2xl font-bold text-white">{sortedUsers.length}</div>
          <div className="text-white/70">Total Players</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center">
          <div className="text-4xl mb-2">⚡</div>
          <div className="text-2xl font-bold text-white">
            {sortedUsers.reduce((sum, user) => sum + user.auraScore, 0).toLocaleString()}
          </div>
          <div className="text-white/70">Total AURA</div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center">
          <div className="text-4xl mb-2">🔥</div>
          <div className="text-2xl font-bold text-white">
            {sortedUsers.length > 0
              ? Math.round(sortedUsers.reduce((sum, user) => sum + user.auraScore, 0) / sortedUsers.length)
              : 0}
          </div>
          <div className="text-white/70">Average AURA</div>
        </div>
      </div>
    </div>
  )
}

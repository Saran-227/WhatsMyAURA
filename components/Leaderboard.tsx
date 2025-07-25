"use client"

import { useState, useEffect } from "react"

interface LeaderboardUser {
  id: number
  username: string
  auraScore: number
  profilePic: string
}

interface LeaderboardProps {
  onOpenDM: (userId: number, username: string) => void
}

export default function Leaderboard({ onOpenDM }: LeaderboardProps) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([])
  const [timeFilter, setTimeFilter] = useState("all-time")

  useEffect(() => {
    const dummyUsers: LeaderboardUser[] = [
      {
        id: 1001,
        username: "Aarav Sharma",
        auraScore: 2450,
        profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=AaravSharma",
      },
      {
        id: 1002,
        username: "Diya Patel",
        auraScore: 2100,
        profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=DiyaPatel",
      },
      {
        id: 1003,
        username: "Arjun Singh",
        auraScore: 1890,
        profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=ArjunSingh",
      },
      {
        id: 1004,
        username: "Ananya Gupta",
        auraScore: 1750,
        profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=AnanyaGupta",
      },
      {
        id: 1005,
        username: "Vivaan Agarwal",
        auraScore: 1620,
        profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=VivaanAgarwal",
      },
      {
        id: 1006,
        username: "Saanvi Verma",
        auraScore: 1480,
        profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=SaanviVerma",
      },
      {
        id: 1007,
        username: "Reyansh Joshi",
        auraScore: 1350,
        profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=ReyanshJoshi",
      },
      {
        id: 1008,
        username: "Myra Kapoor",
        auraScore: 1220,
        profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=MyraKapoor",
      },
    ]

    const currentUser = localStorage.getItem("auraUser")
    if (currentUser) {
      const user = JSON.parse(currentUser)
      dummyUsers.push({
        id: user.id,
        username: user.username,
        auraScore: user.auraScore,
        profilePic: user.profilePic,
      })
    }

    const sortedUsers = dummyUsers.sort((a, b) => b.auraScore - a.auraScore)
    setLeaderboard(sortedUsers)
  }, [])

  const getRankDisplay = (rank: number) => {
    if (rank === 1) return "👑"
    if (rank === 2) return "🥈"
    if (rank === 3) return "🥉"
    return `#${rank}`
  }

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4 apple-font">Rankings</h1>
          <p className="text-xl text-gray-400 font-medium">See who's leading the AURA leaderboard</p>
        </div>

        {/* Time Filter */}
        <div className="flex justify-center mb-12">
          <div className="glass-effect rounded-2xl p-2">
            <button
              onClick={() => setTimeFilter("all-time")}
              className={`px-6 py-2 rounded-lg font-bold transition-all duration-300 ${
                timeFilter === "all-time" ? "premium-gradient text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              All Time
            </button>
            <button
              onClick={() => setTimeFilter("weekly")}
              className={`px-6 py-2 rounded-lg font-bold transition-all duration-300 ${
                timeFilter === "weekly" ? "premium-gradient text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              This Week
            </button>
          </div>
        </div>

        {/* Top 3 Podium */}
        {leaderboard.length >= 3 && (
          <div className="grid grid-cols-3 gap-6 mb-12">
            {leaderboard.slice(0, 3).map((user, index) => {
              const rank = index + 1
              return (
                <div
                  key={user.username}
                  className={`glass-effect rounded-2xl p-6 text-center hover-lift transition-all duration-300 ${
                    rank === 1 ? "order-2 transform scale-105" : rank === 2 ? "order-1" : "order-3"
                  }`}
                >
                  <div className="text-3xl mb-4">{getRankDisplay(rank)}</div>
                  <img
                    src={user.profilePic || "/placeholder.svg"}
                    alt={user.username}
                    className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-gray-600 object-cover"
                  />
                  <h3 className="font-bold text-white mb-2 apple-font">{user.username}</h3>
                  <div className="text-2xl font-bold text-gradient">{user.auraScore}</div>
                  <div className="text-sm text-gray-400">AURA</div>
                  <button
                    onClick={() => onOpenDM(user.id, user.username)}
                    className="mt-3 bg-gray-600 hover:bg-gray-700 text-white font-bold px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    Message
                  </button>
                </div>
              )
            })}
          </div>
        )}

        {/* Full Leaderboard */}
        <div className="glass-effect rounded-2xl overflow-hidden">
          <div className="premium-gradient p-4">
            <h2 className="text-xl font-bold text-white text-center apple-font">Full Rankings</h2>
          </div>

          <div className="divide-y divide-gray-800">
            {leaderboard.slice(3).map((user, index) => {
              const rank = index + 4
              return (
                <div key={user.username} className="p-4 hover:bg-gray-800/50 transition-colors duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="text-lg font-bold text-gray-400 w-12 text-center">#{rank}</div>
                    <img
                      src={user.profilePic || "/placeholder.svg"}
                      alt={user.username}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-white apple-font">{user.username}</h3>
                      <div className="text-sm text-gray-400 font-medium">
                        Level {Math.floor(user.auraScore / 100) + 1}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-gradient">{user.auraScore}</div>
                      <div className="text-sm text-gray-400 font-medium">AURA</div>
                    </div>
                    <button
                      onClick={() => onOpenDM(user.id, user.username)}
                      className="bg-gray-600 hover:bg-gray-700 text-white font-bold px-4 py-2 rounded-lg text-sm transition-colors"
                    >
                      Message
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-effect rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-white">{leaderboard.length}</div>
            <div className="text-sm text-gray-400 mt-1 font-medium">Active Players</div>
          </div>

          <div className="glass-effect rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-gradient">
              {leaderboard.length > 0 ? leaderboard[0].auraScore.toLocaleString() : 0}
            </div>
            <div className="text-sm text-gray-400 mt-1 font-medium">Highest AURA</div>
          </div>

          <div className="glass-effect rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-white">
              {Math.floor(leaderboard.reduce((sum, user) => sum + user.auraScore, 0) / leaderboard.length) || 0}
            </div>
            <div className="text-sm text-gray-400 mt-1 font-medium">Average AURA</div>
          </div>
        </div>
      </div>
    </div>
  )
}

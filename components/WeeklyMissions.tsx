"use client"

import { useState, useEffect } from "react"
import type { User, Mission } from "@/app/page"

interface WeeklyMissionsProps {
  user: User | null
  setUser: (user: User) => void
}

export default function WeeklyMissions({ user, setUser }: WeeklyMissionsProps) {
  const [missions, setMissions] = useState<Mission[]>([])

  const weeklyMissions: Mission[] = [
    {
      id: "play_games",
      title: "Game Master",
      description: "Play 5 different games",
      progress: 0,
      target: 5,
      reward: 100,
      completed: false,
    },
    {
      id: "share_stories",
      title: "Storyteller",
      description: "Share 3 personal stories",
      progress: 0,
      target: 3,
      reward: 75,
      completed: false,
    },
    {
      id: "earn_aura",
      title: "AURA Collector",
      description: "Earn 200 AURA points",
      progress: 0,
      target: 200,
      reward: 150,
      completed: false,
    },
    {
      id: "follow_users",
      title: "Social Butterfly",
      description: "Follow 5 new users",
      progress: 0,
      target: 5,
      reward: 50,
      completed: false,
    },
    {
      id: "daily_login",
      title: "Consistency King",
      description: "Login for 7 consecutive days",
      progress: 1,
      target: 7,
      reward: 200,
      completed: false,
    },
  ]

  useEffect(() => {
    if (!user) return

    // Initialize missions with user progress
    const updatedMissions = weeklyMissions.map((mission) => ({
      ...mission,
      completed: user.completedMissions.includes(mission.id),
      progress: getMissionProgress(mission.id),
    }))

    setMissions(updatedMissions)
  }, [user])

  const getMissionProgress = (missionId: string): number => {
    if (!user) return 0

    switch (missionId) {
      case "play_games":
        return Math.min(Math.floor(user.auraScore / 50), 5) // Estimate based on AURA earned from games
      case "share_stories":
        const threads = JSON.parse(localStorage.getItem("auraThreads") || "[]")
        return threads.filter((t: any) => t.userId === user.id).length
      case "earn_aura":
        return Math.min(user.auraScore, 200)
      case "follow_users":
        return user.following.length
      case "daily_login":
        return Math.min(Math.floor(Math.random() * 7) + 1, 7) // Simulated for demo
      default:
        return 0
    }
  }

  const claimReward = (mission: Mission) => {
    if (!user || !mission.completed) return

    const updatedUser = {
      ...user,
      auraScore: user.auraScore + mission.reward,
      completedMissions: [...user.completedMissions, mission.id],
    }

    setUser(updatedUser)
    localStorage.setItem("auraUser", JSON.stringify(updatedUser))

    // Update mission state
    setMissions((prev) => prev.map((m) => (m.id === mission.id ? { ...m, completed: false } : m)))
  }

  const getProgressPercentage = (progress: number, target: number): number => {
    return Math.min((progress / target) * 100, 100)
  }

  const getMissionIcon = (missionId: string): string => {
    switch (missionId) {
      case "play_games":
        return "🎮"
      case "share_stories":
        return "📖"
      case "earn_aura":
        return "⚡"
      case "follow_users":
        return "👥"
      case "daily_login":
        return "📅"
      default:
        return "🎯"
    }
  }

  if (!user) return null

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4 apple-font">Weekly Missions</h1>
          <p className="text-xl text-gray-400 font-medium">Complete challenges to earn bonus AURA rewards!</p>
        </div>

        {/* Mission Progress Overview */}
        <div className="glass-effect rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white apple-font">This Week's Progress</h2>
            <div className="text-right">
              <div className="text-2xl font-bold text-gradient">
                {missions.filter((m) => m.progress >= m.target).length}/{missions.length}
              </div>
              <div className="text-sm text-gray-400 font-medium">Completed</div>
            </div>
          </div>

          <div className="w-full bg-gray-800 rounded-full h-3">
            <div
              className="premium-gradient h-3 rounded-full transition-all duration-500"
              style={{
                width: `${(missions.filter((m) => m.progress >= m.target).length / missions.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Missions List */}
        <div className="space-y-6">
          {missions.map((mission) => {
            const isCompleted = mission.progress >= mission.target
            const canClaim = isCompleted && !user.completedMissions.includes(mission.id)

            return (
              <div key={mission.id} className="glass-effect rounded-2xl p-6 hover-lift transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="text-4xl">{getMissionIcon(mission.id)}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-white apple-font">{mission.title}</h3>
                        {isCompleted && (
                          <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                            ✓ COMPLETE
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 mb-3 font-medium">{mission.description}</p>

                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400 font-medium">
                            Progress: {mission.progress}/{mission.target}
                          </span>
                          <span className="text-gradient font-bold">+{mission.reward} AURA</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-500 ${
                              isCompleted ? "bg-green-500" : "premium-gradient"
                            }`}
                            style={{ width: `${getProgressPercentage(mission.progress, mission.target)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="ml-6">
                    {canClaim ? (
                      <button
                        onClick={() => claimReward(mission)}
                        className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-lg hover-lift transition-all duration-300"
                      >
                        Claim Reward 🎁
                      </button>
                    ) : user.completedMissions.includes(mission.id) ? (
                      <div className="bg-gray-700 text-gray-400 font-bold px-6 py-3 rounded-lg">Claimed ✓</div>
                    ) : (
                      <div className="bg-gray-800 text-gray-500 font-bold px-6 py-3 rounded-lg">In Progress...</div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Weekly Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-effect rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-gradient">
              {missions.reduce((sum, m) => sum + (m.progress >= m.target ? m.reward : 0), 0)}
            </div>
            <div className="text-sm text-gray-400 mt-1 font-medium">AURA Earned This Week</div>
          </div>

          <div className="glass-effect rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-white">{missions.filter((m) => m.progress >= m.target).length}</div>
            <div className="text-sm text-gray-400 mt-1 font-medium">Missions Completed</div>
          </div>

          <div className="glass-effect rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-white">
              {Math.round((missions.filter((m) => m.progress >= m.target).length / missions.length) * 100)}%
            </div>
            <div className="text-sm text-gray-400 mt-1 font-medium">Weekly Progress</div>
          </div>
        </div>
      </div>
    </div>
  )
}

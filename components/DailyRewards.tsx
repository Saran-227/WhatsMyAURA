"use client"

import { useState, useEffect } from "react"
import type { User } from "@/app/page"

interface DailyRewardsProps {
  user: User | null
  setUser: (user: User) => void
}

export default function DailyRewards({ user, setUser }: DailyRewardsProps) {
  const [isSpinning, setIsSpinning] = useState(false)
  const [canSpin, setCanSpin] = useState(true)
  const [reward, setReward] = useState<number | null>(null)
  const [rotation, setRotation] = useState(0)

  const rewards = [
    { label: "10 AURA", value: 10, color: "from-green-400 to-green-600" },
    { label: "25 AURA", value: 25, color: "from-blue-400 to-blue-600" },
    { label: "50 AURA", value: 50, color: "from-purple-400 to-purple-600" },
    { label: "100 AURA", value: 100, color: "from-yellow-400 to-yellow-600" },
    { label: "5 AURA", value: 5, color: "from-gray-400 to-gray-600" },
    { label: "75 AURA", value: 75, color: "from-pink-400 to-pink-600" },
    { label: "15 AURA", value: 15, color: "from-indigo-400 to-indigo-600" },
    { label: "200 AURA", value: 200, color: "from-red-400 to-red-600" },
  ]

  useEffect(() => {
    if (!user) return

    const today = new Date().toDateString()
    const lastSpinDate = user.lastSpinDate

    if (lastSpinDate === today) {
      setCanSpin(false)
    }
  }, [user])

  const spinWheel = () => {
    if (!user || !canSpin || isSpinning) return

    setIsSpinning(true)
    const randomReward = rewards[Math.floor(Math.random() * rewards.length)]
    const spins = 5 + Math.random() * 5 // 5-10 full rotations
    const finalRotation = rotation + spins * 360 + Math.random() * 360

    setRotation(finalRotation)

    setTimeout(() => {
      setReward(randomReward.value)
      const updatedUser = {
        ...user,
        auraScore: user.auraScore + randomReward.value,
        lastSpinDate: new Date().toDateString(),
      }
      setUser(updatedUser)
      localStorage.setItem("auraUser", JSON.stringify(updatedUser))
      setCanSpin(false)
      setIsSpinning(false)
    }, 3000)
  }

  const getTimeUntilNextSpin = () => {
    const now = new Date()
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)

    const diff = tomorrow.getTime() - now.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    return `${hours}h ${minutes}m`
  }

  if (!user) return null

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4 apple-font">Daily Spin Wheel</h1>
          <p className="text-xl text-gray-400 font-medium">Spin once per day to earn bonus AURA points!</p>
        </div>

        <div className="glass-effect rounded-2xl p-8 text-center">
          {/* Spin Wheel */}
          <div className="relative mx-auto mb-8" style={{ width: "320px", height: "320px" }}>
            <div className="relative" style={{ width: "300px", height: "300px" }}>
              <div
                className="w-full h-full rounded-full border-8 border-white relative overflow-hidden transition-transform ease-out"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transitionDuration: isSpinning ? "3000ms" : "0ms",
                  background: `conic-gradient(
          from 0deg,
          #10b981 0deg 45deg,
          #3b82f6 45deg 90deg,
          #8b5cf6 90deg 135deg,
          #eab308 135deg 180deg,
          #6b7280 180deg 225deg,
          #ec4899 225deg 270deg,
          #6366f1 270deg 315deg,
          #ef4444 315deg 360deg
        )`,
                }}
              >
                {rewards.map((reward, index) => {
                  const angle = (360 / rewards.length) * index + 360 / rewards.length / 2
                  const radian = (angle * Math.PI) / 180
                  const x = 150 + 80 * Math.cos(radian)
                  const y = 150 + 80 * Math.sin(radian)

                  return (
                    <div
                      key={index}
                      className="absolute text-white font-bold text-sm"
                      style={{
                        left: `${x}px`,
                        top: `${y}px`,
                        transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                      }}
                    >
                      {reward.label}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Pointer */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
              <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[20px] border-l-transparent border-r-transparent border-b-white drop-shadow-lg"></div>
            </div>
          </div>

          {/* Spin Button */}
          {canSpin ? (
            <button
              onClick={spinWheel}
              disabled={isSpinning}
              className={`premium-gradient text-white font-bold px-12 py-4 rounded-full text-xl hover-lift transition-all duration-300 ${
                isSpinning ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSpinning ? "Spinning..." : "SPIN NOW! 🎰"}
            </button>
          ) : (
            <div className="space-y-4">
              <div className="bg-gray-800 text-gray-400 font-bold px-12 py-4 rounded-full text-xl">
                Already Spun Today! ⏰
              </div>
              <p className="text-gray-400 font-medium">
                Next spin available in: <span className="text-white font-bold">{getTimeUntilNextSpin()}</span>
              </p>
            </div>
          )}

          {/* Reward Display */}
          {reward && (
            <div className="mt-8 glass-effect rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-white mb-2 apple-font">Congratulations! 🎉</h3>
              <p className="text-xl text-gradient font-bold">You won {reward} AURA points!</p>
            </div>
          )}

          {/* Spin History */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="glass-effect rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-gradient">{user.auraScore}</div>
              <div className="text-sm text-gray-400 mt-1 font-medium">Total AURA</div>
            </div>
            <div className="glass-effect rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">1</div>
              <div className="text-sm text-gray-400 mt-1 font-medium">Daily Spins</div>
            </div>
            <div className="glass-effect rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">{reward || 0}</div>
              <div className="text-sm text-gray-400 mt-1 font-medium">Last Reward</div>
            </div>
            <div className="glass-effect rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">7</div>
              <div className="text-sm text-gray-400 mt-1 font-medium">Streak Days</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

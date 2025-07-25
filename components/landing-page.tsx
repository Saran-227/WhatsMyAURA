"use client"

import { useState } from "react"
import type { User } from "@/app/page"

interface LandingPageProps {
  onUserLogin: (user: User) => void
}

export function LandingPage({ onUserLogin }: LandingPageProps) {
  const [showSignup, setShowSignup] = useState(false)
  const [username, setUsername] = useState("")

  const handleStartFarming = () => {
    setShowSignup(true)
  }

  const handleSignup = () => {
    if (!username.trim()) return

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      username: username.trim(),
      profilePicture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
      auraScore: 0,
      coolestThing: "",
      craziestPunishment: "",
      level: 1,
    }

    // Save to localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    users.push(newUser)
    localStorage.setItem("users", JSON.stringify(users))

    onUserLogin(newUser)
  }

  const handleExistingUser = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    if (users.length > 0) {
      // For demo, just login as first user
      onUserLogin(users[0])
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-600 to-cyan-500 flex items-center justify-center p-4">
      <div className="text-center max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-8xl md:text-9xl font-black bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent mb-6 tracking-tight">
            WhatsMyAURA
          </h1>
          <div className="text-2xl md:text-3xl text-white font-bold mb-8 leading-relaxed">
            Play games, take challenges, share your chaos —
            <br />
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              rank up your AURA ✨
            </span>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
            <div className="text-4xl mb-4">🎮</div>
            <h3 className="text-xl font-bold text-white mb-2">Epic Games</h3>
            <p className="text-white/80">Test your skills and earn AURA points</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
            <div className="text-4xl mb-4">🧵</div>
            <h3 className="text-xl font-bold text-white mb-2">Chaos Threads</h3>
            <p className="text-white/80">Share your wildest stories</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="text-xl font-bold text-white mb-2">Leaderboard</h3>
            <p className="text-white/80">Compete for the highest AURA</p>
          </div>
        </div>

        {/* CTA Section */}
        {!showSignup ? (
          <div className="space-y-4">
            <button
              onClick={handleStartFarming}
              className="bg-gradient-to-r from-yellow-400 to-pink-500 text-black font-black text-2xl px-12 py-4 rounded-full hover:scale-105 transform transition-all duration-200 shadow-2xl"
            >
              Start Farming Aura 🚀
            </button>
            <div>
              <button onClick={handleExistingUser} className="text-white/80 hover:text-white underline text-lg">
                Already have an account? Continue
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-md mx-auto border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6">Choose Your Username 💫</h3>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username..."
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-400 mb-4"
              onKeyPress={(e) => e.key === "Enter" && handleSignup()}
            />
            <button
              onClick={handleSignup}
              disabled={!username.trim()}
              className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold text-xl px-6 py-3 rounded-xl hover:scale-105 transform transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Let's Go! 🎯
            </button>
          </div>
        )}

        {/* Floating Emojis */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 text-4xl animate-bounce">⚡</div>
          <div className="absolute top-40 right-20 text-3xl animate-pulse">🔥</div>
          <div className="absolute bottom-32 left-20 text-5xl animate-spin">💫</div>
          <div className="absolute bottom-20 right-10 text-4xl animate-bounce">🚀</div>
        </div>
      </div>
    </div>
  )
}

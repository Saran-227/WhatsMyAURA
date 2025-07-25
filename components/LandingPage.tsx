"use client"

import { useState } from "react"
import AccountCreation from "./AccountCreation"
import LoginForm from "./LoginForm"
import type { User } from "@/app/page"

interface LandingPageProps {
  onUserCreate: (user: User) => void
}

export default function LandingPage({ onUserCreate }: LandingPageProps) {
  const [showSignup, setShowSignup] = useState(false)
  const [showAccountCreation, setShowAccountCreation] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [username, setUsername] = useState("")

  const handleQuickSignup = () => {
    if (username.trim()) {
      const newUser: User = {
        id: Date.now(),
        username: username.trim(),
        auraScore: 0,
        level: 1,
        profilePic: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(username.trim())}`,
        coolestThing: "",
        craziestPunishment: "",
        joinedAt: new Date().toISOString(),
        following: [],
        followers: [],
        completedMissions: [],
        relationshipStatus: "",
        state: "",
        city: "",
        interestedIn: "",
      }
      onUserCreate(newUser)
    }
  }

  const resetToMain = () => {
    setShowSignup(false)
    setShowAccountCreation(false)
    setShowLogin(false)
    setUsername("")
  }

  if (showAccountCreation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-6">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white">WhatsMyAURA</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
          </div>
          <AccountCreation onUserCreate={onUserCreate} onBack={resetToMain} />
        </div>
      </div>
    )
  }

  if (showLogin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-6">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white">WhatsMyAURA</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
          </div>
          <LoginForm onUserLogin={onUserCreate} onBack={resetToMain} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-6">
      <div className="text-center max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white">WhatsMyAURA</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl text-gray-300 font-medium leading-relaxed">
            Play games, take challenges, share your stories —<br />
            <span className="text-gradient font-semibold">build your digital reputation</span>
          </p>
        </div>

        {!showSignup ? (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowAccountCreation(true)}
                className="premium-gradient text-white font-semibold text-lg px-12 py-4 rounded-full hover-lift premium-shadow transition-all duration-300"
              >
                Create Account
              </button>
              <button
                onClick={() => setShowLogin(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-12 py-4 rounded-full transition-all duration-300"
              >
                Login
              </button>
              <button
                onClick={() => setShowSignup(true)}
                className="bg-gray-800 border border-gray-600 text-white font-semibold text-lg px-12 py-4 rounded-full hover:bg-gray-700 transition-all duration-300"
              >
                Quick Start
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="glass-effect rounded-2xl p-8 hover-lift">
                <div className="text-4xl mb-4">🎮</div>
                <h3 className="text-xl font-semibold text-white mb-3">Skill Games</h3>
                <p className="text-gray-400">Test your abilities across different challenges</p>
              </div>
              <div className="glass-effect rounded-2xl p-8 hover-lift">
                <div className="text-4xl mb-4">💭</div>
                <h3 className="text-xl font-semibold text-white mb-3">Share Stories</h3>
                <p className="text-gray-400">Connect through authentic experiences</p>
              </div>
              <div className="glass-effect rounded-2xl p-8 hover-lift">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="text-xl font-semibold text-white mb-3">Compete</h3>
                <p className="text-gray-400">Rise through the AURA rankings</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="glass-effect rounded-2xl p-8 max-w-md mx-auto">
            <div className="flex items-center mb-6">
              <button
                onClick={() => setShowSignup(false)}
                className="text-gray-400 hover:text-white transition-colors mr-4"
              >
                ← Back
              </button>
              <h2 className="text-2xl font-semibold text-white">Quick Start</h2>
            </div>
            <input
              type="text"
              placeholder="Choose your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors mb-6"
              onKeyPress={(e) => e.key === "Enter" && handleQuickSignup()}
            />
            <button
              onClick={handleQuickSignup}
              disabled={!username.trim()}
              className="w-full premium-gradient text-white font-semibold py-3 rounded-lg transition-all duration-300 hover-lift disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Enter AURA
            </button>
            <p className="text-gray-400 text-sm mt-4">Quick start creates a temporary profile</p>
          </div>
        )}
      </div>
    </div>
  )
}

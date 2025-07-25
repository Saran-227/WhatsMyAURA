"use client"

import type { User } from "@/app/page"

interface NavigationProps {
  currentPage: string
  onPageChange: (page: "dashboard" | "games" | "threads" | "leaderboard") => void
  currentUser: User | null
}

export function Navigation({ currentPage, onPageChange, currentUser }: NavigationProps) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", emoji: "👤" },
    { id: "games", label: "Games", emoji: "🎮" },
    { id: "threads", label: "Threads", emoji: "🧵" },
    { id: "leaderboard", label: "Leaderboard", emoji: "🏆" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-black bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
              WhatsMyAURA
            </h1>
            {currentUser && (
              <div className="flex items-center space-x-2 bg-white/10 rounded-full px-3 py-1">
                <img
                  src={currentUser.profilePicture || "/placeholder.svg"}
                  alt={currentUser.username}
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-white font-medium">{currentUser.auraScore} AURA</span>
              </div>
            )}
          </div>

          {/* Navigation Items */}
          <div className="flex space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  currentPage === item.id
                    ? "bg-gradient-to-r from-pink-500 to-cyan-500 text-white"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <span className="text-lg">{item.emoji}</span>
                <span className="hidden sm:block">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

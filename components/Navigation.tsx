"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"

interface NavigationProps {
  currentPage: string
  setCurrentPage: (page: string) => void
}

export default function Navigation({ currentPage, setCurrentPage }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "🏠" },
    { id: "games", label: "Games", icon: "🎮" },
    { id: "threads", label: "Threads", icon: "💬" },
    { id: "stories", label: "Stories", icon: "📸" },
    { id: "myfeed", label: "My Feed", icon: "📱" },
    { id: "rewards", label: "Rewards", icon: "🎁" },
    { id: "missions", label: "Missions", icon: "🎯" },
    { id: "leaderboard", label: "Leaderboard", icon: "🏆" },
  ]

  const handleMenuClick = (pageId: string) => {
    setCurrentPage(pageId)
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 glass-effect border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-xl md:text-2xl font-bold text-gradient apple-font">What's My AURA</h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                      currentPage === item.id
                        ? "premium-gradient text-white shadow-lg"
                        : "text-gray-300 hover:text-white hover:bg-gray-700"
                    }`}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true" />
        </div>
      )}

      {/* Mobile menu */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-64 glass-effect transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Menu header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h2 className="text-lg font-bold text-gradient apple-font">Menu</h2>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Menu items */}
          <div className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`w-full flex items-center px-4 py-3 rounded-lg text-left font-medium transition-all duration-300 ${
                  currentPage === item.id
                    ? "premium-gradient text-white shadow-lg border-l-4 border-blue-400"
                    : "text-gray-300 hover:text-white hover:bg-gray-700"
                }`}
              >
                <span className="text-xl mr-3">{item.icon}</span>
                <span className="text-base">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Menu footer */}
          <div className="p-4 border-t border-gray-700">
            <p className="text-xs text-gray-500 text-center">What's My AURA v1.0</p>
          </div>
        </div>
      </div>
    </>
  )
}

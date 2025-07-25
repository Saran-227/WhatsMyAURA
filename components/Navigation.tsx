"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"

interface NavigationProps {
  currentPage: string
  setCurrentPage: (page: string) => void
}

export default function Navigation({ currentPage, setCurrentPage }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "🏠" },
    { id: "stories", label: "Stories", icon: "📸" },
    { id: "games", label: "Games", icon: "🎮" },
    { id: "threads", label: "All Stories", icon: "💭" },
    { id: "myfeed", label: "My Feed", icon: "📱" },
    { id: "rewards", label: "Daily Spin", icon: "🎰" },
    { id: "missions", label: "Missions", icon: "🎯" },
    { id: "leaderboard", label: "Rankings", icon: "🏆" },
  ]

  const handleNavClick = (pageId: string) => {
    setCurrentPage(pageId)
    setIsMobileMenuOpen(false) // Close mobile menu when item is selected
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl font-bold text-gradient apple-font">WhatsMyAURA</h1>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-lg font-semibold transition-all duration-200 whitespace-nowrap text-sm ${
                    currentPage === item.id
                      ? "premium-gradient text-white"
                      : "text-gray-400 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  <span className="mr-1">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 z-50 glass-effect border-l border-gray-800 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <h2 className="text-lg font-bold text-gradient apple-font">Menu</h2>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              aria-label="Close mobile menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile Menu Items */}
          <div className="flex-1 py-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center px-6 py-4 text-left font-semibold transition-all duration-200 ${
                  currentPage === item.id
                    ? "premium-gradient text-white border-r-4 border-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
              >
                <span className="mr-3 text-xl">{item.icon}</span>
                <span className="text-base">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Footer */}
          <div className="p-4 border-t border-gray-800">
            <div className="text-center text-sm text-gray-500">WhatsMyAURA v1.0</div>
          </div>
        </div>
      </div>
    </>
  )
}

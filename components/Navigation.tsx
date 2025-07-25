"use client"

interface NavigationProps {
  currentPage: string
  setCurrentPage: (page: string) => void
}

export default function Navigation({ currentPage, setCurrentPage }: NavigationProps) {
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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gradient apple-font">WhatsMyAURA</h1>

          <div className="flex space-x-1 overflow-x-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`px-3 py-2 rounded-lg font-semibold transition-all duration-200 whitespace-nowrap text-sm ${
                  currentPage === item.id
                    ? "premium-gradient text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
              >
                <span className="mr-1">{item.icon}</span>
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

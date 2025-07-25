"use client"

import { useState, useEffect } from "react"
import type { User } from "@/app/page"

interface FollowModalProps {
  isOpen: boolean
  onClose: () => void
  type: "followers" | "following"
  userIds: number[]
  currentUser: User
  onOpenDM: (userId: number, username: string) => void
}

interface UserProfile {
  id: number
  username: string
  profilePic: string
  auraScore: number
}

export default function FollowModal({ isOpen, onClose, type, userIds, currentUser, onOpenDM }: FollowModalProps) {
  const [users, setUsers] = useState<UserProfile[]>([])

  // Sample users for demo
  const sampleUsers: UserProfile[] = [
    {
      id: 1001,
      username: "Aarav Sharma",
      profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=AaravSharma",
      auraScore: 2450,
    },
    {
      id: 1002,
      username: "Diya Patel",
      profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=DiyaPatel",
      auraScore: 2100,
    },
    {
      id: 1003,
      username: "Arjun Singh",
      profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=ArjunSingh",
      auraScore: 1890,
    },
    {
      id: 1004,
      username: "Ananya Gupta",
      profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=AnanyaGupta",
      auraScore: 1750,
    },
    {
      id: 1005,
      username: "Vivaan Agarwal",
      profilePic: "https://api.dicebear.com/7.x/avataaars/svg?seed=VivaanAgarwal",
      auraScore: 1620,
    },
  ]

  useEffect(() => {
    if (isOpen) {
      // For demo, show sample users based on userIds length
      const displayUsers = sampleUsers.slice(0, Math.max(userIds.length, 3))
      setUsers(displayUsers)
    }
  }, [isOpen, userIds])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="glass-effect rounded-2xl w-full max-w-md max-h-96 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h3 className="text-xl font-bold text-white apple-font">
            {type === "followers" ? "Followers" : "Following"}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors text-xl">
            ✕
          </button>
        </div>

        {/* Users List */}
        <div className="flex-1 overflow-y-auto p-4">
          {users.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">👥</div>
              <p className="text-gray-400 font-medium">
                {type === "followers" ? "No followers yet" : "Not following anyone yet"}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {users.map((user) => (
                <div key={user.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={user.profilePic || "/placeholder.svg"}
                      alt={user.username}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-white apple-font">{user.username}</h4>
                      <p className="text-sm text-gray-400 font-medium">{user.auraScore} AURA</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onOpenDM(user.id, user.username)}
                      className="bg-gray-600 hover:bg-gray-700 text-white font-bold px-3 py-1 rounded-lg text-sm transition-colors"
                    >
                      Message
                    </button>
                    {user.id !== currentUser.id && (
                      <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1 rounded-lg text-sm transition-colors">
                        {type === "followers" ? "Follow Back" : "Unfollow"}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

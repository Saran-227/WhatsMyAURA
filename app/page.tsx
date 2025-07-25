"use client"

import { useState, useEffect } from "react"
import LandingPage from "@/components/LandingPage"
import Dashboard from "@/components/Dashboard"
import GameHub from "@/components/GameHub"
import AuraThreads from "@/components/AuraThreads"
import Leaderboard from "@/components/Leaderboard"
import Navigation from "@/components/Navigation"
import MyFeed from "@/components/MyFeed"
import DailyRewards from "@/components/DailyRewards"
import WeeklyMissions from "@/components/WeeklyMissions"
import DMModal from "@/components/DMModal"
import FollowModal from "@/components/FollowModal"
import AuraStories from "@/components/AuraStories"

export type User = {
  id: number
  username: string
  profilePic: string
  auraScore: number
  level: number
  coolestThing: string
  craziestPunishment: string
  joinedAt: string
  following: number[]
  followers: number[]
  lastSpinDate?: string
  completedMissions: string[]
  relationshipStatus?: string
  state?: string
  city?: string
  interestedIn?: string
}

export type Thread = {
  id: number
  userId: number
  username: string
  profilePic: string
  text: string
  likes: number
  reactions: {
    fire: number
    heart: number
    mind: number
  }
  comments: number
  timestamp: string
}

export type Mission = {
  id: string
  title: string
  description: string
  progress: number
  target: number
  reward: number
  completed: boolean
}

export type DirectMessage = {
  id: number
  fromUserId: number
  toUserId: number
  fromUsername: string
  toUsername: string
  message: string
  timestamp: string
  read: boolean
}

export type AuraStory = {
  id: number
  userId: number
  username: string
  profilePic: string
  image: string | null
  text: string
  timestamp: string
  views: number
  likes: number
}

export default function App() {
  const [currentPage, setCurrentPage] = useState("landing")
  const [user, setUser] = useState<User | null>(null)
  const [showDMModal, setShowDMModal] = useState(false)
  const [dmRecipient, setDMRecipient] = useState<{ id: number; username: string } | null>(null)
  const [showFollowModal, setShowFollowModal] = useState(false)
  const [followModalData, setFollowModalData] = useState<{
    type: "followers" | "following"
    userIds: number[]
  } | null>(null)

  useEffect(() => {
    const savedUser = localStorage.getItem("auraUser")
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      // Ensure new fields exist
      const updatedUser = {
        ...userData,
        following: userData.following || [],
        followers: userData.followers || [],
        completedMissions: userData.completedMissions || [],
        relationshipStatus: userData.relationshipStatus || "",
        state: userData.state || "",
        city: userData.city || "",
        interestedIn: userData.interestedIn || "",
      }
      setUser(updatedUser)
      setCurrentPage("dashboard")
    }
  }, [])

  const handleUserCreate = (userData: User) => {
    const newUser = {
      ...userData,
      following: [],
      followers: [],
      completedMissions: [],
      relationshipStatus: "",
      state: "",
      city: "",
      interestedIn: "",
    }
    setUser(newUser)
    localStorage.setItem("auraUser", JSON.stringify(newUser))
    setCurrentPage("dashboard")
  }

  const openDM = (recipientId: number, recipientUsername: string) => {
    setDMRecipient({ id: recipientId, username: recipientUsername })
    setShowDMModal(true)
  }

  const openFollowModal = (type: "followers" | "following", userIds: number[]) => {
    setFollowModalData({ type, userIds })
    setShowFollowModal(true)
  }

  const renderPage = () => {
    switch (currentPage) {
      case "landing":
        return <LandingPage onUserCreate={handleUserCreate} />
      case "dashboard":
        return <Dashboard user={user} setUser={setUser} onOpenFollowModal={openFollowModal} />
      case "games":
        return <GameHub user={user} setUser={setUser} />
      case "threads":
        return <AuraThreads user={user} setUser={setUser} onOpenDM={openDM} />
      case "myfeed":
        return <MyFeed user={user} setUser={setUser} onOpenDM={openDM} />
      case "stories":
        return <AuraStories user={user} setUser={setUser} />
      case "rewards":
        return <DailyRewards user={user} setUser={setUser} />
      case "missions":
        return <WeeklyMissions user={user} setUser={setUser} />
      case "leaderboard":
        return <Leaderboard onOpenDM={openDM} />
      default:
        return <LandingPage onUserCreate={handleUserCreate} />
    }
  }

  return (
    <div className="min-h-screen bg-black apple-font">
      {user && <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />}
      {renderPage()}

      {showDMModal && dmRecipient && user && (
        <DMModal
          currentUser={user}
          recipient={dmRecipient}
          onClose={() => {
            setShowDMModal(false)
            setDMRecipient(null)
          }}
        />
      )}

      {showFollowModal && followModalData && user && (
        <FollowModal
          isOpen={showFollowModal}
          onClose={() => {
            setShowFollowModal(false)
            setFollowModalData(null)
          }}
          type={followModalData.type}
          userIds={followModalData.userIds}
          currentUser={user}
          onOpenDM={openDM}
        />
      )}
    </div>
  )
}

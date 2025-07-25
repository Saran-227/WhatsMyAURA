"use client"

import type React from "react"
import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import type { User } from "@/app/page"

interface LoginFormProps {
  onUserLogin: (user: User) => void
  onBack: () => void
}

export default function LoginForm({ onUserLogin, onBack }: LoginFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (error) setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email.trim()) {
      setError("Please enter your email address")
      return
    }

    if (!formData.password) {
      setError("Please enter your password")
      return
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address")
      return
    }

    setLoading(true)
    setError("")

    try {
      console.log("Attempting to sign in with email:", formData.email)

      // Sign in with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, formData.email.trim(), formData.password)
      const firebaseUser = userCredential.user

      console.log("Firebase user signed in successfully:", firebaseUser.uid)

      // Get user data from Firestore
      const userDocRef = doc(db, "users", firebaseUser.uid)
      const userDocSnap = await getDoc(userDocRef)

      if (!userDocSnap.exists()) {
        console.error("User document not found in Firestore")
        setError("User data not found. Please contact support or try creating a new account.")
        return
      }

      const userData = userDocSnap.data()
      console.log("User data retrieved successfully:", userData)

      // Create local user object
      const user: User = {
        id: Date.now(),
        username: userData.name || firebaseUser.displayName || "User",
        auraScore: userData.auraScore || 0,
        level: userData.level || 1,
        profilePic:
          userData.profilePic ||
          `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(userData.name || "user")}`,
        coolestThing: userData.coolestThing || "",
        craziestPunishment: userData.craziestPunishment || "",
        joinedAt: userData.joinedAt || new Date().toISOString(),
        following: userData.following || [],
        followers: userData.followers || [],
        completedMissions: userData.completedMissions || [],
        relationshipStatus: userData.relationshipStatus || "",
        state: userData.state || "",
        city: userData.city || "",
        interestedIn: userData.interestedIn || "",
      }

      console.log("Login completed successfully!")
      onUserLogin(user)
    } catch (error: any) {
      console.error("Error signing in:", error)
      console.error("Error code:", error.code)
      console.error("Error message:", error.message)

      // Handle specific Firebase errors
      switch (error.code) {
        case "auth/user-not-found":
          setError("No account found with this email address. Please check your email or create a new account.")
          break
        case "auth/wrong-password":
          setError("Incorrect password. Please try again.")
          break
        case "auth/invalid-email":
          setError("Please enter a valid email address.")
          break
        case "auth/user-disabled":
          setError("This account has been disabled. Please contact support.")
          break
        case "auth/too-many-requests":
          setError("Too many failed login attempts. Please try again later.")
          break
        case "auth/network-request-failed":
          setError("Network error. Please check your internet connection and try again.")
          break
        case "auth/invalid-credential":
          setError("Invalid email or password. Please check your credentials and try again.")
          break
        default:
          setError(`Login failed: ${error.message}. Please try again.`)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading) {
      handleSubmit(e as any)
    }
  }

  return (
    <div className="glass-effect rounded-2xl p-8 max-w-md mx-auto">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="text-gray-400 hover:text-white transition-colors mr-4" disabled={loading}>
          ← Back
        </button>
        <h2 className="text-2xl font-semibold text-white">Login to AURA</h2>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-6">
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="Enter your email address"
            autoComplete="email"
            disabled={loading}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="Enter your password"
            autoComplete="current-password"
            disabled={loading}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg transition-all duration-300 hover-lift disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Signing In..." : "Login to AURA"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-400 text-sm">Don't have an account? Go back and create one!</p>
        <p className="text-gray-300 text-xs mt-2">Use the same email and password you used during registration</p>
      </div>
    </div>
  )
}

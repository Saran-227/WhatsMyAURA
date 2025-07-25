"use client"

import type React from "react"
import { useState } from "react"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import type { User } from "@/app/page"

interface AccountCreationProps {
  onUserCreate: (user: User) => void
  onBack: () => void
}

export default function AccountCreation({ onUserCreate, onBack }: AccountCreationProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    relationshipStatus: "",
    state: "",
    city: "",
    interestedIn: "",
    coolestThing: "",
    craziestPunishment: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (error) setError("")
  }

  const validateForm = () => {
    if (!formData.name.trim()) return "Name is required"
    if (!formData.email.trim()) return "Email is required"
    if (!formData.email.includes("@")) return "Please enter a valid email address"
    if (!formData.password) return "Password is required"
    if (formData.password.length < 6) return "Password must be at least 6 characters"
    if (formData.password !== formData.confirmPassword) return "Passwords don't match"
    if (!formData.relationshipStatus) return "Relationship status is required"
    if (!formData.state.trim()) return "State is required"
    if (!formData.city.trim()) return "City is required"
    if (!formData.interestedIn) return "Interest is required"
    if (!formData.coolestThing.trim()) return "Coolest thing is required"
    if (!formData.craziestPunishment.trim()) return "Craziest punishment is required"
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)
    setError("")

    try {
      console.log("Creating Firebase user with email:", formData.email)

      // Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email.trim(), formData.password)
      const firebaseUser = userCredential.user

      console.log("Firebase user created successfully:", firebaseUser.uid)

      // Update display name
      await updateProfile(firebaseUser, {
        displayName: formData.name.trim(),
      })

      console.log("Display name updated to:", formData.name.trim())

      // Create user document in Firestore
      const userData = {
        uid: firebaseUser.uid,
        name: formData.name.trim(),
        email: formData.email.trim(),
        auraScore: 0,
        level: 1,
        profilePic: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(formData.name.trim())}`,
        relationshipStatus: formData.relationshipStatus,
        state: formData.state.trim(),
        city: formData.city.trim(),
        interestedIn: formData.interestedIn,
        coolestThing: formData.coolestThing.trim(),
        craziestPunishment: formData.craziestPunishment.trim(),
        joinedAt: new Date().toISOString(),
        createdAt: serverTimestamp(),
        following: [],
        followers: [],
        completedMissions: [],
      }

      console.log("Creating Firestore document with data:", userData)

      await setDoc(doc(db, "users", firebaseUser.uid), userData)

      console.log("User document created successfully in Firestore")

      // Create local user object
      const newUser: User = {
        id: Date.now(),
        username: formData.name.trim(),
        auraScore: 0,
        level: 1,
        profilePic: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(formData.name.trim())}`,
        coolestThing: formData.coolestThing.trim(),
        craziestPunishment: formData.craziestPunishment.trim(),
        joinedAt: new Date().toISOString(),
        following: [],
        followers: [],
        completedMissions: [],
        relationshipStatus: formData.relationshipStatus,
        state: formData.state.trim(),
        city: formData.city.trim(),
        interestedIn: formData.interestedIn,
      }

      console.log("Account creation completed successfully!")
      onUserCreate(newUser)
    } catch (error: any) {
      console.error("Error creating account:", error)
      console.error("Error code:", error.code)
      console.error("Error message:", error.message)

      // Handle specific Firebase errors
      switch (error.code) {
        case "auth/configuration-not-found":
          setError(
            "Firebase Authentication is not properly configured. Please enable Email/Password authentication in your Firebase Console under Authentication > Sign-in method.",
          )
          break
        case "auth/email-already-in-use":
          setError("This email is already registered. Please use a different email or try logging in.")
          break
        case "auth/invalid-email":
          setError("Please enter a valid email address.")
          break
        case "auth/weak-password":
          setError("Password is too weak. Please choose a stronger password.")
          break
        case "auth/network-request-failed":
          setError("Network error. Please check your internet connection and try again.")
          break
        case "auth/operation-not-allowed":
          setError(
            "Email/password authentication is not enabled. Please enable it in Firebase Console under Authentication > Sign-in method.",
          )
          break
        case "permission-denied":
          setError("Permission denied. Please check Firestore security rules.")
          break
        case "auth/project-not-found":
          setError("Firebase project not found. Please check your Firebase configuration.")
          break
        case "auth/api-key-not-valid":
          setError("Invalid Firebase API key. Please check your Firebase configuration.")
          break
        default:
          setError(`Account creation failed: ${error.message}. Please try again.`)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="glass-effect rounded-2xl p-8 max-w-2xl mx-auto">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="text-gray-400 hover:text-white transition-colors mr-4" disabled={loading}>
          ← Back
        </button>
        <h2 className="text-2xl font-semibold text-white">Create Your AURA Account</h2>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-6">
          <p className="text-red-300 text-sm font-medium">⚠️ Error:</p>
          <p className="text-red-300 text-sm mt-1">{error}</p>
          {error.includes("Firebase Authentication") && (
            <div className="mt-3 p-3 bg-yellow-500/20 border border-yellow-500 rounded">
              <p className="text-yellow-300 text-xs font-medium">Quick Fix:</p>
              <ol className="text-yellow-300 text-xs mt-1 list-decimal list-inside space-y-1">
                <li>Go to Firebase Console</li>
                <li>Select your project</li>
                <li>Go to Authentication → Sign-in method</li>
                <li>Enable Email/Password authentication</li>
                <li>Try creating account again</li>
              </ol>
            </div>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Enter your full name"
              autoComplete="name"
              disabled={loading}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Enter your email"
              autoComplete="email"
              disabled={loading}
              required
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Create a password (min 6 characters)"
              autoComplete="new-password"
              disabled={loading}
              required
              minLength={6}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password *</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Confirm your password"
              autoComplete="new-password"
              disabled={loading}
              required
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Relationship Status *</label>
            <select
              name="relationshipStatus"
              value={formData.relationshipStatus}
              onChange={handleInputChange}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
              disabled={loading}
              required
            >
              <option value="">Select status</option>
              <option value="single">Single</option>
              <option value="taken">Taken</option>
              <option value="complicated">It's Complicated</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Interested In *</label>
            <select
              name="interestedIn"
              value={formData.interestedIn}
              onChange={handleInputChange}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
              disabled={loading}
              required
            >
              <option value="">Select interest</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="both">Both</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">State *</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Your state"
              disabled={loading}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">City *</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Your city"
              disabled={loading}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Coolest Thing You've Done *</label>
          <textarea
            name="coolestThing"
            value={formData.coolestThing}
            onChange={handleInputChange}
            rows={3}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors resize-none"
            placeholder="Tell us about the coolest thing you've ever done..."
            disabled={loading}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Craziest Punishment You've Received *</label>
          <textarea
            name="craziestPunishment"
            value={formData.craziestPunishment}
            onChange={handleInputChange}
            rows={3}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors resize-none"
            placeholder="Share the craziest punishment you've ever received..."
            disabled={loading}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full premium-gradient text-white font-semibold py-4 rounded-lg transition-all duration-300 hover-lift disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating Account..." : "Create AURA Account"}
        </button>
      </form>

      <p className="text-gray-400 text-sm mt-4 text-center">
        * Required fields - Your account will be saved to Firebase for permanent access
      </p>
    </div>
  )
}

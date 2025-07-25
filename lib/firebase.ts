import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getAnalytics } from "firebase/analytics"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3_0c92H68c9_OSxvEJwAFXDPF3IUBHr8",
  authDomain: "whatsmyaura-77f04.firebaseapp.com",
  projectId: "whatsmyaura-77f04",
  storageBucket: "whatsmyaura-77f04.firebasestorage.app",
  messagingSenderId: "533800320305",
  appId: "1:533800320305:web:8d56cfd8193f05b5d58410",
  measurementId: "G-W60K4MTBKE",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
export const db = getFirestore(app)
export const auth = getAuth(app)

// Initialize Analytics (only in browser environment)
let analytics
if (typeof window !== "undefined") {
  try {
    analytics = getAnalytics(app)
  } catch (error) {
    console.log("Analytics not available:", error)
  }
}

export { analytics }
export default app

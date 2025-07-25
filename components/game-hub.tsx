"use client"

import React from "react"

import { useState } from "react"
import type { User } from "@/app/page"

interface GameHubProps {
  user: User
  onUpdateUser: (user: User) => void
}

interface Game {
  id: string
  name: string
  description: string
  emoji: string
  difficulty: "Easy" | "Medium" | "Hard"
  maxAura: number
}

const games: Game[] = [
  {
    id: "memory-matrix",
    name: "Memory Matrix",
    description: "Remember the pattern and repeat it back",
    emoji: "🧠",
    difficulty: "Medium",
    maxAura: 50,
  },
  {
    id: "reaction-rush",
    name: "Reaction Rush",
    description: "Test your lightning-fast reflexes",
    emoji: "⚡",
    difficulty: "Easy",
    maxAura: 30,
  },
  {
    id: "math-mayhem",
    name: "Math Mayhem",
    description: "Solve equations under pressure",
    emoji: "🔢",
    difficulty: "Hard",
    maxAura: 75,
  },
  {
    id: "word-wizard",
    name: "Word Wizard",
    description: "Create words from scrambled letters",
    emoji: "📝",
    difficulty: "Medium",
    maxAura: 40,
  },
  {
    id: "color-chaos",
    name: "Color Chaos",
    description: "Match colors before time runs out",
    emoji: "🌈",
    difficulty: "Easy",
    maxAura: 25,
  },
  {
    id: "pattern-pro",
    name: "Pattern Pro",
    description: "Complete the sequence patterns",
    emoji: "🔄",
    difficulty: "Hard",
    maxAura: 60,
  },
]

export function GameHub({ user, onUpdateUser }: GameHubProps) {
  const [activeGame, setActiveGame] = useState<string | null>(null)
  const [gameScore, setGameScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)

  const startGame = (gameId: string) => {
    setActiveGame(gameId)
    setGameStarted(true)
    setGameScore(0)
  }

  const endGame = (score: number) => {
    const game = games.find((g) => g.id === activeGame)
    if (!game) return

    // Calculate AURA earned based on score and game difficulty
    const auraEarned = Math.floor((score / 100) * game.maxAura)

    // Update user's AURA score
    const updatedUser = {
      ...user,
      auraScore: user.auraScore + auraEarned,
    }

    onUpdateUser(updatedUser)

    // Save game result
    const gameResults = JSON.parse(localStorage.getItem("gameResults") || "[]")
    gameResults.push({
      id: Date.now().toString(),
      userId: user.id,
      gameName: game.name,
      score,
      auraEarned,
      timestamp: Date.now(),
    })
    localStorage.setItem("gameResults", JSON.stringify(gameResults))

    setGameStarted(false)
    setActiveGame(null)
    setGameScore(score)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "from-green-400 to-green-600"
      case "Medium":
        return "from-yellow-400 to-orange-500"
      case "Hard":
        return "from-red-400 to-pink-600"
      default:
        return "from-gray-400 to-gray-600"
    }
  }

  if (activeGame && gameStarted) {
    return <GamePlayer gameId={activeGame} onGameEnd={endGame} />
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-black bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent mb-4">
          Game Hub 🎮
        </h1>
        <p className="text-xl text-white/80">Test your skills and earn AURA points!</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <div
            key={game.id}
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 hover:scale-105 transform transition-all duration-200"
          >
            <div className="text-center mb-4">
              <div className="text-6xl mb-4">{game.emoji}</div>
              <h3 className="text-2xl font-bold text-white mb-2">{game.name}</h3>
              <p className="text-white/70 mb-4">{game.description}</p>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className={`bg-gradient-to-r ${getDifficultyColor(game.difficulty)} rounded-full px-3 py-1`}>
                <span className="text-white font-medium text-sm">{game.difficulty}</span>
              </div>
              <div className="bg-gradient-to-r from-purple-400 to-pink-500 rounded-full px-3 py-1">
                <span className="text-white font-medium text-sm">Max {game.maxAura} AURA</span>
              </div>
            </div>

            <button
              onClick={() => startGame(game.id)}
              className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold py-3 rounded-xl hover:scale-105 transform transition-all duration-200"
            >
              Start Game 🚀
            </button>
          </div>
        ))}
      </div>

      {/* Recent Scores */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Recent Scores 📊</h2>
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
          <div className="text-center text-white/70">Play some games to see your scores here! 🎯</div>
        </div>
      </div>
    </div>
  )
}

interface GamePlayerProps {
  gameId: string
  onGameEnd: (score: number) => void
}

function GamePlayer({ gameId, onGameEnd }: GamePlayerProps) {
  const [timeLeft, setTimeLeft] = useState(30)
  const [score, setScore] = useState(0)
  const [gameData, setGameData] = useState<any>(null)

  const game = games.find((g) => g.id === gameId)

  // Simple game implementations
  const initializeGame = () => {
    switch (gameId) {
      case "reaction-rush":
        setGameData({
          showButton: false,
          buttonColor: "red",
          startTime: 0,
        })
        // Random delay before showing button
        setTimeout(
          () => {
            setGameData((prev) => ({
              ...prev,
              showButton: true,
              buttonColor: "green",
              startTime: Date.now(),
            }))
          },
          Math.random() * 3000 + 1000,
        )
        break
      case "math-mayhem":
        generateMathProblem()
        break
      default:
        setGameData({ message: "Click the button as fast as you can!" })
    }
  }

  const generateMathProblem = () => {
    const a = Math.floor(Math.random() * 20) + 1
    const b = Math.floor(Math.random() * 20) + 1
    const operations = ["+", "-", "*"]
    const op = operations[Math.floor(Math.random() * operations.length)]

    let answer
    switch (op) {
      case "+":
        answer = a + b
        break
      case "-":
        answer = a - b
        break
      case "*":
        answer = a * b
        break
      default:
        answer = a + b
    }

    setGameData({
      problem: `${a} ${op} ${b}`,
      answer,
      userAnswer: "",
      problems: (gameData?.problems || 0) + 1,
    })
  }

  const handleReactionClick = () => {
    if (gameData.showButton && gameData.buttonColor === "green") {
      const reactionTime = Date.now() - gameData.startTime
      const points = Math.max(100 - Math.floor(reactionTime / 10), 10)
      setScore((prev) => prev + points)

      // Reset for next round
      setGameData({ showButton: false, buttonColor: "red" })
      setTimeout(
        () => {
          setGameData((prev) => ({
            ...prev,
            showButton: true,
            buttonColor: "green",
            startTime: Date.now(),
          }))
        },
        Math.random() * 2000 + 500,
      )
    }
  }

  const handleMathAnswer = (answer: string) => {
    if (Number.parseInt(answer) === gameData.answer) {
      setScore((prev) => prev + 20)
      generateMathProblem()
    }
  }

  // Timer effect
  React.useEffect(() => {
    initializeGame()

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          onGameEnd(score)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          {game?.name} {game?.emoji}
        </h2>

        <div className="flex justify-between items-center mb-8">
          <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-full px-4 py-2">
            <span className="text-white font-bold">Score: {score}</span>
          </div>
          <div className="bg-gradient-to-r from-red-400 to-pink-500 rounded-full px-4 py-2">
            <span className="text-white font-bold">Time: {timeLeft}s</span>
          </div>
        </div>

        {/* Game Content */}
        <div className="mb-8">
          {gameId === "reaction-rush" && (
            <div>
              <p className="text-white mb-4">Click when the button turns green!</p>
              <button
                onClick={handleReactionClick}
                className={`w-32 h-32 rounded-full text-white font-bold text-xl transition-all duration-200 ${
                  gameData?.showButton && gameData?.buttonColor === "green"
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-red-500 cursor-not-allowed"
                }`}
                disabled={!gameData?.showButton || gameData?.buttonColor !== "green"}
              >
                {gameData?.showButton ? "CLICK!" : "WAIT..."}
              </button>
            </div>
          )}

          {gameId === "math-mayhem" && gameData && (
            <div>
              <p className="text-4xl font-bold text-white mb-4">{gameData.problem} = ?</p>
              <input
                type="number"
                value={gameData.userAnswer}
                onChange={(e) => {
                  const newAnswer = e.target.value
                  setGameData((prev) => ({ ...prev, userAnswer: newAnswer }))
                  if (newAnswer) {
                    handleMathAnswer(newAnswer)
                  }
                }}
                className="w-32 px-4 py-2 rounded-xl bg-white/20 text-white text-center text-2xl font-bold border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="?"
                autoFocus
              />
              <p className="text-white/70 mt-2">Problems solved: {gameData.problems}</p>
            </div>
          )}

          {!["reaction-rush", "math-mayhem"].includes(gameId) && (
            <div>
              <p className="text-white mb-4">This is a demo game!</p>
              <button
                onClick={() => setScore((prev) => prev + 10)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-6 py-3 rounded-xl hover:scale-105 transform transition-all duration-200"
              >
                Click for Points! (+10)
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => onGameEnd(score)}
          className="bg-gradient-to-r from-gray-500 to-gray-700 text-white font-bold px-6 py-2 rounded-xl hover:scale-105 transform transition-all duration-200"
        >
          End Game Early
        </button>
      </div>
    </div>
  )
}

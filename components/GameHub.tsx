"use client"

import { useState } from "react"
import type { User } from "@/app/page"

interface GameHubProps {
  user: User | null
  setUser: (user: User) => void
}

interface Game {
  id: string
  name: string
  description: string
  icon: string
  difficulty: string
  maxAura: number
}

export default function GameHub({ user, setUser }: GameHubProps) {
  const [currentGame, setCurrentGame] = useState<Game | null>(null)

  if (!user) return null

  const games: Game[] = [
    {
      id: "memory",
      name: "Memory Matrix",
      description: "Remember and repeat the sequence",
      icon: "🧠",
      difficulty: "Medium",
      maxAura: 50,
    },
    {
      id: "reaction",
      name: "Reaction Test",
      description: "Test your lightning reflexes",
      icon: "⚡",
      difficulty: "Easy",
      maxAura: 30,
    },
    {
      id: "math",
      name: "Math Challenge",
      description: "Solve equations under pressure",
      icon: "🔢",
      difficulty: "Hard",
      maxAura: 60,
    },
    {
      id: "word",
      name: "Word Builder",
      description: "Create words from letters",
      icon: "📝",
      difficulty: "Medium",
      maxAura: 40,
    },
  ]

  const startGame = (game: Game) => {
    setCurrentGame(game)
  }

  const endGame = (score: number) => {
    const auraEarned = Math.floor(score * 2)
    const updatedUser = {
      ...user,
      auraScore: user.auraScore + auraEarned,
    }
    setUser(updatedUser)
    localStorage.setItem("auraUser", JSON.stringify(updatedUser))
    setCurrentGame(null)
  }

  if (currentGame) {
    return (
      <div className="pt-24 min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
        <div className="max-w-2xl mx-auto">
          <GameComponent game={currentGame} onGameEnd={endGame} onBack={() => setCurrentGame(null)} />
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Game Hub</h1>
          <p className="text-xl text-gray-400">Challenge yourself and earn AURA points</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {games.map((game) => (
            <div
              key={game.id}
              className="glass-effect rounded-2xl p-6 hover-lift cursor-pointer transition-all duration-300"
              onClick={() => startGame(game)}
            >
              <div className="text-center">
                <div className="text-5xl mb-4">{game.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{game.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{game.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">{game.difficulty}</span>
                  <span className="text-xs text-gradient font-semibold">+{game.maxAura} AURA</span>
                </div>
                <button className="w-full premium-gradient text-white font-semibold py-3 rounded-lg transition-all duration-300">
                  Play Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 glass-effect rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">Your Gaming Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient">{user.auraScore}</div>
              <div className="text-sm text-gray-400 mt-1">Total AURA</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">0</div>
              <div className="text-sm text-gray-400 mt-1">Games Played</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">0</div>
              <div className="text-sm text-gray-400 mt-1">Best Streak</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">0</div>
              <div className="text-sm text-gray-400 mt-1">High Score</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface GameComponentProps {
  game: Game
  onGameEnd: (score: number) => void
  onBack: () => void
}

function GameComponent({ game, onGameEnd, onBack }: GameComponentProps) {
  const [gameState, setGameState] = useState<"ready" | "playing" | "finished">("ready")
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)

  // Memory Game State
  const [sequence, setSequence] = useState<number[]>([])
  const [playerSequence, setPlayerSequence] = useState<number[]>([])
  const [showingSequence, setShowingSequence] = useState(false)
  const [currentStep, setCurrentStep] = useState(-1)

  // Reaction Game State
  const [reactionStart, setReactionStart] = useState<number | null>(null)
  const [waitingForClick, setWaitingForClick] = useState(false)
  const [reactionTimes, setReactionTimes] = useState<number[]>([])

  // Math Game State
  const [mathProblem, setMathProblem] = useState<{ question: string; answer: number } | null>(null)
  const [mathAnswer, setMathAnswer] = useState("")

  // Word Game State
  const [targetWord, setTargetWord] = useState("")
  const [availableLetters, setAvailableLetters] = useState<string[]>([])
  const [currentWord, setCurrentWord] = useState("")

  const startGame = () => {
    setGameState("playing")
    setScore(0)
    setTimeLeft(30)

    // Initialize specific game
    switch (game.id) {
      case "memory":
        startMemoryGame()
        break
      case "reaction":
        startReactionGame()
        break
      case "math":
        startMathGame()
        break
      case "word":
        startWordGame()
        break
    }

    // Start timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setGameState("finished")
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const startMemoryGame = () => {
    const newSequence = [Math.floor(Math.random() * 4)]
    setSequence(newSequence)
    setPlayerSequence([])
    showSequenceToPlayer(newSequence)
  }

  const showSequenceToPlayer = (seq: number[]) => {
    setShowingSequence(true)
    setCurrentStep(0)

    seq.forEach((step, index) => {
      setTimeout(() => {
        setCurrentStep(step)
        if (index === seq.length - 1) {
          setTimeout(() => {
            setShowingSequence(false)
            setCurrentStep(-1)
          }, 600)
        }
      }, index * 800)
    })
  }

  const handleMemoryClick = (index: number) => {
    if (showingSequence) return

    const newPlayerSequence = [...playerSequence, index]
    setPlayerSequence(newPlayerSequence)

    if (newPlayerSequence[newPlayerSequence.length - 1] !== sequence[newPlayerSequence.length - 1]) {
      return
    }

    if (newPlayerSequence.length === sequence.length) {
      setScore((prev) => prev + 10)
      const nextSequence = [...sequence, Math.floor(Math.random() * 4)]
      setSequence(nextSequence)
      setPlayerSequence([])
      setTimeout(() => showSequenceToPlayer(nextSequence), 500)
    }
  }

  const startReactionGame = () => {
    setTimeout(
      () => {
        setWaitingForClick(true)
        setReactionStart(Date.now())
      },
      Math.random() * 3000 + 1000,
    )
  }

  const handleReactionClick = () => {
    if (!waitingForClick || !reactionStart) return

    const reactionTime = Date.now() - reactionStart
    const newTimes = [...reactionTimes, reactionTime]
    setReactionTimes(newTimes)
    setScore((prev) => prev + Math.max(100 - Math.floor(reactionTime / 10), 10))
    setWaitingForClick(false)

    setTimeout(
      () => {
        setWaitingForClick(true)
        setReactionStart(Date.now())
      },
      Math.random() * 2000 + 1000,
    )
  }

  const startMathGame = () => {
    generateMathProblem()
  }

  const generateMathProblem = () => {
    const a = Math.floor(Math.random() * 20) + 1
    const b = Math.floor(Math.random() * 20) + 1
    const operations = ["+", "-", "*"]
    const op = operations[Math.floor(Math.random() * operations.length)]

    let answer: number
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

    setMathProblem({ question: `${a} ${op} ${b}`, answer })
    setMathAnswer("")
  }

  const handleMathSubmit = () => {
    if (mathProblem && Number.parseInt(mathAnswer) === mathProblem.answer) {
      setScore((prev) => prev + 15)
      generateMathProblem()
    } else {
      setMathAnswer("")
    }
  }

  const startWordGame = () => {
    const words = ["REACT", "GAMES", "AURA", "CODE", "PLAY"]
    const word = words[Math.floor(Math.random() * words.length)]
    setTargetWord(word)
    setAvailableLetters(word.split("").sort(() => Math.random() - 0.5))
    setCurrentWord("")
  }

  const handleLetterClick = (letter: string, index: number) => {
    setCurrentWord((prev) => prev + letter)
    setAvailableLetters((prev) => prev.filter((_, i) => i !== index))
  }

  const checkWord = () => {
    if (currentWord === targetWord) {
      setScore((prev) => prev + 20)
      startWordGame()
    } else {
      setCurrentWord("")
      setAvailableLetters(targetWord.split("").sort(() => Math.random() - 0.5))
    }
  }

  const renderGameContent = () => {
    switch (game.id) {
      case "memory":
        return (
          <div className="space-y-6">
            <p className="text-gray-400 text-center">
              {showingSequence ? "Watch the sequence..." : "Repeat the sequence!"}
            </p>
            <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
              {[0, 1, 2, 3].map((index) => (
                <button
                  key={index}
                  onClick={() => handleMemoryClick(index)}
                  className={`h-20 rounded-lg transition-all duration-200 ${
                    currentStep === index ? "premium-gradient" : "bg-gray-700 hover:bg-gray-600"
                  }`}
                  disabled={showingSequence}
                />
              ))}
            </div>
          </div>
        )

      case "reaction":
        return (
          <div className="text-center space-y-6">
            <p className="text-gray-400">Click when the button turns blue!</p>
            <button
              onClick={handleReactionClick}
              className={`w-32 h-32 rounded-full text-white font-bold text-xl transition-all duration-200 ${
                waitingForClick ? "premium-gradient" : "bg-red-600"
              }`}
            >
              {waitingForClick ? "CLICK!" : "WAIT..."}
            </button>
            {reactionTimes.length > 0 && (
              <p className="text-sm text-gray-400">
                Average: {Math.round(reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length)}ms
              </p>
            )}
          </div>
        )

      case "math":
        return (
          <div className="text-center space-y-6">
            {mathProblem && (
              <>
                <p className="text-3xl font-bold text-white">{mathProblem.question} = ?</p>
                <input
                  type="number"
                  value={mathAnswer}
                  onChange={(e) => setMathAnswer(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleMathSubmit()}
                  className="w-32 px-4 py-2 text-center text-xl font-bold bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  autoFocus
                />
                <button
                  onClick={handleMathSubmit}
                  className="block mx-auto premium-gradient text-white font-semibold px-6 py-2 rounded-lg"
                >
                  Submit
                </button>
              </>
            )}
          </div>
        )

      case "word":
        return (
          <div className="text-center space-y-6">
            <p className="text-gray-400">
              Make the word: <span className="text-white font-bold">{targetWord}</span>
            </p>
            <div className="text-2xl font-bold text-white min-h-[2rem]">{currentWord}</div>
            <div className="flex flex-wrap justify-center gap-2">
              {availableLetters.map((letter, index) => (
                <button
                  key={index}
                  onClick={() => handleLetterClick(letter, index)}
                  className="w-12 h-12 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg transition-colors"
                >
                  {letter}
                </button>
              ))}
            </div>
            <div className="space-x-4">
              <button onClick={checkWord} className="premium-gradient text-white font-semibold px-6 py-2 rounded-lg">
                Check Word
              </button>
              <button
                onClick={() => {
                  setCurrentWord("")
                  setAvailableLetters(targetWord.split("").sort(() => Math.random() - 0.5))
                }}
                className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-6 py-2 rounded-lg"
              >
                Reset
              </button>
            </div>
          </div>
        )

      default:
        return <div>Game not implemented</div>
    }
  }

  return (
    <div className="glass-effect rounded-2xl p-8">
      <button onClick={onBack} className="mb-6 text-gray-400 hover:text-white transition-colors">
        ← Back to Games
      </button>

      <div className="text-center mb-8">
        <div className="text-5xl mb-4">{game.icon}</div>
        <h2 className="text-3xl font-bold text-white mb-2">{game.name}</h2>
        <p className="text-gray-400">{game.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="text-center">
          <div className="text-2xl font-bold text-gradient">{score}</div>
          <div className="text-sm text-gray-400">Score</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white">{timeLeft}s</div>
          <div className="text-sm text-gray-400">Time Left</div>
        </div>
      </div>

      {gameState === "ready" && (
        <div className="text-center">
          <button
            onClick={startGame}
            className="premium-gradient text-white font-semibold px-8 py-4 rounded-lg text-xl hover-lift transition-all duration-300"
          >
            Start Game
          </button>
        </div>
      )}

      {gameState === "playing" && renderGameContent()}

      {gameState === "finished" && (
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold text-white">Game Over!</h3>
          <p className="text-xl text-gray-300">
            You earned <span className="text-gradient font-bold">{score * 2} AURA</span>!
          </p>
          <button
            onClick={() => onGameEnd(score)}
            className="premium-gradient text-white font-semibold px-6 py-3 rounded-lg hover-lift transition-all duration-300"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  )
}

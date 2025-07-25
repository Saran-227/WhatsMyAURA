"use client"

import { useState, useEffect } from "react"
import type { User } from "@/app/page"

interface GameHubProps {
  user: User | null
  setUser: (user: User) => void
}

const games = [
  {
    id: "memory",
    title: "Memory Challenge",
    description: "Test your memory with sequences",
    icon: "🧠",
    difficulty: "Medium",
    maxAura: 500,
  },
  {
    id: "reaction",
    title: "Reaction Time",
    description: "How fast are your reflexes?",
    icon: "⚡",
    difficulty: "Easy",
    maxAura: 300,
  },
  {
    id: "math",
    title: "Quick Math",
    description: "Solve math problems under pressure",
    icon: "🔢",
    difficulty: "Medium",
    maxAura: 400,
  },
  {
    id: "word",
    title: "Word Association",
    description: "Connect words and concepts",
    icon: "📝",
    difficulty: "Hard",
    maxAura: 600,
  },
  {
    id: "aptitude",
    title: "Aptitude Test",
    description: "100 questions on Geography, Math, English, Logic & Sports",
    icon: "🎓",
    difficulty: "Expert",
    maxAura: 2000,
  },
  {
    id: "competitive",
    title: "Competitive Test",
    description: "JEE/NEET level questions - Physics, Chemistry, Math & Biology",
    icon: "🎯",
    difficulty: "Expert",
    maxAura: 400,
  },
]

// Aptitude Test Questions (100 questions)
const aptitudeQuestions = [
  // Geography (20 questions)
  {
    category: "Geography",
    question: "What is the capital of Maharashtra?",
    options: ["Mumbai", "Pune", "Nagpur", "Nashik"],
    correct: 0,
  },
  {
    category: "Geography",
    question: "Which river is known as the 'Ganga of the South'?",
    options: ["Krishna", "Godavari", "Kaveri", "Tungabhadra"],
    correct: 2,
  },
  {
    category: "Geography",
    question: "The highest peak in India is:",
    options: ["K2", "Kanchenjunga", "Nanda Devi", "Mount Everest"],
    correct: 1,
  },
  {
    category: "Geography",
    question: "Which state has the longest coastline in India?",
    options: ["Tamil Nadu", "Gujarat", "Andhra Pradesh", "Kerala"],
    correct: 1,
  },
  {
    category: "Geography",
    question: "The Tropic of Cancer passes through how many Indian states?",
    options: ["6", "7", "8", "9"],
    correct: 2,
  },
  {
    category: "Geography",
    question: "Which is the largest state in India by area?",
    options: ["Madhya Pradesh", "Uttar Pradesh", "Rajasthan", "Maharashtra"],
    correct: 2,
  },
  {
    category: "Geography",
    question: "The Sundarbans mangrove forest is located in:",
    options: ["West Bengal", "Odisha", "Andhra Pradesh", "Tamil Nadu"],
    correct: 0,
  },
  {
    category: "Geography",
    question: "Which mountain range separates India from China?",
    options: ["Himalayas", "Karakoram", "Hindu Kush", "Aravalli"],
    correct: 0,
  },
  {
    category: "Geography",
    question: "The Deccan Plateau is bounded by which mountain ranges?",
    options: ["Western & Eastern Ghats", "Himalayas & Vindhyas", "Satpura & Aravalli", "Nilgiris & Cardamom"],
    correct: 0,
  },
  {
    category: "Geography",
    question: "Which Indian city is known as the 'Silicon Valley of India'?",
    options: ["Hyderabad", "Pune", "Chennai", "Bangalore"],
    correct: 3,
  },
  {
    category: "Geography",
    question: "The Chilika Lake is located in which state?",
    options: ["West Bengal", "Odisha", "Andhra Pradesh", "Tamil Nadu"],
    correct: 1,
  },
  {
    category: "Geography",
    question: "Which is the southernmost point of India?",
    options: ["Kanyakumari", "Indira Point", "Point Calimere", "Dhanushkodi"],
    correct: 1,
  },
  {
    category: "Geography",
    question: "The Thar Desert is located in:",
    options: ["Gujarat", "Rajasthan", "Haryana", "Punjab"],
    correct: 1,
  },
  {
    category: "Geography",
    question: "Which river forms the famous Jog Falls?",
    options: ["Kaveri", "Krishna", "Sharavathi", "Tungabhadra"],
    correct: 2,
  },
  {
    category: "Geography",
    question: "The Andaman and Nicobar Islands are separated by:",
    options: ["Ten Degree Channel", "Nine Degree Channel", "Eight Degree Channel", "Eleven Degree Channel"],
    correct: 0,
  },
  {
    category: "Geography",
    question: "Which state is known as the 'Land of Five Rivers'?",
    options: ["Haryana", "Punjab", "Uttar Pradesh", "Himachal Pradesh"],
    correct: 1,
  },
  {
    category: "Geography",
    question: "The Western Ghats are also known as:",
    options: ["Sahyadri", "Nilgiris", "Cardamom Hills", "Anaimalai"],
    correct: 0,
  },
  {
    category: "Geography",
    question: "Which is the largest freshwater lake in India?",
    options: ["Dal Lake", "Wular Lake", "Chilika Lake", "Pulicat Lake"],
    correct: 1,
  },
  {
    category: "Geography",
    question: "The Konkan coast is located along:",
    options: ["Arabian Sea", "Bay of Bengal", "Indian Ocean", "Laccadive Sea"],
    correct: 0,
  },
  {
    category: "Geography",
    question: "Which Indian state has three capitals?",
    options: ["Himachal Pradesh", "Uttarakhand", "Jammu & Kashmir", "Andhra Pradesh"],
    correct: 2,
  },

  // Mathematics (20 questions)
  {
    category: "Mathematics",
    question: "If 25% of a number is 75, what is the number?",
    options: ["200", "250", "300", "350"],
    correct: 2,
  },
  {
    category: "Mathematics",
    question: "The sum of first 10 natural numbers is:",
    options: ["45", "50", "55", "60"],
    correct: 2,
  },
  {
    category: "Mathematics",
    question: "If a train travels 60 km in 45 minutes, what is its speed in km/hr?",
    options: ["75", "80", "85", "90"],
    correct: 1,
  },
  {
    category: "Mathematics",
    question: "The area of a circle with radius 7 cm is (π = 22/7):",
    options: ["154 cm²", "144 cm²", "164 cm²", "174 cm²"],
    correct: 0,
  },
  {
    category: "Mathematics",
    question: "If x + y = 10 and x - y = 4, then x = ?",
    options: ["6", "7", "8", "9"],
    correct: 1,
  },
  {
    category: "Mathematics",
    question: "The compound interest on ₹1000 for 2 years at 10% per annum is:",
    options: ["₹200", "₹210", "₹220", "₹230"],
    correct: 1,
  },
  { category: "Mathematics", question: "The value of √144 + √81 is:", options: ["15", "17", "19", "21"], correct: 3 },
  { category: "Mathematics", question: "If 3x + 5 = 20, then x = ?", options: ["3", "4", "5", "6"], correct: 2 },
  {
    category: "Mathematics",
    question: "The perimeter of a rectangle with length 12 cm and breadth 8 cm is:",
    options: ["40 cm", "42 cm", "44 cm", "46 cm"],
    correct: 0,
  },
  { category: "Mathematics", question: "What is 15% of 200?", options: ["25", "30", "35", "40"], correct: 1 },
  { category: "Mathematics", question: "The LCM of 12 and 18 is:", options: ["36", "54", "72", "108"], correct: 0 },
  {
    category: "Mathematics",
    question: "If a shopkeeper sells an item for ₹120 with 20% profit, what was the cost price?",
    options: ["₹90", "₹95", "₹100", "₹105"],
    correct: 2,
  },
  {
    category: "Mathematics",
    question: "The average of 5, 10, 15, 20, 25 is:",
    options: ["12", "15", "18", "20"],
    correct: 1,
  },
  {
    category: "Mathematics",
    question: "What is the next number in the series: 2, 6, 12, 20, ?",
    options: ["28", "30", "32", "34"],
    correct: 1,
  },
  {
    category: "Mathematics",
    question: "The volume of a cube with side 4 cm is:",
    options: ["16 cm³", "32 cm³", "48 cm³", "64 cm³"],
    correct: 3,
  },
  { category: "Mathematics", question: "If 2^x = 32, then x = ?", options: ["4", "5", "6", "7"], correct: 1 },
  {
    category: "Mathematics",
    question: "The sum of angles in a triangle is:",
    options: ["90°", "180°", "270°", "360°"],
    correct: 1,
  },
  {
    category: "Mathematics",
    question: "What is 0.25 as a fraction?",
    options: ["1/2", "1/3", "1/4", "1/5"],
    correct: 2,
  },
  {
    category: "Mathematics",
    question: "If a car covers 240 km in 4 hours, what is its average speed?",
    options: ["50 km/hr", "55 km/hr", "60 km/hr", "65 km/hr"],
    correct: 2,
  },
  { category: "Mathematics", question: "The HCF of 24 and 36 is:", options: ["6", "8", "12", "18"], correct: 2 },

  // English (20 questions)
  {
    category: "English",
    question: "Choose the synonym of 'Abundant':",
    options: ["Scarce", "Plentiful", "Limited", "Rare"],
    correct: 1,
  },
  {
    category: "English",
    question: "What is the antonym of 'Ancient'?",
    options: ["Old", "Modern", "Historic", "Traditional"],
    correct: 1,
  },
  {
    category: "English",
    question: "Choose the correct spelling:",
    options: ["Recieve", "Receive", "Receve", "Receeve"],
    correct: 1,
  },
  {
    category: "English",
    question: "The plural of 'Child' is:",
    options: ["Childs", "Children", "Childes", "Childern"],
    correct: 1,
  },
  {
    category: "English",
    question: "Choose the correct sentence:",
    options: ["He don't like it", "He doesn't likes it", "He doesn't like it", "He don't likes it"],
    correct: 2,
  },
  {
    category: "English",
    question: "What is the past tense of 'Go'?",
    options: ["Goed", "Gone", "Went", "Going"],
    correct: 2,
  },
  {
    category: "English",
    question: "Choose the synonym of 'Brave':",
    options: ["Coward", "Fearful", "Courageous", "Timid"],
    correct: 2,
  },
  {
    category: "English",
    question: "The opposite of 'Expand' is:",
    options: ["Grow", "Increase", "Contract", "Enlarge"],
    correct: 2,
  },
  {
    category: "English",
    question: "Choose the correct article: '__ honest man'",
    options: ["A", "An", "The", "No article"],
    correct: 1,
  },
  {
    category: "English",
    question: "What is the comparative form of 'Good'?",
    options: ["Gooder", "More good", "Better", "Best"],
    correct: 2,
  },
  {
    category: "English",
    question: "Choose the correct preposition: 'He is good __ mathematics'",
    options: ["in", "at", "on", "with"],
    correct: 1,
  },
  {
    category: "English",
    question: "The feminine of 'Hero' is:",
    options: ["Heroine", "Heroess", "Heroina", "Heroe"],
    correct: 0,
  },
  {
    category: "English",
    question: "Choose the synonym of 'Intelligent':",
    options: ["Stupid", "Smart", "Dull", "Ignorant"],
    correct: 1,
  },
  {
    category: "English",
    question: "What is the past participle of 'Write'?",
    options: ["Wrote", "Written", "Writing", "Writes"],
    correct: 1,
  },
  {
    category: "English",
    question: "Choose the correct sentence:",
    options: ["I have went there", "I have go there", "I have gone there", "I have going there"],
    correct: 2,
  },
  {
    category: "English",
    question: "The antonym of 'Victory' is:",
    options: ["Success", "Win", "Defeat", "Achievement"],
    correct: 2,
  },
  {
    category: "English",
    question: "Choose the correct spelling:",
    options: ["Definately", "Definitely", "Definitly", "Definatly"],
    correct: 1,
  },
  {
    category: "English",
    question: "What is the superlative form of 'Bad'?",
    options: ["Badder", "More bad", "Worse", "Worst"],
    correct: 3,
  },
  {
    category: "English",
    question: "Choose the correct pronoun: 'The book belongs to __ and me'",
    options: ["he", "him", "his", "himself"],
    correct: 1,
  },
  { category: "English", question: "The plural of 'Ox' is:", options: ["Oxs", "Oxes", "Oxen", "Oxies"], correct: 2 },

  // Logical Reasoning (20 questions)
  {
    category: "Logic",
    question: "If all roses are flowers and some flowers are red, then:",
    options: ["All roses are red", "Some roses are red", "No roses are red", "Cannot be determined"],
    correct: 3,
  },
  { category: "Logic", question: "Complete the series: 1, 4, 9, 16, ?", options: ["20", "24", "25", "30"], correct: 2 },
  {
    category: "Logic",
    question: "If BOOK is coded as CPPL, then WORD is coded as:",
    options: ["XPSE", "XQSE", "YQSE", "YPSE"],
    correct: 0,
  },
  { category: "Logic", question: "Find the odd one out:", options: ["Apple", "Mango", "Carrot", "Orange"], correct: 2 },
  {
    category: "Logic",
    question: "If Monday is the 1st, what day is the 15th?",
    options: ["Sunday", "Monday", "Tuesday", "Wednesday"],
    correct: 1,
  },
  { category: "Logic", question: "Complete: 2, 6, 12, 20, 30, ?", options: ["40", "42", "44", "46"], correct: 1 },
  { category: "Logic", question: "If CAT = 3120, then DOG = ?", options: ["4157", "4167", "4177", "4187"], correct: 1 },
  {
    category: "Logic",
    question: "Which number comes next: 1, 1, 2, 3, 5, 8, ?",
    options: ["11", "12", "13", "14"],
    correct: 2,
  },
  {
    category: "Logic",
    question: "If all birds can fly and penguin is a bird, then:",
    options: ["Penguin can fly", "Penguin cannot fly", "Statement is contradictory", "Need more information"],
    correct: 2,
  },
  {
    category: "Logic",
    question: "Find the missing number: 3, 7, 15, 31, ?",
    options: ["63", "65", "67", "69"],
    correct: 0,
  },
  {
    category: "Logic",
    question: "If FRIEND is coded as GSJFOE, then MOTHER is coded as:",
    options: ["NPUIFS", "NPUIFS", "OPUIFS", "OPVIFS"],
    correct: 1,
  },
  {
    category: "Logic",
    question: "Complete the analogy: Hand : Glove :: Foot : ?",
    options: ["Sock", "Shoe", "Boot", "Sandal"],
    correct: 1,
  },
  {
    category: "Logic",
    question: "If today is Wednesday, what day was it 100 days ago?",
    options: ["Monday", "Tuesday", "Wednesday", "Thursday"],
    correct: 3,
  },
  {
    category: "Logic",
    question: "Find the odd one: 11, 13, 17, 19, 21",
    options: ["11", "13", "17", "21"],
    correct: 3,
  },
  { category: "Logic", question: "Complete: A, D, G, J, ?", options: ["K", "L", "M", "N"], correct: 2 },
  {
    category: "Logic",
    question: "If WATER is written as 12345, then TEAR is written as:",
    options: ["3214", "3241", "4321", "4312"],
    correct: 1,
  },
  { category: "Logic", question: "Which comes next: Z, Y, X, W, ?", options: ["U", "V", "T", "S"], correct: 1 },
  {
    category: "Logic",
    question: "If 5 + 3 = 28, 9 + 1 = 810, then 8 + 6 = ?",
    options: ["214", "314", "414", "514"],
    correct: 1,
  },
  {
    category: "Logic",
    question: "Find the missing term: 4, 9, 16, 25, ?",
    options: ["30", "32", "36", "49"],
    correct: 2,
  },
  {
    category: "Logic",
    question: "If DELHI is coded as CDKGH, then MUMBAI is coded as:",
    options: ["LTLAZH", "LTMAZH", "LULAZH", "LUMAZH"],
    correct: 0,
  },

  // Sports (20 questions)
  {
    category: "Sports",
    question: "Who is known as the 'Captain Cool' in Indian cricket?",
    options: ["Virat Kohli", "MS Dhoni", "Rohit Sharma", "Sourav Ganguly"],
    correct: 1,
  },
  {
    category: "Sports",
    question: "In which year did India win the Cricket World Cup for the first time?",
    options: ["1975", "1979", "1983", "1987"],
    correct: 2,
  },
  {
    category: "Sports",
    question: "Who is the first Indian to win an individual Olympic gold medal?",
    options: ["Abhinav Bindra", "Rajyavardhan Rathore", "Vijender Singh", "Sushil Kumar"],
    correct: 0,
  },
  {
    category: "Sports",
    question: "The Ranji Trophy is associated with which sport?",
    options: ["Hockey", "Football", "Cricket", "Badminton"],
    correct: 2,
  },
  {
    category: "Sports",
    question: "Who is known as the 'Flying Sikh'?",
    options: ["Milkha Singh", "Gurbachan Singh", "Ajit Pal Singh", "Balbir Singh"],
    correct: 0,
  },
  {
    category: "Sports",
    question: "In which sport did P.V. Sindhu win an Olympic medal?",
    options: ["Tennis", "Badminton", "Table Tennis", "Squash"],
    correct: 1,
  },
  {
    category: "Sports",
    question: "The Santosh Trophy is related to which sport?",
    options: ["Cricket", "Hockey", "Football", "Kabaddi"],
    correct: 2,
  },
  {
    category: "Sports",
    question: "Who is the first Indian woman to win an Olympic medal?",
    options: ["P.V. Sindhu", "Saina Nehwal", "Karnam Malleswari", "Mary Kom"],
    correct: 2,
  },
  {
    category: "Sports",
    question: "The Eden Gardens stadium is located in:",
    options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
    correct: 2,
  },
  {
    category: "Sports",
    question: "Who holds the record for most runs in Test cricket for India?",
    options: ["Sachin Tendulkar", "Virat Kohli", "Rahul Dravid", "Sunil Gavaskar"],
    correct: 0,
  },
  {
    category: "Sports",
    question: "The Dhyan Chand Award is given for excellence in:",
    options: ["Cricket", "Hockey", "Sports in general", "Football"],
    correct: 2,
  },
  {
    category: "Sports",
    question: "Who is known as the 'Wall' in Indian cricket?",
    options: ["Sachin Tendulkar", "Rahul Dravid", "VVS Laxman", "Anil Kumble"],
    correct: 1,
  },
  {
    category: "Sports",
    question: "In which year did India host the Commonwealth Games?",
    options: ["2008", "2010", "2012", "2014"],
    correct: 1,
  },
  {
    category: "Sports",
    question: "The Arjuna Award is given for:",
    options: ["Lifetime achievement", "Outstanding performance", "Coaching", "Sports journalism"],
    correct: 1,
  },
  {
    category: "Sports",
    question: "Who was the first Indian to reach the finals of All England Badminton Championship?",
    options: ["Prakash Padukone", "Pullela Gopichand", "Saina Nehwal", "P.V. Sindhu"],
    correct: 0,
  },
  {
    category: "Sports",
    question: "The Indian Premier League (IPL) was started in which year?",
    options: ["2007", "2008", "2009", "2010"],
    correct: 1,
  },
  {
    category: "Sports",
    question: "Who is the most successful captain in Indian cricket history?",
    options: ["Kapil Dev", "Sourav Ganguly", "MS Dhoni", "Virat Kohli"],
    correct: 2,
  },
  {
    category: "Sports",
    question: "The Dronacharya Award is given to:",
    options: ["Players", "Coaches", "Officials", "Journalists"],
    correct: 1,
  },
  {
    category: "Sports",
    question: "Who was the first Indian to win a Grand Slam in tennis?",
    options: ["Leander Paes", "Mahesh Bhupathi", "Sania Mirza", "Rohan Bopanna"],
    correct: 0,
  },
  {
    category: "Sports",
    question: "The National Game of India is:",
    options: ["Cricket", "Hockey", "Football", "Kabaddi"],
    correct: 1,
  },
]

// Competitive Test Questions (20 questions)
const competitiveQuestions = [
  // Physics (5 questions)
  {
    category: "Physics",
    question: "The dimensional formula for angular momentum is:",
    options: ["[ML²T⁻¹]", "[MLT⁻¹]", "[ML²T⁻²]", "[MLT⁻²]"],
    correct: 0,
    explanation: "Angular momentum = mvr, so dimensions are [M][LT⁻¹][L] = [ML²T⁻¹]",
  },
  {
    category: "Physics",
    question:
      "A particle moves in a circle of radius R. The ratio of distance to displacement after half revolution is:",
    options: ["π/2", "π", "2/π", "1/π"],
    correct: 0,
    explanation: "Distance = πR (semicircle), Displacement = 2R (diameter), Ratio = πR/2R = π/2",
  },
  {
    category: "Physics",
    question: "The refractive index of a medium is √2. The critical angle for total internal reflection is:",
    options: ["30°", "45°", "60°", "90°"],
    correct: 1,
    explanation: "sin C = 1/μ = 1/√2, so C = 45°",
  },
  {
    category: "Physics",
    question: "The de Broglie wavelength of an electron accelerated through 100V is approximately:",
    options: ["1.2 Å", "12 Å", "0.12 Å", "120 Å"],
    correct: 0,
    explanation: "λ = h/p = h/√(2meV) ≈ 1.2 Å for 100V",
  },
  {
    category: "Physics",
    question:
      "Two identical springs are connected in parallel. If each has spring constant k, the equivalent spring constant is:",
    options: ["k/2", "k", "2k", "4k"],
    correct: 2,
    explanation: "For parallel springs, keq = k₁ + k₂ = k + k = 2k",
  },

  // Chemistry (5 questions)
  {
    category: "Chemistry",
    question: "The IUPAC name of CH₃-CH(CH₃)-CH₂-CH₃ is:",
    options: ["2-methylbutane", "3-methylbutane", "2-methylpropane", "pentane"],
    correct: 0,
    explanation: "The longest chain has 4 carbons (butane) with a methyl group at position 2",
  },
  {
    category: "Chemistry",
    question: "The hybridization of carbon in diamond is:",
    options: ["sp", "sp²", "sp³", "sp³d"],
    correct: 2,
    explanation: "In diamond, each carbon forms 4 sigma bonds, requiring sp³ hybridization",
  },
  {
    category: "Chemistry",
    question: "The quantum numbers n=3, l=2, m=0, s=+1/2 represent:",
    options: ["3s electron", "3p electron", "3d electron", "4s electron"],
    correct: 2,
    explanation: "n=3, l=2 corresponds to 3d orbital (l=2 means d orbital)",
  },
  {
    category: "Chemistry",
    question: "The pH of 0.01 M HCl solution is:",
    options: ["1", "2", "12", "13"],
    correct: 1,
    explanation: "pH = -log[H⁺] = -log(0.01) = -log(10⁻²) = 2",
  },
  {
    category: "Chemistry",
    question: "Which of the following has the highest bond order?",
    options: ["N₂", "O₂", "F₂", "Ne₂"],
    correct: 0,
    explanation: "N₂ has bond order 3, O₂ has 2, F₂ has 1, Ne₂ has 0",
  },

  // Mathematics (5 questions)
  {
    category: "Mathematics",
    question: "The derivative of sin⁻¹(x) is:",
    options: ["1/√(1-x²)", "-1/√(1-x²)", "1/√(1+x²)", "-1/√(1+x²)"],
    correct: 0,
    explanation: "d/dx[sin⁻¹(x)] = 1/√(1-x²)",
  },
  {
    category: "Mathematics",
    question: "If z = 1 + i, then |z|² is:",
    options: ["1", "2", "√2", "4"],
    correct: 1,
    explanation: "|z|² = |1 + i|² = 1² + 1² = 2",
  },
  {
    category: "Mathematics",
    question: "The number of ways to arrange 5 different books on a shelf is:",
    options: ["20", "60", "120", "240"],
    correct: 2,
    explanation: "5! = 5 × 4 × 3 × 2 × 1 = 120",
  },
  {
    category: "Mathematics",
    question: "The equation of the line passing through (2,3) with slope 2 is:",
    options: ["y = 2x - 1", "y = 2x + 1", "y = 2x - 3", "y = 2x + 3"],
    correct: 0,
    explanation: "Using y - y₁ = m(x - x₁): y - 3 = 2(x - 2) → y = 2x - 1",
  },
  {
    category: "Mathematics",
    question: "∫₀¹ x² dx equals:",
    options: ["1/4", "1/3", "1/2", "1"],
    correct: 1,
    explanation: "∫x² dx = x³/3, so ∫₀¹ x² dx = [x³/3]₀¹ = 1/3 - 0 = 1/3",
  },

  // Biology (5 questions)
  {
    category: "Biology",
    question: "The powerhouse of the cell is:",
    options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi apparatus"],
    correct: 2,
    explanation: "Mitochondria produce ATP through cellular respiration, hence called powerhouse",
  },
  {
    category: "Biology",
    question: "In humans, the sex chromosomes for males are:",
    options: ["XX", "XY", "YY", "XO"],
    correct: 1,
    explanation: "Males have XY chromosomes, females have XX",
  },
  {
    category: "Biology",
    question: "The process by which plants make their own food is called:",
    options: ["Respiration", "Photosynthesis", "Transpiration", "Digestion"],
    correct: 1,
    explanation: "Photosynthesis converts light energy into chemical energy (glucose)",
  },
  {
    category: "Biology",
    question: "The basic unit of heredity is:",
    options: ["Chromosome", "Gene", "DNA", "RNA"],
    correct: 1,
    explanation: "Genes are the basic units of heredity that determine traits",
  },
  {
    category: "Biology",
    question: "Which blood group is called the universal donor?",
    options: ["A", "B", "AB", "O"],
    correct: 3,
    explanation: "O blood group has no antigens, so it can donate to all blood groups",
  },
]

export default function GameHub({ user, setUser }: GameHubProps) {
  const [selectedGame, setSelectedGame] = useState<string | null>(null)
  const [gameState, setGameState] = useState<any>({})

  // Memory Game State
  const [sequence, setSequence] = useState<number[]>([])
  const [userSequence, setUserSequence] = useState<number[]>([])
  const [isShowing, setIsShowing] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [level, setLevel] = useState(1)
  const [score, setScore] = useState(0)

  // Reaction Game State
  const [reactionStarted, setReactionStarted] = useState(false)
  const [showGreen, setShowGreen] = useState(false)
  const [reactionTime, setReactionTime] = useState<number | null>(null)
  const [startTime, setStartTime] = useState<number>(0)

  // Math Game State
  const [mathProblem, setMathProblem] = useState<{ question: string; answer: number } | null>(null)
  const [mathAnswer, setMathAnswer] = useState("")
  const [mathScore, setMathScore] = useState(0)
  const [mathTimeLeft, setMathTimeLeft] = useState(60)
  const [mathGameActive, setMathGameActive] = useState(false)

  // Word Game State
  const [wordPairs] = useState([
    { word: "Ocean", options: ["Water", "Desert", "Mountain", "Forest"], correct: 0 },
    { word: "Library", options: ["Books", "Food", "Cars", "Clothes"], correct: 0 },
    { word: "Hospital", options: ["Shopping", "Treatment", "Entertainment", "Education"], correct: 1 },
    { word: "Kitchen", options: ["Sleeping", "Cooking", "Reading", "Playing"], correct: 1 },
    { word: "School", options: ["Learning", "Swimming", "Dancing", "Singing"], correct: 0 },
  ])
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [wordScore, setWordScore] = useState(0)
  const [wordGameActive, setWordGameActive] = useState(false)

  // Test Game States
  const [testQuestions, setTestQuestions] = useState<any[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [testScore, setTestScore] = useState(0)
  const [testTimeLeft, setTestTimeLeft] = useState(0)
  const [testGameActive, setTestGameActive] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [usedQuestions, setUsedQuestions] = useState<number[]>([])

  // Timer effects
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (mathGameActive && mathTimeLeft > 0) {
      interval = setInterval(() => {
        setMathTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (mathGameActive && mathTimeLeft === 0) {
      endMathGame()
    }
    return () => clearInterval(interval)
  }, [mathGameActive, mathTimeLeft])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (testGameActive && testTimeLeft > 0) {
      interval = setInterval(() => {
        setTestTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (testGameActive && testTimeLeft === 0) {
      endTestGame()
    }
    return () => clearInterval(interval)
  }, [testGameActive, testTimeLeft])

  const updateUserAura = (points: number) => {
    if (user) {
      const updatedUser = { ...user, auraScore: user.auraScore + points }
      setUser(updatedUser)
      localStorage.setItem("auraUser", JSON.stringify(updatedUser))
    }
  }

  // Memory Game Functions
  const startMemoryGame = () => {
    setGameStarted(true)
    setLevel(1)
    setScore(0)
    generateSequence(1)
  }

  const generateSequence = (level: number) => {
    const newSequence = Array.from({ length: level }, () => Math.floor(Math.random() * 4))
    setSequence(newSequence)
    setUserSequence([])
    showSequence(newSequence)
  }

  const showSequence = (seq: number[]) => {
    setIsShowing(true)
    seq.forEach((num, index) => {
      setTimeout(() => {
        // Flash the button
        const button = document.getElementById(`memory-btn-${num}`)
        if (button) {
          button.style.backgroundColor = "#3b82f6"
          setTimeout(() => {
            button.style.backgroundColor = "#1f2937"
          }, 500)
        }
        if (index === seq.length - 1) {
          setTimeout(() => setIsShowing(false), 500)
        }
      }, index * 800)
    })
  }

  const handleMemoryClick = (num: number) => {
    if (isShowing) return

    const newUserSequence = [...userSequence, num]
    setUserSequence(newUserSequence)

    if (newUserSequence[newUserSequence.length - 1] !== sequence[newUserSequence.length - 1]) {
      // Wrong answer
      alert(`Game Over! Final Score: ${score}`)
      updateUserAura(score * 10)
      setSelectedGame(null)
      setGameStarted(false)
      return
    }

    if (newUserSequence.length === sequence.length) {
      // Correct sequence completed
      const newScore = score + level * 20
      setScore(newScore)
      setLevel(level + 1)
      setTimeout(() => generateSequence(level + 1), 1000)
    }
  }

  // Reaction Game Functions
  const startReactionGame = () => {
    setReactionStarted(true)
    setShowGreen(false)
    setReactionTime(null)

    const delay = Math.random() * 4000 + 1000 // 1-5 seconds
    setTimeout(() => {
      setShowGreen(true)
      setStartTime(Date.now())
    }, delay)
  }

  const handleReactionClick = () => {
    if (!showGreen) {
      alert("Too early! Wait for green.")
      setReactionStarted(false)
      return
    }

    const time = Date.now() - startTime
    setReactionTime(time)
    setShowGreen(false)
    setReactionStarted(false)

    let points = 0
    if (time < 200) points = 300
    else if (time < 300) points = 250
    else if (time < 400) points = 200
    else if (time < 500) points = 150
    else points = 100

    updateUserAura(points)
    alert(`Reaction time: ${time}ms! You earned ${points} AURA points!`)
    setSelectedGame(null)
  }

  // Math Game Functions
  const generateMathProblem = () => {
    const operations = ["+", "-", "*"]
    const op = operations[Math.floor(Math.random() * operations.length)]
    let a, b, answer, question

    switch (op) {
      case "+":
        a = Math.floor(Math.random() * 50) + 1
        b = Math.floor(Math.random() * 50) + 1
        answer = a + b
        question = `${a} + ${b}`
        break
      case "-":
        a = Math.floor(Math.random() * 50) + 25
        b = Math.floor(Math.random() * 25) + 1
        answer = a - b
        question = `${a} - ${b}`
        break
      case "*":
        a = Math.floor(Math.random() * 12) + 1
        b = Math.floor(Math.random() * 12) + 1
        answer = a * b
        question = `${a} × ${b}`
        break
      default:
        a = 1
        b = 1
        answer = 2
        question = "1 + 1"
    }

    setMathProblem({ question, answer })
  }

  const startMathGame = () => {
    setMathGameActive(true)
    setMathScore(0)
    setMathTimeLeft(60)
    setMathAnswer("")
    generateMathProblem()
  }

  const submitMathAnswer = () => {
    if (!mathProblem) return

    const userAnswer = Number.parseInt(mathAnswer)
    if (userAnswer === mathProblem.answer) {
      setMathScore(mathScore + 1)
    }

    setMathAnswer("")
    generateMathProblem()
  }

  const endMathGame = () => {
    setMathGameActive(false)
    const points = mathScore * 20
    updateUserAura(points)
    alert(`Time's up! You solved ${mathScore} problems and earned ${points} AURA points!`)
    setSelectedGame(null)
  }

  // Word Game Functions
  const startWordGame = () => {
    setWordGameActive(true)
    setCurrentWordIndex(0)
    setWordScore(0)
  }

  const handleWordAnswer = (optionIndex: number) => {
    const currentPair = wordPairs[currentWordIndex]
    if (optionIndex === currentPair.correct) {
      setWordScore(wordScore + 1)
    }

    if (currentWordIndex < wordPairs.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1)
    } else {
      // Game finished
      const points = wordScore * 30
      updateUserAura(points)
      alert(`Game finished! You got ${wordScore}/${wordPairs.length} correct and earned ${points} AURA points!`)
      setWordGameActive(false)
      setSelectedGame(null)
    }
  }

  // Test Game Functions
  const startAptitudeTest = () => {
    const shuffledQuestions = [...aptitudeQuestions].sort(() => Math.random() - 0.5)
    setTestQuestions(shuffledQuestions)
    setCurrentQuestionIndex(0)
    setTestScore(0)
    setTestTimeLeft(6000) // 100 minutes
    setTestGameActive(true)
    setSelectedAnswer(null)
    setShowExplanation(false)
  }

  const startCompetitiveTest = () => {
    // Filter out already used questions
    const availableQuestions = competitiveQuestions.filter((_, index) => !usedQuestions.includes(index))

    if (availableQuestions.length === 0) {
      alert("Game Finished! All questions have been completed.")
      return
    }

    const questionsToUse = availableQuestions.slice(0, Math.min(20, availableQuestions.length))
    setTestQuestions(questionsToUse)
    setCurrentQuestionIndex(0)
    setTestScore(0)
    setTestTimeLeft(1200) // 20 minutes
    setTestGameActive(true)
    setSelectedAnswer(null)
    setShowExplanation(false)
  }

  const handleTestAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    const currentQuestion = testQuestions[currentQuestionIndex]

    if (answerIndex === currentQuestion.correct) {
      setTestScore(testScore + 1)
    }

    if (selectedGame === "competitive") {
      setShowExplanation(true)
      setTimeout(() => {
        nextTestQuestion()
      }, 3000)
    } else {
      setTimeout(() => {
        nextTestQuestion()
      }, 1000)
    }
  }

  const nextTestQuestion = () => {
    if (currentQuestionIndex < testQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      endTestGame()
    }
  }

  const endTestGame = () => {
    setTestGameActive(false)
    const points = testScore * 20
    updateUserAura(points)

    if (selectedGame === "competitive") {
      // Mark questions as used
      const questionIndices = testQuestions.map((q) => competitiveQuestions.indexOf(q))
      setUsedQuestions([...usedQuestions, ...questionIndices])
    }

    const gameType = selectedGame === "aptitude" ? "Aptitude Test" : "Competitive Test"
    alert(
      `${gameType} completed! You got ${testScore}/${testQuestions.length} correct and earned ${points} AURA points!`,
    )
    setSelectedGame(null)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const renderGameContent = () => {
    switch (selectedGame) {
      case "memory":
        if (!gameStarted) {
          return (
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4 text-white">Memory Challenge</h3>
              <p className="text-gray-300 mb-6">Remember the sequence and repeat it!</p>
              <button
                onClick={startMemoryGame}
                className="premium-gradient text-white px-8 py-3 rounded-lg font-semibold hover-lift"
              >
                Start Game
              </button>
            </div>
          )
        }

        return (
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 text-white">Level {level}</h3>
            <p className="text-gray-300 mb-4">Score: {score}</p>
            <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto mb-6">
              {[0, 1, 2, 3].map((num) => (
                <button
                  key={num}
                  id={`memory-btn-${num}`}
                  onClick={() => handleMemoryClick(num)}
                  className="w-20 h-20 bg-gray-800 rounded-lg border-2 border-gray-600 hover:border-blue-500 transition-all"
                  disabled={isShowing}
                />
              ))}
            </div>
            <p className="text-gray-400">{isShowing ? "Watch the sequence..." : "Repeat the sequence!"}</p>
          </div>
        )

      case "reaction":
        return (
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 text-white">Reaction Time Test</h3>
            {!reactionStarted && !reactionTime ? (
              <div>
                <p className="text-gray-300 mb-6">Click the button as soon as it turns green!</p>
                <button
                  onClick={startReactionGame}
                  className="premium-gradient text-white px-8 py-3 rounded-lg font-semibold hover-lift"
                >
                  Start Test
                </button>
              </div>
            ) : reactionTime ? (
              <div>
                <p className="text-2xl text-green-400 mb-4">{reactionTime}ms</p>
                <p className="text-gray-300">Great reflexes!</p>
              </div>
            ) : (
              <div>
                <p className="text-gray-300 mb-6">Wait for green...</p>
                <button
                  onClick={handleReactionClick}
                  className={`w-32 h-32 rounded-full text-white font-bold text-xl transition-all ${
                    showGreen ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {showGreen ? "CLICK!" : "WAIT..."}
                </button>
              </div>
            )}
          </div>
        )

      case "math":
        if (!mathGameActive) {
          return (
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4 text-white">Quick Math</h3>
              <p className="text-gray-300 mb-6">Solve as many problems as you can in 60 seconds!</p>
              <button
                onClick={startMathGame}
                className="premium-gradient text-white px-8 py-3 rounded-lg font-semibold hover-lift"
              >
                Start Game
              </button>
            </div>
          )
        }

        return (
          <div className="text-center">
            <div className="flex justify-between items-center mb-6">
              <span className="text-white">Score: {mathScore}</span>
              <span className="text-white">Time: {mathTimeLeft}s</span>
            </div>
            {mathProblem && (
              <div>
                <h3 className="text-3xl font-bold mb-6 text-white">{mathProblem.question} = ?</h3>
                <input
                  type="number"
                  value={mathAnswer}
                  onChange={(e) => setMathAnswer(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && submitMathAnswer()}
                  className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white text-center text-xl mb-4"
                  placeholder="Your answer"
                  autoFocus
                />
                <br />
                <button
                  onClick={submitMathAnswer}
                  className="premium-gradient text-white px-6 py-2 rounded-lg font-semibold"
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        )

      case "word":
        if (!wordGameActive) {
          return (
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4 text-white">Word Association</h3>
              <p className="text-gray-300 mb-6">Choose the word that best relates to the given word!</p>
              <button
                onClick={startWordGame}
                className="premium-gradient text-white px-8 py-3 rounded-lg font-semibold hover-lift"
              >
                Start Game
              </button>
            </div>
          )
        }

        const currentPair = wordPairs[currentWordIndex]
        return (
          <div className="text-center">
            <div className="mb-6">
              <span className="text-gray-400">
                Question {currentWordIndex + 1} of {wordPairs.length}
              </span>
              <span className="text-white ml-4">Score: {wordScore}</span>
            </div>
            <h3 className="text-3xl font-bold mb-8 text-white">{currentPair.word}</h3>
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              {currentPair.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleWordAnswer(index)}
                  className="bg-gray-800 border border-gray-600 text-white py-3 px-4 rounded-lg hover:border-blue-500 transition-all"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )

      case "aptitude":
      case "competitive":
        if (!testGameActive) {
          const isAptitude = selectedGame === "aptitude"
          return (
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4 text-white">
                {isAptitude ? "Aptitude Test" : "Competitive Test"}
              </h3>
              <p className="text-gray-300 mb-6">
                {isAptitude
                  ? "100 questions covering Geography, Math, English, Logic & Sports"
                  : "20 JEE/NEET level questions - Physics, Chemistry, Math & Biology"}
              </p>
              <div className="bg-gray-800 rounded-lg p-4 mb-6 max-w-md mx-auto">
                <p className="text-white mb-2">
                  <strong>Time:</strong> {isAptitude ? "100 minutes" : "20 minutes"}
                </p>
                <p className="text-white mb-2">
                  <strong>Questions:</strong> {isAptitude ? "100" : "20"}
                </p>
                <p className="text-white">
                  <strong>Scoring:</strong> +20 AURA per correct answer
                </p>
              </div>
              <button
                onClick={isAptitude ? startAptitudeTest : startCompetitiveTest}
                className="premium-gradient text-white px-8 py-3 rounded-lg font-semibold hover-lift"
              >
                Start Test
              </button>
            </div>
          )
        }

        const currentQuestion = testQuestions[currentQuestionIndex]
        if (!currentQuestion) return null

        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-white">
                Question {currentQuestionIndex + 1} of {testQuestions.length}
              </span>
              <span className="text-white">Time: {formatTime(testTimeLeft)}</span>
              <span className="text-white">Score: {testScore}</span>
            </div>

            <div className="bg-gray-800 rounded-lg p-4 mb-4">
              <span className="text-blue-400 text-sm font-semibold">{currentQuestion.category}</span>
            </div>

            <h3 className="text-xl font-semibold mb-6 text-white leading-relaxed">{currentQuestion.question}</h3>

            <div className="space-y-3 mb-6">
              {currentQuestion.options.map((option: string, index: number) => (
                <button
                  key={index}
                  onClick={() => handleTestAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedAnswer === null
                      ? "bg-gray-800 border-gray-600 hover:border-blue-500 text-white"
                      : selectedAnswer === index
                        ? index === currentQuestion.correct
                          ? "bg-green-900 border-green-500 text-green-100"
                          : "bg-red-900 border-red-500 text-red-100"
                        : index === currentQuestion.correct
                          ? "bg-green-900 border-green-500 text-green-100"
                          : "bg-gray-800 border-gray-600 text-gray-400"
                  }`}
                >
                  <span className="font-semibold mr-3">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </button>
              ))}
            </div>

            {showExplanation && currentQuestion.explanation && (
              <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4 mb-4">
                <h4 className="text-blue-400 font-semibold mb-2">Explanation:</h4>
                <p className="text-blue-100">{currentQuestion.explanation}</p>
              </div>
            )}

            {selectedAnswer !== null && (
              <div className="text-center">
                <p className="text-gray-300">
                  {selectedAnswer === currentQuestion.correct ? "Correct! +20 AURA" : "Incorrect! +0 AURA"}
                </p>
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  if (selectedGame) {
    return (
      <div className="pt-20 min-h-screen bg-black">
        <div className="max-w-4xl mx-auto p-6">
          <div className="flex items-center mb-8">
            <button
              onClick={() => setSelectedGame(null)}
              className="text-gray-400 hover:text-white transition-colors mr-4"
            >
              ← Back to Games
            </button>
            <h2 className="text-3xl font-bold text-gradient">Game Hub</h2>
          </div>

          <div className="glass-effect rounded-2xl p-8">{renderGameContent()}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 min-h-screen bg-black">
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gradient mb-4">Game Hub</h2>
          <p className="text-xl text-gray-300">Challenge yourself and earn AURA points!</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <div
              key={game.id}
              className="glass-effect rounded-2xl p-6 hover-lift cursor-pointer transition-all duration-300"
              onClick={() => setSelectedGame(game.id)}
            >
              <div className="text-center">
                <div className="text-4xl mb-4">{game.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{game.title}</h3>
                <p className="text-gray-400 mb-4">{game.description}</p>

                <div className="flex justify-between items-center mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      game.difficulty === "Easy"
                        ? "bg-green-900 text-green-300"
                        : game.difficulty === "Medium"
                          ? "bg-yellow-900 text-yellow-300"
                          : game.difficulty === "Hard"
                            ? "bg-orange-900 text-orange-300"
                            : "bg-red-900 text-red-300"
                    }`}
                  >
                    {game.difficulty}
                  </span>
                  <span className="text-blue-400 font-semibold">Max: {game.maxAura} AURA</span>
                </div>

                <button className="w-full premium-gradient text-white py-2 rounded-lg font-semibold transition-all duration-300 hover-lift">
                  Play Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="glass-effect rounded-2xl p-6 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Your Gaming Stats</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-3xl font-bold text-gradient">{user?.auraScore || 0}</p>
                <p className="text-gray-400">Total AURA</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gradient">{user?.level || 1}</p>
                <p className="text-gray-400">Current Level</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

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

interface Question {
  id: number
  question: string
  options: string[]
  correct: number
  category?: string
  explanation?: string
}

// Aptitude Test Questions (100 questions)
const aptitudeQuestions: Question[] = [
  // Geography (20 questions)
  {
    id: 1,
    question: "Which is the longest river in India?",
    options: ["Yamuna", "Ganga", "Godavari", "Krishna"],
    correct: 1,
    category: "Geography",
  },
  {
    id: 2,
    question: "The capital of Rajasthan is:",
    options: ["Jodhpur", "Udaipur", "Jaipur", "Kota"],
    correct: 2,
    category: "Geography",
  },
  {
    id: 3,
    question: "Which state is known as the 'Land of Five Rivers'?",
    options: ["Haryana", "Punjab", "Uttar Pradesh", "Bihar"],
    correct: 1,
    category: "Geography",
  },
  {
    id: 4,
    question: "The highest peak in India is:",
    options: ["K2", "Kanchenjunga", "Nanda Devi", "Mount Everest"],
    correct: 1,
    category: "Geography",
  },
  {
    id: 5,
    question: "Which city is known as the 'Silicon Valley of India'?",
    options: ["Hyderabad", "Pune", "Chennai", "Bangalore"],
    correct: 3,
    category: "Geography",
  },
  {
    id: 6,
    question: "The Thar Desert is located in which state?",
    options: ["Gujarat", "Rajasthan", "Haryana", "Punjab"],
    correct: 1,
    category: "Geography",
  },
  {
    id: 7,
    question: "Which is the smallest state in India by area?",
    options: ["Sikkim", "Tripura", "Goa", "Manipur"],
    correct: 2,
    category: "Geography",
  },
  {
    id: 8,
    question: "The Western Ghats run parallel to which coast?",
    options: ["Eastern Coast", "Western Coast", "Northern Coast", "Southern Coast"],
    correct: 1,
    category: "Geography",
  },
  {
    id: 9,
    question: "Which river is known as the 'Sorrow of Bengal'?",
    options: ["Ganga", "Brahmaputra", "Damodar", "Hooghly"],
    correct: 2,
    category: "Geography",
  },
  {
    id: 10,
    question: "The Sundarbans are located in which state?",
    options: ["Odisha", "West Bengal", "Assam", "Bihar"],
    correct: 1,
    category: "Geography",
  },
  {
    id: 11,
    question: "Which is the largest state in India by area?",
    options: ["Madhya Pradesh", "Uttar Pradesh", "Rajasthan", "Maharashtra"],
    correct: 2,
    category: "Geography",
  },
  {
    id: 12,
    question: "The Nilgiri Hills are located in which state?",
    options: ["Kerala", "Karnataka", "Tamil Nadu", "Andhra Pradesh"],
    correct: 2,
    category: "Geography",
  },
  {
    id: 13,
    question: "Which city is the capital of Himachal Pradesh?",
    options: ["Manali", "Shimla", "Dharamshala", "Kullu"],
    correct: 1,
    category: "Geography",
  },
  {
    id: 14,
    question: "The Deccan Plateau covers which part of India?",
    options: ["Northern", "Southern", "Eastern", "Western"],
    correct: 1,
    category: "Geography",
  },
  {
    id: 15,
    question: "Which is the largest freshwater lake in India?",
    options: ["Dal Lake", "Chilika Lake", "Wular Lake", "Loktak Lake"],
    correct: 2,
    category: "Geography",
  },
  {
    id: 16,
    question: "The Konkan Coast is located along which state?",
    options: ["Gujarat", "Maharashtra", "Karnataka", "Kerala"],
    correct: 1,
    category: "Geography",
  },
  {
    id: 17,
    question: "Which mountain range separates India from China?",
    options: ["Himalayas", "Karakoram", "Aravalli", "Vindhya"],
    correct: 0,
    category: "Geography",
  },
  {
    id: 18,
    question: "The Coromandel Coast is located on which side of India?",
    options: ["Western", "Eastern", "Northern", "Southern"],
    correct: 1,
    category: "Geography",
  },
  {
    id: 19,
    question: "Which is the southernmost point of India?",
    options: ["Kanyakumari", "Indira Point", "Rameshwaram", "Thiruvananthapuram"],
    correct: 1,
    category: "Geography",
  },
  {
    id: 20,
    question: "The Lakshadweep Islands are located in which sea?",
    options: ["Bay of Bengal", "Arabian Sea", "Indian Ocean", "Andaman Sea"],
    correct: 1,
    category: "Geography",
  },

  // Mathematics (20 questions)
  {
    id: 21,
    question: "What is 15% of 200?",
    options: ["25", "30", "35", "40"],
    correct: 1,
    category: "Mathematics",
  },
  {
    id: 22,
    question: "If a train travels 60 km in 45 minutes, what is its speed in km/hr?",
    options: ["75", "80", "85", "90"],
    correct: 1,
    category: "Mathematics",
  },
  {
    id: 23,
    question: "The sum of angles in a triangle is:",
    options: ["90°", "180°", "270°", "360°"],
    correct: 1,
    category: "Mathematics",
  },
  {
    id: 24,
    question: "What is the square root of 144?",
    options: ["11", "12", "13", "14"],
    correct: 1,
    category: "Mathematics",
  },
  {
    id: 25,
    question: "If 3x + 5 = 20, what is the value of x?",
    options: ["3", "4", "5", "6"],
    correct: 2,
    category: "Mathematics",
  },
  {
    id: 26,
    question: "The area of a circle with radius 7 cm is (π = 22/7):",
    options: ["154 cm²", "144 cm²", "164 cm²", "174 cm²"],
    correct: 0,
    category: "Mathematics",
  },
  {
    id: 27,
    question: "What is 2³ × 3²?",
    options: ["72", "64", "81", "54"],
    correct: 0,
    category: "Mathematics",
  },
  {
    id: 28,
    question: "The LCM of 12 and 18 is:",
    options: ["36", "54", "72", "108"],
    correct: 0,
    category: "Mathematics",
  },
  {
    id: 29,
    question: "If the cost price is ₹800 and selling price is ₹1000, the profit percentage is:",
    options: ["20%", "25%", "30%", "35%"],
    correct: 1,
    category: "Mathematics",
  },
  {
    id: 30,
    question: "The next number in the series 2, 6, 12, 20, 30, ? is:",
    options: ["40", "42", "44", "46"],
    correct: 1,
    category: "Mathematics",
  },
  {
    id: 31,
    question: "What is the compound interest on ₹1000 for 2 years at 10% per annum?",
    options: ["₹200", "₹210", "₹220", "₹230"],
    correct: 1,
    category: "Mathematics",
  },
  {
    id: 32,
    question: "The perimeter of a rectangle with length 8 cm and breadth 6 cm is:",
    options: ["28 cm", "30 cm", "32 cm", "34 cm"],
    correct: 0,
    category: "Mathematics",
  },
  {
    id: 33,
    question: "If 40% of a number is 80, what is the number?",
    options: ["160", "180", "200", "220"],
    correct: 2,
    category: "Mathematics",
  },
  {
    id: 34,
    question: "The value of sin 30° is:",
    options: ["1/2", "√3/2", "1", "0"],
    correct: 0,
    category: "Mathematics",
  },
  {
    id: 35,
    question: "What is the median of 3, 7, 2, 9, 5?",
    options: ["3", "5", "7", "9"],
    correct: 1,
    category: "Mathematics",
  },
  {
    id: 36,
    question: "The HCF of 24 and 36 is:",
    options: ["6", "8", "12", "18"],
    correct: 2,
    category: "Mathematics",
  },
  {
    id: 37,
    question: "If log₁₀ 100 = x, then x equals:",
    options: ["1", "2", "10", "100"],
    correct: 1,
    category: "Mathematics",
  },
  {
    id: 38,
    question: "The volume of a cube with side 4 cm is:",
    options: ["16 cm³", "32 cm³", "48 cm³", "64 cm³"],
    correct: 3,
    category: "Mathematics",
  },
  {
    id: 39,
    question: "What is 0.75 expressed as a fraction?",
    options: ["3/4", "2/3", "4/5", "5/6"],
    correct: 0,
    category: "Mathematics",
  },
  {
    id: 40,
    question: "The sum of first 10 natural numbers is:",
    options: ["45", "50", "55", "60"],
    correct: 2,
    category: "Mathematics",
  },

  // English (20 questions)
  {
    id: 41,
    question: "Choose the correct synonym for 'Abundant':",
    options: ["Scarce", "Plentiful", "Limited", "Rare"],
    correct: 1,
    category: "English",
  },
  {
    id: 42,
    question: "What is the past tense of 'Go'?",
    options: ["Goed", "Gone", "Went", "Going"],
    correct: 2,
    category: "English",
  },
  {
    id: 43,
    question: "Choose the correct antonym for 'Ancient':",
    options: ["Old", "Modern", "Historic", "Traditional"],
    correct: 1,
    category: "English",
  },
  {
    id: 44,
    question: "Which is the correct spelling?",
    options: ["Recieve", "Receive", "Receve", "Receeve"],
    correct: 1,
    category: "English",
  },
  {
    id: 45,
    question: "The plural of 'Child' is:",
    options: ["Childs", "Children", "Childes", "Childern"],
    correct: 1,
    category: "English",
  },
  {
    id: 46,
    question: "Choose the correct sentence:",
    options: ["He don't like cricket", "He doesn't likes cricket", "He doesn't like cricket", "He not like cricket"],
    correct: 2,
    category: "English",
  },
  {
    id: 47,
    question: "What type of word is 'Beautiful'?",
    options: ["Noun", "Verb", "Adjective", "Adverb"],
    correct: 2,
    category: "English",
  },
  {
    id: 48,
    question: "The opposite of 'Expand' is:",
    options: ["Contract", "Extend", "Enlarge", "Increase"],
    correct: 0,
    category: "English",
  },
  {
    id: 49,
    question: "Choose the correct preposition: 'He is good ___ mathematics'",
    options: ["in", "at", "on", "with"],
    correct: 1,
    category: "English",
  },
  {
    id: 50,
    question: "The comparative form of 'Good' is:",
    options: ["Gooder", "More good", "Better", "Best"],
    correct: 2,
    category: "English",
  },
  {
    id: 51,
    question: "Which is a collective noun?",
    options: ["Book", "Team", "Run", "Happy"],
    correct: 1,
    category: "English",
  },
  {
    id: 52,
    question: "The past participle of 'Write' is:",
    options: ["Wrote", "Written", "Writing", "Writes"],
    correct: 1,
    category: "English",
  },
  {
    id: 53,
    question: "Choose the correct article: '___ honest man'",
    options: ["A", "An", "The", "No article"],
    correct: 1,
    category: "English",
  },
  {
    id: 54,
    question: "What is the meaning of 'Procrastinate'?",
    options: ["To hurry", "To delay", "To complete", "To start"],
    correct: 1,
    category: "English",
  },
  {
    id: 55,
    question: "The superlative form of 'Far' is:",
    options: ["Farer", "Farther", "Farthest", "Most far"],
    correct: 2,
    category: "English",
  },
  {
    id: 56,
    question: "Choose the correct passive voice: 'She writes a letter'",
    options: [
      "A letter is written by her",
      "A letter was written by her",
      "A letter is being written by her",
      "A letter has been written by her",
    ],
    correct: 0,
    category: "English",
  },
  {
    id: 57,
    question: "What is the meaning of the idiom 'Break the ice'?",
    options: ["To be very cold", "To start a conversation", "To break something", "To be angry"],
    correct: 1,
    category: "English",
  },
  {
    id: 58,
    question: "The feminine form of 'Hero' is:",
    options: ["Heroine", "Heroess", "Heroina", "Heroe"],
    correct: 0,
    category: "English",
  },
  {
    id: 59,
    question: "Choose the correct conjunction: 'He is poor ___ honest'",
    options: ["and", "but", "or", "so"],
    correct: 1,
    category: "English",
  },
  {
    id: 60,
    question: "What type of sentence is 'What a beautiful day!'?",
    options: ["Declarative", "Interrogative", "Imperative", "Exclamatory"],
    correct: 3,
    category: "English",
  },

  // Logical Reasoning (20 questions)
  {
    id: 61,
    question: "If all roses are flowers and some flowers are red, then:",
    options: ["All roses are red", "Some roses are red", "No roses are red", "Cannot be determined"],
    correct: 3,
    category: "Logical Reasoning",
  },
  {
    id: 62,
    question: "Complete the series: 1, 4, 9, 16, 25, ?",
    options: ["30", "35", "36", "49"],
    correct: 2,
    category: "Logical Reasoning",
  },
  {
    id: 63,
    question: "If CODING is written as DPEJOH, how is FLOWER written?",
    options: ["GMPXFS", "GMPXFR", "GKNVDQ", "HMPXFS"],
    correct: 0,
    category: "Logical Reasoning",
  },
  {
    id: 64,
    question: "Find the odd one out:",
    options: ["Triangle", "Square", "Circle", "Rectangle"],
    correct: 2,
    category: "Logical Reasoning",
  },
  {
    id: 65,
    question: "If Monday is the 1st day, what day is the 15th?",
    options: ["Sunday", "Monday", "Tuesday", "Wednesday"],
    correct: 1,
    category: "Logical Reasoning",
  },
  {
    id: 66,
    question: "Complete: 2, 6, 12, 20, 30, ?",
    options: ["40", "42", "44", "46"],
    correct: 1,
    category: "Logical Reasoning",
  },
  {
    id: 67,
    question: "If A = 1, B = 2, C = 3, then CAB = ?",
    options: ["312", "321", "123", "132"],
    correct: 0,
    category: "Logical Reasoning",
  },
  {
    id: 68,
    question: "Which number comes next: 1, 1, 2, 3, 5, 8, ?",
    options: ["11", "13", "15", "17"],
    correct: 1,
    category: "Logical Reasoning",
  },
  {
    id: 69,
    question: "If all cats are animals and some animals are pets, then:",
    options: ["All cats are pets", "Some cats are pets", "No cats are pets", "Cannot be determined"],
    correct: 3,
    category: "Logical Reasoning",
  },
  {
    id: 70,
    question: "Find the missing number: 3, 7, 15, 31, ?",
    options: ["63", "65", "67", "69"],
    correct: 0,
    category: "Logical Reasoning",
  },
  {
    id: 71,
    question: "If EARTH is coded as 51234, how is HEART coded?",
    options: ["35124", "45123", "35142", "45132"],
    correct: 0,
    category: "Logical Reasoning",
  },
  {
    id: 72,
    question: "Which is different from others?",
    options: ["Mango", "Apple", "Orange", "Potato"],
    correct: 3,
    category: "Logical Reasoning",
  },
  {
    id: 73,
    question: "Complete the analogy: Book : Pages :: Tree : ?",
    options: ["Leaves", "Branches", "Roots", "Trunk"],
    correct: 0,
    category: "Logical Reasoning",
  },
  {
    id: 74,
    question: "If today is Wednesday, what day will it be after 100 days?",
    options: ["Monday", "Tuesday", "Wednesday", "Thursday"],
    correct: 1,
    category: "Logical Reasoning",
  },
  {
    id: 75,
    question: "Find the next term: AZ, BY, CX, ?",
    options: ["DW", "DV", "EW", "EV"],
    correct: 0,
    category: "Logical Reasoning",
  },
  {
    id: 76,
    question: "If 5 + 3 = 28, 9 + 1 = 810, then 8 + 6 = ?",
    options: ["214", "142", "412", "241"],
    correct: 0,
    category: "Logical Reasoning",
  },
  {
    id: 77,
    question: "Which number is the odd one out: 2, 5, 10, 17, 26, 37?",
    options: ["2", "5", "10", "26"],
    correct: 2,
    category: "Logical Reasoning",
  },
  {
    id: 78,
    question: "Complete: Monday, Wednesday, Friday, ?",
    options: ["Saturday", "Sunday", "Tuesday", "Thursday"],
    correct: 1,
    category: "Logical Reasoning",
  },
  {
    id: 79,
    question: "If FRIEND is coded as GSJFOE, how is MOTHER coded?",
    options: ["NPUIFS", "NPUIFS", "OPUIFS", "NQVIFS"],
    correct: 1,
    category: "Logical Reasoning",
  },
  {
    id: 80,
    question: "Find the missing number in: 2, 8, 18, 32, ?",
    options: ["48", "50", "52", "54"],
    correct: 1,
    category: "Logical Reasoning",
  },

  // Sports (20 questions)
  {
    id: 81,
    question: "Who is known as the 'Captain Cool' in Indian cricket?",
    options: ["Virat Kohli", "Rohit Sharma", "MS Dhoni", "Sourav Ganguly"],
    correct: 2,
    category: "Sports",
  },
  {
    id: 82,
    question: "In which year did India win the Cricket World Cup for the first time?",
    options: ["1975", "1983", "1987", "1992"],
    correct: 1,
    category: "Sports",
  },
  {
    id: 83,
    question: "Who is the first Indian to win an individual Olympic gold medal?",
    options: ["Abhinav Bindra", "Rajyavardhan Singh Rathore", "Sushil Kumar", "Vijender Singh"],
    correct: 0,
    category: "Sports",
  },
  {
    id: 84,
    question: "The national sport of India is:",
    options: ["Cricket", "Hockey", "Football", "Kabaddi"],
    correct: 1,
    category: "Sports",
  },
  {
    id: 85,
    question: "Who is known as the 'Flying Sikh'?",
    options: ["Milkha Singh", "Fauja Singh", "Gurbachan Singh", "Joginder Singh"],
    correct: 0,
    category: "Sports",
  },
  {
    id: 86,
    question: "The Eden Gardens cricket stadium is located in:",
    options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
    correct: 2,
    category: "Sports",
  },
  {
    id: 87,
    question: "Who holds the record for the highest individual score in Test cricket?",
    options: ["Brian Lara", "Matthew Hayden", "Virender Sehwag", "Don Bradman"],
    correct: 0,
    category: "Sports",
  },
  {
    id: 88,
    question: "The Indian Premier League (IPL) was started in which year?",
    options: ["2007", "2008", "2009", "2010"],
    correct: 1,
    category: "Sports",
  },
  {
    id: 89,
    question: "Who is the first Indian woman to win an Olympic medal?",
    options: ["PT Usha", "Karnam Malleswari", "Mary Kom", "Saina Nehwal"],
    correct: 1,
    category: "Sports",
  },
  {
    id: 90,
    question: "The Ranji Trophy is associated with which sport?",
    options: ["Hockey", "Football", "Cricket", "Badminton"],
    correct: 2,
    category: "Sports",
  },
  {
    id: 91,
    question: "Who is known as the 'Wall' in Indian cricket?",
    options: ["Sachin Tendulkar", "Rahul Dravid", "VVS Laxman", "Anil Kumble"],
    correct: 1,
    category: "Sports",
  },
  {
    id: 92,
    question: "The Commonwealth Games 2010 were held in which Indian city?",
    options: ["Mumbai", "Bangalore", "New Delhi", "Pune"],
    correct: 2,
    category: "Sports",
  },
  {
    id: 93,
    question: "Who is the most successful captain in Indian cricket history?",
    options: ["Kapil Dev", "Sourav Ganguly", "MS Dhoni", "Virat Kohli"],
    correct: 2,
    category: "Sports",
  },
  {
    id: 94,
    question: "The Santosh Trophy is related to which sport?",
    options: ["Cricket", "Hockey", "Football", "Basketball"],
    correct: 2,
    category: "Sports",
  },
  {
    id: 95,
    question: "Who was the first Indian to reach the finals of All England Badminton Championship?",
    options: ["Prakash Padukone", "Pullela Gopichand", "Saina Nehwal", "PV Sindhu"],
    correct: 0,
    category: "Sports",
  },
  {
    id: 96,
    question: "The Dronacharya Award is given for excellence in:",
    options: ["Sports performance", "Sports coaching", "Sports journalism", "Sports administration"],
    correct: 1,
    category: "Sports",
  },
  {
    id: 97,
    question: "Who is the first Indian to win the World Badminton Championship?",
    options: ["Saina Nehwal", "PV Sindhu", "Prakash Padukone", "Pullela Gopichand"],
    correct: 1,
    category: "Sports",
  },
  {
    id: 98,
    question: "The Durand Cup is associated with which sport?",
    options: ["Cricket", "Hockey", "Football", "Tennis"],
    correct: 2,
    category: "Sports",
  },
  {
    id: 99,
    question: "Who holds the record for most runs in IPL?",
    options: ["MS Dhoni", "Rohit Sharma", "Virat Kohli", "Suresh Raina"],
    correct: 2,
    category: "Sports",
  },
  {
    id: 100,
    question: "The Khel Ratna Award was renamed after which sports personality?",
    options: ["Dhyan Chand", "Milkha Singh", "PT Usha", "Kapil Dev"],
    correct: 0,
    category: "Sports",
  },
]

// Competitive Test Questions (JEE/NEET)
const competitiveQuestions: Question[] = [
  // Physics
  {
    id: 1,
    question: "The dimensional formula for angular momentum is:",
    options: ["[ML²T⁻¹]", "[MLT⁻¹]", "[ML²T⁻²]", "[MLT⁻²]"],
    correct: 0,
    category: "Physics",
    explanation: "Angular momentum = mvr, so [M][LT⁻¹][L] = [ML²T⁻¹]",
  },
  {
    id: 2,
    question:
      "A particle moves in a circle of radius R. The ratio of distance to displacement after half revolution is:",
    options: ["π:2", "2:π", "π:1", "1:π"],
    correct: 0,
    category: "Physics",
    explanation: "Distance = πR (semicircle), Displacement = 2R (diameter)",
  },
  {
    id: 3,
    question: "The escape velocity from Earth's surface is approximately:",
    options: ["7.9 km/s", "11.2 km/s", "15.0 km/s", "25.0 km/s"],
    correct: 1,
    category: "Physics",
    explanation: "Escape velocity = √(2GM/R) ≈ 11.2 km/s for Earth",
  },
  {
    id: 4,
    question: "In photoelectric effect, the stopping potential depends on:",
    options: [
      "Intensity of light",
      "Frequency of light",
      "Both intensity and frequency",
      "Neither intensity nor frequency",
    ],
    correct: 1,
    category: "Physics",
    explanation: "Stopping potential depends only on frequency: eV₀ = hf - φ",
  },
  {
    id: 5,
    question: "The SI unit of magnetic flux is:",
    options: ["Tesla", "Weber", "Henry", "Gauss"],
    correct: 1,
    category: "Physics",
    explanation: "Magnetic flux is measured in Weber (Wb) = Tesla × meter²",
  },

  // Chemistry
  {
    id: 6,
    question: "The IUPAC name of CH₃-CH(CH₃)-CH₂-CH₃ is:",
    options: ["2-methylbutane", "3-methylbutane", "2-methylpentane", "Isopentane"],
    correct: 0,
    category: "Chemistry",
    explanation: "Longest chain has 4 carbons (butane) with methyl at position 2",
  },
  {
    id: 7,
    question: "Which of the following has the highest bond dissociation energy?",
    options: ["F-F", "Cl-Cl", "Br-Br", "I-I"],
    correct: 1,
    category: "Chemistry",
    explanation: "Cl-Cl has optimal size for maximum orbital overlap",
  },
  {
    id: 8,
    question: "The hybridization of carbon in diamond is:",
    options: ["sp", "sp²", "sp³", "sp³d"],
    correct: 2,
    category: "Chemistry",
    explanation: "Each carbon in diamond forms 4 sigma bonds (tetrahedral, sp³)",
  },
  {
    id: 9,
    question: "Which quantum number determines the shape of orbital?",
    options: ["Principal (n)", "Azimuthal (l)", "Magnetic (m)", "Spin (s)"],
    correct: 1,
    category: "Chemistry",
    explanation: "Azimuthal quantum number (l) determines orbital shape",
  },
  {
    id: 10,
    question: "The pH of 0.01 M HCl solution is:",
    options: ["1", "2", "0.01", "12"],
    correct: 1,
    category: "Chemistry",
    explanation: "pH = -log[H⁺] = -log(0.01) = -log(10⁻²) = 2",
  },

  // Mathematics
  {
    id: 11,
    question: "The derivative of sin⁻¹x is:",
    options: ["1/√(1-x²)", "-1/√(1-x²)", "1/(1+x²)", "-1/(1+x²)"],
    correct: 0,
    category: "Mathematics",
    explanation: "d/dx(sin⁻¹x) = 1/√(1-x²)",
  },
  {
    id: 12,
    question: "The value of ∫₀^π sin x dx is:",
    options: ["0", "1", "2", "π"],
    correct: 2,
    category: "Mathematics",
    explanation: "∫₀^π sin x dx = [-cos x]₀^π = -cos π + cos 0 = 1 + 1 = 2",
  },
  {
    id: 13,
    question: "If |z| = 1, then |z - 1/z̄| equals:",
    options: ["0", "1", "2", "Cannot be determined"],
    correct: 0,
    category: "Mathematics",
    explanation: "If |z| = 1, then z̄ = 1/z, so z - 1/z̄ = z - z = 0",
  },
  {
    id: 14,
    question: "The number of ways to arrange letters of MATHEMATICS is:",
    options: ["11!/2!2!", "11!/2!2!2!", "11!/2!", "11!"],
    correct: 1,
    category: "Mathematics",
    explanation: "MATHEMATICS has 11 letters with M(2), A(2), T(2) repeated",
  },
  {
    id: 15,
    question: "The equation of tangent to y = x² at point (1,1) is:",
    options: ["y = 2x - 1", "y = x + 1", "y = 2x + 1", "y = x - 1"],
    correct: 0,
    category: "Mathematics",
    explanation: "dy/dx = 2x, at (1,1): slope = 2, equation: y - 1 = 2(x - 1)",
  },

  // Biology
  {
    id: 16,
    question: "The powerhouse of the cell is:",
    options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi apparatus"],
    correct: 2,
    category: "Biology",
    explanation: "Mitochondria produces ATP through cellular respiration",
  },
  {
    id: 17,
    question: "DNA replication occurs during which phase?",
    options: ["G1 phase", "S phase", "G2 phase", "M phase"],
    correct: 1,
    category: "Biology",
    explanation: "DNA synthesis (replication) occurs during S phase",
  },
  {
    id: 18,
    question: "The functional unit of kidney is:",
    options: ["Neuron", "Nephron", "Alveoli", "Villus"],
    correct: 1,
    category: "Biology",
    explanation: "Nephron is the basic functional unit of kidney",
  },
  {
    id: 19,
    question: "Photosynthesis occurs in which part of chloroplast?",
    options: ["Stroma", "Thylakoid", "Both stroma and thylakoid", "Outer membrane"],
    correct: 2,
    category: "Biology",
    explanation: "Light reactions in thylakoid, Calvin cycle in stroma",
  },
  {
    id: 20,
    question: "The genetic code is:",
    options: ["Overlapping", "Non-overlapping", "Ambiguous", "Non-universal"],
    correct: 1,
    category: "Biology",
    explanation: "Genetic code is non-overlapping, unambiguous, and universal",
  },
]

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
    {
      id: "aptitude",
      name: "Aptitude Test",
      description: "100 questions on Geography, Math, English, Logic & Sports",
      icon: "📚",
      difficulty: "Hard",
      maxAura: 2000,
    },
    {
      id: "competitive",
      name: "Competitive Test",
      description: "JEE/NEET level questions - Ultimate challenge",
      icon: "🎯",
      difficulty: "Expert",
      maxAura: 400,
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
        <div className="max-w-4xl mx-auto">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      game.difficulty === "Expert"
                        ? "bg-red-600 text-white"
                        : game.difficulty === "Hard"
                          ? "bg-orange-600 text-white"
                          : game.difficulty === "Medium"
                            ? "bg-yellow-600 text-black"
                            : "bg-green-600 text-white"
                    }`}
                  >
                    {game.difficulty}
                  </span>
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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [usedQuestions, setUsedQuestions] = useState<number[]>([])
  const [gameQuestions, setGameQuestions] = useState<Question[]>([])

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
    setCurrentQuestionIndex(0)
    setUsedQuestions([])

    if (game.id === "aptitude") {
      // Shuffle and select all 100 questions for aptitude test
      const shuffled = [...aptitudeQuestions].sort(() => Math.random() - 0.5)
      setGameQuestions(shuffled)
      setTimeLeft(6000) // 100 minutes for 100 questions
    } else if (game.id === "competitive") {
      // Shuffle and select all 20 questions for competitive test
      const shuffled = [...competitiveQuestions].sort(() => Math.random() - 0.5)
      setGameQuestions(shuffled)
      setTimeLeft(1200) // 20 minutes for 20 questions
    } else {
      setTimeLeft(30)
      // Initialize other games
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
    }

    // Start timer for all games
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

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowResult(true)

    const currentQuestion = gameQuestions[currentQuestionIndex]
    const isCorrect = answerIndex === currentQuestion.correct

    if (isCorrect) {
      setScore((prev) => prev + 20) // +20 AURA for correct answer
    }

    // Show result for 2 seconds, then move to next question
    setTimeout(() => {
      setShowResult(false)
      setSelectedAnswer(null)

      if (currentQuestionIndex + 1 >= gameQuestions.length) {
        // Test completed
        setGameState("finished")
      } else {
        setCurrentQuestionIndex((prev) => prev + 1)
      }
    }, 2000)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // Other game functions (memory, reaction, math, word) remain the same
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
    if (game.id === "aptitude" || game.id === "competitive") {
      if (gameQuestions.length === 0) return <div>Loading questions...</div>

      const currentQuestion = gameQuestions[currentQuestionIndex]

      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-400">
              Question {currentQuestionIndex + 1} of {gameQuestions.length}
            </span>
            <span className="text-sm text-blue-400">{currentQuestion.category}</span>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">{currentQuestion.question}</h3>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showResult && handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                    showResult
                      ? index === currentQuestion.correct
                        ? "bg-green-600 border-green-500 text-white"
                        : index === selectedAnswer
                          ? "bg-red-600 border-red-500 text-white"
                          : "bg-gray-700 border-gray-600 text-gray-300"
                      : "bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                  }`}
                >
                  <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </button>
              ))}
            </div>

            {showResult && currentQuestion.explanation && (
              <div className="mt-4 p-4 bg-blue-900 rounded-lg">
                <p className="text-blue-200 text-sm">
                  <strong>Explanation:</strong> {currentQuestion.explanation}
                </p>
              </div>
            )}
          </div>

          <div className="text-center">
            <div className="text-sm text-gray-400">
              Correct answers: {score / 20} | AURA earned: {score}
            </div>
          </div>
        </div>
      )
    }

    // Other game content remains the same
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
          <div className="text-sm text-gray-400">AURA Score</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white">
            {game.id === "aptitude" || game.id === "competitive" ? formatTime(timeLeft) : `${timeLeft}s`}
          </div>
          <div className="text-sm text-gray-400">Time Left</div>
        </div>
      </div>

      {gameState === "ready" && (
        <div className="text-center">
          <button
            onClick={startGame}
            className="premium-gradient text-white font-semibold px-8 py-4 rounded-lg text-xl hover-lift transition-all duration-300"
          >
            Start {game.name}
          </button>
          {(game.id === "aptitude" || game.id === "competitive") && (
            <div className="mt-4 text-sm text-gray-400">
              <p>• Each correct answer = +20 AURA</p>
              <p>• Wrong answers = 0 AURA</p>
              <p>• Questions won't repeat if you restart</p>
            </div>
          )}
        </div>
      )}

      {gameState === "playing" && renderGameContent()}

      {gameState === "finished" && (
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold text-white">
            {game.id === "aptitude" || game.id === "competitive" ? "Test Completed!" : "Game Over!"}
          </h3>
          {(game.id === "aptitude" || game.id === "competitive") && (
            <div className="space-y-2">
              <p className="text-xl text-gray-300">
                Correct Answers: <span className="text-green-400 font-bold">{score / 20}</span> / {gameQuestions.length}
              </p>
              <p className="text-lg text-gray-300">
                Accuracy:{" "}
                <span className="text-blue-400 font-bold">
                  {gameQuestions.length > 0 ? Math.round((score / 20 / gameQuestions.length) * 100) : 0}%
                </span>
              </p>
            </div>
          )}
          <p className="text-xl text-gray-300">
            You earned <span className="text-gradient font-bold">{score} AURA</span>!
          </p>
          <button
            onClick={() => onGameEnd(score / 2)} // Divide by 2 since we already multiply by 2 in endGame
            className="premium-gradient text-white font-semibold px-6 py-3 rounded-lg hover-lift transition-all duration-300"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  )
}

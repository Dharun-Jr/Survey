export const surveyQuestions = [
  {
    id: "q1",
    question: "How often do you receive online surveys?",
    type: "choice",
    options: ["Very often", "Sometimes", "Rarely", "Never"],
  },
  {
    id: "q2",
    question: "How often do you complete surveys when you receive them?",
    type: "choice",
    options: ["Always", "Sometimes", "Rarely", "Never"],
  },
  {
    id: "q3",
    question: "What is the main reason you stop filling surveys?",
    type: "choice",
    options: [
      "Too long",
      "Boring questions",
      "Too many personal questions",
      "No incentive",
      "Poor design",
    ],
  },
  {
    id: "q4",
    question: "How long should a survey ideally take?",
    type: "choice",
    options: [
      "Less than 2 minutes",
      "2–5 minutes",
      "5–10 minutes",
      "More than 10 minutes",
    ],
  },
  {
    id: "q5",
    question: "Do you prefer surveys with progress indicators?",
    type: "choice",
    options: ["Yes", "No", "Doesn't matter"],
  },
  {
    id: "q6",
    question: "Would rewards or points motivate you to complete surveys?",
    type: "choice",
    options: ["Yes", "No", "Maybe"],
  },
  {
    id: "q7",
    question: "How important is visually appealing survey design?",
    type: "rating",
    min: 1,
    max: 5,
  },
  {
    id: "q8",
    question: "Would a gamified survey make you more likely to complete it?",
    type: "choice",
    options: ["Yes", "No", "Maybe"],
  },
  {
    id: "q9",
    question: "At which point do you usually quit surveys?",
    type: "choice",
    options: ["Beginning", "Middle", "Near the end", "I usually complete them"],
  },
  {
    id: "q10",
    question: "What would most motivate you to complete a survey?",
    type: "choice",
    options: [
      "Rewards",
      "Interesting questions",
      "Short length",
      "Game-like experience",
    ],
  },
  {
    id: "q11",
    question: "Do you think surveys are usually too long?",
    type: "choice",
    options: ["Yes", "No", "Sometimes"],
  },
  {
    id: "q12",
    question: "Would you prefer answering one question per screen?",
    type: "choice",
    options: ["Yes", "No"],
  },
  {
    id: "q13",
    question: "Do you trust surveys that ask for personal data?",
    type: "choice",
    options: ["Yes", "No", "Depends"],
  },
  {
    id: "q14",
    question:
      "How likely are you to complete a survey if it looks interactive and fun?",
    type: "rating",
    min: 1,
    max: 5,
  },
  {
    id: "q15",
    question: "Any suggestions to make surveys more engaging?",
    type: "text",
  },
];

export const XP_PER_QUESTION = 10;

export function getLevel(xp) {
  if (xp >= 80) return 3;
  if (xp >= 40) return 2;
  return 1;
}

export function getMilestoneMessage(progress) {
  if (progress >= 1) return "🎉 Congratulations! You completed the survey!";
  if (progress >= 0.8)
    return "🔥 80% completed – well done! Just a few more questions.";
  if (progress >= 0.5) return "⭐ Great! You're halfway there!";
  if (progress >= 0.25) return "💪 Nice start! Keep going!";
  return null;
}

export const encouragementMessages = [
  "Great answer! 🎯",
  "Nice progress! 🚀",
  "Keep going! 💪",
  "You're on fire! 🔥",
  "Awesome choice! ⭐",
  "Fantastic! 🎉",
  "Well done! 👏",
];

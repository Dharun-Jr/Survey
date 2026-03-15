"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProgressBar from "./ProgressBar";
import XpCounter from "./XpCounter";
import QuestionCard from "./QuestionCard";
import Celebration from "./Celebration";
import {
  surveyQuestions,
  XP_PER_QUESTION,
  getMilestoneMessage,
  encouragementMessages,
} from "@/lib/questions";

export default function SurveyScreen({ sessionId, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [xp, setXp] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationMessage, setCelebrationMessage] = useState("");
  const [encouragement, setEncouragement] = useState(null);
  const [showXpAnimation, setShowXpAnimation] = useState(false);
  const lastMilestone = useRef(null);
  const total = surveyQuestions.length;

  const showEncouragement = useCallback(() => {
    const msg =
      encouragementMessages[
        Math.floor(Math.random() * encouragementMessages.length)
      ];
    setEncouragement(msg);
    setTimeout(() => setEncouragement(null), 1800);
  }, []);

  const handleAnswer = useCallback(
    async (answer) => {
      const question = surveyQuestions[currentIndex];

      // Save response to backend
      try {
        await fetch("/api/save-response", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            questionId: question.id,
            answer,
          }),
        });
      } catch (err) {
        console.error("Failed to save response:", err);
      }

      const newXp = xp + XP_PER_QUESTION;
      setXp(newXp);
      setShowXpAnimation(true);
      setTimeout(() => setShowXpAnimation(false), 500);

      const nextIndex = currentIndex + 1;
      const progress = nextIndex / total;

      // Show encouragement on every answer
      showEncouragement();

      // Check milestones (25%, 50%, 80%, 100%)
      const milestoneThresholds = [0.25, 0.5, 0.8, 1.0];
      let milestoneHit = null;
      for (const threshold of milestoneThresholds) {
        if (
          progress >= threshold &&
          lastMilestone.current !== threshold &&
          (lastMilestone.current === null || threshold > lastMilestone.current)
        ) {
          milestoneHit = threshold;
        }
      }

      // Every 5 questions celebration
      const isFifthQuestion = nextIndex % 5 === 0 && nextIndex < total;

      if (nextIndex >= total) {
        // Survey complete
        const milestoneMsg = getMilestoneMessage(1);
        lastMilestone.current = 1;
        setCelebrationMessage(milestoneMsg);
        setShowCelebration(true);

        try {
          await fetch("/api/complete-survey", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sessionId, xpEarned: newXp }),
          });
        } catch (err) {
          console.error("Failed to complete survey:", err);
        }

        setTimeout(() => {
          setShowCelebration(false);
          onComplete(newXp);
        }, 3000);
      } else if (milestoneHit) {
        const milestoneMsg = getMilestoneMessage(milestoneHit);
        lastMilestone.current = milestoneHit;
        setCelebrationMessage(milestoneMsg);
        setShowCelebration(true);
        setTimeout(() => {
          setShowCelebration(false);
          setCurrentIndex(nextIndex);
        }, 2800);
      } else if (isFifthQuestion) {
        setCelebrationMessage("🎯 5 more questions answered! Amazing streak!");
        setShowCelebration(true);
        setTimeout(() => {
          setShowCelebration(false);
          setCurrentIndex(nextIndex);
        }, 2800);
      } else {
        setTimeout(() => setCurrentIndex(nextIndex), 450);
      }
    },
    [currentIndex, xp, sessionId, total, onComplete, showEncouragement]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] bg-pink-600/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
        {/* Main Survey Container */}
        <div className="w-full max-w-3xl bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl flex flex-col space-y-6">
          
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold text-white/90 tracking-wide">
                Survey Quest
              </h1>
              <p className="text-sm text-white/50 mt-1">
                Question {currentIndex + 1} of {total}
              </p>
            </div>
            <XpCounter xp={xp} showAnimation={showXpAnimation} />
          </div>

          {/* Progress Bar */}
          <div className="w-full">
            <ProgressBar current={currentIndex} total={total} />
          </div>

          {/* Question Area */}
          <div className="w-full mt-4">
            <AnimatePresence mode="wait">
              <QuestionCard
                key={currentIndex}
                question={surveyQuestions[currentIndex]}
                onAnswer={handleAnswer}
              />
            </AnimatePresence>
          </div>
        </div>

        {/* Encouragement Badge */}
        <AnimatePresence>
          {encouragement && (
            <motion.div
              className="absolute top-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="bg-gradient-to-r from-emerald-400 to-green-500 text-white font-medium px-4 py-2 rounded-lg shadow-lg text-sm md:text-base whitespace-nowrap">
                {encouragement}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Celebration Overlay */}
        {showCelebration && (
          <Celebration
            message={celebrationMessage}
            onDone={() => setShowCelebration(false)}
          />
        )}
      </div>
    </div>
  );
}

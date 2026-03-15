"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { getLevel } from "@/lib/questions";
import { Trophy, Zap, Star, PartyPopper } from "lucide-react";

export default function CompletionScreen({ xp }) {
  const level = getLevel(xp);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [showConfetti, setShowConfetti] = useState(true);

  const levelNames = {
    1: "Beginner",
    2: "Explorer",
    3: "Champion",
  };

  const levelColors = {
    1: "from-emerald-400 to-green-500",
    2: "from-blue-400 to-indigo-500",
    3: "from-yellow-400 to-orange-500",
  };

  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const timer = setTimeout(() => setShowConfetti(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 flex items-center justify-center relative overflow-hidden">
      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={300}
          colors={[
            "#6366f1",
            "#8b5cf6",
            "#d946ef",
            "#f59e0b",
            "#10b981",
            "#3b82f6",
            "#ec4899",
          ]}
        />
      )}

      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-3xl animate-pulse" />
      </div>

      <motion.div
        className="relative z-10 max-w-md mx-auto px-6 text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Trophy Icon */}
        <motion.div
          className="mb-6"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        >
          <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-br from-yellow-400/20 to-orange-500/20 border border-yellow-400/30 shadow-2xl shadow-yellow-500/20">
            <PartyPopper className="w-14 h-14 text-yellow-400" />
          </div>
        </motion.div>

        {/* Main Message */}
        <motion.h1
          className="text-3xl sm:text-4xl font-extrabold text-white mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Congratulations! 🎉
        </motion.h1>

        <motion.p
          className="text-lg text-indigo-200 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          You completed the survey and earned XP. Thank you for participating!
        </motion.p>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-2 gap-4 mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {/* XP Card */}
          <div className="bg-white/8 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
            <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <p className="text-3xl font-extrabold text-yellow-300">{xp}</p>
            <p className="text-xs text-white/50 font-medium mt-1">
              Total XP Earned
            </p>
          </div>

          {/* Level Card */}
          <div className="bg-white/8 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
            <Trophy className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <p
              className={`text-3xl font-extrabold bg-gradient-to-r ${levelColors[level]} bg-clip-text text-transparent`}
            >
              {level}
            </p>
            <p className="text-xs text-white/50 font-medium mt-1">
              Level · {levelNames[level]}
            </p>
          </div>
        </motion.div>

        {/* Star rating display */}
        <motion.div
          className="flex justify-center gap-1 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <motion.div
              key={star}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                delay: 0.8 + star * 0.1,
                type: "spring",
                stiffness: 300,
              }}
            >
              <Star
                className={`w-8 h-8 ${
                  star <= Math.min(level + 2, 5)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-white/20"
                }`}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Thank you note */}
        <motion.p
          className="text-sm text-white/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          Your responses help us understand how to make surveys better. ✨
        </motion.p>
      </motion.div>
    </div>
  );
}

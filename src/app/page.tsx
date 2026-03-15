"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SurveyScreen from "@/components/SurveyScreen";
import CompletionScreen from "@/components/CompletionScreen";
import { Sparkles, ArrowRight } from "lucide-react";

export default function Home() {
  const [stage, setStage] = useState("welcome"); // welcome | survey | completed
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [finalXp, setFinalXp] = useState(0);

  const startSurvey = async () => {
    try {
      const res = await fetch("/api/start-session", { method: "POST" });
      const data = await res.json();
      setSessionId(data.sessionId);
      setStage("survey");
    } catch (err) {
      console.error("Failed to start session:", err);
      // Start anyway with a local fallback ID
      setSessionId("local-" + Date.now());
      setStage("survey");
    }
  };

  const handleComplete = (xp: number) => {
    setFinalXp(xp);
    setStage("completed");
  };

  if (stage === "survey") {
    return <SurveyScreen sessionId={sessionId} onComplete={handleComplete} />;
  }

  if (stage === "completed") {
    return <CompletionScreen xp={finalXp} />;
  }

  // Welcome screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 flex items-center justify-center relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-[30%] right-[10%] w-[300px] h-[300px] bg-pink-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
      </div>

      <motion.div
        className="relative z-10 max-w-md mx-auto px-6 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Icon */}
        <motion.div
          className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-500/20 to-purple-600/20 border border-indigo-400/20 shadow-2xl shadow-indigo-900/30"
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          <Sparkles className="w-12 h-12 text-indigo-400" />
        </motion.div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
          Survey{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Quest
          </span>
        </h1>

        <p className="text-lg text-indigo-200/70 mb-3 leading-relaxed">
          Help us understand how to make surveys better — while having fun!
        </p>

        <p className="text-sm text-white/40 mb-10">
          🎮 Earn XP · 🏆 Level Up · ⚡ 15 Quick Questions
        </p>

        <div className="mt-6 w-full flex justify-center">
          <motion.button
            onClick={startSurvey}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 w-full max-w-xs"
          >
            Start Quest
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        <p className="text-xs text-white/30 mt-8">
          Takes about 2–3 minutes · Your responses are anonymous
        </p>
      </motion.div>
    </div>
  );
}

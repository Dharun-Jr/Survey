"use client";

import { motion, AnimatePresence } from "framer-motion";
import { getLevel } from "@/lib/questions";
import { Zap, Trophy } from "lucide-react";

export default function XpCounter({ xp, showAnimation }) {
  const level = getLevel(xp);

  const levelColors = {
    1: "from-emerald-400 to-green-500",
    2: "from-blue-400 to-indigo-500",
    3: "from-yellow-400 to-orange-500",
  };

  const levelNames = {
    1: "Beginner",
    2: "Explorer",
    3: "Champion",
  };

  return (
    <div className="flex items-center gap-2">
      {/* Level Badge */}
      <motion.div
        className={`flex items-center gap-1.5 bg-gradient-to-br ${levelColors[level]} px-3 py-1.5 rounded-lg border-2 border-white/20 shadow-inner max-w-fit`}
        animate={showAnimation ? { scale: [1, 1.15, 1], rotate: [0, -2, 2, 0] } : {}}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <Trophy className="w-3.5 h-3.5 text-white filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]" />
        <span className="text-xs font-black text-white whitespace-nowrap tracking-wide filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">
          Lvl {level} · {levelNames[level]}
        </span>
      </motion.div>

      {/* XP Counter */}
      <motion.div
        className="flex items-center gap-1.5 bg-slate-800/80 backdrop-blur-md px-3 py-1.5 rounded-lg border-2 border-slate-600/50 shadow-inner min-w-[5rem] justify-center"
        animate={showAnimation ? { scale: [1, 1.15, 1], backgroundColor: ["rgba(30, 41, 59, 0.8)", "rgba(100, 116, 139, 0.9)", "rgba(30, 41, 59, 0.8)"] } : {}}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <Zap className="w-3.5 h-3.5 text-yellow-400" />
        <AnimatePresence mode="wait">
          <motion.span
            key={xp}
            className="text-xs font-bold text-yellow-300 tabular-nums"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {xp} XP
          </motion.span>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

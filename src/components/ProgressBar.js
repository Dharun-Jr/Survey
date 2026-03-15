"use client";

import { motion } from "framer-motion";

export default function ProgressBar({ current, total }) {
  const progress = (current / total) * 100;

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold text-indigo-200 tracking-wide uppercase">
          Progress
        </span>
        <span className="text-xs font-bold text-white bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
          {current} / {total}
        </span>
      </div>
      <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
        <motion.div
          className="h-full rounded-full relative"
          style={{
            background:
              "linear-gradient(90deg, #6366f1, #8b5cf6, #a855f7, #d946ef)",
          }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent rounded-full" />
          {progress > 8 && (
            <motion.div
              className="absolute right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-lg"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}

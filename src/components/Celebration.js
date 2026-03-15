"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Celebration({ message, onDone }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate confetti-like particles
    const newParticles = Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 10 + 6,
      color: [
        "#6366f1",
        "#8b5cf6",
        "#d946ef",
        "#f59e0b",
        "#10b981",
        "#3b82f6",
        "#ec4899",
        "#14b8a6",
      ][Math.floor(Math.random() * 8)],
      delay: Math.random() * 0.5,
    }));
    setParticles(newParticles);

    const timer = setTimeout(() => {
      onDone?.();
    }, 2800);

    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

        {/* Particles */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
            }}
            initial={{ y: "50vh", opacity: 1, scale: 0 }}
            animate={{
              y: `-${20 + Math.random() * 80}vh`,
              opacity: [1, 1, 0],
              scale: [0, 1.5, 0.5],
              x: (Math.random() - 0.5) * 200,
              rotate: Math.random() * 720,
            }}
            transition={{
              duration: 2 + Math.random(),
              delay: p.delay,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Message Card */}
        <motion.div
          className="relative z-10 bg-gradient-to-br from-indigo-600/90 to-purple-700/90 backdrop-blur-xl border border-white/20 rounded-3xl px-10 py-8 mx-4 max-w-sm text-center shadow-2xl shadow-purple-900/50"
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 10 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
        >
          <motion.div
            className="text-5xl mb-4"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{
              repeat: 2,
              duration: 0.5,
              delay: 0.3,
            }}
          >
            🎉
          </motion.div>
          <p className="text-xl font-bold text-white leading-relaxed">
            {message}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

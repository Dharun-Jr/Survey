"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useState } from "react";

export default function QuestionCard({ question, onAnswer }) {
  const [selected, setSelected] = useState(null);
  const [rating, setRating] = useState(0);
  const [textInput, setTextInput] = useState("");

  const handleSelect = (option) => {
    setSelected(option);
    setTimeout(() => {
      onAnswer(option);
    }, 400);
  };

  const handleRatingSubmit = () => {
    if (rating > 0) {
      onAnswer(rating);
    }
  };

  const handleTextSubmit = () => {
    onAnswer(textInput || "No suggestion");
  };

  if (question.type === "rating") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full flex flex-col space-y-6"
      >
        <h2 className="text-xl md:text-2xl font-bold text-white text-center leading-relaxed">
          {question.question}
        </h2>

        <div className="flex justify-center gap-4 text-4xl mt-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <motion.button
              key={star}
              onClick={() => setRating(star)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="transition-all duration-200"
            >
              <Star
                className={`w-12 h-12 sm:w-14 sm:h-14 transition-all duration-200 ${
                  star <= rating
                    ? "fill-yellow-400 text-yellow-400 drop-shadow-[0_0_12px_rgba(250,204,21,0.6)]"
                    : "text-white/30 hover:text-white/50"
                }`}
              />
            </motion.button>
          ))}
        </div>

        {rating > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 w-full flex justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleRatingSubmit}
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 w-full max-w-xs"
            >
              Continue →
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    );
  }

  if (question.type === "text") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full flex flex-col space-y-6"
      >
        <h2 className="text-xl md:text-2xl font-bold text-white text-center leading-relaxed">
          {question.question}
        </h2>

        <div className="w-full relative group">
          <textarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Share your thoughts..."
            className="w-full p-4 bg-white/5 backdrop-blur-lg border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 focus:bg-white/10 resize-none h-32 text-lg transition-all duration-300 shadow-lg"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 w-full flex justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleTextSubmit}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 w-full max-w-xs"
          >
            Submit <span className="text-lg leading-none">→</span>
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  // Default: choice type
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full flex flex-col space-y-6"
    >
      <h2 className="text-xl md:text-2xl font-bold text-white text-center leading-relaxed">
        {question.question}
      </h2>

      <div className="flex flex-col gap-4">
        {question.options.map((option, index) => {
          const isSelected = selected === option;

          return (
            <motion.button
              key={option}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={!isSelected ? { y: -2 } : {}}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(option)}
              className={`w-full text-left p-4 sm:p-5 rounded-2xl font-bold text-lg transition-all duration-200 border-2 relative overflow-hidden flex items-center gap-4 ${
                isSelected
                  ? "bg-indigo-500/20 border-indigo-400 shadow-[0_4px_0_0_#818cf8] text-white"
                  : "bg-white/5 border-white/20 hover:border-white/40 text-white/90 hover:bg-white/10 hover:shadow-[0_4px_0_0_rgba(255,255,255,0.2)]"
              }`}
            >
              {isSelected && (
                <motion.div 
                  className="absolute inset-0 bg-indigo-400/10"
                  layoutId="selection-highlight" 
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-base flex-shrink-0 transition-colors duration-200 z-10 ${
                  isSelected
                    ? "bg-indigo-500 text-white shadow-sm"
                    : "bg-white/10 text-white/70 border border-white/20"
                }`}
              >
                {String.fromCharCode(65 + index)}
              </div>
              <span className="z-10 leading-tight block pt-0.5">{option}</span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

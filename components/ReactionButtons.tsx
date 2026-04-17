"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const reactions = [
  { emoji: "😱", label: "Shock" },
  { emoji: "😡", label: "Assurdo" },
  { emoji: "🤯", label: "Incredibile" },
];

function randomCount(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function ReactionButtons() {
  const [counts, setCounts] = useState<number[]>([0, 0, 0]);
  const [clicked, setClicked] = useState<boolean[]>([false, false, false]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCounts([randomCount(84, 156), randomCount(62, 130), randomCount(45, 98)]);
  }, []);

  function handleClick(index: number) {
    if (clicked[index]) return;
    setClicked((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
    setCounts((prev) => {
      const next = [...prev];
      next[index] += 1;
      return next;
    });
  }

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 1 }}
      className="flex items-center justify-center gap-2 mt-4"
    >
      <span className="text-warm-gray/40 text-[10px] md:text-xs mr-1">
        La tua reazione:
      </span>
      {reactions.map((r, i) => (
        <motion.button
          key={r.label}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleClick(i)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs transition-all duration-300 cursor-pointer ${
            clicked[i]
              ? "border-white/15 bg-white/[0.08]"
              : "border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/10"
          }`}
        >
          <span className={`text-sm ${clicked[i] ? "scale-110" : ""} transition-transform`}>
            {r.emoji}
          </span>
          <span className={`tabular-nums ${clicked[i] ? "text-white/70" : "text-warm-gray/50"}`}>
            {counts[i]}
          </span>
        </motion.button>
      ))}
    </motion.div>
  );
}

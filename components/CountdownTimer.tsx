"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const INITIAL_SECONDS = 2; // DEV: 2 sec per test (production: 540 = 9:00)

export default function CountdownTimer({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("daprileFunnelTimer");
    if (saved) {
      const parsed = parseInt(saved, 10);
      if (parsed <= 0) {
        setIsComplete(true);
        onComplete();
        return;
      }
      setSecondsLeft(parsed);
    } else {
      setSecondsLeft(INITIAL_SECONDS);
    }
  }, [onComplete]);

  useEffect(() => {
    if (secondsLeft === null || isComplete) return;

    if (secondsLeft <= 0) {
      setIsComplete(true);
      localStorage.setItem("daprileFunnelTimer", "0");
      onComplete();
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev === null) return null;
        const next = prev - 1;
        localStorage.setItem("daprileFunnelTimer", String(next));
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft, isComplete, onComplete]);

  // Save on unload
  const handleUnload = useCallback(() => {
    if (secondsLeft !== null) {
      localStorage.setItem("daprileFunnelTimer", String(secondsLeft));
    }
  }, [secondsLeft]);

  useEffect(() => {
    window.addEventListener("beforeunload", handleUnload);
    document.addEventListener("visibilitychange", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
      document.removeEventListener("visibilitychange", handleUnload);
    };
  }, [handleUnload]);

  if (isComplete || secondsLeft === null) return null;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1 }}
      className="text-center py-3 md:py-4"
    >
      <p className="text-gold/80 text-xs md:text-sm tracking-widest uppercase mb-3">
        Una sorpresa si sblocca tra
      </p>

      <div className="flex items-center justify-center gap-2">
        <TimeBox value={minutes} label="min" />
        <span className="text-gold/40 text-2xl font-light mb-4">:</span>
        <TimeBox value={seconds} label="sec" />
      </div>
    </motion.div>
  );
}

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-14 h-14 md:w-18 md:h-18 rounded-xl bg-espresso-light/80 border border-gold/10 flex items-center justify-center backdrop-blur-sm shadow-inner">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-white text-2xl md:text-3xl font-light tabular-nums"
          >
            {String(value).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-warm-gray/60 text-[10px] mt-2 tracking-widest uppercase">
        {label}
      </span>
    </div>
  );
}

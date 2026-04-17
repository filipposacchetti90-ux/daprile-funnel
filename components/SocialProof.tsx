"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function SocialProof() {
  const [viewerCount, setViewerCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setViewerCount(Math.floor(Math.random() * 51) + 20);

    const interval = setInterval(() => {
      setViewerCount((prev) => {
        const change = Math.floor(Math.random() * 4) + 1;
        const shouldIncrease = Math.random() > 0.3;
        const next = shouldIncrease ? prev + change : prev - change;
        return Math.max(15, Math.min(85, next));
      });
    }, Math.floor(Math.random() * 7000) + 3000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="flex items-center justify-center gap-2.5 py-4"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
      </span>
      <p className="text-warm-gray text-xs tracking-[0.15em] uppercase">
        <span className="text-white font-semibold">{viewerCount}</span> persone stanno guardando ora
      </p>
    </motion.div>
  );
}

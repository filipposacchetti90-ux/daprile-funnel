"use client";

import { useState, useEffect } from "react";

const INITIAL_SECONDS = 599; // 9:59

export default function CheckoutTimer() {
  const [secondsLeft, setSecondsLeft] = useState(INITIAL_SECONDS);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [mounted, secondsLeft]);

  if (!mounted) return null;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const isLow = minutes < 3;

  return (
    <div className="sticky top-0 z-50 bg-coffee-dark text-white py-2.5 px-4">
      <p className="text-center text-xs md:text-sm tracking-wider uppercase">
        Ordine riservato per:{" "}
        <span className={`font-bold tabular-nums ${isLow ? "text-brand-red-light" : "text-gold-light"}`}>
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </span>
      </p>
    </div>
  );
}

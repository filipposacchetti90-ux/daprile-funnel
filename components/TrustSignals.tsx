"use client";

import { motion } from "framer-motion";

type Variant = "vsl" | "quiz" | "checkout";

/**
 * Aggregate social proof — brand heritage facts, zero individual attribution.
 * Safe to use in ads, safe legally, always true for D'Aprile.
 *
 * Three variants share the same 3 signals but tune colors/sizing to the host
 * page. `vsl` is dark (on espresso background), `quiz`/`checkout` are light.
 */
export default function TrustSignals({ variant = "vsl" }: { variant?: Variant }) {
  const signals = [
    { icon: "☕", text: "Dal 1962", sub: "60+ anni di torrefazione" },
    { icon: "🏆", text: "200+ bar e ristoranti", sub: "ci scelgono in Toscana" },
    { icon: "✋", text: "Tostato a mano", sub: "metodo artigianale tradizionale" },
  ];

  const isDark = variant === "vsl";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={`grid grid-cols-3 gap-2 md:gap-4 max-w-3xl mx-auto ${
        variant === "checkout" ? "py-4" : variant === "quiz" ? "py-3" : "py-5"
      }`}
    >
      {signals.map((s, i) => (
        <div
          key={i}
          className={`flex flex-col items-center text-center px-2 py-2 md:py-3 rounded-xl border ${
            isDark
              ? "border-white/[0.08] bg-white/[0.03]"
              : "border-cream-dark/40 bg-white/60"
          }`}
        >
          <span className="text-xl md:text-2xl mb-1" aria-hidden>{s.icon}</span>
          <span className={`text-xs md:text-sm font-bold leading-tight ${
            isDark ? "text-white" : "text-coffee-dark"
          }`}>
            {s.text}
          </span>
          <span className={`text-[10px] md:text-xs mt-0.5 leading-tight ${
            isDark ? "text-warm-gray/80" : "text-coffee/50"
          }`}>
            {s.sub}
          </span>
        </div>
      ))}
    </motion.div>
  );
}

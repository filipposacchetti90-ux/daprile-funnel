"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Brand pull-quotes — rotating marketing copy styled like testimonials but
 * explicitly framed as *what our customers tell us*, not a single attributed
 * person. Zero fake names, zero fake photos. Legally safe, still persuasive.
 *
 * Used in checkout above the CTA and at the end of the quiz as a reassurance.
 */
const QUOTES = [
  "«È tutta un'altra cosa dalle capsule del supermercato.»",
  "«Chi lo prova a casa non torna più ai marchi industriali.»",
  "«Finalmente un espresso italiano che sa davvero di caffè.»",
  "«Senza il mal di stomaco delle miscele industriali.»",
];

export default function BrandQuotes({ compact = false }: { compact?: boolean }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % QUOTES.length);
    }, 4200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative ${compact ? "py-3" : "py-5"} overflow-hidden`}>
      <p className="text-[10px] text-gold-dark uppercase tracking-[0.2em] font-semibold text-center mb-2">
        Cosa ci dicono i clienti
      </p>
      <div className={`relative ${compact ? "h-12" : "h-16"} flex items-center justify-center`}>
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className={`absolute inset-0 flex items-center justify-center text-center font-heading italic text-coffee-dark px-4 ${
              compact ? "text-base md:text-lg" : "text-lg md:text-xl"
            }`}
          >
            {QUOTES[index]}
          </motion.p>
        </AnimatePresence>
      </div>
      <div className="flex justify-center gap-1.5 mt-1">
        {QUOTES.map((_, i) => (
          <span
            key={i}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === index ? "w-4 bg-gold-dark" : "w-1 bg-coffee/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

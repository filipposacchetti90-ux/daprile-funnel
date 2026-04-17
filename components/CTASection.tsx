"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CTASection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center py-10 px-4"
    >
      <p className="text-white/80 text-lg md:text-xl mb-2 max-w-md mx-auto font-heading italic">
        Abbiamo qualcosa di speciale per te.
      </p>
      <p className="text-cream/40 text-sm mb-10 max-w-sm mx-auto">
        Fai il quiz e scopri il caff&egrave; perfetto per i tuoi gusti.
      </p>

      <Link href="/quiz">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="px-14 py-5 md:px-18 md:py-6 bg-brand-red hover:bg-brand-red-light text-white rounded-full cursor-pointer shadow-[0_6px_30px_-4px_rgba(185,28,28,0.4)] hover:shadow-[0_8px_40px_-4px_rgba(185,28,28,0.5)] transition-all duration-300"
        >
          <span className="block text-lg md:text-xl font-bold tracking-wide">
            ☕ FAI IL QUIZ ADESSO
          </span>
          <span className="block text-xs font-normal tracking-normal text-white/60 mt-1">
            Ti bastano 7 secondi...
          </span>
        </motion.button>
      </Link>

      <p className="text-warm-gray/30 text-xs mt-5 tracking-wider uppercase">
        Spedizione gratuita in tutta Italia
      </p>
    </motion.div>
  );
}

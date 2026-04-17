"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { trackCustom } from "../lib/pixel";

const STORAGE_KEY = "daprileExitShown";

export default function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show only once per session
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    let shown = false;
    const show = (reason: string) => {
      if (shown) return;
      shown = true;
      sessionStorage.setItem(STORAGE_KEY, "1");
      setIsOpen(true);
      trackCustom("ExitIntent", { reason });
    };

    // ─── Desktop: mouse leaving top of viewport ───
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) show("mouse-leave-top");
    };

    // ─── Mobile: rapid scroll up ───
    let lastScrollY = window.scrollY;
    let lastScrollTime = Date.now();
    const handleScroll = () => {
      const now = Date.now();
      const dy = window.scrollY - lastScrollY;
      const dt = now - lastScrollTime;
      // Fast scroll up after scrolling down at least 300px
      if (dy < -80 && dt < 100 && window.scrollY < 200 && lastScrollY > 300) {
        show("mobile-fast-scroll-up");
      }
      lastScrollY = window.scrollY;
      lastScrollTime = now;
    };

    // ─── Mobile: back button intent (pushState trick) ───
    const handlePopState = () => {
      show("back-button");
      // Push state back to prevent actual navigation
      history.pushState(null, "", location.href);
    };

    // Activate after 8 seconds (give user time to engage)
    const activationTimer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
      window.addEventListener("scroll", handleScroll, { passive: true });
      // Push a state so back button triggers popstate
      history.pushState(null, "", location.href);
      window.addEventListener("popstate", handlePopState);
    }, 8000);

    return () => {
      clearTimeout(activationTimer);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  function handleClose() {
    setIsOpen(false);
    trackCustom("ExitIntentDismissed");
  }

  function handleAccept() {
    trackCustom("ExitIntentAccepted");
    // Navigation happens via Link
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl bg-espresso border border-gold/20 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Close */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors z-10"
              aria-label="Chiudi"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Top red banner */}
            <div className="bg-brand-red py-2.5 px-4 text-center">
              <p className="text-xs md:text-sm font-bold text-white uppercase tracking-[0.25em]">
                Aspetta!
              </p>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="text-5xl md:text-6xl mb-5"
              >
                📖
              </motion.div>

              <h2 className="text-white text-2xl md:text-3xl font-bold mb-4 leading-snug">
                Non puoi <span className="text-brand-red">ascoltare</span> il video?
              </h2>

              <p className="text-warm-gray text-base md:text-lg mb-8 leading-relaxed">
                Nessun problema. Abbiamo preparato la versione{" "}
                <span className="text-gold">scritta</span> del documentario per te.
              </p>

              <Link href="/documentario" onClick={handleAccept}>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-5 bg-brand-red hover:bg-brand-red-light text-white rounded-xl cursor-pointer shadow-lg shadow-brand-red/30 transition-all"
                >
                  <span className="block text-lg md:text-xl font-bold tracking-wide">
                    LEGGI IL DOCUMENTARIO
                  </span>
                  <span className="block text-sm font-normal text-white/70 mt-1">
                    Versione scritta completa
                  </span>
                </motion.button>
              </Link>

              <button
                onClick={handleClose}
                className="text-warm-gray/60 hover:text-white text-base mt-6 cursor-pointer underline underline-offset-4 transition-colors"
              >
                No grazie, torno al video
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

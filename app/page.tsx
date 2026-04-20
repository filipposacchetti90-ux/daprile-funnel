"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { trackViewContent } from "../lib/pixel";
import Header from "../components/Header";
import VslPlayer from "../components/VslPlayer";
import SocialProof from "../components/SocialProof";
import TrustSignals from "../components/TrustSignals";
import CountdownTimer from "../components/CountdownTimer";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";
import LiveReactions from "../components/LiveReactions";
import ReactionButtons from "../components/ReactionButtons";
import ExitIntentPopup from "../components/ExitIntentPopup";
import Link from "next/link";

/** CTA unlocks when the video has played 5 minutes 45 seconds of content. */
const CTA_UNLOCK_SECONDS = 5 * 60 + 45;
/** If the viewer already waited once, keep the CTA unlocked for this long on return visits. */
const UNLOCK_MEMO_KEY = "daprileVSLUnlockedAt";
const UNLOCK_MEMO_TTL_MS = 72 * 60 * 60 * 1000;

export default function VSLPage() {
  const [showCTA, setShowCTA] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(CTA_UNLOCK_SECONDS);

  const handleTimerComplete = useCallback(() => {
    setShowCTA(true);
    try {
      localStorage.setItem(UNLOCK_MEMO_KEY, Date.now().toString());
    } catch {}
  }, []);

  // Real-time countdown based on Date.now() deltas, not a decrementing
  // counter. setInterval is throttled to ~1 tick/min when the tab is
  // backgrounded, so a `prev - 1` counter drifts or stalls. Computing
  // elapsed from a fixed startTime self-corrects on the next tick when
  // the tab returns to the foreground.
  // Returning viewers who already waited the full countdown skip it for
  // UNLOCK_MEMO_TTL_MS, after which the memo expires and the timer runs again.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(UNLOCK_MEMO_KEY);
      if (saved) {
        const ts = parseInt(saved, 10);
        if (Number.isFinite(ts) && Date.now() - ts < UNLOCK_MEMO_TTL_MS) {
          setSecondsLeft(0);
          setShowCTA(true);
          return;
        }
        localStorage.removeItem(UNLOCK_MEMO_KEY);
      }
    } catch {}

    const startTime = Date.now();
    const tick = () => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setSecondsLeft(Math.max(0, CTA_UNLOCK_SECONDS - elapsed));
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    trackViewContent({ content_name: "VSL Documentario", content_type: "video" });
  }, []);

  return (
    <div className="relative bg-grain vignette-red">
      <Header />

      <main className="flex-1 relative z-10">
        {/* Hero + Video Section */}
        <section className="px-4 pt-10 pb-2 md:pt-14 md:pb-2 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-4 md:mb-6 max-w-3xl mx-auto"
          >
            {/* Headline — compact on mobile */}
            <h1 className="text-3xl md:text-4xl leading-[1.2] text-white mb-2 md:mb-3 font-bold tracking-tight">
              <span className="block md:inline">
                E se il caff&egrave; di{" "}
                <span className="italic">&ldquo;qualit&agrave;&rdquo;</span>
              </span>{" "}
              che stai bevendo fosse una{" "}
              <span className="text-brand-red">miscela industriale</span>?
            </h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-warm-gray text-sm md:text-base max-w-lg mx-auto leading-relaxed"
            >
              Guarda il documentario che sta cambiando il modo in cui gli
              italiani scelgono il proprio caff&egrave;.
            </motion.p>
          </motion.div>

          <div className="mb-4 md:mb-6">
            <SocialProof />
          </div>

          <div className="relative">
            <div className="absolute -inset-6 md:-inset-10 bg-brand-red/[0.07] rounded-[40px] blur-3xl" />
            <div className="absolute -inset-4 md:-inset-8 bg-gold/[0.04] rounded-[30px] blur-2xl" />
            <div className="relative">
              <VslPlayer />
            </div>
          </div>
          <ReactionButtons />

          {/* Trust signals — brand heritage */}
          <div className="mt-6 md:mt-8">
            <TrustSignals variant="vsl" />
          </div>

          {/* Read instead link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-center mt-5"
          >
            <Link
              href="/documentario"
              className="inline-flex items-center gap-2 text-cream/70 hover:text-white text-sm md:text-base transition-colors underline underline-offset-4 decoration-white/30 hover:decoration-white/60"
            >
              <span className="text-base">📖</span>
              <span>Preferisci leggere? <span className="text-gold">Clicca qui</span></span>
            </Link>
          </motion.div>
        </section>

        {/* Divider */}
        <div className="max-w-xs mx-auto py-2 md:py-3">
          <div className="h-px premium-line opacity-30" />
        </div>

        {/* Countdown or CTA */}
        <section className="max-w-3xl mx-auto px-4 pb-4 md:pb-6">
          <AnimatePresence mode="wait">
            {!showCTA ? (
              <CountdownTimer key="timer" secondsLeft={secondsLeft} onComplete={handleTimerComplete} />
            ) : (
              <CTASection key="cta" />
            )}
          </AnimatePresence>
        </section>
      </main>

      <Footer />

      {/* Live reactions — hide after CTA appears */}
      {!showCTA && <LiveReactions />}

      {/* Exit intent popup */}
      <ExitIntentPopup />

      {/* Sticky warning banner */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 2 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-espresso/95 backdrop-blur-md border-t border-brand-red/20 py-2.5 px-4"
      >
        <p className="text-center text-cream/60 text-[11px] md:text-sm leading-snug max-w-xl mx-auto">
          <span className="text-brand-red font-bold">ATTENZIONE:</span>{" "}
          A causa delle informazioni rivelate, potresti non guardare pi&ugrave; il caff&egrave; del supermercato allo stesso modo.
        </p>
      </motion.div>
    </div>
  );
}

"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { trackViewContent } from "../lib/pixel";
import Header from "../components/Header";
import VslPlayer from "../components/VslPlayer";
import SocialProof from "../components/SocialProof";
import CountdownTimer from "../components/CountdownTimer";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";
import LiveReactions from "../components/LiveReactions";
import ReactionButtons from "../components/ReactionButtons";
import ExitIntentPopup from "../components/ExitIntentPopup";
import Link from "next/link";

/** CTA unlocks when the video has played 8 minutes 30 seconds of content. */
const CTA_UNLOCK_SECONDS = 8 * 60 + 30;

export default function VSLPage() {
  const [showCTA, setShowCTA] = useState(false);
  const [videoTime, setVideoTime] = useState(0);

  const handleTimerComplete = useCallback(() => {
    setShowCTA(true);
  }, []);

  // Latch CTA permanently once unlock threshold is crossed — even if the
  // viewer later rewinds or reloads.
  const secondsLeft = Math.max(0, CTA_UNLOCK_SECONDS - Math.floor(videoTime));

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
              E se il caff&egrave; di{" "}
              <span className="italic">&ldquo;qualit&agrave;&rdquo;</span>{" "}
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
              <VslPlayer onTimeUpdate={setVideoTime} />
            </div>
          </div>
          <ReactionButtons />

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

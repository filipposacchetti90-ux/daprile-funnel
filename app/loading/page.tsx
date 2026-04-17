"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

const steps = [
  { text: "Analisi delle tue preferenze...", duration: 2000 },
  { text: "Verifica disponibilità in magazzino...", duration: 2200 },
  { text: "Calcolo della quantità ideale...", duration: 1800 },
  { text: "Preparazione della tua offerta riservata...", duration: 1500 },
];

export default function LoadingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Check quiz answers exist
    const saved = localStorage.getItem("daprileQuiz");
    if (!saved) {
      router.push("/quiz");
      return;
    }

    // Step through messages with progress jumps
    let stepIndex = 0;
    const stepPercent = 100 / steps.length;

    // Start at first chunk
    setProgress(stepPercent * 0.6);

    const advanceStep = () => {
      if (stepIndex < steps.length - 1) {
        stepIndex++;
        setCurrentStep(stepIndex);
        // Jump progress to next step
        setProgress(stepPercent * (stepIndex + 0.6));
        setTimeout(advanceStep, steps[stepIndex].duration);
      } else {
        setProgress(100);
        // Show alert message
        setTimeout(() => {
          setDone(true);
          // Then navigate after 3.5 sec
          setTimeout(() => {
            router.push("/checkout");
          }, 2500);
        }, 500);
      }
    };

    setTimeout(advanceStep, steps[0].duration);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(180deg, #FAF7F2 0%, #F5F0E8 50%, #E8E0D0 100%)" }}>
      {/* Header */}
      <header className="w-full py-3 px-4 flex justify-center bg-white shadow-md shadow-black/10">
        <Image
          src="/logo.webp"
          alt="D'Aprile Caffè"
          width={100}
          height={100}
          className="h-12 md:h-14 w-auto"
          priority
        />
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6">
        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div
              key="loader"
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-sm text-center"
            >
              {/* Spinner */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 mx-auto mb-8 rounded-full border-cream-dark border-t-coffee"
                style={{ borderWidth: "3px" }}
              />

              {/* Step text */}
              <div className="h-14 flex items-center justify-center mb-6">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="text-base md:text-lg font-medium text-coffee-dark"
                  >
                    {steps[currentStep].text}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-cream-dark/50 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-coffee via-gold to-coffee rounded-full"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>

              {/* Percentage */}
              <p className="text-warm-gray text-xs mt-3 tabular-nums">
                {Math.round(progress)}%
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="alert"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-sm text-center"
            >
              {/* Alert icon */}
              <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-amber-100 flex items-center justify-center">
                <svg className="w-7 h-7 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>

              <p className="text-amber-700 text-xl md:text-2xl font-bold mb-2">
                Poche scorte rimaste!
              </p>
              <p className="text-coffee/60 text-base">
                Approfittane ora prima che finiscano...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

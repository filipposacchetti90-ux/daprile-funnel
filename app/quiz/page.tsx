"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import OrderNotifications from "../../components/OrderNotifications";
import TrustSignals from "../../components/TrustSignals";
import { trackLead, trackCustom } from "../../lib/pixel";

/* ─── Types ─── */
interface QuizAnswer {
  formato: string;
  intensita: string;
  consumo: string;
  famiglia: string;
}

interface Question {
  id: keyof QuizAnswer;
  label: string;
  subtitle: string;
  options: { value: string; label: string; icon?: React.ReactNode; sub?: string }[];
  hint?: (answers: Partial<QuizAnswer>) => string | null;
}

/* ─── SVG Icons ─── */
function IconCialda() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9">
      <circle cx="20" cy="20" r="16" stroke="#5C3A24" strokeWidth="2" fill="#F5F0E8" />
      <circle cx="20" cy="20" r="10" stroke="#C9A96E" strokeWidth="1.5" strokeDasharray="3 2" />
      <path d="M16 20c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4-4-1.8-4-4z" fill="#5C3A24" opacity="0.3" />
    </svg>
  );
}
function IconNespresso() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9">
      <rect x="12" y="8" width="16" height="24" rx="4" stroke="#5C3A24" strokeWidth="2" fill="#F5F0E8" />
      <rect x="15" y="12" width="10" height="6" rx="1" fill="#C9A96E" opacity="0.5" />
      <circle cx="20" cy="24" r="2" fill="#5C3A24" opacity="0.4" />
    </svg>
  );
}
function IconLavazzaAmo() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9">
      <rect x="10" y="10" width="20" height="20" rx="5" stroke="#5C3A24" strokeWidth="2" fill="#F5F0E8" />
      <rect x="14" y="14" width="12" height="5" rx="1" fill="#C9A96E" opacity="0.5" />
      <circle cx="20" cy="25" r="2.5" fill="#5C3A24" opacity="0.4" />
    </svg>
  );
}
function IconEspressoPoint() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9">
      <ellipse cx="20" cy="20" rx="14" ry="10" stroke="#5C3A24" strokeWidth="2" fill="#F5F0E8" />
      <ellipse cx="20" cy="20" rx="8" ry="5" fill="#C9A96E" opacity="0.4" />
      <line x1="20" y1="15" x2="20" y2="25" stroke="#5C3A24" strokeWidth="1" opacity="0.3" />
    </svg>
  );
}
function IconGrani() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9">
      <ellipse cx="20" cy="20" rx="10" ry="13" fill="#5C3A24" opacity="0.8" />
      <path d="M20 8c-2 4-2 10 0 14s2 6 0 10" stroke="#F5F0E8" strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="15" cy="28" rx="5" ry="6" fill="#5C3A24" opacity="0.4" />
    </svg>
  );
}
function IconMoka() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9">
      <path d="M14 32h12l2-12H12l2 12z" stroke="#5C3A24" strokeWidth="2" fill="#F5F0E8" />
      <path d="M12 20h16l-1-6H13l-1 6z" stroke="#5C3A24" strokeWidth="2" fill="#C9A96E" opacity="0.4" />
      <rect x="18" y="8" width="4" height="6" rx="2" stroke="#5C3A24" strokeWidth="1.5" fill="none" />
      <path d="M16 6c1-2 3-2 4 0" stroke="#5C3A24" strokeWidth="1" opacity="0.4" strokeLinecap="round" />
    </svg>
  );
}
function IconLight() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9">
      <circle cx="20" cy="20" r="12" stroke="#C9A96E" strokeWidth="2" fill="#F5F0E8" />
      <circle cx="20" cy="20" r="4" fill="#C9A96E" opacity="0.3" />
    </svg>
  );
}
function IconMedium() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9">
      <circle cx="20" cy="20" r="12" stroke="#8B6D3F" strokeWidth="2" fill="#F5F0E8" />
      <path d="M20 8a12 12 0 010 24V8z" fill="#8B6D3F" opacity="0.5" />
    </svg>
  );
}
function IconStrong() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9">
      <circle cx="20" cy="20" r="12" stroke="#3C2415" strokeWidth="2" fill="#3C2415" />
      <circle cx="20" cy="20" r="4" fill="#C9A96E" opacity="0.6" />
    </svg>
  );
}
function IconPerson() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9">
      <circle cx="20" cy="14" r="6" stroke="#5C3A24" strokeWidth="2" fill="#F5F0E8" />
      <path d="M10 34c0-5.5 4.5-10 10-10s10 4.5 10 10" stroke="#5C3A24" strokeWidth="2" fill="#C9A96E" opacity="0.2" />
    </svg>
  );
}
function IconCup({ count = 1 }: { count?: number }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9">
      <path d="M8 12h20v14a6 6 0 01-6 6h-8a6 6 0 01-6-6V12z" stroke="#5C3A24" strokeWidth="2" fill="#F5F0E8" />
      <path d="M28 16h2a4 4 0 010 8h-2" stroke="#5C3A24" strokeWidth="1.5" />
      {count >= 2 && <rect x="12" y="16" width="12" height="4" rx="1" fill="#C9A96E" opacity="0.3" />}
      {count >= 3 && <rect x="12" y="16" width="12" height="8" rx="1" fill="#C9A96E" opacity="0.3" />}
      {count === 1 && <rect x="12" y="18" width="12" height="2" rx="1" fill="#C9A96E" opacity="0.3" />}
    </svg>
  );
}

/* ─── Questions ─── */
const questions: Question[] = [
  {
    id: "formato",
    label: "Che tipo di caffè utilizzi?",
    subtitle: "Seleziona il formato compatibile con la tua macchina.",
    options: [
      { value: "cialde-44mm", label: "Cialde di carta 44mm", sub: "Frog, Didiesse, Grimac, Spinel e altre", icon: <IconCialda /> },
      { value: "capsule-nespresso", label: "Capsule Nespresso", sub: "Tutte le macchine Nespresso compatibili", icon: <IconNespresso /> },
      { value: "capsule-lavazza-amo", label: "Capsule Lavazza A Modo Mio", sub: "Jolie, Tiny, Voicy, Desea e altre", icon: <IconLavazzaAmo /> },
      { value: "lavazza-espresso-point", label: "Lavazza Espresso Point", sub: "Matinée, EP Mini, EP 950 e altre", icon: <IconEspressoPoint /> },
      { value: "grani", label: "Grani", sub: "Per macchine con macinacaffè integrato", icon: <IconGrani /> },
      { value: "miscela-moka", label: "Miscela Moka", sub: "Per la classica moka da fornello", icon: <IconMoka /> },
    ],
  },
  {
    id: "intensita",
    label: "Che intensità preferisci?",
    subtitle: "Ogni miscela ha il suo carattere. Qual è il tuo?",
    options: [
      { value: "leggero", label: "Leggero", sub: "Delicato, note floreali e fruttate", icon: <IconLight /> },
      { value: "medio", label: "Medio", sub: "Equilibrato, cioccolato e nocciola", icon: <IconMedium /> },
      { value: "intenso", label: "Intenso", sub: "Corposo, tostatura decisa e persistente", icon: <IconStrong /> },
    ],
  },
  {
    id: "consumo",
    label: "Quanti caffè bevi al giorno?",
    subtitle: "Ci aiuta a consigliarti la quantità giusta.",
    options: [
      { value: "1-2", label: "1–2 caffè", sub: "Un paio al giorno, con calma", icon: <IconCup count={1} /> },
      { value: "3-4", label: "3–4 caffè", sub: "La media italiana, colazione e dopo pranzo", icon: <IconCup count={2} /> },
      { value: "5+", label: "5 o più", sub: "Un vero appassionato!", icon: <IconCup count={3} /> },
    ],
    hint: undefined,
  },
  {
    id: "famiglia",
    label: "Quanti siete in famiglia a bere caffè?",
    subtitle: "Più siete, più caffè servono!",
    options: [
      { value: "1", label: "Solo io", icon: <IconPerson /> },
      { value: "2", label: "Siamo in 2 persone", icon: <IconPerson /> },
      { value: "3", label: "Siamo in 3 persone", icon: <IconPerson /> },
      { value: "4+", label: "Siamo in 4 o più persone", icon: <IconPerson /> },
    ],
    hint: (answers) => {
      const consumo = answers.consumo;
      if (consumo === "1-2") {
        return "👨‍👩‍👧 Una famiglia di 2-3 persone consuma circa 100–150 caffè al mese... il caffè non basta mai! 😅";
      }
      if (consumo === "3-4") {
        return "👨‍👩‍👧‍👦 Con i vostri ritmi, in famiglia si arriva facilmente a 200–300 caffè al mese... servono rinforzi! 💪";
      }
      if (consumo === "5+") {
        return "🏠 Oltre 300 caffè al mese in famiglia?! Siete dei veri intenditori... meglio fare scorta! 😎";
      }
      return "👨‍👩‍👧 Una famiglia italiana consuma in media 150–300 caffè al mese... tanti eh? ☕";
    },
  },
];

/* ─── Progress Bar ─── */
function ProgressBar({ current, total }: { current: number; total: number }) {
  const progress = ((current + 1) / total) * 100;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-between text-xs text-coffee/40 mb-2">
        <span>Domanda {current + 1} di {total}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="h-1 bg-coffee/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-gold-dark via-gold to-gold-light rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

/* ─── Option Card ─── */
function OptionCard({
  label,
  icon,
  sub,
  selected,
  onClick,
  index,
}: {
  label: string;
  icon?: React.ReactNode;
  sub?: string;
  selected: boolean;
  onClick: () => void;
  index: number;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
      onClick={onClick}
      className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all duration-300 cursor-pointer group ${
        selected
          ? "border-gold bg-white shadow-md shadow-gold/10"
          : "border-coffee/10 bg-white/70 hover:border-coffee/20 hover:bg-white hover:shadow-sm"
      }`}
    >
      <div className="flex items-center gap-3">
        {icon && (
          <span className="flex-shrink-0">{icon}</span>
        )}
        <div className="flex-1 min-w-0">
          <span
            className={`text-base md:text-lg uppercase tracking-wide transition-colors duration-300 block ${
              selected ? "text-coffee-dark font-bold" : "text-coffee/70 font-medium group-hover:text-coffee-dark"
            }`}
          >
            {label}
          </span>
          {sub && (
            <span className="text-xs text-warm-gray/60 block mt-0.5 normal-case tracking-normal">{sub}</span>
          )}
        </div>
        {selected && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="ml-auto text-gold-dark flex-shrink-0"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </motion.span>
        )}
      </div>
    </motion.button>
  );
}

/* ─── Quiz Page ─── */
export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswer>>({});
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back

  const question = questions[step];
  const currentAnswer = answers[question.id];
  const hintText = question.hint?.(answers) ?? null;

  function selectOption(value: string) {
    const updated = { ...answers, [question.id]: value };
    setAnswers(updated);

    // Auto-advance after a brief pause
    setTimeout(() => {
      if (step < questions.length - 1) {
        setDirection(1);
        setStep((s) => s + 1);
      } else {
        // Quiz complete — save and navigate
        localStorage.setItem("daprileQuiz", JSON.stringify(updated));
        trackLead({ content_name: "Quiz Completato" });
        trackCustom("QuizComplete", updated);
        router.push("/loading");
      }
    }, 400);
  }

  function goBack() {
    if (step > 0) {
      setDirection(-1);
      setStep((s) => s - 1);
    }
  }

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <div className="relative min-h-screen flex flex-col" style={{ background: "linear-gradient(180deg, #FAF7F2 0%, #F5F0E8 50%, #E8E0D0 100%)" }}>
      {/* Header */}
      <header className="w-full py-3 px-4 flex justify-center bg-white shadow-md shadow-black/10">
        <Image
          src="/logo.webp"
          alt="D'Aprile Caffè — Torrefazione dal 1962"
          width={120}
          height={120}
          className="h-14 md:h-16 w-auto"
          priority
        />
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-10 relative z-10">
        {/* Progress */}
        <div className="w-full mb-6">
          <ProgressBar current={step} total={questions.length} />
        </div>

        {/* Trust signals — reassure during the quiz flow */}
        <div className="w-full mb-6">
          <TrustSignals variant="quiz" />
        </div>

        {/* Question */}
        <div className="w-full max-w-md mx-auto min-h-[420px] flex flex-col">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="flex-1"
            >
              {/* Question text */}
              <div className="text-center mb-8">
                <h1 className="font-heading text-xl md:text-2xl text-coffee-dark font-bold mb-2">
                  {question.label}
                </h1>
                <p className="text-coffee/50 text-sm md:text-base">
                  {question.subtitle}
                </p>
              </div>

              {/* Hint — above options */}
              {hintText && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="mb-5 px-4 py-3 rounded-lg bg-gold/[0.08] border border-gold/20"
                >
                  <p className="text-coffee/60 text-xs md:text-sm leading-relaxed text-center">
                    {hintText}
                  </p>
                </motion.div>
              )}

              {/* Options */}
              <div className="space-y-3">
                {question.options.map((opt, i) => (
                  <OptionCard
                    key={opt.value}
                    label={opt.label}
                    icon={opt.icon}
                    sub={opt.sub}
                    selected={currentAnswer === opt.value}
                    onClick={() => selectOption(opt.value)}
                    index={i}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Back button */}
        {step > 0 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={goBack}
            className="mt-6 text-coffee/30 hover:text-coffee/60 text-sm transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Indietro
          </motion.button>
        )}
      </main>

      <OrderNotifications />
    </div>
  );
}

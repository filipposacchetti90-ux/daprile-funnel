"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getOtoOffer, type OtoOffer } from "../../lib/shopify";
import { trackCustom } from "../../lib/pixel";

export default function OtoPage() {
  const router = useRouter();
  const [oto, setOto] = useState<OtoOffer | null>(null);
  const [firstName, setFirstName] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(300); // 5 minuti

  useEffect(() => {
    const quiz = localStorage.getItem("daprileQuiz");
    if (!quiz) { router.push("/thank-you"); return; }

    const answers = JSON.parse(quiz);
    const offer = getOtoOffer(answers.formato, answers.intensita);
    setOto(offer);

    // Merge Shopify order info from query params (sent by the order-status page script)
    const params = new URLSearchParams(window.location.search);
    const orderIdParam = params.get("order");
    const orderNameParam = params.get("name");

    const existing = JSON.parse(localStorage.getItem("daprileOrder") || "{}");
    if (orderIdParam) {
      existing.shopifyOrderId = `gid://shopify/Order/${orderIdParam}`;
      if (orderNameParam) existing.orderNumber = orderNameParam;
      localStorage.setItem("daprileOrder", JSON.stringify(existing));
    }
    setFirstName(existing.firstName || "");

    trackCustom("OtoView", { formato: answers.formato, intensita: answers.intensita });
  }, [router]);

  // Countdown timer
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => setSecondsLeft((p) => p - 1), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  async function handleAddToOrder() {
    if (!oto) return;
    setIsAdding(true);

    try {
      const order = JSON.parse(localStorage.getItem("daprileOrder") || "{}");

      // Call real Shopify order-edit API if we have an order ID
      if (order.shopifyOrderId) {
        const res = await fetch("/api/oto", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: order.shopifyOrderId,
            variantId: oto.variantId,
          }),
        });
        const data = await res.json();
        if (!data.success) {
          console.error("OTO add failed:", data.error);
          // Continue anyway - show in thank-you regardless (backend fallback)
        }
      }

      trackCustom("OtoAccepted", { miscela: oto.miscela, price: oto.price });

      order.otoAdded = true;
      order.otoProduct = `Miscela ${oto.miscela}`;
      order.otoPrice = oto.price;
      order.total = (order.total || 0) + oto.price;
      localStorage.setItem("daprileOrder", JSON.stringify(order));

      router.push("/thank-you");
    } catch (err) {
      console.error("OTO error:", err);
      router.push("/thank-you");
    }
  }

  function handleSkip() {
    trackCustom("OtoSkipped");
    router.push("/thank-you");
  }

  if (!oto) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(180deg, #FAF7F2 0%, #F5F0E8 100%)" }}>
        <p className="text-warm-gray">Caricamento...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #FAF7F2 0%, #F5F0E8 100%)" }}>
      {/* Urgency timer bar */}
      <div className="sticky top-0 z-50 bg-brand-red text-white py-2.5 px-4">
        <p className="text-center text-xs md:text-sm tracking-wider uppercase">
          Offerta riservata &mdash; scade tra{" "}
          <span className="font-bold tabular-nums">
            {String(Math.floor(secondsLeft / 60)).padStart(2, "0")}:{String(secondsLeft % 60).padStart(2, "0")}
          </span>
        </p>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-cream-dark/50 py-4 px-4">
        <div className="max-w-3xl mx-auto flex items-center justify-center">
          <Image src="/logo.webp" alt="D'Aprile Caffè" width={100} height={100} className="h-12 md:h-14 w-auto" priority />
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-10 md:py-14">
        {/* Conferma */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-green-700 text-sm font-medium">Ordine confermato!</p>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8"
        >
          <h1 className="font-heading text-2xl md:text-3xl text-coffee-dark font-bold leading-snug">
            {firstName ? `${firstName}, t` : "T"}i va di provare anche una miscela più <span className="text-brand-red">{oto.aggettivo}</span>? ☕
          </h1>
          <p className="text-warm-gray text-sm mt-2">{oto.motivo}</p>
        </motion.div>

        {/* Prodotto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl border-2 border-gold/40 p-6 shadow-lg shadow-gold/10 text-center mb-6 relative overflow-hidden"
        >
          {/* Badge esclusiva */}
          <div className="absolute top-0 left-0 right-0 py-1.5 px-4 bg-gradient-to-r from-gold-dark via-gold to-gold-dark text-center">
            <span className="text-[11px] font-bold text-white uppercase tracking-[0.2em]">
              Offerta esclusiva solo per te
            </span>
          </div>
          <p className="text-coffee-dark font-bold text-lg mb-1 mt-6">
            Miscela {oto.miscela}
          </p>
          <p className="text-warm-gray text-sm mb-5">
            {oto.quantity}
          </p>

          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="text-warm-gray/40 line-through text-base tabular-nums">&euro;{oto.compareAtPrice.toFixed(2)}</span>
            <span className="text-3xl font-bold text-coffee-dark tabular-nums">&euro;{oto.price.toFixed(2)}</span>
          </div>

          <p className="text-xs text-green-700 mb-6">
            La spediamo insieme al tuo ordine — zero costi extra
          </p>

          {/* CTA */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToOrder}
            disabled={isAdding}
            className="w-full py-5 bg-green-700 hover:bg-green-600 disabled:bg-green-700/50 text-white font-bold text-lg rounded-xl transition-all cursor-pointer shadow-lg shadow-green-700/25 uppercase tracking-widest disabled:cursor-not-allowed"
          >
            {isAdding ? (
              <span className="flex items-center justify-center gap-3">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                Fatto!
              </span>
            ) : (
              <>
                <span className="block">Sì, aggiungila!</span>
                <span className="block text-xs font-normal tracking-normal normal-case text-white/60 mt-1">Un click — senza reinserire i dati</span>
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Skip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-4"
        >
          <button
            onClick={handleSkip}
            className="text-warm-gray/60 hover:text-coffee text-base transition-colors cursor-pointer underline underline-offset-4"
          >
            No grazie, vai al riepilogo →
          </button>
        </motion.div>
      </main>
    </div>
  );
}

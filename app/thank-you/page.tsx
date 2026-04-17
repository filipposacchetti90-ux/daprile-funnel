"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { trackPurchase } from "../../lib/pixel";

interface OrderData {
  orderNumber?: string;
  email: string;
  firstName: string;
  product: string;
  quantity: string;
  total: number;
  otoAdded?: boolean;
  otoProduct?: string;
  otoPrice?: number;
}

export default function ThankYouPage() {
  const [order, setOrder] = useState<OrderData | null>(null);
  const tracked = useRef(false);

  useEffect(() => {
    const saved = localStorage.getItem("daprileOrder");
    if (saved) {
      const data = JSON.parse(saved) as OrderData;
      setOrder(data);

      // Fire Purchase event once
      if (!tracked.current) {
        tracked.current = true;
        trackPurchase({
          value: data.total,
          currency: "EUR",
          content_name: data.product,
          num_items: data.otoAdded ? 2 : 1,
        });
      }

      // Clean up quiz/timer data
      localStorage.removeItem("daprileQuiz");
      localStorage.removeItem("daprileFunnelTimer");
    }
  }, []);

  const basePrice = order ? (order.otoAdded ? order.total - (order.otoPrice || 0) : order.total) : 0;

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #FAF7F2 0%, #F5F0E8 100%)" }}>
      {/* Header */}
      <header className="bg-white border-b border-cream-dark/50 py-4 px-4">
        <div className="max-w-3xl mx-auto flex items-center justify-center">
          <Image src="/logo.webp" alt="D'Aprile Caffè" width={100} height={100} className="h-12 md:h-14 w-auto" priority />
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 py-12 md:py-20">
        {/* Success icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="w-20 h-20 mx-auto mb-8 rounded-full bg-green-100 flex items-center justify-center"
        >
          <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>

        {/* Main message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-10"
        >
          <h1 className="font-heading text-3xl md:text-4xl text-coffee-dark font-bold mb-3">
            Grazie{order?.firstName ? `, ${order.firstName}` : ""}!
          </h1>
          <p className="text-lg text-coffee/60">
            Il tuo ordine è stato confermato con successo.
          </p>
        </motion.div>

        {/* Order details */}
        {order && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl border border-cream-dark/50 p-6 md:p-8 shadow-sm mb-8"
          >
            {order.orderNumber && (
              <p className="text-xs text-gold-dark uppercase tracking-[0.2em] font-semibold mb-4">
                Ordine #{order.orderNumber}
              </p>
            )}

            <div className="space-y-4">
              {/* Main product */}
              <div className="flex justify-between items-center">
                <div className="min-w-0 mr-3">
                  <p className="text-base font-semibold text-coffee-dark">{order.product}</p>
                  <p className="text-sm text-warm-gray">{order.quantity}</p>
                </div>
                <p className="text-lg font-bold text-coffee-dark tabular-nums flex-shrink-0">
                  &euro;{basePrice.toFixed(2)}
                </p>
              </div>

              {/* OTO product */}
              {order.otoAdded && order.otoProduct && (
                <div className="flex justify-between items-center pt-2 border-t border-cream-dark/20">
                  <div className="min-w-0 mr-3">
                    <p className="text-base font-semibold text-coffee-dark">{order.otoProduct}</p>
                    <p className="text-xs text-green-700">Aggiunto con offerta speciale</p>
                  </div>
                  <p className="text-lg font-bold text-coffee-dark tabular-nums flex-shrink-0">
                    &euro;{(order.otoPrice || 0).toFixed(2)}
                  </p>
                </div>
              )}

              <div className="border-t border-cream-dark/30 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-warm-gray">Spedizione</span>
                  <span className="text-green-700 font-medium">Gratuita</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-warm-gray">Consegna stimata</span>
                  <span className="text-coffee-dark font-medium">2-4 giorni lavorativi</span>
                </div>
              </div>

              <div className="border-t border-cream-dark/30 pt-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-warm-gray uppercase tracking-wider">Totale pagato</span>
                  <span className="text-2xl font-bold text-coffee-dark tabular-nums">&euro;{order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* What happens next */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white rounded-2xl border border-cream-dark/50 p-6 md:p-8 shadow-sm mb-8"
        >
          <h2 className="font-heading text-lg text-coffee-dark mb-4">Cosa succede ora?</h2>
          <div className="space-y-4">
            <Step number={1} title="Conferma via email" description={`Riceverai la conferma a ${order?.email || "la tua email"}`} />
            <Step number={2} title="Preparazione" description="Il tuo caffè viene selezionato e confezionato a mano" />
            <Step number={3} title="Spedizione" description="Riceverai il tracking non appena il pacco parte" />
            <Step number={4} title="Goditi il tuo caffè" description="Il vero caffè artigianale, direttamente a casa tua" />
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <p className="text-warm-gray text-sm mb-4">Hai domande? Scrivici a</p>
          <a href="mailto:info@daprilecaffe.it" className="text-coffee-dark font-medium underline underline-offset-4 hover:text-brand-red transition-colors">
            info@daprilecaffe.it
          </a>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-cream-dark/30 py-4 px-4">
        <p className="text-center text-[9px] md:text-[11px] text-warm-gray/40 whitespace-nowrap">
          &copy; {new Date().getFullYear()} D&apos;Aprile Caff&egrave; — Torrefazione dal 1962 &nbsp;|&nbsp;{" "}
          <a href="https://daprilecaffe.it/policies/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-coffee/50 transition-colors">Privacy</a> &nbsp;|&nbsp;{" "}
          <a href="https://daprilecaffe.it/policies/legal-notice" target="_blank" rel="noopener noreferrer" className="hover:text-coffee/50 transition-colors">Cookie</a> &nbsp;|&nbsp;{" "}
          <a href="https://daprilecaffe.it/policies/terms-of-service" target="_blank" rel="noopener noreferrer" className="hover:text-coffee/50 transition-colors">Termini</a>
        </p>
      </footer>
    </div>
  );
}

function Step({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div className="flex gap-4">
      <div className="w-8 h-8 rounded-full bg-cream flex items-center justify-center flex-shrink-0">
        <span className="text-sm font-bold text-coffee-dark">{number}</span>
      </div>
      <div>
        <p className="text-base font-medium text-coffee-dark">{title}</p>
        <p className="text-sm text-warm-gray">{description}</p>
      </div>
    </div>
  );
}

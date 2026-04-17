"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const names = [
  "Maria R.", "Giuseppe M.", "Anna L.", "Giovanni P.", "Rosa D.",
  "Antonio B.", "Francesca S.", "Marco T.", "Lucia V.", "Paolo C.",
  "Angela F.", "Roberto G.", "Teresa N.", "Salvatore A.", "Carmela I.",
  "Vincenzo E.", "Rita O.", "Francesco Z.", "Giovanna U.", "Luigi Q.",
  "Patrizia H.", "Carlo J.", "Elena K.", "Massimo W.", "Daniela X.",
  "Stefano Y.", "Laura B.", "Piero M.", "Sandra V.", "Alfredo R.",
];

const cities = [
  "Napoli", "Roma", "Milano", "Torino", "Bari", "Palermo",
  "Firenze", "Bologna", "Catania", "Genova", "Verona", "Padova",
  "Brescia", "Parma", "Modena", "Lecce", "Salerno", "Pescara",
];

interface Notification {
  id: number;
  name: string;
  city: string;
  type: "completing" | "completed";
}

let idCounter = 0;

export default function OrderNotifications() {
  const [notification, setNotification] = useState<Notification | null>(null);
  const [mounted, setMounted] = useState(false);

  const showNotification = useCallback(() => {
    const name = names[Math.floor(Math.random() * names.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const type = Math.random() > 0.4 ? "completed" : "completing";

    const notif: Notification = {
      id: idCounter++,
      name,
      city,
      type,
    };

    setNotification(notif);

    setTimeout(() => {
      setNotification((prev) => (prev?.id === notif.id ? null : prev));
    }, 4000);
  }, []);

  useEffect(() => {
    setMounted(true);

    // Prime 3 notifiche ravvicinate, poi rallenta
    const t1 = setTimeout(() => showNotification(), 2000);
    const t2 = setTimeout(() => showNotification(), 6000);
    const t3 = setTimeout(() => showNotification(), 11000);

    // Dopo le prime 3, ogni 15-25 secondi
    const interval = setInterval(
      () => showNotification(),
      Math.floor(Math.random() * 10000) + 15000
    );

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearInterval(interval);
    };
  }, [showNotification]);

  if (!mounted) return null;

  return (
    <div className="fixed top-14 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-6 md:top-16 z-40 pointer-events-none w-full max-w-xs px-4 md:px-0">
      <AnimatePresence>
        {notification && (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="bg-white rounded-2xl px-4 py-3.5 shadow-xl shadow-coffee/15 border border-coffee/[0.06]"
          >
            <div className="flex items-center gap-3">
              {/* Cart icon circle */}
              <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center flex-shrink-0">
                <span className="text-lg">
                  {notification.type === "completed" ? "✅" : "🛒"}
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm text-coffee-dark leading-snug font-medium">
                  {notification.name}
                  <span className="text-coffee/40 font-normal"> da {notification.city}</span>
                </p>
                <p className="text-xs text-coffee/50 mt-0.5">
                  {notification.type === "completed"
                    ? "Ha completato l'ordine! 🎉"
                    : "Sta completando l'ordine..."}
                </p>
              </div>

              {/* Timestamp */}
              <span className="text-[10px] text-coffee/30 flex-shrink-0 self-start mt-0.5">
                ora
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

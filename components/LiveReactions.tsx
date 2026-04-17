"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const names = [
  "Maria", "Giuseppe", "Anna", "Giovanni", "Rosa", "Antonio",
  "Francesca", "Marco", "Lucia", "Paolo", "Angela", "Roberto",
  "Teresa", "Salvatore", "Carmela", "Vincenzo", "Rita", "Francesco",
  "Giovanna", "Luigi", "Patrizia", "Carlo", "Elena", "Massimo",
  "Daniela", "Stefano", "Laura", "Piero", "Sandra", "Alfredo",
  "Giulia", "Domenico", "Silvana", "Bruno", "Paola", "Sergio",
];

const reactions = [
  { emoji: "😱", text: "ha reagito con" },
  { emoji: "😳", text: "ha reagito con" },
  { emoji: "🤯", text: "ha reagito con" },
  { emoji: "😡", text: "ha reagito con" },
  { emoji: "😤", text: "ha reagito con" },
  { emoji: "😧", text: "ha reagito con" },
  { emoji: "🫣", text: "ha reagito con" },
  { emoji: "😲", text: "ha reagito con" },
  { emoji: "👀", text: "ha reagito con" },
  { emoji: "🔥", text: "ha reagito con" },
  { emoji: "💔", text: "ha reagito con" },
  { emoji: "⚠️", text: "ha reagito con" },
];

const comments = [
  { emoji: "😱", text: "\"Non ci posso credere...\"" },
  { emoji: "😡", text: "\"Vergognoso!\"" },
  { emoji: "🤯", text: "\"Ma è davvero così?!\"" },
  { emoji: "😳", text: "\"Lo compro da anni...\"" },
  { emoji: "😤", text: "\"Dovrebbero dirlo in TV\"" },
  { emoji: "💔", text: "\"Mi sento presa in giro\"" },
  { emoji: "👀", text: "\"Condividete questo video\"" },
  { emoji: "🔥", text: "\"Finalmente qualcuno che parla!\"" },
  { emoji: "😧", text: "\"Non lo sapevo...\"" },
  { emoji: "🫣", text: "\"Il mio caffè preferito è nella lista...\"" },
];

interface Notification {
  id: number;
  name: string;
  emoji: string;
  text: string;
}

let idCounter = 0;

export default function LiveReactions() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [mounted, setMounted] = useState(false);

  const addNotification = useCallback(() => {
    const name = names[Math.floor(Math.random() * names.length)];
    const isComment = Math.random() > 0.6;
    const pool = isComment ? comments : reactions;
    const reaction = pool[Math.floor(Math.random() * pool.length)];

    const notif: Notification = {
      id: idCounter++,
      name,
      emoji: reaction.emoji,
      text: isComment ? reaction.text : `${reaction.text} ${reaction.emoji}`,
    };

    setNotifications((prev) => [...prev.slice(-2), notif]);

    // Auto-remove after 4 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== notif.id));
    }, 4000);
  }, []);

  useEffect(() => {
    setMounted(true);

    // First notification after 5 seconds
    const initialTimeout = setTimeout(() => {
      addNotification();
    }, 5000);

    // Then every 4-9 seconds
    const interval = setInterval(
      () => addNotification(),
      Math.floor(Math.random() * 5000) + 4000
    );

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [addNotification]);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-20 left-4 z-40 flex flex-col gap-2 pointer-events-none max-w-[280px] md:max-w-xs">
      <AnimatePresence>
        {notifications.map((notif) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, x: -40, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.95 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="bg-espresso/90 backdrop-blur-md border border-white/[0.08] rounded-full px-4 py-2 shadow-lg shadow-black/30"
          >
            <p className="text-[11px] md:text-xs text-cream/80 whitespace-nowrap overflow-hidden text-ellipsis">
              <span className="font-semibold text-white">{notif.name}</span>{" "}
              <span className="text-cream/50">{notif.text}</span>
            </p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

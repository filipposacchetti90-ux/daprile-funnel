"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full py-2 px-4 flex justify-center bg-white shadow-md shadow-black/10"
    >
      <Image
        src="/logo.webp"
        alt="D'Aprile Caffè — Torrefazione dal 1962"
        width={120}
        height={120}
        className="h-12 md:h-14 w-auto"
        priority
      />
    </motion.header>
  );
}

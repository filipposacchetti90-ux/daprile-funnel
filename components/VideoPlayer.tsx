"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface VideoPlayerProps {
  src?: string;
  embedUrl?: string;
}

export default function VideoPlayer({ src, embedUrl }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const wrapperClass =
    "w-full max-w-3xl mx-auto aspect-video rounded-2xl overflow-hidden border border-white/[0.06] video-glow relative";

  if (embedUrl) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={wrapperClass}
      >
        <iframe
          src={embedUrl}
          className="w-full h-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </motion.div>
    );
  }

  if (src) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={wrapperClass}
      >
        <video
          src={src}
          controls
          playsInline
          className="w-full h-full object-cover"
        />
      </motion.div>
    );
  }

  // Placeholder
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className={`${wrapperClass} cursor-pointer group`}
      onClick={() => setIsPlaying(!isPlaying)}
    >
      {/* Cinematic gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-coffee-dark via-espresso to-black" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

      {/* Subtle red ambient light from bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-red/[0.06] via-transparent to-transparent" />

      {/* Vignette inside */}
      <div className="absolute inset-0 shadow-[inset_0_0_100px_30px_rgba(0,0,0,0.5)]" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          {!isPlaying ? (
            <>
              {/* Play button — cinematic, large */}
              <div className="relative mx-auto mb-5">
                {/* Outer pulse ring */}
                <div className="absolute inset-0 w-22 h-22 md:w-28 md:h-28 rounded-full border border-brand-red/20 scale-125 animate-ping opacity-20 -m-1 md:-m-2" />
                {/* Main button */}
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-white/20 flex items-center justify-center group-hover:border-white/40 group-hover:bg-white/[0.06] transition-all duration-500 backdrop-blur-sm">
                  <svg
                    className="w-8 h-8 md:w-10 md:h-10 text-white/70 group-hover:text-white ml-1 transition-all duration-300 drop-shadow-lg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <p className="text-white/40 text-xs md:text-sm tracking-[0.2em] uppercase">
                Guarda il Documentario
              </p>
            </>
          ) : (
            <p className="text-white/50 text-lg">Video in arrivo...</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

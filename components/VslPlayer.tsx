"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

const PLAYER_ID = "vid-69e28540081db0f7b1d127d7";
const SCRIPT_SRC =
  "https://scripts.converteai.net/0431edb9-ab92-4806-9c5b-b53cfef7582a/players/69e28540081db0f7b1d127d7/v4/player.js";

type Props = {
  /** Called when the underlying <video> pauses/plays. */
  onPlayingChange?: (playing: boolean) => void;
  /** Called at ~250ms cadence with the current video position in seconds. */
  onTimeUpdate?: (currentTime: number) => void;
};

/**
 * VTurb SmartPlayer wrapper. Polls the underlying <video> element (which the
 * VTurb web component mounts in either its shadowRoot or light DOM once the
 * player script boots) to report play/pause + currentTime back to the parent.
 * Polling is more robust than listening to the custom-element's own events,
 * which don't always bubble out of the shadow DOM.
 */
export default function VslPlayer({ onPlayingChange, onTimeUpdate }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const lastPlayingRef = useRef<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    const findVideo = (): HTMLVideoElement | null => {
      const host = rootRef.current?.querySelector<HTMLElement>("vturb-smartplayer");
      if (!host) return null;
      return (host.shadowRoot?.querySelector("video") as HTMLVideoElement | null) ?? host.querySelector("video");
    };

    const interval = setInterval(() => {
      if (cancelled) return;
      const video = findVideo();
      if (!video) return;

      const playing = !video.paused && !video.ended && video.readyState > 2;
      if (playing !== lastPlayingRef.current) {
        lastPlayingRef.current = playing;
        onPlayingChange?.(playing);
      }
      onTimeUpdate?.(video.currentTime);
    }, 250);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [onPlayingChange, onTimeUpdate]);

  return (
    <>
      {/* Hoisted to <head> by React 19 — speeds up first paint of the VSL */}
      <link rel="preload" as="script" href={SCRIPT_SRC} />
      <link rel="dns-prefetch" href="https://cdn.converteai.net" />
      <link rel="dns-prefetch" href="https://scripts.converteai.net" />

      <div ref={rootRef} className="w-full max-w-7xl mx-auto aspect-video rounded-2xl overflow-hidden border border-white/[0.06] video-glow relative">
        <vturb-smartplayer
          id={PLAYER_ID}
          style={{ display: "block", margin: "0 auto", width: "100%" }}
        />
      </div>

      <Script id="vturb-player" src={SCRIPT_SRC} strategy="afterInteractive" />
    </>
  );
}

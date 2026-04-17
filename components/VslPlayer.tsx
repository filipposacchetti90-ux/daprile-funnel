"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

const PLAYER_ID = "vid-69e28540081db0f7b1d127d7";
const SCRIPT_SRC =
  "https://scripts.converteai.net/0431edb9-ab92-4806-9c5b-b53cfef7582a/players/69e28540081db0f7b1d127d7/v4/player.js";

type Props = {
  onPlayingChange?: (playing: boolean) => void;
  onTimeUpdate?: (currentTime: number) => void;
};

function resolveVideo(e: Event): HTMLVideoElement | null {
  const path = (e.composedPath?.() ?? []) as EventTarget[];
  for (const node of path) {
    if (node instanceof HTMLVideoElement) return node;
  }
  return e.target instanceof HTMLVideoElement ? e.target : null;
}

/**
 * VTurb bridge. Two independent strategies kept in parallel:
 *
 *   1. Real media events. `play`, `pause`, `timeupdate`, `ended` are composed
 *      events, so we listen on `document` with capture:true and pick up the
 *      inner <video> via composedPath() regardless of shadow-DOM depth. When
 *      these fire we have the true currentTime of the video.
 *
 *   2. Click-based fallback. Some renderers (HLS in canvas, custom MediaSource
 *      plumbing, closed shadow roots on specific browsers) never fire media
 *      events we can observe. In that case we start a real-time counter on
 *      the viewer's first click inside the player and tick that counter.
 *      Accuracy is lost if the viewer pauses, but most VSL viewers don't.
 *
 * The two strategies never fight — whichever fires first wins, and any later
 * real `timeupdate` overrides the real-time counter because it always carries
 * the authoritative video currentTime.
 */
export default function VslPlayer({ onPlayingChange, onTimeUpdate }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const lastPlayingRef = useRef<boolean | null>(null);
  const fallbackStartRef = useRef<number | null>(null); // ms timestamp when fallback counter started
  const fallbackIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sawRealVideoRef = useRef(false); // once true, we stop the fallback counter

  useEffect(() => {
    const emitPlaying = (playing: boolean) => {
      if (playing !== lastPlayingRef.current) {
        lastPlayingRef.current = playing;
        onPlayingChange?.(playing);
      }
    };

    const stopFallback = () => {
      if (fallbackIntervalRef.current) {
        clearInterval(fallbackIntervalRef.current);
        fallbackIntervalRef.current = null;
      }
    };

    // --- Strategy 1: real media events ---
    const onPlay = (e: Event) => {
      const v = resolveVideo(e);
      if (!v) return;
      sawRealVideoRef.current = true;
      stopFallback();
      emitPlaying(true);
      onTimeUpdate?.(v.currentTime);
    };
    const onPause = (e: Event) => {
      const v = resolveVideo(e);
      if (!v) return;
      sawRealVideoRef.current = true;
      emitPlaying(false);
    };
    const onTime = (e: Event) => {
      const v = resolveVideo(e);
      if (!v) return;
      sawRealVideoRef.current = true;
      stopFallback();
      onTimeUpdate?.(v.currentTime);
    };
    const onEnded = () => emitPlaying(false);

    document.addEventListener("play", onPlay, true);
    document.addEventListener("pause", onPause, true);
    document.addEventListener("timeupdate", onTime, true);
    document.addEventListener("ended", onEnded, true);

    // --- Strategy 2: click-based fallback real-time counter ---
    const wrapper = wrapperRef.current;
    const startFallback = () => {
      if (sawRealVideoRef.current) return; // real events already working
      if (fallbackStartRef.current !== null) return; // already started
      fallbackStartRef.current = Date.now();
      emitPlaying(true);
      fallbackIntervalRef.current = setInterval(() => {
        if (sawRealVideoRef.current) return; // real events took over
        if (fallbackStartRef.current === null) return;
        const elapsed = (Date.now() - fallbackStartRef.current) / 1000;
        onTimeUpdate?.(elapsed);
      }, 500);
    };
    wrapper?.addEventListener("click", startFallback);

    return () => {
      document.removeEventListener("play", onPlay, true);
      document.removeEventListener("pause", onPause, true);
      document.removeEventListener("timeupdate", onTime, true);
      document.removeEventListener("ended", onEnded, true);
      wrapper?.removeEventListener("click", startFallback);
      stopFallback();
    };
  }, [onPlayingChange, onTimeUpdate]);

  return (
    <>
      <link rel="preload" as="script" href={SCRIPT_SRC} />
      <link rel="dns-prefetch" href="https://cdn.converteai.net" />
      <link rel="dns-prefetch" href="https://scripts.converteai.net" />

      <div
        ref={wrapperRef}
        className="w-full max-w-7xl mx-auto aspect-video rounded-2xl overflow-hidden border border-white/[0.06] video-glow relative"
      >
        <vturb-smartplayer
          id={PLAYER_ID}
          style={{ display: "block", margin: "0 auto", width: "100%" }}
        />
      </div>

      <Script id="vturb-player" src={SCRIPT_SRC} strategy="afterInteractive" />
    </>
  );
}

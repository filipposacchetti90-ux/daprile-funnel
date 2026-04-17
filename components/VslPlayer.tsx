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

/** Walk the document (including shadow roots) and collect every <video> tag. */
function collectVideosDeep(root: Document | ShadowRoot): HTMLVideoElement[] {
  const found: HTMLVideoElement[] = [];
  // Direct matches in this root
  root.querySelectorAll("video").forEach((v) => found.push(v as HTMLVideoElement));
  // Recurse into shadow roots
  root.querySelectorAll("*").forEach((el) => {
    const sr = (el as HTMLElement).shadowRoot;
    if (sr) found.push(...collectVideosDeep(sr));
  });
  return found;
}

/**
 * VTurb mounts its <video> inside a shadow root that isn't necessarily a
 * direct child of our wrapper, so we search the whole document (walking
 * into shadow DOMs) and pick the first video with a source attached.
 */
function pickActiveVideo(): HTMLVideoElement | null {
  const videos = collectVideosDeep(document);
  if (videos.length === 0) return null;
  return videos.find((v) => !v.paused) || videos.find((v) => v.currentSrc || v.src) || videos[0];
}

export default function VslPlayer({ onPlayingChange, onTimeUpdate }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const lastPlayingRef = useRef<boolean | null>(null);
  const warnedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    const start = Date.now();

    const interval = setInterval(() => {
      if (cancelled) return;
      const video = pickActiveVideo();

      if (!video) {
        // Warn after 15s if we still haven't found one — useful in DevTools.
        if (!warnedRef.current && Date.now() - start > 15000) {
          warnedRef.current = true;
          console.warn("[VslPlayer] No <video> element found after 15s. VTurb player may be using a non-standard renderer.");
        }
        return;
      }

      const playing = !video.paused && !video.ended && video.readyState >= 2;
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

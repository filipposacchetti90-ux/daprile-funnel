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

/** Resolve the real <video> element, piercing shadow roots via composedPath. */
function resolveVideo(e: Event): HTMLVideoElement | null {
  const path = (e.composedPath?.() ?? []) as EventTarget[];
  for (const node of path) {
    if (node instanceof HTMLVideoElement) return node;
  }
  return e.target instanceof HTMLVideoElement ? e.target : null;
}

/**
 * Bridges VTurb's internal <video> element to the parent via standard HTMLMediaElement
 * events. Media events are "composed", so even when the <video> is inside VTurb's
 * shadow DOM the events bubble up to document — we listen there with capture:true
 * and use composedPath() to recover the inner video.
 *
 * Falls back to a 500ms poll that deep-searches the DOM tree for a <video> tag, in
 * case the timeupdate events fire too infrequently or not at all on this renderer.
 */
export default function VslPlayer({ onPlayingChange, onTimeUpdate }: Props) {
  const lastPlayingRef = useRef<boolean | null>(null);
  const latestVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const emitPlaying = (playing: boolean) => {
      if (playing !== lastPlayingRef.current) {
        lastPlayingRef.current = playing;
        onPlayingChange?.(playing);
      }
    };

    const onPlay = (e: Event) => {
      const v = resolveVideo(e);
      if (!v) return;
      latestVideoRef.current = v;
      emitPlaying(true);
      onTimeUpdate?.(v.currentTime);
    };
    const onPause = (e: Event) => {
      const v = resolveVideo(e);
      if (!v) return;
      latestVideoRef.current = v;
      emitPlaying(false);
    };
    const onTime = (e: Event) => {
      const v = resolveVideo(e);
      if (!v) return;
      latestVideoRef.current = v;
      onTimeUpdate?.(v.currentTime);
    };
    const onEnded = () => emitPlaying(false);

    document.addEventListener("play", onPlay, true);
    document.addEventListener("pause", onPause, true);
    document.addEventListener("timeupdate", onTime, true);
    document.addEventListener("ended", onEnded, true);

    // Fallback poll — deep walk into shadow roots. Useful if some browser
    // decides not to bubble the media events out of a closed shadow root,
    // or if the custom element re-mounts.
    const collectVideosDeep = (root: Document | ShadowRoot): HTMLVideoElement[] => {
      const out: HTMLVideoElement[] = [];
      root.querySelectorAll("video").forEach((v) => out.push(v as HTMLVideoElement));
      root.querySelectorAll("*").forEach((el) => {
        const sr = (el as HTMLElement).shadowRoot;
        if (sr) out.push(...collectVideosDeep(sr));
      });
      return out;
    };
    const pollInterval = setInterval(() => {
      if (latestVideoRef.current) {
        const v = latestVideoRef.current;
        const playing = !v.paused && !v.ended && v.readyState >= 2;
        emitPlaying(playing);
        onTimeUpdate?.(v.currentTime);
        return;
      }
      const videos = collectVideosDeep(document);
      if (videos.length === 0) return;
      latestVideoRef.current =
        videos.find((v) => !v.paused) || videos.find((v) => v.currentSrc || v.src) || videos[0];
    }, 500);

    return () => {
      document.removeEventListener("play", onPlay, true);
      document.removeEventListener("pause", onPause, true);
      document.removeEventListener("timeupdate", onTime, true);
      document.removeEventListener("ended", onEnded, true);
      clearInterval(pollInterval);
    };
  }, [onPlayingChange, onTimeUpdate]);

  return (
    <>
      <link rel="preload" as="script" href={SCRIPT_SRC} />
      <link rel="dns-prefetch" href="https://cdn.converteai.net" />
      <link rel="dns-prefetch" href="https://scripts.converteai.net" />

      <div className="w-full max-w-7xl mx-auto aspect-video rounded-2xl overflow-hidden border border-white/[0.06] video-glow relative">
        <vturb-smartplayer
          id={PLAYER_ID}
          style={{ display: "block", margin: "0 auto", width: "100%" }}
        />
      </div>

      <Script id="vturb-player" src={SCRIPT_SRC} strategy="afterInteractive" />
    </>
  );
}

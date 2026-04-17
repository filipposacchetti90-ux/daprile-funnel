/* ─── Facebook Pixel (client-side) ─── */
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || "559306647025169";

// Declare fbq on window
declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & {
      callMethod?: (...args: unknown[]) => void;
      queue?: unknown[][];
      loaded?: boolean;
      version?: string;
      push?: unknown;
    };
    _fbq?: unknown;
  }
}

function getFbq(): ((...args: unknown[]) => void) | null {
  if (typeof window === "undefined") return null;
  return window.fbq ?? null;
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return m ? decodeURIComponent(m[1]) : null;
}

/* fbp: set by fbq automatically. fbc: derived from ?fbclid= on landing, persisted in cookie. */
function captureFbc() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const fbclid = params.get("fbclid");
  if (fbclid && !getCookie("_fbc")) {
    const value = `fb.1.${Date.now()}.${fbclid}`;
    // 90 day cookie
    document.cookie = `_fbc=${value}; path=/; max-age=${60 * 60 * 24 * 90}; samesite=lax`;
  }
}

/* Random event id for client+CAPI dedup */
export function newEventId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `ev-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

/* ─── Initialize pixel with optional Advanced Matching (called once in layout) ─── */
export function initPixel(advancedMatching?: { em?: string; ph?: string; fn?: string; ln?: string }) {
  if (typeof window === "undefined") return;
  captureFbc();

  if (window.fbq) {
    // already initialised — re-call init with AM if we have new data
    if (advancedMatching) window.fbq("init", FB_PIXEL_ID, advancedMatching);
    return;
  }

  const n = function (...args: unknown[]) {
    const anyN = n as unknown as { callMethod?: (...a: unknown[]) => void; queue: unknown[][] };
    if (anyN.callMethod) {
      anyN.callMethod.apply(n, args);
    } else {
      anyN.queue.push(args);
    }
  } as Window["fbq"] & Record<string, unknown>;

  if (n) {
    (n as Record<string, unknown>).push = n;
    (n as Record<string, unknown>).loaded = true;
    (n as Record<string, unknown>).version = "2.0";
    (n as Record<string, unknown>).queue = [];
    window.fbq = n;
    window._fbq = n;
  }

  const s = document.createElement("script");
  s.async = true;
  s.src = "https://connect.facebook.net/en_US/fbevents.js";
  const first = document.getElementsByTagName("script")[0];
  first?.parentNode?.insertBefore(s, first);

  const fbq = window.fbq;
  if (fbq) {
    if (advancedMatching) fbq("init", FB_PIXEL_ID, advancedMatching);
    else fbq("init", FB_PIXEL_ID);
  }
}

/* ─── Track events (all accept optional eventID for CAPI dedup) ─── */
type TrackOpts = { eventID?: string };

export function pageView(opts?: TrackOpts) {
  const fbq = getFbq();
  if (fbq) fbq("track", "PageView", {}, opts);
}

export function trackViewContent(params?: { content_name?: string; content_type?: string; value?: number; currency?: string }, opts?: TrackOpts) {
  const fbq = getFbq();
  if (fbq) fbq("track", "ViewContent", params, opts);
}

export function trackLead(params?: { content_name?: string; value?: number; currency?: string }, opts?: TrackOpts) {
  const fbq = getFbq();
  if (fbq) fbq("track", "Lead", params, opts);
}

export function trackInitiateCheckout(params?: { content_name?: string; value?: number; currency?: string; num_items?: number; content_ids?: string[] }, opts?: TrackOpts) {
  const fbq = getFbq();
  if (fbq) fbq("track", "InitiateCheckout", params, opts);
}

export function trackAddToCart(params?: { content_name?: string; value?: number; currency?: string; content_ids?: string[] }, opts?: TrackOpts) {
  const fbq = getFbq();
  if (fbq) fbq("track", "AddToCart", params, opts);
}

export function trackPurchase(params: { value: number; currency: string; content_name?: string; content_ids?: string[]; num_items?: number }, opts?: TrackOpts) {
  const fbq = getFbq();
  if (fbq) fbq("track", "Purchase", params, opts);
}

export function trackCustom(eventName: string, params?: Record<string, unknown>, opts?: TrackOpts) {
  const fbq = getFbq();
  if (fbq) fbq("trackCustom", eventName, params, opts);
}

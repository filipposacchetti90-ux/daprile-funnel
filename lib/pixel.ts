/* ─── Facebook Pixel ─── */
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

/* ─── Initialize pixel (called once in layout) ─── */
export function initPixel() {
  if (typeof window === "undefined") return;
  if (window.fbq) return; // already initialized

  // Build the fbq shim
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
  if (fbq) fbq("init", FB_PIXEL_ID);
}

/* ─── Track events ─── */
export function pageView() {
  const fbq = getFbq();
  if (fbq) fbq("track", "PageView");
}

export function trackViewContent(params?: { content_name?: string; content_type?: string; value?: number; currency?: string }) {
  const fbq = getFbq();
  if (fbq) fbq("track", "ViewContent", params);
}

export function trackLead(params?: { content_name?: string; value?: number; currency?: string }) {
  const fbq = getFbq();
  if (fbq) fbq("track", "Lead", params);
}

export function trackInitiateCheckout(params?: { content_name?: string; value?: number; currency?: string; num_items?: number }) {
  const fbq = getFbq();
  if (fbq) fbq("track", "InitiateCheckout", params);
}

export function trackAddToCart(params?: { content_name?: string; value?: number; currency?: string; content_ids?: string[] }) {
  const fbq = getFbq();
  if (fbq) fbq("track", "AddToCart", params);
}

export function trackPurchase(params: { value: number; currency: string; content_name?: string; content_ids?: string[]; num_items?: number }) {
  const fbq = getFbq();
  if (fbq) fbq("track", "Purchase", params);
}

export function trackCustom(eventName: string, params?: Record<string, unknown>) {
  const fbq = getFbq();
  if (fbq) fbq("trackCustom", eventName, params);
}

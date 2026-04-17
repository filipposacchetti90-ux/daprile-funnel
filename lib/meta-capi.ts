/* ─── Meta Conversion API (CAPI) — server-side event helper ─── */

import crypto from "crypto";

const PIXEL_ID = process.env.META_PIXEL_ID || "559306647025169";
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN || "";
const TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE || ""; // optional, for Test Events tab

export function sha256(input: string): string {
  return crypto.createHash("sha256").update(input.trim().toLowerCase()).digest("hex");
}

type UserData = {
  email?: string | null;
  phone?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  city?: string | null;
  zip?: string | null;
  country?: string | null;
  fbp?: string | null;
  fbc?: string | null;
  clientIp?: string | null;
  userAgent?: string | null;
};

function buildUserData(u: UserData) {
  const out: Record<string, string | string[]> = {};
  if (u.email) out.em = sha256(u.email);
  if (u.phone) out.ph = sha256(u.phone.replace(/[^0-9]/g, ""));
  if (u.firstName) out.fn = sha256(u.firstName);
  if (u.lastName) out.ln = sha256(u.lastName);
  if (u.city) out.ct = sha256(u.city);
  if (u.zip) out.zp = sha256(u.zip);
  if (u.country) out.country = sha256(u.country);
  if (u.fbp) out.fbp = u.fbp;
  if (u.fbc) out.fbc = u.fbc;
  if (u.clientIp) out.client_ip_address = u.clientIp;
  if (u.userAgent) out.client_user_agent = u.userAgent;
  return out;
}

export type CapiEvent = {
  eventName: "Purchase" | "Lead" | "AddToCart" | "InitiateCheckout" | "ViewContent";
  eventId: string; // for deduplication with client-side pixel
  eventTime?: number; // unix seconds, defaults to now
  eventSourceUrl?: string;
  userData: UserData;
  customData?: {
    value?: number;
    currency?: string;
    content_name?: string;
    content_ids?: string[];
    num_items?: number;
    order_id?: string;
  };
};

export async function sendCapiEvent(event: CapiEvent): Promise<{ ok: boolean; error?: string; response?: unknown }> {
  if (!ACCESS_TOKEN) {
    return { ok: false, error: "META_CAPI_ACCESS_TOKEN not set" };
  }

  const body = {
    data: [
      {
        event_name: event.eventName,
        event_time: event.eventTime ?? Math.floor(Date.now() / 1000),
        event_id: event.eventId,
        action_source: "website",
        event_source_url: event.eventSourceUrl,
        user_data: buildUserData(event.userData),
        custom_data: event.customData,
      },
    ],
    ...(TEST_EVENT_CODE ? { test_event_code: TEST_EVENT_CODE } : {}),
  };

  const url = `https://graph.facebook.com/v20.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();

  if (!res.ok || data.error) {
    return { ok: false, error: JSON.stringify(data.error || data), response: data };
  }
  return { ok: true, response: data };
}

/* ─── Verify Shopify webhook HMAC signature ─── */
export function verifyShopifyHmac(rawBody: string, hmacHeader: string | null, secret: string): boolean {
  if (!hmacHeader || !secret) return false;
  const expected = crypto.createHmac("sha256", secret).update(rawBody, "utf8").digest("base64");
  try {
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(hmacHeader));
  } catch {
    return false;
  }
}

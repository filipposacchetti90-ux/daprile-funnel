import { NextRequest, NextResponse } from "next/server";
import { sendCapiEvent, verifyShopifyHmac } from "../../../lib/meta-capi";

/**
 * Shopify webhook: orders/paid
 *
 * Fires for every paid order on the store. We filter by the cart attribute
 * "source=funnel" (added by createCart in lib/shopify.ts) so only funnel
 * purchases are forwarded to Meta CAPI. Non-funnel orders are acknowledged
 * with 200 so Shopify doesn't retry them.
 *
 * event_id is set to the Shopify order id so that the client-side Purchase
 * event fired on /thank-you (which uses the same id) is deduped by Meta.
 */

const WEBHOOK_SECRET = process.env.SHOPIFY_WEBHOOK_SECRET || "";

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const hmac = request.headers.get("x-shopify-hmac-sha256");

    if (WEBHOOK_SECRET && !verifyShopifyHmac(rawBody, hmac, WEBHOOK_SECRET)) {
      return NextResponse.json({ ok: false, error: "Invalid signature" }, { status: 401 });
    }

    const order = JSON.parse(rawBody);

    // Filter: only process funnel orders
    const attrs: Array<{ name: string; value: string }> = order.note_attributes || [];
    const isFunnel = attrs.some((a) => a.name === "source" && a.value === "funnel");
    if (!isFunnel) {
      return NextResponse.json({ ok: true, skipped: "not a funnel order" });
    }

    const shipping = order.shipping_address || order.customer?.default_address || {};
    const lineItems = (order.line_items || []) as Array<{ title: string; quantity: number; variant_id: number }>;

    const result = await sendCapiEvent({
      eventName: "Purchase",
      eventId: String(order.id),
      eventTime: Math.floor(new Date(order.processed_at || order.created_at || Date.now()).getTime() / 1000),
      eventSourceUrl: order.order_status_url || undefined,
      userData: {
        email: order.email || order.customer?.email,
        phone: order.phone || shipping.phone || order.customer?.phone,
        firstName: shipping.first_name || order.customer?.first_name,
        lastName: shipping.last_name || order.customer?.last_name,
        city: shipping.city,
        zip: shipping.zip,
        country: shipping.country_code,
      },
      customData: {
        value: parseFloat(order.total_price || order.current_total_price || "0"),
        currency: order.currency || "EUR",
        content_name: lineItems[0]?.title,
        content_ids: lineItems.map((i) => String(i.variant_id)),
        num_items: lineItems.reduce((s, i) => s + (i.quantity || 1), 0),
        order_id: String(order.id),
      },
    });

    if (!result.ok) {
      console.error("CAPI error:", result.error);
      return NextResponse.json({ ok: false, error: result.error }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Meta CAPI webhook error:", error);
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Internal error" },
      { status: 500 }
    );
  }
}

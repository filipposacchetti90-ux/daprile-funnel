import { NextRequest, NextResponse } from "next/server";
import { createCheckout, tokenizeCard, completeCheckout } from "../../../lib/shopify";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === "create") {
      // Step 1: Create checkout on Shopify
      const { variantId, email, shipping } = body;

      const checkout = await createCheckout(variantId, email, {
        firstName: shipping.firstName,
        lastName: shipping.lastName,
        address1: shipping.address,
        city: shipping.city,
        province: shipping.province,
        zip: shipping.cap,
        country: "IT",
        phone: shipping.phone,
      });

      return NextResponse.json({ success: true, checkout });
    }

    if (action === "complete") {
      // Step 2: Tokenize card and complete payment
      const { checkoutId, card, amount, firstName, lastName } = body;

      // Parse expiry MM/YY
      const [month, year] = card.expiry.split("/").map((s: string) => s.trim());

      // Tokenize card via Shopify Card Vault
      const vaultToken = await tokenizeCard({
        number: card.number.replace(/\s/g, ""),
        firstName,
        lastName,
        month,
        year,
        verificationValue: card.cvc,
      });

      if (!vaultToken) {
        return NextResponse.json(
          { success: false, error: "Errore nella verifica della carta. Controlla i dati inseriti." },
          { status: 400 }
        );
      }

      // Complete checkout with payment
      const idempotencyKey = `${checkoutId}-${Date.now()}`;
      const result = await completeCheckout(checkoutId, vaultToken, amount, idempotencyKey);

      if (result?.checkoutUserErrors?.length > 0) {
        return NextResponse.json(
          { success: false, error: result.checkoutUserErrors.map((e: { message: string }) => e.message).join(", ") },
          { status: 400 }
        );
      }

      if (result?.payment?.errorMessage) {
        return NextResponse.json(
          { success: false, error: result.payment.errorMessage },
          { status: 400 }
        );
      }

      const order = result?.checkout?.order;

      return NextResponse.json({
        success: true,
        order: order
          ? { id: order.id, orderNumber: order.orderNumber, name: order.name }
          : null,
        paymentId: result?.payment?.id,
      });
    }

    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Errore durante il checkout" },
      { status: 500 }
    );
  }
}

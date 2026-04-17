import { NextRequest, NextResponse } from "next/server";
import { createCart } from "../../../lib/shopify";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { variantId, email, shipping } = body;

    if (!variantId || !email || !shipping) {
      return NextResponse.json(
        { success: false, error: "Dati mancanti" },
        { status: 400 }
      );
    }

    const cart = await createCart(variantId, email, {
      firstName: shipping.firstName,
      lastName: shipping.lastName,
      address1: shipping.address,
      city: shipping.city,
      province: shipping.province,
      zip: shipping.cap,
      phone: shipping.phone,
    });

    return NextResponse.json({
      success: true,
      cart: { id: cart.id, checkoutUrl: cart.checkoutUrl },
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Errore durante il checkout" },
      { status: 500 }
    );
  }
}

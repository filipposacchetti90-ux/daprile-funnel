import { NextRequest, NextResponse } from "next/server";
import { addProductToOrder } from "../../../lib/shopify-admin";

export async function POST(request: NextRequest) {
  try {
    const { orderId, variantId } = await request.json();

    if (!orderId || !variantId) {
      return NextResponse.json(
        { success: false, error: "Missing orderId or variantId" },
        { status: 400 }
      );
    }

    const result = await addProductToOrder(orderId, variantId);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || "Failed to add product to order" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("OTO error:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Errore" },
      { status: 500 }
    );
  }
}

/* ─── Shopify Configuration ─── */
const SHOPIFY_DOMAIN = process.env.SHOPIFY_DOMAIN || "6dabbc-2.myshopify.com";
const STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN || "18a7cc930eee6ecd7daeda4f2f945a78";

/* ─── Product Mapping: Quiz Answers → Shopify Variant IDs ─── */
export interface FunnelProduct {
  name: string;
  description: string;
  quantity: string;
  price: number;
  compareAtPrice?: number;
  variantId: string;
  pricePerUnit?: string;
}

export interface FunnelOffers {
  kit: FunnelProduct;
  mese1: FunnelProduct;
  mesi3: FunnelProduct;
}

type FormatoKey = "cialde-44mm" | "capsule-nespresso" | "capsule-lavazza-amo" | "lavazza-espresso-point" | "grani" | "miscela-moka";
type IntensitaKey = "leggero" | "medio" | "intenso";

/* ─── Full product map ─── */
const productMap: Record<FormatoKey, Record<IntensitaKey, { miscela: string; kit: { variantId: string; price: number; quantity: string }; mese1: { variantId: string; price: number; quantity: string }; mesi3: { variantId: string; price: number; quantity: string } }>> = {
  "cialde-44mm": {
    leggero: {
      miscela: "Classica",
      kit: { variantId: "gid://shopify/ProductVariant/49752285053274", price: 23, quantity: "60 cialde" },
      mese1: { variantId: "gid://shopify/ProductVariant/54008634147162", price: 54, quantity: "200 cialde" },
      mesi3: { variantId: "gid://shopify/ProductVariant/54008634343770", price: 149, quantity: "600 cialde" },
    },
    medio: {
      miscela: "Gran Crema",
      kit: { variantId: "gid://shopify/ProductVariant/49752285053274", price: 23, quantity: "60 cialde" },
      mese1: { variantId: "gid://shopify/ProductVariant/54008634179930", price: 54, quantity: "200 cialde" },
      mesi3: { variantId: "gid://shopify/ProductVariant/54008634376538", price: 149, quantity: "600 cialde" },
    },
    intenso: {
      miscela: "Crema Oro",
      kit: { variantId: "gid://shopify/ProductVariant/49752285053274", price: 23, quantity: "60 cialde" },
      mese1: { variantId: "gid://shopify/ProductVariant/54008634212698", price: 54, quantity: "200 cialde" },
      mesi3: { variantId: "gid://shopify/ProductVariant/54008634409306", price: 149, quantity: "600 cialde" },
    },
  },
  "capsule-nespresso": {
    leggero: {
      miscela: "Gran Crema",
      kit: { variantId: "gid://shopify/ProductVariant/53874852430170", price: 35.5, quantity: "100 capsule" },
      mese1: { variantId: "gid://shopify/ProductVariant/54008634835290", price: 65, quantity: "200 capsule" },
      mesi3: { variantId: "gid://shopify/ProductVariant/54008634933594", price: 179, quantity: "600 capsule" },
    },
    medio: {
      miscela: "Gran Crema",
      kit: { variantId: "gid://shopify/ProductVariant/53874852430170", price: 35.5, quantity: "100 capsule" },
      mese1: { variantId: "gid://shopify/ProductVariant/54008634835290", price: 65, quantity: "200 capsule" },
      mesi3: { variantId: "gid://shopify/ProductVariant/54008634933594", price: 179, quantity: "600 capsule" },
    },
    intenso: {
      miscela: "Crema Oro",
      kit: { variantId: "gid://shopify/ProductVariant/53874859376986", price: 35.5, quantity: "100 capsule" },
      mese1: { variantId: "gid://shopify/ProductVariant/54008634868058", price: 65, quantity: "200 capsule" },
      mesi3: { variantId: "gid://shopify/ProductVariant/54008634966362", price: 179, quantity: "600 capsule" },
    },
  },
  "capsule-lavazza-amo": {
    leggero: {
      miscela: "Brasile",
      kit: { variantId: "gid://shopify/ProductVariant/53874581668186", price: 36.5, quantity: "100 capsule" },
      mese1: { variantId: "gid://shopify/ProductVariant/54008635031898", price: 67, quantity: "200 capsule" },
      mesi3: { variantId: "gid://shopify/ProductVariant/54008635130202", price: 185, quantity: "600 capsule" },
    },
    medio: {
      miscela: "Crema Oro",
      kit: { variantId: "gid://shopify/ProductVariant/53874643599706", price: 36.5, quantity: "100 capsule" },
      mese1: { variantId: "gid://shopify/ProductVariant/54008635064666", price: 67, quantity: "200 capsule" },
      mesi3: { variantId: "gid://shopify/ProductVariant/54008635162970", price: 185, quantity: "600 capsule" },
    },
    intenso: {
      miscela: "Nero",
      kit: { variantId: "gid://shopify/ProductVariant/52944341107034", price: 36.5, quantity: "100 capsule" },
      mese1: { variantId: "gid://shopify/ProductVariant/54008635097434", price: 67, quantity: "200 capsule" },
      mesi3: { variantId: "gid://shopify/ProductVariant/54008635195738", price: 185, quantity: "600 capsule" },
    },
  },
  "lavazza-espresso-point": {
    leggero: {
      miscela: "Classica",
      kit: { variantId: "gid://shopify/ProductVariant/49753619857754", price: 25, quantity: "60 capsule" },
      mese1: { variantId: "gid://shopify/ProductVariant/54008646369626", price: 58, quantity: "200 capsule" },
      mesi3: { variantId: "gid://shopify/ProductVariant/54008646467930", price: 162, quantity: "600 capsule" },
    },
    medio: {
      miscela: "Gran Crema",
      kit: { variantId: "gid://shopify/ProductVariant/49753619857754", price: 25, quantity: "60 capsule" },
      mese1: { variantId: "gid://shopify/ProductVariant/54008646402394", price: 58, quantity: "200 capsule" },
      mesi3: { variantId: "gid://shopify/ProductVariant/54008646500698", price: 162, quantity: "600 capsule" },
    },
    intenso: {
      miscela: "Crema Oro",
      kit: { variantId: "gid://shopify/ProductVariant/49753619857754", price: 25, quantity: "60 capsule" },
      mese1: { variantId: "gid://shopify/ProductVariant/54008646435162", price: 58, quantity: "200 capsule" },
      mesi3: { variantId: "gid://shopify/ProductVariant/54008646599002", price: 162, quantity: "600 capsule" },
    },
  },
  grani: {
    leggero: {
      miscela: "Gran Bar",
      kit: { variantId: "gid://shopify/ProductVariant/50046381195610", price: 28, quantity: "1 kg" },
      mese1: { variantId: "gid://shopify/ProductVariant/54008646664538", price: 52, quantity: "2 kg" },
      mesi3: { variantId: "gid://shopify/ProductVariant/54008646762842", price: 119, quantity: "5 kg" },
    },
    medio: {
      miscela: "Santo Domingo",
      kit: { variantId: "gid://shopify/ProductVariant/50046442996058", price: 33, quantity: "1 kg" },
      mese1: { variantId: "gid://shopify/ProductVariant/54008646697306", price: 60, quantity: "2 kg" },
      mesi3: { variantId: "gid://shopify/ProductVariant/54008646795610", price: 139, quantity: "5 kg" },
    },
    intenso: {
      miscela: "Kaapi Royale",
      kit: { variantId: "gid://shopify/ProductVariant/50046429856090", price: 30, quantity: "1 kg" },
      mese1: { variantId: "gid://shopify/ProductVariant/54008646730074", price: 55, quantity: "2 kg" },
      mesi3: { variantId: "gid://shopify/ProductVariant/54008646893914", price: 125, quantity: "5 kg" },
    },
  },
  "miscela-moka": {
    leggero: {
      miscela: "Gran Bar",
      kit: { variantId: "gid://shopify/ProductVariant/50046381228378", price: 28, quantity: "1 kg" },
      mese1: { variantId: "gid://shopify/ProductVariant/54008646926682", price: 52, quantity: "2 kg" },
      mesi3: { variantId: "gid://shopify/ProductVariant/54008647024986", price: 119, quantity: "5 kg" },
    },
    medio: {
      miscela: "Super Bar",
      kit: { variantId: "gid://shopify/ProductVariant/50046421074266", price: 27, quantity: "1 kg" },
      mese1: { variantId: "gid://shopify/ProductVariant/54008646959450", price: 52, quantity: "2 kg" },
      mesi3: { variantId: "gid://shopify/ProductVariant/54008647057754", price: 119, quantity: "5 kg" },
    },
    intenso: {
      miscela: "Crema Oro",
      kit: { variantId: "gid://shopify/ProductVariant/50046438965594", price: 27, quantity: "1 kg" },
      mese1: { variantId: "gid://shopify/ProductVariant/54008646992218", price: 52, quantity: "2 kg" },
      mesi3: { variantId: "gid://shopify/ProductVariant/54008647483738", price: 119, quantity: "5 kg" },
    },
  },
};

/* ─── Format display names ─── */
const formatNames: Record<FormatoKey, string> = {
  "cialde-44mm": "Cialde di Carta ESE44mm",
  "capsule-nespresso": "Capsule Nespresso",
  "capsule-lavazza-amo": "Capsule Lavazza A Modo Mio",
  "lavazza-espresso-point": "Capsule Espresso Point",
  grani: "Caffè in Grani",
  "miscela-moka": "Macinato Moka",
};

/* ─── OTO: suggest a different intensity ─── */
export interface OtoOffer {
  miscela: string;
  intensita: string;
  aggettivo: string;
  motivo: string;
  price: number;
  compareAtPrice: number;
  quantity: string;
  variantId: string;
}

const otoSuggestions: Record<IntensitaKey, { suggest: IntensitaKey; aggettivo: string; motivo: string }> = {
  leggero: { suggest: "medio", aggettivo: "corposa", motivo: "Cioccolato e nocciola, perfetta dopo pranzo" },
  medio: { suggest: "intenso", aggettivo: "decisa", motivo: "Per quei momenti in cui serve una carica vera" },
  intenso: { suggest: "leggero", aggettivo: "delicata", motivo: "Perfetta per il pomeriggio, ti sorprenderà" },
};

export function getOtoOffer(formato: string, intensita: string): OtoOffer | null {
  const f = (formato as FormatoKey) || "capsule-nespresso";
  const i = (intensita as IntensitaKey) || "medio";
  const suggestion = otoSuggestions[i];
  const data = productMap[f]?.[suggestion.suggest];
  if (!data) return null;

  // Real site price as compare-at, OTO is ~22% cheaper
  const sitePrice = data.kit.price;
  const otoPrice = Math.round(sitePrice * 0.78 * 100) / 100;

  return {
    miscela: data.miscela,
    intensita: suggestion.suggest,
    aggettivo: suggestion.aggettivo,
    motivo: suggestion.motivo,
    price: otoPrice,
    compareAtPrice: sitePrice,
    quantity: data.kit.quantity,
    variantId: data.kit.variantId,
  };
}

/* ─── Get offers for quiz answers ─── */
export function getOffersForQuiz(formato: string, intensita: string): FunnelOffers & { formatName: string; miscela: string } {
  const f = (formato as FormatoKey) || "capsule-nespresso";
  const i = (intensita as IntensitaKey) || "medio";
  const data = productMap[f]?.[i] || productMap["capsule-nespresso"]["medio"];
  const formatName = formatNames[f] || "Capsule Nespresso";

  // Calculate compare-at prices based on kit unit price
  const kitQty = parseFloat(data.kit.quantity) || 1;
  const kitUnitPrice = data.kit.price / kitQty;
  const mese1Qty = parseFloat(data.mese1.quantity) || 1;
  const mesi3Qty = parseFloat(data.mesi3.quantity) || 1;
  const mese1Compare = Math.round(kitUnitPrice * mese1Qty * 100) / 100;
  const mesi3Compare = Math.round(kitUnitPrice * mesi3Qty * 100) / 100;

  return {
    formatName,
    miscela: data.miscela,
    kit: {
      name: "Provami!",
      description: `${formatName} — Miscela ${data.miscela}`,
      quantity: data.kit.quantity,
      price: data.kit.price,
      compareAtPrice: Math.round(data.kit.price * 1.15 * 100) / 100,
      variantId: data.kit.variantId,
    },
    mese1: {
      name: "Per un mese intero",
      description: `${formatName} — Miscela ${data.miscela}`,
      quantity: data.mese1.quantity,
      price: data.mese1.price,
      compareAtPrice: mese1Compare > data.mese1.price ? mese1Compare : undefined,
      variantId: data.mese1.variantId,
    },
    mesi3: {
      name: "Non restare mai senza",
      description: `${formatName} — Miscela ${data.miscela}`,
      quantity: data.mesi3.quantity,
      price: data.mesi3.price,
      compareAtPrice: mesi3Compare > data.mesi3.price ? mesi3Compare : undefined,
      variantId: data.mesi3.variantId,
    },
  };
}

/* ─── Storefront API helper ─── */
async function storefrontFetch(query: string, variables?: Record<string, unknown>) {
  const res = await fetch(`https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  return res.json();
}

/* ─── Create Checkout ─── */
export async function createCheckout(variantId: string, email: string, shippingAddress: {
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  province: string;
  zip: string;
  country: string;
  phone: string;
}) {
  // Step 1: Create checkout with line item
  const createResult = await storefrontFetch(`
    mutation checkoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          id
          webUrl
          totalPriceV2 { amount currencyCode }
        }
        checkoutUserErrors { field message }
      }
    }
  `, {
    input: {
      lineItems: [{ variantId, quantity: 1 }],
      email,
      shippingAddress: {
        ...shippingAddress,
        country: "IT",
      },
    },
  });

  const checkout = createResult.data?.checkoutCreate?.checkout;
  const errors = createResult.data?.checkoutCreate?.checkoutUserErrors;

  if (errors?.length > 0) {
    throw new Error(errors.map((e: { message: string }) => e.message).join(", "));
  }

  return checkout;
}

/* ─── Tokenize Credit Card via Shopify Card Vault ─── */
export async function tokenizeCard(card: {
  number: string;
  firstName: string;
  lastName: string;
  month: string;
  year: string;
  verificationValue: string;
}) {
  const res = await fetch("https://elb.deposit.shopifycs.com/sessions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      credit_card: {
        number: card.number,
        first_name: card.firstName,
        last_name: card.lastName,
        month: parseInt(card.month),
        year: parseInt(card.year.length === 2 ? `20${card.year}` : card.year),
        verification_value: card.verificationValue,
      },
    }),
  });
  const data = await res.json();
  return data.id; // vault token
}

/* ─── Complete Checkout with Credit Card ─── */
export async function completeCheckout(checkoutId: string, vaultToken: string, amount: string, idempotencyKey: string) {
  const result = await storefrontFetch(`
    mutation checkoutCompleteWithCreditCardV2($checkoutId: ID!, $payment: CreditCardPaymentInputV2!) {
      checkoutCompleteWithCreditCardV2(checkoutId: $checkoutId, payment: $payment) {
        checkout {
          id
          order { id orderNumber name }
        }
        checkoutUserErrors { field message }
        payment {
          id
          errorMessage
          ready
        }
      }
    }
  `, {
    checkoutId,
    payment: {
      paymentAmount: { amount, currencyCode: "EUR" },
      idempotencyKey,
      billingAddress: { firstName: "", lastName: "", address1: "", city: "", province: "", zip: "", country: "IT" },
      vaultId: vaultToken,
    },
  });

  return result.data?.checkoutCompleteWithCreditCardV2;
}

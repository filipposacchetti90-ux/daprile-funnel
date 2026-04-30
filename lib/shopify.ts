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
  imageUrl: string;
}

export interface FunnelOffers {
  kit: FunnelProduct;
  mese1: FunnelProduct;
  mesi3: FunnelProduct;
}

type FormatoKey = "cialde-44mm" | "capsule-nespresso" | "capsule-lavazza-amo" | "lavazza-espresso-point" | "grani" | "miscela-moka";
type IntensitaKey = "leggero" | "medio" | "intenso";

/* ─── Full product map ─── */
const productMap: Record<FormatoKey, Record<IntensitaKey, { miscela: string; image: string; kit: { variantId: string; price: number; quantity: string }; mese1: { variantId: string; price: number; quantity: string }; mesi3: { variantId: string; price: number; quantity: string } }>> = {
  "cialde-44mm": {
    leggero: {
      miscela: "Classica",
      image: "https://cdn.shopify.com/s/files/1/0767/9311/9066/files/CLASSICA_CIALDA.png?v=1764195597",
      kit: { variantId: "gid://shopify/ProductVariant/54026877895002", price: 30, quantity: "100 cialde" },
      mese1: { variantId: "gid://shopify/ProductVariant/54008634147162", price: 55, quantity: "200 cialde" },
      mesi3: { variantId: "gid://shopify/ProductVariant/54008634343770", price: 149, quantity: "600 cialde" },
    },
    medio: {
      miscela: "Gran Crema",
      image: "https://cdn.shopify.com/s/files/1/0767/9311/9066/files/CIALDA_8G_GRAN_CREMA.png?v=1764196249",
      kit: { variantId: "gid://shopify/ProductVariant/54026884940122", price: 30, quantity: "100 cialde" },
      mese1: { variantId: "gid://shopify/ProductVariant/54008634179930", price: 55, quantity: "200 cialde" },
      mesi3: { variantId: "gid://shopify/ProductVariant/54008634376538", price: 149, quantity: "600 cialde" },
    },
    intenso: {
      miscela: "Extra Forte",
      image: "https://cdn.shopify.com/s/files/1/0767/9311/9066/files/Photoroom_20260427_121717.jpg?v=1777285370",
      kit: { variantId: "gid://shopify/ProductVariant/54085476286810", price: 30, quantity: "100 cialde" },
      mese1: { variantId: "gid://shopify/ProductVariant/54085477695834", price: 55, quantity: "200 cialde" },
      mesi3: { variantId: "gid://shopify/ProductVariant/54085477761370", price: 149, quantity: "600 cialde" },
    },
  },
  "capsule-nespresso": {
    leggero: {
      miscela: "Gran Crema",
      image: "https://cdn.shopify.com/s/files/1/0767/9311/9066/files/LMS5452-1000x1000.jpg?v=1712326459",
      kit: { variantId: "gid://shopify/ProductVariant/54014222041434", price: 35.5, quantity: "100 capsule" },
      mese1: { variantId: "gid://shopify/ProductVariant/54008634835290", price: 65, quantity: "200 capsule" },
      mesi3: { variantId: "gid://shopify/ProductVariant/54008634933594", price: 179, quantity: "600 capsule" },
    },
    medio: {
      miscela: "Gran Crema",
      image: "https://cdn.shopify.com/s/files/1/0767/9311/9066/files/LMS5452-1000x1000.jpg?v=1712326459",
      kit: { variantId: "gid://shopify/ProductVariant/54014222041434", price: 35.5, quantity: "100 capsule" },
      mese1: { variantId: "gid://shopify/ProductVariant/54008634835290", price: 65, quantity: "200 capsule" },
      mesi3: { variantId: "gid://shopify/ProductVariant/54008634933594", price: 179, quantity: "600 capsule" },
    },
    intenso: {
      miscela: "Crema Oro",
      image: "https://cdn.shopify.com/s/files/1/0767/9311/9066/files/LMS5453-1000x1000.jpg?v=1712326421",
      kit: { variantId: "gid://shopify/ProductVariant/54014222172506", price: 35.5, quantity: "100 capsule" },
      mese1: { variantId: "gid://shopify/ProductVariant/54008634868058", price: 65, quantity: "200 capsule" },
      mesi3: { variantId: "gid://shopify/ProductVariant/54008634966362", price: 179, quantity: "600 capsule" },
    },
  },
  "capsule-lavazza-amo": {
    leggero: {
      miscela: "Brasile",
      image: "https://cdn.shopify.com/s/files/1/0767/9311/9066/files/LMS5444-1000x1000.jpg?v=1712326170",
      kit: { variantId: "gid://shopify/ProductVariant/54014222270810", price: 36.5, quantity: "100 capsule" },
      mese1: { variantId: "gid://shopify/ProductVariant/54008635031898", price: 67, quantity: "200 capsule" },
      mesi3: { variantId: "gid://shopify/ProductVariant/54008635130202", price: 185, quantity: "600 capsule" },
    },
    medio: {
      miscela: "Crema Oro",
      image: "https://cdn.shopify.com/s/files/1/0767/9311/9066/files/Nuovo_progetto_1.png?v=1729679551",
      kit: { variantId: "gid://shopify/ProductVariant/54014222401882", price: 36.5, quantity: "100 capsule" },
      mese1: { variantId: "gid://shopify/ProductVariant/54008635064666", price: 67, quantity: "200 capsule" },
      mesi3: { variantId: "gid://shopify/ProductVariant/54008635162970", price: 185, quantity: "600 capsule" },
    },
    intenso: {
      miscela: "Nero",
      image: "https://cdn.shopify.com/s/files/1/0767/9311/9066/files/LMS5446-1000x1000.jpg?v=1712326301",
      kit: { variantId: "gid://shopify/ProductVariant/54014222434650", price: 36.5, quantity: "100 capsule" },
      mese1: { variantId: "gid://shopify/ProductVariant/54008635097434", price: 67, quantity: "200 capsule" },
      mesi3: { variantId: "gid://shopify/ProductVariant/54008635195738", price: 185, quantity: "600 capsule" },
    },
  },
  "lavazza-espresso-point": {
    leggero: {
      miscela: "Classica",
      image: "https://cdn.shopify.com/s/files/1/0767/9311/9066/files/LMS5439-1000x1000.jpg?v=1712259095",
      kit: { variantId: "gid://shopify/ProductVariant/54026885235034", price: 31.5, quantity: "100 capsule" },
      mese1: { variantId: "gid://shopify/ProductVariant/54008646369626", price: 58, quantity: "200 capsule" },
      mesi3: { variantId: "gid://shopify/ProductVariant/54008646467930", price: 162, quantity: "600 capsule" },
    },
    medio: {
      miscela: "Gran Crema",
      image: "https://cdn.shopify.com/s/files/1/0767/9311/9066/files/LMS5437-1000x1000.jpg?v=1712326367",
      kit: { variantId: "gid://shopify/ProductVariant/54026885562714", price: 31.5, quantity: "100 capsule" },
      mese1: { variantId: "gid://shopify/ProductVariant/54008646402394", price: 58, quantity: "200 capsule" },
      mesi3: { variantId: "gid://shopify/ProductVariant/54008646500698", price: 162, quantity: "600 capsule" },
    },
    intenso: {
      miscela: "Crema Oro",
      image: "https://cdn.shopify.com/s/files/1/0767/9311/9066/files/LMS5440-1000x1000.jpg?v=1712326336",
      kit: { variantId: "gid://shopify/ProductVariant/54026885661018", price: 31.5, quantity: "100 capsule" },
      mese1: { variantId: "gid://shopify/ProductVariant/54008646435162", price: 58, quantity: "200 capsule" },
      mesi3: { variantId: "gid://shopify/ProductVariant/54008646599002", price: 162, quantity: "600 capsule" },
    },
  },
  grani: {
    leggero: {
      miscela: "Gran Bar",
      image: "https://cdn.shopify.com/s/files/1/0767/9311/9066/files/caffe-grani-img_e6f75294-b84d-4c9b-a230-bcbf9686627e.jpg?v=1710411464",
      kit: { variantId: "gid://shopify/ProductVariant/54014222532954", price: 28, quantity: "1 kg" },
      mese1: { variantId: "gid://shopify/ProductVariant/54008646664538", price: 52, quantity: "2 kg" },
      mesi3: { variantId: "gid://shopify/ProductVariant/54008646762842", price: 119, quantity: "5 kg" },
    },
    medio: {
      miscela: "Santo Domingo",
      image: "https://cdn.shopify.com/s/files/1/0767/9311/9066/files/caffe-grani-img_f8d1741d-374c-4fd8-b3b4-1672eec8546d.jpg?v=1710411538",
      kit: { variantId: "gid://shopify/ProductVariant/54014222598490", price: 33, quantity: "1 kg" },
      mese1: { variantId: "gid://shopify/ProductVariant/54008646697306", price: 60, quantity: "2 kg" },
      mesi3: { variantId: "gid://shopify/ProductVariant/54008646795610", price: 139, quantity: "5 kg" },
    },
    intenso: {
      miscela: "Kaapi Royale",
      image: "https://cdn.shopify.com/s/files/1/0767/9311/9066/files/caffe-grani-img_30109224-7fa8-4cb2-ab94-28a2a273c6a8.jpg?v=1710411625",
      kit: { variantId: "gid://shopify/ProductVariant/54014222664026", price: 30, quantity: "1 kg" },
      mese1: { variantId: "gid://shopify/ProductVariant/54008646730074", price: 55, quantity: "2 kg" },
      mesi3: { variantId: "gid://shopify/ProductVariant/54008646893914", price: 125, quantity: "5 kg" },
    },
  },
  "miscela-moka": {
    leggero: {
      miscela: "Gran Bar",
      image: "https://cdn.shopify.com/s/files/1/0767/9311/9066/files/caffe-grani-img_e6f75294-b84d-4c9b-a230-bcbf9686627e.jpg?v=1710411464",
      kit: { variantId: "gid://shopify/ProductVariant/54014222729562", price: 28, quantity: "1 kg" },
      mese1: { variantId: "gid://shopify/ProductVariant/54008646926682", price: 52, quantity: "2 kg" },
      mesi3: { variantId: "gid://shopify/ProductVariant/54008647024986", price: 119, quantity: "5 kg" },
    },
    medio: {
      miscela: "Super Bar",
      image: "https://cdn.shopify.com/s/files/1/0767/9311/9066/files/caffe-grani-img_87de8713-a586-4849-bd72-a0480812a4c4.jpg?v=1710411380",
      kit: { variantId: "gid://shopify/ProductVariant/54014222795098", price: 27, quantity: "1 kg" },
      mese1: { variantId: "gid://shopify/ProductVariant/54008646959450", price: 52, quantity: "2 kg" },
      mesi3: { variantId: "gid://shopify/ProductVariant/54008647057754", price: 119, quantity: "5 kg" },
    },
    intenso: {
      miscela: "Crema Oro",
      image: "https://cdn.shopify.com/s/files/1/0767/9311/9066/files/caffe-grani-img_87de8713-a586-4849-bd72-a0480812a4c4.jpg?v=1710411380",
      kit: { variantId: "gid://shopify/ProductVariant/54014222860634", price: 27, quantity: "1 kg" },
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

/* ─── Format "€X.XX / cialda" from price + quantity string like "200 cialde" ─── */
function formatPricePerUnit(price: number, quantity: string): string {
  const match = quantity.match(/^(\d+(?:[.,]\d+)?)\s*(\w+)/i);
  if (!match) return "";
  const num = parseFloat(match[1].replace(",", "."));
  if (!num) return "";
  const unitRaw = match[2].toLowerCase();
  const singular: Record<string, string> = {
    cialde: "cialda",
    capsule: "capsula",
    kg: "kg",
  };
  const unit = singular[unitRaw] || unitRaw;
  return `€${(price / num).toFixed(2)}/${unit}`;
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
      imageUrl: data.image,
      pricePerUnit: formatPricePerUnit(data.kit.price, data.kit.quantity),
    },
    mese1: {
      name: "Per un mese intero",
      description: `${formatName} — Miscela ${data.miscela}`,
      quantity: data.mese1.quantity,
      price: data.mese1.price,
      compareAtPrice: mese1Compare > data.mese1.price ? mese1Compare : undefined,
      variantId: data.mese1.variantId,
      imageUrl: data.image,
      pricePerUnit: formatPricePerUnit(data.mese1.price, data.mese1.quantity),
    },
    mesi3: {
      name: "Non restare mai senza",
      description: `${formatName} — Miscela ${data.miscela}`,
      quantity: data.mesi3.quantity,
      price: data.mesi3.price,
      compareAtPrice: mesi3Compare > data.mesi3.price ? mesi3Compare : undefined,
      variantId: data.mesi3.variantId,
      imageUrl: data.image,
      pricePerUnit: formatPricePerUnit(data.mesi3.price, data.mesi3.quantity),
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

/* ─── Create Cart (Storefront Cart API) ───
   Returns a cart with a hosted checkoutUrl. The user is redirected there
   to complete payment (card / PayPal / Apple Pay / Google Pay handled by Shopify).
   Buyer identity + shipping address are pre-filled so the user only picks a payment method. */
export async function createCart(variantId: string, email: string, shippingAddress: {
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  province: string;
  zip: string;
  phone: string;
}) {
  const result = await storefrontFetch(`
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
          totalQuantity
          cost { totalAmount { amount currencyCode } }
        }
        userErrors { field message }
      }
    }
  `, {
    input: {
      lines: [{ merchandiseId: variantId, quantity: 1 }],
      attributes: [{ key: "source", value: "funnel" }],
      buyerIdentity: {
        email,
        phone: shippingAddress.phone,
        countryCode: "IT",
        deliveryAddressPreferences: [{
          deliveryAddress: {
            firstName: shippingAddress.firstName,
            lastName: shippingAddress.lastName,
            address1: shippingAddress.address1,
            city: shippingAddress.city,
            province: shippingAddress.province,
            zip: shippingAddress.zip,
            country: "IT",
            phone: shippingAddress.phone,
          },
        }],
      },
    },
  });

  const errors = result.data?.cartCreate?.userErrors;
  if (errors?.length > 0) {
    throw new Error(errors.map((e: { message: string }) => e.message).join(", "));
  }

  const cart = result.data?.cartCreate?.cart;
  if (!cart?.checkoutUrl) {
    throw new Error("Impossibile creare il carrello");
  }

  return cart as { id: string; checkoutUrl: string; totalQuantity: number };
}

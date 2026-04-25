// One-shot script: aggiorna tier funnel cialde + ESE Point dopo conferma Filippo (2026-04-25)
//
// Cialde kit: 60pz/€23 → 100pz/€30   (titolo "60 pezzi" → "100 pezzi")
// Cialde mese1: €54 → €55             (solo prezzo, titolo invariato)
// ESE Point kit: 60pz/€25 → 100pz/€31.50 (titolo "60 pezzi" → "100 pezzi")
//
// Run: cd funnel && node --env-file=.env.local scripts/update-tiers-2026-04-25.mjs

const SHOPIFY_DOMAIN = process.env.SHOPIFY_DOMAIN;
const CLIENT_ID = process.env.SHOPIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET;

if (!SHOPIFY_DOMAIN || !CLIENT_ID || !CLIENT_SECRET) {
  console.error("Missing SHOPIFY_DOMAIN / SHOPIFY_CLIENT_ID / SHOPIFY_CLIENT_SECRET in env");
  process.exit(1);
}

async function getAdminToken() {
  const res = await fetch(`https://${SHOPIFY_DOMAIN}/admin/oauth/access_token.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ client_id: CLIENT_ID, client_secret: CLIENT_SECRET, grant_type: "client_credentials" }),
  });
  const data = await res.json();
  if (!data.access_token) throw new Error("Failed admin token: " + JSON.stringify(data));
  return data.access_token;
}

const TOKEN = await getAdminToken();

async function gql(query, variables) {
  const res = await fetch(`https://${SHOPIFY_DOMAIN}/admin/api/2024-01/graphql.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Shopify-Access-Token": TOKEN },
    body: JSON.stringify({ query, variables }),
  });
  return res.json();
}

const PRODUCT_UPDATE = `mutation productUpdate($input: ProductInput!) {
  productUpdate(input: $input) { product { id title } userErrors { field message } }
}`;

const VARIANTS_BULK_UPDATE = `mutation productVariantsBulkUpdate($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
  productVariantsBulkUpdate(productId: $productId, variants: $variants) {
    productVariants { id price }
    userErrors { field message }
  }
}`;

// Operations: { productId, newTitle (or null), variantId, newPrice }
const ops = [
  // CIALDE KIT — title 60→100, price 23→30
  { productId: "gid://shopify/Product/10825828958554", newTitle: "Cialde ESE44 — Miscela Classica — 100 pezzi (Assaggio)", variantId: "gid://shopify/ProductVariant/54026877895002", newPrice: "30.00" },
  { productId: "gid://shopify/Product/10825829712218", newTitle: "Cialde ESE44 — Miscela Gran Crema — 100 pezzi (Assaggio)", variantId: "gid://shopify/ProductVariant/54026884940122", newPrice: "30.00" },
  { productId: "gid://shopify/Product/10825829744986", newTitle: "Cialde ESE44 — Miscela Crema Oro — 100 pezzi (Assaggio)", variantId: "gid://shopify/ProductVariant/54026885169498", newPrice: "30.00" },
  // CIALDE MESE1 — solo prezzo 54→55
  { productId: "gid://shopify/Product/10823948042586", newTitle: null, variantId: "gid://shopify/ProductVariant/54008634147162", newPrice: "55.00" },
  { productId: "gid://shopify/Product/10823948075354", newTitle: null, variantId: "gid://shopify/ProductVariant/54008634179930", newPrice: "55.00" },
  { productId: "gid://shopify/Product/10823948108122", newTitle: null, variantId: "gid://shopify/ProductVariant/54008634212698", newPrice: "55.00" },
  // ESE POINT KIT — title 60→100, price 25→31.50
  { productId: "gid://shopify/Product/10825829777754", newTitle: "Capsule Lavazza Espresso Point — Miscela Classica — 100 pezzi (Assaggio)", variantId: "gid://shopify/ProductVariant/54026885235034", newPrice: "31.50" },
  { productId: "gid://shopify/Product/10825829810522", newTitle: "Capsule Lavazza Espresso Point — Miscela Gran Crema — 100 pezzi (Assaggio)", variantId: "gid://shopify/ProductVariant/54026885562714", newPrice: "31.50" },
  { productId: "gid://shopify/Product/10825829843290", newTitle: "Capsule Lavazza Espresso Point — Miscela Crema Oro — 100 pezzi (Assaggio)", variantId: "gid://shopify/ProductVariant/54026885661018", newPrice: "31.50" },
];

let okCount = 0;
let failCount = 0;

for (const op of ops) {
  // 1. Update title (if needed)
  if (op.newTitle) {
    const r = await gql(PRODUCT_UPDATE, { input: { id: op.productId, title: op.newTitle } });
    const errs = r.data?.productUpdate?.userErrors;
    if (errs?.length) {
      console.error(`✗ title fail ${op.productId}:`, errs);
      failCount++;
      continue;
    }
    console.log(`✓ title: ${r.data.productUpdate.product.title}`);
  }

  // 2. Update variant price
  const r2 = await gql(VARIANTS_BULK_UPDATE, {
    productId: op.productId,
    variants: [{ id: op.variantId, price: op.newPrice }],
  });
  const errs2 = r2.data?.productVariantsBulkUpdate?.userErrors;
  if (errs2?.length) {
    console.error(`✗ price fail ${op.variantId}:`, errs2);
    failCount++;
    continue;
  }
  const v = r2.data.productVariantsBulkUpdate.productVariants[0];
  console.log(`✓ price: ${v.id} = €${v.price}`);
  okCount++;
}

console.log(`\nDone. ${okCount} ok, ${failCount} failed.`);

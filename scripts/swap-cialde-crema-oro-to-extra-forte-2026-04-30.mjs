// Sostituisce nel funnel "cialde 44mm intenso" da Crema Oro (esaurita) a Extra Forte (nuova).
//
// Crea 3 nuovi prodotti [FUNNEL] Extra Forte (kit/mese1/mesi3) clonando struttura Crema Oro,
// poi mette in DRAFT i 3 prodotti Crema Oro vecchi.
//
// Run: cd funnel && node --env-file=.env.local scripts/swap-cialde-crema-oro-to-extra-forte-2026-04-30.mjs

const SHOPIFY_DOMAIN = process.env.SHOPIFY_DOMAIN;
const CLIENT_ID = process.env.SHOPIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET;

const ONLINE_STORE_PUB = "gid://shopify/Publication/160877248858";
const EXTRA_FORTE_IMG = "https://cdn.shopify.com/s/files/1/0767/9311/9066/files/Photoroom_20260427_121717.jpg?v=1777285370";
const VENDOR = "D'Aprile Caffè";

const CREMA_ORO_FUNNEL_TO_DRAFT = [
  { id: "gid://shopify/Product/10825829744986", label: "kit Crema Oro 100pz" },
  { id: "gid://shopify/Product/10823948108122", label: "mese1 Crema Oro 200pz" },
  { id: "gid://shopify/Product/10823948206426", label: "mesi3 Crema Oro 600pz" },
];

const NEW_PRODUCTS = [
  {
    tier: "kit",
    title: "Cialde ESE44 — Extra Forte — 100 pezzi (Assaggio)",
    productType: "FUNNEL KIT",
    tags: ["cialde", "funnel", "hidden", "hidden-from-search", "intenso", "kit"],
    price: "30.00",
  },
  {
    tier: "mese1",
    title: "Cialde ESE44 — Extra Forte — 200 pezzi",
    productType: "FUNNEL",
    tags: ["1-mese", "cialde", "funnel", "hidden", "hidden-from-search", "intenso"],
    price: "55.00",
  },
  {
    tier: "mesi3",
    title: "Cialde ESE44 — Extra Forte — 600 pezzi",
    productType: "FUNNEL",
    tags: ["3-mesi", "cialde", "funnel", "hidden", "hidden-from-search", "intenso"],
    price: "149.00",
  },
];

const tokenRes = await fetch(`https://${SHOPIFY_DOMAIN}/admin/oauth/access_token.json`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ client_id: CLIENT_ID, client_secret: CLIENT_SECRET, grant_type: "client_credentials" }),
});
const TOKEN = (await tokenRes.json()).access_token;

async function gql(query, variables) {
  const res = await fetch(`https://${SHOPIFY_DOMAIN}/admin/api/2024-01/graphql.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Shopify-Access-Token": TOKEN },
    body: JSON.stringify({ query, variables }),
  });
  return res.json();
}

const PRODUCT_CREATE = `mutation productCreate($input: ProductInput!) {
  productCreate(input: $input) {
    product { id title handle variants(first: 1) { nodes { id } } }
    userErrors { field message }
  }
}`;

const VARIANTS_BULK_UPDATE = `mutation productVariantsBulkUpdate($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
  productVariantsBulkUpdate(productId: $productId, variants: $variants) {
    productVariants { id price inventoryPolicy inventoryItem { tracked } }
    userErrors { field message }
  }
}`;

const PRODUCT_CREATE_MEDIA = `mutation productCreateMedia($productId: ID!, $media: [CreateMediaInput!]!) {
  productCreateMedia(productId: $productId, media: $media) {
    media { ... on MediaImage { id status } }
    mediaUserErrors { field message }
  }
}`;

const PUBLISHABLE_PUBLISH = `mutation publishablePublish($id: ID!, $input: [PublicationInput!]!) {
  publishablePublish(id: $id, input: $input) {
    publishable { availablePublicationsCount { count } }
    userErrors { field message }
  }
}`;

const PRODUCT_UPDATE = `mutation productUpdate($input: ProductInput!) {
  productUpdate(input: $input) {
    product { id title status }
    userErrors { field message }
  }
}`;

console.log("=== STEP 1: Creo 3 nuovi prodotti [FUNNEL] Extra Forte ===\n");

const created = [];
for (const p of NEW_PRODUCTS) {
  // 1a. Create product (no variants - those come default)
  const r = await gql(PRODUCT_CREATE, {
    input: {
      title: p.title,
      productType: p.productType,
      vendor: VENDOR,
      tags: p.tags,
      status: "ACTIVE",
    },
  });
  const errs = r.data?.productCreate?.userErrors;
  if (errs?.length) {
    console.error(`✗ create fail "${p.title}":`, errs);
    process.exit(1);
  }
  const product = r.data.productCreate.product;
  const defaultVariantId = product.variants.nodes[0].id;
  console.log(`✓ creato: ${product.title} (${product.id})`);

  // 1b. Update default variant: price + inventoryPolicy CONTINUE + tracked false
  const r2 = await gql(VARIANTS_BULK_UPDATE, {
    productId: product.id,
    variants: [{
      id: defaultVariantId,
      price: p.price,
      inventoryPolicy: "CONTINUE",
      inventoryItem: { tracked: false },
    }],
  });
  const errs2 = r2.data?.productVariantsBulkUpdate?.userErrors;
  if (errs2?.length) {
    console.error(`✗ variant update fail:`, errs2);
    process.exit(1);
  }
  const variant = r2.data.productVariantsBulkUpdate.productVariants[0];
  console.log(`  ↳ variant ${variant.id} → €${variant.price}, ${variant.inventoryPolicy}, tracked=${variant.inventoryItem.tracked}`);

  // 1c. Add image
  const r3 = await gql(PRODUCT_CREATE_MEDIA, {
    productId: product.id,
    media: [{ mediaContentType: "IMAGE", originalSource: EXTRA_FORTE_IMG }],
  });
  const errs3 = r3.data?.productCreateMedia?.mediaUserErrors;
  if (errs3?.length) console.error(`  ⚠ image upload errors:`, errs3);
  else console.log(`  ↳ immagine in upload (async)`);

  // 1d. Publish to Online Store
  const r4 = await gql(PUBLISHABLE_PUBLISH, {
    id: product.id,
    input: [{ publicationId: ONLINE_STORE_PUB }],
  });
  const errs4 = r4.data?.publishablePublish?.userErrors;
  if (errs4?.length) console.error(`  ⚠ publish errors:`, errs4);
  else console.log(`  ↳ pubblicato su Online Store`);

  created.push({ tier: p.tier, productId: product.id, variantId: defaultVariantId, price: p.price, quantity: p.title.match(/(\d+) pezzi/)[1] + " cialde" });
  console.log("");
}

console.log("\n=== STEP 2: Metto in DRAFT i 3 vecchi prodotti Crema Oro funnel ===\n");

for (const old of CREMA_ORO_FUNNEL_TO_DRAFT) {
  const r = await gql(PRODUCT_UPDATE, { input: { id: old.id, status: "DRAFT" } });
  const errs = r.data?.productUpdate?.userErrors;
  if (errs?.length) console.error(`✗ ${old.label}:`, errs);
  else console.log(`✓ DRAFT: ${r.data.productUpdate.product.title}`);
}

console.log("\n\n=== RIASSUNTO PER lib/shopify.ts ===\n");
console.log('"cialde-44mm" intenso:');
console.log(`  miscela: "Extra Forte",`);
console.log(`  image: "${EXTRA_FORTE_IMG}",`);
for (const c of created) {
  console.log(`  ${c.tier}: { variantId: "${c.variantId}", price: ${parseFloat(c.price)}, quantity: "${c.quantity}" },`);
}

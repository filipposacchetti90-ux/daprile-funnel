// Rollback: cialde Crema Oro torna disponibile, sostituisce di nuovo Extra Forte nel funnel.
//
// - 3 prodotti [FUNNEL] Crema Oro: DRAFT → ACTIVE
// - 3 prodotti [FUNNEL] Extra Forte (creati il 30/04): ACTIVE → DRAFT
//
// Run: cd funnel && node --env-file=.env.local scripts/restore-cialde-crema-oro-2026-05-05.mjs

const SHOPIFY_DOMAIN = process.env.SHOPIFY_DOMAIN;
const CLIENT_ID = process.env.SHOPIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET;

const TO_ACTIVATE = [
  { id: "gid://shopify/Product/10825829744986", label: "[FUNNEL] Cialde Crema Oro 100pz (kit)" },
  { id: "gid://shopify/Product/10823948108122", label: "[FUNNEL] Cialde Crema Oro 200pz (mese1)" },
  { id: "gid://shopify/Product/10823948206426", label: "[FUNNEL] Cialde Crema Oro 600pz (mesi3)" },
];

const TO_DRAFT = [
  { id: "gid://shopify/Product/10837444329818", label: "[FUNNEL] Cialde Extra Forte 100pz (kit)" },
  { id: "gid://shopify/Product/10837444428122", label: "[FUNNEL] Cialde Extra Forte 200pz (mese1)" },
  { id: "gid://shopify/Product/10837444493658", label: "[FUNNEL] Cialde Extra Forte 600pz (mesi3)" },
];

const tokenRes = await fetch(`https://${SHOPIFY_DOMAIN}/admin/oauth/access_token.json`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ client_id: CLIENT_ID, client_secret: CLIENT_SECRET, grant_type: "client_credentials" }),
});
const TOKEN = (await tokenRes.json()).access_token;

const PRODUCT_UPDATE = `mutation productUpdate($input: ProductInput!) {
  productUpdate(input: $input) { product { id title status } userErrors { field message } }
}`;

async function setStatus(item, status) {
  const res = await fetch(`https://${SHOPIFY_DOMAIN}/admin/api/2024-01/graphql.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Shopify-Access-Token": TOKEN },
    body: JSON.stringify({ query: PRODUCT_UPDATE, variables: { input: { id: item.id, status } } }),
  });
  const j = await res.json();
  const errs = j.data?.productUpdate?.userErrors;
  if (errs?.length) {
    console.error(`✗ ${item.label}:`, errs);
    return false;
  }
  console.log(`✓ ${status}: ${item.label}`);
  return true;
}

console.log("=== STEP 1: ACTIVATE 3 prodotti Crema Oro ===\n");
for (const item of TO_ACTIVATE) await setStatus(item, "ACTIVE");

console.log("\n=== STEP 2: DRAFT 3 prodotti Extra Forte ===\n");
for (const item of TO_DRAFT) await setStatus(item, "DRAFT");

console.log("\nDone.");

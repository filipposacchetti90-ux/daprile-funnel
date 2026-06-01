// Mette in DRAFT tutti i 6 prodotti [FUNNEL] Nespresso (esauriti, Filippo non li produce per ora).
// Il quiz nasconde/disabilita anche l'opzione Nespresso lato UI.
// Riattivabile in 1 click + 1 commit quando torna disponibile.
//
// Run: cd funnel && node --env-file=.env.local scripts/draft-nespresso-funnel-2026-06-06.mjs

const SHOPIFY_DOMAIN = process.env.SHOPIFY_DOMAIN;
const CLIENT_ID = process.env.SHOPIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET;

const TO_DRAFT = [
  { id: "gid://shopify/Product/10824690565466", label: "[FUNNEL] Nespresso Gran Crema 100pz (kit)" },
  { id: "gid://shopify/Product/10824690663770", label: "[FUNNEL] Nespresso Crema Oro 100pz (kit)" },
  { id: "gid://shopify/Product/10823948337498", label: "[FUNNEL] Nespresso Gran Crema 200pz (mese1)" },
  { id: "gid://shopify/Product/10823948370266", label: "[FUNNEL] Nespresso Crema Oro 200pz (mese1)" },
  { id: "gid://shopify/Product/10823948403034", label: "[FUNNEL] Nespresso Gran Crema 600pz (mesi3)" },
  { id: "gid://shopify/Product/10823948435802", label: "[FUNNEL] Nespresso Crema Oro 600pz (mesi3)" },
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

let ok = 0, fail = 0;
for (const item of TO_DRAFT) {
  const res = await fetch(`https://${SHOPIFY_DOMAIN}/admin/api/2024-01/graphql.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Shopify-Access-Token": TOKEN },
    body: JSON.stringify({ query: PRODUCT_UPDATE, variables: { input: { id: item.id, status: "DRAFT" } } }),
  });
  const j = await res.json();
  const errs = j.data?.productUpdate?.userErrors;
  if (errs?.length) { console.error(`✗ ${item.label}:`, errs); fail++; }
  else { console.log(`✓ DRAFT: ${item.label}`); ok++; }
}
console.log(`\nDone. ${ok} ok, ${fail} falliti.`);

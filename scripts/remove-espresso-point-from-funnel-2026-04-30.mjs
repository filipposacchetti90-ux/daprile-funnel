// Rimuove dal funnel il formato "Lavazza Espresso Point" (decisione Filippo: pochi clienti).
// Mette in DRAFT i 10 prodotti FUNNEL Espresso Point + 1 prodotto orfano Cialde Kit 3 Miscele 60pz.
// I prodotti restano nello store ma non sono pubblicati né raggiungibili.
//
// Run: cd funnel && node --env-file=.env.local scripts/remove-espresso-point-from-funnel-2026-04-30.mjs

const SHOPIFY_DOMAIN = process.env.SHOPIFY_DOMAIN;
const CLIENT_ID = process.env.SHOPIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET;

const TO_DRAFT = [
  // Funnel Espresso Point (kit/mese1/mesi3 × 3 miscele = 9, + 1 kit "3 Miscele" orfano)
  { id: "gid://shopify/Product/10825829777754", label: "[FUNNEL] ESE Point Classica 100pz" },
  { id: "gid://shopify/Product/10825829810522", label: "[FUNNEL] ESE Point Gran Crema 100pz" },
  { id: "gid://shopify/Product/10825829843290", label: "[FUNNEL] ESE Point Crema Oro 100pz" },
  { id: "gid://shopify/Product/10823952793946", label: "[FUNNEL] ESE Point Classica 200pz" },
  { id: "gid://shopify/Product/10823952826714", label: "[FUNNEL] ESE Point Gran Crema 200pz" },
  { id: "gid://shopify/Product/10823952859482", label: "[FUNNEL] ESE Point Crema Oro 200pz" },
  { id: "gid://shopify/Product/10823952892250", label: "[FUNNEL] ESE Point Classica 600pz" },
  { id: "gid://shopify/Product/10823952925018", label: "[FUNNEL] ESE Point Gran Crema 600pz" },
  { id: "gid://shopify/Product/10823952957786", label: "[FUNNEL] ESE Point Crema Oro 600pz" },
  { id: "gid://shopify/Product/10824690860378", label: "[FUNNEL] ESE Point Kit 3 Miscele 60pz (orfano)" },
  // Orfano Cialde
  { id: "gid://shopify/Product/10824690532698", label: "[FUNNEL] Cialde ESE44 Kit 3 Miscele 60pz (orfano)" },
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
  if (errs?.length) {
    console.error(`✗ ${item.label}:`, errs);
    fail++;
  } else {
    console.log(`✓ DRAFT: ${item.label}`);
    ok++;
  }
}
console.log(`\nDone. ${ok} ok, ${fail} falliti.`);

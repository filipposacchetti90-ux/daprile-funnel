// One-shot: aggiunge tag `hidden` a tutti i prodotti tag:funnel
// (Filippo nel tema ha un filter che esclude prodotti via tag — proviamo `hidden` come tag standard)
//
// Run: cd funnel && node --env-file=.env.local scripts/add-hidden-tag-2026-04-25.mjs

const SHOPIFY_DOMAIN = process.env.SHOPIFY_DOMAIN;
const CLIENT_ID = process.env.SHOPIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET;

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

// 1. Fetch all tag:funnel products
const q = await gql(`query { products(first: 100, query: "tag:funnel") { nodes { id title tags } } }`);
const products = q.data.products.nodes;
console.log(`Trovati ${products.length} prodotti tag:funnel`);

const TAGS_ADD = `mutation tagsAdd($id: ID!, $tags: [String!]!) {
  tagsAdd(id: $id, tags: $tags) { node { id } userErrors { field message } }
}`;

let ok = 0, skip = 0, fail = 0;
for (const p of products) {
  if (p.tags.includes("hidden")) {
    console.log(`= già hidden: ${p.title}`);
    skip++;
    continue;
  }
  const r = await gql(TAGS_ADD, { id: p.id, tags: ["hidden"] });
  const errs = r.data?.tagsAdd?.userErrors;
  if (errs?.length) {
    console.error(`✗ ${p.title}:`, errs);
    fail++;
  } else {
    console.log(`✓ ${p.title}`);
    ok++;
  }
}
console.log(`\nDone. ${ok} taggati, ${skip} già taggati, ${fail} falliti.`);

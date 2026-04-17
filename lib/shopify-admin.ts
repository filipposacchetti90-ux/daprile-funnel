/* ─── Shopify Admin API — Server-side only ─── */

const SHOPIFY_DOMAIN = process.env.SHOPIFY_DOMAIN || "6dabbc-2.myshopify.com";
const CLIENT_ID = process.env.SHOPIFY_CLIENT_ID || "";
const CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET || "";

// Cache admin token in memory (regenerated every 23h)
let cachedToken: { value: string; expiresAt: number } | null = null;

async function getAdminToken(): Promise<string> {
  const now = Date.now();
  if (cachedToken && cachedToken.expiresAt > now) {
    return cachedToken.value;
  }

  const res = await fetch(`https://${SHOPIFY_DOMAIN}/admin/oauth/access_token.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: "client_credentials",
    }),
  });

  const data = await res.json();
  if (!data.access_token) {
    throw new Error("Failed to get Shopify admin token: " + JSON.stringify(data));
  }

  cachedToken = {
    value: data.access_token,
    expiresAt: now + (data.expires_in - 60) * 1000, // refresh 1 min before expiry
  };

  return cachedToken.value;
}

/* ─── Admin API GraphQL helper ─── */
export async function adminFetch(query: string, variables?: Record<string, unknown>) {
  const token = await getAdminToken();
  const res = await fetch(`https://${SHOPIFY_DOMAIN}/admin/api/2024-01/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
  });
  return res.json();
}

/* ─── Add product to existing order (OTO) ─── */
export async function addProductToOrder(orderId: string, variantId: string): Promise<{ success: boolean; error?: string }> {
  // Begin order edit
  const beginResult = await adminFetch(`
    mutation orderEditBegin($id: ID!) {
      orderEditBegin(id: $id) {
        calculatedOrder { id }
        userErrors { field message }
      }
    }
  `, { id: orderId });

  const calculatedOrderId = beginResult.data?.orderEditBegin?.calculatedOrder?.id;
  if (!calculatedOrderId) {
    const errors = beginResult.data?.orderEditBegin?.userErrors;
    return { success: false, error: errors?.[0]?.message || "orderEditBegin failed" };
  }

  // Add variant
  const addResult = await adminFetch(`
    mutation orderEditAddVariant($id: ID!, $variantId: ID!, $quantity: Int!) {
      orderEditAddVariant(id: $id, variantId: $variantId, quantity: $quantity) {
        calculatedOrder { id }
        userErrors { field message }
      }
    }
  `, { id: calculatedOrderId, variantId, quantity: 1 });

  const addErrors = addResult.data?.orderEditAddVariant?.userErrors;
  if (addErrors?.length > 0) {
    return { success: false, error: addErrors[0].message };
  }

  // Commit order edit
  const commitResult = await adminFetch(`
    mutation orderEditCommit($id: ID!) {
      orderEditCommit(id: $id, notifyCustomer: false, staffNote: "OTO aggiunta via funnel") {
        order { id }
        userErrors { field message }
      }
    }
  `, { id: calculatedOrderId });

  const commitErrors = commitResult.data?.orderEditCommit?.userErrors;
  if (commitErrors?.length > 0) {
    return { success: false, error: commitErrors[0].message };
  }

  return { success: true };
}

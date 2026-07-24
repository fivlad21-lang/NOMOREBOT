import { getPlan, type PlanId } from "@/data/course";

type PurchaseArgs = {
  orderId: string;
  planId: PlanId;
  valueUah?: number;
};

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    ttq?: {
      track: (event: string, payload?: Record<string, unknown>) => void;
      page: () => void;
      load: (id: string) => void;
    };
  }
}

function purchaseKey(orderId: string) {
  return `nomore_purchase_fired_${orderId}`;
}

export function hasFiredPurchase(orderId: string): boolean {
  if (typeof window === "undefined") return true;
  try {
    return window.sessionStorage.getItem(purchaseKey(orderId)) === "1";
  } catch {
    return false;
  }
}

function markPurchaseFired(orderId: string) {
  try {
    window.sessionStorage.setItem(purchaseKey(orderId), "1");
  } catch {
    // ignore
  }
}

function metaTrack(event: string, payload?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  if (payload) window.fbq("track", event, payload);
  else window.fbq("track", event);
}

function tiktokTrack(event: string, payload?: Record<string, unknown>) {
  if (typeof window === "undefined" || !window.ttq?.track) return;
  window.ttq.track(event, payload);
}

export function trackViewContent() {
  metaTrack("ViewContent");
  tiktokTrack("ViewContent");
}

export function trackInitiateCheckout(planId: PlanId) {
  const plan = getPlan(planId);
  const value = plan?.priceUah ?? 0;
  const payload = {
    value,
    currency: "UAH",
    content_ids: [planId],
    content_type: "product",
    contents: [{ content_id: planId, quantity: 1, price: value }],
  };
  metaTrack("InitiateCheckout", payload);
  tiktokTrack("InitiateCheckout", payload);
}

/** Fire once per orderId when payment is confirmed paid. */
export function trackPurchase({ orderId, planId, valueUah }: PurchaseArgs) {
  if (!orderId || hasFiredPurchase(orderId)) return;
  markPurchaseFired(orderId);

  const plan = getPlan(planId);
  const value = valueUah ?? plan?.priceUah ?? 0;
  const payload = {
    value,
    currency: "UAH",
    content_ids: [planId],
    content_type: "product",
    contents: [{ content_id: planId, quantity: 1, price: value }],
  };

  metaTrack("Purchase", payload);
  // TikTok standard purchase-equivalent event
  tiktokTrack("CompletePayment", payload);
}

type StoredOrder = {
  orderReference: string;
  planId: string;
  email: string;
  telegram?: string;
  amountUah: number;
  status: "pending" | "paid" | "failed";
  provisioned?: boolean;
  updatedAt: number;
};

const g = globalThis as typeof globalThis & {
  __nomoreOrders?: Map<string, StoredOrder>;
};

function store() {
  if (!g.__nomoreOrders) g.__nomoreOrders = new Map();
  return g.__nomoreOrders;
}

export function saveOrder(order: StoredOrder) {
  store().set(order.orderReference, order);
}

export function getOrder(orderReference: string) {
  return store().get(orderReference);
}

export function markOrderPaid(orderReference: string) {
  const current = store().get(orderReference);
  if (!current) return null;
  const next = {
    ...current,
    status: "paid" as const,
    updatedAt: Date.now(),
  };
  store().set(orderReference, next);
  return next;
}

export function markProvisioned(orderReference: string) {
  const current = store().get(orderReference);
  if (!current) return null;
  const next = { ...current, provisioned: true, updatedAt: Date.now() };
  store().set(orderReference, next);
  return next;
}

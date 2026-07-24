import { Redis } from "@upstash/redis";

export type OrderStatus = "pending" | "paid" | "failed";

export type StoredOrder = {
  orderReference: string;
  planId: string;
  email: string;
  telegram?: string;
  amountUah: number;
  status: OrderStatus;
  providerStatus?: string | null;
  reason?: string | null;
  source?: string | null;
  provisioned?: boolean;
  createdAt: number;
  updatedAt: number;
};

const ORDER_TTL_SECONDS = 60 * 60 * 24 * 45; // 45 days
const KEY_PREFIX = "nomore:order:";

const g = globalThis as typeof globalThis & {
  __nomoreOrders?: Map<string, StoredOrder>;
  __nomoreOrdersBackendLogged?: boolean;
};

function memoryStore() {
  if (!g.__nomoreOrders) g.__nomoreOrders = new Map();
  return g.__nomoreOrders;
}

function redisEnv() {
  const url =
    process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || "";
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.KV_REST_API_TOKEN ||
    "";
  if (!url || !token) return null;
  return { url, token };
}

let redisClient: Redis | null | undefined;

function getRedis(): Redis | null {
  if (redisClient !== undefined) return redisClient;
  const env = redisEnv();
  if (!env) {
    redisClient = null;
    return null;
  }
  redisClient = new Redis({ url: env.url, token: env.token });
  return redisClient;
}

export function getOrdersBackend(): "redis" | "memory" {
  return redisEnv() ? "redis" : "memory";
}

function logBackendOnce() {
  if (g.__nomoreOrdersBackendLogged) return;
  g.__nomoreOrdersBackendLogged = true;
  const backend = getOrdersBackend();
  if (backend === "memory") {
    console.warn(
      "[orders] Using in-memory store. Set UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN (or KV_REST_API_*) on Vercel for multi-instance persistence.",
    );
  } else {
    console.info("[orders] Using Upstash/Vercel KV Redis backend");
  }
}

function orderKey(orderReference: string) {
  return `${KEY_PREFIX}${orderReference}`;
}

function normalizeOrder(raw: StoredOrder): StoredOrder {
  const now = Date.now();
  return {
    ...raw,
    createdAt: raw.createdAt || raw.updatedAt || now,
    updatedAt: raw.updatedAt || now,
  };
}

export async function saveOrder(order: StoredOrder): Promise<StoredOrder> {
  logBackendOnce();
  const now = Date.now();
  const next = normalizeOrder({
    ...order,
    createdAt: order.createdAt || now,
    updatedAt: now,
  });

  const redis = getRedis();
  if (redis) {
    await redis.set(orderKey(next.orderReference), next, {
      ex: ORDER_TTL_SECONDS,
    });
  } else {
    memoryStore().set(next.orderReference, next);
  }
  return next;
}

export async function getOrder(
  orderReference: string,
): Promise<StoredOrder | null> {
  logBackendOnce();
  const redis = getRedis();
  if (redis) {
    const value = await redis.get<StoredOrder>(orderKey(orderReference));
    return value ? normalizeOrder(value) : null;
  }
  return memoryStore().get(orderReference) ?? null;
}

export async function markOrderPaid(
  orderReference: string,
): Promise<StoredOrder | null> {
  const current = await getOrder(orderReference);
  if (!current) return null;
  if (current.status === "paid") return current;
  return saveOrder({
    ...current,
    status: "paid",
    updatedAt: Date.now(),
  });
}

export async function markOrderFailed(
  orderReference: string,
  extra?: { providerStatus?: string | null; reason?: string | null },
): Promise<StoredOrder | null> {
  const current = await getOrder(orderReference);
  if (!current) return null;
  if (current.status === "paid") return current;
  return saveOrder({
    ...current,
    status: "failed",
    providerStatus: extra?.providerStatus ?? current.providerStatus,
    reason: extra?.reason ?? current.reason,
    updatedAt: Date.now(),
  });
}

export async function markProvisioned(
  orderReference: string,
): Promise<StoredOrder | null> {
  const current = await getOrder(orderReference);
  if (!current) return null;
  return saveOrder({
    ...current,
    provisioned: true,
    updatedAt: Date.now(),
  });
}

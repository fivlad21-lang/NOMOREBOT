import { NextResponse } from "next/server";
import { getOrdersBackend } from "@/lib/orders";

/** Lightweight health for deploy checks (no secrets). */
export async function GET() {
  const ordersBackend = getOrdersBackend();
  return NextResponse.json({
    ok: true,
    ordersBackend,
    hint:
      ordersBackend === "memory"
        ? "Set UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN (or KV_REST_API_*) for durable orders"
        : "Redis/KV connected",
  });
}

import { NextResponse } from "next/server";
import { getPlan } from "@/data/course";
import {
  getOrder,
  markOrderFailed,
  markOrderPaid,
  saveOrder,
} from "@/lib/orders";
import {
  checkPaymentStatus,
  decodeOrderReference,
} from "@/lib/wayforpay";

/** WayForPay statuses that mean the payment will not succeed. */
const FAILED_STATUSES = new Set(
  [
    "Declined",
    "Expired",
    "Refunded",
    "Voided",
    "RefundInProcessing",
  ].map((s) => s.toLowerCase()),
);

function mapProviderStatus(transactionStatus?: string | null): {
  status: "paid" | "pending" | "failed";
  failed: boolean;
} {
  const raw = (transactionStatus || "").trim();
  if (!raw) return { status: "pending", failed: false };
  if (raw === "Approved") return { status: "paid", failed: false };
  if (FAILED_STATUSES.has(raw.toLowerCase())) {
    return { status: "failed", failed: true };
  }
  // InProcessing, Pending, WaitingAuthComplete, etc.
  return { status: "pending", failed: false };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderReference =
    searchParams.get("order") || searchParams.get("orderId");

  if (!orderReference) {
    return NextResponse.json({ error: "order is required" }, { status: 400 });
  }

  const meta = decodeOrderReference(orderReference);
  if (!meta) {
    return NextResponse.json({ error: "Invalid order" }, { status: 400 });
  }

  const plan = getPlan(meta.planId);
  if (!plan) {
    return NextResponse.json({ error: "Unknown plan" }, { status: 400 });
  }

  let local = getOrder(orderReference);
  if (!local) {
    local = {
      orderReference,
      planId: plan.id,
      email: meta.email,
      telegram: meta.telegram,
      amountUah: plan.priceUah,
      status: "pending",
      updatedAt: Date.now(),
    };
    saveOrder(local);
  }

  if (local.status === "paid") {
    return NextResponse.json({
      ok: true,
      orderId: orderReference,
      status: "paid",
      planId: plan.id,
      email: meta.email,
      telegram: meta.telegram,
    });
  }

  if (local.status === "failed") {
    return NextResponse.json({
      ok: true,
      orderId: orderReference,
      status: "failed",
      planId: plan.id,
      reason: "Payment not approved",
    });
  }

  try {
    const remote = await checkPaymentStatus(orderReference);
    const mapped = mapProviderStatus(remote.transactionStatus);

    if (mapped.status === "paid") {
      markOrderPaid(orderReference);
      return NextResponse.json({
        ok: true,
        orderId: orderReference,
        status: "paid",
        planId: plan.id,
        email: meta.email,
        telegram: meta.telegram,
        transactionStatus: remote.transactionStatus,
        providerStatus: remote.transactionStatus,
      });
    }

    if (mapped.status === "failed") {
      markOrderFailed(orderReference);
      return NextResponse.json({
        ok: true,
        orderId: orderReference,
        status: "failed",
        planId: plan.id,
        transactionStatus: remote.transactionStatus,
        providerStatus: remote.transactionStatus,
        reason: remote.reason != null ? String(remote.reason) : remote.transactionStatus,
      });
    }

    return NextResponse.json({
      ok: true,
      orderId: orderReference,
      status: "pending",
      planId: plan.id,
      transactionStatus: remote.transactionStatus,
      providerStatus: remote.transactionStatus || "Unknown",
    });
  } catch (err) {
    console.error("[pay.status]", err);
    return NextResponse.json({
      ok: true,
      orderId: orderReference,
      status: "pending" as const,
      planId: plan.id,
      providerStatus: "check_failed",
    });
  }
}

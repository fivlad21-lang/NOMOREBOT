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
  mapPaymentUiStatus,
} from "@/lib/wayforpay";

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

  let local = await getOrder(orderReference);
  if (!local) {
    const now = Date.now();
    local = await saveOrder({
      orderReference,
      planId: plan.id,
      email: meta.email,
      telegram: meta.telegram,
      amountUah: plan.priceUah,
      status: "pending",
      createdAt: now,
      updatedAt: now,
    });
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
      reason: local.reason || "Payment not approved",
    });
  }

  try {
    const remote = await checkPaymentStatus(orderReference);
    const mapped = mapPaymentUiStatus(
      remote.transactionStatus,
      remote.reasonCode,
    );

    if (mapped === "paid") {
      await markOrderPaid(orderReference);
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

    if (mapped === "failed") {
      await markOrderFailed(orderReference, {
        providerStatus: remote.transactionStatus,
        reason:
          remote.reason != null
            ? String(remote.reason)
            : remote.transactionStatus,
      });
      return NextResponse.json({
        ok: true,
        orderId: orderReference,
        status: "failed",
        planId: plan.id,
        transactionStatus: remote.transactionStatus,
        providerStatus: remote.transactionStatus,
        reason:
          remote.reason != null
            ? String(remote.reason)
            : remote.transactionStatus,
      });
    }

    return NextResponse.json({
      ok: true,
      orderId: orderReference,
      status: "pending",
      planId: plan.id,
      transactionStatus: remote.transactionStatus,
      providerStatus: remote.transactionStatus || "Unknown",
      reasonCode: remote.reasonCode ?? null,
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

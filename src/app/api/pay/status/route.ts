import { NextResponse } from "next/server";
import { getPlan } from "@/data/course";
import { getOrder, markOrderPaid, saveOrder } from "@/lib/orders";
import {
  checkPaymentStatus,
  decodeOrderReference,
} from "@/lib/wayforpay";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderReference = searchParams.get("order");

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
      status: "paid",
      planId: plan.id,
      email: meta.email,
      telegram: meta.telegram,
    });
  }

  try {
    const remote = await checkPaymentStatus(orderReference);
    if (remote.transactionStatus === "Approved") {
      markOrderPaid(orderReference);
      return NextResponse.json({
        ok: true,
        status: "paid",
        planId: plan.id,
        email: meta.email,
        telegram: meta.telegram,
        providerStatus: remote.transactionStatus,
      });
    }

    return NextResponse.json({
      ok: true,
      status: "pending",
      planId: plan.id,
      providerStatus: remote.transactionStatus || "Unknown",
    });
  } catch (err) {
    console.error("[pay.status]", err);
    return NextResponse.json({
      ok: true,
      status: local.status,
      planId: plan.id,
      providerStatus: "check_failed",
    });
  }
}

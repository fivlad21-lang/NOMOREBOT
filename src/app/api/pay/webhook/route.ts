import { NextResponse } from "next/server";
import { getPlan } from "@/data/course";
import {
  getOrder,
  markOrderFailed,
  markOrderPaid,
  markProvisioned,
  saveOrder,
} from "@/lib/orders";
import {
  buildWebhookAck,
  decodeOrderReference,
  getWfpConfig,
  mapPaymentUiStatus,
  verifyWebhookSignature,
  type WfpWebhookPayload,
} from "@/lib/wayforpay";

export async function POST(request: Request) {
  let payload: WfpWebhookPayload;

  try {
    const text = await request.text();
    payload = JSON.parse(text) as WfpWebhookPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  let secretKey: string;
  try {
    secretKey = getWfpConfig().secretKey;
  } catch (err) {
    console.error("[pay.webhook] config", err);
    return NextResponse.json({ error: "Misconfigured" }, { status: 500 });
  }

  if (!verifyWebhookSignature(payload, secretKey)) {
    console.error("[pay.webhook] bad signature", payload.orderReference);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const orderReference = payload.orderReference;
  if (!orderReference) {
    return NextResponse.json({ error: "Missing orderReference" }, { status: 400 });
  }

  const meta = decodeOrderReference(orderReference);
  let existing = await getOrder(orderReference);

  if (!existing && meta) {
    const plan = getPlan(meta.planId);
    if (plan) {
      const now = Date.now();
      existing = await saveOrder({
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
  }

  const order = (await getOrder(orderReference)) || existing;
  const expectedAmount = order?.amountUah;
  const paidAmount = Number(payload.amount);

  if (
    expectedAmount != null &&
    Number.isFinite(paidAmount) &&
    Math.abs(paidAmount - expectedAmount) > 0.01
  ) {
    console.error("[pay.webhook] amount mismatch", {
      orderReference,
      expectedAmount,
      paidAmount,
    });
    return NextResponse.json({ error: "Amount mismatch" }, { status: 400 });
  }

  const mapped = mapPaymentUiStatus(
    payload.transactionStatus,
    payload.reasonCode,
  );

  if (mapped === "paid") {
    const paid = (await markOrderPaid(orderReference)) || order;
    if (paid && !paid.provisioned) {
      console.info("[pay.webhook] APPROVED — provision access", {
        orderReference,
        planId: paid.planId,
        email: paid.email,
        telegram: paid.telegram,
        amountUah: paid.amountUah,
      });
      // TODO: send email + TG invite automation
      await markProvisioned(orderReference);
    }
  } else if (mapped === "failed") {
    await markOrderFailed(orderReference, {
      providerStatus: payload.transactionStatus,
      reason:
        payload.reason != null
          ? String(payload.reason)
          : payload.transactionStatus,
    });
    console.info("[pay.webhook] FAILED", {
      orderReference,
      transactionStatus: payload.transactionStatus,
      reasonCode: payload.reasonCode,
    });
  } else {
    console.info("[pay.webhook] status", {
      orderReference,
      transactionStatus: payload.transactionStatus,
      reasonCode: payload.reasonCode,
      mapped,
    });
  }

  const ack = buildWebhookAck(orderReference, secretKey);
  return NextResponse.json(ack);
}

import { NextResponse } from "next/server";
import {
  getOrder,
  markOrderFailed,
  markOrderPaid,
  saveOrder,
} from "@/lib/orders";
import { getPlan, type PlanId } from "@/data/course";
import {
  decodeOrderReference,
  mapPaymentUiStatus,
} from "@/lib/wayforpay";

const PLAN_IDS: PlanId[] = ["start", "community", "mentor"];

function isPlanId(value: string | null | undefined): value is PlanId {
  return !!value && PLAN_IDS.includes(value as PlanId);
}

async function readWfpFields(request: Request): Promise<{
  orderReference?: string;
  transactionStatus?: string;
  reason?: string;
  reasonCode?: string;
}> {
  const contentType = request.headers.get("content-type") || "";

  try {
    if (contentType.includes("application/json")) {
      const json = (await request.json()) as Record<string, unknown>;
      return {
        orderReference:
          typeof json.orderReference === "string"
            ? json.orderReference
            : undefined,
        transactionStatus:
          typeof json.transactionStatus === "string"
            ? json.transactionStatus
            : undefined,
        reason: json.reason != null ? String(json.reason) : undefined,
        reasonCode:
          json.reasonCode != null ? String(json.reasonCode) : undefined,
      };
    }

    if (
      contentType.includes("application/x-www-form-urlencoded") ||
      contentType.includes("multipart/form-data")
    ) {
      const form = await request.formData();
      const orderReference = form.get("orderReference");
      const transactionStatus = form.get("transactionStatus");
      const reason = form.get("reason");
      const reasonCode = form.get("reasonCode");
      return {
        orderReference:
          typeof orderReference === "string" ? orderReference : undefined,
        transactionStatus:
          typeof transactionStatus === "string" ? transactionStatus : undefined,
        reason: reason != null ? String(reason) : undefined,
        reasonCode: reasonCode != null ? String(reasonCode) : undefined,
      };
    }

    const text = await request.text();
    if (text.trim().startsWith("{")) {
      const json = JSON.parse(text) as Record<string, unknown>;
      return {
        orderReference:
          typeof json.orderReference === "string"
            ? json.orderReference
            : undefined,
        transactionStatus:
          typeof json.transactionStatus === "string"
            ? json.transactionStatus
            : undefined,
        reason: json.reason != null ? String(json.reason) : undefined,
        reasonCode:
          json.reasonCode != null ? String(json.reasonCode) : undefined,
      };
    }
  } catch (err) {
    console.warn("[pay.return] body parse skipped", err);
  }

  return {};
}

function resolvePlanAndOrder(input: {
  queryPlan: string | null;
  queryOrder: string | null;
  bodyOrder?: string;
}): { planId: PlanId; order: string | null } {
  const order = input.queryOrder || input.bodyOrder || null;
  const fromOrder =
    order?.startsWith("NL-") && isPlanId(order.split("-")[1])
      ? (order.split("-")[1] as PlanId)
      : null;
  const planId = isPlanId(input.queryPlan)
    ? input.queryPlan
    : fromOrder || "community";
  return { planId, order };
}

async function syncLocalOrder(
  orderReference: string,
  planId: PlanId,
  uiStatus: "paid" | "pending" | "failed",
) {
  const meta = decodeOrderReference(orderReference);
  const plan = getPlan(meta?.planId || planId);
  if (!plan) return;

  let local = await getOrder(orderReference);
  if (!local && meta) {
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

  if (uiStatus === "paid") {
    await markOrderPaid(orderReference);
  } else if (uiStatus === "failed") {
    await markOrderFailed(orderReference);
  }
}

function thanksRedirect(
  request: Request,
  planId: PlanId,
  order: string | null,
  wfpStatus?: string | null,
  reason?: string | null,
) {
  const url = new URL("/thanks", request.url);
  url.searchParams.set("plan", planId);
  if (order) url.searchParams.set("order", order);
  if (wfpStatus) url.searchParams.set("wfpStatus", wfpStatus);
  if (reason) url.searchParams.set("reason", reason.slice(0, 180));
  return NextResponse.redirect(url, 303);
}

/**
 * WayForPay browser return endpoint.
 * Accepts GET/POST and always 303 → /thanks (never leaves App Router page on POST).
 */
async function handleReturn(request: Request) {
  const { searchParams } = new URL(request.url);
  const body =
    request.method === "POST" ? await readWfpFields(request) : {};

  const { planId, order } = resolvePlanAndOrder({
    queryPlan: searchParams.get("plan"),
    queryOrder: searchParams.get("order") || searchParams.get("orderId"),
    bodyOrder: body.orderReference,
  });

  const transactionStatus =
    body.transactionStatus || searchParams.get("wfpStatus") || null;
  const reasonCode =
    body.reasonCode || searchParams.get("reasonCode") || null;
  const reason = body.reason || searchParams.get("reason") || null;
  const uiStatus = mapPaymentUiStatus(transactionStatus, reasonCode);

  if (order) {
    await syncLocalOrder(order, planId, uiStatus);
  }

  console.info("[pay.return]", {
    method: request.method,
    planId,
    order,
    transactionStatus,
    uiStatus,
  });

  return thanksRedirect(request, planId, order, transactionStatus, reason);
}

export async function GET(request: Request) {
  return handleReturn(request);
}

export async function POST(request: Request) {
  return handleReturn(request);
}

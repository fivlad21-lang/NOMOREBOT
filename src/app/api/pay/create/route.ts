import { NextResponse } from "next/server";
import { getPlan, type PlanId } from "@/data/course";

type Body = {
  planId?: PlanId;
  email?: string;
  telegram?: string;
  amountUsd?: number;
  amountUah?: number;
};

export async function POST(request: Request) {
  let body: Body;

  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const plan = getPlan(body.planId);
  if (!plan) {
    return NextResponse.json({ error: "Unknown plan" }, { status: 400 });
  }

  const email = body.email?.trim();
  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  if (plan.id !== "start" && !body.telegram?.trim()) {
    return NextResponse.json(
      { error: "Telegram is required for this plan" },
      { status: 400 },
    );
  }

  const orderId = `SL-${Date.now().toString(36).toUpperCase()}`;

  // Mock payment provider. Replace with LiqPay / Fondy / Stripe create-session.
  const redirectUrl = `/thanks?plan=${plan.id}&order=${orderId}`;

  // Optional: fire mock webhook side-effect in demo environments.
  if (process.env.MOCK_PAY_WEBHOOK === "1") {
    await fetch(new URL("/api/pay/webhook", request.url), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId,
        planId: plan.id,
        email,
        telegram: body.telegram,
        amountUsd: plan.priceUsd,
        amountUah: plan.priceUah,
        status: "success",
      }),
    }).catch(() => undefined);
  }

  return NextResponse.json({
    ok: true,
    provider: "mock",
    orderId,
    redirectUrl,
  });
}

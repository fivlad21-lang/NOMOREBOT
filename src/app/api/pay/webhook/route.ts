import { NextResponse } from "next/server";

type WebhookBody = {
  orderId?: string;
  planId?: string;
  email?: string;
  telegram?: string;
  amountUsd?: number;
  amountUah?: number;
  status?: string;
};

export async function POST(request: Request) {
  let body: WebhookBody;

  try {
    body = (await request.json()) as WebhookBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (body.status !== "success" || !body.orderId || !body.planId) {
    return NextResponse.json({ error: "Ignored" }, { status: 400 });
  }

  // Production: verify signature, mark order paid, provision access
  // (email link / TG invite / mentor tag).
  console.info("[pay.webhook]", {
    orderId: body.orderId,
    planId: body.planId,
    email: body.email,
    telegram: body.telegram,
    amountUsd: body.amountUsd,
    amountUah: body.amountUah,
  });

  return NextResponse.json({ ok: true });
}

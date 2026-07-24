import { NextResponse } from "next/server";
import { getPlan, type PlanId } from "@/data/course";
import { saveOrder } from "@/lib/orders";
import {
  createInvoice,
  encodeOrderReference,
} from "@/lib/wayforpay";

type Body = {
  planId?: PlanId;
  email?: string;
  telegram?: string;
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

  const telegram = body.telegram?.trim();
  if (plan.id !== "start" && !telegram) {
    return NextResponse.json(
      { error: "Telegram is required for this plan" },
      { status: 400 },
    );
  }

  try {
    const orderReference = encodeOrderReference({
      planId: plan.id,
      email,
      telegram,
    });

    saveOrder({
      orderReference,
      planId: plan.id,
      email,
      telegram,
      amountUah: plan.priceUah,
      status: "pending",
      updatedAt: Date.now(),
    });

    const { ok, data, requestDomain } = await createInvoice({
      orderReference,
      amountUah: plan.priceUah,
      productName: `NOMORE LAB — ${plan.name}`,
      email,
      telegram,
      planId: plan.id,
    });

    if (!ok || !data.invoiceUrl) {
      console.error("[pay.create] WayForPay error", data, { requestDomain });
      return NextResponse.json(
        {
          error:
            "Не вдалося створити рахунок WayForPay. Перевір merchantAccount, secret key і що domain у кабінеті = nomorebot.vercel.app",
          details: data,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      provider: "wayforpay",
      orderId: orderReference,
      redirectUrl: data.invoiceUrl,
    });
  } catch (err) {
    console.error("[pay.create]", err);
    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : "Payment create failed",
      },
      { status: 500 },
    );
  }
}

import { createHmac, randomBytes } from "crypto";
import type { PlanId } from "@/data/course";
import { getPlan } from "@/data/course";

const API_URL = "https://api.wayforpay.com/api";

export type OrderMeta = {
  planId: PlanId;
  email: string;
  telegram?: string;
};

export function getWfpConfig() {
  const merchantAccount = process.env.WAYFORPAY_MERCHANT_ACCOUNT;
  const secretKey = process.env.WAYFORPAY_SECRET_KEY;
  const domain =
    process.env.WAYFORPAY_DOMAIN || "nomorebot.vercel.app";
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://nomorebot.vercel.app";
  const serviceUrl =
    process.env.WAYFORPAY_SERVICE_URL ||
    `${siteUrl.replace(/\/$/, "")}/api/pay/webhook`;

  if (!merchantAccount || !secretKey) {
    throw new Error(
      "WAYFORPAY_MERCHANT_ACCOUNT and WAYFORPAY_SECRET_KEY are required",
    );
  }

  return { merchantAccount, secretKey, domain, siteUrl, serviceUrl };
}

export function hmacMd5(secret: string, parts: Array<string | number>) {
  return createHmac("md5", secret)
    .update(parts.map(String).join(";"), "utf8")
    .digest("hex");
}

export function encodeOrderReference(meta: OrderMeta) {
  const payload = Buffer.from(
    JSON.stringify({
      e: meta.email,
      t: meta.telegram || "",
      p: meta.planId,
    }),
    "utf8",
  ).toString("base64url");
  const rand = randomBytes(3).toString("hex");
  return `NL-${meta.planId}-${payload}-${rand}`;
}

export function decodeOrderReference(orderReference: string): OrderMeta | null {
  const parts = orderReference.split("-");
  // NL-{planId}-{payload}-{rand} — planId has no dashes; payload is base64url
  if (parts.length < 4 || parts[0] !== "NL") return null;
  const planId = parts[1] as PlanId;
  const payload = parts.slice(2, -1).join("-");
  try {
    const raw = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as { e?: string; t?: string; p?: PlanId };
    const plan = getPlan(raw.p || planId);
    if (!plan || !raw.e) return null;
    return {
      planId: plan.id,
      email: raw.e,
      telegram: raw.t || undefined,
    };
  } catch {
    return null;
  }
}

type CreateInvoiceInput = {
  orderReference: string;
  amountUah: number;
  productName: string;
  email: string;
  telegram?: string;
  planId: PlanId;
};

export async function createInvoice(input: CreateInvoiceInput) {
  const { merchantAccount, secretKey, domain, siteUrl, serviceUrl } =
    getWfpConfig();

  const orderDate = Math.floor(Date.now() / 1000);
  const amount = Number(input.amountUah);
  const currency = "UAH";
  const productName = [input.productName];
  const productCount = [1];
  const productPrice = [amount];

  const merchantSignature = hmacMd5(secretKey, [
    merchantAccount,
    domain,
    input.orderReference,
    orderDate,
    amount,
    currency,
    ...productName,
    ...productCount,
    ...productPrice,
  ]);

  const returnUrl = `${siteUrl.replace(/\/$/, "")}/thanks?plan=${input.planId}&order=${encodeURIComponent(input.orderReference)}`;

  const body = {
    transactionType: "CREATE_INVOICE",
    merchantAccount,
    merchantAuthType: "SimpleSignature",
    merchantDomainName: domain,
    merchantSignature,
    apiVersion: 1,
    language: "UA",
    serviceUrl,
    returnUrl,
    orderReference: input.orderReference,
    orderDate,
    amount,
    currency,
    orderTimeout: 86400,
    productName,
    productCount,
    productPrice,
    clientEmail: input.email,
    clientFirstName: input.telegram?.replace(/^@/, "") || "Client",
    clientLastName: input.planId,
    paymentSystems: "card;googlePay;applePay",
  };

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = (await res.json()) as {
    reason?: string | number;
    reasonCode?: string | number;
    invoiceUrl?: string;
    qrCode?: string;
  };

  const ok =
    !!data.invoiceUrl &&
    (String(data.reasonCode) === "1100" ||
      String(data.reason) === "1100" ||
      String(data.reasonCode).toLowerCase() === "ok" ||
      String(data.reason).toLowerCase() === "ok");

  return { ok, data, requestDomain: domain };
}

export type WfpWebhookPayload = {
  merchantAccount?: string;
  orderReference?: string;
  merchantSignature?: string;
  amount?: string | number;
  currency?: string;
  authCode?: string;
  email?: string;
  phone?: string;
  cardPan?: string;
  transactionStatus?: string;
  reason?: string | number;
  reasonCode?: string | number;
};

export function verifyWebhookSignature(
  payload: WfpWebhookPayload,
  secretKey: string,
) {
  if (!payload.merchantSignature) return false;
  const expected = hmacMd5(secretKey, [
    payload.merchantAccount || "",
    payload.orderReference || "",
    payload.amount || "",
    payload.currency || "",
    payload.authCode || "",
    payload.cardPan || "",
    payload.transactionStatus || "",
    payload.reasonCode || "",
  ]);
  return expected.toLowerCase() === payload.merchantSignature.toLowerCase();
}

export function buildWebhookAck(orderReference: string, secretKey: string) {
  const time = Math.floor(Date.now() / 1000);
  const status = "accept";
  const signature = hmacMd5(secretKey, [orderReference, status, time]);
  return { orderReference, status, time, signature };
}

export async function checkPaymentStatus(orderReference: string) {
  const { merchantAccount, secretKey } = getWfpConfig();
  const merchantSignature = hmacMd5(secretKey, [
    merchantAccount,
    orderReference,
  ]);

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      transactionType: "CHECK_STATUS",
      merchantAccount,
      orderReference,
      merchantSignature,
      apiVersion: 1,
    }),
  });

  return (await res.json()) as {
    transactionStatus?: string;
    reasonCode?: string | number;
    reason?: string | number;
    amount?: string | number;
    currency?: string;
    orderReference?: string;
  };
}

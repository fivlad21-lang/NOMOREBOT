#!/usr/bin/env node
/**
 * E2 WayForPay smoke against official test merchant (wiki credentials).
 * Usage: npm run smoke:wfp
 */
import crypto from "node:crypto";

const merchantAccount = "test_merch_n1";
const secretKey = "flk3409refn54t54t*FNJRET";
const domain = process.env.WAYFORPAY_DOMAIN || "nomorebot.vercel.app";
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://nomorebot.vercel.app"
).replace(/\/$/, "");

function hmac(parts) {
  return crypto
    .createHmac("md5", secretKey)
    .update(parts.map(String).join(";"), "utf8")
    .digest("hex");
}

const FAILED = new Set([
  "declined",
  "expired",
  "refunded",
  "voided",
  "refundinprocessing",
  "rejected",
  "failed",
]);
const PENDING_CODES = new Set([
  "1131",
  "1132",
  "1134",
  "1144",
  "1145",
  "1151",
  "5100",
]);

function mapUi(status, reasonCode) {
  const code = reasonCode != null ? String(reasonCode).trim() : "";
  if (code && PENDING_CODES.has(code)) return "pending";
  const raw = (status || "").trim();
  if (!raw) return "pending";
  if (raw.toLowerCase() === "approved") return "paid";
  if (FAILED.has(raw.toLowerCase())) return "failed";
  return "pending";
}

async function createInvoice(planId, amount) {
  const orderReference = `NL-${planId}-e2smoke-${Date.now().toString(36)}`;
  const orderDate = Math.floor(Date.now() / 1000);
  const currency = "UAH";
  const productName = [`NOMORE LAB — ${planId}`];
  const productCount = [1];
  const productPrice = [amount];
  const merchantSignature = hmac([
    merchantAccount,
    domain,
    orderReference,
    orderDate,
    amount,
    currency,
    ...productName,
    ...productCount,
    ...productPrice,
  ]);
  const returnUrl = `${siteUrl}/api/pay/return?plan=${planId}&order=${encodeURIComponent(orderReference)}`;
  const body = {
    transactionType: "CREATE_INVOICE",
    merchantAccount,
    merchantAuthType: "SimpleSignature",
    merchantDomainName: domain,
    merchantSignature,
    apiVersion: 1,
    language: "UA",
    serviceUrl: `${siteUrl}/api/pay/webhook`,
    returnUrl,
    orderReference,
    orderDate,
    amount,
    currency,
    orderTimeout: 86400,
    productName,
    productCount,
    productPrice,
    clientEmail: "e2smoke@example.com",
    clientFirstName: "E2",
    clientLastName: planId,
    paymentSystems: "card;googlePay;applePay",
  };
  const data = await fetch("https://api.wayforpay.com/api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then((r) => r.json());
  return { orderReference, returnUrl, data };
}

async function checkStatus(orderReference) {
  const merchantSignature = hmac([merchantAccount, orderReference]);
  return fetch("https://api.wayforpay.com/api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      transactionType: "CHECK_STATUS",
      merchantAccount,
      orderReference,
      merchantSignature,
      apiVersion: 1,
    }),
  }).then((r) => r.json());
}

async function main() {
  const plans = [
    ["start", 820],
    ["community", 2010],
    ["mentor", 4100],
  ];

  console.log("E2 smoke: test_merch_n1 @", domain);
  let failed = 0;

  const mapCases = [
    ["Declined", 1151, "pending"],
    ["Declined", 1104, "failed"],
    ["Approved", 1100, "paid"],
    ["Expired", null, "failed"],
    ["InProcessing", 1131, "pending"],
  ];
  for (const [st, code, expect] of mapCases) {
    const got = mapUi(st, code);
    const ok = got === expect;
    if (!ok) failed += 1;
    console.log(
      ok ? "OK " : "FAIL",
      `map(${st}, ${code}) => ${got} (expect ${expect})`,
    );
  }

  for (const [planId, amount] of plans) {
    const created = await createInvoice(planId, amount);
    const okCreate =
      !!created.data.invoiceUrl && String(created.data.reasonCode) === "1100";
    if (!okCreate) failed += 1;
    console.log(
      okCreate ? "OK " : "FAIL",
      `CREATE ${planId}`,
      created.data.reasonCode,
      created.data.invoiceUrl || created.data.reason,
    );

    const status = await checkStatus(created.orderReference);
    const ui = mapUi(status.transactionStatus, status.reasonCode);
    const okPending = ui === "pending";
    if (!okPending) failed += 1;
    console.log(
      okPending ? "OK " : "FAIL",
      `CHECK ${planId}`,
      status.transactionStatus,
      status.reasonCode,
      "→",
      ui,
    );
    console.log("     returnUrl:", created.returnUrl);
  }

  console.log(
    failed === 0 ? "\nE2 API smoke PASS" : `\nE2 API smoke FAIL (${failed})`,
  );
  process.exit(failed === 0 ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

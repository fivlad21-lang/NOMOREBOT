import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

/**
 * WayForPay often POSTs the browser back to returnUrl.
 * Legacy invoices may still point at /thanks — convert POST → GET 303
 * so Next.js never looks for a Server Action on the page route.
 */
async function thanksPostToGet(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = "/thanks";

  try {
    const contentType = request.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const json = (await request.json()) as Record<string, unknown>;
      if (typeof json.transactionStatus === "string") {
        url.searchParams.set("wfpStatus", json.transactionStatus);
      }
      if (typeof json.orderReference === "string" && !url.searchParams.get("order")) {
        url.searchParams.set("order", json.orderReference);
      }
      if (json.reason != null) {
        url.searchParams.set("reason", String(json.reason).slice(0, 180));
      }
    } else if (
      contentType.includes("application/x-www-form-urlencoded") ||
      contentType.includes("multipart/form-data")
    ) {
      const form = await request.formData();
      const status = form.get("transactionStatus");
      const orderReference = form.get("orderReference");
      const reason = form.get("reason") ?? form.get("reasonCode");
      if (typeof status === "string") {
        url.searchParams.set("wfpStatus", status);
      }
      if (typeof orderReference === "string" && !url.searchParams.get("order")) {
        url.searchParams.set("order", orderReference);
      }
      if (reason != null) {
        url.searchParams.set("reason", String(reason).slice(0, 180));
      }
    }
  } catch {
    // Still redirect even if body cannot be parsed.
  }

  // No provider status on cancel → treat as failed so UI is not stuck pending.
  if (!url.searchParams.get("wfpStatus")) {
    url.searchParams.set("wfpStatus", "Declined");
  }

  return NextResponse.redirect(url, 303);
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/thanks" && request.method === "POST") {
    return thanksPostToGet(request);
  }

  if (/^\/(ru|en|bg)(\/|$)/.test(pathname)) {
    return intlMiddleware(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/thanks", "/(ru|en|bg)/:path*"],
};

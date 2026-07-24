#!/usr/bin/env node
/**
 * E9 soft-launch preflight smoke against a deployed site.
 *
 * Usage:
 *   SITE_URL=https://nomorebot.vercel.app npm run smoke:soft-launch
 *   SITE_URL=https://nomorelab.wtf npm run smoke:soft-launch
 */
const SITE = (process.env.SITE_URL || "https://nomorebot.vercel.app").replace(
  /\/$/,
  "",
);

const checks = [];

function record(name, ok, detail = "") {
  checks.push({ name, ok, detail });
  const mark = ok ? "OK " : "FAIL";
  console.log(`${mark}  ${name}${detail ? ` — ${detail}` : ""}`);
}

async function getStatus(path, init) {
  const res = await fetch(`${SITE}${path}`, {
    redirect: "manual",
    ...init,
  });
  return res;
}

async function expectOk(path, label = path) {
  try {
    const res = await getStatus(path);
    const ok = res.status >= 200 && res.status < 400;
    record(label, ok, `HTTP ${res.status}`);
    return res;
  } catch (err) {
    record(label, false, err instanceof Error ? err.message : String(err));
    return null;
  }
}

async function main() {
  console.log(`E9 soft-launch smoke → ${SITE}\n`);

  await expectOk("/");
  await expectOk("/checkout?plan=start");
  await expectOk("/checkout?plan=community");
  await expectOk("/checkout?plan=mentor");
  await expectOk("/thanks");
  await expectOk("/legal/offer");
  await expectOk("/legal/privacy");
  await expectOk("/legal/requisites");
  await expectOk("/opengraph-image");

  try {
    const health = await getStatus("/api/pay/health");
    if (!health || health.status !== 200) {
      record("/api/pay/health", false, `HTTP ${health?.status ?? "err"}`);
    } else {
      const body = await health.json();
      const backend = body.ordersBackend || "?";
      const ok = body.ok === true;
      record(
        "/api/pay/health",
        ok,
        `ordersBackend=${backend}${backend === "memory" ? " (WARN: set Upstash before soft launch)" : ""}`,
      );
      if (backend === "memory") {
        console.log(
          "WARN  Orders on memory — multi-instance thanks/status may flake. Add UPSTASH_REDIS_* before inviting buyers.",
        );
      }
    }
  } catch (err) {
    record(
      "/api/pay/health",
      false,
      err instanceof Error ? err.message : String(err),
    );
  }

  try {
    const ret = await getStatus(
      "/api/pay/return?order=NL-start-e9smoke&plan=start",
      { method: "POST" },
    );
    const loc = ret?.headers.get("location") || "";
    const ok =
      !!ret &&
      (ret.status === 303 || ret.status === 302) &&
      loc.includes("/thanks");
    record(
      "POST /api/pay/return",
      ok,
      `HTTP ${ret?.status ?? "err"} loc=${loc || "none"}`,
    );
  } catch (err) {
    record(
      "POST /api/pay/return",
      false,
      err instanceof Error ? err.message : String(err),
    );
  }

  const failed = checks.filter((c) => !c.ok);
  console.log("");
  if (failed.length) {
    console.log(`E9 soft-launch smoke FAIL (${failed.length} checks)`);
    process.exit(1);
  }
  console.log("E9 soft-launch smoke PASS");
  process.exit(0);
}

main();

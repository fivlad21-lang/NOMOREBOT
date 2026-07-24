/**
 * USD → UAH for WayForPay (charges UAH only).
 * Override on Vercel: NEXT_PUBLIC_FX_USD_UAH=44.81
 * Source baseline: NBU USD rate (update periodically — see docs/PRICING-FX.md).
 */
export const FX_USD_UAH = (() => {
  const fromEnv = Number(process.env.NEXT_PUBLIC_FX_USD_UAH);
  if (Number.isFinite(fromEnv) && fromEnv > 0) return fromEnv;
  return 44.81; // NBU ~44.8086 on 2026-07-27
})();

export const FX_META = {
  source: "NBU USD",
  asOf: "2026-07-27",
  roundStepUah: 10,
} as const;

/** Round to nearest `step` UAH (default 10). */
export function uahFromUsd(usd: number, step = FX_META.roundStepUah): number {
  if (!Number.isFinite(usd) || usd <= 0) return 0;
  const raw = usd * FX_USD_UAH;
  return Math.round(raw / step) * step;
}

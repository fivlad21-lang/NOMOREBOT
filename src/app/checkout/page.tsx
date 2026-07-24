import Link from "next/link";
import { BrandMark } from "@/components/landing/BrandMark";
import { CheckoutForm } from "@/components/landing/CheckoutForm";
import { OrbBackground } from "@/components/landing/OrbBackground";
import { getPlan, type PlanId } from "@/data/course";

type Props = {
  searchParams: Promise<{ plan?: string }>;
};

const PLAN_IDS: PlanId[] = ["start", "community", "mentor"];

function isPlanId(value: string | undefined): value is PlanId {
  return !!value && PLAN_IDS.includes(value as PlanId);
}

export default async function CheckoutPage({ searchParams }: Props) {
  const params = await searchParams;
  const planId = isPlanId(params.plan) ? params.plan : "community";
  const plan = getPlan(planId)!;

  return (
    <div className="course-theme course-shell min-h-screen">
      <OrbBackground />
      <div className="course-content">
        <div className="course-container py-8 md:py-16">
          <div className="mb-8 flex items-center justify-between gap-4">
            <BrandMark size="sm" href="/" />
            <Link
              href="/#pricing"
              className="text-sm text-[var(--text-muted)] hover:text-white"
            >
              ← До тарифів
            </Link>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1fr_0.9fr]">
            <CheckoutForm planId={planId} />

            <aside className="course-glass h-fit space-y-5 p-6">
              <div>
                <h2 className="course-display mb-4 text-xl">Що отримаєш</h2>
                <ul className="space-y-3 text-sm text-[var(--text-muted)]">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2">
                      <span className="text-[var(--accent-cyan)]">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-white/10 pt-4 text-xs leading-relaxed text-[var(--text-muted)]">
                Оплачуючи, ти приймаєш{" "}
                <Link href="/legal/offer" className="text-[var(--accent-cyan)] hover:underline">
                  оферту
                </Link>{" "}
                та{" "}
                <Link href="/legal/privacy" className="text-[var(--accent-cyan)] hover:underline">
                  політику конфіденційності
                </Link>
                . Реквізити —{" "}
                <Link href="/legal/requisites" className="text-[var(--accent-cyan)] hover:underline">
                  тут
                </Link>
                .
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

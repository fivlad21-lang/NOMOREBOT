"use client";

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { InitiateCheckoutTracker } from "@/components/analytics/InitiateCheckoutTracker";
import { getPlan, type PlanId } from "@/data/course";
import {
  type Attribution,
  resolveAttribution,
} from "@/lib/attribution";
import { CourseButton } from "./CourseButton";

type Props = {
  planId: PlanId;
  /** Optional attribution from checkout URL query */
  attribution?: Attribution | null;
};

export function CheckoutForm({ planId, attribution }: Props) {
  const plan = useMemo(() => getPlan(planId), [planId]);
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [telegram, setTelegram] = useState("");
  const [acceptedOffer, setAcceptedOffer] = useState(false);

  if (!plan) {
    return <p className="text-[var(--accent-coral)]">Тариф не знайдено.</p>;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!acceptedOffer) {
      setError("Потрібно прийняти публічну оферту, щоб продовжити.");
      return;
    }

    startTransition(async () => {
      try {
        const attr = resolveAttribution(attribution);
        const res = await fetch("/api/pay/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            planId: plan!.id,
            email,
            telegram: telegram || undefined,
            source: attr.from || undefined,
            utmSource: attr.utmSource || undefined,
            utmMedium: attr.utmMedium || undefined,
            utmCampaign: attr.utmCampaign || undefined,
            utmContent: attr.utmContent || undefined,
            utmTerm: attr.utmTerm || undefined,
          }),
        });

        const data = (await res.json()) as {
          ok?: boolean;
          redirectUrl?: string;
          error?: string;
        };

        if (!res.ok || !data.redirectUrl) {
          setError(data.error || "Не вдалося створити оплату");
          return;
        }

        if (data.redirectUrl.startsWith("http")) {
          window.location.href = data.redirectUrl;
          return;
        }

        router.push(data.redirectUrl);
      } catch {
        setError("Помилка мережі. Спробуй ще раз.");
      }
    });
  }

  return (
    <>
      <InitiateCheckoutTracker planId={planId} />
      <form
        onSubmit={onSubmit}
        className="course-glass-strong space-y-5 p-6 md:p-8"
      >
        <div>
          <p className="text-sm uppercase tracking-[0.14em] text-[var(--accent-cyan)]">
            Checkout · крок 2 з 2
          </p>
          <h1 className="course-display mt-2 text-3xl text-white">
            {plan.name} — ${plan.priceUsd}
          </h1>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            До сплати ₴{plan.priceUah.toLocaleString("uk-UA")} через WayForPay
          </p>
        </div>

        <label className="block">
          <span className="mb-2 block text-sm text-[var(--text-muted)]">
            Email
          </span>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none ring-[var(--accent-cyan)] placeholder:text-white/30 focus:ring-2"
            placeholder="you@email.com"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm text-[var(--text-muted)]">
            Telegram{" "}
            {plan.id !== "start"
              ? "(обовʼязково для Community / Mentor)"
              : "(опційно)"}
          </span>
          <input
            required={plan.id !== "start"}
            type="text"
            value={telegram}
            onChange={(e) => setTelegram(e.target.value)}
            className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none ring-[var(--accent-cyan)] placeholder:text-white/30 focus:ring-2"
            placeholder="@username"
          />
        </label>

        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-[var(--text-muted)]">
          <input
            type="checkbox"
            required
            checked={acceptedOffer}
            onChange={(e) => setAcceptedOffer(e.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 rounded border-white/30 bg-white/5 accent-[var(--accent-cyan)]"
          />
          <span>
            Приймаю{" "}
            <Link
              href="/legal/offer"
              target="_blank"
              className="text-[var(--accent-cyan)] underline-offset-2 hover:underline"
            >
              публічну оферту
            </Link>{" "}
            та{" "}
            <Link
              href="/legal/privacy"
              target="_blank"
              className="text-[var(--accent-cyan)] underline-offset-2 hover:underline"
            >
              політику конфіденційності
            </Link>
            .
          </span>
        </label>

        {error ? (
          <p className="text-sm text-[var(--accent-coral)]">{error}</p>
        ) : null}

        <CourseButton
          type="submit"
          className="w-full"
          data-plan={plan.id}
          disabled={!acceptedOffer || pending}
        >
          {pending
            ? "Створюємо рахунок…"
            : `Оплатити ₴${plan.priceUah.toLocaleString("uk-UA")}`}
        </CourseButton>

        <p className="text-xs leading-relaxed text-[var(--text-muted)]">
          Оплата через WayForPay (картка, Apple Pay / Google Pay). Після успішної
          оплати на thank-you зʼявляться кнопки доступу: канал курсу
          {plan.id !== "start" ? ", група комʼюніті" : ""}
          {plan.id === "mentor" ? " і звʼязок зі мною" : ""}.
        </p>
      </form>
    </>
  );
}

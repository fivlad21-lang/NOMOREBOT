"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { getPlan, type PlanId } from "@/data/course";
import { CourseButton } from "./CourseButton";

type Props = {
  planId: PlanId;
};

export function CheckoutForm({ planId }: Props) {
  const plan = useMemo(() => getPlan(planId), [planId]);
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [telegram, setTelegram] = useState("");

  if (!plan) {
    return (
      <p className="text-[var(--accent-coral)]">Тариф не знайдено.</p>
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      try {
        const res = await fetch("/api/pay/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            planId: plan!.id,
            email,
            telegram: telegram || undefined,
            amountUsd: plan!.priceUsd,
            amountUah: plan!.priceUah,
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

        router.push(data.redirectUrl);
      } catch {
        setError("Помилка мережі. Спробуй ще раз.");
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="course-glass-strong space-y-5 p-6 md:p-8">
      <div>
        <p className="text-sm uppercase tracking-[0.14em] text-[var(--accent-cyan)]">
          Checkout
        </p>
        <h1 className="course-display mt-2 text-3xl text-white">
          {plan.name} — ${plan.priceUsd}
        </h1>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          ≈ ₴{plan.priceUah.toLocaleString("uk-UA")} · mock-оплата (демо)
        </p>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm text-[var(--text-muted)]">Email</span>
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
          Telegram (обовʼязково для Community / Mentor)
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

      {error ? (
        <p className="text-sm text-[var(--accent-coral)]">{error}</p>
      ) : null}

      <CourseButton type="submit" className="w-full" data-plan={plan.id}>
        {pending ? "Створюємо оплату…" : `Оплатити $${plan.priceUsd}`}
      </CourseButton>

      <p className="text-xs leading-relaxed text-[var(--text-muted)]">
        Демо-режим: реальну LiqPay / Fondy / Stripe підключимо після ключів.
        Зараз після «оплати» відкриється thank-you з видачею доступу.
      </p>
    </form>
  );
}

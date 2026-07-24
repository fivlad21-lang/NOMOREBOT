"use client";

import { useEffect, useState } from "react";
import { CourseButton } from "@/components/landing/CourseButton";
import { OrbBackground } from "@/components/landing/OrbBackground";
import { BRAND, contacts, getPlan, type PlanId } from "@/data/course";

type Props = {
  planId: PlanId;
  order?: string;
};

type StatusResponse = {
  status?: "paid" | "pending" | "failed";
  email?: string;
  telegram?: string;
  providerStatus?: string;
  error?: string;
};

export function ThanksClient({ planId, order }: Props) {
  const plan = getPlan(planId)!;
  const [status, setStatus] = useState<"loading" | "paid" | "pending" | "error">(
    () => (order ? "loading" : "pending"),
  );
  const [providerStatus, setProviderStatus] = useState<string>("");

  useEffect(() => {
    if (!order) return;

    let cancelled = false;
    let tries = 0;

    async function tick() {
      tries += 1;
      try {
        const res = await fetch(
          `/api/pay/status?order=${encodeURIComponent(order)}`,
        );
        const data = (await res.json()) as StatusResponse;
        if (cancelled) return;

        if (data.status === "paid") {
          setStatus("paid");
          return;
        }

        setProviderStatus(data.providerStatus || "");
        setStatus("pending");
        if (tries < 15) {
          window.setTimeout(tick, 2000);
        }
      } catch {
        if (!cancelled) {
          setStatus(tries >= 15 ? "error" : "pending");
          if (tries < 15) window.setTimeout(tick, 2000);
        }
      }
    }

    tick();
    return () => {
      cancelled = true;
    };
  }, [order]);

  return (
    <div className="course-theme course-shell min-h-screen">
      <OrbBackground />
      <div className="course-content">
        <div className="course-container flex min-h-screen items-center py-16">
          <div className="course-glass-strong mx-auto max-w-2xl p-8 text-center md:p-12">
            {status === "loading" || status === "pending" ? (
              <>
                <p className="mb-3 text-sm uppercase tracking-[0.16em] text-[var(--accent-cyan)]">
                  {status === "loading"
                    ? "Перевіряємо оплату"
                    : "Очікуємо підтвердження"}
                </p>
                <h1 className="course-display mb-4 text-3xl md:text-5xl">
                  Майже готово
                </h1>
                <p className="mb-6 text-[var(--text-muted)] leading-relaxed">
                  WayForPay підтверджує платіж за тариф{" "}
                  <strong className="text-white">{plan.name}</strong>
                  {order ? (
                    <>
                      . Замовлення:{" "}
                      <span className="break-all text-white/80">{order}</span>
                    </>
                  ) : null}
                  . Зазвичай це кілька секунд.
                </p>
                {providerStatus ? (
                  <p className="text-xs text-[var(--text-muted)]">
                    Статус провайдера: {providerStatus}
                  </p>
                ) : null}
              </>
            ) : null}

            {status === "paid" ? (
              <>
                <p className="mb-3 text-sm uppercase tracking-[0.16em] text-[var(--accent-lime)]">
                  Оплату прийнято
                </p>
                <h1 className="course-display mb-4 text-3xl md:text-5xl">
                  Вітаю в {BRAND}
                </h1>
                <p className="mb-8 text-[var(--text-muted)] leading-relaxed">
                  Тариф <strong className="text-white">{plan.name}</strong>{" "}
                  активний.
                  {order ? (
                    <>
                      {" "}
                      Номер:{" "}
                      <span className="break-all text-white">{order}</span>.
                    </>
                  ) : null}{" "}
                  Доступ надішлемо на email. Community / Mentor — також інвайт у
                  Telegram.
                </p>

                <div className="mb-8 space-y-3 text-left text-sm text-[var(--text-muted)]">
                  <p>
                    <strong className="text-white">Start:</strong> лінк на
                    матеріали в листі.
                  </p>
                  {(planId === "community" || planId === "mentor") && (
                    <p>
                      <strong className="text-white">Community:</strong> інвайт
                      у Telegram протягом кількох хвилин.
                    </p>
                  )}
                  {planId === "mentor" && (
                    <p>
                      <strong className="text-white">Mentor:</strong> напиши{" "}
                      {contacts.telegramHandle}, щоб узгодити дзвінки й розбір
                      лендінгу.
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap justify-center gap-3">
                  {(planId === "community" || planId === "mentor") && (
                    <CourseButton href={contacts.telegram} variant="primary">
                      Відкрити Telegram
                    </CourseButton>
                  )}
                  {planId === "mentor" && (
                    <CourseButton href={contacts.telegram} variant="secondary">
                      Написати мені
                    </CourseButton>
                  )}
                  <CourseButton href="/" variant="ghost">
                    На головну
                  </CourseButton>
                </div>
              </>
            ) : null}

            {status === "error" ? (
              <>
                <p className="mb-3 text-sm uppercase tracking-[0.16em] text-[var(--accent-coral)]">
                  Не підтверджено
                </p>
                <h1 className="course-display mb-4 text-3xl md:text-4xl">
                  Оплату поки не бачимо
                </h1>
                <p className="mb-8 text-[var(--text-muted)]">
                  Якщо гроші списались — напиши {contacts.telegramHandle} з
                  номером замовлення. Або онови сторінку через хвилину.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <CourseButton href={contacts.telegram}>
                    Написати в TG
                  </CourseButton>
                  <CourseButton href="/#pricing" variant="secondary">
                    До тарифів
                  </CourseButton>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

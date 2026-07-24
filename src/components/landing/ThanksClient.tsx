"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  access,
  contacts,
  plans,
  thanksCopy,
  type PlanId,
} from "@/data/course";

type PayUiStatus = "pending" | "paid" | "failed" | "unknown";

type StatusResponse = {
  orderId?: string;
  status: PayUiStatus;
  transactionStatus?: string | null;
  providerStatus?: string | null;
  reason?: string | null;
  planId?: PlanId | null;
};

function AccessButton({
  href,
  label,
  primary = false,
}: {
  href: string;
  label: string;
  primary?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        primary
          ? "inline-flex min-h-12 items-center justify-center rounded-full bg-course-accent px-6 py-3 text-sm font-semibold text-course-ink transition hover:brightness-110"
          : "inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
      }
    >
      {label}
    </a>
  );
}

function SuccessByPlan({ planId }: { planId: PlanId }) {
  const copy = thanksCopy[planId];
  const plan = plans.find((item) => item.id === planId);

  return (
    <motion.div
      key="paid"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6"
    >
      <div className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
        Оплату підтверджено
      </div>
      <div>
        <h1 className="course-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {copy.title}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-course-muted sm:text-lg">
          {copy.body}
        </p>
        {plan ? (
          <p className="mt-2 text-sm text-course-muted/80">
            Пакет: {plan.name} · ${plan.priceUsd} / {plan.priceUah} ₴
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <AccessButton
          href={access.courseChannel}
          label="Відкрити канал курсу"
          primary
        />
        {(planId === "community" || planId === "mentor") && (
          <AccessButton
            href={access.communityGroup}
            label="Увійти в комʼюніті"
          />
        )}
        {planId === "mentor" && (
          <AccessButton href={contacts.telegram} label="Написати мені" />
        )}
      </div>

      {planId === "mentor" ? (
        <p className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm leading-relaxed text-course-muted">
          Після входу в Telegram напиши мені в особисті з ніком замовлення —
          відкрию чат менторства і домовимось про перший дзвінок.
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3 pt-2 text-sm">
        <Link
          href="/#pricing"
          className="text-course-accent underline-offset-4 hover:underline"
        >
          Повернутись до пакетів
        </Link>
        <a
          href={contacts.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-course-muted underline-offset-4 hover:text-white hover:underline"
        >
          Підтримка в Telegram
        </a>
      </div>
    </motion.div>
  );
}

function FailedState({
  order,
  planId,
  reason,
}: {
  order: string;
  planId: PlanId;
  reason: string | null;
}) {
  return (
    <motion.div
      key="failed"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6"
    >
      <div className="inline-flex rounded-full border border-rose-400/30 bg-rose-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-rose-200">
        Оплату не підтверджено
      </div>
      <div>
        <h1 className="course-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {thanksCopy.fail.title}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-course-muted sm:text-lg">
          {thanksCopy.fail.body}
        </p>
        {reason ? (
          <p className="mt-2 text-sm text-course-muted/80">Причина: {reason}</p>
        ) : null}
        <p className="mt-2 text-xs text-course-muted/70">Замовлення: {order}</p>
      </div>

      <div className="rounded-2xl border border-rose-400/20 bg-rose-400/[0.06] px-4 py-3 text-sm leading-relaxed text-rose-100/90">
        Доступ до курсу і комʼюніті відкривається тільки після успішної оплати.
        Посилання на Telegram тут навмисно не показуємо.
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link
          href={`/checkout?plan=${planId}`}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-course-accent px-6 py-3 text-sm font-semibold text-course-ink transition hover:brightness-110"
        >
          Спробувати ще раз
        </Link>
        <a
          href={contacts.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Написати в підтримку
        </a>
      </div>
    </motion.div>
  );
}

export function ThanksClient({
  planId: initialPlanId,
  order,
}: {
  planId: PlanId;
  order?: string;
}) {
  const orderId = order ?? null;
  const [status, setStatus] = useState<PayUiStatus>(
    orderId ? "pending" : "unknown",
  );
  const [planId, setPlanId] = useState<PlanId>(initialPlanId);
  const [reason, setReason] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(
    orderId ? null : "Немає номера замовлення. Повернись на сторінку пакетів.",
  );

  useEffect(() => {
    if (!orderId) return;

    let cancelled = false;
    let attempts = 0;

    const poll = async () => {
      attempts += 1;
      try {
        const response = await fetch(
          `/api/pay/status?order=${encodeURIComponent(orderId)}`,
          { cache: "no-store" },
        );
        const data = (await response.json()) as StatusResponse & {
          error?: string;
        };

        if (!response.ok) {
          throw new Error(data.error || "Не вдалося перевірити статус");
        }

        if (cancelled) return;

        setStatus(data.status);
        if (
          data.planId === "start" ||
          data.planId === "community" ||
          data.planId === "mentor"
        ) {
          setPlanId(data.planId);
        }
        const detail =
          data.reason || data.transactionStatus || data.providerStatus || null;
        if (detail && data.status === "failed") {
          setReason(String(detail));
        }

        if (data.status === "pending" && attempts < 40) {
          window.setTimeout(poll, 2500);
        }
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Помилка перевірки");
        if (attempts < 40) {
          window.setTimeout(poll, 3500);
        }
      }
    };

    void poll();

    return () => {
      cancelled = true;
    };
  }, [orderId]);

  return (
    <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
      <AnimatePresence mode="wait">
        {status === "pending" && (
          <motion.div
            key="pending"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-5"
          >
            <div className="inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-course-muted">
              Перевіряємо оплату
            </div>
            <h1 className="course-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Зачекай кілька секунд
            </h1>
            <p className="text-base leading-relaxed text-course-muted sm:text-lg">
              WayForPay підтверджує платіж. Як тільки статус стане Approved —
              відкриємо доступ під твій пакет.
            </p>
            {orderId ? (
              <p className="text-sm text-course-muted/80">
                Замовлення: {orderId}
              </p>
            ) : null}
            {error ? <p className="text-sm text-amber-200">{error}</p> : null}
            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-course-accent"
                initial={{ width: "8%" }}
                animate={{ width: ["12%", "78%", "42%", "88%"] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        )}

        {status === "paid" && <SuccessByPlan planId={planId} />}

        {status === "failed" && orderId && (
          <FailedState order={orderId} planId={planId} reason={reason} />
        )}

        {status === "unknown" && (
          <motion.div
            key="unknown"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-5"
          >
            <h1 className="course-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Не знайшли замовлення
            </h1>
            <p className="text-base leading-relaxed text-course-muted sm:text-lg">
              {error ||
                "Схоже, ти потрапив сюди без номера платежу. Обери пакет і пройди оплату ще раз."}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/#pricing"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-course-accent px-6 py-3 text-sm font-semibold text-course-ink transition hover:brightness-110"
              >
                До пакетів
              </Link>
              <a
                href={contacts.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Написати в Telegram
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

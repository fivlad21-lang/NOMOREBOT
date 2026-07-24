"use client";

import Link from "next/link";
import { contacts } from "@/data/course";

export default function ThanksError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="course-theme course-shell flex min-h-screen items-center justify-center px-5">
      <div className="mx-auto max-w-lg space-y-5 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-200">
          Помилка сторінки
        </p>
        <h1 className="course-heading text-3xl font-semibold text-white">
          Оплату не вдалося показати
        </h1>
        <p className="text-course-muted">
          Спробуй ще раз або напиши в підтримку з номером замовлення, якщо він
          є в адресному рядку.
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-course-accent px-6 py-3 text-sm font-semibold text-course-ink"
          >
            Спробувати знову
          </button>
          <Link
            href="/#pricing"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white"
          >
            До пакетів
          </Link>
          <a
            href={contacts.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white"
          >
            Telegram
          </a>
        </div>
      </div>
    </div>
  );
}

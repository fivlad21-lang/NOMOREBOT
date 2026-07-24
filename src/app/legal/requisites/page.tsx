import type { Metadata } from "next";
import { BRAND } from "@/data/course";
import { DOMAIN, legalEntity } from "@/data/legal";

export const metadata: Metadata = {
  title: `Реквізити — ${BRAND}`,
  description: `Платіжні реквізити продавця ${BRAND}`,
};

export default function RequisitesPage() {
  return (
    <article className="legal-prose mx-auto max-w-3xl space-y-8 text-[var(--text-muted)]">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-cyan)]">
          Документ
        </p>
        <h1 className="course-heading mt-2 text-3xl font-semibold text-white md:text-4xl">
          Реквізити
        </h1>
        <p className="mt-3 text-sm">
          Для сайту {DOMAIN}. Онлайн-оплата курсу — через WayForPay; нижче —
          реквізити отримувача.
        </p>
      </div>

      <dl className="course-glass space-y-4 p-6 text-sm sm:text-base">
        <div>
          <dt className="text-xs uppercase tracking-[0.14em] text-white/45">
            Отримувач
          </dt>
          <dd className="mt-1 font-medium text-white">{legalEntity.name}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-[0.14em] text-white/45">
            ІПН / ЄДРПОУ
          </dt>
          <dd className="mt-1 font-medium text-white">{legalEntity.ipn}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-[0.14em] text-white/45">
            IBAN
          </dt>
          <dd className="mt-1 break-all font-medium text-white">
            {legalEntity.iban}
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-[0.14em] text-white/45">
            Email
          </dt>
          <dd className="mt-1">
            <a
              className="text-[var(--accent-cyan)] hover:underline"
              href={`mailto:${legalEntity.email}`}
            >
              {legalEntity.email}
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-[0.14em] text-white/45">
            Telegram
          </dt>
          <dd className="mt-1">
            <a
              className="text-[var(--accent-cyan)] hover:underline"
              href={legalEntity.telegramUrl}
            >
              {legalEntity.telegram}
            </a>
          </dd>
        </div>
      </dl>

      <p className="text-sm">{legalEntity.note}</p>
    </article>
  );
}

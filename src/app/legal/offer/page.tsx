import type { Metadata } from "next";
import Link from "next/link";
import { BRAND, plans } from "@/data/course";
import { DOMAIN, legalEntity, refundPolicy } from "@/data/legal";

export const metadata: Metadata = {
  title: `Публічна оферта — ${BRAND}`,
  description: `Умови надання доступу до курсу ${BRAND} на ${DOMAIN}`,
};

export default function OfferPage() {
  return (
    <article className="legal-prose mx-auto max-w-3xl space-y-8 text-[var(--text-muted)]">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-cyan)]">
          Документ
        </p>
        <h1 className="course-heading mt-2 text-3xl font-semibold text-white md:text-4xl">
          Публічна оферта
        </h1>
        <p className="mt-3 text-sm">
          Редакція для сайту{" "}
          <span className="text-white">{DOMAIN}</span> /{" "}
          <span className="text-white">nomorebot.vercel.app</span>. Оплата =
          прийняття цієї оферти.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="course-heading text-xl text-white">1. Продавець</h2>
        <p>
          Послуги надає <strong className="text-white">{legalEntity.name}</strong>
          , ІПН/ЄДРПОУ <strong className="text-white">{legalEntity.ipn}</strong>.
          Реквізити для розрахунків: IBAN{" "}
          <strong className="text-white">{legalEntity.iban}</strong>. Онлайн-оплата
          приймається через платіжний сервіс WayForPay.
        </p>
        <p className="text-sm">{legalEntity.note}</p>
        <p>
          Контакт:{" "}
          <a className="text-[var(--accent-cyan)] hover:underline" href={`mailto:${legalEntity.email}`}>
            {legalEntity.email}
          </a>
          , Telegram{" "}
          <a className="text-[var(--accent-cyan)] hover:underline" href={legalEntity.telegramUrl}>
            {legalEntity.telegram}
          </a>
          . Повні реквізити — на сторінці{" "}
          <Link href="/legal/requisites" className="text-[var(--accent-cyan)] hover:underline">
            /legal/requisites
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="course-heading text-xl text-white">2. Предмет</h2>
        <p>
          Продавець надає доступ до цифрового освітнього продукту {BRAND}
          (відеокурс / матеріали в закритому Telegram-каналі; залежно від тарифу —
          доступ до групи комʼюніті та/або менторський супровід).
        </p>
        <ul className="list-disc space-y-1 pl-5">
          {plans.map((p) => (
            <li key={p.id}>
              <strong className="text-white">{p.name}</strong> — ${p.priceUsd} / ≈ ₴
              {p.priceUah.toLocaleString("uk-UA")}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="course-heading text-xl text-white">3. Порядок оплати та доступ</h2>
        <p>
          Оплата здійснюється онлайн (картка, Apple Pay / Google Pay тощо) через
          WayForPay. Після статусу Approved покупець отримує доступ на thank-you
          сторінці (кнопки в Telegram згідно з тарифом). Доступ не надається при
          відхиленій, скасованій або незавершеній оплаті.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="course-heading text-xl text-white">4. Повернення коштів</h2>
        <p>{refundPolicy.summary}</p>
        <p>
          Якщо умови повернення виконані — кошти повертаються тим самим способом
          оплати або на реквізити, узгоджені з покупцем, у строки платіжного
          провайдера / банку.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="course-heading text-xl text-white">5. Права та обмеження</h2>
        <p>
          Матеріали курсу захищені. Заборонено поширювати доступ, записи,
          інвайти та контент третім особам без письмової згоди продавця. Порушення
          може стати підставою для припинення доступу без повернення коштів.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="course-heading text-xl text-white">6. Відповідальність</h2>
        <p>
          Курс носить освітній характер. Результат (сайт, продажі, замовлення)
          залежить від дій покупця. Продавець не гарантує конкретний дохід.
          Технічні збої платіжного шлюзу або месенджерів усуваються в розумні
          строки після звернення.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="course-heading text-xl text-white">7. Персональні дані</h2>
        <p>
          Обробка email / Telegram / даних платежу регулюється{" "}
          <Link href="/legal/privacy" className="text-[var(--accent-cyan)] hover:underline">
            політикою конфіденційності
          </Link>
          .
        </p>
      </section>

      <p className="text-xs text-white/40">
        Оферта діє з моменту публікації на сайті. Актуальна версія завжди на цій
        сторінці.
      </p>
    </article>
  );
}

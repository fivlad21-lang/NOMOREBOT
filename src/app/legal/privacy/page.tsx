import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/data/course";
import { DOMAIN, legalEntity } from "@/data/legal";

export const metadata: Metadata = {
  title: `Політика конфіденційності — ${BRAND}`,
  description: `Як ${BRAND} обробляє персональні дані на ${DOMAIN}`,
};

export default function PrivacyPage() {
  return (
    <article className="legal-prose mx-auto max-w-3xl space-y-8 text-[var(--text-muted)]">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-cyan)]">
          Документ
        </p>
        <h1 className="course-heading mt-2 text-3xl font-semibold text-white md:text-4xl">
          Політика конфіденційності
        </h1>
        <p className="mt-3 text-sm">
          Сайт {DOMAIN} (також nomorebot.vercel.app). Оператор даних:{" "}
          {legalEntity.name}.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="course-heading text-xl text-white">1. Які дані збираємо</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>Email і (за потреби) Telegram при оформленні замовлення</li>
          <li>Технічні дані: IP, user-agent, UTM / `from` (якщо передані)</li>
          <li>
            Платіжні дані обробляє WayForPay; ми не зберігаємо повний номер картки
          </li>
          <li>Номер замовлення та статус оплати для видачі доступу</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="course-heading text-xl text-white">2. Навіщо</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>Надати доступ до курсу / комʼюніті / менторства</li>
          <li>Підтримка, повернення коштів, антифрод</li>
          <li>Покращення сайту та (за наявності згоди) маркетинг</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="course-heading text-xl text-white">3. Зберігання та передача</h2>
        <p>
          Дані замовлення можуть зберігатися на сервері сайту (зокрема Redis/KV)
          і в кабінеті WayForPay. Доступ до Telegram-каналу/групи надається через
          інвайти. Ми не продаємо персональні дані третім особам.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="course-heading text-xl text-white">4. Права</h2>
        <p>
          Ви можете запитати уточнення, виправлення або видалення даних, що не
          потрібні для виконання договору / бухгалтерії, написавши на{" "}
          <a className="text-[var(--accent-cyan)] hover:underline" href={`mailto:${legalEntity.email}`}>
            {legalEntity.email}
          </a>{" "}
          або в{" "}
          <a className="text-[var(--accent-cyan)] hover:underline" href={legalEntity.telegramUrl}>
            {legalEntity.telegram}
          </a>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="course-heading text-xl text-white">5. Cookies / аналітика</h2>
        <p>
          Можуть використовуватись технічні cookies та пікселі рекламних систем
          (коли підключені) для вимірювання конверсій. Деталі зʼявляться в цій
          політиці після підключення пікселів.
        </p>
      </section>

      <p className="text-sm">
        Див. також{" "}
        <Link href="/legal/offer" className="text-[var(--accent-cyan)] hover:underline">
          публічну оферту
        </Link>
        .
      </p>
    </article>
  );
}

import Link from "next/link";
import { contacts } from "@/data/course";
import { DOMAIN } from "@/data/legal";
import { BrandMark } from "./BrandMark";

export function LandingFooter() {
  return (
    <footer className="border-t border-white/10 pb-24 pt-10 md:pb-12">
      <div className="course-container grid gap-8 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <BrandMark size="md" href="/#top" />
          <p className="mt-2 max-w-sm text-sm text-[var(--text-muted)]">
            Курс зі створення сайтів і лендінгів під трафік з TikTok, Instagram і
            Telegram. Домен: {DOMAIN}
          </p>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-white">Контакти</p>
          <ul className="space-y-2 text-sm text-[var(--text-muted)]">
            <li>
              <a
                href={contacts.telegram}
                className="hover:text-white"
                target="_blank"
                rel="noreferrer"
              >
                Telegram {contacts.telegramHandle}
              </a>
            </li>
            <li>
              <a
                href={contacts.instagram}
                className="hover:text-white"
                target="_blank"
                rel="noreferrer"
              >
                Instagram @nomorevlad
              </a>
            </li>
            <li>
              <a
                href={`mailto:${contacts.email}`}
                className="hover:text-white"
              >
                {contacts.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-white">Документи</p>
          <ul className="space-y-2 text-sm text-[var(--text-muted)]">
            <li>
              <Link href="/legal/offer" className="hover:text-white">
                Публічна оферта
              </Link>
            </li>
            <li>
              <Link href="/legal/privacy" className="hover:text-white">
                Політика конфіденційності
              </Link>
            </li>
            <li>
              <Link href="/legal/requisites" className="hover:text-white">
                Реквізити
              </Link>
            </li>
            <li>
              <Link href="/#faq" className="hover:text-white">
                FAQ
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="course-container mt-10 border-t border-white/10 pt-6 text-xs text-[var(--text-muted)]">
        © {new Date().getFullYear()} NOMORE LAB. Усі права захищено.
      </div>
    </footer>
  );
}

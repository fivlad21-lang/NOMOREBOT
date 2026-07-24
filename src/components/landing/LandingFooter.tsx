import Link from "next/link";
import { BRAND } from "@/data/course";

export function LandingFooter() {
  return (
    <footer className="border-t border-white/10 pb-24 pt-10 md:pb-12">
      <div className="course-container grid gap-8 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="course-display text-xl">{BRAND}</p>
          <p className="mt-2 max-w-sm text-sm text-[var(--text-muted)]">
            Курс зі створення сайтів і лендінгів під трафік з TikTok, Instagram і
            Telegram.
          </p>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-white">Контакти</p>
          <ul className="space-y-2 text-sm text-[var(--text-muted)]">
            <li>
              <a
                href="https://t.me/"
                className="hover:text-white"
                target="_blank"
                rel="noreferrer"
              >
                Telegram
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/"
                className="hover:text-white"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </li>
            <li>
              <a href="mailto:hello@sitlab.example" className="hover:text-white">
                hello@sitlab.example
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-white">Документи</p>
          <ul className="space-y-2 text-sm text-[var(--text-muted)]">
            <li>
              <Link href="/#faq" className="hover:text-white">
                Оферта / FAQ
              </Link>
            </li>
            <li>ФОП (реквізити на етапі продакшену)</li>
            <li>Політика конфіденційності</li>
          </ul>
        </div>
      </div>

      <div className="course-container mt-10 border-t border-white/10 pt-6 text-xs text-[var(--text-muted)]">
        © {new Date().getFullYear()} {BRAND}. Усі права захищено.
      </div>
    </footer>
  );
}

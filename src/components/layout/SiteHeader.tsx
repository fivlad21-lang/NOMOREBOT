"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";

const localeLabels: Record<Locale, string> = {
  ru: "RU",
  en: "EN",
  bg: "BG",
};

export function SiteHeader() {
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const pathname = usePathname();
  const locale = useLocale() as Locale;

  const links = [
    { href: "/", label: t("home") },
    { href: "/properties", label: t("properties") },
    { href: "/about", label: t("about") },
    { href: "/contacts", label: t("contacts") },
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-foam/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-navy text-sm font-semibold tracking-wide text-foam">
            LEV
          </span>
          <span className="leading-tight">
            <span className="block font-[family-name:var(--font-display)] text-xl font-semibold text-navy">
              LEV Estates
            </span>
            <span className="block text-xs text-ink-soft">{tc("demoNote").slice(0, 42)}…</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm tracking-wide transition ${
                  active ? "text-sea" : "text-ink-soft hover:text-navy"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="flex overflow-hidden rounded-full border border-line bg-white/70 p-0.5 text-xs font-semibold">
            {locales.map((code) => (
              <Link
                key={code}
                href={pathname}
                locale={code}
                className={`rounded-full px-2.5 py-1 transition ${
                  locale === code
                    ? "bg-navy text-foam"
                    : "text-ink-soft hover:text-navy"
                }`}
              >
                {localeLabels[code]}
              </Link>
            ))}
          </div>
          <Link
            href="/selection"
            className="hidden rounded-full bg-sea px-4 py-2 text-sm font-semibold text-white transition hover:bg-sea-bright sm:inline-flex"
          >
            {t("selection")}
          </Link>
        </div>
      </div>
      <div className="flex gap-4 overflow-x-auto border-t border-line px-4 py-2 text-sm md:hidden">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="whitespace-nowrap text-ink-soft">
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  );
}

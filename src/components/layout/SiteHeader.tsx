"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";
import { ButtonLink } from "@/components/ui/Button";
import { LevLogo } from "@/components/brand/LevLogo";

const localeLabels: Record<Locale, string> = {
  ru: "RU",
  en: "EN",
  bg: "BG",
};

export function SiteHeader() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const locale = useLocale() as Locale;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const links = [
    { href: "/", label: t("home") },
    { href: "/properties", label: t("properties") },
    { href: "/about", label: t("about") },
    { href: "/contacts", label: t("contacts") },
  ] as const;

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-line bg-foam/95 py-0 shadow-[0_8px_30px_rgba(11,28,44,0.06)] backdrop-blur-md"
          : "border-transparent bg-foam/80 py-1 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        <div className="py-3">
          <LevLogo size="md" withWordmark />
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-[13px] font-medium tracking-[0.08em] uppercase transition ${
                  active ? "text-navy" : "text-ink-soft hover:text-navy"
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute -bottom-1 left-0 h-px w-full bg-gold" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-0.5 text-[11px] font-semibold tracking-wider">
            {locales.map((code) => (
              <Link
                key={code}
                href={pathname}
                locale={code}
                className={`px-2 py-1 transition ${
                  locale === code
                    ? "text-navy"
                    : "text-ink-soft/70 hover:text-navy"
                }`}
              >
                {localeLabels[code]}
              </Link>
            ))}
          </div>
          <ButtonLink href="/selection" className="hidden sm:inline-flex" size="md">
            {t("selection")}
          </ButtonLink>
          <button
            type="button"
            aria-label="Menu"
            className="grid h-10 w-10 place-items-center border border-line text-navy md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <span className="flex w-4 flex-col gap-1">
              <span className={`h-px bg-navy transition ${open ? "translate-y-[5px] rotate-45" : ""}`} />
              <span className={`h-px bg-navy transition ${open ? "opacity-0" : ""}`} />
              <span className={`h-px bg-navy transition ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-foam px-4 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium uppercase tracking-[0.12em] text-navy"
              >
                {link.label}
              </Link>
            ))}
            <ButtonLink href="/selection">{t("selection")}</ButtonLink>
          </div>
        </div>
      )}
    </header>
  );
}

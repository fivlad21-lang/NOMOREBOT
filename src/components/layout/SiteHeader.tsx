"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";
import { ButtonLink } from "@/components/ui/Button";
import { LevLogo } from "@/components/brand/LevLogo";
import { GlassPanel } from "@/components/ui/GlassPanel";

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
    const onScroll = () => setScrolled(window.scrollY > 18);
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
    <header className="sticky top-0 z-50 px-3 pt-3 md:px-4 md:pt-4">
      <GlassPanel
        variant="strong"
        radius="xl"
        className={`mx-auto max-w-7xl transition-all duration-300 ${
          scrolled ? "shadow-[var(--shadow-lift)]" : ""
        }`}
      >
        <div
          className={`flex items-center justify-between gap-3 px-4 md:px-5 ${
            scrolled ? "py-2.5" : "py-3.5"
          }`}
        >
          <LevLogo size="md" withWordmark />

          <nav className="hidden items-center gap-7 md:flex">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-[12px] font-semibold uppercase tracking-[0.14em] transition ${
                    active ? "text-navy" : "text-ink-soft hover:text-navy"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-gold" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="glass flex items-center rounded-full px-1.5 py-1 text-[11px] font-semibold tracking-wider">
              {locales.map((code) => (
                <Link
                  key={code}
                  href={pathname}
                  locale={code}
                  className={`rounded-full px-2.5 py-1 transition ${
                    locale === code
                      ? "bg-navy text-foam"
                      : "text-ink-soft/80 hover:text-navy"
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
              className="grid h-10 w-10 place-items-center rounded-[12px] border border-white/50 bg-white/40 text-navy md:hidden"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="flex w-4 flex-col gap-1">
                <span
                  className={`h-px bg-navy transition ${open ? "translate-y-[5px] rotate-45" : ""}`}
                />
                <span className={`h-px bg-navy transition ${open ? "opacity-0" : ""}`} />
                <span
                  className={`h-px bg-navy transition ${open ? "-translate-y-[5px] -rotate-45" : ""}`}
                />
              </span>
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-white/40 px-4 py-4 md:hidden">
            <div className="flex flex-col gap-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-semibold uppercase tracking-[0.12em] text-navy"
                >
                  {link.label}
                </Link>
              ))}
              <ButtonLink href="/selection">{t("selection")}</ButtonLink>
            </div>
          </div>
        )}
      </GlassPanel>
    </header>
  );
}

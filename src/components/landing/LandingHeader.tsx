"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BRAND, contacts, navItems } from "@/data/course";
import { CourseButton } from "./CourseButton";

export function LandingHeader() {
  const [compact, setCompact] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className={`course-header ${compact ? "is-compact" : ""}`}>
        <div className="course-container flex items-center justify-between gap-4 py-4">
          <Link
            href="/#top"
            className="course-display text-lg tracking-tight md:text-xl"
          >
            {BRAND}
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <CourseButton
              href="#pricing"
              className="!hidden !px-4 !py-2 text-sm sm:!inline-flex"
            >
              Обрати тариф
            </CourseButton>
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-side-nav"
              aria-label={menuOpen ? "Закрити меню" : "Відкрити меню"}
              onClick={() => setMenuOpen((v) => !v)}
              className="course-glass flex h-11 w-11 items-center justify-center rounded-2xl text-white lg:hidden"
            >
              <span className="course-display text-lg leading-none">
                {menuOpen ? "×" : "☰"}
              </span>
            </button>
          </div>
        </div>
      </header>

      {menuOpen ? (
        <div
          className="fixed inset-0 z-50 bg-[#0b1020]/55 backdrop-blur-sm lg:hidden"
          onClick={() => setMenuOpen(false)}
        >
          <aside
            id="mobile-side-nav"
            className="course-glass-strong absolute right-0 top-0 flex h-full w-[min(86vw,320px)] flex-col p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <p className="course-display text-lg">{BRAND}</p>
              <button
                type="button"
                aria-label="Закрити"
                className="text-2xl text-white/80"
                onClick={() => setMenuOpen(false)}
              >
                ×
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-2xl px-3 py-3 text-base text-white/85 transition hover:bg-white/8 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="mt-4 space-y-2 border-t border-white/10 pt-4 text-sm text-[var(--text-muted)]">
              <a href={contacts.telegram} className="block hover:text-white">
                Telegram {contacts.telegramHandle}
              </a>
              <a href={contacts.instagram} className="block hover:text-white">
                Instagram
              </a>
              <a
                href={`mailto:${contacts.email}`}
                className="block hover:text-white"
              >
                {contacts.email}
              </a>
            </div>

            <CourseButton
              href="#pricing"
              className="mt-5 w-full"
              onClick={() => setMenuOpen(false)}
            >
              Обрати тариф
            </CourseButton>
          </aside>
        </div>
      ) : null}
    </>
  );
}

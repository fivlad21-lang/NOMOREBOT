"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BRAND } from "@/data/course";
import { CourseButton } from "./CourseButton";

const NAV = [
  { href: "#program", label: "Програма" },
  { href: "#proof", label: "Результат" },
  { href: "#reviews", label: "Відгуки" },
  { href: "#pricing", label: "Тарифи" },
];

export function LandingHeader() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`course-header ${compact ? "is-compact" : ""}`}
    >
      <div className="course-container flex items-center justify-between gap-4 py-4">
        <Link href="/" className="course-display text-lg tracking-tight md:text-xl">
          {BRAND}
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-[var(--text-muted)] md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <CourseButton href="#pricing" className="!px-4 !py-2 text-sm">
          Обрати тариф
        </CourseButton>
      </div>
    </header>
  );
}

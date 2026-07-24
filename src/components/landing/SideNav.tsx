"use client";

import { useEffect, useState } from "react";
import { navItems } from "@/data/course";

export function SideNav() {
  const [active, setActive] = useState<string>("top");

  useEffect(() => {
    const ids = navItems.map((item) => item.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    if (!elements.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActive(visible[0].target.id);
        }
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5],
      },
    );

    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <nav
      aria-label="Секції сторінки"
      className="pointer-events-none fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 lg:block xl:right-5"
    >
      <div className="course-glass pointer-events-auto flex flex-col gap-1 rounded-[22px] p-2">
        {navItems.map((item) => {
          const isActive = active === item.id;
          return (
            <a
              key={item.id}
              href={item.href}
              title={item.label}
              aria-current={isActive ? "true" : undefined}
              className={[
                "group flex items-center gap-2 rounded-2xl px-2.5 py-2 transition",
                isActive ? "bg-white/12 text-white" : "text-white/55 hover:bg-white/8 hover:text-white",
              ].join(" ")}
            >
              <span
                className={[
                  "h-2 w-2 shrink-0 rounded-full transition",
                  isActive
                    ? "bg-[var(--accent-cyan)] shadow-[0_0_10px_rgba(62,224,255,0.7)]"
                    : "bg-white/35 group-hover:bg-white/70",
                ].join(" ")}
              />
              <span className="course-display max-w-0 overflow-hidden text-xs tracking-wide whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-[7rem] group-hover:opacity-100 xl:max-w-[7rem] xl:opacity-100">
                {item.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}

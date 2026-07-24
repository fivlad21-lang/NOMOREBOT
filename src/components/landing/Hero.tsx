"use client";

import { BUILD_TIME, BRAND, expert } from "@/data/course";
import { CourseButton } from "./CourseButton";
import { MetaChip } from "./MetaChip";

type Props = {
  subtitle: string;
};

export function Hero({ subtitle }: Props) {
  return (
    <section className="relative flex min-h-[100svh] items-center pb-16 pt-6 md:pb-24 md:pt-10">
      <div className="course-container grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="hero-fade max-w-2xl">
          <p className="course-display mb-4 text-4xl leading-none text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {BRAND}
          </p>
          <h1 className="course-display mb-5 text-3xl leading-[1.08] sm:text-4xl md:text-5xl">
            Сайт, який продає — за вечір, не за місяць
          </h1>
          <p className="mb-7 max-w-xl text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
            {subtitle}
          </p>

          <div className="mb-7 flex flex-wrap gap-3">
            <CourseButton href="#pricing">Отримати доступ</CourseButton>
            <CourseButton href="#program" variant="secondary">
              Дивитись програму
            </CourseButton>
          </div>

          <MetaChip>
            Цей лендінг створено за{" "}
            <strong className="font-semibold text-white">{BUILD_TIME}</strong>
          </MetaChip>
        </div>

        <div className="hero-fade hero-fade-delay relative mx-auto w-full max-w-md lg:justify-self-end">
          <div className="course-glass-strong overflow-hidden p-3">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-gradient-to-br from-[#1a2440] via-[#142033] to-[#0d1528]">
              <div
                className="absolute inset-0 opacity-80"
                style={{
                  background:
                    "radial-gradient(circle at 30% 20%, rgba(62,224,255,0.35), transparent 45%), radial-gradient(circle at 80% 70%, rgba(255,90,106,0.3), transparent 40%)",
                }}
              />
              <div className="absolute left-1/2 top-[28%] flex h-36 w-36 -translate-x-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md">
                <span className="course-display text-4xl text-white">В</span>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="course-glass p-4">
                  <p className="course-display text-xl text-white">{expert.name}</p>
                  <p className="mt-1 text-sm leading-snug text-[var(--text-muted)]">
                    {expert.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

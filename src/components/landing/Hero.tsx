"use client";

import Image from "next/image";
import { BRAND, BUILD_TIME, expert, expertPhoto } from "@/data/course";
import { CourseButton } from "./CourseButton";
import { MetaChip } from "./MetaChip";

type Props = {
  subtitle: string;
};

export function Hero({ subtitle }: Props) {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center scroll-mt-24 pb-16 pt-6 md:pb-24 md:pt-10"
    >
      <div className="course-container grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="hero-fade max-w-2xl">
          <p className="course-display mb-4 text-4xl leading-[0.92] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block">NOMORE</span>
            <span className="block">LAB</span>
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
            Цей лендінг {BRAND} зібрано за{" "}
            <strong className="font-semibold text-white">{BUILD_TIME}</strong>
          </MetaChip>
        </div>

        <div className="hero-fade hero-fade-delay relative mx-auto w-full max-w-md lg:justify-self-end">
          <div className="course-glass-strong overflow-hidden p-3">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[20px]">
              <Image
                src={expertPhoto}
                alt={expert.name}
                fill
                priority
                sizes="(max-width: 768px) 90vw, 420px"
                className="object-cover object-[center_20%]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b1020]/95 via-[#0b1020]/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="course-glass p-4">
                  <p className="course-display text-xl text-white">
                    {expert.name}
                  </p>
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

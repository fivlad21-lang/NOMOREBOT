"use client";

import Image from "next/image";
import { BRAND, BUILD_TIME, expert, heroBackdrop } from "@/data/course";
import { CourseButton } from "./CourseButton";
import { MetaChip } from "./MetaChip";

type Props = {
  subtitle: string;
};

export function Hero({ subtitle }: Props) {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-end scroll-mt-24 pb-16 pt-28 md:items-center md:pb-24 md:pt-28"
    >
      <div className="absolute inset-0" aria-hidden>
        <Image
          src={heroBackdrop}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-50 md:opacity-65"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1020] via-[#0b1020]/90 to-[#0b1020]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1020] via-transparent to-[#0b1020]/50" />
      </div>

      <div className="course-container relative z-10 w-full">
        <div className="hero-fade max-w-3xl">
          <p className="course-display mb-4 whitespace-nowrap text-4xl leading-none tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            NOMORE LAB
          </p>
          <h1 className="course-display mb-5 max-w-3xl text-3xl leading-[1.12] sm:text-4xl md:text-[2.65rem] md:leading-[1.15] lg:text-5xl">
            Зроби сайт під свої потреби за вечір.
          </h1>
          <p className="mb-7 max-w-xl text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
            {subtitle}
          </p>

          <div className="mb-7 flex flex-wrap gap-3">
            <CourseButton href="#pricing">Обрати тариф</CourseButton>
            <CourseButton href="#program" variant="secondary">
              Дивитись програму
            </CourseButton>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <MetaChip>
              Цей сайт {BRAND} зібрано за{" "}
              <strong className="font-semibold text-white">{BUILD_TIME}</strong>
            </MetaChip>
            <p className="text-xs text-white/45 md:text-sm">
              {expert.name} · сайти для бізнесу
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

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
      className="relative flex min-h-[100svh] items-end scroll-mt-24 pb-16 pt-28 md:items-center md:pb-24 md:pt-28"
    >
      <div className="absolute inset-0" aria-hidden>
        <Image
          src={expertPhoto}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_18%] opacity-55 md:opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1020] via-[#0b1020]/88 to-[#0b1020]/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1020] via-transparent to-[#0b1020]/55" />
      </div>

      <div className="course-container relative z-10 w-full">
        <div className="hero-fade max-w-2xl">
          <p className="course-display mb-4 text-4xl leading-[0.92] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block">NOMORE</span>
            <span className="block">LAB</span>
          </p>
          <h1 className="course-display mb-5 text-3xl leading-[1.08] sm:text-4xl md:text-5xl">
            Збери лендінг під TikTok за вечір — і приймай оплату
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
              Цей лендінг {BRAND} зібрано за{" "}
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

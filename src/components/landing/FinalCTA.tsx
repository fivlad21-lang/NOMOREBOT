import { BUILD_TIME } from "@/data/course";
import { CourseButton } from "./CourseButton";
import { MetaChip } from "./MetaChip";
import { Reveal } from "./Reveal";

export function FinalCTA() {
  return (
    <section className="course-section pt-0">
      <div className="course-container">
        <Reveal>
          <div className="course-glass-strong px-6 py-12 text-center md:px-12 md:py-16">
            <h2 className="course-display mx-auto mb-4 max-w-3xl text-3xl md:text-5xl">
              Сайт, який продає — за вечір, не за місяць
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-[var(--text-muted)]">
              Хочеш такий самий лендінг під свій офер? Почни з тарифу й збери
              першу сторінку за сценарієм курсу.
            </p>
            <div className="mb-6 flex justify-center">
              <CourseButton href="#pricing">Обрати тариф</CourseButton>
            </div>
            <MetaChip>
              Цей лендінг створено за{" "}
              <strong className="font-semibold text-white">{BUILD_TIME}</strong>
            </MetaChip>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

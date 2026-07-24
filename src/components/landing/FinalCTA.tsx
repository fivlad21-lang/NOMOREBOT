import { BUILD_TIME } from "@/data/course";
import { CourseButton } from "./CourseButton";
import { MetaChip } from "./MetaChip";
import { Reveal } from "./Reveal";

export function FinalCTA() {
  return (
    <section className="course-section pt-0">
      <div className="course-container text-center">
        <Reveal>
          <h2 className="course-display mx-auto mb-4 max-w-3xl text-3xl md:text-5xl">
            Готовий зробити свій сайт?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-[var(--text-muted)]">
            Обери тариф і пройди той самий шлях, яким зібрано цей сайт — за{" "}
            {BUILD_TIME} підходу.
          </p>
          <div className="mb-6 flex justify-center">
            <CourseButton href="#pricing">До тарифів</CourseButton>
          </div>
          <MetaChip>
            Доказ на екрані — не слайд у презентації
          </MetaChip>
        </Reveal>
      </div>
    </section>
  );
}

import { BUILD_TIME } from "@/data/course";
import { Reveal } from "./Reveal";

export function ProofStrip() {
  return (
    <div className="course-container">
      <Reveal>
        <div className="course-glass flex flex-wrap items-center justify-center gap-x-6 gap-y-2 px-5 py-4 text-center text-sm text-[var(--text-muted)] md:text-base">
          <span>
            Цей сайт зібрано за{" "}
            <strong className="text-white">{BUILD_TIME}</strong>
          </span>
          <span className="hidden text-white/20 sm:inline">·</span>
          <span>
            Готовий <strong className="text-white">сайт</strong>, не макет «на
            потім»
          </span>
          <span className="hidden text-white/20 sm:inline">·</span>
          <span>
            Перший сайт —{" "}
            <strong className="text-white">за один вечір</strong>
          </span>
        </div>
      </Reveal>
    </div>
  );
}

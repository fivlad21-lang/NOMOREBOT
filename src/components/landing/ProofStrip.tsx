import { BUILD_TIME } from "@/data/course";
import { Reveal } from "./Reveal";

export function ProofStrip() {
  return (
    <div className="course-container">
      <Reveal>
        <div className="course-glass flex flex-wrap items-center justify-center gap-x-6 gap-y-2 px-5 py-4 text-center text-sm text-[var(--text-muted)] md:text-base">
          <span>
            Цей лендінг зібрано за{" "}
            <strong className="text-white">{BUILD_TIME}</strong>
          </span>
          <span className="hidden text-white/20 sm:inline">·</span>
          <span>
            Воронка до <strong className="text-white">оплати</strong>, не до
            «напишіть в дірект»
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

import { Reveal } from "./Reveal";

export function ProofStrip() {
  return (
    <div className="course-container">
      <Reveal>
        <div className="course-glass flex flex-wrap items-center justify-center gap-x-6 gap-y-2 px-5 py-4 text-center text-sm text-[var(--text-muted)] md:text-base">
          <span>
            <strong className="text-white">120+</strong> учнів
          </span>
          <span className="hidden text-white/20 sm:inline">·</span>
          <span>
            <strong className="text-white">40+</strong> запущених лендінгів
          </span>
          <span className="hidden text-white/20 sm:inline">·</span>
          <span>
            середній час першого сайту —{" "}
            <strong className="text-white">1 вечір</strong>
          </span>
        </div>
      </Reveal>
    </div>
  );
}

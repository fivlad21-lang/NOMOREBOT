import { BRAND, BUILD_TIME } from "@/data/course";
import { Reveal } from "./Reveal";

const TIMELINE = ["Ідея", "Структура", "Дизайн", "Оплата"];

export function ProofBlock() {
  return (
    <section id="proof" className="course-section scroll-mt-24">
      <div className="course-container grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <div className="course-glass-strong overflow-hidden p-4 md:p-5">
            <div className="rounded-[18px] border border-white/10 bg-[#0a0f1c]/95 p-5 md:p-6">
              <div className="mb-6 flex items-center justify-between gap-3">
                <span className="course-display text-lg">{BRAND}</span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-[var(--accent-lime)]">
                  live
                </span>
              </div>
              <div className="mb-4 h-3 w-2/3 rounded-full bg-white/10" />
              <div className="mb-8 h-3 w-1/2 rounded-full bg-white/10" />
              <div className="grid grid-cols-3 gap-3">
                <div className="h-20 rounded-2xl bg-gradient-to-br from-cyan-400/30 to-transparent" />
                <div className="h-20 rounded-2xl bg-gradient-to-br from-rose-400/30 to-transparent" />
                <div className="h-20 rounded-2xl bg-gradient-to-br from-lime-400/25 to-transparent" />
              </div>
              <div className="mt-5 h-10 w-40 rounded-xl bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-lime)] opacity-90" />
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div>
            <h2 className="course-heading mb-4 text-3xl md:text-4xl">
              Цей сайт — доказ
            </h2>
            <p className="mb-8 max-w-lg text-[var(--text-muted)] leading-relaxed">
              Те, що ти бачиш зараз, зібрано за {BUILD_TIME}. У курсі — той самий
              підхід: швидка структура, сучасний UI і шлях до оплати.
            </p>

            <div className="flex flex-wrap gap-2">
              {TIMELINE.map((step, index) => (
                <div key={step} className="flex items-center gap-2">
                  <span className="course-chip !rounded-2xl">{step}</span>
                  {index < TIMELINE.length - 1 ? (
                    <span className="text-white/30" aria-hidden>
                      →
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

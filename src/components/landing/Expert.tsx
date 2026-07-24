import { expert } from "@/data/course";
import { Reveal } from "./Reveal";

export function Expert() {
  return (
    <section id="expert" className="course-section scroll-mt-24">
      <div className="course-container">
        <Reveal>
          <div className="course-glass-strong grid overflow-hidden md:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-[320px] bg-gradient-to-br from-[#1c2744] via-[#141d33] to-[#0c1324] md:min-h-full">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 40% 30%, rgba(62,224,255,0.28), transparent 50%), radial-gradient(circle at 70% 75%, rgba(255,90,106,0.22), transparent 45%)",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-44 w-44 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md md:h-52 md:w-52">
                  <span className="course-display text-6xl text-white">В</span>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-10">
              <p className="mb-2 text-sm uppercase tracking-[0.16em] text-[var(--accent-cyan)]">
                Експерт
              </p>
              <h2 className="course-display mb-2 text-3xl md:text-4xl">
                {expert.name}
              </h2>
              <p className="mb-6 text-lg text-white/90">{expert.role}</p>
              <ul className="mb-6 space-y-3 text-[var(--text-muted)]">
                {expert.facts.map((fact) => (
                  <li key={fact} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-lime)]" />
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
              <p className="border-t border-white/10 pt-5 text-[var(--text-muted)] italic">
                «{expert.philosophy}»
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

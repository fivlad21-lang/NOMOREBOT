import { modules } from "@/data/course";
import { Reveal } from "./Reveal";

export function Program() {
  return (
    <section id="program" className="course-section scroll-mt-24">
      <div className="course-container">
        <Reveal>
          <h2 className="course-heading mb-3 text-3xl md:text-4xl">
            Що отримаєш
          </h2>
          <p className="mb-10 max-w-2xl text-[var(--text-muted)]">
            7 модулів від ідеї до запущеного сайту — і далі до перших замовлень.
          </p>
        </Reveal>

        <div className="course-glass divide-y divide-white/10 overflow-hidden">
          {modules.map((mod, i) => (
            <Reveal key={mod.title} delay={i * 40}>
              <div className="grid gap-2 px-5 py-5 md:grid-cols-[2fr_3fr] md:items-baseline md:gap-8 md:px-6">
                <div className="flex gap-3">
                  <span className="text-sm text-[var(--accent-cyan)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="course-heading text-lg text-white md:text-xl">
                    {mod.title}
                  </h3>
                </div>
                <p className="pl-8 text-[var(--text-muted)] md:pl-0">
                  {mod.result}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import { pains } from "@/data/course";
import { Reveal } from "./Reveal";

export function PainSolutions() {
  return (
    <section className="course-section">
      <div className="course-container">
        <Reveal>
          <h2 className="mb-3 max-w-3xl text-3xl font-bold tracking-tight text-white md:text-4xl">
            Чому бізнес сидить на підрядниках і переплачує
          </h2>
          <p className="mb-10 max-w-2xl text-[var(--text-muted)]">
            Не лише «дешево і швидко». Ти контролюєш сайт сам — і правиш його,
            коли треба, без черги в агентстві.
          </p>
        </Reveal>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {pains.map((item, i) => (
            <Reveal key={item.label} delay={i * 70}>
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-cyan)]">
                  {item.label}
                </p>
                <p className="mb-3 text-lg font-medium text-white/90">
                  {item.pain}
                </p>
                <p className="text-[var(--text-muted)] leading-relaxed">
                  {item.fix}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

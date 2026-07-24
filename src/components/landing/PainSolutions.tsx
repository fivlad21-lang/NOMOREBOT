import { forWhom, pains } from "@/data/course";
import { Reveal } from "./Reveal";

export function PainSolutions() {
  return (
    <section className="course-section">
      <div className="course-container">
        <Reveal>
          <h2 className="course-heading mb-3 max-w-3xl text-3xl md:text-4xl">
            Дорого, довго, без контролю — знайомо?
          </h2>
          <p className="mb-10 max-w-2xl text-[var(--text-muted)]">
            Курс закриває чотири болі бізнесу: ціна, швидкість, контроль і правки
            наживо.
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

        <Reveal delay={120}>
          <div className="mt-12 grid gap-8 border-t border-white/10 pt-10 md:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-lime)]">
                Так, якщо ти
              </p>
              <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                {forWhom.yes.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-[var(--accent-lime)]">+</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-coral)]">
                Ні, якщо ти
              </p>
              <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                {forWhom.no.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-[var(--accent-coral)]">−</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

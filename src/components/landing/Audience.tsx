import { forWhom } from "@/data/course";
import { Reveal } from "./Reveal";

export function Audience() {
  return (
    <section className="course-section">
      <div className="course-container">
        <Reveal>
          <h2 className="course-display mb-10 text-3xl md:text-4xl">
            Для кого цей курс
          </h2>
        </Reveal>

        <div className="grid gap-10 md:grid-cols-2">
          <Reveal>
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-lime)]">
                Так, якщо ти
              </p>
              <ul className="space-y-3 text-[var(--text-muted)]">
                {forWhom.yes.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 text-[var(--accent-lime)]">+</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-coral)]">
                Ні, якщо ти
              </p>
              <ul className="space-y-3 text-[var(--text-muted)]">
                {forWhom.no.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 text-[var(--accent-coral)]">−</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

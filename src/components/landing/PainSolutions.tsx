import { pains } from "@/data/course";
import { Reveal } from "./Reveal";

export function PainSolutions() {
  return (
    <section className="course-section">
      <div className="course-container">
        <Reveal>
          <h2 className="course-display mb-10 max-w-3xl text-3xl md:text-4xl">
            Чому більшість «вчать сайти», а грошей нема
          </h2>
        </Reveal>

        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {pains.map((item, i) => (
            <Reveal key={item.label} delay={i * 80}>
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-cyan)]">
                  {item.label}
                </p>
                <p className="mb-3 text-lg text-white/90">{item.pain}</p>
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

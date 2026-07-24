import { steps } from "@/data/course";
import { Reveal } from "./Reveal";

export function HowItWorks() {
  return (
    <section className="course-section">
      <div className="course-container">
        <Reveal>
          <h2 className="course-heading mb-10 text-3xl md:text-4xl">
            Як це працює
          </h2>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal key={step.n} delay={i * 70}>
              <div>
                <p className="course-display mb-3 text-4xl text-white/25">
                  {step.n}
                </p>
                <h3 className="course-heading mb-2 text-xl">{step.title}</h3>
                <p className="text-[var(--text-muted)] leading-relaxed">
                  {step.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

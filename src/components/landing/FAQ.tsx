import { faq } from "@/data/course";
import { Reveal } from "./Reveal";

export function FAQ() {
  return (
    <section id="faq" className="course-section scroll-mt-24">
      <div className="course-container max-w-3xl">
        <Reveal>
          <h2 className="course-display mb-8 text-3xl md:text-4xl">FAQ</h2>
        </Reveal>

        <div className="course-faq course-glass px-5 md:px-6">
          {faq.map((item) => (
            <details key={item.q} className="group py-4">
              <summary className="flex items-center justify-between gap-4 font-semibold text-white">
                <span>{item.q}</span>
                <span className="text-[var(--accent-cyan)] transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-[var(--text-muted)] leading-relaxed">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

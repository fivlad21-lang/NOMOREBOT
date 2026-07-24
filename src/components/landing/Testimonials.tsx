import { testimonials } from "@/data/course";
import { Reveal } from "./Reveal";

export function Testimonials() {
  return (
    <section id="reviews" className="course-section scroll-mt-24">
      <div className="course-container">
        <Reveal>
          <h2 className="course-display mb-10 text-3xl md:text-4xl">
            Відгуки учнів
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, i) => (
            <Reveal key={`${item.name}-${item.age}`} delay={i * 50}>
              <figure className="course-glass flex h-full flex-col p-5 md:p-6">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-cyan)]">
                  {item.pain}
                </p>
                <blockquote className="mb-6 flex-1 text-[var(--text-muted)] leading-relaxed">
                  “{item.quote}”
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white">
                    {item.name.slice(0, 1)}
                  </span>
                  <span>
                    <span className="block font-semibold text-white">
                      {item.name}, {item.age}
                    </span>
                    <span className="text-sm text-[var(--text-muted)]">
                      {item.niche}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

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

        <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0">
          {testimonials.map((item, i) => (
            <Reveal
              key={item.name}
              delay={i * 50}
              className="min-w-[82%] shrink-0 md:min-w-0"
            >
              <figure className="course-glass flex h-full flex-col p-5 md:p-6">
                <blockquote className="mb-6 flex-1 text-[var(--text-muted)] leading-relaxed">
                  “{item.quote}”
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white">
                    {item.name.slice(0, 1)}
                  </span>
                  <span>
                    <span className="block font-semibold text-white">
                      {item.name}
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

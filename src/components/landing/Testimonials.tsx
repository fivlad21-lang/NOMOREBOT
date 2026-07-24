import Image from "next/image";
import { testimonials } from "@/data/course";
import { Reveal } from "./Reveal";

export function Testimonials() {
  return (
    <section id="reviews" className="course-section scroll-mt-24">
      <div className="course-container">
        <Reveal>
          <h2 className="mb-10 text-3xl font-bold tracking-tight text-white md:text-4xl">
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
                <blockquote className="mb-6 flex-1 text-[15px] leading-relaxed text-[var(--text-muted)] md:text-base">
                  “{item.quote}”
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-white/15 bg-white/10">
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
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

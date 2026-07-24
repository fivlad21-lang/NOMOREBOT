import Image from "next/image";
import { testimonials } from "@/data/course";
import { Reveal } from "./Reveal";

const AVATAR_TONES = [
  "from-cyan-500/40 to-cyan-900/40",
  "from-rose-500/35 to-rose-900/40",
  "from-lime-500/35 to-emerald-900/40",
  "from-amber-500/35 to-orange-900/40",
  "from-violet-500/35 to-indigo-900/40",
  "from-sky-500/35 to-blue-900/40",
];

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Testimonials() {
  return (
    <section id="reviews" className="course-section scroll-mt-24">
      <div className="course-container">
        <Reveal>
          <div className="mb-10 max-w-2xl">
            <h2 className="course-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
              Відгуки учнів
            </h2>
            <p className="mt-3 text-sm text-[var(--text-muted)] md:text-base">
              Живі кейси зі збірки й запуску — без стокових фото. Реальні аватарки
              додамо, коли надійдуть від учнів.
            </p>
          </div>
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
                  {item.avatar ? (
                    <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-white/15 bg-white/10">
                      <Image
                        src={item.avatar}
                        alt={item.name}
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    </span>
                  ) : (
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-gradient-to-br text-sm font-semibold text-white ${AVATAR_TONES[i % AVATAR_TONES.length]}`}
                      aria-hidden
                    >
                      {initials(item.name)}
                    </span>
                  )}
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

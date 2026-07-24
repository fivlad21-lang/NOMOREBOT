import Image from "next/image";
import { expert, expertPhoto } from "@/data/course";
import { Reveal } from "./Reveal";

export function Expert() {
  return (
    <section id="expert" className="course-section scroll-mt-24">
      <div className="course-container">
        <Reveal>
          <div className="course-glass-strong grid overflow-hidden md:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-[340px] md:min-h-[440px]">
              <Image
                src={expertPhoto}
                alt={expert.name}
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover object-[center_18%]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b1020]/55 via-transparent to-[#0b1020]/2 md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-[#0b1020]/45" />
            </div>

            <div className="p-6 md:p-10">
              <p className="mb-2 text-sm uppercase tracking-[0.16em] text-[var(--accent-cyan)]">
                Експерт
              </p>
              <h2 className="course-heading mb-2 text-3xl md:text-4xl">
                {expert.name}
              </h2>
              <p className="mb-6 text-lg text-white/90">{expert.role}</p>
              <ul className="mb-6 space-y-3 text-[var(--text-muted)]">
                {expert.facts.map((fact) => (
                  <li key={fact} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-lime)]" />
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
              <p className="border-t border-white/10 pt-5 text-[var(--text-muted)] italic">
                «{expert.philosophy}»
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

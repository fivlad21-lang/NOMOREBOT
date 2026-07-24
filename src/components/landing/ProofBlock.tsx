import { BUILD_TIME, BRAND } from "@/data/course";
import { Reveal } from "./Reveal";

const TIMELINE = [
  { label: "Ідея", hint: "задачі" },
  { label: "Структура", hint: "блоки" },
  { label: "UI", hint: "вигляд" },
  { label: "Запуск", hint: "live" },
];

export function ProofBlock() {
  return (
    <section id="proof" className="course-section scroll-mt-24">
      <div className="course-container grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <div className="course-glass-strong overflow-hidden p-5 md:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-cyan)]">
              Meta-proof
            </p>
            <p className="course-display mt-4 text-white/50">Цей сайт</p>
            <p className="course-display mt-1 text-5xl leading-none text-white md:text-6xl">
              {BUILD_TIME}
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--text-muted)]">
              Не макет «на потім». Сторінка курсу зібрана тим самим підходом,
              якому вчимо — від ідеї до запущеного сайту.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {TIMELINE.map((step, index) => (
                <div key={step.label} className="flex items-center gap-2">
                  <span className="course-chip !rounded-2xl">
                    {step.label}
                    <span className="ml-1 text-white/40">{step.hint}</span>
                  </span>
                  {index < TIMELINE.length - 1 ? (
                    <span className="text-white/30" aria-hidden>
                      →
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div>
            <h2 className="course-heading mb-4 text-3xl md:text-4xl">
              Сайт сам себе доводить
            </h2>
            <p className="mb-6 max-w-lg text-[var(--text-muted)] leading-relaxed">
              {BRAND} — не слайди теорії. Ти бачиш робочий сайт: структура, UI,
              тарифи, checkout. У курсі — той самий сценарій під твої потреби.
            </p>
            <ul className="space-y-3 text-sm text-[var(--text-muted)]">
              <li className="flex gap-2">
                <span className="text-[var(--accent-lime)]">✓</span>
                Швидкість важливіша за «ідеальний макет на місяць»
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--accent-lime)]">✓</span>
                Блоки: структура → довіра → дія
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--accent-lime)]">✓</span>
                Після збірки ти сам правиш тексти й секції без агентства
              </li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

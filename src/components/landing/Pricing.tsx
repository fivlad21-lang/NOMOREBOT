import { plans } from "@/data/course";
import { CourseButton } from "./CourseButton";
import { Reveal } from "./Reveal";

export function Pricing() {
  return (
    <section id="pricing" className="course-section scroll-mt-24">
      <div className="course-container">
        <Reveal>
          <h2 className="course-heading mb-3 text-center text-3xl md:text-4xl">
            Обери свій тариф
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-center text-[var(--text-muted)]">
            Одноразова оплата. Доступ одразу після оплати на email / у Telegram.
          </p>
        </Reveal>

        <div className="grid items-stretch gap-5 lg:grid-cols-3">
          {plans.map((plan, i) => {
            const featured = plan.tone === "featured";
            const accent = plan.tone === "accent";

            return (
              <Reveal key={plan.id} delay={i * 70}>
                <article
                  className={[
                    "course-glass course-price-card relative flex h-full flex-col p-6",
                    featured ? "course-price-card--featured" : "",
                    accent ? "bg-[rgba(8,12,24,0.55)]" : "",
                  ].join(" ")}
                >
                  {plan.badge ? (
                    <span className="mb-4 inline-flex w-fit rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-[var(--accent-lime)]">
                      {plan.badge}
                    </span>
                  ) : (
                    <span className="mb-4 inline-block h-6" />
                  )}

                  <h3 className="course-display text-2xl text-white">
                    {plan.name}
                  </h3>

                  <div className="mt-4 mb-6">
                    <p className="course-display text-4xl text-white">
                      ${plan.priceUsd}
                    </p>
                    <p className="mt-1 text-sm text-[var(--text-muted)]">
                      ≈ ₴{plan.priceUah.toLocaleString("uk-UA")}
                    </p>
                  </div>

                  <ul className="mb-8 flex-1 space-y-3 text-sm text-[var(--text-muted)]">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex gap-2">
                        <span className="text-[var(--accent-cyan)]">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <CourseButton
                    href={`/checkout?plan=${plan.id}`}
                    variant={featured || accent ? "primary" : "secondary"}
                    className="w-full"
                    data-plan={plan.id}
                  >
                    {plan.cta}
                  </CourseButton>

                  <p className="mt-3 text-center text-xs text-[var(--text-muted)]">
                    Одноразова оплата · доступ одразу
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm text-[var(--text-muted)]">
          Доступ протягом кількох хвилин на email. Community і Mentor — інвайт у
          Telegram.
        </p>
      </div>
    </section>
  );
}

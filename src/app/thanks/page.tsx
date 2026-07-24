import { CourseButton } from "@/components/landing/CourseButton";
import { OrbBackground } from "@/components/landing/OrbBackground";
import { BRAND, getPlan, type PlanId } from "@/data/course";

type Props = {
  searchParams: Promise<{ plan?: string; order?: string }>;
};

export default async function ThanksPage({ searchParams }: Props) {
  const params = await searchParams;
  const plan = getPlan(params.plan) ?? getPlan("community")!;
  const planId = plan.id as PlanId;

  return (
    <div className="course-theme course-shell min-h-screen">
      <OrbBackground />
      <div className="course-content">
        <div className="course-container flex min-h-screen items-center py-16">
          <div className="course-glass-strong mx-auto max-w-2xl p-8 text-center md:p-12">
            <p className="mb-3 text-sm uppercase tracking-[0.16em] text-[var(--accent-lime)]">
              Оплату прийнято
            </p>
            <h1 className="course-display mb-4 text-3xl md:text-5xl">
              Вітаю в {BRAND}
            </h1>
            <p className="mb-8 text-[var(--text-muted)] leading-relaxed">
              Тариф <strong className="text-white">{plan.name}</strong> активний.
              {params.order ? (
                <>
                  {" "}
                  Номер замовлення:{" "}
                  <span className="text-white">{params.order}</span>.
                </>
              ) : null}{" "}
              Лист з доступом надіслано на email (у демо — симуляція).
            </p>

            <div className="mb-8 space-y-3 text-left text-sm text-[var(--text-muted)]">
              <p>
                <strong className="text-white">Start:</strong> лінк на матеріали в
                листі.
              </p>
              {(planId === "community" || planId === "mentor") && (
                <p>
                  <strong className="text-white">Community:</strong> інвайт у
                  Telegram протягом кількох хвилин.
                </p>
              )}
              {planId === "mentor" && (
                <p>
                  <strong className="text-white">Mentor:</strong> напиши мені в
                  Telegram, щоб узгодити созвонни й розбір лендінгу.
                </p>
              )}
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {(planId === "community" || planId === "mentor") && (
                <CourseButton href="https://t.me/" variant="primary">
                  Відкрити Telegram
                </CourseButton>
              )}
              {planId === "mentor" && (
                <CourseButton href="https://t.me/" variant="secondary">
                  Написати мені
                </CourseButton>
              )}
              <CourseButton href="/" variant="ghost">
                На головну
              </CourseButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

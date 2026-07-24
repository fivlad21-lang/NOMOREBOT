import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  return (
    <div className="mx-auto max-w-3xl px-4 py-20 md:px-6 md:py-28">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sea">
        LEV Estates
      </p>
      <h1 className="mt-4 font-display text-5xl text-navy md:text-6xl">{t("title")}</h1>
      <div className="mt-10 space-y-6 text-lg leading-relaxed text-ink-soft">
        <p>{t("p1")}</p>
        <p>{t("p2")}</p>
      </div>
    </div>
  );
}

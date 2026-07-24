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
    <div className="mx-auto max-w-3xl px-4 py-14 md:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-5xl text-navy">{t("title")}</h1>
      <p className="mt-6 text-lg leading-relaxed text-ink-soft">{t("p1")}</p>
      <p className="mt-4 text-lg leading-relaxed text-ink-soft">{t("p2")}</p>
    </div>
  );
}

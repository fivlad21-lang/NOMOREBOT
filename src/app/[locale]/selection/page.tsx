import { getTranslations, setRequestLocale } from "next-intl/server";
import { LeadForm } from "@/components/forms/LeadForm";

export default async function SelectionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("selection");

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 md:px-6 md:py-24">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sea">
        LEV Estates
      </p>
      <h1 className="mt-4 font-display text-5xl text-navy">{t("title")}</h1>
      <p className="mt-4 text-lg text-ink-soft">{t("subtitle")}</p>
      <div className="mt-10 border border-line bg-white/70 p-6 md:p-8">
        <LeadForm />
      </div>
    </div>
  );
}

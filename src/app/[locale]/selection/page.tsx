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
    <div className="mx-auto max-w-2xl px-4 py-14 md:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-5xl text-navy">{t("title")}</h1>
      <p className="mt-4 text-ink-soft">{t("subtitle")}</p>
      <div className="mt-8">
        <LeadForm />
      </div>
    </div>
  );
}

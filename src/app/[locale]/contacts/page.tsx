import { getTranslations, setRequestLocale } from "next-intl/server";
import { LeadForm } from "@/components/forms/LeadForm";

export default async function ContactsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contacts");
  const tc = await getTranslations("common");

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2 md:px-6">
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-5xl text-navy">
          {t("title")}
        </h1>
        <p className="mt-4 text-ink-soft">{t("subtitle")}</p>
        <div className="mt-8 space-y-3 text-lg">
          <p>
            <a className="text-sea hover:underline" href={`tel:${tc("phone").replace(/\s/g, "")}`}>
              {tc("phone")}
            </a>
          </p>
          <p>
            <a className="text-sea hover:underline" href={`mailto:${tc("email")}`}>
              {tc("email")}
            </a>
          </p>
          <p className="text-ink-soft">{t("address")}</p>
        </div>
      </div>
      <LeadForm />
    </div>
  );
}

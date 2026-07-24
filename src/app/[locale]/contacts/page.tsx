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
    <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:grid-cols-2 md:px-6 md:py-24">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sea">
          LEV Estates
        </p>
        <h1 className="mt-4 font-display text-5xl text-navy md:text-6xl">{t("title")}</h1>
        <p className="mt-5 max-w-md text-lg text-ink-soft">{t("subtitle")}</p>
        <div className="mt-10 space-y-4 border-t border-line pt-8 text-lg">
          <p>
            <a className="text-navy hover:text-sea" href={`tel:${tc("phone").replace(/\s/g, "")}`}>
              {tc("phone")}
            </a>
          </p>
          <p>
            <a className="text-navy hover:text-sea" href={`mailto:${tc("email")}`}>
              {tc("email")}
            </a>
          </p>
          <p className="text-ink-soft">{t("address")}</p>
        </div>
      </div>
      <div className="border border-line bg-white/70 p-6 md:p-8">
        <LeadForm />
      </div>
    </div>
  );
}

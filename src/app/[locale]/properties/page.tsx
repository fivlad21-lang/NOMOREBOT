import { getTranslations, setRequestLocale } from "next-intl/server";
import { getProperties } from "@/lib/api/properties";
import { CatalogClient } from "@/components/filters/CatalogClient";
import type { LocationKey } from "@/lib/types";

export default async function PropertiesPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ view?: string; location?: string }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations("catalog");
  const properties = getProperties();
  const view =
    sp.view === "map" || sp.view === "list" || sp.view === "grid" ? sp.view : "grid";
  const location = sp.location as LocationKey | undefined;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
      <div className="mb-10 max-w-3xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sea">
          LEV Estates
        </p>
        <h1 className="mt-3 font-display text-5xl font-semibold tracking-[-0.02em] text-navy md:text-6xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-lg text-ink-soft">{t("subtitle")}</p>
      </div>
      <CatalogClient
        initialProperties={properties}
        initialView={view}
        initialLocation={location}
      />
    </div>
  );
}

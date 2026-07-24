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
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <div className="mb-8 max-w-3xl">
        <h1 className="font-[family-name:var(--font-display)] text-5xl text-navy">
          {t("title")}
        </h1>
        <p className="mt-3 text-ink-soft">{t("subtitle")}</p>
      </div>
      <CatalogClient
        initialProperties={properties}
        initialView={view}
        initialLocation={location}
      />
    </div>
  );
}

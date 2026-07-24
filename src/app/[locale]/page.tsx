import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getHotProperties } from "@/lib/api/properties";
import { PropertyCard } from "@/components/property/PropertyCard";
import type { LocationKey } from "@/lib/types";

const LOCATIONS: LocationKey[] = [
  "sunny_beach",
  "sveti_vlas",
  "burgas",
  "ravda",
  "kosharitsa",
  "burgas_region",
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const tc = await getTranslations("common");
  const tl = await getTranslations("locations");
  const hot = getHotProperties(6);

  return (
    <div>
      <section className="relative isolate min-h-[78vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/55 to-navy/25" />
        <div className="relative mx-auto flex min-h-[78vh] max-w-7xl flex-col justify-end px-4 pb-16 pt-28 md:px-6 md:pb-20">
          <p className="mb-3 inline-flex w-fit rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wider text-white">
            {tc("demoBadge")} · LEV Estates
          </p>
          <h1 className="max-w-3xl font-[family-name:var(--font-display)] text-5xl leading-tight text-white md:text-7xl">
            {t("heroTitle")}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/85">{t("heroSubtitle")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/properties"
              className="rounded-full bg-sea px-6 py-3 text-sm font-semibold text-white transition hover:bg-sea-bright"
            >
              {t("ctaCatalog")}
            </Link>
            <Link
              href="/selection"
              className="rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              {t("ctaSelection")}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="font-[family-name:var(--font-display)] text-4xl text-navy">
            {t("hotTitle")}
          </h2>
          <Link href="/properties" className="text-sm font-semibold text-sea hover:underline">
            {tc("viewAll")}
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {hot.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 md:px-6">
        <h2 className="mb-6 font-[family-name:var(--font-display)] text-4xl text-navy">
          {t("locationsTitle")}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {LOCATIONS.map((loc) => (
            <Link
              key={loc}
              href={{ pathname: "/properties", query: { location: loc } }}
              className="rounded-2xl border border-line bg-white/75 px-5 py-6 transition hover:-translate-y-0.5 hover:border-sea hover:shadow-md"
            >
              <p className="font-[family-name:var(--font-display)] text-2xl text-navy">
                {tl(loc)}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-white/50 py-14">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="mb-8 font-[family-name:var(--font-display)] text-4xl text-navy">
            {t("whyTitle")}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              ["why1Title", "why1Text"],
              ["why2Title", "why2Text"],
              ["why3Title", "why3Text"],
            ].map(([title, text]) => (
              <article key={title} className="rounded-2xl border border-line bg-foam p-6">
                <h3 className="font-[family-name:var(--font-display)] text-2xl text-navy">
                  {t(title)}
                </h3>
                <p className="mt-3 text-ink-soft">{t(text)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="overflow-hidden rounded-[2rem] bg-navy px-6 py-12 text-foam md:px-12">
          <h2 className="font-[family-name:var(--font-display)] text-4xl">{t("selectionTitle")}</h2>
          <p className="mt-3 max-w-2xl text-white/75">{t("selectionText")}</p>
          <Link
            href="/selection"
            className="mt-6 inline-flex rounded-full bg-sea px-6 py-3 text-sm font-semibold text-white hover:bg-sea-bright"
          >
            {t("ctaSelection")}
          </Link>
        </div>
      </section>
    </div>
  );
}

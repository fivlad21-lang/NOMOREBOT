import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  getPropertyBySlug,
  getSimilarProperties,
} from "@/lib/api/properties";
import { PropertyCard } from "@/components/property/PropertyCard";
import { LeadForm } from "@/components/forms/LeadForm";
import { PropertyMap } from "@/components/map/PropertyMap";
import type { LocaleCode } from "@/lib/types";
import {
  formatPrice,
  propertyAddress,
  propertyDescription,
  propertyTitle,
  roomsLabel,
} from "@/lib/format";

export default async function PropertyDetailsPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const property = getPropertyBySlug(slug);
  if (!property) notFound();

  const t = await getTranslations();
  const loc = locale as LocaleCode;
  const title = propertyTitle(property, loc);
  const similar = getSimilarProperties(property, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <Link href="/properties" className="text-sm font-semibold text-sea hover:underline">
        ← {t("common.backToCatalog")}
      </Link>

      <div className="mt-4 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
        <div>
          <div className="grid gap-3 md:grid-cols-2">
            {property.images.map((src, idx) => (
              <div
                key={src + idx}
                className={`relative overflow-hidden rounded-2xl ${
                  idx === 0 ? "md:col-span-2 aspect-[16/9]" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={src}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 60vw"
                  priority={idx === 0}
                />
              </div>
            ))}
          </div>

          <div className="mt-8">
            <div className="flex flex-wrap items-center gap-2">
              {property.hot && (
                <span className="rounded-full bg-hot/10 px-2.5 py-1 text-xs font-semibold text-hot">
                  {t("common.hot")}
                </span>
              )}
              <span className="text-sm text-ink-soft">
                {t(`locations.${property.locationKey}`)} · {t(`types.${property.type}`)}
              </span>
            </div>
            <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl text-navy md:text-5xl">
              {title}
            </h1>
            <p className="mt-2 text-ink-soft">{propertyAddress(property, loc)}</p>
            <p className="mt-4 text-3xl font-semibold text-sea">
              {formatPrice(property.priceEur, loc)}
            </p>

            <div className="mt-8 grid gap-3 rounded-2xl border border-line bg-white/70 p-5 sm:grid-cols-3">
              <Spec
                label={t("property.rooms")}
                value={roomsLabel(property.rooms, (k) => t(`common.${k}`))}
              />
              <Spec
                label={t("property.area")}
                value={`${property.areaM2} ${t("common.m2")}`}
              />
              <Spec label={t("property.type")} value={t(`types.${property.type}`)} />
              {property.floor != null && (
                <Spec
                  label={t("common.floor")}
                  value={`${property.floor}${property.floorsTotal ? ` / ${property.floorsTotal}` : ""}`}
                />
              )}
            </div>

            <h2 className="mt-10 font-[family-name:var(--font-display)] text-3xl text-navy">
              {t("property.description")}
            </h2>
            <p className="mt-3 max-w-3xl leading-relaxed text-ink-soft">
              {propertyDescription(property, loc)}
            </p>

            <h2 className="mt-10 font-[family-name:var(--font-display)] text-3xl text-navy">
              {t("property.location")}
            </h2>
            <div className="mt-4 h-[360px] overflow-hidden rounded-2xl border border-line">
              <PropertyMap properties={[property]} />
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <h2 className="mb-3 font-[family-name:var(--font-display)] text-2xl text-navy">
            {t("property.askTitle")}
          </h2>
          <LeadForm compact propertyId={property.id} propertyTitle={title} />
        </aside>
      </div>

      {similar.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-5 font-[family-name:var(--font-display)] text-3xl text-navy">
            {t("common.similar")}
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((item) => (
              <PropertyCard key={item.id} property={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-ink-soft">{label}</p>
      <p className="mt-1 text-lg font-semibold text-navy">{value}</p>
    </div>
  );
}

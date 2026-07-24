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
import { SectionHeading } from "@/components/ui/SectionHeading";
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
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
      <Link
        href="/properties"
        className="text-xs font-semibold uppercase tracking-[0.16em] text-sea hover:text-sea-bright"
      >
        ← {t("common.backToCatalog")}
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.45fr_0.75fr]">
        <div>
          <div className="grid gap-2 md:grid-cols-2">
            {property.images.map((src, idx) => (
              <div
                key={src + idx}
                className={`relative overflow-hidden ${
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

          <div className="mt-10">
            <div className="flex flex-wrap items-center gap-3">
              {property.hot && (
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-hot">
                  {t("common.hot")}
                </span>
              )}
              <span className="text-[10px] uppercase tracking-[0.16em] text-ink-soft">
                {t(`locations.${property.locationKey}`)} · {t(`types.${property.type}`)}
              </span>
            </div>
            <h1 className="mt-3 font-display text-4xl leading-tight text-navy md:text-5xl">
              {title}
            </h1>
            <p className="mt-3 text-ink-soft">{propertyAddress(property, loc)}</p>
            <p className="mt-5 font-display text-4xl text-sea md:text-5xl">
              {formatPrice(property.priceEur, loc)}
            </p>

            <div className="mt-10 grid gap-6 border-y border-line py-6 sm:grid-cols-3">
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

            <h2 className="mt-10 font-display text-3xl text-navy">
              {t("property.description")}
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink-soft">
              {propertyDescription(property, loc)}
            </p>

            <h2 className="mt-12 font-display text-3xl text-navy">
              {t("property.location")}
            </h2>
            <div className="mt-5 h-[380px] overflow-hidden border border-line">
              <PropertyMap properties={[property]} />
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <div className="border border-line bg-white/75 p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
              LEV Estates
            </p>
            <h2 className="mt-2 font-display text-2xl text-navy">
              {t("property.askTitle")}
            </h2>
            <div className="mt-5">
              <LeadForm compact propertyId={property.id} propertyTitle={title} />
            </div>
          </div>
        </aside>
      </div>

      {similar.length > 0 && (
        <section className="mt-20">
          <SectionHeading title={t("common.similar")} />
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
      <p className="text-[10px] uppercase tracking-[0.16em] text-ink-soft">{label}</p>
      <p className="mt-2 font-display text-2xl text-navy">{value}</p>
    </div>
  );
}

import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getHotProperties } from "@/lib/api/properties";
import { PropertyCard } from "@/components/property/PropertyCard";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { LocationKey } from "@/lib/types";

const LOCATIONS: Array<{ key: LocationKey; image: string }> = [
  {
    key: "sunny_beach",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
  },
  {
    key: "sveti_vlas",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
  },
  {
    key: "burgas",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
  },
  {
    key: "ravda",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
  },
  {
    key: "kosharitsa",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
  },
  {
    key: "burgas_region",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
  },
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
  const hot = getHotProperties(3);

  return (
    <div>
      <section className="relative isolate min-h-[88vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2400&q=80"
          alt=""
          fill
          priority
          className="hero-kenburns object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-navy/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/70 via-transparent to-transparent" />

        <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-end px-4 pb-20 pt-32 md:px-6 md:pb-24">
          <p className="reveal-up font-display text-sm tracking-[0.35em] text-gold uppercase">
            LEV Estates
          </p>
          <h1 className="reveal-up-delay mt-4 max-w-4xl font-display text-[clamp(2.75rem,8vw,5.4rem)] leading-[0.95] text-white">
            {t("heroTitle")}
          </h1>
          <p className="reveal-up-delay-2 mt-5 max-w-lg text-lg text-white/80 md:text-xl">
            {t("heroSubtitle")}
          </p>
          <div className="reveal-up-delay-2 mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/properties" size="lg">
              {t("ctaCatalog")}
            </ButtonLink>
            <ButtonLink href="/selection" variant="secondary" size="lg">
              {t("ctaSelection")}
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
        <SectionHeading
          eyebrow={t("hotEyebrow")}
          title={t("hotTitle")}
          subtitle={t("hotSubtitle")}
          action={
            <Link
              href="/properties"
              className="text-sm font-semibold tracking-wide text-sea hover:text-sea-bright"
            >
              {tc("viewAll")} →
            </Link>
          }
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {hot.map((property, index) => (
            <div key={property.id} className={index === 0 ? "lg:col-span-1" : ""}>
              <PropertyCard property={property} featured={index === 0} />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-stone/40 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionHeading
            eyebrow={t("locationsEyebrow")}
            title={t("locationsTitle")}
            subtitle={t("locationsSubtitle")}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {LOCATIONS.map((loc) => (
              <Link
                key={loc.key}
                href={{ pathname: "/properties", query: { location: loc.key } }}
                className="group relative aspect-[5/3] overflow-hidden"
              >
                <Image
                  src={loc.image}
                  alt={tl(loc.key)}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width:1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-display text-2xl text-white md:text-3xl">{tl(loc.key)}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-gold/90 opacity-0 transition group-hover:opacity-100">
                    {tc("viewAll")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
        <SectionHeading eyebrow={t("whyEyebrow")} title={t("whyTitle")} />
        <div className="grid gap-10 border-t border-line pt-10 md:grid-cols-3 md:gap-12">
          {[
            ["why1Title", "why1Text"],
            ["why2Title", "why2Text"],
            ["why3Title", "why3Text"],
          ].map(([title, text], i) => (
            <article key={title}>
              <p className="font-display text-4xl text-gold/80">0{i + 1}</p>
              <h3 className="mt-4 font-display text-2xl text-navy">{t(title)}</h3>
              <p className="mt-3 text-ink-soft leading-relaxed">{t(text)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-navy">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-navy/75" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 md:px-6 md:py-28">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
            {t("selectionEyebrow")}
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl text-white md:text-5xl">
            {t("selectionTitle")}
          </h2>
          <p className="mt-4 max-w-xl text-white/70">{t("selectionText")}</p>
          <div className="mt-8">
            <ButtonLink href="/selection" variant="onDark" size="lg">
              {t("ctaSelection")}
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}

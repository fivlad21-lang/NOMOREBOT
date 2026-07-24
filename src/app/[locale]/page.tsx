import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getHotProperties } from "@/lib/api/properties";
import { PropertyCard } from "@/components/property/PropertyCard";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { MotionSection } from "@/components/motion/MotionSection";
import type { LocationKey } from "@/lib/types";

const LOCATIONS: Array<{ key: LocationKey; image: string }> = [
  {
    key: "sunny_beach",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=80",
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
      <section className="relative isolate mx-3 mt-3 min-h-[82vh] overflow-hidden rounded-[var(--radius-xl)] md:mx-4 md:min-h-[88vh]">
        <Image
          src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2400&q=80"
          alt=""
          fill
          priority
          className="hero-kenburns object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-navy/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/70 via-transparent to-transparent" />

        <div className="relative mx-auto flex min-h-[82vh] max-w-7xl flex-col justify-end px-5 pb-16 pt-28 md:min-h-[88vh] md:px-8 md:pb-24">
          <p className="reveal-up text-sm font-semibold tracking-[0.32em] text-gold uppercase">
            LEV Estates
          </p>
          <h1 className="reveal-up-delay mt-4 max-w-4xl font-display text-[clamp(2.8rem,7.5vw,5.2rem)] font-semibold leading-[0.95] text-white">
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
        <MotionSection>
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
        </MotionSection>
        <div className="grid gap-5 lg:grid-cols-3">
          {hot.map((property, index) => (
            <MotionSection key={property.id} delay={index * 90}>
              <PropertyCard property={property} featured={index === 0} />
            </MotionSection>
          ))}
        </div>
      </section>

      <section className="px-3 pb-6 md:px-4">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[var(--radius-xl)] bg-stone/50 px-4 py-16 md:px-8 md:py-24">
          <MotionSection>
            <SectionHeading
              eyebrow={t("locationsEyebrow")}
              title={t("locationsTitle")}
              subtitle={t("locationsSubtitle")}
            />
          </MotionSection>
          <div className="grid auto-rows-[220px] gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[260px]">
            {LOCATIONS.map((loc, i) => (
              <MotionSection
                key={loc.key}
                delay={i * 70}
                className={
                  i === 0
                    ? "sm:col-span-2 sm:row-span-2 sm:auto-rows-auto lg:min-h-[540px]"
                    : ""
                }
              >
                <Link
                  href={{ pathname: "/properties", query: { location: loc.key } }}
                  className="group relative block h-full min-h-[220px] overflow-hidden rounded-[var(--radius-lg)]"
                >
                  <Image
                    src={loc.image}
                    alt={tl(loc.key)}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width:1024px) 50vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent" />
                  <div className="absolute inset-x-3 bottom-3">
                    <GlassPanel
                      variant="dark"
                      radius="md"
                      className="flex items-center justify-between px-4 py-3 transition duration-300 group-hover:-translate-y-1"
                    >
                      <p className="font-display text-xl font-semibold text-white md:text-2xl">
                        {tl(loc.key)}
                      </p>
                      <span className="text-xs font-semibold tracking-[0.16em] text-gold uppercase opacity-80 transition group-hover:opacity-100">
                        →
                      </span>
                    </GlassPanel>
                  </div>
                </Link>
              </MotionSection>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
        <MotionSection>
          <SectionHeading eyebrow={t("whyEyebrow")} title={t("whyTitle")} />
        </MotionSection>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["why1Title", "why1Text"],
            ["why2Title", "why2Text"],
            ["why3Title", "why3Text"],
          ].map(([title, text], i) => (
            <MotionSection key={title} delay={i * 100}>
              <GlassPanel radius="xl" className="h-full p-6 md:p-8">
                <p className="font-display text-4xl font-semibold text-gold/80">0{i + 1}</p>
                <h3 className="mt-4 font-display text-2xl font-semibold text-navy">
                  {t(title)}
                </h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{t(text)}</p>
              </GlassPanel>
            </MotionSection>
          ))}
        </div>
      </section>

      <section className="px-3 pb-10 md:px-4 md:pb-16">
        <div className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-[var(--radius-xl)]">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-navy/70" />
          </div>
          <MotionSection className="relative px-6 py-20 md:px-12 md:py-28">
            <p className="text-[11px] font-semibold tracking-[0.22em] text-gold uppercase">
              {t("selectionEyebrow")}
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-4xl font-semibold text-white md:text-5xl">
              {t("selectionTitle")}
            </h2>
            <p className="mt-4 max-w-xl text-white/75">{t("selectionText")}</p>
            <div className="mt-8">
              <ButtonLink href="/selection" variant="onDark" size="lg">
                {t("ctaSelection")}
              </ButtonLink>
            </div>
          </MotionSection>
        </div>
      </section>
    </div>
  );
}

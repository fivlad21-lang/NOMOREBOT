"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { LocaleCode, Property } from "@/lib/types";
import {
  formatPrice,
  propertyAddress,
  propertyTitle,
  roomsLabel,
} from "@/lib/format";
import { GlassPanel } from "@/components/ui/GlassPanel";

type Props = {
  property: Property;
  variant?: "grid" | "list";
  featured?: boolean;
};

export function PropertyCard({ property, variant = "grid", featured }: Props) {
  const t = useTranslations();
  const locale = useLocale() as LocaleCode;
  const title = propertyTitle(property, locale);
  const address = propertyAddress(property, locale);

  if (variant === "list") {
    return (
      <Link
        href={`/properties/${property.slug}`}
        className="group grid overflow-hidden rounded-[var(--radius-lg)] border border-white/50 bg-white/55 shadow-[var(--shadow-soft)] backdrop-blur-md transition duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] sm:grid-cols-[240px_1fr]"
      >
        <div className="relative aspect-[4/3] overflow-hidden sm:aspect-auto sm:min-h-[160px]">
          <Image
            src={property.images[0]}
            alt={title}
            fill
            className="object-cover transition duration-700 group-hover:scale-105"
            sizes="240px"
          />
        </div>
        <div className="flex flex-col justify-center px-5 py-4">
          <div className="flex flex-wrap items-center gap-3">
            {property.hot && (
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-hot">
                {t("common.hot")}
              </span>
            )}
            <span className="text-[10px] uppercase tracking-[0.16em] text-ink-soft">
              {t(`types.${property.type}`)}
            </span>
          </div>
          <h3 className="mt-2 font-display text-2xl font-semibold text-navy">{title}</h3>
          <p className="mt-1 text-sm text-ink-soft">{address}</p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
            <p className="font-display text-2xl font-semibold text-sea">
              {formatPrice(property.priceEur, locale)}
            </p>
            <p className="text-sm text-ink-soft">
              {roomsLabel(property.rooms, (k) => t(`common.${k}`))} · {property.areaM2}{" "}
              {t("common.m2")}
            </p>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/properties/${property.slug}`}
      className="group relative block overflow-hidden rounded-[var(--radius-xl)] shadow-[var(--shadow-soft)] transition duration-500 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]"
    >
      <div
        className={`relative overflow-hidden ${
          featured ? "aspect-[4/5] md:aspect-[4/3]" : "aspect-[4/3]"
        }`}
      >
        <Image
          src={property.images[0]}
          alt={title}
          fill
          className="object-cover transition duration-700 group-hover:scale-[1.05]"
          sizes="(max-width:768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/65 via-transparent to-transparent" />
        {property.hot && (
          <span className="absolute left-4 top-4 rounded-full bg-white/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
            {t("common.hot")}
          </span>
        )}
        <div className="absolute inset-x-3 bottom-3 space-y-2">
          <GlassPanel variant="dark" radius="md" className="px-4 py-3">
            <p className="font-display text-2xl font-semibold text-white md:text-[1.7rem]">
              {formatPrice(property.priceEur, locale)}
            </p>
            <p className="mt-1 line-clamp-1 text-sm text-white/80">{title}</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-white/60">
              {t(`locations.${property.locationKey}`)} ·{" "}
              {roomsLabel(property.rooms, (k) => t(`common.${k}`))} · {property.areaM2}{" "}
              {t("common.m2")}
            </p>
          </GlassPanel>
        </div>
      </div>
    </Link>
  );
}

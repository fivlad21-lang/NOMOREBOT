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

type Props = {
  property: Property;
  variant?: "grid" | "list";
};

export function PropertyCard({ property, variant = "grid" }: Props) {
  const t = useTranslations();
  const locale = useLocale() as LocaleCode;
  const title = propertyTitle(property, locale);
  const address = propertyAddress(property, locale);

  if (variant === "list") {
    return (
      <Link
        href={`/properties/${property.slug}`}
        className="group grid gap-4 overflow-hidden rounded-2xl border border-line bg-white/80 p-3 transition hover:-translate-y-0.5 hover:shadow-lg sm:grid-cols-[220px_1fr]"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl sm:aspect-auto sm:min-h-[140px]">
          <Image
            src={property.images[0]}
            alt={title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="220px"
          />
        </div>
        <div className="flex flex-col justify-center py-1 pr-2">
          <div className="flex flex-wrap items-center gap-2">
            {property.hot && (
              <span className="rounded-full bg-hot/10 px-2 py-0.5 text-xs font-semibold text-hot">
                {t("common.hot")}
              </span>
            )}
            <span className="text-xs uppercase tracking-wide text-ink-soft">
              {t(`types.${property.type}`)}
            </span>
          </div>
          <h3 className="mt-1 font-[family-name:var(--font-display)] text-2xl text-navy">
            {title}
          </h3>
          <p className="mt-1 text-sm text-ink-soft">{address}</p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
            <p className="text-lg font-semibold text-sea">{formatPrice(property.priceEur, locale)}</p>
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
      className="group overflow-hidden rounded-2xl border border-line bg-white/80 transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.images[0]}
          alt={title}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(max-width:768px) 100vw, 33vw"
        />
        {property.hot && (
          <span className="absolute left-3 top-3 rounded-full bg-hot px-2.5 py-1 text-xs font-semibold text-white">
            {t("common.hot")}
          </span>
        )}
      </div>
      <div className="space-y-2 p-4">
        <p className="text-xs uppercase tracking-wide text-ink-soft">
          {t(`locations.${property.locationKey}`)} · {t(`types.${property.type}`)}
        </p>
        <h3 className="font-[family-name:var(--font-display)] text-xl leading-snug text-navy">
          {title}
        </h3>
        <p className="line-clamp-2 text-sm text-ink-soft">{address}</p>
        <div className="flex items-end justify-between gap-3 pt-1">
          <p className="text-lg font-semibold text-sea">{formatPrice(property.priceEur, locale)}</p>
          <p className="text-sm text-ink-soft">
            {roomsLabel(property.rooms, (k) => t(`common.${k}`))} · {property.areaM2}{" "}
            {t("common.m2")}
          </p>
        </div>
      </div>
    </Link>
  );
}

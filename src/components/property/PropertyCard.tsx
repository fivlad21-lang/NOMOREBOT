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
        className="group grid gap-0 overflow-hidden border border-line bg-white/70 transition duration-500 hover:border-sea/40 sm:grid-cols-[240px_1fr]"
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
          <h3 className="mt-2 font-display text-2xl text-navy md:text-[1.7rem]">{title}</h3>
          <p className="mt-1 text-sm text-ink-soft">{address}</p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
            <p className="font-display text-2xl text-sea">
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
      className="group block overflow-hidden border border-line bg-white/60 transition duration-500 hover:border-sea/35"
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
          className="object-cover transition duration-700 group-hover:scale-[1.04]"
          sizes="(max-width:768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent opacity-80" />
        {property.hot && (
          <span className="absolute left-4 top-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
            {t("common.hot")}
          </span>
        )}
        <p className="absolute bottom-4 left-4 font-display text-2xl text-white md:text-3xl">
          {formatPrice(property.priceEur, locale)}
        </p>
      </div>
      <div className="space-y-2 px-4 py-4">
        <p className="text-[10px] uppercase tracking-[0.16em] text-ink-soft">
          {t(`locations.${property.locationKey}`)} · {t(`types.${property.type}`)}
        </p>
        <h3 className="font-display text-xl leading-snug text-navy md:text-[1.35rem]">
          {title}
        </h3>
        <p className="line-clamp-1 text-sm text-ink-soft">{address}</p>
        <p className="pt-1 text-sm text-ink-soft">
          {roomsLabel(property.rooms, (k) => t(`common.${k}`))} · {property.areaM2}{" "}
          {t("common.m2")}
        </p>
      </div>
    </Link>
  );
}

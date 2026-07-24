import type { LocaleCode, Property } from "./types";

export function formatPrice(value: number, locale: LocaleCode): string {
  const tag = locale === "en" ? "en-GB" : locale === "bg" ? "bg-BG" : "ru-RU";
  return new Intl.NumberFormat(tag, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function propertyTitle(property: Property, locale: LocaleCode): string {
  return property.translations[locale].title;
}

export function propertyDescription(property: Property, locale: LocaleCode): string {
  return property.translations[locale].description;
}

export function propertyAddress(property: Property, locale: LocaleCode): string {
  return property.translations[locale].addressLabel;
}

export function roomsLabel(
  rooms: Property["rooms"],
  t: (key: string) => string,
): string {
  if (rooms === "studio") return t("studio");
  if (rooms === 0) return "—";
  if (typeof rooms === "number" && rooms >= 4) return "4+";
  return String(rooms);
}

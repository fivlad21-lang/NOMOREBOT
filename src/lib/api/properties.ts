import { properties } from "@/data/properties";
import type { LocaleCode, LocationKey, Property, PropertyType } from "@/lib/types";

export type PropertyFilters = {
  location?: LocationKey[];
  type?: PropertyType[];
  priceMin?: number;
  priceMax?: number;
  rooms?: Array<number | "studio">;
  hotOnly?: boolean;
  sort?: "newest" | "price_asc" | "price_desc" | "area_desc";
  query?: string;
};

export function getProperties(filters: PropertyFilters = {}): Property[] {
  let list = properties.filter((p) => p.status === "active");

  if (filters.location?.length) {
    list = list.filter((p) => filters.location!.includes(p.locationKey));
  }
  if (filters.type?.length) {
    list = list.filter((p) => filters.type!.includes(p.type));
  }
  if (filters.priceMin != null) {
    list = list.filter((p) => p.priceEur >= filters.priceMin!);
  }
  if (filters.priceMax != null) {
    list = list.filter((p) => p.priceEur <= filters.priceMax!);
  }
  if (filters.rooms?.length) {
    list = list.filter((p) => {
      return filters.rooms!.some((r) => {
        if (r === "studio") return p.rooms === "studio";
        if (r === 4) return typeof p.rooms === "number" && p.rooms >= 4;
        return p.rooms === r;
      });
    });
  }
  if (filters.hotOnly) {
    list = list.filter((p) => p.hot);
  }
  if (filters.query?.trim()) {
    const q = filters.query.trim().toLowerCase();
    list = list.filter((p) =>
      (["ru", "en", "bg"] as LocaleCode[]).some((locale) => {
        const t = p.translations[locale];
        return (
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.addressLabel.toLowerCase().includes(q)
        );
      }),
    );
  }

  const sort = filters.sort ?? "newest";
  list = [...list].sort((a, b) => {
    if (sort === "price_asc") return a.priceEur - b.priceEur;
    if (sort === "price_desc") return b.priceEur - a.priceEur;
    if (sort === "area_desc") return b.areaM2 - a.areaM2;
    return b.createdAt.localeCompare(a.createdAt);
  });

  return list;
}

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug && p.status === "active");
}

export function getHotProperties(limit = 6): Property[] {
  return properties.filter((p) => p.hot && p.status === "active").slice(0, limit);
}

export function getSimilarProperties(property: Property, limit = 3): Property[] {
  return properties
    .filter(
      (p) =>
        p.status === "active" &&
        p.id !== property.id &&
        p.locationKey === property.locationKey,
    )
    .slice(0, limit);
}

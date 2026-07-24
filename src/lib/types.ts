export type LocaleCode = "ru" | "en" | "bg";

export type PropertyType = "apartment" | "house" | "land" | "commercial";

export type LocationKey =
  | "sunny_beach"
  | "sveti_vlas"
  | "burgas"
  | "ravda"
  | "kosharitsa"
  | "burgas_region"
  | "other";

export type PropertyTranslation = {
  title: string;
  description: string;
  addressLabel: string;
};

export type Property = {
  id: string;
  slug: string;
  status: "active" | "sold" | "draft";
  hot: boolean;
  type: PropertyType;
  locationKey: LocationKey;
  priceEur: number;
  rooms: number | "studio";
  areaM2: number;
  floor?: number;
  floorsTotal?: number;
  coordinates: { lat: number; lng: number };
  images: string[];
  createdAt: string;
  translations: Record<LocaleCode, PropertyTranslation>;
};

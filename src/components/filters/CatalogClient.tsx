"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import type { LocationKey, Property, PropertyType } from "@/lib/types";
import type { PropertyFilters } from "@/lib/api/properties";
import { PropertyCard } from "@/components/property/PropertyCard";
import { PropertyMap } from "@/components/map/PropertyMap";

const LOCATIONS: LocationKey[] = [
  "sunny_beach",
  "sveti_vlas",
  "burgas",
  "ravda",
  "kosharitsa",
  "burgas_region",
];

const TYPES: PropertyType[] = ["apartment", "house", "land", "commercial"];
const ROOM_OPTIONS: Array<number | "studio"> = ["studio", 1, 2, 3, 4];

type ViewMode = "grid" | "list" | "map";

type Props = {
  initialProperties: Property[];
  initialView?: ViewMode;
  initialLocation?: LocationKey;
};

function applyFilters(list: Property[], filters: PropertyFilters): Property[] {
  let result = [...list];
  if (filters.location?.length) {
    result = result.filter((p) => filters.location!.includes(p.locationKey));
  }
  if (filters.type?.length) {
    result = result.filter((p) => filters.type!.includes(p.type));
  }
  if (filters.priceMin != null) {
    result = result.filter((p) => p.priceEur >= filters.priceMin!);
  }
  if (filters.priceMax != null) {
    result = result.filter((p) => p.priceEur <= filters.priceMax!);
  }
  if (filters.rooms?.length) {
    result = result.filter((p) =>
      filters.rooms!.some((r) => {
        if (r === "studio") return p.rooms === "studio";
        if (r === 4) return typeof p.rooms === "number" && p.rooms >= 4;
        return p.rooms === r;
      }),
    );
  }
  if (filters.hotOnly) result = result.filter((p) => p.hot);
  if (filters.query?.trim()) {
    const q = filters.query.trim().toLowerCase();
    result = result.filter((p) =>
      Object.values(p.translations).some(
        (tr) =>
          tr.title.toLowerCase().includes(q) ||
          tr.addressLabel.toLowerCase().includes(q),
      ),
    );
  }
  const sort = filters.sort ?? "newest";
  result.sort((a, b) => {
    if (sort === "price_asc") return a.priceEur - b.priceEur;
    if (sort === "price_desc") return b.priceEur - a.priceEur;
    if (sort === "area_desc") return b.areaM2 - a.areaM2;
    return b.createdAt.localeCompare(a.createdAt);
  });
  return result;
}

export function CatalogClient({
  initialProperties,
  initialView = "grid",
  initialLocation,
}: Props) {
  const t = useTranslations();
  const [view, setView] = useState<ViewMode>(initialView);
  const [visible, setVisible] = useState(12);
  const [filters, setFilters] = useState<PropertyFilters>({
    location: initialLocation ? [initialLocation] : undefined,
    sort: "newest",
  });

  const filtered = useMemo(
    () => applyFilters(initialProperties, filters),
    [initialProperties, filters],
  );
  const shown = filtered.slice(0, visible);

  function toggleInArray<T extends string | number>(
    key: "location" | "type" | "rooms",
    value: T,
  ) {
    setFilters((prev) => {
      const current = (prev[key] as T[] | undefined) ?? [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [key]: next.length ? next : undefined };
    });
    setVisible(12);
  }

  function reset() {
    setFilters({ sort: "newest" });
    setVisible(12);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <aside className="h-fit border border-line bg-white/70 p-5 lg:sticky lg:top-24">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-2xl text-navy">{t("catalog.filters")}</h2>
          <button
            type="button"
            onClick={reset}
            className="text-xs font-semibold uppercase tracking-[0.14em] text-sea hover:text-sea-bright"
          >
            {t("common.reset")}
          </button>
        </div>

        <label className="mb-5 block">
          <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
            {t("catalog.searchPlaceholder")}
          </span>
          <input
            value={filters.query ?? ""}
            onChange={(e) => {
              setFilters((p) => ({ ...p, query: e.target.value }));
              setVisible(12);
            }}
            className="w-full border border-line bg-foam px-3 py-2.5 text-sm outline-none transition focus:border-sea"
            placeholder={t("catalog.searchPlaceholder")}
          />
        </label>

        <FilterGroup label={t("catalog.location")}>
          {LOCATIONS.map((loc) => (
            <Chip
              key={loc}
              active={Boolean(filters.location?.includes(loc))}
              onClick={() => toggleInArray("location", loc)}
              label={t(`locations.${loc}`)}
            />
          ))}
        </FilterGroup>

        <FilterGroup label={t("catalog.type")}>
          {TYPES.map((type) => (
            <Chip
              key={type}
              active={Boolean(filters.type?.includes(type))}
              onClick={() => toggleInArray("type", type)}
              label={t(`types.${type}`)}
            />
          ))}
        </FilterGroup>

        <FilterGroup label={t("catalog.rooms")}>
          {ROOM_OPTIONS.map((room) => (
            <Chip
              key={String(room)}
              active={Boolean(filters.rooms?.includes(room))}
              onClick={() => toggleInArray("rooms", room)}
              label={room === "studio" ? t("common.studio") : room === 4 ? "4+" : String(room)}
            />
          ))}
        </FilterGroup>

        <div className="mb-5 grid grid-cols-2 gap-2">
          <label className="text-sm">
            <span className="mb-1 block text-[10px] uppercase tracking-[0.14em] text-ink-soft">
              {t("common.from")}
            </span>
            <input
              type="number"
              value={filters.priceMin ?? ""}
              onChange={(e) => {
                setFilters((p) => ({
                  ...p,
                  priceMin: e.target.value ? Number(e.target.value) : undefined,
                }));
                setVisible(12);
              }}
              className="w-full border border-line bg-foam px-3 py-2 outline-none focus:border-sea"
            />
          </label>
          <label className="text-sm">
            <span className="mb-1 block text-[10px] uppercase tracking-[0.14em] text-ink-soft">
              {t("common.to")}
            </span>
            <input
              type="number"
              value={filters.priceMax ?? ""}
              onChange={(e) => {
                setFilters((p) => ({
                  ...p,
                  priceMax: e.target.value ? Number(e.target.value) : undefined,
                }));
                setVisible(12);
              }}
              className="w-full border border-line bg-foam px-3 py-2 outline-none focus:border-sea"
            />
          </label>
        </div>

        <label className="mb-5 flex items-center gap-2 text-sm text-ink-soft">
          <input
            type="checkbox"
            checked={Boolean(filters.hotOnly)}
            onChange={(e) => {
              setFilters((p) => ({ ...p, hotOnly: e.target.checked || undefined }));
              setVisible(12);
            }}
            className="size-4 accent-sea"
          />
          {t("catalog.hotOnly")}
        </label>

        <label className="block text-sm">
          <span className="mb-1 block text-[10px] uppercase tracking-[0.14em] text-ink-soft">
            {t("catalog.sort")}
          </span>
          <select
            value={filters.sort ?? "newest"}
            onChange={(e) =>
              setFilters((p) => ({
                ...p,
                sort: e.target.value as PropertyFilters["sort"],
              }))
            }
            className="w-full border border-line bg-foam px-3 py-2 outline-none focus:border-sea"
          >
            <option value="newest">{t("catalog.sortNewest")}</option>
            <option value="price_asc">{t("catalog.sortPriceAsc")}</option>
            <option value="price_desc">{t("catalog.sortPriceDesc")}</option>
            <option value="area_desc">{t("catalog.sortAreaDesc")}</option>
          </select>
        </label>
      </aside>

      <section>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
          <p className="text-sm tracking-wide text-ink-soft">
            {t("catalog.results", { count: filtered.length })}
          </p>
          <div className="flex border border-line bg-white/80 p-1 text-xs font-semibold uppercase tracking-[0.12em]">
            {(
              [
                ["grid", t("catalog.viewGrid")],
                ["list", t("catalog.viewList")],
                ["map", t("catalog.viewMap")],
              ] as const
            ).map(([mode, label]) => (
              <button
                key={mode}
                type="button"
                onClick={() => setView(mode)}
                className={`px-3 py-2 transition ${
                  view === mode ? "bg-navy text-foam" : "text-ink-soft hover:text-navy"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="border border-dashed border-line bg-white/50 px-6 py-20 text-center">
            <p className="font-display text-3xl text-navy">{t("common.noResults")}</p>
            <button
              type="button"
              onClick={reset}
              className="mt-5 border border-navy px-5 py-2 text-sm font-semibold uppercase tracking-wide text-navy hover:bg-navy hover:text-white"
            >
              {t("common.resetFilters")}
            </button>
          </div>
        ) : view === "map" ? (
          <div className="grid h-[72vh] min-h-[520px] overflow-hidden border border-line lg:grid-cols-[1.15fr_0.85fr]">
            <div className="min-h-[320px]">
              <PropertyMap properties={filtered} />
            </div>
            <div className="hidden overflow-y-auto border-l border-line bg-white/70 lg:block">
              <div className="grid gap-0">
                {filtered.slice(0, 20).map((property) => (
                  <PropertyCard key={property.id} property={property} variant="list" />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            <div
              className={
                view === "grid"
                  ? "grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
                  : "grid gap-3"
              }
            >
              {shown.map((property) => (
                <PropertyCard key={property.id} property={property} variant={view} />
              ))}
            </div>
            {visible < filtered.length && (
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={() => setVisible((v) => v + 12)}
                  className="border border-line bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-navy transition hover:border-sea hover:text-sea"
                >
                  {t("common.showMore")}
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 text-xs transition ${
        active
          ? "bg-navy text-white"
          : "border border-line bg-foam text-ink-soft hover:border-sea"
      }`}
    >
      {label}
    </button>
  );
}

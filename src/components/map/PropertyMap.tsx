"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { LocaleCode, Property } from "@/lib/types";
import { formatPrice, propertyTitle } from "@/lib/format";
import { Link } from "@/i18n/navigation";

type Props = {
  properties: Property[];
};

export function PropertyMap({ properties }: Props) {
  const t = useTranslations();
  const locale = useLocale() as LocaleCode;
  const [mounted, setMounted] = useState(false);
  const [MapParts, setMapParts] = useState<{
    MapContainer: typeof import("react-leaflet").MapContainer;
    TileLayer: typeof import("react-leaflet").TileLayer;
    Marker: typeof import("react-leaflet").Marker;
    Popup: typeof import("react-leaflet").Popup;
    L: typeof import("leaflet");
  } | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const leaflet = await import("leaflet");
      const rl = await import("react-leaflet");
      // Fix default marker icons in bundlers
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (leaflet.Icon.Default.prototype as any)._getIconUrl;
      leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });
      if (!cancelled) {
        setMapParts({
          MapContainer: rl.MapContainer,
          TileLayer: rl.TileLayer,
          Marker: rl.Marker,
          Popup: rl.Popup,
          L: leaflet,
        });
        setMounted(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const center = useMemo(() => {
    if (!properties.length) return { lat: 42.65, lng: 27.7 };
    const lat =
      properties.reduce((sum, p) => sum + p.coordinates.lat, 0) / properties.length;
    const lng =
      properties.reduce((sum, p) => sum + p.coordinates.lng, 0) / properties.length;
    return { lat, lng };
  }, [properties]);

  if (!mounted || !MapParts) {
    return (
      <div className="property-map grid place-items-center bg-sand-deep text-ink-soft">
        Map…
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, Popup } = MapParts;

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={10}
      className="property-map"
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {properties.map((property) => (
        <Marker
          key={property.id}
          position={[property.coordinates.lat, property.coordinates.lng]}
        >
          <Popup>
            <div className="min-w-[180px] space-y-1">
              <p className="font-semibold text-navy">
                {propertyTitle(property, locale)}
              </p>
              <p className="text-sea">{formatPrice(property.priceEur, locale)}</p>
              <Link
                href={`/properties/${property.slug}`}
                className="inline-block text-sm text-sea underline"
              >
                {t("common.details")}
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

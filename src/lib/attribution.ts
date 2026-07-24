export const ATTRIBUTION_STORAGE_KEY = "nomore_attribution_v1";

export type Attribution = {
  from?: string | null;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  utmContent?: string | null;
  utmTerm?: string | null;
};

function clean(value: string | null | undefined): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, 120);
}

export function parseAttributionFromSearchParams(
  params: URLSearchParams | Record<string, string | string[] | undefined>,
): Attribution {
  const get = (key: string): string | null => {
    if (params instanceof URLSearchParams) {
      return clean(params.get(key));
    }
    const raw = params[key];
    if (Array.isArray(raw)) return clean(raw[0]);
    return clean(raw);
  };

  return {
    from: get("from"),
    utmSource: get("utm_source"),
    utmMedium: get("utm_medium"),
    utmCampaign: get("utm_campaign"),
    utmContent: get("utm_content"),
    utmTerm: get("utm_term"),
  };
}

export function hasAttribution(a: Attribution | null | undefined): boolean {
  if (!a) return false;
  return Boolean(
    a.from ||
      a.utmSource ||
      a.utmMedium ||
      a.utmCampaign ||
      a.utmContent ||
      a.utmTerm,
  );
}

/** Prefer incoming non-empty fields; keep previous for missing ones. */
export function mergeAttribution(
  previous: Attribution | null | undefined,
  incoming: Attribution,
): Attribution {
  const base = previous ?? {};
  return {
    from: incoming.from ?? base.from ?? null,
    utmSource: incoming.utmSource ?? base.utmSource ?? null,
    utmMedium: incoming.utmMedium ?? base.utmMedium ?? null,
    utmCampaign: incoming.utmCampaign ?? base.utmCampaign ?? null,
    utmContent: incoming.utmContent ?? base.utmContent ?? null,
    utmTerm: incoming.utmTerm ?? base.utmTerm ?? null,
  };
}

export function readStoredAttribution(): Attribution | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Attribution;
  } catch {
    return null;
  }
}

export function writeStoredAttribution(attribution: Attribution): void {
  if (typeof window === "undefined") return;
  if (!hasAttribution(attribution)) return;
  try {
    window.sessionStorage.setItem(
      ATTRIBUTION_STORAGE_KEY,
      JSON.stringify(attribution),
    );
  } catch {
    // ignore quota / private mode
  }
}

export function resolveAttribution(
  pageParams?: Attribution | null,
): Attribution {
  const stored = readStoredAttribution();
  if (pageParams && hasAttribution(pageParams)) {
    const merged = mergeAttribution(stored, pageParams);
    writeStoredAttribution(merged);
    return merged;
  }
  return stored ?? {};
}

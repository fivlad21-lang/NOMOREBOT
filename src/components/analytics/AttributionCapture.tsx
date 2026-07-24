"use client";

import { useEffect } from "react";
import {
  hasAttribution,
  mergeAttribution,
  parseAttributionFromSearchParams,
  readStoredAttribution,
  writeStoredAttribution,
} from "@/lib/attribution";

/** Persist `from` + UTM from the current URL into sessionStorage. */
export function AttributionCapture() {
  useEffect(() => {
    const incoming = parseAttributionFromSearchParams(
      new URLSearchParams(window.location.search),
    );
    if (!hasAttribution(incoming)) return;
    const merged = mergeAttribution(readStoredAttribution(), incoming);
    writeStoredAttribution(merged);
  }, []);

  return null;
}

"use client";

import { useEffect } from "react";
import { trackViewContent } from "@/lib/analytics";

export function ViewContentTracker() {
  useEffect(() => {
    trackViewContent();
  }, []);

  return null;
}

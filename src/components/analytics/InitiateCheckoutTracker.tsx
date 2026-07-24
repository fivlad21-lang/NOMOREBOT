"use client";

import { useEffect } from "react";
import type { PlanId } from "@/data/course";
import { trackInitiateCheckout } from "@/lib/analytics";

export function InitiateCheckoutTracker({ planId }: { planId: PlanId }) {
  useEffect(() => {
    trackInitiateCheckout(planId);
  }, [planId]);

  return null;
}

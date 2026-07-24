import { ThanksClient } from "@/components/landing/ThanksClient";
import { getPlan, type PlanId } from "@/data/course";

type Props = {
  searchParams: Promise<{ plan?: string; order?: string }>;
};

const PLAN_IDS: PlanId[] = ["start", "community", "mentor"];

function isPlanId(value: string | undefined): value is PlanId {
  return !!value && PLAN_IDS.includes(value as PlanId);
}

export default async function ThanksPage({ searchParams }: Props) {
  const params = await searchParams;
  const fromOrder = params.order?.startsWith("NL-")
    ? params.order.split("-")[1]
    : undefined;
  const planId = isPlanId(params.plan)
    ? params.plan
    : isPlanId(fromOrder)
      ? fromOrder
      : "community";

  // ensure plan exists
  getPlan(planId);

  return <ThanksClient planId={planId} order={params.order} />;
}

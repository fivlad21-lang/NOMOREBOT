import { OrbBackground } from "@/components/landing/OrbBackground";
import { ThanksClient } from "@/components/landing/ThanksClient";
import { getPlan, type PlanId } from "@/data/course";
import { mapPaymentUiStatus } from "@/lib/wayforpay";

type Props = {
  searchParams: Promise<{
    plan?: string;
    order?: string;
    wfpStatus?: string;
    reason?: string;
  }>;
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

  getPlan(planId);

  const hint = params.wfpStatus
    ? mapPaymentUiStatus(params.wfpStatus)
    : undefined;

  return (
    <div className="course-theme course-shell min-h-screen">
      <OrbBackground />
      <div className="course-content">
        <ThanksClient
          planId={planId}
          order={params.order}
          initialStatus={hint}
          initialReason={params.reason || params.wfpStatus || null}
        />
      </div>
    </div>
  );
}

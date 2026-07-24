import { ViewContentTracker } from "@/components/analytics/ViewContentTracker";
import { LandingHeader } from "./LandingHeader";
import { Hero } from "./Hero";
import { ProofStrip } from "./ProofStrip";
import { PainSolutions } from "./PainSolutions";
import { ProofBlock } from "./ProofBlock";
import { Program } from "./Program";
import { Expert } from "./Expert";
import { Testimonials } from "./Testimonials";
import { FAQ } from "./FAQ";
import { Pricing } from "./Pricing";
import { FinalCTA } from "./FinalCTA";
import { LandingFooter } from "./LandingFooter";
import { MobileStickyCTA } from "./MobileStickyCTA";
import { OrbBackground } from "./OrbBackground";
import { SideNav } from "./SideNav";

type Props = {
  subtitle: string;
};

/** Target funnel order (E7): Hero → pain → proof → program → expert → reviews → pricing → FAQ → CTA */
export function CourseLanding({ subtitle }: Props) {
  return (
    <div className="course-theme course-shell">
      <ViewContentTracker />
      <OrbBackground />
      <div className="course-content">
        <LandingHeader />
        <SideNav />
        <main>
          <Hero subtitle={subtitle} />
          <ProofStrip />
          <PainSolutions />
          <ProofBlock />
          <Program />
          <Expert />
          <Testimonials />
          <Pricing />
          <FAQ />
          <FinalCTA />
        </main>
        <LandingFooter />
        <MobileStickyCTA />
      </div>
    </div>
  );
}

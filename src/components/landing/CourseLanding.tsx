import { LandingHeader } from "./LandingHeader";
import { Hero } from "./Hero";
import { ProofStrip } from "./ProofStrip";
import { PainSolutions } from "./PainSolutions";
import { ProofBlock } from "./ProofBlock";
import { Audience } from "./Audience";
import { Program } from "./Program";
import { HowItWorks } from "./HowItWorks";
import { Expert } from "./Expert";
import { Testimonials } from "./Testimonials";
import { FAQ } from "./FAQ";
import { Pricing } from "./Pricing";
import { FinalCTA } from "./FinalCTA";
import { LandingFooter } from "./LandingFooter";
import { MobileStickyCTA } from "./MobileStickyCTA";
import { OrbBackground } from "./OrbBackground";

type Props = {
  subtitle: string;
};

export function CourseLanding({ subtitle }: Props) {
  return (
    <div className="course-theme course-shell">
      <OrbBackground />
      <div className="course-content">
        <LandingHeader />
        <main>
          <Hero subtitle={subtitle} />
          <ProofStrip />
          <PainSolutions />
          <ProofBlock />
          <Audience />
          <Program />
          <HowItWorks />
          <Expert />
          <Testimonials />
          <FAQ />
          <Pricing />
          <FinalCTA />
        </main>
        <LandingFooter />
        <MobileStickyCTA />
      </div>
    </div>
  );
}

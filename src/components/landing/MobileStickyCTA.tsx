import { lowestPlanPriceUah } from "@/data/course";
import { CourseButton } from "./CourseButton";

export function MobileStickyCTA() {
  const fromUah = lowestPlanPriceUah();
  return (
    <div className="course-sticky-cta md:hidden">
      <CourseButton href="#pricing" className="w-full">
        Обрати тариф · від ₴{fromUah.toLocaleString("uk-UA")}
      </CourseButton>
    </div>
  );
}

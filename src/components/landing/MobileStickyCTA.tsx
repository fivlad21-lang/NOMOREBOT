import { CourseButton } from "./CourseButton";

export function MobileStickyCTA() {
  return (
    <div className="course-sticky-cta md:hidden">
      <CourseButton href="#pricing" className="w-full">
        Обрати тариф
      </CourseButton>
    </div>
  );
}

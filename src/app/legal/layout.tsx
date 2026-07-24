import Link from "next/link";
import { BrandMark } from "@/components/landing/BrandMark";
import { OrbBackground } from "@/components/landing/OrbBackground";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="course-theme course-shell min-h-screen">
      <OrbBackground />
      <div className="course-content">
        <header className="course-container flex items-center justify-between gap-4 py-6">
          <BrandMark size="sm" href="/" />
          <Link
            href="/#pricing"
            className="text-sm text-[var(--text-muted)] hover:text-white"
          >
            До тарифів
          </Link>
        </header>
        <main className="course-container pb-20 pt-4">{children}</main>
      </div>
    </div>
  );
}

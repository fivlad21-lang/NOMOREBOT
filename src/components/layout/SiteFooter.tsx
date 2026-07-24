import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function SiteFooter() {
  const t = useTranslations("footer");
  const tc = useTranslations("common");
  const tn = useTranslations("nav");

  return (
    <footer className="mt-16 border-t border-line bg-navy text-foam">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-3 md:px-6">
        <div>
          <p className="font-[family-name:var(--font-display)] text-2xl">LEV Estates</p>
          <p className="mt-2 max-w-sm text-sm text-white/70">{t("tagline")}</p>
          <p className="mt-4 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs tracking-wide">
            {tc("demoBadge")}
          </p>
        </div>
        <div className="text-sm text-white/80">
          <p>
            <a href={`tel:${tc("phone").replace(/\s/g, "")}`}>{tc("phone")}</a>
          </p>
          <p className="mt-2">
            <a href={`mailto:${tc("email")}`}>{tc("email")}</a>
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-white/80">
          <Link href="/properties">{tn("properties")}</Link>
          <Link href="/about">{tn("about")}</Link>
          <Link href="/contacts">{tn("contacts")}</Link>
          <Link href="/selection">{tn("selection")}</Link>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/50">
        {t("rights")}
      </div>
    </footer>
  );
}

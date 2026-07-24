import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LevLogo } from "@/components/brand/LevLogo";

export function SiteFooter() {
  const t = useTranslations("footer");
  const tc = useTranslations("common");
  const tn = useTranslations("nav");

  return (
    <footer className="mt-16 px-3 pb-3 md:px-4 md:pb-4">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[var(--radius-xl)] bg-navy text-foam">
        <div className="grid gap-12 px-6 py-14 md:grid-cols-12 md:px-10">
          <div className="md:col-span-5">
            <LevLogo variant="light" size="sm" withWordmark />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">{t("tagline")}</p>
          </div>
          <div className="md:col-span-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
              {tn("contacts")}
            </p>
            <div className="mt-4 space-y-2 text-sm text-white/80">
              <p>
                <a href={`tel:${tc("phone").replace(/\s/g, "")}`} className="hover:text-gold">
                  {tc("phone")}
                </a>
              </p>
              <p>
                <a href={`mailto:${tc("email")}`} className="hover:text-gold">
                  {tc("email")}
                </a>
              </p>
            </div>
          </div>
          <div className="md:col-span-4 md:justify-self-end">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">Menu</p>
            <div className="mt-4 flex flex-col gap-2 text-sm text-white/80">
              <Link href="/properties" className="hover:text-gold">
                {tn("properties")}
              </Link>
              <Link href="/about" className="hover:text-gold">
                {tn("about")}
              </Link>
              <Link href="/contacts" className="hover:text-gold">
                {tn("contacts")}
              </Link>
              <Link href="/selection" className="hover:text-gold">
                {tn("selection")}
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 px-6 py-5 text-center text-[11px] tracking-wide text-white/40">
          {t("rights")}
        </div>
      </div>
    </footer>
  );
}

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function SiteFooter() {
  const t = useTranslations("footer");
  const tc = useTranslations("common");
  const tn = useTranslations("nav");

  return (
    <footer className="mt-20 bg-navy text-foam">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:grid-cols-12 md:px-6">
        <div className="md:col-span-5">
          <p className="font-display text-3xl tracking-wide">
            LEV <span className="text-gold">Estates</span>
          </p>
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
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
            Menu
          </p>
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
      <div className="border-t border-white/10 px-4 py-5 text-center text-[11px] tracking-wide text-white/40">
        {t("rights")}
      </div>
    </footer>
  );
}

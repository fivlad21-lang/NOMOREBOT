import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("common");
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-3xl flex-col items-start justify-center px-4 py-24">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sea">404</p>
      <h1 className="mt-3 font-display text-5xl text-navy">{t("noResults")}</h1>
      <Link
        href="/properties"
        className="mt-8 border border-navy px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-navy transition hover:bg-navy hover:text-white"
      >
        {t("backToCatalog")}
      </Link>
    </div>
  );
}

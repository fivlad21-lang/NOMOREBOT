import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("common");
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-3xl flex-col items-start justify-center px-4 py-20">
      <h1 className="font-[family-name:var(--font-display)] text-5xl text-navy">404</h1>
      <p className="mt-3 text-ink-soft">{t("noResults")}</p>
      <Link href="/properties" className="mt-6 rounded-full bg-sea px-5 py-2 text-sm font-semibold text-white">
        {t("backToCatalog")}
      </Link>
    </div>
  );
}

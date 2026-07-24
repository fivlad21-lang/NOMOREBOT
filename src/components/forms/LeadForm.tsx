"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import type { LocationKey, PropertyType } from "@/lib/types";
import { Button } from "@/components/ui/Button";

type Props = {
  propertyId?: string;
  propertyTitle?: string;
  compact?: boolean;
};

export function LeadForm({ propertyId, propertyTitle, compact }: Props) {
  const t = useTranslations("form");
  const tl = useTranslations("locations");
  const tt = useTranslations("types");
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    const consent = fd.get("consent") === "on";
    const nextErrors: Record<string, string> = {};
    if (!name) nextErrors.name = t("required");
    if (!phone) nextErrors.phone = t("required");
    if (!consent) nextErrors.consent = t("required");
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const payload = {
      name,
      phone,
      email: String(fd.get("email") ?? ""),
      budget: String(fd.get("budget") ?? ""),
      location: String(fd.get("location") ?? ""),
      type: String(fd.get("type") ?? ""),
      comment: String(fd.get("comment") ?? ""),
      propertyId,
      propertyTitle,
      createdAt: new Date().toISOString(),
    };

    try {
      const prev = JSON.parse(localStorage.getItem("lev-demo-leads") ?? "[]");
      prev.push(payload);
      localStorage.setItem("lev-demo-leads", JSON.stringify(prev));
    } catch {
      // ignore
    }
    setDone(true);
    e.currentTarget.reset();
  }

  if (done) {
    return (
      <div className="border border-gold/40 bg-gold/10 px-5 py-8 text-center">
        <p className="font-display text-2xl text-navy">{t("successTitle")}</p>
        <p className="mt-2 text-sm text-ink-soft">{t("success")}</p>
      </div>
    );
  }

  const locations: LocationKey[] = [
    "sunny_beach",
    "sveti_vlas",
    "burgas",
    "ravda",
    "kosharitsa",
    "burgas_region",
  ];
  const types: PropertyType[] = ["apartment", "house", "land", "commercial"];

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {propertyTitle && (
        <p className="border-b border-line pb-3 text-sm text-ink-soft">
          <span className="font-medium text-navy">{propertyTitle}</span>
        </p>
      )}
      <Field label={t("name")} error={errors.name}>
        <input name="name" className={inputClass} />
      </Field>
      <Field label={t("phone")} error={errors.phone}>
        <input name="phone" className={inputClass} />
      </Field>
      {!compact && (
        <>
          <Field label={t("email")}>
            <input name="email" type="email" className={inputClass} />
          </Field>
          <Field label={t("budget")}>
            <input name="budget" type="number" className={inputClass} />
          </Field>
          <Field label={t("location")}>
            <select name="location" className={inputClass} defaultValue="">
              <option value="">—</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {tl(loc)}
                </option>
              ))}
            </select>
          </Field>
          <Field label={t("type")}>
            <select name="type" className={inputClass} defaultValue="">
              <option value="">—</option>
              {types.map((type) => (
                <option key={type} value={type}>
                  {tt(type)}
                </option>
              ))}
            </select>
          </Field>
        </>
      )}
      <Field label={t("comment")}>
        <textarea name="comment" rows={3} className={inputClass} />
      </Field>
      <label className="flex items-start gap-2 text-sm text-ink-soft">
        <input name="consent" type="checkbox" className="mt-1 size-4 accent-sea" />
        <span>
          {t("consent")}
          {errors.consent && <span className="mt-1 block text-hot">{errors.consent}</span>}
        </span>
      </label>
      <Button type="submit" className="w-full">
        {t("submit")}
      </Button>
    </form>
  );
}

const inputClass =
  "w-full border border-line bg-foam px-3 py-2.5 text-sm outline-none transition focus:border-sea";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-hot">{error}</span>}
    </label>
  );
}

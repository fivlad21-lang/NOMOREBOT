"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import type { LocationKey, PropertyType } from "@/lib/types";
import { Button } from "@/components/ui/Button";

type Props = {
  propertyId?: string;
  propertyTitle?: string;
  compact?: boolean;
  tone?: "light" | "onDark";
};

export function LeadForm({ propertyId, propertyTitle, compact, tone = "light" }: Props) {
  const t = useTranslations("form");
  const tl = useTranslations("locations");
  const tt = useTranslations("types");
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const onDark = tone === "onDark";
  const labelClass = onDark
    ? "mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-white/65"
    : "mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-soft";
  const fieldClass = onDark
    ? "w-full rounded-[12px] border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-gold"
    : "w-full rounded-[12px] border border-line bg-foam px-3 py-2.5 text-sm outline-none transition focus:border-sea";
  const consentClass = onDark ? "text-sm text-white/70" : "text-sm text-ink-soft";
  const titleClass = onDark ? "font-medium text-foam" : "font-medium text-navy";

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
      <div
        className={`rounded-[16px] px-5 py-8 text-center ${
          onDark ? "border border-gold/40 bg-gold/15" : "border border-gold/40 bg-gold/10"
        }`}
      >
        <p className={`font-display text-2xl ${onDark ? "text-foam" : "text-navy"}`}>
          {t("successTitle")}
        </p>
        <p className={`mt-2 text-sm ${onDark ? "text-white/70" : "text-ink-soft"}`}>
          {t("success")}
        </p>
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
        <p
          className={`border-b pb-3 text-sm ${
            onDark ? "border-white/15 text-white/70" : "border-line text-ink-soft"
          }`}
        >
          <span className={titleClass}>{propertyTitle}</span>
        </p>
      )}
      <Field label={t("name")} error={errors.name} labelClass={labelClass}>
        <input name="name" className={fieldClass} />
      </Field>
      <Field label={t("phone")} error={errors.phone} labelClass={labelClass}>
        <input name="phone" className={fieldClass} />
      </Field>
      {!compact && (
        <>
          <Field label={t("email")} labelClass={labelClass}>
            <input name="email" type="email" className={fieldClass} />
          </Field>
          <Field label={t("budget")} labelClass={labelClass}>
            <input name="budget" type="number" className={fieldClass} />
          </Field>
          <Field label={t("location")} labelClass={labelClass}>
            <select name="location" className={fieldClass} defaultValue="">
              <option value="">—</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {tl(loc)}
                </option>
              ))}
            </select>
          </Field>
          <Field label={t("type")} labelClass={labelClass}>
            <select name="type" className={fieldClass} defaultValue="">
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
      <Field label={t("comment")} labelClass={labelClass}>
        <textarea name="comment" rows={3} className={fieldClass} />
      </Field>
      <label className={`flex items-start gap-2 ${consentClass}`}>
        <input name="consent" type="checkbox" className="mt-1 size-4 accent-gold" />
        <span>
          {t("consent")}
          {errors.consent && <span className="mt-1 block text-hot">{errors.consent}</span>}
        </span>
      </label>
      <Button type="submit" className="w-full" variant={onDark ? "onDark" : "primary"}>
        {t("submit")}
      </Button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
  labelClass,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  labelClass: string;
}) {
  return (
    <label className="block text-sm">
      <span className={labelClass}>{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-hot">{error}</span>}
    </label>
  );
}

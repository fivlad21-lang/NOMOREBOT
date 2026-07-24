"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import type { LocationKey, PropertyType } from "@/lib/types";

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
      // ignore storage errors in demo
    }
    setDone(true);
    e.currentTarget.reset();
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-sea/30 bg-sea/10 px-5 py-6 text-sea">
        {t("success")}
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
    <form onSubmit={onSubmit} className="space-y-3 rounded-2xl border border-line bg-white/80 p-5">
      {propertyTitle && (
        <p className="text-sm text-ink-soft">
          <span className="font-semibold text-navy">{propertyTitle}</span>
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
      <button
        type="submit"
        className="w-full rounded-full bg-sea px-4 py-3 text-sm font-semibold text-white transition hover:bg-sea-bright"
      >
        {t("submit")}
      </button>
    </form>
  );
}

const inputClass =
  "w-full rounded-xl border border-line bg-foam px-3 py-2 text-sm outline-none ring-sea focus:ring-2";

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
      <span className="mb-1 block text-ink-soft">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-hot">{error}</span>}
    </label>
  );
}

import Link from "next/link";
import { BRAND } from "@/data/course";

type Size = "hero" | "lg" | "md" | "sm";

const sizeClass: Record<Size, { base: string; tld: string }> = {
  hero: {
    base: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl",
    tld: "text-[0.38em] sm:text-[0.36em]",
  },
  lg: {
    base: "text-2xl md:text-3xl",
    tld: "text-[0.42em]",
  },
  md: {
    base: "text-xl",
    tld: "text-[0.45em]",
  },
  sm: {
    base: "text-lg md:text-xl",
    tld: "text-[0.48em]",
  },
};

type Props = {
  size?: Size;
  href?: string | null;
  className?: string;
  as?: "link" | "span";
  /** Domain suffix .wtf — ONLY for top header logo. */
  withTld?: boolean;
};

/**
 * Brand wordmark. Pass `withTld` only in the site header.
 */
export function BrandMark({
  size = "md",
  href = "/#top",
  className = "",
  as,
  withTld = false,
}: Props) {
  const sizes = sizeClass[size];
  const content = (
    <span
      className={`course-display inline-flex items-start tracking-tight text-white ${sizes.base} ${className}`}
    >
      <span>{BRAND}</span>
      {withTld ? (
        <span
          aria-hidden="true"
          className={`ml-[0.14em] translate-y-[0.18em] font-semibold leading-none text-[var(--accent-cyan)] ${sizes.tld}`}
        >
          .wtf
        </span>
      ) : null}
    </span>
  );

  const useLink = as === "link" || (as !== "span" && href);

  if (useLink && href) {
    return (
      <Link href={href} className="inline-flex no-underline">
        {content}
      </Link>
    );
  }

  return content;
}

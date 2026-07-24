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
};

/**
 * Brand mark: NOMORE LAB + small .wtf (domain nomorelab.wtf).
 */
export function BrandMark({
  size = "md",
  href = "/#top",
  className = "",
  as,
}: Props) {
  const sizes = sizeClass[size];
  const content = (
    <span
      className={`course-display inline-flex items-start tracking-tight text-white ${sizes.base} ${className}`}
    >
      <span>{BRAND}</span>
      <span
        className={`ml-[0.12em] translate-y-[0.12em] font-medium leading-none text-white/55 ${sizes.tld}`}
        aria-hidden={false}
      >
        .wtf
      </span>
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

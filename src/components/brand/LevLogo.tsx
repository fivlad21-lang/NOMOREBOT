import { Link } from "@/i18n/navigation";

type Variant = "color" | "light" | "mono";
type Size = "sm" | "md" | "lg";

type Props = {
  variant?: Variant;
  withWordmark?: boolean;
  size?: Size;
  className?: string;
  href?: string;
};

const sizes: Record<Size, string> = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
};

function Mark({ variant }: { variant: Variant }) {
  if (variant === "light") {
    return (
      <svg viewBox="0 0 64 80" fill="none" aria-hidden="true" className="h-full w-full">
        <path
          d="M32 2C18.193 2 7 13.193 7 27c0 16.5 18.2 36.8 23.1 41.9a2.7 2.7 0 0 0 3.8 0C38.8 63.8 57 43.5 57 27 57 13.193 45.807 2 32 2Z"
          fill="#1A3A55"
        />
        <path
          d="M32 6.5C20.678 6.5 11.5 15.678 11.5 27c0 14.4 15.7 32.7 19.4 36.8a1.4 1.4 0 0 0 2.2 0C36.8 59.7 52.5 41.4 52.5 27 52.5 15.678 43.322 6.5 32 6.5Z"
          stroke="#C4A574"
          strokeWidth="1.4"
        />
        <circle cx="32" cy="27" r="16.5" fill="#0F2744" />
        <path
          d="M19.5 28.5c1.2-8.2 6.8-13.2 12.5-13.2S43.3 20.3 44.5 28.5"
          stroke="#C4A574"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M21.2 31c.4-2.8 1.6-5.2 3.2-6.8M42.8 31c-.4-2.8-1.6-5.2-3.2-6.8"
          stroke="#C4A574"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M23.2 18.8l2.4 3.2M40.8 18.8l-2.4 3.2"
          stroke="#F7F4EE"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M24.5 25.2c2.2-1.4 4.4-1.8 7.5-1.8s5.3.4 7.5 1.8"
          stroke="#F7F4EE"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
        <circle cx="27.2" cy="27.6" r="1.35" fill="#F7F4EE" />
        <circle cx="36.8" cy="27.6" r="1.35" fill="#F7F4EE" />
        <path
          d="M32 29.4c-1.5 0-2.5 1.1-2.5 2.1 0 .7.6 1.2 1.4 1.5L32 34l1.1-1c.8-.3 1.4-.8 1.4-1.5 0-1-1-2.1-2.5-2.1Z"
          fill="#C4A574"
        />
        <path
          d="M28.8 34.2c1 .9 2.1 1.4 3.2 1.4s2.2-.5 3.2-1.4"
          stroke="#F7F4EE"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M32 36.2v2.4M30.2 37.4l1.8 1.8M33.8 37.4l-1.8 1.8"
          stroke="#F7F4EE"
          strokeWidth="1.15"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (variant === "mono") {
    return (
      <svg
        viewBox="0 0 64 80"
        fill="none"
        aria-hidden="true"
        className="h-full w-full text-navy"
      >
        <path
          d="M32 2C18.193 2 7 13.193 7 27c0 16.5 18.2 36.8 23.1 41.9a2.7 2.7 0 0 0 3.8 0C38.8 63.8 57 43.5 57 27 57 13.193 45.807 2 32 2Z"
          fill="currentColor"
        />
        <circle
          cx="32"
          cy="27"
          r="15.5"
          fill="none"
          stroke="#fff"
          strokeWidth="1.5"
          opacity="0.95"
        />
        <path
          d="M20.5 28.5c1.1-7.6 6.3-12.2 11.5-12.2s10.4 4.6 11.5 12.2"
          stroke="#fff"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M24.8 25.4c2-1.2 4-1.6 7.2-1.6s5.2.4 7.2 1.6"
          stroke="#fff"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <circle cx="27.2" cy="27.8" r="1.5" fill="#fff" />
        <circle cx="36.8" cy="27.8" r="1.5" fill="#fff" />
        <path
          d="M32 29.8c-1.4 0-2.3 1-2.3 1.9 0 .6.5 1.1 1.3 1.4L32 34.2l1-.9c.8-.3 1.3-.8 1.3-1.4 0-.9-.9-1.9-2.3-1.9Z"
          fill="#fff"
        />
        <path
          d="M29 34.4c.9.8 1.9 1.3 3 1.3s2.1-.5 3-1.3"
          stroke="#fff"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // color (default / light backgrounds)
  return (
    <svg viewBox="0 0 64 80" fill="none" aria-hidden="true" className="h-full w-full">
      <path
        d="M32 2C18.193 2 7 13.193 7 27c0 16.5 18.2 36.8 23.1 41.9a2.7 2.7 0 0 0 3.8 0C38.8 63.8 57 43.5 57 27 57 13.193 45.807 2 32 2Z"
        fill="#0F2744"
      />
      <path
        d="M32 6.5C20.678 6.5 11.5 15.678 11.5 27c0 14.4 15.7 32.7 19.4 36.8a1.4 1.4 0 0 0 2.2 0C36.8 59.7 52.5 41.4 52.5 27 52.5 15.678 43.322 6.5 32 6.5Z"
        stroke="#C4A574"
        strokeWidth="1.4"
      />
      <circle cx="32" cy="27" r="16.5" fill="#F7F4EE" />
      <path
        d="M19.5 28.5c1.2-8.2 6.8-13.2 12.5-13.2S43.3 20.3 44.5 28.5"
        stroke="#C4A574"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M21.2 31c.4-2.8 1.6-5.2 3.2-6.8M42.8 31c-.4-2.8-1.6-5.2-3.2-6.8"
        stroke="#C4A574"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M23.2 18.8l2.4 3.2M40.8 18.8l-2.4 3.2"
        stroke="#0F2744"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M24.5 25.2c2.2-1.4 4.4-1.8 7.5-1.8s5.3.4 7.5 1.8"
        stroke="#0F2744"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <circle cx="27.2" cy="27.6" r="1.35" fill="#0F2744" />
      <circle cx="36.8" cy="27.6" r="1.35" fill="#0F2744" />
      <path
        d="M32 29.4c-1.5 0-2.5 1.1-2.5 2.1 0 .7.6 1.2 1.4 1.5L32 34l1.1-1c.8-.3 1.4-.8 1.4-1.5 0-1-1-2.1-2.5-2.1Z"
        fill="#C4A574"
      />
      <path
        d="M28.8 34.2c1 .9 2.1 1.4 3.2 1.4s2.2-.5 3.2-1.4"
        stroke="#0F2744"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M32 36.2v2.4M30.2 37.4l1.8 1.8M33.8 37.4l-1.8 1.8"
        stroke="#0F2744"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LevLogo({
  variant = "color",
  withWordmark = true,
  size = "md",
  className = "",
  href = "/",
}: Props) {
  const wordmarkLight = variant === "light";

  return (
    <Link
      href={href}
      aria-label="LEV Estates"
      className={`group inline-flex items-center gap-3 rounded-sm outline-none transition duration-300 focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 ${className}`}
    >
      <span
        className={`relative shrink-0 ${sizes[size]} transition duration-300 group-hover:drop-shadow-[0_4px_12px_rgba(196,165,116,0.35)]`}
      >
        <Mark variant={variant} />
      </span>
      {withWordmark && (
        <span className="leading-tight">
          <span
            className={`block font-display text-xl font-semibold tracking-[-0.02em] md:text-[1.35rem] ${
              wordmarkLight ? "text-foam" : "text-navy"
            }`}
          >
            LEV <span className="text-gold">Estates</span>
          </span>
        </span>
      )}
    </Link>
  );
}

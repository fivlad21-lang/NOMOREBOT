import { Link } from "@/i18n/navigation";

type CommonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost" | "onDark";
  size?: "md" | "lg";
};

const base =
  "inline-flex items-center justify-center font-semibold tracking-wide transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sea";

const variants: Record<NonNullable<CommonProps["variant"]>, string> = {
  primary: "bg-sea text-white hover:bg-sea-bright",
  secondary:
    "border border-white/35 bg-white/10 text-white backdrop-blur-sm hover:bg-white/18",
  ghost: "border border-line bg-transparent text-navy hover:border-sea hover:text-sea",
  onDark: "bg-gold text-navy hover:brightness-105",
};

const sizes: Record<NonNullable<CommonProps["size"]>, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-sm md:text-base",
};

function cx(...parts: Array<string | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function ButtonLink({
  href,
  children,
  className,
  variant = "primary",
  size = "md",
}: CommonProps & { href: string }) {
  return (
    <Link
      href={href}
      className={cx(base, variants[variant], sizes[size], "rounded-sm", className)}
    >
      {children}
    </Link>
  );
}

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  type = "button",
  onClick,
}: CommonProps & {
  type?: "button" | "submit";
  onClick?: () => void;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cx(base, variants[variant], sizes[size], "rounded-sm", className)}
    >
      {children}
    </button>
  );
}

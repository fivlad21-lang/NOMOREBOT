import Link from "next/link";

type Props = {
  children: React.ReactNode;
  href?: string;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  type?: "button" | "submit";
  onClick?: () => void;
  "data-plan"?: string;
};

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function CourseButton({
  children,
  href,
  className,
  variant = "primary",
  type = "button",
  onClick,
  "data-plan": dataPlan,
}: Props) {
  const classes = cx(
    "course-btn",
    variant === "primary" && "course-btn--primary",
    variant === "secondary" && "course-btn--secondary",
    variant === "ghost" && "course-btn--ghost",
    className,
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        data-plan={dataPlan}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      data-plan={dataPlan}
    >
      {children}
    </button>
  );
}

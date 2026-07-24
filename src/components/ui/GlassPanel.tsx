type Props = {
  children: React.ReactNode;
  className?: string;
  variant?: "light" | "strong" | "dark";
  radius?: "md" | "lg" | "xl";
};

const radiusMap = {
  md: "rounded-[var(--radius-md)]",
  lg: "rounded-[var(--radius-lg)]",
  xl: "rounded-[var(--radius-xl)]",
};

const variantMap = {
  light: "glass",
  strong: "glass-strong",
  dark: "glass-dark",
};

export function GlassPanel({
  children,
  className = "",
  variant = "light",
  radius = "lg",
}: Props) {
  return (
    <div className={`${variantMap[variant]} ${radiusMap[radius]} ${className}`}>
      {children}
    </div>
  );
}

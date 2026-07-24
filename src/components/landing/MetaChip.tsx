export function MetaChip({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`course-chip ${className}`}>
      <span className="course-chip-dot" aria-hidden />
      {children}
    </span>
  );
}

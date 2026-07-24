type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  light?: boolean;
};

export function SectionHeading({ eyebrow, title, subtitle, action, light }: Props) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        {eyebrow && (
          <p
            className={`mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] ${
              light ? "text-gold" : "text-sea"
            }`}
          >
            {eyebrow}
          </p>
        )}
        <h2
          className={`font-display text-4xl font-semibold leading-tight tracking-[-0.02em] md:text-5xl ${
            light ? "text-foam" : "text-navy"
          }`}
        >
          {title}
        </h2>
        {subtitle && (
          <p className={`mt-3 max-w-xl text-base md:text-lg ${light ? "text-white/70" : "text-ink-soft"}`}>
            {subtitle}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

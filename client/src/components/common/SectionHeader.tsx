interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
}

export function SectionHeader({
  badge,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <div className="mb-6">
      {badge ? (
        <p className="mb-2 text-sm font-semibold text-blue-600">{badge}</p>
      ) : null}

      <h2 className="text-2xl font-bold text-slate-800 md:text-3xl">{title}</h2>

      {description ? (
        <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
          {description}
        </p>
      ) : null}
    </div>
  );
}
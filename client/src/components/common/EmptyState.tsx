interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <section className="rounded-3xl bg-white p-10 text-center shadow-sm">
      <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
      <p className="mt-2 text-slate-600">{description}</p>
    </section>
  );
}
import type { DashboardStat } from "../../types/dashboard";

interface StatCardProps {
  item: DashboardStat;
}

export function StatCard({ item }: StatCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{item.title}</p>
      <h3 className="mt-3 text-4xl font-bold text-slate-800">{item.value}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
    </article>
  );
}
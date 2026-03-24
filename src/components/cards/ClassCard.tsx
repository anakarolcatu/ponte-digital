import type { ClassItem } from "../../types/class";

interface ClassCardProps {
  item: ClassItem;
}

export function ClassCard({ item }: ClassCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-5 h-40 rounded-2xl bg-linear-to-br from-blue-100 to-sky-50" />

      <div className="mb-3 flex flex-wrap gap-2">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
          {item.category}
        </span>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {item.level}
        </span>
      </div>

      <h3 className="text-2xl font-bold text-slate-800">{item.title}</h3>

      <p className="mt-3 leading-7 text-slate-600">{item.description}</p>

      <div className="mt-5 grid gap-3 rounded-2xl bg-slate-50 p-4 sm:grid-cols-2">
        <div>
          <p className="text-sm text-slate-500">Data</p>
          <p className="font-semibold text-slate-800">{item.date}</p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Horário</p>
          <p className="font-semibold text-slate-800">{item.time}</p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Voluntário</p>
          <p className="font-semibold text-slate-800">{item.teacher}</p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Vagas</p>
          <p className="font-semibold text-slate-800">{item.spots}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button className="rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700">
          Inscrever-se
        </button>

        <button className="rounded-2xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50">
          Ver detalhes
        </button>
      </div>
    </article>
  );
}
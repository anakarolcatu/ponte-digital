import type { ClassItem } from "../../types/class";
import type { User } from "../../types/user";

interface VolunteerClassCardProps {
  item: ClassItem;
  enrolledUsers: User[];
}

export function VolunteerClassCard({
  item,
  enrolledUsers,
}: VolunteerClassCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex flex-wrap gap-2">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
          {item.category}
        </span>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {item.level}
        </span>
      </div>

      <h3 className="text-2xl font-bold text-slate-800">{item.title}</h3>

      <p className="mt-3 leading-7 text-slate-600">{item.description}</p>

      <div className="mt-5 grid gap-3 rounded-2xl bg-slate-50 p-4 md:grid-cols-2">
        <div>
          <p className="text-sm text-slate-500">Data</p>
          <p className="font-semibold text-slate-800">{item.date}</p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Horário</p>
          <p className="font-semibold text-slate-800">{item.time}</p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Voluntário responsável</p>
          <p className="font-semibold text-slate-800">{item.teacherName}</p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Vagas disponíveis</p>
          <p className="font-semibold text-slate-800">{item.spots}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4">
        <div className="rounded-2xl border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Participantes inscritos</p>
          <p className="mt-1 text-2xl font-bold text-slate-800">
            {enrolledUsers.length}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Público da turma</p>
          <p className="mt-1 font-semibold text-slate-800">
            {item.targetAudience}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Objetivo da aula</p>
          <p className="mt-1 leading-7 text-slate-700">{item.objective}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Materiais sugeridos</p>
          {item.materials.length ? (
            <ul className="mt-2 space-y-2 text-slate-700">
              {item.materials.map((material) => (
                <li key={material}>• {material}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-1 text-slate-700">Nenhum material cadastrado.</p>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Inscritos da turma</p>

          {enrolledUsers.length > 0 ? (
            <div className="mt-3 space-y-3">
              {enrolledUsers.map((user) => (
                <div
                  key={user.id}
                  className="rounded-2xl bg-slate-50 px-4 py-3"
                >
                  <p className="font-semibold text-slate-800">{user.name}</p>
                  <p className="text-sm text-slate-600">{user.email}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    Perfil: {user.role}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-2 text-slate-700">
              Ainda não há participantes inscritos nesta aula.
            </p>
          )}
        </div>

        <div className="rounded-2xl bg-blue-50 p-4">
          <p className="text-sm font-medium text-blue-700">
            Observações para condução
          </p>
          <p className="mt-2 leading-7 text-slate-700">
            {item.notes || "Nenhuma observação disponível."}
          </p>
        </div>
      </div>
    </article>
  );
}
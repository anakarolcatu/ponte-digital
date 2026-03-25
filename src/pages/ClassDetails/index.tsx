import { Link, useParams } from "react-router-dom";
import { EmptyState } from "../../components/common/EmptyState";
import { SectionHeader } from "../../components/common/SectionHeader";
import { AppShell } from "../../components/layout/AppShell";
import { useAppContext } from "../../context/useAppContext";
import { classDetailsMock } from "../../data/classDetails";
import { classesMock } from "../../data/classes";

export default function ClassDetailsPage() {
  const { id } = useParams();

  const {
    currentUser,
    enrolledClassIds,
    enrollInClass,
    cancelEnrollment,
    getEnrolledUsersByClass,
  } = useAppContext();

  const classItem = classesMock.find((item) => item.id === id);

  if (!classItem) {
    return (
      <AppShell>
        <EmptyState
          title="Aula não encontrada"
          description="A aula que você tentou acessar não existe ou não está disponível."
        />
      </AppShell>
    );
  }

  const classId = classItem.id;

  const classDetails = classDetailsMock.find(
    (item) => item.classId === classId
  );

  const isEnrolled = enrolledClassIds.includes(classId);
  const isLearner = currentUser?.role === "Aprendiz";
  const isVolunteer = currentUser?.role === "Voluntário";

  const enrolledUsers = getEnrolledUsersByClass(classId);

  function handleEnroll() {
    if (!currentUser) {
      alert("Faça login ou cadastro para se inscrever em uma aula.");
      return;
    }

    if (!isLearner) {
      alert("Somente aprendizes podem se inscrever em aulas.");
      return;
    }

    enrollInClass(classId);
  }

  function handleCancelEnrollment() {
    cancelEnrollment(classId);
  }

  return (
    <AppShell>
      <div className="mb-6">
        <Link
          to="/aulas"
          className="inline-flex rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Voltar para aulas
        </Link>
      </div>

      <section className="mb-8 rounded-3xl bg-white p-8 shadow-sm">
        <SectionHeader
          badge="Detalhes da aula"
          title={classItem.title}
          description={classItem.description}
        />

        <div className="mt-6 flex flex-wrap gap-2">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
            {classItem.category}
          </span>

          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            {classItem.level}
          </span>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-bold text-slate-800">
            Informações da aula
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Data</p>
              <p className="mt-1 font-semibold text-slate-800">
                {classItem.date}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Horário</p>
              <p className="mt-1 font-semibold text-slate-800">
                {classItem.time}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Voluntário responsável</p>
              <p className="mt-1 font-semibold text-slate-800">
                {classItem.teacher}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Vagas disponíveis</p>
              <p className="mt-1 font-semibold text-slate-800">
                {classItem.spots}
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <div className="rounded-2xl border border-slate-200 p-5">
              <p className="text-sm text-slate-500">Objetivo da aula</p>
              <p className="mt-2 leading-7 text-slate-700">
                {classDetails?.objective ?? "Informação não disponível."}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5">
              <p className="text-sm text-slate-500">Público-alvo</p>
              <p className="mt-2 leading-7 text-slate-700">
                {classDetails?.targetAudience ??
                  "Informação não disponível."}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5">
              <p className="text-sm text-slate-500">Materiais sugeridos</p>

              {classDetails?.materials?.length ? (
                <ul className="mt-3 space-y-2 text-slate-700">
                  {classDetails.materials.map((material) => (
                    <li key={material}>• {material}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-slate-700">
                  Nenhum material informado.
                </p>
              )}
            </div>

            <div className="rounded-2xl bg-blue-50 p-5">
              <p className="text-sm font-medium text-blue-700">
                Observações importantes
              </p>
              <p className="mt-2 leading-7 text-slate-700">
                {classDetails?.notes ?? "Nenhuma observação disponível."}
              </p>
            </div>
          </div>
        </article>

        <aside className="space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800">
              Participação na aula
            </h3>

            <div className="mt-5 space-y-4">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Inscritos atualmente</p>
                <p className="mt-1 text-2xl font-bold text-slate-800">
                  {enrolledUsers.length}
                </p>
              </div>

              {isEnrolled ? (
                <>
                  <button
                    type="button"
                    className="w-full rounded-2xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
                  >
                    Inscrição realizada
                  </button>

                  <button
                    type="button"
                    onClick={handleCancelEnrollment}
                    className="w-full rounded-2xl border border-red-300 px-5 py-3 font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    Cancelar inscrição
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={handleEnroll}
                  className="w-full rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  Inscrever-se
                </button>
              )}

              {!currentUser && (
                <p className="text-sm leading-6 text-slate-600">
                  Faça login ou crie uma conta para se inscrever.
                </p>
              )}

              {isVolunteer && (
                <p className="text-sm leading-6 text-slate-600">
                  Como voluntário, você pode acompanhar os inscritos em
                  <span className="font-semibold"> Minhas aulas</span>.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800">
              Voluntário responsável
            </h3>

            <p className="mt-3 text-slate-600">{classItem.teacher}</p>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              O voluntário conduz a aula com linguagem acessível, apoio
              prático e foco na autonomia digital dos participantes.
            </p>
          </div>
        </aside>
      </section>
    </AppShell>
  );
}
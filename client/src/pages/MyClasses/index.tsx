import { Link } from "react-router-dom";
import { ClassCard } from "../../components/cards/ClassCard";
import { VolunteerClassCard } from "../../components/cards/VolunteerClassCard";
import { EmptyState } from "../../components/common/EmptyState";
import { SectionHeader } from "../../components/common/SectionHeader";
import { classDetailsMock } from "../../data/classDetails";
import { classesMock } from "../../data/classes";
import { AppShell } from "../../components/layout/AppShell";
import { useAppContext } from "../../context/useAppContext";

export default function MyClassesPage() {
  const { currentUser, enrolledClassIds, getEnrolledUsersByClass } =
    useAppContext();

  if (!currentUser) {
    return (
      <AppShell>
        <section className="mb-8 rounded-3xl bg-white p-8 shadow-sm">
          <SectionHeader
            badge="Área pessoal"
            title="Acompanhe suas aulas"
            description="Faça login para visualizar suas inscrições e acompanhar suas atividades na plataforma."
          />
        </section>

        <EmptyState
          title="Você precisa entrar na sua conta"
          description="Faça login ou crie uma conta para acessar sua área de aulas."
        />

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/login"
            className="rounded-2xl bg-blue-600 px-5 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
          >
            Entrar
          </Link>

          <Link
            to="/cadastro"
            className="rounded-2xl border border-slate-300 px-5 py-3 text-center font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Criar conta
          </Link>
        </div>
      </AppShell>
    );
  }

  const isLearner = currentUser.role === "Aprendiz";
  const isVolunteer = currentUser.role === "Voluntário";

  const myClasses = classesMock.filter((item) => {
    if (isLearner) {
      return enrolledClassIds.includes(item.id);
    }

    if (isVolunteer) {
      return item.teacher === currentUser.name;
    }

    return false;
  });

  return (
    <AppShell>
      <section className="mb-8 rounded-3xl bg-white p-8 shadow-sm">
        <SectionHeader
          badge={isLearner ? "Minhas aulas" : "Minhas turmas"}
          title={
            isLearner
              ? "Acompanhe as aulas em que você está inscrito"
              : "Acompanhe os detalhes das aulas que você ministra"
          }
          description={
            isLearner
              ? "Veja suas inscrições e acompanhe suas oportunidades de aprendizado."
              : "Consulte informações da turma, participantes inscritos, materiais sugeridos e orientações para condução da aula."
          }
        />
      </section>

      {myClasses.length === 0 ? (
        <>
          <EmptyState
            title={
              isLearner
                ? "Você ainda não está inscrito em nenhuma aula"
                : "Você ainda não possui turmas cadastradas"
            }
            description={
              isLearner
                ? "Explore o catálogo de aulas e faça sua primeira inscrição."
                : "Quando houver aulas vinculadas ao seu perfil, elas aparecerão aqui."
            }
          />

          <div className="mt-6">
            <Link
              to="/aulas"
              className="inline-flex rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Ir para catálogo de aulas
            </Link>
          </div>
        </>
      ) : (
        <>
          <section className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-800">
                {isLearner ? "Suas inscrições" : "Suas turmas"}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {myClasses.length} aula(s) encontrada(s)
              </p>
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-2">
            {myClasses.map((item) => {
              if (isVolunteer) {
                const details = classDetailsMock.find(
                  (detail) => detail.classId === item.id
                );

                const enrolledUsers = getEnrolledUsersByClass(item.id);

                return (
                  <VolunteerClassCard
                    key={item.id}
                    item={item}
                    details={details}
                    enrolledUsers={enrolledUsers}
                  />
                );
              }

              return <ClassCard key={item.id} item={item} />;
            })}
          </section>
        </>
      )}
    </AppShell>
  );
}
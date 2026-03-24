import { ClassCard } from "../../components/cards/ClassCard";
import { EmptyState } from "../../components/common/EmptyState";
import { SectionHeader } from "../../components/common/SectionHeader";
import { classesMock } from "../../data/classes";
import { AppShell } from "../../components/layout/AppShell";
import { useAppContext } from "../../context/AppContext";

export default function MyClassesPage() {
  const { currentUser, enrolledClassIds } = useAppContext();

  if (!currentUser) {
    return (
      <AppShell>
        <EmptyState
          title="Você precisa entrar na sua conta"
          description="Faça login para visualizar suas aulas e acompanhar sua participação na plataforma."
        />
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
              : "Acompanhe as aulas que você está ministrando"
          }
          description={
            isLearner
              ? "Veja suas inscrições e acompanhe as próximas oportunidades de aprendizado."
              : "Veja suas turmas, acompanhe suas aulas e organize sua atuação como voluntário."
          }
        />
      </section>

      {myClasses.length === 0 ? (
        <EmptyState
          title={
            isLearner
              ? "Você ainda não está inscrito em nenhuma aula"
              : "Você ainda não possui turmas cadastradas"
          }
          description={
            isLearner
              ? "Explore o catálogo de aulas e faça sua primeira inscrição."
              : "Assim que houver aulas vinculadas ao seu perfil, elas aparecerão aqui."
          }
        />
      ) : (
        <section className="grid gap-6 xl:grid-cols-2">
          {myClasses.map((item) => (
            <ClassCard key={item.id} item={item} />
          ))}
        </section>
      )}
    </AppShell>
  );
}
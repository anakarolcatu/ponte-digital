import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ClassCard } from "../../components/cards/ClassCard";
import { VolunteerClassCard } from "../../components/cards/VolunteerClassCard";
import { EmptyState } from "../../components/common/EmptyState";
import { SectionHeader } from "../../components/common/SectionHeader";
import { AppShell } from "../../components/layout/AppShell";
import { useAppContext } from "../../context/useAppContext";
import { api } from "../../services/api";
import { getMyEnrollmentClassIds } from "../../services/enrollment";
import {
  getEnrolledUsersByClass as getEnrolledUsersByClassRequest,
  getTeacherClasses,
} from "../../services/class";
import type { ClassItem } from "../../types/class";
import type { User } from "../../types/user";

export default function MyClassesPage() {
  const { currentUser, token, enrolledClassIds, setEnrolledClassIds } =
    useAppContext();

  const [myClasses, setMyClasses] = useState<ClassItem[]>([]);
  const [enrolledUsersByClass, setEnrolledUsersByClass] = useState<
    Record<string, User[]>
  >({});
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadData() {
      if (!currentUser) {
        setMyClasses([]);
        setEnrolledUsersByClass({});
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setErrorMessage("");

        if (currentUser.role === "Aprendiz") {
          if (!token) {
            setMyClasses([]);
            setEnrolledClassIds([]);
            return;
          }

          const enrolledIds = await getMyEnrollmentClassIds(token);
          setEnrolledClassIds(enrolledIds);

          const classResponses = await Promise.all(
            enrolledIds.map(async (classId) => {
              const response = await api.get<ClassItem>(`/classes/${classId}`);
              return response.data;
            })
          );

          setMyClasses(classResponses);
          setEnrolledUsersByClass({});
        }

        if (currentUser.role === "Voluntário") {
          const teacherClasses = await getTeacherClasses(currentUser.id);
          setMyClasses(teacherClasses);
          setEnrolledUsersByClass({});

          if (token) {
            const enrolledUsersEntries = await Promise.all(
              teacherClasses.map(async (classItem) => {
                const users = await getEnrolledUsersByClassRequest(
                  token,
                  classItem._id
                );

                return [classItem._id, users] as const;
              })
            );

            const mappedUsers = Object.fromEntries(enrolledUsersEntries);
            setEnrolledUsersByClass(mappedUsers);
          }
        }
      } catch (error) {
        console.error(error);
        setErrorMessage("Não foi possível carregar suas aulas.");
      } finally {
        setIsLoading(false);
      }
    }

    void loadData();
  }, [currentUser, token, setEnrolledClassIds]);

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

  const displayedClasses = isLearner
    ? myClasses.filter((item) => enrolledClassIds.includes(item._id))
    : myClasses;

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
              : "Consulte informações da turma, participantes inscritos e orientações para condução da aula."
          }
        />
      </section>

      {isLoading ? (
        <section className="rounded-3xl bg-white p-10 text-center shadow-sm">
          <p className="text-slate-600">Carregando suas aulas...</p>
        </section>
      ) : errorMessage ? (
        <EmptyState
          title="Não foi possível carregar suas aulas"
          description={errorMessage}
        />
      ) : displayedClasses.length === 0 ? (
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
                {displayedClasses.length} aula(s) encontrada(s)
              </p>
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-2">
            {displayedClasses.map((item) => {
              if (isVolunteer) {
                return (
                  <VolunteerClassCard
                    key={item._id}
                    item={item}
                    enrolledUsers={enrolledUsersByClass[item._id] ?? []}
                  />
                );
              }

              return <ClassCard key={item._id} item={item} />;
            })}
          </section>
        </>
      )}
    </AppShell>
  );
}
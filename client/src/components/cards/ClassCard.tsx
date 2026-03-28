import { Link } from "react-router-dom";
import { useState } from "react";
import { useAppContext } from "../../context/useAppContext";
import {
  cancelEnrollmentRequest,
  enrollInClassRequest,
} from "../../services/enrollment";
import type { ClassItem } from "../../types/class";

interface ClassCardProps {
  item: ClassItem;
}

export function ClassCard({ item }: ClassCardProps) {
  const {
    currentUser,
    token,
    enrolledClassIds,
    setEnrolledClassIds,
  } = useAppContext();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEnrolled = enrolledClassIds.includes(item._id);
  const isLearner = currentUser?.role === "Aprendiz";

  async function handleEnroll() {
    if (!currentUser || !token) {
      alert("Faça login ou cadastro para se inscrever em uma aula.");
      return;
    }

    if (!isLearner) {
      alert("Somente aprendizes podem se inscrever em aulas.");
      return;
    }

    try {
      setIsSubmitting(true);

      await enrollInClassRequest(token, item._id);

      setEnrolledClassIds([...enrolledClassIds, item._id]);
    } catch (error) {
      console.error(error);
      alert("Não foi possível realizar a inscrição.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleCancelEnrollment() {
    if (!token) return;

    try {
      setIsSubmitting(true);

      await cancelEnrollmentRequest(token, item._id);

      setEnrolledClassIds(
        enrolledClassIds.filter((classId) => classId !== item._id)
      );
    } catch (error) {
      console.error(error);
      alert("Não foi possível cancelar a inscrição.");
    } finally {
      setIsSubmitting(false);
    }
  }

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
          <p className="font-semibold text-slate-800">{item.teacherName}</p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Vagas</p>
          <p className="font-semibold text-slate-800">{item.spots}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        {isEnrolled ? (
          <>
            <button
              type="button"
              className="rounded-2xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
            >
              Inscrição realizada
            </button>

            <button
              type="button"
              onClick={() => void handleCancelEnrollment()}
              disabled={isSubmitting}
              className="rounded-2xl border border-red-300 px-5 py-3 font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
            >
              {isSubmitting ? "Cancelando..." : "Cancelar inscrição"}
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => void handleEnroll()}
            disabled={isSubmitting}
            className="rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "Inscrevendo..." : "Inscrever-se"}
          </button>
        )}

        <Link
          to={`/aulas/${item._id}`}
          className="rounded-2xl border border-slate-300 px-5 py-3 text-center font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Ver detalhes
        </Link>
      </div>
    </article>
  );
}
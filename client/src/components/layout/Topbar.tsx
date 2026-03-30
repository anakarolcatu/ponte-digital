import { Link } from "react-router-dom";
import { useAppContext } from "../../context/useAppContext";

interface TopbarProps {
  onOpenSidebar?: () => void;
}

export function Topbar({ onOpenSidebar }: TopbarProps) {
  const { currentUser, clearSession } = useAppContext();

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white">
      <div className="px-6 py-4 lg:px-10">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onOpenSidebar}
            className="rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-700 lg:hidden"
          >
            Menu
          </button>

          <input
            placeholder="Buscar aulas ou trilhas"
            className="w-full max-w-xl rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
          />

          <div className="hidden items-center gap-3 sm:flex">
            {currentUser ? (
              <>
                <span className="text-sm font-medium text-slate-700">
                  Olá, {currentUser.name}
                </span>
                <button
                  onClick={clearSession}
                  className="cursor-pointer rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="cursor-pointer rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
                >
                  Entrar
                </Link>

                <Link
                  to="/cadastro"
                  className="cursor-pointer rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Criar conta
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3 sm:hidden">
          {currentUser ? (
            <>
              <span className="text-sm font-medium text-slate-700">
                Olá, {currentUser.name}
              </span>
              <button
                onClick={clearSession}
                className="cursor-pointer rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="cursor-pointer rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
              >
                Entrar
              </Link>

              <Link
                to="/cadastro"
                className="cursor-pointer rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Criar conta
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

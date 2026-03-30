import { Link, useLocation } from "react-router-dom";

const links = [
  { label: "Início", to: "/" },
  { label: "Aulas", to: "/aulas" },
  { label: "Cadastro", to: "/cadastro" },
  { label: "Painel", to: "/dashboard" },
  { label: "Minhas aulas", to: "/minhas-aulas" },
];

interface SidebarProps {
  mobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

interface SidebarContentProps {
  onNavigate?: () => void;
}

function SidebarContent({ onNavigate }: SidebarContentProps) {
  const location = useLocation();

  return (
    <div className="flex h-full flex-col px-6 py-8">
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-blue-700">Ponte Digital</h1>

        <p className="mt-2 text-sm text-slate-500">
          Inclusão tecnológica acessível
        </p>
      </div>

      <nav className="space-y-2">
        {links.map((link) => {
          const active = location.pathname === link.to;

          return (
            <Link
              key={link.to}
              to={link.to}
              onClick={onNavigate}
              className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${
                active
                  ? "bg-blue-600 text-white"
                  : "text-slate-700 hover:bg-blue-50"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl bg-blue-600 p-5 text-white">
        <h2 className="text-lg font-semibold">Quer ajudar alguém?</h2>

        <p className="mt-2 text-sm text-blue-100">
          Seja voluntário e compartilhe conhecimento.
        </p>

        <Link
          to="/cadastro"
          onClick={onNavigate}
          className="mt-4 inline-block rounded-lg bg-white px-4 py-2 text-sm font-semibold text-blue-700"
        >
          Participar
        </Link>
      </div>
    </div>
  );
}

export function Sidebar({ mobile = false, isOpen = false, onClose }: SidebarProps) {
  if (mobile) {
    return (
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-72 border-r border-slate-200 bg-white transition-transform duration-200 lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-end px-6 pt-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-300 px-3 py-1 text-sm text-slate-700"
          >
            Fechar
          </button>
        </div>
        <SidebarContent onNavigate={onClose} />
      </aside>
    );
  }

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-72 border-r border-slate-200 bg-white lg:block">
      <SidebarContent />
    </aside>
  );
}

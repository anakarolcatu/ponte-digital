import { Link, useLocation } from "react-router-dom";

const links = [
  { label: "Início", to: "/" },
  { label: "Aulas", to: "/aulas" },
  { label: "Cadastro", to: "/cadastro" },
  { label: "Painel", to: "/dashboard" },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-72 border-r border-slate-200 bg-white lg:block">
      <div className="flex h-full flex-col px-6 py-8">
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-blue-700">
            Ponte Digital
          </h1>

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
          <h2 className="text-lg font-semibold">
            Quer ajudar alguém?
          </h2>

          <p className="mt-2 text-sm text-blue-100">
            Seja voluntário e compartilhe conhecimento.
          </p>

          <Link
            to="/cadastro"
            className="mt-4 inline-block rounded-lg bg-white px-4 py-2 text-sm font-semibold text-blue-700"
          >
            Participar
          </Link>
        </div>
      </div>
    </aside>
  );
}
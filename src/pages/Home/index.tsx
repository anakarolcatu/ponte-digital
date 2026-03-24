import { AppShell } from "../../components/layout/AppShell";

const classes = [
  {
    title: "WhatsApp básico",
    category: "Smartphone",
  },
  {
    title: "Criar e-mail",
    category: "Emprego",
  },
  {
    title: "Internet com segurança",
    category: "Cidadania digital",
  },
];

export default function HomePage() {
  return (
    <AppShell>
      <section className="mb-10 rounded-3xl bg-blue-600 p-8 text-white lg:p-12">
        <h1 className="text-4xl font-bold lg:text-5xl">
          Aprender tecnologia pode ser simples
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-blue-100">
          A Ponte Digital conecta voluntários e aprendizes para desenvolver autonomia no uso da tecnologia.
        </p>

        <div className="mt-6 flex gap-3">
          <button className="rounded-xl bg-white px-5 py-3 font-semibold text-blue-700">
            Quero aprender
          </button>

          <button className="rounded-xl border border-white px-5 py-3 font-semibold">
            Quero ensinar
          </button>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold text-slate-800">
          Aulas em destaque
        </h2>

        <div className="grid gap-5 xl:grid-cols-3">
          {classes.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:shadow-md"
            >
              <div className="mb-4 h-36 rounded-2xl bg-blue-100" />

              <p className="text-sm text-blue-600">{item.category}</p>

              <h3 className="mt-2 text-xl font-semibold text-slate-800">
                {item.title}
              </h3>

              <button className="mt-5 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
                Ver aula
              </button>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
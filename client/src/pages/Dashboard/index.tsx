import { StatCard } from "../../components/cards/StatCard";
import { SectionHeader } from "../../components/common/SectionHeader";
import {
  impactItemsMock,
  statsMock,
  upcomingActivitiesMock,
} from "../../data/dashboard";
import { AppShell } from "../../components/layout/AppShell";

export default function DashboardPage() {
  return (
    <AppShell>
      <section className="mb-8 rounded-3xl bg-white p-8 shadow-sm">
        <SectionHeader
          badge="Painel do projeto"
          title="Acompanhamento da inclusão digital"
          description="Este painel apresenta indicadores do projeto, metas de impacto e uma visão geral das ações em andamento para ampliar o acesso à tecnologia com apoio humanizado."
        />
      </section>

      <section className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {statsMock.map((item) => (
          <StatCard key={item.title} item={item} />
        ))}
      </section>

      <section className="mb-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <SectionHeader
            badge="Metas do projeto"
            title="Progresso das principais iniciativas"
          />

          <div className="space-y-6">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="font-medium text-slate-700">
                  Beneficiários nos primeiros 6 meses
                </p>
                <span className="text-sm font-semibold text-slate-600">
                  200 / 200
                </span>
              </div>
              <div className="h-3 rounded-full bg-slate-100">
                <div className="h-3 w-full rounded-full bg-blue-600" />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="font-medium text-slate-700">
                  Professores voluntários no primeiro ano
                </p>
                <span className="text-sm font-semibold text-slate-600">
                  50 / 50
                </span>
              </div>
              <div className="h-3 rounded-full bg-slate-100">
                <div className="h-3 w-full rounded-full bg-blue-500" />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="font-medium text-slate-700">
                  Jovens com uso prático para emprego ou renda
                </p>
                <span className="text-sm font-semibold text-slate-600">
                  30%
                </span>
              </div>
              <div className="h-3 rounded-full bg-slate-100">
                <div className="h-3 w-[30%] rounded-full bg-sky-500" />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="font-medium text-slate-700">
                  Aumento no uso de serviços públicos digitais
                </p>
                <span className="text-sm font-semibold text-slate-600">
                  40%
                </span>
              </div>
              <div className="h-3 rounded-full bg-slate-100">
                <div className="h-3 w-[40%] rounded-full bg-indigo-500" />
              </div>
            </div>
          </div>
        </article>

        <aside className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <SectionHeader
            badge="Resumo rápido"
            title="Destaques do impacto social"
          />

          <div className="space-y-4">
            {impactItemsMock.map((item) => (
              <div key={item} className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm leading-6 text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <article className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <SectionHeader
            badge="Próximas atividades"
            title="Aulas e encontros agendados"
          />

          <div className="space-y-4">
            {upcomingActivitiesMock.map((activity) => (
              <div
                key={`${activity.title}-${activity.date}`}
                className="rounded-2xl border border-slate-200 p-4 transition hover:bg-slate-50"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">
                      {activity.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Público: {activity.audience}
                    </p>
                  </div>

                  <div className="text-sm text-slate-600">
                    <p>
                      <span className="font-medium">Data:</span> {activity.date}
                    </p>
                    <p>
                      <span className="font-medium">Horário:</span>{" "}
                      {activity.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-3xl bg-blue-600 p-6 text-white shadow-sm md:p-8">
          <p className="text-sm font-semibold text-blue-100">Visão do projeto</p>

          <h2 className="mt-2 text-2xl font-bold">
            Tecnologia com empatia e propósito
          </h2>

          <p className="mt-4 leading-7 text-blue-50">
            A Ponte Digital busca reduzir desigualdades no acesso à informação e
            fortalecer a autonomia de jovens e idosos por meio do aprendizado
            tecnológico acessível, humano e contextualizado.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-white/15 p-4">
              <p className="text-sm text-blue-100">Foco inicial</p>
              <p className="mt-1 font-semibold">Zona Norte de São Paulo</p>
            </div>

            <div className="rounded-2xl bg-white/15 p-4">
              <p className="text-sm text-blue-100">Estratégia</p>
              <p className="mt-1 font-semibold">ONGs e parcerias locais</p>
            </div>

            <div className="rounded-2xl bg-white/15 p-4">
              <p className="text-sm text-blue-100">Público</p>
              <p className="mt-1 font-semibold">Jovens e idosos</p>
            </div>

            <div className="rounded-2xl bg-white/15 p-4">
              <p className="text-sm text-blue-100">Objetivo futuro</p>
              <p className="mt-1 font-semibold">Expandir para novas regiões</p>
            </div>
          </div>
        </article>
      </section>
    </AppShell>
  );
}
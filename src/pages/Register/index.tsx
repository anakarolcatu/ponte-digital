import { useState } from "react";
import { SectionHeader } from "../../components/common/SectionHeader";
import { PrimaryButton } from "../../components/form/PrimaryButton";
import { TextAreaField } from "../../components/form/TextAreaField";
import { TextInput } from "../../components/form/TextInput";
import { AppShell } from "../../components/layout/AppShell";

type UserProfile = "Aprendiz" | "Voluntário";

export default function RegisterPage() {
  const [selectedProfile, setSelectedProfile] = useState<UserProfile>("Aprendiz");

  return (
    <AppShell>
      <section className="mb-8 rounded-3xl bg-white p-8 shadow-sm">
        <SectionHeader
          badge="Cadastro"
          title="Faça parte da Ponte Digital"
          description="Cadastre-se para aprender tecnologia com apoio humanizado ou para compartilhar conhecimento como voluntário. Escolha o perfil que melhor representa você e preencha seus dados."
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <article className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800">
              Escolha seu perfil
            </h2>

            <p className="mt-2 text-slate-600">
              Isso nos ajuda a mostrar a experiência mais adequada para você.
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <button
                type="button"
                onClick={() => setSelectedProfile("Aprendiz")}
                className={`rounded-2xl border p-5 text-left transition ${
                  selectedProfile === "Aprendiz"
                    ? "border-blue-600 bg-blue-50"
                    : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                }`}
              >
                <p className="text-lg font-semibold text-slate-800">Aprendiz</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Para quem deseja aprender a usar ferramentas digitais no dia a dia,
                  no trabalho ou nos estudos.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setSelectedProfile("Voluntário")}
                className={`rounded-2xl border p-5 text-left transition ${
                  selectedProfile === "Voluntário"
                    ? "border-blue-600 bg-blue-50"
                    : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                }`}
              >
                <p className="text-lg font-semibold text-slate-800">Voluntário</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Para quem deseja ensinar tecnologia e contribuir com a inclusão
                  digital de jovens e idosos.
                </p>
              </button>
            </div>
          </div>

          <form className="grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <TextInput
                id="name"
                label="Nome completo"
                placeholder="Digite seu nome completo"
              />
            </div>

            <TextInput
              id="email"
              type="email"
              label="E-mail"
              placeholder="Digite seu e-mail"
            />

            <TextInput
              id="age"
              type="number"
              label="Idade"
              placeholder="Digite sua idade"
            />

            <TextInput
              id="neighborhood"
              label="Bairro"
              placeholder="Digite seu bairro"
            />

            <TextInput
              id="phone"
              type="tel"
              label="Telefone"
              placeholder="Digite seu telefone"
            />

            <div className="md:col-span-2">
              <TextInput
                id="interest"
                label={
                  selectedProfile === "Aprendiz"
                    ? "O que você gostaria de aprender?"
                    : "O que você pode ensinar?"
                }
                placeholder={
                  selectedProfile === "Aprendiz"
                    ? "Ex.: WhatsApp, e-mail, currículo, internet"
                    : "Ex.: Informática básica, smartphone, internet, Office"
                }
              />
            </div>

            <div className="md:col-span-2">
              <TextAreaField
                id="about"
                label={
                  selectedProfile === "Aprendiz"
                    ? "Conte um pouco sobre sua necessidade"
                    : "Conte um pouco sobre sua experiência"
                }
                placeholder={
                  selectedProfile === "Aprendiz"
                    ? "Ex.: Quero aprender a mexer no celular, criar e-mail e usar aplicativos do dia a dia."
                    : "Ex.: Tenho experiência com ferramentas digitais e gostaria de ajudar outras pessoas a aprender."
                }
                rows={5}
              />
            </div>

            <div className="md:col-span-2">
              <PrimaryButton type="submit" fullWidth>
                Criar cadastro
              </PrimaryButton>
            </div>
          </form>
        </article>

        <aside className="space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800">
              Por que participar?
            </h3>

            <div className="mt-5 space-y-4">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="font-semibold text-slate-800">Aprendizado acessível</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Aulas com linguagem simples e apoio próximo para quem está começando.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="font-semibold text-slate-800">Impacto social</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  A tecnologia pode ampliar autonomia, autoestima e oportunidades.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="font-semibold text-slate-800">Rede colaborativa</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Voluntários e aprendizes se conectam em uma comunidade de apoio.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-blue-600 p-6 text-white shadow-sm">
            <p className="text-sm font-semibold text-blue-100">Destaque</p>
            <h3 className="mt-2 text-2xl font-bold">
              Inclusão digital com empatia
            </h3>
            <p className="mt-3 text-sm leading-7 text-blue-50">
              Nosso foco é tornar a tecnologia mais próxima, simples e útil para
              a vida real de cada participante.
            </p>
          </div>
        </aside>
      </section>
    </AppShell>
  );
}
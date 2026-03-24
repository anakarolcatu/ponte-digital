import { Link } from "react-router-dom";
import { SectionHeader } from "../../components/common/SectionHeader";
import { PrimaryButton } from "../../components/form/PrimaryButton";
import { TextInput } from "../../components/form/TextInput";
import { AppShell } from "../../components/layout/AppShell";

export default function LoginPage() {
  return (
    <AppShell>
      <section className="mb-8 rounded-3xl bg-white p-8 shadow-sm">
        <SectionHeader
          badge="Acesso"
          title="Entre na sua conta"
          description="Acesse sua área para acompanhar aulas, inscrições, atividades e oportunidades dentro da Ponte Digital."
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800">
              Bem-vindo de volta
            </h2>
            <p className="mt-2 text-slate-600">
              Informe seus dados para entrar na plataforma.
            </p>
          </div>

          <form className="space-y-5">
            <TextInput
              id="email"
              type="email"
              label="E-mail"
              placeholder="Digite seu e-mail"
            />

            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700"
                >
                  Senha
                </label>

                <button
                  type="button"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Esqueci minha senha
                </button>
              </div>

              <TextInput
                id="password"
                type="password"
                label=""
                placeholder="Digite sua senha"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="remember" className="text-sm text-slate-600">
                Manter minha conta conectada
              </label>
            </div>

            <PrimaryButton type="submit" fullWidth>
              Entrar
            </PrimaryButton>
          </form>

          <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
            Ainda não tem cadastro?{" "}
            <Link
              to="/cadastro"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Criar conta
            </Link>
          </div>
        </article>

        <aside className="space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800">
              O que você encontra aqui
            </h3>

            <div className="mt-5 space-y-4">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="font-semibold text-slate-800">Aulas acessíveis</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Conteúdos com linguagem simples para facilitar o aprendizado.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="font-semibold text-slate-800">Rede colaborativa</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Conexão entre voluntários e aprendizes em uma comunidade de apoio.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="font-semibold text-slate-800">Acompanhamento</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Visualização de inscrições, atividades e evolução no projeto.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-blue-600 p-6 text-white shadow-sm">
            <p className="text-sm font-semibold text-blue-100">Mensagem</p>
            <h3 className="mt-2 text-2xl font-bold">
              Tecnologia pode ser simples e próxima
            </h3>
            <p className="mt-3 text-sm leading-7 text-blue-50">
              A Ponte Digital existe para tornar o aprendizado tecnológico mais
              humano, acessível e útil para a vida real.
            </p>
          </div>
        </aside>
      </section>
    </AppShell>
  );
}
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SectionHeader } from "../../components/common/SectionHeader";
import { PrimaryButton } from "../../components/form/PrimaryButton";
import { TextInput } from "../../components/form/TextInput";
import { AppShell } from "../../components/layout/AppShell";
import { useAppContext } from "../../context/useAppContext";
import { api } from "../../services/api";

interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    age: number;
    neighborhood: string;
    phone: string;
    role: "Aprendiz" | "Voluntário";
    interest: string;
    about: string;
  };
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { setCurrentUser, setToken } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setErrorMessage("Preencha e-mail e senha para continuar.");
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage("");

      const response = await api.post<LoginResponse>("/auth/login", {
        email,
        password,
      });

      setCurrentUser(response.data.user);
      setToken(response.data.token);

      navigate("/dashboard");
    } catch (error: any) {
      const backendMessage =
        error?.response?.data?.message || "Não foi possível fazer login.";

      setErrorMessage(backendMessage);
    } finally {
      setIsLoading(false);
    }
  }

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

          <form className="space-y-5" onSubmit={handleSubmit}>
            <TextInput
              id="email"
              type="email"
              label="E-mail"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextInput
              id="password"
              type="password"
              label="Senha"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {errorMessage ? (
              <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
                {errorMessage}
              </div>
            ) : null}

            <PrimaryButton type="submit" fullWidth>
              {isLoading ? "Entrando..." : "Entrar"}
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
        </aside>
      </section>
    </AppShell>
  );
}
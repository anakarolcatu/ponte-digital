import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SectionHeader } from "../../components/common/SectionHeader";
import { PrimaryButton } from "../../components/form/PrimaryButton";
import { TextAreaField } from "../../components/form/TextAreaField";
import { TextInput } from "../../components/form/TextInput";
import { AppShell } from "../../components/layout/AppShell";
import { useAppContext } from "../../context/useAppContext";
import { api } from "../../services/api";
import type { UserRole } from "../../types/user";

interface RegisterResponse {
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

export default function RegisterPage() {
  const navigate = useNavigate();
  const { setCurrentUser, setToken } = useAppContext();

  const [selectedProfile, setSelectedProfile] = useState<UserRole>("Aprendiz");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("");
  const [about, setAbout] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim() ||
      !age.trim() ||
      !neighborhood.trim() ||
      !phone.trim() ||
      !interest.trim() ||
      !about.trim()
    ) {
      setErrorMessage("Preencha todos os campos para continuar.");
      return;
    }

    if (password.length < 4) {
      setErrorMessage("A senha deve ter pelo menos 4 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("As senhas não coincidem.");
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage("");

      const response = await api.post<RegisterResponse>("/auth/register", {
        name,
        email,
        password,
        age: Number(age),
        neighborhood,
        phone,
        role: selectedProfile,
        interest,
        about,
      });

      setCurrentUser(response.data.user);
      setToken(response.data.token);

      navigate("/dashboard");
    } catch (error: any) {
      const backendMessage =
        error?.response?.data?.message || "Não foi possível realizar o cadastro.";

      setErrorMessage(backendMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AppShell>
      <section className="mb-8 rounded-3xl bg-white p-8 shadow-sm">
        <SectionHeader
          badge="Cadastro"
          title="Faça parte da Ponte Digital"
          description="Cadastre-se para aprender tecnologia com apoio humanizado ou para compartilhar conhecimento como voluntário."
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <article className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800">
              Escolha seu perfil
            </h2>

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

          <form className="grid gap-5 md:grid-cols-2" onSubmit={handleSubmit}>
            <div className="md:col-span-2">
              <TextInput
                id="name"
                label="Nome completo"
                placeholder="Digite seu nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

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
              placeholder="Crie uma senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <TextInput
              id="confirmPassword"
              type="password"
              label="Confirmar senha"
              placeholder="Repita a senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <TextInput
              id="age"
              type="number"
              label="Idade"
              placeholder="Digite sua idade"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />

            <TextInput
              id="neighborhood"
              label="Bairro"
              placeholder="Digite seu bairro"
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
            />

            <TextInput
              id="phone"
              type="tel"
              label="Telefone"
              placeholder="Digite seu telefone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
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
                placeholder="Escreva aqui"
                rows={5}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>

            {errorMessage ? (
              <div className="md:col-span-2 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
                {errorMessage}
              </div>
            ) : null}

            <div className="md:col-span-2">
              <PrimaryButton type="submit" fullWidth>
                {isLoading ? "Criando cadastro..." : "Criar cadastro"}
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
        </aside>
      </section>
    </AppShell>
  );
}
import type { ClassItem } from "../types/class";

export const classesMock: ClassItem[] = [
  {
    id: "1",
    title: "WhatsApp básico",
    description:
      "Aprenda a enviar mensagens, fotos, áudios e fazer chamadas com mais segurança.",
    category: "Smartphone",
    level: "Básico",
    date: "10/04/2026",
    time: "14:00",
    teacher: "Juliana Souza",
    spots: 12,
  },
  {
    id: "2",
    title: "Criando e-mail pela primeira vez",
    description:
      "Passo a passo para criar uma conta de e-mail e entender como usá-la no dia a dia.",
    category: "Internet",
    level: "Básico",
    date: "12/04/2026",
    time: "10:00",
    teacher: "Carlos Lima",
    spots: 15,
  },
  {
    id: "3",
    title: "Currículo e busca de vagas online",
    description:
      "Aprenda a montar um currículo simples e procurar oportunidades pela internet.",
    category: "Emprego",
    level: "Intermediário",
    date: "15/04/2026",
    time: "09:30",
    teacher: "Fernanda Alves",
    spots: 10,
  },
  {
    id: "4",
    title: "Segurança digital no dia a dia",
    description:
      "Saiba reconhecer golpes, proteger senhas e navegar com mais confiança.",
    category: "Segurança",
    level: "Básico",
    date: "18/04/2026",
    time: "16:00",
    teacher: "Ricardo Santos",
    spots: 18,
  },
  {
    id: "5",
    title: "Aplicativos úteis para idosos",
    description:
      "Conheça aplicativos para conversa, saúde, transporte e serviços do dia a dia.",
    category: "Smartphone",
    level: "Básico",
    date: "20/04/2026",
    time: "15:00",
    teacher: "Marina Costa",
    spots: 14,
  },
  {
    id: "6",
    title: "Como acessar serviços públicos online",
    description:
      "Aprenda a usar plataformas digitais para agendamento e serviços essenciais.",
    category: "Cidadania digital",
    level: "Intermediário",
    date: "22/04/2026",
    time: "11:00",
    teacher: "Paulo Mendes",
    spots: 20,
  },
];

export const categories = [
  "Todas",
  "Smartphone",
  "Internet",
  "Emprego",
  "Segurança",
  "Cidadania digital",
];
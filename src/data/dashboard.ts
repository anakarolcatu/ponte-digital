import type { DashboardStat, UpcomingActivity } from "../types/dashboard";

export const statsMock: DashboardStat[] = [
  {
    title: "Beneficiários atendidos",
    value: "200",
    description: "Jovens e idosos impactados diretamente",
  },
  {
    title: "Voluntários ativos",
    value: "50",
    description: "Pessoas ensinando tecnologia regularmente",
  },
  {
    title: "Aulas realizadas",
    value: "85",
    description: "Encontros concluídos com apoio humanizado",
  },
  {
    title: "Autonomia digital",
    value: "80%",
    description: "Participantes com evolução em habilidades básicas",
  },
];

export const upcomingActivitiesMock: UpcomingActivity[] = [
  {
    title: "WhatsApp básico",
    date: "10/04/2026",
    time: "14:00",
    audience: "Idosos",
  },
  {
    title: "Criando e-mail e currículo",
    date: "12/04/2026",
    time: "10:00",
    audience: "Jovens",
  },
  {
    title: "Serviços públicos online",
    date: "15/04/2026",
    time: "11:00",
    audience: "Comunidade geral",
  },
];

export const impactItemsMock: string[] = [
  "70% dos idosos conseguem usar aplicativos essenciais com mais independência.",
  "30% dos jovens aplicam o aprendizado em busca de emprego ou renda.",
  "Redução da dependência de terceiros em atividades digitais do cotidiano.",
  "Aumento no uso de serviços públicos digitais pelas comunidades atendidas.",
];
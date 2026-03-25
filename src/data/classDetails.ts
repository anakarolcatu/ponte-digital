export interface ClassDetails {
  classId: string;
  enrolledCount: number;
  targetAudience: string;
  objective: string;
  materials: string[];
  notes: string;
}

export const classDetailsMock: ClassDetails[] = [
  {
    classId: "1",
    enrolledCount: 12,
    targetAudience: "Idosos iniciantes no uso de smartphone",
    objective: "Ensinar o uso básico do WhatsApp para comunicação no dia a dia.",
    materials: ["Celular com WhatsApp instalado", "Internet móvel ou Wi-Fi"],
    notes:
      "Priorizar linguagem simples, prática guiada e repetição dos passos principais.",
  },
  {
    classId: "2",
    enrolledCount: 15,
    targetAudience: "Jovens em busca de oportunidades de estudo e trabalho",
    objective: "Ajudar os participantes a criar e usar e-mail com autonomia.",
    materials: ["Celular ou computador", "Acesso à internet"],
    notes:
      "Mostrar criação de conta, envio de mensagem e recuperação de senha.",
  },
  {
    classId: "3",
    enrolledCount: 10,
    targetAudience: "Jovens em preparação para o mercado de trabalho",
    objective: "Orientar sobre currículo simples e busca de vagas online.",
    materials: ["Modelo de currículo", "Acesso à internet"],
    notes:
      "Focar em plataformas acessíveis e exemplos práticos de vagas.",
  },
  {
    classId: "4",
    enrolledCount: 18,
    targetAudience: "Comunidade geral",
    objective: "Promover hábitos básicos de segurança digital.",
    materials: ["Exemplos de golpes comuns", "Acesso à internet"],
    notes:
      "Reforçar cuidados com links, senhas e mensagens suspeitas.",
  },
  {
    classId: "5",
    enrolledCount: 14,
    targetAudience: "Idosos",
    objective: "Apresentar aplicativos úteis para comunicação e serviços do dia a dia.",
    materials: ["Celular com apps instalados", "Internet"],
    notes:
      "Usar demonstração prática e repetir os principais fluxos.",
  },
  {
    classId: "6",
    enrolledCount: 20,
    targetAudience: "Comunidade geral",
    objective: "Ensinar acesso a serviços públicos digitais essenciais.",
    materials: ["Celular ou computador", "Conta gov.br quando aplicável"],
    notes:
      "Explicar passo a passo com exemplos reais e linguagem acessível.",
  },
];
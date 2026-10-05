import type { Application, ChatMessage, Company, Job } from './types'

/** Dados de exemplo (fictícios) usados no protótipo. */
export const companies: Company[] = [
  { id: 'ts', name: 'Tech Solutions', initials: 'TS', color: '#0E1B3D', area: 'Tecnologia', vagas: 5, distance: '1,2 km', city: 'Aracaju, SE', mapX: 95, mapY: 70, rating: '4,6', hired: 12,
    about: 'Software house sergipana que desenvolve sistemas web e mobile. Programa de estágio com mentoria e trilha de efetivação.', culture: ['Horário flexível', 'Mentoria', 'Efetivação'] },
  { id: 'ac', name: 'AgroConect', initials: 'AC', color: '#13824A', area: 'Agronegócio', vagas: 3, distance: '52 km', city: 'Itabaiana, SE', mapX: 820, mapY: 40, rating: '4,4', hired: 6,
    about: 'Plataforma que conecta produtores rurais e consumidores, com foco em sustentabilidade e dados do campo.', culture: ['Remoto', 'Impacto social', 'Dados'] },
  { id: 'nx', name: 'Nexa Digital', initials: 'N', color: '#3D2DB5', area: 'Software', vagas: 4, distance: '2,8 km', city: 'Aracaju, SE', mapX: 560, mapY: 100, rating: '4,7', hired: 9,
    about: 'Estúdio de produtos digitais especializado em apps mobile para startups do Nordeste.', culture: ['Squads ágeis', 'Remoto', 'Aprendizado'] },
  { id: 'sh', name: 'Sergipe Tech Hub', initials: 'SH', color: '#C2410C', area: 'Tecnologia', vagas: 6, distance: '0,9 km', city: 'Aracaju, SE', mapX: 330, mapY: 250, rating: '4,5', hired: 15,
    about: 'Hub de inovação que oferece infraestrutura em nuvem e suporte técnico para empresas sergipanas.', culture: ['Cloud', 'Eventos', 'Networking'] },
  { id: 'mv', name: 'Mar Verde Energia', initials: 'MV', color: '#0F766E', area: 'Energia', vagas: 2, distance: '3,4 km', city: 'Aracaju, SE', mapX: 760, mapY: 300, rating: '4,8', hired: 4,
    about: 'Empresa de energia renovável que usa dados para otimizar parques solares e eólicos no litoral.', culture: ['Sustentabilidade', 'Dados', 'Híbrido'] },
  { id: 'vs', name: 'Vida+ Saúde Digital', initials: 'V+', color: '#BE185D', area: 'Healthtech', vagas: 3, distance: '2,1 km', city: 'Aracaju, SE', mapX: 470, mapY: 420, rating: '4,6', hired: 7,
    about: 'Healthtech que desenvolve prontuário eletrônico e telemedicina para clínicas do interior.', culture: ['Propósito', 'Remoto', 'Front-end'] },
  { id: 'pn', name: 'Pixel Norte Studio', initials: 'PN', color: '#B45309', area: 'Games e Design', vagas: 2, distance: '1,6 km', city: 'Aracaju, SE', mapX: 210, mapY: 470, rating: '4,9', hired: 3,
    about: 'Estúdio de design e games independentes, com projetos para clientes do Brasil e do exterior.', culture: ['Criatividade', 'UX', 'Games'] },
  { id: 'fa', name: 'FinAju', initials: 'FA', color: '#0369A1', area: 'Fintech', vagas: 4, distance: '4,2 km', city: 'Aracaju, SE', mapX: 660, mapY: 590, rating: '4,3', hired: 10,
    about: 'Fintech de crédito para pequenos negócios, com time de engenharia 100% sergipano.', culture: ['Back-end', 'Java', 'Crescimento'] },
  { id: 'ln', name: 'Logi Nordeste', initials: 'LN', color: '#4D7C0F', area: 'Logística', vagas: 2, distance: '6,8 km', city: 'N. Sra. do Socorro, SE', mapX: 90, mapY: 640, rating: '4,2', hired: 5,
    about: 'Operadora logística que automatiza rotas e armazéns com RPA e análise de dados.', culture: ['Automação', 'Presencial', 'Processos'] },
]

export const jobs: Job[] = [
  { id: 'j1', companyId: 'ts', title: 'Desenvolvedor Python · Estágio', city: 'Aracaju, SE', mode: 'Híbrido', pay: 'R$ 1.500 – 2.000', tags: ['Python', 'Git', 'SQL'], compat: 92,
    summary: 'Atuação no desenvolvimento de aplicações web, manutenção de sistemas e suporte à equipe de desenvolvimento, com mentoria de um dev sênior.', benefits: ['Vale-transporte', 'Vale-refeição', 'Mentoria'] },
  { id: 'j2', companyId: 'ac', title: 'Estágio em Ciência de Dados', city: 'Itabaiana, SE', mode: 'Remoto', pay: 'R$ 1.200 – 1.800', tags: ['Python', 'Pandas', 'SQL'], compat: 86,
    summary: 'Análise de dados para apoiar decisões estratégicas no setor agro, com foco em sustentabilidade e inovação.', benefits: ['Auxílio home office', 'Horário flexível'] },
  { id: 'j3', companyId: 'nx', title: 'Desenvolvimento de App Mobile', city: 'Aracaju, SE', mode: 'Remoto', pay: 'R$ 800 – 1.200', tags: ['Flutter', 'Dart', 'Firebase'], compat: 80, isProject: true,
    summary: 'Projeto de 3 meses para desenvolver um aplicativo mobile de gestão de tarefas e produtividade.', benefits: ['Certificado', 'Portfólio'] },
  { id: 'j4', companyId: 'sh', title: 'Estágio em Suporte e Infraestrutura', city: 'Aracaju, SE', mode: 'Presencial', pay: 'R$ 1.100 – 1.400', tags: ['Linux', 'Redes', 'Cloud'], compat: 78,
    summary: 'Suporte técnico a clientes do hub, configuração de servidores Linux e monitoramento de ambientes em nuvem.', benefits: ['Vale-transporte', 'Certificações pagas'] },
  { id: 'j5', companyId: 'mv', title: 'Estágio em Análise de Dados', city: 'Aracaju, SE', mode: 'Híbrido', pay: 'R$ 1.400 – 1.800', tags: ['Python', 'Power BI', 'SQL'], compat: 88,
    summary: 'Criação de painéis de geração de energia e análise de desempenho dos parques solares.', benefits: ['Vale-refeição', 'Plano de saúde'] },
  { id: 'j6', companyId: 'vs', title: 'Estágio em Front-end', city: 'Aracaju, SE', mode: 'Remoto', pay: 'R$ 1.300 – 1.700', tags: ['React', 'TypeScript', 'CSS'], compat: 84,
    summary: 'Desenvolvimento de telas do prontuário eletrônico e da plataforma de telemedicina.', benefits: ['Auxílio home office', 'Mentoria'] },
  { id: 'j7', companyId: 'pn', title: 'Estágio em UI/UX Design', city: 'Aracaju, SE', mode: 'Híbrido', pay: 'R$ 1.000 – 1.300', tags: ['Figma', 'Prototipação', 'UX'], compat: 81,
    summary: 'Criação de interfaces e protótipos para jogos e apps de clientes do estúdio.', benefits: ['Horário flexível', 'Cursos'] },
  { id: 'j8', companyId: 'fa', title: 'Estágio em Back-end', city: 'Aracaju, SE', mode: 'Presencial', pay: 'R$ 1.600 – 2.100', tags: ['Java', 'Spring', 'SQL'], compat: 76,
    summary: 'Desenvolvimento de APIs de crédito e integração com parceiros bancários.', benefits: ['Vale-refeição', 'Plano de saúde', 'Bônus'] },
  { id: 'j9', companyId: 'ln', title: 'Estágio em Automação de Processos', city: 'N. Sra. do Socorro, SE', mode: 'Presencial', pay: 'R$ 1.200 – 1.500', tags: ['Python', 'RPA', 'Excel'], compat: 73,
    summary: 'Automação de rotinas de armazém e roteirização de entregas com robôs de software.', benefits: ['Vale-transporte', 'Refeitório'] },
  { id: 'j10', companyId: 'ts', title: 'Estágio em QA e Testes', city: 'Aracaju, SE', mode: 'Presencial', pay: 'R$ 1.300 – 1.600', tags: ['Testes', 'Selenium', 'Git'], compat: 74,
    summary: 'Planejamento e execução de testes manuais e automatizados dos sistemas da Tech Solutions.', benefits: ['Vale-transporte', 'Mentoria'] },
]

export const RECOMMENDED_IDS = ['j1', 'j2', 'j3']
export const STEPS = ['Enviada', 'Em análise', 'Entrevista', 'Resultado'] as const

export const initialApplications: Application[] = [
  { id: 'a1', jobId: 'j2', step: 2, sentAgo: 'enviada há 8 dias', note: 'Entrevista online · Qui, 02/10 às 10h' },
  { id: 'a2', jobId: 'j3', step: 1, sentAgo: 'enviada há 5 dias' },
]

export const initialChats: Record<string, ChatMessage[]> = {
  ts: [
    { text: 'Oi, Lucas! Gostamos muito do seu perfil e dos seus projetos em Python.', mine: false, time: '10:24' },
    { text: 'Você teria disponibilidade para uma conversa online na quinta às 10h?', mine: false, time: '10:25' },
    { text: 'Olá, Ana! Tenho sim, quinta às 10h fica ótimo.', mine: true, time: '10:31' },
  ],
}

export const companyById = (id: string): Company => companies.find((c) => c.id === id) ?? companies[0]
export const jobById = (id: string): Job => jobs.find((j) => j.id === id) ?? jobs[0]
export const companyOf = (job: Job): Company => companyById(job.companyId)
export const jobsOf = (companyId: string): Job[] => jobs.filter((j) => j.companyId === companyId)

export const defaultGreeting = (companyId: string): ChatMessage[] => [
  { text: `Olá, Lucas! Aqui é do time de pessoas da ${companyById(companyId).name}. Como podemos ajudar?`, mine: false, time: '09:00' },
]

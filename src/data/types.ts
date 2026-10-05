export type Mode = 'Remoto' | 'Híbrido' | 'Presencial'

export interface Company {
  id: string
  name: string
  initials: string
  color: string
  area: string
  vagas: number
  distance: string
  city: string
  /** posição no mapa ilustrado (px, mapa de 1000×720) */
  mapX: number
  mapY: number
  rating: string
  hired: number
  about: string
  culture: string[]
}

export interface Job {
  id: string
  companyId: string
  title: string
  city: string
  mode: Mode
  pay: string
  tags: string[]
  compat: number
  isProject?: boolean
  summary: string
  benefits: string[]
}

/** 0 Enviada · 1 Em análise · 2 Entrevista · 3 Resultado */
export type ApplicationStep = 0 | 1 | 2 | 3

export interface Application {
  id: string
  jobId: string
  step: ApplicationStep
  sentAgo: string
  note?: string
}

export interface ChatMessage {
  text: string
  mine: boolean
  time: string
}

export type Stage = 'splash' | 'onboarding' | 'login' | 'signup' | 'main'
export type Tab = 'curriculo' | 'oportunidades' | 'perfil' | 'empresas'

/** Rotas empilhadas dentro de cada aba */
export type Route =
  | { name: 'job'; id: string }
  | { name: 'company'; id: string }
  | { name: 'chat'; id: string }
  | { name: 'notifications' }
  | { name: 'applications' }
  | { name: 'map' }

export type Sheet = { name: 'apply'; jobId: string } | { name: 'editResume' } | null

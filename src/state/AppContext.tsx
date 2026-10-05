import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import type { Application, ChatMessage, Route, Sheet, Stage, Tab } from '../data/types'
import { defaultGreeting, initialApplications, initialChats } from '../data/mock'

export const routeKey = (r: Route | null): string =>
  !r ? 'root' : 'id' in r ? `${r.name}:${r.id}` : r.name

export type JobFilter = 'Todos' | 'Estágio' | 'Projetos' | 'Remoto' | 'Presencial' | 'Híbrido'

interface State {
  stage: Stage
  onboardingIndex: number
  tab: Tab
  stacks: Record<Tab, Route[]>
  favorites: Set<string>
  following: Set<string>
  applications: Application[]
  chats: Record<string, ChatMessage[]>
  sheet: Sheet
  cover: string | null
  mapSel: string | null
  allRead: boolean
  /** filtros que continuam salvos ao navegar */
  query: string
  filter: JobFilter
  companyQuery: string
  area: string | null
}

const initialState = (): State => ({
  stage: 'splash',
  onboardingIndex: 0,
  tab: 'perfil',
  stacks: { curriculo: [], oportunidades: [], perfil: [], empresas: [] },
  favorites: new Set(['j1']),
  following: new Set(),
  applications: initialApplications.map((a) => ({ ...a })),
  chats: Object.fromEntries(Object.entries(initialChats).map(([k, v]) => [k, [...v]])),
  sheet: null,
  cover: null,
  mapSel: null,
  allRead: false,
  query: '',
  filter: 'Todos',
  companyQuery: '',
  area: null,
})

export interface Toast { id: number; text: string }

interface Actions {
  reset: () => void
  setStage: (s: Stage) => void
  nextOnboarding: () => void
  setTab: (t: Tab) => void
  push: (r: Route) => void
  back: () => void
  toggleFavorite: (jobId: string) => void
  toggleFollow: (companyId: string) => void
  goToMap: () => void
  openSheet: (s: Sheet) => void
  closeSheet: () => void
  sendApplication: (jobId: string) => void
  successTrack: () => void
  successMore: () => void
  selectOnMap: (companyId: string | null) => void
  sendMessage: (companyId: string, text: string) => void
  markAllRead: () => void
  setQuery: (q: string) => void
  setFilter: (f: JobFilter) => void
  setCompanyQuery: (q: string) => void
  setArea: (a: string | null) => void
  toast: (text: string) => void
}

interface Ctx {
  state: State
  top: Route | null
  toasts: Toast[]
  actions: Actions
}

const AppContext = createContext<Ctx | null>(null)

const now = () => {
  const d = new Date()
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(initialState)
  const [toasts, setToasts] = useState<Toast[]>([])
  const stacks = state.stacks[state.tab]
  const top = stacks[stacks.length - 1] ?? null

  // referência sempre atual da rota do topo (usada pela resposta automática do chat)
  const topRef = useRef<Route | null>(top)
  const stateRef = useRef<State>(state)
  useEffect(() => { topRef.current = top; stateRef.current = state }, [top, state])

  const patch = useCallback((fn: (s: State) => Partial<State>) => setState((s) => ({ ...s, ...fn(s) })), [])

  const toast = useCallback((text: string) => {
    const id = Date.now() + Math.random()
    setToasts((t) => [...t, { id, text }])
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2200)
  }, [])

  const actions = useMemo<Actions>(() => {
    const withStack = (s: State, fn: (r: Route[]) => Route[]) => ({ stacks: { ...s.stacks, [s.tab]: fn(s.stacks[s.tab]) } })
    return {
      reset: () => setState(initialState()),
      setStage: (stage) => patch(() => (stage === 'main' ? { stage, tab: 'perfil' } : { stage })),
      nextOnboarding: () => patch((s) => (s.onboardingIndex < 2 ? { onboardingIndex: s.onboardingIndex + 1 } : { stage: 'login' })),
      setTab: (tab) => patch((s) => (s.tab === tab ? { stacks: { ...s.stacks, [tab]: [] } } : { tab })),
      push: (r) => patch((s) => withStack(s, (st) => [...st, r])),
      back: () => patch((s) => withStack(s, (st) => st.slice(0, -1))),
      toggleFavorite: (id) => patch((s) => {
        const f = new Set(s.favorites)
        if (f.has(id)) f.delete(id)
        else f.add(id)
        return { favorites: f }
      }),
      toggleFollow: (id) => {
        const wasFollowing = stateRef.current.following.has(id)
        patch((s) => {
          const f = new Set(s.following)
          if (wasFollowing) f.delete(id)
          else f.add(id)
          return { following: f }
        })
        toast(wasFollowing ? 'Você deixou de seguir.' : 'Agora você segue esta empresa.')
      },
      goToMap: () => patch((s) => ({ tab: 'empresas', stacks: { ...s.stacks, empresas: [{ name: 'map' }] } })),
      openSheet: (sheet) => patch(() => ({ sheet })),
      closeSheet: () => patch(() => ({ sheet: null })),
      sendApplication: (jobId) => patch((s) => ({
        applications: s.applications.some((a) => a.jobId === jobId)
          ? s.applications
          : [{ id: `n${Date.now()}`, jobId, step: 0, sentAgo: 'enviada hoje' }, ...s.applications],
        sheet: null,
        cover: jobId,
      })),
      successTrack: () => patch((s) => ({ cover: null, ...withStack(s, (st) => [...st, { name: 'applications' }]) })),
      successMore: () => patch((s) => ({ cover: null, tab: 'oportunidades', stacks: { ...s.stacks, oportunidades: [] } })),
      selectOnMap: (mapSel) => patch(() => ({ mapSel })),
      sendMessage: (companyId, text) => {
        const time = now()
        patch((s) => ({
          chats: { ...s.chats, [companyId]: [...(s.chats[companyId] ?? defaultGreeting(companyId)), { text, mine: true, time }] },
        }))
        window.setTimeout(() => {
          const r = topRef.current
          if (!r || r.name !== 'chat' || r.id !== companyId) return
          patch((s) => ({
            chats: {
              ...s.chats,
              [companyId]: [...(s.chats[companyId] ?? []), { text: 'Obrigada pela mensagem! Vou verificar e te retorno ainda hoje.', mine: false, time }],
            },
          }))
        }, 1600)
      },
      markAllRead: () => patch(() => ({ allRead: true })),
      setQuery: (query) => patch(() => ({ query })),
      setFilter: (filter) => patch(() => ({ filter })),
      setCompanyQuery: (companyQuery) => patch(() => ({ companyQuery })),
      setArea: (area) => patch(() => ({ area })),
      toast,
    }
  }, [patch, toast])

  const value = useMemo(() => ({ state, top, toasts, actions }), [state, top, toasts, actions])
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp(): Ctx {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp precisa estar dentro de <AppProvider>')
  return ctx
}

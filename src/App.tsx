import { useLayoutEffect, useRef, useState } from 'react'
import { TabBar, Toasts } from './components/ui'
import type { Route, Tab } from './data/types'
import { Login, Onboarding, Signup, Splash } from './screens/Access'
import { Applications, Chat, CompanyDetail, FullMap, JobDetail, Notifications } from './screens/Details'
import { ApplySheet, EditResumeSheet, SuccessCover } from './screens/Overlays'
import { Curriculo, Empresas, Oportunidades, Perfil } from './screens/Tabs'
import { AppProvider, routeKey, useApp } from './state/AppContext'

const ROOTS: Record<Tab, () => JSX.Element> = { curriculo: Curriculo, oportunidades: Oportunidades, perfil: Perfil, empresas: Empresas }

function RouteView({ route }: { route: Route }) {
  switch (route.name) {
    case 'job': return <JobDetail id={route.id} />
    case 'company': return <CompanyDetail id={route.id} />
    case 'chat': return <Chat id={route.id} />
    case 'notifications': return <Notifications />
    case 'applications': return <Applications />
    case 'map': return <FullMap />
  }
}

/** Raiz de uma aba, lembrando a posição de rolagem ao voltar de uma tela empilhada. */
function TabRoot({ tab }: { tab: Tab }) {
  const ref = useRef<HTMLDivElement>(null)
  const Root = ROOTS[tab]
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    el.scrollTop = scrollMemory[tab] ?? 0
    return () => { scrollMemory[tab] = el.scrollTop }
  }, [tab])
  return <div className="scroll" ref={ref}><Root /></div>
}
const scrollMemory: Partial<Record<Tab, number>> = {}

function MainStage() {
  const { state, top } = useApp()
  const key = `${state.tab}/${routeKey(top)}`
  return (
    <>
      <div key={key} className={`screen in-tabs ${top ? 'slide-in' : 'fade-in'}`}>
        {top ? <RouteView route={top} /> : <TabRoot tab={state.tab} />}
      </div>
      {top?.name !== 'chat' && <TabBar />}
    </>
  )
}

function Phone() {
  const { state } = useApp()
  return (
    <div className="phone" role="application" aria-label="Pró-Estágio">
      {state.stage === 'splash' && <Splash />}
      {state.stage === 'onboarding' && <Onboarding />}
      {state.stage === 'login' && <Login />}
      {state.stage === 'signup' && <Signup />}
      {state.stage === 'main' && <MainStage />}
      {state.sheet?.name === 'apply' && <ApplySheet key={state.sheet.jobId} jobId={state.sheet.jobId} />}
      {state.sheet?.name === 'editResume' && <EditResumeSheet />}
      {state.cover && <SuccessCover jobId={state.cover} />}
      <Toasts />
    </div>
  )
}

function Aside() {
  const { actions } = useApp()
  const [copyLabel, setCopyLabel] = useState('Copiar link')
  const copy = () => {
    const url = location.href.split('#')[0]
    const done = (label: string) => { setCopyLabel(label); window.setTimeout(() => setCopyLabel('Copiar link'), 2200) }
    if (navigator.clipboard) navigator.clipboard.writeText(url).then(() => done('Link copiado'), () => done('Copie da barra de endereço'))
    else done('Copie da barra de endereço')
  }
  return (
    <div className="aside">
      <span className="chip" style={{ alignSelf: 'flex-start' }}>Protótipo navegável · React + TypeScript</span>
      <h1>Pró-Estágio</h1>
      <p>Um app que reúne vagas de estágio, currículo e contato com empresas num só lugar. Tudo aqui funciona com dados de exemplo.</p>
      <ol>
        <li>Toque em <b>Começar</b> e entre com os dados já preenchidos.</li>
        <li>Em <b>Oportunidades</b>, abra uma vaga e envie uma candidatura.</li>
        <li>Em <b>Empresas</b>, arraste o carrossel e o mapa para explorar.</li>
        <li>Abra uma empresa e mande uma mensagem no chat.</li>
      </ol>
      <div className="row">
        <button type="button" className="pill-btn primary" onClick={actions.reset}>Recomeçar do início</button>
        <button type="button" className="pill-btn" onClick={copy}>{copyLabel}</button>
      </div>
      <p className="note">No celular, o app ocupa a tela inteira.</p>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <div className="wrap">
        <div className="device">
          <div className="island" />
          <Phone />
        </div>
        <Aside />
      </div>
    </AppProvider>
  )
}

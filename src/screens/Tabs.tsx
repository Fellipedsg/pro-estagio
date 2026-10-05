import { useMemo, useRef, type ReactNode } from 'react'
import { Icon, type IconName } from '../components/Icon'
import { IllustratedMap, useDragScroll } from '../components/IllustratedMap'
import { Chips, FeaturedCard, IconBox, JobCard, SectionHead, gradientBrand } from '../components/ui'
import { RECOMMENDED_IDS, companies, companyOf, jobs } from '../data/mock'
import type { Job } from '../data/types'
import { useApp, type JobFilter } from '../state/AppContext'

/* ---------------- Perfil ---------------- */
export function Perfil() {
  const { actions } = useApp()
  const shortcuts: [IconName, string, () => void][] = [
    ['target', 'Vagas para você', () => actions.setTab('oportunidades')],
    ['clipboard', 'Inscrições', () => actions.push({ name: 'applications' })],
    ['chat', 'Mensagens', () => actions.push({ name: 'chat', id: 'ts' })],
    ['bulb', 'Dicas e mentorias', () => actions.toast('Em breve: dicas de currículo e mentorias ao vivo.')],
  ]
  const skills: [string, string, number][] = [['Python', 'Avançado', 85], ['JavaScript', 'Avançado', 80], ['SQL', 'Intermediário', 60], ['Figma', 'Intermediário', 55]]
  const projects: [string, string, string, string, string[]][] = [
    ['P', 'Pró-Estágio', 'Plataforma que conecta estudantes a vagas de estágio.', '#13295C,#0A1638', ['Python', 'Figma', 'UX/UI']],
    ['A', 'AgroConect', 'Conexão entre produtores rurais e consumidores locais.', '#3FAE6E,#0E5E34', ['Python', 'Web', 'SQL']],
    ['F', 'FinançaJá', 'App de controle de gastos para universitários, com gráficos.', '#0369A1,#0B3A66', ['React', 'Node', 'SQL']],
    ['E', 'EcoRota', 'Caronas solidárias entre alunos do mesmo campus.', '#0F766E,#0B4A45', ['Dart', 'Maps', 'UX/UI']],
    ['S', 'StudyBot', 'Chatbot que monta cronogramas de estudo para as provas.', '#B45309,#7A3806', ['Python', 'IA', 'API']],
  ]
  return (
    <div className="pad">
      <div className="row">
        <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(160deg,#4C8DFF,var(--brand))', color: '#fff', display: 'grid', placeItems: 'center' }}><Icon name="cap" size={18} stroke={2} /></div>
        <b className="grow" style={{ fontSize: 17 }}>Pró-Estágio</b>
        <IconBox icon="bell" dot label="Notificações" onClick={() => actions.push({ name: 'notifications' })} />
        <button type="button" onClick={() => actions.setTab('curriculo')} style={{ height: 44, padding: '0 14px', borderRadius: 14, background: 'var(--brand-soft)', color: 'var(--brand)', fontSize: 13, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 6 }}>
          <Icon name="pencil" size={16} stroke={2} />Editar
        </button>
      </div>

      <div className="card" style={{ borderRadius: 24, padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div className="row" style={{ gap: 14 }}>
          <div className="avatar" style={{ width: 76, height: 76, fontSize: 26 }}>
            LS
            <span style={{ position: 'absolute', right: -2, bottom: -2, width: 28, height: 28, borderRadius: '50%', background: 'var(--brand)', border: '2px solid #fff', display: 'grid', placeItems: 'center' }}><Icon name="camera" size={14} stroke={2} /></span>
          </div>
          <div className="grow">
            <div style={{ fontSize: 21, fontWeight: 800 }}>Lucas Santos</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--brand)' }}>Sistemas de Informação</div>
            <div className="sub">Universidade Federal de Sergipe</div>
            <div className="meta" style={{ marginTop: 2 }}><span><Icon name="pin" size={13} stroke={2} />Aracaju, SE</span></div>
          </div>
        </div>
        <p className="sub" style={{ margin: 0, lineHeight: 1.5 }}>Estudante de tecnologia interessado em desenvolvimento de software, inovação e criação de soluções digitais.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
        {([['folder', '8', 'Projetos'], ['code', '12', 'Habilidades']] as [IconName, string, string][]).map(([i, v, l]) => (
          <div key={l} style={{ background: '#fff', borderRadius: 18, padding: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ color: 'var(--brand)' }}><Icon name={i} size={19} /></span>
            <b style={{ fontSize: 20 }}>{v}</b>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)' }}>{l}</span>
          </div>
        ))}
        <div style={{ background: 'var(--ok-soft)', borderRadius: 18, padding: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--ok)', color: '#fff', display: 'grid', placeItems: 'center' }}><Icon name="check" size={12} stroke={3} /></span>
          <b style={{ fontSize: 13, color: 'var(--ok-dark)', lineHeight: 1.25 }}>Disponível para estágio</b>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
        {shortcuts.map(([i, t, fn]) => (
          <button key={t} type="button" onClick={fn} style={{ height: 104, borderRadius: 20, background: 'linear-gradient(160deg,#5B9BFF,var(--brand))', color: '#fff', padding: '10px 8px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'left', boxShadow: '0 10px 20px rgba(20,99,243,.25)' }}>
            <span style={{ width: 36, height: 36, borderRadius: 12, background: 'rgba(255,255,255,.22)', display: 'grid', placeItems: 'center' }}><Icon name={i} size={19} stroke={2} /></span>
            <span style={{ fontSize: 11, fontWeight: 800, lineHeight: 1.2 }}>{t}</span>
          </button>
        ))}
      </div>

      <SectionHead title="Minhas habilidades" action="Ver todas" onAction={() => actions.setTab('curriculo')} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {skills.map(([n, l, v]) => (
          <div key={n} style={{ background: '#fff', borderRadius: 16, padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div className="between"><b style={{ fontSize: 13 }}>{n}</b><span style={{ fontSize: 11, fontWeight: 700, color: v >= 75 ? 'var(--brand)' : 'var(--muted)' }}>{l}</span></div>
            <div style={{ height: 6, borderRadius: 3, background: 'var(--line)' }}><div style={{ width: `${v}%`, height: 6, borderRadius: 3, background: v >= 75 ? 'var(--brand)' : 'var(--brand-light)' }} /></div>
          </div>
        ))}
      </div>

      <SectionHead title="Meus projetos" action="Ver todos" onAction={() => actions.setTab('curriculo')} />
      {projects.map(([i, t, d, g, tags]) => (
        <div key={t} className="card row" style={{ gap: 12, padding: 12 }}>
          <div className="logo" style={{ width: 64, height: 64, borderRadius: 16, background: `linear-gradient(${g})`, fontSize: 24 }}>{i}</div>
          <div className="grow" style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <b style={{ fontSize: 14 }}>{t}</b>
            <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--muted)' }}>{d}</span>
            <Chips items={tags} />
          </div>
          <span style={{ color: 'var(--subtle)' }}><Icon name="chev" size={18} stroke={2} /></span>
        </div>
      ))}
    </div>
  )
}

/* ---------------- Meu Currículo ---------------- */
function ResumeSection({ title, icon, children }: { title: string; icon: IconName; children: ReactNode }) {
  return (
    <div className="card" style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div className="row" style={{ gap: 8 }}>
        <span style={{ width: 28, height: 28, borderRadius: 9, background: 'var(--brand-soft)', color: 'var(--brand)', display: 'grid', placeItems: 'center' }}><Icon name={icon} size={15} stroke={2} /></span>
        <b className="grow" style={{ fontSize: 14 }}>{title}</b>
        <span style={{ color: 'var(--subtle)' }}><Icon name="chev" size={16} stroke={2} /></span>
      </div>
      {children}
    </div>
  )
}

export function Curriculo() {
  const { actions } = useApp()
  const experience: [string, string, boolean][] = [
    ['Estagiário em Desenvolvimento', 'Tech Solutions · 06/2024 – 12/2024', true],
    ['Projeto Acadêmico · Sistema de Gestão', 'UFS · 03/2024 – 06/2024', false],
  ]
  return (
    <div className="pad">
      <div className="row">
        <h1 className="h1 grow">Meu Currículo</h1>
        <IconBox icon="download" label="Baixar PDF" onClick={() => actions.toast('PDF do currículo gerado.')} />
        <IconBox icon="share" label="Compartilhar" onClick={() => actions.toast('Link do currículo copiado.')} />
      </div>
      <div style={{ borderRadius: 24, padding: 16, background: gradientBrand, color: '#fff', display: 'flex', gap: 14, alignItems: 'center', boxShadow: '0 12px 28px rgba(20,99,243,.28)' }}>
        <div className="avatar" style={{ width: 60, height: 60, fontSize: 20, background: 'rgba(255,255,255,.22)', border: '2px solid rgba(255,255,255,.6)' }}>LS</div>
        <div>
          <b style={{ fontSize: 18 }}>Lucas Santos</b>
          <div style={{ fontSize: 12, fontWeight: 600, opacity: 0.9 }}>Sistemas de Informação · UFS</div>
          <div style={{ fontSize: 12, fontWeight: 500 }}>Buscando estágio em tecnologia e desenvolvimento.</div>
        </div>
      </div>
      <ResumeSection title="Contato" icon="user">
        <div className="meta" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <span><Icon name="pin" size={14} stroke={2} />Aracaju, SE</span>
          <span><Icon name="mail" size={14} stroke={2} />lucas@email.com</span>
          <span><Icon name="phone" size={14} stroke={2} />(79) 99999-9999</span>
          <span><Icon name="link" size={14} stroke={2} />/in/lucassantos</span>
        </div>
      </ResumeSection>
      <ResumeSection title="Formação acadêmica" icon="cap">
        <div><b style={{ fontSize: 13 }}>Sistemas de Informação</b><div className="sub" style={{ fontSize: 12 }}>Universidade Federal de Sergipe (UFS)</div></div>
        <div className="chips">
          <span className="chip" style={{ background: 'var(--warn-soft)', color: 'var(--warn)' }}>Em andamento</span>
          <span className="chip" style={{ background: '#F0F3F9', color: 'var(--muted)' }}>Previsão: 12/2027</span>
        </div>
      </ResumeSection>
      <ResumeSection title="Experiência" icon="briefcase">
        {experience.map(([t, s, current]) => (
          <div key={t} className="row" style={{ alignItems: 'flex-start', gap: 12 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', marginTop: 4, background: current ? 'var(--brand)' : '#9BB8EE', boxShadow: current ? '0 0 0 4px var(--brand-soft)' : undefined }} />
            <div><b style={{ fontSize: 13 }}>{t}</b><div style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)' }}>{s}</div></div>
          </div>
        ))}
      </ResumeSection>
      <ResumeSection title="Habilidades" icon="star">
        <Chips items={['Python', 'Git', 'HTML', 'CSS', 'JavaScript', 'SQL', 'Figma']} style={{ fontSize: 12, padding: '6px 12px' }} />
      </ResumeSection>
      <button type="button" className="btn" onClick={() => actions.openSheet({ name: 'editResume' })}>
        <Icon name="pencil" size={18} stroke={2} />Editar currículo
      </button>
    </div>
  )
}

/* ---------------- Oportunidades ---------------- */
const FILTERS: JobFilter[] = ['Todos', 'Estágio', 'Projetos', 'Remoto', 'Presencial', 'Híbrido']

function matches(job: Job, query: string, filter: JobFilter) {
  const q = query.trim().toLowerCase()
  if (q && !`${job.title} ${companyOf(job).name} ${job.tags.join(' ')}`.toLowerCase().includes(q)) return false
  switch (filter) {
    case 'Estágio': return !job.isProject
    case 'Projetos': return !!job.isProject
    case 'Remoto': case 'Presencial': case 'Híbrido': return job.mode === filter
    default: return true
  }
}

export function Oportunidades() {
  const { state, actions } = useApp()
  const filtersRef = useRef<HTMLDivElement>(null)
  const guard = useDragScroll(filtersRef, false)
  const { recommended, nearby } = useMemo(() => {
    const list = jobs.filter((j) => matches(j, state.query, state.filter))
    return {
      recommended: list.filter((j) => RECOMMENDED_IDS.includes(j.id)),
      nearby: list.filter((j) => !RECOMMENDED_IDS.includes(j.id)),
    }
  }, [state.query, state.filter])

  return (
    <div className="pad">
      <div className="row" style={{ alignItems: 'flex-start' }}>
        <div className="grow">
          <h1 className="h1">Oportunidades</h1>
          <div className="sub" style={{ marginTop: 4 }}>Encontre vagas que combinam com você.</div>
        </div>
        <IconBox icon="bell" dot label="Notificações" onClick={() => actions.push({ name: 'notifications' })} />
      </div>
      <div className="row">
        <div className="input grow" style={{ height: 50 }}>
          <span style={{ color: 'var(--subtle)' }}><Icon name="search" size={19} /></span>
          <input placeholder="Buscar estágio, empresa ou tecnologia" value={state.query} onChange={(e) => actions.setQuery(e.target.value)} style={{ fontSize: 14 }} aria-label="Buscar vagas" />
          {state.query && (
            <button type="button" aria-label="Limpar busca" style={{ color: 'var(--subtle)' }} onClick={() => actions.setQuery('')}><Icon name="x" size={16} stroke={2.4} /></button>
          )}
        </div>
        <span style={{ width: 50, height: 50, borderRadius: 16, background: 'var(--brand)', color: '#fff', display: 'grid', placeItems: 'center', flexShrink: 0 }}><Icon name="sliders" size={20} stroke={2} /></span>
      </div>
      <div className="hscroll" ref={filtersRef} onClickCapture={guard}>
        {FILTERS.map((f) => {
          const on = state.filter === f
          return (
            <button key={f} type="button" onClick={() => actions.setFilter(f)} aria-pressed={on}
              style={{ height: 36, padding: '0 16px', borderRadius: 999, flexShrink: 0, fontSize: 13, fontWeight: on ? 800 : 700, ...(on ? { background: 'var(--brand)', color: '#fff' } : { background: '#fff', border: '1px solid var(--line)' }) }}>
              {f}
            </button>
          )
        })}
      </div>

      {recommended.length > 0 && (
        <>
          <SectionHead title="Recomendadas para você" action="Ver todas" onAction={() => actions.setFilter('Todos')} />
          {recommended.map((j) => <JobCard key={j.id} job={j} highlight={j.id === 'j1'} />)}
        </>
      )}
      {nearby.length > 0 && (
        <>
          <div style={{ marginTop: 6 }}><SectionHead title="Perto de você" action="Ver no mapa" onAction={actions.goToMap} /></div>
          {nearby.map((j) => <JobCard key={j.id} job={j} />)}
        </>
      )}
      {recommended.length === 0 && nearby.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--muted)' }}>
          <div style={{ color: 'var(--subtle)' }}><Icon name="search" size={30} /></div>
          <b style={{ display: 'block', color: 'var(--ink)', marginTop: 8 }}>Nenhuma vaga encontrada</b>
          Tente outro termo ou filtro.
        </div>
      )}
    </div>
  )
}

/* ---------------- Empresas ---------------- */
const AREAS: [string, IconName, string][] = [
  ['Dev', 'code', 'Tecnologia'], ['Dados', 'chart', 'Energia'], ['Design', 'brush', 'Games e Design'], ['Saúde', 'health', 'Healthtech'], ['Finanças', 'money', 'Fintech'],
]

export function Empresas() {
  const { state, actions } = useApp()
  const carouselRef = useRef<HTMLDivElement>(null)
  const guard = useDragScroll(carouselRef, false)
  const q = state.companyQuery.trim().toLowerCase()
  const list = companies.filter((c) => (!q || c.name.toLowerCase().includes(q) || c.area.toLowerCase().includes(q)) && (!state.area || c.area === state.area))
  const filtered = !!state.area || !!state.companyQuery

  return (
    <div className="pad">
      <div>
        <h1 className="h1">Empresas</h1>
        <div className="sub" style={{ marginTop: 4 }}>Conheça quem está contratando estagiários.</div>
      </div>
      <div className="input" style={{ height: 50 }}>
        <span style={{ color: 'var(--subtle)' }}><Icon name="search" size={19} /></span>
        <input placeholder="Buscar empresa ou área" value={state.companyQuery} style={{ fontSize: 14 }} aria-label="Buscar empresas"
          onChange={(e) => { actions.setCompanyQuery(e.target.value); carouselRef.current?.scrollTo(0, 0) }} />
      </div>
      <SectionHead title="Em destaque" action={filtered ? 'Limpar filtro' : 'Ver todas'} onAction={() => { actions.setArea(null); actions.setCompanyQuery('') }} />
      <div className="hscroll" ref={carouselRef} onClickCapture={guard}>
        {list.length ? list.map((c) => <FeaturedCard key={c.id} company={c} />) : <span className="sub" style={{ padding: '20px 0' }}>Nenhuma empresa encontrada.</span>}
      </div>
      <SectionHead title="Explore por área" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 8 }}>
        {AREAS.map(([t, i, a]) => {
          const on = state.area === a
          const total = companies.filter((c) => c.area === a).reduce((s, c) => s + c.vagas, 0)
          return (
            <button key={a} type="button" aria-pressed={on} onClick={() => actions.setArea(on ? null : a)}
              style={{ height: 78, borderRadius: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, ...(on ? { background: 'var(--brand)', color: '#fff' } : { background: '#fff', border: '1px solid var(--line)' }) }}>
              <span style={{ color: on ? '#fff' : 'var(--brand)' }}><Icon name={i} size={19} /></span>
              <b style={{ fontSize: 11 }}>{t}</b>
              <span style={{ fontSize: 10, fontWeight: 600, opacity: 0.8 }}>{total} vagas</span>
            </button>
          )
        })}
      </div>
      <SectionHead title="Perto de você" action="Tela cheia" onAction={() => actions.push({ name: 'map' })} />
      <div style={{ position: 'relative' }}>
        <IllustratedMap height={300} onPin={(id) => actions.push({ name: 'company', id })} />
        <span style={{ position: 'absolute', left: 10, bottom: 10, padding: '6px 10px', borderRadius: 999, background: 'rgba(255,255,255,.9)', fontSize: 11, fontWeight: 700, pointerEvents: 'none' }}>Arraste para explorar</span>
      </div>
    </div>
  )
}

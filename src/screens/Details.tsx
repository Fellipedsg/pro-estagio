import { useEffect, useLayoutEffect, useRef, useState, type FormEvent } from 'react'
import { Icon, type IconName } from '../components/Icon'
import { IllustratedMap, useDragScroll } from '../components/IllustratedMap'
import { BackButton, Check, Chips, IconBox, Logo, Ring, SectionHead, gradientBrand } from '../components/ui'
import { STEPS, companies, companyById, companyOf, defaultGreeting, jobById, jobs, jobsOf } from '../data/mock'
import type { Route } from '../data/types'
import { useApp } from '../state/AppContext'

const h3 = { fontSize: 16 } as const
const para = { margin: 0, fontSize: 14, lineHeight: 1.6 } as const

/* ---------------- Detalhe da vaga ---------------- */
export function JobDetail({ id }: { id: string }) {
  const { state, actions } = useApp()
  const [tab, setTab] = useState(0)
  const j = jobById(id)
  const c = companyOf(j)
  const fav = state.favorites.has(j.id)
  const applied = state.applications.some((a) => a.jobId === j.id)
  const requirements = ['Cursando Sistemas de Informação, Computação ou áreas afins', ...j.tags.map((x) => `Conhecimento em ${x}`), 'Disponibilidade de 20 a 30 horas semanais']

  return (
    <>
      <div className="scroll" style={{ background: 'linear-gradient(#DCE8FF,var(--bg) 280px)' }}>
        <div className="pad" style={{ paddingBottom: 200 }}>
          <div className="row">
            <BackButton />
            <span className="grow" />
            <IconBox icon="share" label="Compartilhar" onClick={() => actions.toast('Link da vaga copiado.')} />
            <button type="button" className="iconbox" aria-label="Favoritar" aria-pressed={fav} onClick={() => actions.toggleFavorite(j.id)} style={{ color: fav ? 'var(--brand)' : 'var(--ink)' }}>
              <Icon name="heart" size={19} filled={fav} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, textAlign: 'center' }}>
            <Logo company={c} size={68} />
            <h1 style={{ fontSize: 22, fontWeight: 800, marginTop: 4 }}>{j.title}</h1>
            <button type="button" className="link" style={{ fontSize: 14 }} onClick={() => actions.push({ name: 'company', id: c.id })}>{c.name}</button>
            <Chips items={[j.city, j.mode, j.isProject ? 'Projeto' : '30h/semana']} style={{ background: '#fff', color: 'var(--muted)', fontSize: 12, padding: '6px 10px' }} />
          </div>
          <div className="card row" style={{ gap: 14, borderRadius: 22 }}>
            <Ring value={j.compat} size={64} width={6} />
            <div className="grow" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <b style={{ fontSize: 14 }}>{j.compat >= 85 ? 'Muito compatível com você' : 'Compatível com você'}</b>
              <Check>{Math.min(3, j.tags.length)} de {j.tags.length + 1} habilidades pedidas</Check>
              <Check>Curso compatível</Check>
            </div>
          </div>
          <div className="seg">
            {['Descrição', 'Requisitos', 'Empresa'].map((x, k) => (
              <button key={x} type="button" className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{x}</button>
            ))}
          </div>
          {tab === 0 && (
            <>
              <h3 className="h2" style={h3}>Sobre a vaga</h3>
              <p className="sub" style={para}>{j.summary}</p>
              <h3 className="h2" style={h3}>Benefícios</h3>
              <Chips items={j.benefits} style={{ background: 'var(--ok-soft)', color: 'var(--ok-dark)', fontSize: 12, padding: '6px 12px' }} />
            </>
          )}
          {tab === 1 && (
            <>
              <h3 className="h2" style={h3}>Requisitos</h3>
              {requirements.map((r) => <Check key={r}>{r}</Check>)}
            </>
          )}
          {tab === 2 && (
            <>
              <h3 className="h2" style={h3}>{c.name}</h3>
              <p className="sub" style={para}>{c.about}</p>
              <button type="button" className="link" style={{ textAlign: 'left', fontSize: 14, fontWeight: 800 }} onClick={() => actions.push({ name: 'company', id: c.id })}>Ver perfil da empresa</button>
            </>
          )}
        </div>
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 92, padding: '12px 20px', background: 'rgba(255,255,255,.96)', borderTop: '1px solid var(--line)', display: 'flex', gap: 14, alignItems: 'center', zIndex: 5 }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)' }}>{j.isProject ? 'Valor do projeto' : 'Bolsa-auxílio'}</div>
          <b style={{ fontSize: 16, whiteSpace: 'nowrap' }}>{j.pay.replace(/ – /, '–')}</b>
        </div>
        {applied ? (
          <button type="button" className="btn secondary grow" style={{ height: 52, fontSize: 15 }} onClick={() => actions.push({ name: 'applications' })}>
            <span style={{ color: 'var(--ok)' }}><Icon name="check" size={18} stroke={2.6} /></span>Candidatura enviada
          </button>
        ) : (
          <button type="button" className="btn grow" style={{ height: 52, fontSize: 15 }} onClick={() => actions.openSheet({ name: 'apply', jobId: j.id })}>
            Candidatar-se <Icon name="arrow" size={18} stroke={2} />
          </button>
        )}
      </div>
    </>
  )
}

/* ---------------- Perfil da empresa ---------------- */
export function CompanyDetail({ id }: { id: string }) {
  const { state, actions } = useApp()
  const c = companyById(id)
  const following = state.following.has(c.id)
  const stats: [string | number, string][] = [[c.vagas, 'Vagas abertas'], [`${c.rating} ★`, 'Avaliação'], [c.hired, 'Contratados']]
  return (
    <div className="scroll">
      <div style={{ height: 190, position: 'relative', overflow: 'hidden', background: `linear-gradient(150deg,${c.color}BB,${c.color})` }}>
        <div style={{ position: 'absolute', width: 260, height: 260, borderRadius: '50%', border: '40px solid rgba(255,255,255,.06)', right: -80, top: -90 }} />
        <div style={{ position: 'absolute', left: 20, top: 54 }}>
          <BackButton style={{ background: 'rgba(255,255,255,.18)', borderColor: 'transparent', color: '#fff' }} />
        </div>
      </div>
      <div className="pad" style={{ paddingTop: 0, marginTop: -44, position: 'relative' }}>
        <div style={{ border: '4px solid var(--bg)', borderRadius: 30, alignSelf: 'flex-start', boxShadow: '0 12px 24px rgba(14,27,61,.25)' }}><Logo company={c} size={88} /></div>
        <div>
          <div className="row" style={{ gap: 6 }}>
            <h1 style={{ fontSize: 24, fontWeight: 800 }}>{c.name}</h1>
            <span style={{ color: 'var(--brand)' }}><Icon name="check" size={18} filled /></span>
          </div>
          <div className="sub" style={{ fontWeight: 600 }}>{c.area} · {c.city} · {c.distance}</div>
        </div>
        <div className="row" style={{ gap: 10 }}>
          <button type="button" className={`btn ${following ? 'soft' : ''}`} style={{ height: 50, fontSize: 15 }} onClick={() => actions.toggleFollow(c.id)}>
            <Icon name={following ? 'check' : 'plus'} size={18} stroke={2.4} />{following ? 'Seguindo' : 'Seguir'}
          </button>
          <button type="button" className="btn secondary" style={{ height: 50, fontSize: 15 }} onClick={() => actions.push({ name: 'chat', id: c.id })}>
            <Icon name="chat" size={18} stroke={2} />Mensagem
          </button>
        </div>
        <div style={{ background: '#fff', borderRadius: 20, padding: '14px 4px', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }}>
          {stats.map(([v, l], k) => (
            <div key={l} style={{ textAlign: 'center', ...(k === 1 ? { borderLeft: '1px solid var(--line)', borderRight: '1px solid var(--line)' } : {}) }}>
              <b style={{ fontSize: 19, fontVariantNumeric: 'tabular-nums' }}>{v}</b>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)' }}>{l}</div>
            </div>
          ))}
        </div>
        <h3 className="h2" style={h3}>Sobre</h3>
        <p className="sub" style={para}>{c.about}</p>
        <Chips items={c.culture} style={{ fontSize: 12, padding: '6px 12px' }} />
        <SectionHead title="Vagas abertas" />
        {jobsOf(c.id).map((j) => (
          <button key={j.id} type="button" className="card between" style={{ textAlign: 'left', borderRadius: 18 }} onClick={() => actions.push({ name: 'job', id: j.id })}>
            <div className="grow">
              <b style={{ fontSize: 14 }}>{j.title}</b>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)' }}>{j.mode} · {j.pay}</div>
            </div>
            <span className="chip">{j.compat}%</span>
            <span style={{ color: 'var(--subtle)' }}><Icon name="chev" size={16} stroke={2} /></span>
          </button>
        ))}
      </div>
    </div>
  )
}

/* ---------------- Chat ---------------- */
export function Chat({ id }: { id: string }) {
  const { state, actions } = useApp()
  const [text, setText] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)
  const c = companyById(id)
  const messages = state.chats[id] ?? defaultGreeting(id)
  const job = jobs.find((x) => x.companyId === id)
  const applied = !!job && state.applications.some((a) => a.jobId === job.id)
  const isAna = id === 'ts'

  useLayoutEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages.length])

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const t = text.trim()
    if (!t) return
    actions.sendMessage(id, t)
    setText('')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="row" style={{ padding: '50px 16px 10px', background: '#fff', gap: 12 }}>
        <BackButton />
        <div className="avatar" style={{ width: 44, height: 44, fontSize: 15, background: 'linear-gradient(145deg,#FFC9A8,#E57C4A)' }}>
          {isAna ? 'AR' : c.initials}
          <span style={{ position: 'absolute', right: 0, bottom: 0, width: 12, height: 12, borderRadius: '50%', background: 'var(--ok)', border: '2px solid #fff' }} />
        </div>
        <div className="grow">
          <b style={{ fontSize: 15 }}>{isAna ? 'Ana Ribeiro' : 'Time de Pessoas'}</b>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)' }}>Recrutadora · {c.name}</div>
        </div>
        <span className="iconbox" style={{ background: 'var(--brand-soft)', border: 0, color: 'var(--brand)' }}><Icon name="phone" size={18} stroke={2} /></span>
      </div>
      <div className="scroll" ref={scrollRef} style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {job && (
          <button type="button" className="card row" style={{ padding: 10, borderRadius: 16, textAlign: 'left', flexShrink: 0 }} onClick={() => actions.push({ name: 'job', id: job.id })}>
            <Logo company={c} size={36} />
            <div className="grow">
              <b style={{ fontSize: 13 }}>{job.title}</b>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted)' }}>{applied ? 'Sua candidatura' : 'Vaga aberta'}</div>
            </div>
            <span className="chip" style={{ background: 'var(--warn-soft)', color: 'var(--warn)' }}>{applied ? 'Em análise' : 'Aberta'}</span>
          </button>
        )}
        <span style={{ alignSelf: 'center', padding: '4px 10px', borderRadius: 999, background: '#E7EDF8', fontSize: 11, fontWeight: 700, color: 'var(--muted)', flexShrink: 0 }}>Hoje</span>
        {messages.map((m, i) => (
          <div key={i} className={i === messages.length - 1 ? 'fade-in' : undefined} style={{ display: 'flex', flexDirection: 'column', alignItems: m.mine ? 'flex-end' : 'flex-start', gap: 4, flexShrink: 0 }}>
            <div style={{
              maxWidth: '78%', padding: '11px 14px', borderRadius: m.mine ? '18px 18px 6px 18px' : '18px 18px 18px 6px', fontSize: 14, lineHeight: 1.45, fontWeight: m.mine ? 600 : 500,
              ...(m.mine ? { background: 'var(--brand)', color: '#fff' } : { background: '#fff', boxShadow: '0 4px 12px rgba(14,27,61,.05)' }),
            }}>{m.text}</div>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--subtle)', display: 'flex', gap: 4, alignItems: 'center' }}>
              {m.time}{m.mine && <span style={{ color: 'var(--brand)' }}><Icon name="check" size={13} stroke={2.6} /></span>}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={submit} className="row" style={{ padding: '10px 16px calc(14px + env(safe-area-inset-bottom, 0px))', background: '#fff', gap: 10 }}>
        <span className="iconbox" style={{ background: 'var(--bg)', border: 0, color: 'var(--muted)' }}><Icon name="clip" size={18} /></span>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Escreva uma mensagem" autoComplete="off" aria-label="Mensagem"
          style={{ flex: 1, minWidth: 0, height: 44, borderRadius: 14, border: 0, background: 'var(--bg)', padding: '0 14px', fontSize: 14, outline: 0 }} />
        <button type="submit" aria-label="Enviar" style={{ width: 44, height: 44, borderRadius: 14, background: 'var(--brand)', color: '#fff', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
          <Icon name="send" size={18} stroke={2} />
        </button>
      </form>
    </div>
  )
}

/* ---------------- Notificações ---------------- */
interface Notice { icon: IconName; fg: string; bg: string; title: string; body: string; when: string; unread: boolean; to: Route; section: 'Hoje' | 'Esta semana' }
const NOTICES: Notice[] = [
  { icon: 'target', fg: '#fff', bg: 'var(--brand)', title: 'Nova vaga 88% compatível', body: 'Mar Verde Energia publicou “Estágio em Análise de Dados”.', when: 'há 12 min', unread: true, to: { name: 'job', id: 'j5' }, section: 'Hoje' },
  { icon: 'calendar', fg: '#0B7A45', bg: 'var(--ok-soft)', title: 'Entrevista agendada', body: 'AgroConect: quinta, 02/10, às 10h.', when: 'há 1 h', unread: true, to: { name: 'applications' }, section: 'Hoje' },
  { icon: 'chat', fg: '#E57C4A', bg: '#FFE9DC', title: 'Ana Ribeiro enviou uma mensagem', body: '“Você teria disponibilidade na quinta?”', when: 'há 3 h', unread: false, to: { name: 'chat', id: 'ts' }, section: 'Hoje' },
  { icon: 'bulb', fg: '#B26A00', bg: 'var(--warn-soft)', title: 'Dica: adicione um projeto de dados', body: 'Perfis com 3+ projetos recebem mais respostas.', when: 'seg', unread: false, to: { name: 'job', id: 'j2' }, section: 'Esta semana' },
  { icon: 'clock', fg: '#C4262E', bg: '#FDECEC', title: 'Vaga favorita encerra em 2 dias', body: 'Tech Solutions · Desenvolvedor Python', when: 'dom', unread: false, to: { name: 'job', id: 'j1' }, section: 'Esta semana' },
]

export function Notifications() {
  const { state, actions } = useApp()
  return (
    <div className="scroll">
      <div className="pad">
        <div className="row">
          <BackButton />
          <h1 className="grow" style={{ fontSize: 22, fontWeight: 800 }}>Notificações</h1>
          <button type="button" className="link" onClick={actions.markAllRead}>Marcar lidas</button>
        </div>
        {(['Hoje', 'Esta semana'] as const).map((section) => (
          <div key={section} style={{ display: 'contents' }}>
            <b style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>{section}</b>
            {NOTICES.filter((n) => n.section === section).map((n) => {
              const unread = n.unread && !state.allRead
              return (
                <button key={n.title} type="button" className={`card row ${unread ? 'hl' : ''}`} style={{ alignItems: 'flex-start', gap: 12, textAlign: 'left' }} onClick={() => actions.push(n.to)}>
                  <span style={{ width: 44, height: 44, borderRadius: 14, background: n.bg, color: n.fg, display: 'grid', placeItems: 'center', flexShrink: 0 }}><Icon name={n.icon} size={19} stroke={2} /></span>
                  <div className="grow">
                    <b style={{ fontSize: 14 }}>{n.title}</b>
                    <div className="sub" style={{ marginTop: 3 }}>{n.body}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--subtle)', marginTop: 3 }}>{n.when}</div>
                  </div>
                  {unread && <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--brand)', marginTop: 4 }} />}
                </button>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------------- Minhas candidaturas ---------------- */
function Stepper({ current }: { current: number }) {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {STEPS.map((_, i) => (
          <div key={i} style={{ display: 'contents' }}>
            <span style={{ flexShrink: 0, borderRadius: '50%', ...(i === current ? { width: 16, height: 16, background: '#fff', border: '4px solid var(--brand)' } : { width: 12, height: 12, background: i < current ? 'var(--brand)' : '#DCE3F0' }) }} />
            {i < STEPS.length - 1 && <span style={{ flex: 1, height: 3, borderRadius: 2, background: i < current ? 'var(--brand)' : '#DCE3F0' }} />}
          </div>
        ))}
      </div>
      <div className="between" style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', marginTop: -4 }}>
        {STEPS.map((s, i) => <span key={s} style={i === current ? { color: 'var(--brand)', fontWeight: 800 } : undefined}>{s}</span>)}
      </div>
    </>
  )
}

export function Applications() {
  const { state, actions } = useApp()
  const [seg, setSeg] = useState(0)
  const apps = state.applications
  const summary: [number, string][] = [[apps.length + 2, 'Enviadas'], [apps.filter((a) => a.step === 1).length, 'Em análise'], [apps.filter((a) => a.step === 2).length, 'Entrevista']]
  const finished: [string, string, string][] = [['Estágio em Marketing Digital', 'Nordeste Mídia', 'Não selecionado'], ['Monitoria de Programação', 'UFS', 'Concluído']]
  return (
    <div className="scroll">
      <div className="pad">
        <div className="row"><BackButton /><h1 className="grow" style={{ fontSize: 22, fontWeight: 800 }}>Minhas candidaturas</h1></div>
        <div style={{ borderRadius: 22, padding: '16px 0', background: gradientBrand, color: '#fff', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }}>
          {summary.map(([v, l], k) => (
            <div key={l} style={{ textAlign: 'center', borderLeft: k ? '1px solid rgba(255,255,255,.25)' : undefined }}>
              <b style={{ fontSize: 24 }}>{v}</b>
              <div style={{ fontSize: 12, fontWeight: 600, opacity: 0.9 }}>{l}</div>
            </div>
          ))}
        </div>
        <div className="seg">
          <button type="button" className={seg === 0 ? 'on' : ''} onClick={() => setSeg(0)}>Em andamento ({apps.length})</button>
          <button type="button" className={seg === 1 ? 'on' : ''} onClick={() => setSeg(1)}>Finalizadas (2)</button>
        </div>
        {seg === 0
          ? apps.map((a) => {
            const j = jobById(a.jobId)
            const c = companyOf(j)
            return (
              <button key={a.id} type="button" className="card" style={{ display: 'flex', flexDirection: 'column', gap: 12, textAlign: 'left', borderRadius: 22 }} onClick={() => actions.push({ name: 'job', id: j.id })}>
                <div className="row" style={{ gap: 12 }}>
                  <Logo company={c} size={44} />
                  <div className="grow">
                    <b style={{ fontSize: 14 }}>{j.title}</b>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)' }}>{c.name} · {a.sentAgo}</div>
                  </div>
                </div>
                <Stepper current={a.step} />
                {a.note && (
                  <div className="row" style={{ background: 'var(--brand-soft)', borderRadius: 14, padding: '10px 12px', gap: 10 }}>
                    <span style={{ color: 'var(--brand)' }}><Icon name="calendar" size={18} /></span>
                    <b className="grow" style={{ fontSize: 12, color: 'var(--brand-dark)' }}>{a.note}</b>
                    <span className="link" style={{ fontSize: 12 }}>Detalhes</span>
                  </div>
                )}
              </button>
            )
          })
          : finished.map(([t, c, r]) => (
            <div key={t} className="card row" style={{ gap: 12 }}>
              <span style={{ color: r === 'Concluído' ? 'var(--ok)' : 'var(--subtle)' }}><Icon name={r === 'Concluído' ? 'check' : 'x'} size={22} stroke={2.4} /></span>
              <div className="grow"><b style={{ fontSize: 14 }}>{t}</b><div style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)' }}>{c}</div></div>
              <span className="chip" style={{ background: '#F0F3F9', color: 'var(--muted)' }}>{r}</span>
            </div>
          ))}
      </div>
    </div>
  )
}

/* ---------------- Mapa em tela cheia ---------------- */
export function FullMap() {
  const { state, actions } = useApp()
  const mapRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const guard = useDragScroll(cardsRef, false)
  const shadow = '0 4px 12px rgba(14,27,61,.15)'
  const firstRun = useRef(true)

  useEffect(() => {
    const sel = state.mapSel
    const m = mapRef.current
    const first = firstRun.current
    firstRun.current = false
    if (!m) return
    if (!sel) { if (first) return; m.scrollTo({ left: 0, top: 0, behavior: 'smooth' }); return }
    const c = companyById(sel)
    m.scrollTo({ left: c.mapX - m.clientWidth / 2 + 80, top: c.mapY - m.clientHeight / 2 + 20, behavior: 'smooth' })
    document.getElementById(`mc-${sel}`)?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }, [state.mapSel])

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <IllustratedMap height="100%" scrollRef={mapRef} selected={state.mapSel} onPin={actions.selectOnMap} style={{ borderRadius: 0 }} />
      <div className="row" style={{ position: 'absolute', top: 50, left: 16, right: 16, pointerEvents: 'none' }}>
        <BackButton style={{ pointerEvents: 'auto', boxShadow: shadow }} />
        <span className="grow" style={{ textAlign: 'center' }}>
          <span style={{ display: 'inline-block', padding: '10px 14px', borderRadius: 999, background: '#fff', fontSize: 13, fontWeight: 800, boxShadow: shadow }}>{companies.length} empresas perto de você</span>
        </span>
        <button type="button" className="iconbox" aria-label="Minha localização" style={{ pointerEvents: 'auto', color: 'var(--brand)', boxShadow: shadow }} onClick={() => actions.selectOnMap(null)}>
          <Icon name="locate" size={18} stroke={2} />
        </button>
      </div>
      <div className="hscroll" ref={cardsRef} onClickCapture={guard} style={{ position: 'absolute', left: 0, right: 0, bottom: 96, margin: 0, padding: '4px 16px' }}>
        {companies.map((c) => (
          <div key={c.id} id={`mc-${c.id}`} style={{ width: 240, flexShrink: 0, background: '#fff', borderRadius: 20, padding: 12, display: 'flex', flexDirection: 'column', gap: 10, boxShadow: '0 8px 20px rgba(14,27,61,.15)', outline: state.mapSel === c.id ? '2px solid var(--brand)' : undefined }}>
            <div className="row">
              <Logo company={c} size={42} />
              <div className="grow" style={{ minWidth: 0 }}>
                <b style={{ fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>{c.name}</b>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)' }}>{c.area} · {c.distance}</div>
              </div>
            </div>
            <div className="row" style={{ gap: 8 }}>
              <button type="button" className="btn soft" style={{ height: 34, fontSize: 12, borderRadius: 10 }} onClick={() => actions.selectOnMap(c.id)}>Ver no mapa</button>
              <button type="button" className="btn" style={{ height: 34, fontSize: 12, borderRadius: 10, boxShadow: 'none' }} onClick={() => actions.push({ name: 'company', id: c.id })}>{c.vagas} vagas</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

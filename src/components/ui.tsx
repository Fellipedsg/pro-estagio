import type { CSSProperties, ReactNode } from 'react'
import type { Company, Job, Tab } from '../data/types'
import { companyOf } from '../data/mock'
import { useApp } from '../state/AppContext'
import { Icon, modeIcon, type IconName } from './Icon'

export function Logo({ company, size = 48 }: { company: Company; size?: number }) {
  return (
    <div
      className="logo"
      style={{ width: size, height: size, borderRadius: Math.round(size * 0.3), background: company.color, fontSize: Math.round(size * 0.3) }}
    >
      {company.initials}
    </div>
  )
}

/** Anel de compatibilidade (%). */
export function Ring({ value, size = 46, width = 4 }: { value: number; size?: number; width?: number }) {
  const r = (size - width) / 2 - 1
  const len = 2 * Math.PI * r
  return (
    <div className="ring" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E3E9F5" strokeWidth={width} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={value >= 80 ? '#1463F3' : '#6FA3FF'} strokeWidth={width} strokeLinecap="round"
          strokeDasharray={`${((len * value) / 100).toFixed(1)} ${len.toFixed(1)}`}
        />
      </svg>
      <b style={{ fontSize: Math.round(size * 0.24) }}>{value}%</b>
    </div>
  )
}

interface IconBoxProps { icon: IconName; label: string; onClick?: () => void; dot?: boolean; style?: CSSProperties }
export function IconBox({ icon, label, onClick, dot, style }: IconBoxProps) {
  return (
    <button type="button" className="iconbox" aria-label={label} onClick={onClick} style={style}>
      <Icon name={icon} size={19} />
      {dot && <span className="dot" />}
    </button>
  )
}

export function BackButton({ style }: { style?: CSSProperties }) {
  const { actions } = useApp()
  return (
    <button type="button" className="iconbox" aria-label="Voltar" onClick={actions.back} style={style}>
      <Icon name="back" size={20} stroke={2.2} />
    </button>
  )
}

export function SectionHead({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return (
    <div className="between">
      <h2 className="h2">{title}</h2>
      {action && <button type="button" className="link" onClick={onAction}>{action}</button>}
    </div>
  )
}

export function Chips({ items, style }: { items: string[]; style?: CSSProperties }) {
  return <div className="chips">{items.map((t) => <span key={t} className="chip" style={style}>{t}</span>)}</div>
}

export function Check({ children }: { children: ReactNode }) {
  return (
    <div className="row" style={{ alignItems: 'flex-start', gap: 6, fontSize: 13, fontWeight: 600, color: 'var(--muted)' }}>
      <span style={{ color: 'var(--ok)', marginTop: 1 }}><Icon name="check" size={14} stroke={3} /></span>
      {children}
    </div>
  )
}

export function JobCard({ job, highlight = false }: { job: Job; highlight?: boolean }) {
  const { state, actions } = useApp()
  const c = companyOf(job)
  const fav = state.favorites.has(job.id)
  const open = () => actions.push({ name: 'job', id: job.id })
  return (
    <div
      className={`card ${highlight ? 'hl' : ''}`} role="button" tabIndex={0}
      onClick={open} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open() } }}
      style={{ display: 'flex', flexDirection: 'column', gap: 10, cursor: 'pointer' }}
    >
      <div className="row" style={{ gap: 12 }}>
        <Logo company={c} />
        <div className="grow">
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)' }}>{c.name}{job.isProject ? ' · Projeto' : ''}</div>
          <div style={{ fontSize: 15, fontWeight: 800, lineHeight: 1.25 }}>{job.title}</div>
        </div>
        <Ring value={job.compat} />
      </div>
      <div className="meta">
        <span><Icon name="pin" size={13} stroke={2} />{job.city}</span>
        <span><Icon name={modeIcon(job.mode)} size={13} stroke={2} />{job.mode}</span>
        <span className="pay">{job.pay}</span>
      </div>
      <div className="between">
        <Chips items={job.tags} />
        <button
          type="button" aria-label="Favoritar" aria-pressed={fav}
          onClick={(e) => { e.stopPropagation(); actions.toggleFavorite(job.id) }}
          style={{ width: 36, height: 36, display: 'grid', placeItems: 'center', color: fav ? 'var(--brand)' : 'var(--subtle)' }}
        >
          <Icon name="heart" filled={fav} />
        </button>
      </div>
    </div>
  )
}

export function FeaturedCard({ company }: { company: Company }) {
  const { state, actions } = useApp()
  const f = state.following.has(company.id)
  return (
    <button
      type="button" onClick={() => actions.push({ name: 'company', id: company.id })}
      style={{
        width: 128, height: 168, borderRadius: 22, position: 'relative', overflow: 'hidden', flexShrink: 0, textAlign: 'left',
        background: `linear-gradient(150deg,${company.color}AA,${company.color})`, color: '#fff',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 12,
      }}
    >
      <span style={{ position: 'absolute', top: 14, left: 14, fontSize: 44, fontWeight: 800, opacity: 0.22, letterSpacing: -2 }}>{company.initials}</span>
      <span style={{ position: 'absolute', top: 10, right: 10, width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,.22)', display: 'grid', placeItems: 'center' }}>
        <Icon name="heart" size={13} stroke={2.2} filled={f} />
      </span>
      <span style={{ fontSize: 14, fontWeight: 800, lineHeight: 1.2, position: 'relative' }}>{company.name}</span>
      <span style={{ fontSize: 11, fontWeight: 600, opacity: 0.9, position: 'relative' }}>{company.area} · {company.vagas} vagas</span>
    </button>
  )
}

const TABS: [Tab, IconName, string][] = [
  ['curriculo', 'doc', 'Meu Currículo'],
  ['oportunidades', 'search', 'Oportunidades'],
  ['perfil', 'user', 'Perfil'],
  ['empresas', 'building', 'Empresas'],
]

export function TabBar() {
  const { state, actions } = useApp()
  return (
    <nav className="tabbar" aria-label="Navegação principal">
      {TABS.map(([k, icon, label]) => {
        const on = state.tab === k
        return (
          <button key={k} type="button" className={on ? 'on' : ''} aria-current={on ? 'page' : undefined} onClick={() => actions.setTab(k)}>
            <Icon name={icon} size={22} stroke={on ? 2.2 : 1.8} />
            <span>{label}</span>
          </button>
        )
      })}
    </nav>
  )
}

export function Toasts() {
  const { toasts } = useApp()
  return <>{toasts.map((t) => <div key={t.id} className="toast" role="status">{t.text}</div>)}</>
}

export const gradientBrand = 'linear-gradient(160deg,#2F7BFF,var(--brand) 60%,var(--brand-dark))'

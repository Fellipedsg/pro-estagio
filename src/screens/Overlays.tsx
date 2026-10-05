import { useState, type ReactNode } from 'react'
import { Icon } from '../components/Icon'
import { Logo } from '../components/ui'
import { companyOf, jobById } from '../data/mock'
import { useApp } from '../state/AppContext'

function SheetFrame({ children }: { children: ReactNode }) {
  const { actions } = useApp()
  return (
    <div className="overlay" onClick={actions.closeSheet}>
      <div className="sheet" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <span className="grab" />
        {children}
      </div>
    </div>
  )
}

export function ApplySheet({ jobId }: { jobId: string }) {
  const { actions } = useApp()
  const j = jobById(jobId)
  const c = companyOf(j)
  const [portfolio, setPortfolio] = useState(true)
  const [msg, setMsg] = useState('Olá! Tenho experiência com Python e SQL em projetos acadêmicos e adoraria contribuir com o time.')
  return (
    <SheetFrame>
      <div>
        <h2 style={{ fontSize: 22, fontWeight: 800 }}>Candidatura rápida</h2>
        <p className="sub" style={{ margin: '4px 0 0' }}>Vamos enviar seu currículo do Pró-Estágio para a {c.name}.</p>
      </div>
      <div className="row" style={{ gap: 12, padding: 12, borderRadius: 18, background: '#F5F9FF', boxShadow: 'inset 0 0 0 1.5px var(--brand)' }}>
        <span style={{ width: 44, height: 52, borderRadius: 10, background: '#fff', border: '1px solid #CFE0FF', display: 'grid', placeItems: 'center', color: 'var(--brand)' }}><Icon name="doc" size={22} /></span>
        <div className="grow">
          <b style={{ fontSize: 14 }}>Currículo · Lucas Santos</b>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)' }}>Atualizado há 2 dias · 100% completo</div>
        </div>
        <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--brand)', color: '#fff', display: 'grid', placeItems: 'center' }}><Icon name="check" size={14} stroke={3} /></span>
      </div>
      <button type="button" className="row" role="switch" aria-checked={portfolio} onClick={() => setPortfolio((v) => !v)} style={{ gap: 12, padding: 12, borderRadius: 18, background: 'var(--bg)', textAlign: 'left' }}>
        <span style={{ width: 44, height: 44, borderRadius: 12, background: '#fff', display: 'grid', placeItems: 'center', color: 'var(--brand)' }}><Icon name="folder" /></span>
        <span className="grow">
          <b style={{ fontSize: 14, display: 'block' }}>Incluir portfólio</b>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)' }}>8 projetos com tecnologias</span>
        </span>
        <span style={{ width: 50, height: 30, borderRadius: 15, background: portfolio ? 'var(--brand)' : '#CBD3E3', position: 'relative', transition: 'background .2s' }}>
          <span style={{ position: 'absolute', top: 3, left: portfolio ? 23 : 3, width: 24, height: 24, borderRadius: '50%', background: '#fff', transition: 'left .2s', boxShadow: '0 2px 4px rgba(0,0,0,.2)' }} />
        </span>
      </button>
      <div className="field">
        <label htmlFor="msg">Mensagem para o recrutador <span style={{ fontWeight: 500, color: 'var(--muted)' }}>(opcional)</span></label>
        <textarea id="msg" rows={4} value={msg} onChange={(e) => setMsg(e.target.value)}
          style={{ width: '100%', resize: 'none', borderRadius: 16, border: '1px solid var(--line)', padding: '12px 14px', fontSize: 13, lineHeight: 1.5, fontWeight: 500, outline: 0 }} />
      </div>
      <button type="button" className="btn" onClick={() => actions.sendApplication(j.id)}><Icon name="send" size={18} stroke={2} />Enviar candidatura</button>
      <button type="button" className="sub" style={{ fontWeight: 700, fontSize: 14, padding: 4 }} onClick={actions.closeSheet}>Cancelar</button>
    </SheetFrame>
  )
}

export function EditResumeSheet() {
  const { actions } = useApp()
  const save = () => { actions.closeSheet(); actions.toast('Currículo atualizado.') }
  return (
    <SheetFrame>
      <div className="between">
        <button type="button" className="link" style={{ fontSize: 15 }} onClick={actions.closeSheet}>Cancelar</button>
        <b style={{ fontSize: 16 }}>Editar currículo</b>
        <button type="button" className="link" style={{ fontSize: 15, fontWeight: 800 }} onClick={save}>Salvar</button>
      </div>
      <div className="field"><label htmlFor="obj">Objetivo</label><div className="input"><input id="obj" defaultValue="Buscando estágio em tecnologia e desenvolvimento." /></div></div>
      <div className="field"><label htmlFor="tel">Telefone</label><div className="input"><input id="tel" defaultValue="(79) 99999-9999" /></div></div>
      <div className="field"><label htmlFor="hab">Nova habilidade</label><div className="input"><input id="hab" placeholder="Ex.: Docker" /></div></div>
    </SheetFrame>
  )
}

export function SuccessCover({ jobId }: { jobId: string }) {
  const { actions } = useApp()
  const j = jobById(jobId)
  const c = companyOf(j)
  return (
    <div className="cover">
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button type="button" className="iconbox" aria-label="Fechar" onClick={actions.successMore}><Icon name="x" size={18} stroke={2.2} /></button>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22, textAlign: 'center' }}>
        <div style={{ width: 200, height: 200, borderRadius: '50%', background: '#E3EDFF', display: 'grid', placeItems: 'center' }}>
          <div style={{ width: 148, height: 148, borderRadius: '50%', background: '#CFE0FF', display: 'grid', placeItems: 'center' }}>
            <div style={{ width: 112, height: 112, borderRadius: '50%', background: 'linear-gradient(160deg,#5B9BFF,var(--brand))', color: '#fff', display: 'grid', placeItems: 'center', boxShadow: '0 18px 36px rgba(20,99,243,.4)', animation: 'pop .6s' }}>
              <Icon name="check" size={54} stroke={2.8} />
            </div>
          </div>
        </div>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800 }}>Candidatura enviada!</h1>
          <p className="sub" style={{ fontSize: 15, lineHeight: 1.55, margin: '10px 0 0' }}>A {c.name} recebeu seu currículo. Avisamos você a cada mudança de status.</p>
        </div>
        <div className="card row" style={{ gap: 12, textAlign: 'left' }}>
          <Logo company={c} size={48} />
          <div className="grow">
            <b style={{ fontSize: 14 }}>{j.title}</b>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)' }}>{c.name} · {j.city}</div>
          </div>
          <span className="chip">Enviada</span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <button type="button" className="btn" onClick={actions.successTrack}>Acompanhar candidatura</button>
        <button type="button" className="btn secondary" onClick={actions.successMore}>Ver mais vagas</button>
      </div>
    </div>
  )
}

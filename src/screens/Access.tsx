import { useState, type FormEvent } from 'react'
import { Icon, type IconName } from '../components/Icon'
import { Chips, Logo, Ring } from '../components/ui'
import { companyOf, jobs } from '../data/mock'
import { useApp } from '../state/AppContext'

const safeBottom = (px: number) => `calc(${px}px + env(safe-area-inset-bottom, 0px))`

export function Splash() {
  const { actions } = useApp()
  return (
    <div className="screen fade-in" style={{ background: 'linear-gradient(165deg,#2F7BFF,#1463F3 45%,#0A3FB8)', color: '#fff', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', width: 420, height: 420, borderRadius: '50%', border: '1px solid rgba(255,255,255,.14)', top: -120, right: -180 }} />
      <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,.07)', bottom: 140, left: -150 }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, position: 'relative' }}>
        <div style={{ width: 104, height: 104, borderRadius: 32, background: 'linear-gradient(#fff,#DCE8FF)', display: 'grid', placeItems: 'center', color: 'var(--brand)', boxShadow: '0 24px 48px rgba(6,30,90,.35)', animation: 'pop .6s' }}>
          <Icon name="cap" size={56} stroke={1.8} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: -0.5 }}>Pró-Estágio</div>
          <div style={{ fontSize: 17, fontWeight: 500, opacity: 0.86, marginTop: 6 }}>Sua nova oportunidade.</div>
        </div>
      </div>
      <div style={{ padding: `0 24px ${safeBottom(40)}`, display: 'flex', flexDirection: 'column', gap: 14, position: 'relative' }}>
        <button type="button" className="btn" style={{ background: '#fff', color: 'var(--brand)' }} onClick={() => actions.setStage('onboarding')}>
          Começar <Icon name="arrow" size={20} stroke={2} />
        </button>
        <button type="button" style={{ fontSize: 14, fontWeight: 600, color: '#fff', padding: 8 }} onClick={() => actions.setStage('login')}>
          Já tenho conta · <b>Entrar</b>
        </button>
      </div>
    </div>
  )
}

const PAGES = [
  ['Todas as vagas de estágio em um só lugar', 'Chega de caçar oportunidade no LinkedIn e em grupos de WhatsApp. Receba vagas compatíveis com o seu curso e as suas habilidades.'],
  ['Seu currículo e portfólio sempre prontos', 'Mostre projetos, habilidades e formação num perfil que as empresas entendem em segundos.'],
  ['Acompanhe cada candidatura em tempo real', 'Saiba quando sua candidatura foi vista, converse com recrutadores e receba avisos de entrevista.'],
] as const

function OnboardingArt({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {[jobs[0], jobs[1]].map((j, k) => (
          <div key={j.id} className="card" style={{ width: 270, display: 'flex', gap: 12, alignItems: 'center', transform: `rotate(${k ? 2 : -3}deg) translateX(${k ? 24 : 0}px)`, marginTop: k ? -8 : 0, borderRadius: 22 }}>
            <Logo company={companyOf(j)} size={44} />
            <div className="grow">
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)' }}>{companyOf(j).name}</div>
              <div style={{ fontSize: 13, fontWeight: 800 }}>{j.title}</div>
            </div>
            <Ring value={j.compat} size={42} />
          </div>
        ))}
      </div>
    )
  }
  if (index === 1) {
    return (
      <div className="card" style={{ width: 280, display: 'flex', flexDirection: 'column', gap: 12, transform: 'rotate(-2deg)', padding: 16 }}>
        <div className="row" style={{ gap: 12 }}>
          <div className="avatar" style={{ width: 56, height: 56, fontSize: 19 }}>LS</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 16 }}>Lucas Santos</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--brand)' }}>Sistemas de Informação</div>
          </div>
        </div>
        <Chips items={['Python', 'SQL', 'Figma']} />
        <div style={{ height: 6, borderRadius: 3, background: 'var(--line)' }}>
          <div style={{ width: '85%', height: 6, borderRadius: 3, background: 'var(--brand)' }} />
        </div>
      </div>
    )
  }
  const steps: [IconName, string, string][] = [['send', 'Candidatura enviada', '#1463F3'], ['hourglass', 'Em análise', '#B26A00'], ['calendar', 'Entrevista agendada', '#0F9D58']]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {steps.map(([n, t, c]) => (
        <div key={t} className="card" style={{ width: 260, padding: 10, borderRadius: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 34, height: 34, borderRadius: 10, background: c, color: '#fff', display: 'grid', placeItems: 'center' }}><Icon name={n} size={17} stroke={2} /></span>
          <b className="grow" style={{ fontSize: 14 }}>{t}</b>
          <span style={{ color: c }}><Icon name="check" size={18} stroke={2.6} /></span>
        </div>
      ))}
    </div>
  )
}

export function Onboarding() {
  const { state, actions } = useApp()
  const i = state.onboardingIndex
  return (
    <div className="screen slide-in">
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '54px 24px 0' }}>
        <button type="button" style={{ fontSize: 14, fontWeight: 700, color: 'var(--muted)', padding: '8px 4px' }} onClick={() => actions.setStage('login')}>Pular</button>
      </div>
      <div style={{ height: 360, display: 'grid', placeItems: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle,#D6E4FF,#EAF1FF 55%,transparent 72%)' }} />
        <div key={i} className="fade-in" style={{ position: 'relative' }}><OnboardingArt index={i} /></div>
      </div>
      <div style={{ padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {PAGES.map((_, k) => (
            <span key={k} style={{ height: 6, borderRadius: 3, width: k === i ? 24 : 6, background: k === i ? 'var(--brand)' : '#C8D5EE', transition: 'width .25s' }} />
          ))}
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.2, letterSpacing: -0.4 }}>{PAGES[i][0]}</h1>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, fontWeight: 500, color: 'var(--muted)' }}>{PAGES[i][1]}</p>
      </div>
      <div style={{ padding: `16px 24px ${safeBottom(28)}` }}>
        <button type="button" className="btn" onClick={actions.nextOnboarding}>
          {i < 2 ? 'Próximo' : 'Começar agora'} <Icon name="arrow" size={20} stroke={2} />
        </button>
      </div>
    </div>
  )
}

export function Login() {
  const { actions } = useApp()
  const [showPass, setShowPass] = useState(false)
  const [email, setEmail] = useState('lucas.santos@academico.ufs.br')
  const [password, setPassword] = useState('minhasenha')
  const submit = (e: FormEvent) => { e.preventDefault(); actions.setStage('main') }
  return (
    <div className="screen slide-in">
      <div className="scroll">
        <div className="pad" style={{ paddingInline: 24, gap: 24 }}>
          <button type="button" className="iconbox" aria-label="Voltar" onClick={() => actions.setStage('onboarding')}><Icon name="back" size={20} stroke={2.2} /></button>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ width: 56, height: 56, borderRadius: 18, background: 'linear-gradient(160deg,#4C8DFF,var(--brand))', color: '#fff', display: 'grid', placeItems: 'center', boxShadow: '0 12px 24px rgba(20,99,243,.3)' }}>
              <Icon name="cap" size={30} stroke={1.8} />
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 800, marginTop: 8 }}>Bem-vindo de volta</h1>
            <p className="sub" style={{ margin: 0, fontSize: 15 }}>Entre para ver as vagas que combinam com você.</p>
          </div>
          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <div className="input focus">
                <span style={{ color: 'var(--brand)' }}><Icon name="mail" /></span>
                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off" />
              </div>
            </div>
            <div className="field">
              <label htmlFor="senha">Senha</label>
              <div className="input">
                <span style={{ color: 'var(--subtle)' }}><Icon name="lock" /></span>
                <input id="senha" type={showPass ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="off" />
                <button type="button" aria-label="Mostrar senha" style={{ color: 'var(--subtle)' }} onClick={() => setShowPass((v) => !v)}><Icon name="eye" /></button>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <button type="button" className="link" onClick={() => actions.toast('Enviamos um link de redefinição para o seu e-mail.')}>Esqueci minha senha</button>
            </div>
            <button className="btn" type="submit">Entrar</button>
          </form>
          <div className="row" style={{ gap: 12 }}>
            <span style={{ flex: 1, height: 1, background: '#DCE3F0' }} />
            <span className="sub" style={{ fontWeight: 600 }}>ou continue com</span>
            <span style={{ flex: 1, height: 1, background: '#DCE3F0' }} />
          </div>
          <div className="row" style={{ gap: 12 }}>
            {[['G', 'Google'], ['in', 'LinkedIn']].map(([b, t]) => (
              <button key={t} type="button" className="btn secondary" style={{ height: 52, fontSize: 14 }} onClick={() => actions.setStage('main')}>
                <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--brand-soft)', color: 'var(--brand)', fontSize: 11, fontWeight: 800, display: 'grid', placeItems: 'center' }}>{b}</span>{t}
              </button>
            ))}
          </div>
          <p style={{ margin: 0, textAlign: 'center', fontSize: 14, fontWeight: 600, color: 'var(--muted)' }}>
            Não tem conta? <button type="button" className="link" style={{ fontSize: 14, fontWeight: 800 }} onClick={() => actions.setStage('signup')}>Criar conta</button>
          </p>
        </div>
      </div>
    </div>
  )
}

function Field({ id, label, defaultValue, type = 'text' }: { id: string; label: string; defaultValue: string; type?: string }) {
  return (
    <div className="field grow">
      <label htmlFor={id}>{label}</label>
      <div className="input" style={{ height: 48, borderRadius: 14 }}><input id={id} type={type} defaultValue={defaultValue} /></div>
    </div>
  )
}

export function Signup() {
  const { actions } = useApp()
  const [student, setStudent] = useState(true)
  const [terms, setTerms] = useState(true)
  const submit = (e: FormEvent) => { e.preventDefault(); if (terms) actions.setStage('main') }
  return (
    <div className="screen slide-in">
      <div className="scroll">
        <div className="pad" style={{ paddingInline: 24, gap: 18 }}>
          <div className="row" style={{ gap: 12 }}>
            <button type="button" className="iconbox" aria-label="Voltar" onClick={() => actions.setStage('login')}><Icon name="back" size={20} stroke={2.2} /></button>
            <div className="grow">
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', marginBottom: 6 }}>Passo 1 de 2</div>
              <div style={{ height: 6, borderRadius: 3, background: '#DCE3F0' }}><div style={{ width: '50%', height: 6, borderRadius: 3, background: 'var(--brand)' }} /></div>
            </div>
          </div>
          <h1 className="h1">Crie sua conta</h1>
          <div className="seg">
            <button type="button" className={student ? 'on' : ''} onClick={() => setStudent(true)}>Sou estudante</button>
            <button type="button" className={!student ? 'on' : ''} onClick={() => setStudent(false)}>Sou empresa</button>
          </div>
          <form key={student ? 's' : 'e'} onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Field id="nome" label={student ? 'Nome completo' : 'Nome da empresa'} defaultValue={student ? 'Lucas Santos' : 'Tech Solutions'} />
            <Field id="emailc" label={student ? 'E-mail institucional' : 'E-mail corporativo'} defaultValue={student ? 'lucas.santos@academico.ufs.br' : 'rh@techsolutions.com.br'} />
            {student ? (
              <>
                <div className="row" style={{ gap: 12, alignItems: 'flex-start' }}>
                  <Field id="curso" label="Curso" defaultValue="Sistemas de Informação" />
                  <div style={{ width: 100 }}><Field id="periodo" label="Período" defaultValue="5º" /></div>
                </div>
                <Field id="uni" label="Universidade" defaultValue="Universidade Federal de Sergipe" />
              </>
            ) : (
              <Field id="cnpj" label="CNPJ" defaultValue="12.345.678/0001-90" />
            )}
            <div className="field">
              <label htmlFor="senhac">Crie uma senha</label>
              <div className="input" style={{ height: 48, borderRadius: 14 }}><input id="senhac" type="password" defaultValue="minhasenha" /></div>
              <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
                {[1, 1, 1, 0].map((o, k) => <span key={k} style={{ flex: 1, height: 4, borderRadius: 2, background: o ? 'var(--ok)' : '#DCE3F0' }} />)}
              </div>
            </div>
            <button type="button" onClick={() => setTerms((v) => !v)} aria-pressed={terms} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', textAlign: 'left', fontSize: 13, fontWeight: 500, color: 'var(--muted)', lineHeight: 1.45 }}>
              <span style={{ width: 20, height: 20, borderRadius: 6, flexShrink: 0, display: 'grid', placeItems: 'center', ...(terms ? { background: 'var(--brand)', color: '#fff' } : { border: '1.5px solid var(--subtle)' }) }}>
                {terms && <Icon name="check" size={14} stroke={3} />}
              </span>
              <span>Li e aceito os <b style={{ color: 'var(--brand)' }}>Termos de uso</b> e a <b style={{ color: 'var(--brand)' }}>Política de privacidade</b>.</span>
            </button>
            <button className="btn" type="submit" disabled={!terms} style={terms ? undefined : { opacity: 0.5 }}>Continuar</button>
          </form>
        </div>
      </div>
    </div>
  )
}

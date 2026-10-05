import { useEffect, useRef, type CSSProperties, type MouseEvent, type RefObject } from 'react'
import { companies } from '../data/mock'
import { Logo } from './ui'

/**
 * Permite arrastar com o mouse um contêiner rolável (no toque o navegador já rola sozinho).
 * Retorna um handler de clique em captura que cancela o clique logo após um arraste.
 */
export function useDragScroll(ref: RefObject<HTMLElement>, vertical: boolean) {
  const moved = useRef(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let down = false, sx = 0, sy = 0, sl = 0, st = 0
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      down = true; moved.current = false
      sx = e.clientX; sy = e.clientY; sl = el.scrollLeft; st = el.scrollTop
      el.style.scrollSnapType = 'none'
    }
    const onMove = (e: PointerEvent) => {
      if (!down) return
      const dx = e.clientX - sx, dy = e.clientY - sy
      if (Math.abs(dx) + Math.abs(dy) > 5) { moved.current = true; el.classList.add('dragging') }
      el.scrollLeft = sl - dx
      if (vertical) el.scrollTop = st - dy
    }
    const onUp = () => {
      if (!down) return
      down = false
      el.classList.remove('dragging')
      el.style.scrollSnapType = ''
    }
    el.addEventListener('pointerdown', onDown)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerup', onUp)
    el.addEventListener('pointerleave', onUp)
    return () => {
      el.removeEventListener('pointerdown', onDown)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerup', onUp)
      el.removeEventListener('pointerleave', onUp)
    }
  }, [ref, vertical])

  return (e: MouseEvent) => {
    if (moved.current) { e.stopPropagation(); e.preventDefault(); moved.current = false }
  }
}

const ROADS: [string, number][] = [
  ['M-20 120 C200 110 420 140 1020 100', 14], ['M-20 330 L1020 360', 12], ['M-20 560 C300 540 600 600 1020 580', 12],
  ['M150 -20 L180 740', 12], ['M400 -20 C380 200 430 480 410 740', 14], ['M640 -20 L690 740', 10],
  ['M-20 220 L880 250', 5], ['M-20 450 L880 470', 5], ['M270 -20 L300 740', 5], ['M530 -20 L550 740', 5],
  ['M770 -20 L800 740', 5], ['M-20 660 L880 680', 5], ['M60 -20 L80 740', 4],
]
const PARKS = [[210, 160, 70, 50], [450, 190, 90, 60], [560, 400, 70, 90], [90, 380, 60, 50], [720, 450, 60, 40], [300, 600, 80, 40]]
const LABELS: [string, number, number][] = [
  ['CENTRO', 40, 285], ['SIQUEIRA CAMPOS', 180, 395], ['GRAGERU', 470, 285], ['JARDINS', 580, 160],
  ['FAROLÂNDIA', 500, 520], ['ATALAIA', 760, 640], ['PRAIA DE\nATALAIA', 915, 410], ['RIO SERGIPE', 560, 20],
]

function MapArt() {
  return (
    <svg width="1000" height="720" viewBox="0 0 1000 720" style={{ position: 'absolute', inset: 0 }} aria-hidden="true">
      <rect width="1000" height="720" fill="#EEF1EA" />
      {PARKS.map(([x, y, w, h]) => <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} rx="10" fill="#D6EAC8" />)}
      <path d="M880 -20 C860 150 900 300 870 450 C850 560 880 650 870 740 L1020 740 L1020 -20Z" fill="#F3E7C6" />
      <path d="M910 -20 C890 150 930 300 900 450 C880 560 910 650 900 740 L1020 740 L1020 -20Z" fill="#BFDDF3" />
      <path d="M-20 20 C150 40 300 -10 520 30 C700 60 800 20 910 40" fill="none" stroke="#BFDDF3" strokeWidth="26" />
      {ROADS.map(([d, w]) => <path key={d} d={d} fill="none" stroke="#fff" strokeWidth={w} strokeLinecap="round" />)}
      <circle cx="175" cy="150" r="70" fill="#1463F3" fillOpacity=".1" />
      <circle cx="175" cy="150" r="9" fill="#1463F3" stroke="#fff" strokeWidth="4" />
    </svg>
  )
}

interface MapProps {
  height: CSSProperties['height']
  selected?: string | null
  onPin: (companyId: string) => void
  scrollRef?: RefObject<HTMLDivElement>
  style?: CSSProperties
}

/** Mapa ilustrado de Aracaju (1000×720) que pode ser arrastado. */
export function IllustratedMap({ height, selected, onPin, scrollRef, style }: MapProps) {
  const own = useRef<HTMLDivElement>(null)
  const ref = scrollRef ?? own
  const guardClick = useDragScroll(ref, true)

  useEffect(() => {
    ref.current?.scrollTo(40, 20)
  }, [ref])

  return (
    <div className="map" ref={ref} style={{ height, ...style }} onClickCapture={guardClick}>
      <div className="map-inner">
        <MapArt />
        {LABELS.map(([t, x, y]) => <span key={t} className="maplabel" style={{ left: x, top: y }}>{t}</span>)}
        <span style={{ position: 'absolute', left: 150, top: 172, padding: '3px 8px', borderRadius: 999, background: 'var(--brand)', color: '#fff', fontSize: 11, fontWeight: 800 }}>Você</span>
        {companies.map((c) => (
          <button key={c.id} type="button" className={`pin ${selected === c.id ? 'sel' : ''}`} style={{ left: c.mapX, top: c.mapY }} onClick={() => onPin(c.id)}>
            <Logo company={c} size={34} />
            <span style={{ textAlign: 'left' }}>
              <b style={{ display: 'block', fontSize: 12 }}>{c.name}</b>
              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted)' }}>{c.distance}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

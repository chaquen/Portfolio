import { useEffect, useState, type CSSProperties } from 'react'

// Maqueta de fondo: cuatro capas en alambre, una por grupo de habilidades.
// Es decorativa (aria-hidden) y solo usa CSS 3D: no necesita WebGL.
// Cada sección marca con data-vista desde qué ángulo se ve el plano.
type Vista = 'iso' | 'detalle' | 'planta' | 'alzado'

const CARAS = ['f', 'b', 'd', 'i'] as const

export default function PlanoFondo({ capas }: { capas: string[] }) {
  const [vista, setVista] = useState<Vista>('iso')

  useEffect(() => {
    const secciones = Array.from(document.querySelectorAll<HTMLElement>('[data-vista]'))
    if (secciones.length === 0 || !('IntersectionObserver' in window)) return
    const observador = new IntersectionObserver(
      (entradas) => {
        const visible = entradas.find((e) => e.isIntersecting)
        if (visible) setVista(visible.target.getAttribute('data-vista') as Vista)
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    secciones.forEach((s) => observador.observe(s))
    return () => observador.disconnect()
  }, [])

  // De arriba hacia abajo: la IA arriba. `orden` sincroniza el resaltado con las filas de habilidades.
  const deArriba = [...capas].reverse()

  return (
    <div className="plano" data-vista={vista} aria-hidden="true">
      <div className="plano__vista">
        <div className="plano__giro">
          <div className="plano__limite">
            {CARAS.map((c) => <i key={c} className={`plano__borde plano__borde--${c}`} />)}
          </div>
          <div className="plano__eje"><i className="plano__senal" /></div>
          {deArriba.map((nombre, orden) => (
            <div
              key={nombre}
              className={`plano__capa${orden === 0 ? ' plano__capa--ia' : ''}`}
              style={{ '--y': `${-105 + orden * 70}px`, '--orden': orden } as CSSProperties}
            >
              {CARAS.map((c) => <i key={c} className={`plano__cara plano__cara--${c}`} />)}
              <i className="plano__cara plano__cara--s" />
              {CARAS.map((c) => <b key={c} className={`plano__rotulo plano__cara--${c}`}>{nombre}</b>)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

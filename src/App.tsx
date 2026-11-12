import { useState, type CSSProperties } from 'react'
import PlanoFondo from './components/PlanoFondo'
import ProyectosGithub from './components/ProyectosGithub'
import { anioInicio, contenido, enlaces, nombre, rutas, type Idioma } from './data/perfil'
import type { Repo } from './lib/github'

type Props = { idioma: Idioma; reposIniciales: Repo[] | null; anioActual: number }

const dos = (n: number) => String(n).padStart(2, '0')

function TituloSeccion({ n, texto, nota }: { n: number; texto: string; nota?: string }) {
  return (
    <div className="titulo-seccion">
      <span className="titulo-seccion__n">{dos(n)}</span>
      <h2>{texto}</h2>
      {nota && <span className="titulo-seccion__nota">{nota}</span>}
    </div>
  )
}

export default function App({ idioma, reposIniciales, anioActual }: Props) {
  const t = contenido[idioma]
  const [menuAbierto, setMenuAbierto] = useState(false)

  const secciones = [
    ['enfoque', t.nav.enfoque],
    ['experiencia', t.nav.experiencia],
    ['habilidades', t.nav.habilidades],
    ['proyectos', t.nav.proyectos],
    ['formacion', t.nav.formacion],
    ['contacto', t.nav.contacto],
  ] as const

  const totalAnios = anioActual - anioInicio
  const columnas = t.experiencia.items.map((e) => `${Math.max(1, (e.fin ?? anioActual) - e.inicio)}fr`).join(' ')
  const marcas = Array.from({ length: totalAnios + 1 }, (_, i) => anioInicio + i)
  const capasDeArriba = [...t.habilidades.capas].reverse()

  return (
    <>
      <a className="saltar" href="#contenido">{t.saltar}</a>

      <header className="cabecera">
        <div className="contenedor cabecera__fila">
          <a className="marca" href="#inicio" aria-label={nombre}>E.A. GUZMÁN V.</a>
          <nav id="menu" className={`menu${menuAbierto ? ' menu--abierto' : ''}`} aria-label={t.menu}>
            <ul>
              {secciones.map(([id, texto], i) => (
                <li key={id}>
                  <a href={`#${id}`} onClick={() => setMenuAbierto(false)}>
                    <span>{dos(i + 1)}</span> {texto}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="cabecera__acciones">
            <ul className="idioma" aria-label={t.idioma}>
              {(['es', 'en'] as const).map((op) => (
                <li key={op}>
                  <a href={rutas[op]} hrefLang={op} lang={op} aria-current={idioma === op ? 'true' : undefined}>
                    {op.toUpperCase()}
                  </a>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="menu-boton"
              aria-expanded={menuAbierto}
              aria-controls="menu"
              aria-label={t.menu}
              onClick={() => setMenuAbierto((a) => !a)}
            >
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {menuAbierto ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main id="contenido">
        <section id="inicio" className="hero" data-vista="iso">
          <PlanoFondo capas={t.habilidades.capas.map((c) => c.nombre)} />
          <div className="contenedor hero__texto">
            <p className="ceja">{t.ceja}</p>
            <h1>{nombre}</h1>
            <p className="hero__rol">{t.rol}</p>
            <p className="hero__lema">{t.lema}</p>
            <div className="acciones">
              <a className="boton boton--principal" href={enlaces.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a className="boton" href={enlaces.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
          <div className="contenedor">
            <ul className="datos">
              {t.datos.map((d) => (
                <li key={d.valor} className={d.ia ? 'datos__ia' : undefined}>
                  <strong>{d.valor} {d.unidad && <span>{d.unidad}</span>}</strong>
                  <p>{d.texto}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="enfoque" className="seccion" data-vista="detalle">
          <div className="contenedor">
            <TituloSeccion n={1} texto={t.enfoque.titulo} />
            <p className="frase">{t.enfoque.frase}</p>
            <p className="sobre-mi">{t.sobreMi}</p>
            <div className="enfoque">
              {t.enfoque.tarjetas.map((c, i) => (
                <article key={c.titulo} className={`ficha${c.ia ? ' ficha--ia' : ''}`}>
                  <p className="ficha__codigo">D-{i + 1}{c.ia ? ' · IA' : ''}</p>
                  <h3>{c.titulo}</h3>
                  <p className="ficha__texto">{c.texto}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="experiencia" className="seccion seccion--cota" data-vista="planta">
          <div className="contenedor">
            <TituloSeccion n={2} texto={t.experiencia.titulo} nota={t.experiencia.escala} />
            <div className="regla" aria-hidden="true">
              {marcas.map((a, i) => (
                <span
                  key={a}
                  className={`regla__marca${i % 2 === 0 || a === anioActual ? ' regla__marca--larga' : ''}`}
                  style={{ left: `${(i / totalAnios) * 100}%` } as CSSProperties}
                >
                  {(i % 2 === 0 || a === anioActual) && (i < totalAnios - 1 || a === anioActual) && (
                    <em>{a === anioActual ? t.experiencia.hoy : a}</em>
                  )}
                </span>
              ))}
            </div>
            <ol className="linea" style={{ '--columnas': columnas } as CSSProperties}>
              {t.experiencia.items.map((e, i) => {
                const actual = e.fin === null
                return (
                  <li key={`${e.empresa}-${e.inicio}`} className={`ficha${actual ? ' ficha--actual' : ''}`}>
                    <p className="ficha__codigo ficha__codigo--fila">
                      <span>A-{t.experiencia.items.length - i}{actual ? ` · ${t.experiencia.actual}` : ''}</span>
                      <span>{e.inicio} — {actual ? t.experiencia.hoy : e.fin}</span>
                    </p>
                    <h3>{e.cargo}</h3>
                    <p className="ficha__empresa">{e.empresa} · {e.lugar}</p>
                    <p className="ficha__texto">{e.resumen}</p>
                    <details className="logros">
                      <summary>{t.experiencia.verLogros}</summary>
                      <ul>{e.logros.map((l) => <li key={l}>{l}</li>)}</ul>
                    </details>
                  </li>
                )
              })}
            </ol>
            <p className="cota" aria-hidden="true"><span>{anioInicio} · {t.experiencia.cota} · {t.experiencia.hoy}</span></p>
          </div>
        </section>

        <section id="habilidades" className="seccion" data-vista="alzado">
          <div className="contenedor">
            <TituloSeccion n={3} texto={t.habilidades.titulo} nota={t.habilidades.nota} />
            <div className="capas">
              {capasDeArriba.map((c, orden) => (
                <div
                  key={c.nombre}
                  className={`capa${orden === 0 ? ' capa--ia' : ''}`}
                  style={{ '--orden': orden } as CSSProperties}
                >
                  <h3>
                    <span>{t.habilidades.capa} {capasDeArriba.length - orden}</span>
                    {c.nombre}
                  </h3>
                  <ul className="etiquetas">{c.items.map((x) => <li key={x}>{x}</li>)}</ul>
                </div>
              ))}
            </div>
            <ul className="otras">
              <li className="otras__titulo">{t.habilidades.tambien} →</li>
              {t.habilidades.otras.map((x) => <li key={x}>{x}</li>)}
            </ul>
          </div>
        </section>

        <section id="proyectos" className="seccion" data-vista="detalle">
          <div className="contenedor">
            <TituloSeccion n={4} texto={t.proyectos.titulo} nota={t.proyectos.nota} />
            <p className="nota-texto">{t.proyectos.intro}</p>
            <ProyectosGithub t={t.proyectos} reposIniciales={reposIniciales} />
          </div>
        </section>

        <section id="formacion" className="seccion" data-vista="iso">
          <div className="contenedor">
            <TituloSeccion n={5} texto={t.formacion.titulo} />
            <div className="formacion">
              <div>
                <h3>{t.formacion.educacionTitulo}</h3>
                <ul className="hitos">{t.formacion.educacion.map((h) => <li key={h.texto}><span>{h.anio}</span> {h.texto}</li>)}</ul>
              </div>
              <div>
                <h3>{t.formacion.certificacionesTitulo}</h3>
                <ul className="hitos">{t.formacion.certificaciones.map((h) => <li key={h.texto}><span>{h.anio}</span> {h.texto}</li>)}</ul>
                <h3>{t.formacion.idiomasTitulo}</h3>
                <p className="hitos__idiomas">{t.formacion.idiomas}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="contacto" className="seccion" data-vista="iso">
          <div className="contenedor contacto">
            <div className="contacto__texto">
              <TituloSeccion n={6} texto={t.contacto.titulo} />
              <p className="frase">{t.contacto.texto}</p>
              <a className="boton boton--principal" href={enlaces.linkedin} target="_blank" rel="noopener noreferrer">{t.contacto.boton}</a>
            </div>
            <dl className="cajetin">
              <dt>{t.cajetin.autor}</dt><dd>E. A. GUZMÁN V.</dd>
              <dt>{t.cajetin.oficio}</dt><dd>{t.cajetin.oficioValor}</dd>
              <dt>{t.cajetin.escala}</dt><dd>1:1 · ES / EN</dd>
            </dl>
          </div>
        </section>
      </main>

      <footer className="pie">
        <div className="contenedor">
          <p>© {anioActual} {nombre} · {t.pie}</p>
        </div>
      </footer>
    </>
  )
}

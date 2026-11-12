import { useEffect, useState } from 'react'
import ProyectosGithub from './components/ProyectosGithub'
import { contenido, enlaces, nombre, type Idioma } from './data/perfil'

const CLAVE_IDIOMA = 'portafolio-idioma'

function idiomaInicial(): Idioma {
  try {
    const guardado = localStorage.getItem(CLAVE_IDIOMA)
    if (guardado === 'es' || guardado === 'en') return guardado
  } catch {
    // Sin acceso a localStorage: se usa el idioma del navegador.
  }
  return navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en'
}

export default function App() {
  const [idioma, setIdioma] = useState<Idioma>(idiomaInicial)
  const t = contenido[idioma]

  useEffect(() => {
    document.documentElement.lang = idioma
    try {
      localStorage.setItem(CLAVE_IDIOMA, idioma)
    } catch {
      // Ignorar: la preferencia solo dura esta visita.
    }
  }, [idioma])

  const secciones = [
    ['sobre-mi', t.nav.sobreMi],
    ['experiencia', t.nav.experiencia],
    ['proyectos', t.nav.proyectos],
    ['habilidades', t.nav.habilidades],
    ['formacion', t.nav.formacion],
    ['contacto', t.nav.contacto],
  ] as const

  return (
    <>
      <a className="saltar" href="#contenido">{t.saltar}</a>

      <header className="cabecera">
        <div className="contenedor cabecera__fila">
          <a className="marca" href="#inicio" aria-label={nombre}>EG</a>
          <nav aria-label={idioma === 'es' ? 'Secciones' : 'Sections'}>
            <ul className="menu">
              {secciones.map(([id, texto]) => (
                <li key={id}><a href={`#${id}`}>{texto}</a></li>
              ))}
            </ul>
          </nav>
          <div className="idioma" role="group" aria-label={idioma === 'es' ? 'Idioma' : 'Language'}>
            {(['es', 'en'] as const).map((op) => (
              <button
                key={op}
                type="button"
                aria-pressed={idioma === op}
                onClick={() => setIdioma(op)}
              >
                {op.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main id="contenido">
        <section id="inicio" className="hero">
          <div className="contenedor">
            <p className="hero__ubicacion">{t.ubicacion}</p>
            <h1>{nombre}</h1>
            <p className="hero__rol">{t.rol}</p>
            <p className="hero__lema">{t.lema}</p>
            <div className="acciones">
              <a className="boton boton--principal" href={enlaces.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a className="boton" href={enlaces.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
            <ul className="destacados">
              {t.destacados.map((d) => <li key={d}>{d}</li>)}
            </ul>
          </div>
        </section>

        <section id="sobre-mi" className="seccion">
          <div className="contenedor contenedor--estrecho">
            <h2>{t.sobreMi.titulo}</h2>
            {t.sobreMi.parrafos.map((p) => <p key={p}>{p}</p>)}
          </div>
        </section>

        <section id="experiencia" className="seccion seccion--alterna">
          <div className="contenedor">
            <h2>{t.experiencia.titulo}</h2>
            <ol className="linea">
              {t.experiencia.items.map((e) => (
                <li key={`${e.empresa}-${e.periodo}-${e.cargo}`} className="linea__item">
                  <div className="linea__cabeza">
                    <h3>{e.cargo}</h3>
                    <span className="linea__periodo">{e.periodo}</span>
                  </div>
                  <p className="linea__empresa">{e.empresa} · {e.lugar}</p>
                  <ul className="linea__logros">
                    {e.logros.map((l) => <li key={l}>{l}</li>)}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="proyectos" className="seccion">
          <div className="contenedor">
            <h2>{t.proyectos.titulo}</h2>
            <p className="intro">{t.proyectos.intro}</p>
            <ProyectosGithub t={t.proyectos} idioma={idioma} />
          </div>
        </section>

        <section id="habilidades" className="seccion seccion--alterna">
          <div className="contenedor">
            <h2>{t.habilidades.titulo}</h2>
            <div className="grupos">
              {t.habilidades.grupos.map((g) => (
                <div key={g.titulo} className="grupo">
                  <h3>{g.titulo}</h3>
                  <ul className="etiquetas">
                    {g.items.map((i) => <li key={i}>{i}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="formacion" className="seccion">
          <div className="contenedor formacion">
            <h2>{t.formacion.titulo}</h2>
            <div className="formacion__columnas">
              <div>
                <h3>{t.formacion.educacionTitulo}</h3>
                <ul className="lista">{t.formacion.educacion.map((e) => <li key={e}>{e}</li>)}</ul>
              </div>
              <div>
                <h3>{t.formacion.certificacionesTitulo}</h3>
                <ul className="lista">{t.formacion.certificaciones.map((c) => <li key={c}>{c}</li>)}</ul>
                <h3>{t.formacion.idiomasTitulo}</h3>
                <p>{t.formacion.idiomas}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="contacto" className="seccion seccion--alterna">
          <div className="contenedor contenedor--estrecho contacto">
            <h2>{t.contacto.titulo}</h2>
            <p>{t.contacto.texto}</p>
            <div className="acciones">
              <a className="boton boton--principal" href={enlaces.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a className="boton" href={enlaces.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="pie">
        <div className="contenedor">
          <p>© {new Date().getFullYear()} {nombre} · {t.pie}</p>
        </div>
      </footer>
    </>
  )
}

import { useEffect, useState } from 'react'
import { enlaces, reposExcluidos, topicPortafolio, usuarioGithub, type Contenido, type Idioma } from '../data/perfil'

type Repo = {
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  topics?: string[]
  stargazers_count: number
  pushed_at: string
  fork: boolean
  archived: boolean
}

type Estado =
  | { tipo: 'cargando' }
  | { tipo: 'error' }
  | { tipo: 'listo'; repos: Repo[] }

// Lista pública de repos: se muestran los que no son fork ni están archivados.
// Si alguno tiene el topic `portafolio`, se muestran solo esos.
async function cargarRepos(senal: AbortSignal): Promise<Repo[]> {
  const respuesta = await fetch(
    `https://api.github.com/users/${usuarioGithub}/repos?per_page=100&sort=pushed`,
    { signal: senal, headers: { Accept: 'application/vnd.github+json' } },
  )
  if (!respuesta.ok) throw new Error(`GitHub respondió ${respuesta.status}`)
  const todos = (await respuesta.json()) as Repo[]
  const propios = todos.filter((r) => !r.fork && !r.archived && !reposExcluidos.includes(r.name))
  const marcados = propios.filter((r) => r.topics?.includes(topicPortafolio))
  return marcados.length > 0 ? marcados : propios
}

export default function ProyectosGithub({ t, idioma }: { t: Contenido['proyectos']; idioma: Idioma }) {
  const [estado, setEstado] = useState<Estado>({ tipo: 'cargando' })

  useEffect(() => {
    const control = new AbortController()
    cargarRepos(control.signal)
      .then((repos) => setEstado({ tipo: 'listo', repos }))
      .catch((e: unknown) => {
        if (!(e instanceof DOMException && e.name === 'AbortError')) setEstado({ tipo: 'error' })
      })
    return () => control.abort()
  }, [])

  const formatoFecha = new Intl.DateTimeFormat(idioma === 'es' ? 'es-CO' : 'en-US', { month: 'short', year: 'numeric' })
  const verTodos = (
    <a className="tarjeta__enlace" href={enlaces.github} target="_blank" rel="noopener noreferrer">
      {t.verTodos} →
    </a>
  )

  if (estado.tipo === 'cargando') return <p className="intro" role="status">{t.cargando}</p>
  if (estado.tipo === 'error' || estado.repos.length === 0) {
    return (
      <div role="status">
        <p className="intro">{t.error}</p>
        {verTodos}
      </div>
    )
  }

  return (
    <>
      <div className="tarjetas">
        {estado.repos.map((r) => (
          <article key={r.name} className="tarjeta">
            <p className="tarjeta__tipo">
              {r.language ?? 'GitHub'} · {t.actualizado} {formatoFecha.format(new Date(r.pushed_at))}
            </p>
            <h3>{r.name}</h3>
            <p>{r.description || t.sinDescripcion}</p>
            {r.topics && r.topics.filter((x) => x !== topicPortafolio).length > 0 && (
              <ul className="etiquetas">
                {r.topics.filter((x) => x !== topicPortafolio).map((x) => <li key={x}>{x}</li>)}
              </ul>
            )}
            <div className="tarjeta__enlaces">
              <a className="tarjeta__enlace" href={r.html_url} target="_blank" rel="noopener noreferrer">
                {t.verCodigo} →
              </a>
              {r.homepage && (
                <a className="tarjeta__enlace" href={r.homepage} target="_blank" rel="noopener noreferrer">
                  {t.verSitio} →
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
      <p className="ver-todos">{verTodos}</p>
    </>
  )
}

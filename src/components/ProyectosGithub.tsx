import { useEffect, useState } from 'react'
import { enlaces, type Contenido } from '../data/perfil'
import { cargarRepos, type Repo } from '../lib/github'

type Estado =
  | { tipo: 'cargando' }
  | { tipo: 'error' }
  | { tipo: 'listo'; repos: Repo[] }

// Los repos llegan ya en el HTML (copia tomada al compilar) y se refrescan en el navegador.
export default function ProyectosGithub({ t, reposIniciales }: { t: Contenido['proyectos']; reposIniciales: Repo[] | null }) {
  const [estado, setEstado] = useState<Estado>(
    reposIniciales && reposIniciales.length > 0 ? { tipo: 'listo', repos: reposIniciales } : { tipo: 'cargando' },
  )

  useEffect(() => {
    const control = new AbortController()
    cargarRepos(control.signal)
      .then((repos) => setEstado({ tipo: 'listo', repos }))
      .catch((e: unknown) => {
        if (e instanceof DOMException && e.name === 'AbortError') return
        setEstado((previo) => (previo.tipo === 'listo' ? previo : { tipo: 'error' }))
      })
    return () => control.abort()
  }, [])

  // Fecha con meses propios: igual en el servidor y en el navegador.
  const fecha = (iso: string) => {
    const d = new Date(iso)
    return `${t.meses[d.getUTCMonth()]} ${d.getUTCFullYear()}`
  }

  const verTodos = (
    <a className="enlace" href={enlaces.github} target="_blank" rel="noopener noreferrer">
      {t.verTodos} →
    </a>
  )

  if (estado.tipo === 'cargando') return <p className="nota-texto" role="status">{t.cargando}</p>
  if (estado.tipo === 'error' || estado.repos.length === 0) {
    return (
      <div role="status" className="proyectos__estado">
        <p className="nota-texto">{t.error}</p>
        {verTodos}
      </div>
    )
  }

  return (
    <>
      <div className="proyectos">
        {estado.repos.map((r) => (
          <article key={r.name} className="ficha">
            <p className="ficha__codigo">
              {[r.language ?? 'GitHub', ...r.topics.slice(0, 3)].join(' · ')}
            </p>
            <h3>{r.name}</h3>
            <p className="ficha__texto">{r.description || t.sinDescripcion}</p>
            <p className="ficha__meta">{t.actualizado} {fecha(r.pushed_at)}</p>
            <div className="ficha__enlaces">
              <a className="enlace" href={r.html_url} target="_blank" rel="noopener noreferrer">{t.verCodigo} →</a>
              {r.homepage && (
                <a className="enlace" href={r.homepage} target="_blank" rel="noopener noreferrer">{t.verSitio} →</a>
              )}
            </div>
          </article>
        ))}
      </div>
      <p className="proyectos__todos">{verTodos}</p>
    </>
  )
}

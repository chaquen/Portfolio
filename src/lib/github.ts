import { reposExcluidos, topicPortafolio, usuarioGithub } from '../data/perfil'

// Solo los campos que usa la página: así la copia que va dentro del HTML es pequeña.
export type Repo = {
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  topics: string[]
  pushed_at: string
}

type RepoApi = Repo & { fork: boolean; archived: boolean }

export const urlRepos = `https://api.github.com/users/${usuarioGithub}/repos?per_page=100&sort=pushed`

// Se muestran los repos públicos que no son fork ni están archivados.
// Si alguno tiene el topic `portafolio`, se muestran solo esos.
export function filtrarRepos(todos: RepoApi[]): Repo[] {
  const propios = todos.filter((r) => !r.fork && !r.archived && !reposExcluidos.includes(r.name))
  const marcados = propios.filter((r) => r.topics?.includes(topicPortafolio))
  return (marcados.length > 0 ? marcados : propios).map((r) => ({
    name: r.name,
    description: r.description,
    html_url: r.html_url,
    homepage: r.homepage,
    language: r.language,
    topics: (r.topics ?? []).filter((t) => t !== topicPortafolio),
    pushed_at: r.pushed_at,
  }))
}

export async function cargarRepos(senal?: AbortSignal): Promise<Repo[]> {
  const respuesta = await fetch(urlRepos, { signal: senal, headers: { Accept: 'application/vnd.github+json' } })
  if (!respuesta.ok) throw new Error(`GitHub respondió ${respuesta.status}`)
  return filtrarRepos((await respuesta.json()) as RepoApi[])
}

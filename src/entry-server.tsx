import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import type { Idioma } from './data/perfil'
import type { Repo } from './lib/github'

export { cargarRepos } from './lib/github'
export { cabeza, llmsTxt, robotsTxt, sitemapXml } from './seo'

// Lo usa scripts/prerender.mjs para escribir el HTML de / y /en/.
export function render(idioma: Idioma, repos: Repo[] | null, anio: number): string {
  return renderToString(
    <StrictMode>
      <App idioma={idioma} reposIniciales={repos} anioActual={anio} />
    </StrictMode>,
  )
}

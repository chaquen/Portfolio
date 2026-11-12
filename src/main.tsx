import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import type { Idioma } from './data/perfil'
import type { Repo } from './lib/github'

// El HTML llega prerenderizado (ver scripts/prerender.mjs). Aquí React lo hidrata
// con los mismos datos que se usaron al compilar, que vienen en #datos-pagina.
type DatosPagina = { repos: Repo[] | null; anio: number }

function leerDatos(): DatosPagina {
  try {
    const nodo = document.getElementById('datos-pagina')
    if (nodo?.textContent) return JSON.parse(nodo.textContent) as DatosPagina
  } catch {
    // Datos dañados: se cargan en vivo.
  }
  return { repos: null, anio: new Date().getFullYear() }
}

const raiz = document.getElementById('root')!
const prerenderizado = raiz.firstElementChild !== null
// Con HTML prerenderizado, el idioma es el que dice <html lang>; así la hidratación
// coincide aunque la página se sirva desde otra ruta. En desarrollo se usa la ruta.
const idioma: Idioma = prerenderizado
  ? document.documentElement.lang === 'en' ? 'en' : 'es'
  : location.pathname.startsWith('/en') ? 'en' : 'es'
const datos = leerDatos()
const app = (
  <StrictMode>
    <App idioma={idioma} reposIniciales={datos.repos} anioActual={datos.anio} />
  </StrictMode>
)

if (prerenderizado) hydrateRoot(raiz, app)
else createRoot(raiz).render(app)

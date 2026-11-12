// Genera HTML real para / y /en/ después de `vite build`, para que buscadores y
// agentes de IA lean el contenido sin ejecutar JavaScript. También escribe
// llms.txt, sitemap.xml y robots.txt. Los proyectos de GitHub se leen aquí; si
// GitHub no responde, la página los carga en el navegador como antes.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..')
const salida = join(raiz, 'build')
const ssr = join(raiz, 'build-ssr')

const { render, cargarRepos, cabeza, llmsTxt, sitemapXml, robotsTxt } = await import(join(ssr, 'entry-server.js'))

let repos = null
try {
  repos = await cargarRepos(AbortSignal.timeout(10000))
  console.log(`prerender: ${repos.length} repos leídos de GitHub`)
} catch (e) {
  console.warn(`prerender: GitHub no respondió (${e.message}); los proyectos se cargarán en el navegador`)
}

const anio = new Date().getFullYear()
const plantilla = await readFile(join(salida, 'index.html'), 'utf8')
if (!plantilla.includes('<!--app-->') || !plantilla.includes('<!--head-->')) {
  throw new Error('index.html no tiene los marcadores <!--head--> y <!--app-->')
}

for (const [idioma, archivo] of [['es', 'index.html'], ['en', join('en', 'index.html')]]) {
  const html = plantilla
    .replace(/<html lang="[^"]*">/, `<html lang="${idioma}">`)
    .replace(/<title>[^<]*<\/title>\s*/, '')
    .replace('<!--head-->', cabeza(idioma, { repos, anio }))
    .replace('<!--app-->', render(idioma, repos, anio))
  await mkdir(dirname(join(salida, archivo)), { recursive: true })
  await writeFile(join(salida, archivo), html)
  console.log(`prerender: ${archivo}`)
}

await writeFile(join(salida, 'llms.txt'), llmsTxt(repos))
await writeFile(join(salida, 'sitemap.xml'), sitemapXml(new Date().toISOString().slice(0, 10)))
await writeFile(join(salida, 'robots.txt'), robotsTxt())
await rm(ssr, { recursive: true, force: true })
console.log('prerender: llms.txt, sitemap.xml y robots.txt listos')

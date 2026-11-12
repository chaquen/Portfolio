// Metadatos para buscadores y agentes de IA: <head>, JSON-LD, llms.txt, sitemap y robots.
import { contenido, enlaces, nombre, rutas, sitioUrl, type Idioma } from './data/perfil'
import type { Repo } from './lib/github'

const url = (idioma: Idioma) => `${sitioUrl}${rutas[idioma]}`
const locale: Record<Idioma, string> = { es: 'es_CO', en: 'en_US' }

const atributo = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
// JSON seguro dentro de <script>: nada puede cerrar la etiqueta.
const jsonEnScript = (v: unknown) => JSON.stringify(v).replace(/</g, '\\u003c')

function persona(idioma: Idioma) {
  const t = contenido[idioma]
  const actual = t.experiencia.items.find((e) => e.fin === null)
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: url(idioma),
    inLanguage: idioma,
    mainEntity: {
      '@type': 'Person',
      name: nombre,
      jobTitle: t.rol,
      description: t.sobreMi,
      url: url(idioma),
      sameAs: [enlaces.linkedin, enlaces.github],
      address: { '@type': 'PostalAddress', addressLocality: 'Bogotá', addressCountry: 'CO' },
      worksFor: actual ? { '@type': 'Organization', name: actual.empresa } : undefined,
      knowsAbout: [...t.habilidades.capas.flatMap((c) => c.items), ...t.habilidades.otras],
      knowsLanguage: ['es', 'en'],
      alumniOf: [
        { '@type': 'CollegeOrUniversity', name: 'Universidad Nacional de Colombia' },
        { '@type': 'CollegeOrUniversity', name: 'Fundación Universitaria del Área Andina' },
        { '@type': 'EducationalOrganization', name: 'SENA' },
      ],
      hasCredential: t.formacion.certificaciones.map((c) => ({
        '@type': 'EducationalOccupationalCredential',
        name: c.texto,
      })),
    },
  }
}

export function cabeza(idioma: Idioma, datosPagina: unknown): string {
  const t = contenido[idioma]
  const otro: Idioma = idioma === 'es' ? 'en' : 'es'
  return [
    `<title>${atributo(t.titulo)}</title>`,
    `<meta name="description" content="${atributo(t.descripcion)}" />`,
    `<link rel="canonical" href="${url(idioma)}" />`,
    `<link rel="alternate" hreflang="es" href="${url('es')}" />`,
    `<link rel="alternate" hreflang="en" href="${url('en')}" />`,
    `<link rel="alternate" hreflang="x-default" href="${url('es')}" />`,
    `<link rel="alternate" type="text/plain" title="llms.txt" href="${sitioUrl}/llms.txt" />`,
    `<meta property="og:type" content="profile" />`,
    `<meta property="og:title" content="${atributo(t.titulo)}" />`,
    `<meta property="og:description" content="${atributo(t.descripcion)}" />`,
    `<meta property="og:url" content="${url(idioma)}" />`,
    `<meta property="og:locale" content="${locale[idioma]}" />`,
    `<meta property="og:locale:alternate" content="${locale[otro]}" />`,
    `<meta property="profile:first_name" content="Edgar Adrián" />`,
    `<meta property="profile:last_name" content="Guzmán Vargas" />`,
    `<meta name="twitter:card" content="summary" />`,
    `<script type="application/ld+json">${jsonEnScript(persona(idioma))}</script>`,
    `<script id="datos-pagina" type="application/json">${jsonEnScript(datosPagina)}</script>`,
  ].join('\n    ')
}

// Resumen en Markdown para agentes de IA (https://llmstxt.org).
export function llmsTxt(repos: Repo[] | null): string {
  const es = contenido.es
  const en = contenido.en
  const l: string[] = []
  l.push(`# ${nombre}`, '')
  l.push(`> ${en.rol}. ${en.descripcion}`, '')
  l.push(en.sobreMi, '')
  l.push('## Pages', '')
  l.push(`- [Portafolio en español](${url('es')}): ${es.descripcion}`)
  l.push(`- [Portfolio in English](${url('en')}): ${en.descripcion}`, '')
  l.push('## Contact', '')
  l.push(`- [LinkedIn](${enlaces.linkedin})`, `- [GitHub](${enlaces.github})`, `- Location: ${en.ubicacion}`, '')
  l.push('## Approach', '', en.enfoque.frase, '')
  for (const c of en.enfoque.tarjetas) l.push(`- **${c.titulo}:** ${c.texto}`)
  l.push('', '## Experience', '')
  for (const e of [...en.experiencia.items].reverse()) {
    l.push(`### ${e.cargo} · ${e.empresa} (${e.inicio} – ${e.fin ?? 'present'})`, '')
    for (const x of e.logros) l.push(`- ${x}`)
    l.push('')
  }
  l.push('## Skills', '')
  for (const c of [...en.habilidades.capas].reverse()) l.push(`- **${c.nombre}:** ${c.items.join(', ')}`)
  l.push(`- **${en.habilidades.tambien}:** ${en.habilidades.otras.join(', ')}`, '')
  l.push('## Education', '')
  for (const h of en.formacion.educacion) l.push(`- ${h.anio}: ${h.texto}`)
  l.push('', '## Courses and certifications', '')
  for (const h of en.formacion.certificaciones) l.push(`- ${h.anio === '—' ? '' : `${h.anio}: `}${h.texto}`)
  l.push('', `Languages: ${en.formacion.idiomas}`, '')
  if (repos && repos.length > 0) {
    l.push('## Open-source projects', '')
    for (const r of repos) l.push(`- [${r.name}](${r.html_url})${r.description ? `: ${r.description}` : ''}`)
    l.push('')
  }
  return l.join('\n')
}

export function sitemapXml(fecha: string): string {
  const entrada = (idioma: Idioma) => `  <url>
    <loc>${url(idioma)}</loc>
    <lastmod>${fecha}</lastmod>
    <xhtml:link rel="alternate" hreflang="es" href="${url('es')}" />
    <xhtml:link rel="alternate" hreflang="en" href="${url('en')}" />
  </url>`
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entrada('es')}
${entrada('en')}
</urlset>
`
}

export function robotsTxt(): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${sitioUrl}/sitemap.xml\n`
}

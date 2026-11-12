// Todo el contenido del sitio sale de aquí. Fuente: CV 2026.
// El sitio resalta la experiencia (10+ años) y el uso de la IA a favor del trabajo.
export type Idioma = 'es' | 'en'

export const usuarioGithub = 'chaquen'

// Si algún repo tiene este topic en GitHub, solo se muestran los que lo tengan.
export const topicPortafolio = 'portafolio'

// Repos que nunca se muestran en la sección de proyectos.
export const reposExcluidos = ['chaquen', 'Portfolio']

// Dirección pública del sitio: se usa en canonical, hreflang, sitemap y llms.txt.
export const sitioUrl = 'https://portfolio-adrian-guzman-s-projects.vercel.app'

export const rutas: Record<Idioma, string> = { es: '/', en: '/en/' }

export const enlaces = {
  linkedin: 'https://www.linkedin.com/in/eaguzmanv',
  github: 'https://github.com/chaquen',
}

export const nombre = 'Edgar Adrián Guzmán Vargas'
export const anioInicio = 2015

type Dato = { valor: string; unidad: string; texto: string; ia?: boolean }
type TarjetaEnfoque = { titulo: string; texto: string; ia?: boolean }
export type Experiencia = {
  cargo: string
  empresa: string
  lugar: string
  inicio: number
  fin: number | null // null = actual
  resumen: string
  logros: string[]
}
type Capa = { nombre: string; items: string[] }
type Hito = { anio: string; texto: string }

export type Contenido = {
  nav: { enfoque: string; experiencia: string; habilidades: string; proyectos: string; formacion: string; contacto: string }
  saltar: string
  menu: string
  idioma: string
  titulo: string
  descripcion: string
  ceja: string
  rol: string
  lema: string
  sobreMi: string
  ubicacion: string
  datos: Dato[]
  enfoque: { titulo: string; frase: string; tarjetas: TarjetaEnfoque[] }
  experiencia: { titulo: string; escala: string; actual: string; hoy: string; verLogros: string; cota: string; items: Experiencia[] }
  habilidades: { titulo: string; nota: string; capa: string; tambien: string; capas: Capa[]; otras: string[] }
  proyectos: { titulo: string; nota: string; intro: string; verCodigo: string; verSitio: string; cargando: string; error: string; verTodos: string; sinDescripcion: string; actualizado: string; meses: string[] }
  formacion: { titulo: string; educacionTitulo: string; educacion: Hito[]; certificacionesTitulo: string; certificaciones: Hito[]; idiomasTitulo: string; idiomas: string }
  contacto: { titulo: string; texto: string; boton: string }
  cajetin: { autor: string; oficio: string; oficioValor: string; escala: string }
  pie: string
}

// Las capas van de abajo hacia arriba, igual que en la maqueta del fondo.
const capasComunes = {
  backend: ['C# / .NET Core', '.NET Framework', 'Python', 'Node.js', 'TypeScript', 'PHP (Laravel)', 'Docker', 'CI/CD', 'Terraform', 'Git'],
  datos: ['SQL Server', 'MySQL', 'MongoDB', 'Redis', 'RabbitMQ', 'Kafka'],
}

export const contenido: Record<Idioma, Contenido> = {
  es: {
    nav: { enfoque: 'Enfoque', experiencia: 'Experiencia', habilidades: 'Habilidades', proyectos: 'Proyectos', formacion: 'Formación', contacto: 'Contacto' },
    saltar: 'Saltar al contenido',
    menu: 'Menú',
    idioma: 'Idioma',
    titulo: 'Edgar Adrián Guzmán Vargas · Desarrollador .NET Senior y arquitecto de software',
    descripcion: 'Desarrollador .NET Senior y arquitecto de software con más de 10 años de experiencia. Microservicios, integraciones orientadas a eventos, liderazgo técnico y agentes con LLM.',
    ceja: 'Plano Nº 01 · Ingeniería de software',
    rol: 'Desarrollador .NET Senior · Arquitecto de software',
    lema: 'Más de 10 años construyendo software que escala. Trabajo con la IA como parte del equipo para explorar, prototipar y entregar más rápido; el criterio de arquitectura lo pongo yo.',
    sobreMi: 'Ingeniero de software con más de 10 años de trayectoria. He liderado la modernización de sistemas legados hacia microservicios con .NET Core, arquitecturas serverless y en contenedores, e integraciones asíncronas orientadas a eventos. Soy Magíster en Ingeniería de Sistemas y Computación de la Universidad Nacional de Colombia, lidero técnicamente una célula de desarrollo y diseño arquitecturas agénticas basadas en LLM.',
    ubicacion: 'Bogotá, Colombia',
    datos: [
      { valor: '10+', unidad: 'años', texto: 'desarrollando software, de 2015 a hoy' },
      { valor: 'Líder', unidad: 'técnico', texto: 'de una célula de desarrollo y mentor de perfiles Junior y Semi-Senior' },
      { valor: 'Magíster', unidad: '', texto: 'en Ingeniería de Sistemas y Computación · U. Nacional, 2026' },
      { valor: 'IA', unidad: 'aplicada', texto: 'arquitecturas agénticas con LLM y pruebas de concepto', ia: true },
    ],
    enfoque: {
      titulo: 'Enfoque',
      frase: '10 años de oficio, con la IA a mi favor: la uso para ir más rápido, no para pensar menos.',
      tarjetas: [
        { titulo: 'Arquitectura con criterio', texto: 'He llevado sistemas de monolito a microservicios y de código legado a .NET Core. Decido cómo se divide un sistema y por qué.' },
        { titulo: 'La IA en mi flujo de trabajo', texto: 'Uso asistentes de IA para explorar opciones, escribir pruebas y documentar. Reviso y respondo por cada línea que entra al código.', ia: true },
        { titulo: 'Agentes con LLM', texto: 'Diseño arquitecturas de sistemas agénticos y pruebas de concepto para automatizar procesos internos, con LangGraph.', ia: true },
        { titulo: 'Equipo y entrega', texto: 'Lidero una célula de desarrollo, acompaño a perfiles Junior y Semi-Senior y automatizo despliegues con CI/CD.' },
      ],
    },
    experiencia: {
      titulo: 'Experiencia',
      escala: 'escala: 1 columna = 1 año',
      actual: 'Actual',
      hoy: 'Hoy',
      verLogros: 'Ver logros',
      cota: '10+ años de oficio',
      items: [
        {
          cargo: 'Desarrollador',
          empresa: 'Freelance',
          lugar: 'Bogotá',
          inicio: 2015,
          fin: 2019,
          resumen: 'Aplicaciones web a la medida, del requerimiento al despliegue.',
          logros: [
            'Desarrollé aplicaciones web a la medida, desde el levantamiento de requerimientos hasta el despliegue.',
            'Traduje las necesidades de clientes finales en soluciones técnicas.',
          ],
        },
        {
          cargo: 'Desarrollador de software',
          empresa: 'Big Pass',
          lugar: 'Bogotá',
          inicio: 2019,
          fin: 2021,
          resumen: 'Llevé un monolito en PHP a microservicios con .NET Core.',
          logros: [
            'Ejecuté la transición de una aplicación monolítica en PHP hacia microservicios con .NET Core.',
            'Mejoré procesos de software para facilitar el escalamiento de los servicios de la compañía.',
            'Mantenimiento preventivo y correctivo de las plataformas críticas del negocio.',
          ],
        },
        {
          cargo: 'Desarrollador .NET Senior',
          empresa: 'RGC Activa',
          lugar: 'Bogotá',
          inicio: 2021,
          fin: null,
          resumen: 'Modernizo sistemas legados hacia .NET Core, serverless y contenedores. Diseño integraciones orientadas a eventos, automatizo CI/CD e infraestructura como código, lidero el equipo y diseño agentes con LLM.',
          logros: [
            'Lideré la migración de aplicaciones con código legado hacia .NET Core, servicios serverless y contenedores (Docker).',
            'Diseño integraciones asíncronas y orientadas a eventos con colas, buses de eventos, orquestación de flujos y RabbitMQ.',
            'Implemento flujos de CI/CD e infraestructura como código con Terraform.',
            'Coordino técnicamente nuevas funcionalidades, lidero un equipo de desarrolladores y brindo mentoría.',
            'Diseñé arquitecturas de sistemas agénticos basados en LLM y pruebas de concepto para automatizar procesos internos.',
            'Entré como Semi-Senior en 2021: evalué nuevos stacks para la modernización y ascendí a Senior ese mismo año.',
          ],
        },
      ],
    },
    habilidades: {
      titulo: 'Habilidades',
      nota: 'cada capa del plano es un grupo',
      capa: 'Capa',
      tambien: 'También',
      capas: [
        { nombre: 'Backend y entrega', items: capasComunes.backend },
        { nombre: 'Datos e integración', items: [...capasComunes.datos, 'Mensajería asíncrona'] },
        { nombre: 'Arquitectura', items: ['Microservicios', 'Orientada a eventos', 'Hexagonal', 'DDD', 'Alta disponibilidad', 'APIs REST', 'Patrones de diseño'] },
        { nombre: 'IA · agentes', items: ['Soluciones con LLM', 'Arquitecturas agénticas', 'LangGraph', 'Pruebas de concepto'] },
      ],
      otras: ['React', 'JavaScript (ES6+)', 'HTML5 / CSS3', 'Scrum', 'Kanban', 'Pruebas unitarias', 'Mentoría'],
    },
    proyectos: {
      titulo: 'Proyectos',
      nota: 'en vivo desde github.com/chaquen',
      intro: 'Mi trabajo en empresa vive en repositorios privados; aquí están mis proyectos personales.',
      verCodigo: 'Ver código',
      verSitio: 'Ver sitio',
      cargando: 'Cargando proyectos desde GitHub…',
      error: 'No pude cargar los proyectos en este momento.',
      verTodos: 'Ver todos mis repositorios en GitHub',
      sinDescripcion: 'Sin descripción.',
      actualizado: 'Actualizado',
      meses: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
    },
    formacion: {
      titulo: 'Formación',
      educacionTitulo: 'Educación',
      educacion: [
        { anio: '2026', texto: 'Magíster en Ingeniería de Sistemas y Computación — Universidad Nacional de Colombia' },
        { anio: '2022', texto: 'Ingeniería de Sistemas — Fundación Universitaria del Área Andina' },
        { anio: '2016', texto: 'Especialización Técnica en Aplicaciones Móviles — SENA' },
        { anio: '2015', texto: 'Tecnología en Análisis y Desarrollo de Sistemas de Información — SENA' },
      ],
      certificacionesTitulo: 'Cursos y certificaciones',
      certificaciones: [
        { anio: '2026', texto: 'Fundamentos de Construcción de Agentes — Universidad de los Andes' },
        { anio: '2025', texto: 'Diplomado: DevOps, Arquitectura a Gran Escala y Transformación Digital — U. Nacional' },
        { anio: '2024', texto: 'Diplomado: Agilismo, Cloud Computing y Procesos de Negocio — U. Nacional' },
        { anio: '2023', texto: 'AWS Certified Cloud Practitioner' },
        { anio: '—', texto: 'Microsoft Certified: Programming in HTML5 with JavaScript & CSS3' },
      ],
      idiomasTitulo: 'Idiomas',
      idiomas: 'Español (nativo) · Inglés (B1)',
    },
    contacto: {
      titulo: 'Contacto',
      texto: '¿Tienes un proyecto o una oportunidad en mente?',
      boton: 'Escríbeme por LinkedIn',
    },
    cajetin: { autor: 'Autor', oficio: 'Oficio', oficioValor: '10+ años · IA', escala: 'Escala' },
    pie: 'Hecho con React y Vite.',
  },
  en: {
    nav: { enfoque: 'Approach', experiencia: 'Experience', habilidades: 'Skills', proyectos: 'Projects', formacion: 'Education', contacto: 'Contact' },
    saltar: 'Skip to content',
    menu: 'Menu',
    idioma: 'Language',
    titulo: 'Edgar Adrián Guzmán Vargas · Senior .NET Developer and Software Architect',
    descripcion: 'Senior .NET developer and software architect with 10+ years of experience. Microservices, event-driven integrations, technical leadership and LLM-based agents.',
    ceja: 'Drawing Nº 01 · Software engineering',
    rol: 'Senior .NET Developer · Software Architect',
    lema: '10+ years building software that scales. I work with AI as part of the team to explore, prototype and ship faster; the architectural judgment is mine.',
    sobreMi: 'Software engineer with 10+ years of experience. I have led the modernization of legacy systems into .NET Core microservices, serverless and container-based architectures, and asynchronous event-driven integrations. I hold an MSc in Systems and Computer Engineering from the National University of Colombia, lead a development team and design LLM-based agentic architectures.',
    ubicacion: 'Bogotá, Colombia',
    datos: [
      { valor: '10+', unidad: 'years', texto: 'building software, from 2015 to today' },
      { valor: 'Tech', unidad: 'lead', texto: 'of a development team and mentor to junior and mid-level developers' },
      { valor: 'MSc', unidad: '', texto: 'in Systems and Computer Engineering · National University of Colombia, 2026' },
      { valor: 'AI', unidad: 'applied', texto: 'LLM-based agentic architectures and proofs of concept', ia: true },
    ],
    enfoque: {
      titulo: 'Approach',
      frase: '10 years of craft, with AI on my side: I use it to move faster, not to think less.',
      tarjetas: [
        { titulo: 'Architecture with judgment', texto: 'I have taken systems from monoliths to microservices and from legacy code to .NET Core. I decide how a system is split and why.' },
        { titulo: 'AI in my workflow', texto: 'I use AI assistants to explore options, write tests and document. I review and own every line that goes into the code.', ia: true },
        { titulo: 'LLM agents', texto: 'I design agentic system architectures and proofs of concept to automate internal processes, using LangGraph.', ia: true },
        { titulo: 'Team and delivery', texto: 'I lead a development team, mentor junior and mid-level developers and automate deployments with CI/CD.' },
      ],
    },
    experiencia: {
      titulo: 'Experience',
      escala: 'scale: 1 column = 1 year',
      actual: 'Current',
      hoy: 'Today',
      verLogros: 'See highlights',
      cota: '10+ years of craft',
      items: [
        {
          cargo: 'Developer',
          empresa: 'Freelance',
          lugar: 'Bogotá',
          inicio: 2015,
          fin: 2019,
          resumen: 'Custom web applications, from requirements to deployment.',
          logros: [
            'Built custom web applications, from requirements gathering to deployment.',
            "Turned end clients' needs into technical solutions.",
          ],
        },
        {
          cargo: 'Software Developer',
          empresa: 'Big Pass',
          lugar: 'Bogotá',
          inicio: 2019,
          fin: 2021,
          resumen: 'Moved a PHP monolith to .NET Core microservices.',
          logros: [
            'Moved a monolithic PHP application to a .NET Core microservices ecosystem.',
            "Improved software processes to help scale the company's services.",
            'Preventive and corrective maintenance of business-critical platforms.',
          ],
        },
        {
          cargo: 'Senior .NET Developer',
          empresa: 'RGC Activa',
          lugar: 'Bogotá',
          inicio: 2021,
          fin: null,
          resumen: 'I modernize legacy systems into .NET Core, serverless and containers. I design event-driven integrations, automate CI/CD and infrastructure as code, lead the team and design LLM agents.',
          logros: [
            'Led the migration of legacy applications to .NET Core, serverless services and containers (Docker).',
            'Design asynchronous, event-driven integrations with queues, event buses, workflow orchestration and RabbitMQ.',
            'Implement CI/CD pipelines and infrastructure as code with Terraform.',
            'Coordinate the technical delivery of new features, lead a team of developers and mentor them.',
            'Designed LLM-based agentic system architectures and proofs of concept to automate internal processes.',
            'Joined as a mid-level developer in 2021, evaluated new stacks for modernization and was promoted to Senior the same year.',
          ],
        },
      ],
    },
    habilidades: {
      titulo: 'Skills',
      nota: 'each layer of the drawing is a group',
      capa: 'Layer',
      tambien: 'Also',
      capas: [
        { nombre: 'Backend & delivery', items: capasComunes.backend },
        { nombre: 'Data & integration', items: [...capasComunes.datos, 'Async messaging'] },
        { nombre: 'Architecture', items: ['Microservices', 'Event-driven', 'Hexagonal', 'DDD', 'High availability', 'REST APIs', 'Design patterns'] },
        { nombre: 'AI · agents', items: ['LLM solutions', 'Agentic architectures', 'LangGraph', 'Proofs of concept'] },
      ],
      otras: ['React', 'JavaScript (ES6+)', 'HTML5 / CSS3', 'Scrum', 'Kanban', 'Unit testing', 'Mentoring'],
    },
    proyectos: {
      titulo: 'Projects',
      nota: 'live from github.com/chaquen',
      intro: 'My company work lives in private repositories; these are my personal projects.',
      verCodigo: 'View code',
      verSitio: 'View site',
      cargando: 'Loading projects from GitHub…',
      error: 'I could not load the projects right now.',
      verTodos: 'See all my repositories on GitHub',
      sinDescripcion: 'No description.',
      actualizado: 'Updated',
      meses: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    formacion: {
      titulo: 'Education',
      educacionTitulo: 'Degrees',
      educacion: [
        { anio: '2026', texto: 'MSc in Systems and Computer Engineering — National University of Colombia' },
        { anio: '2022', texto: 'BSc in Systems Engineering — Fundación Universitaria del Área Andina' },
        { anio: '2016', texto: 'Technical Specialization in Mobile Applications — SENA' },
        { anio: '2015', texto: 'Technologist in Information Systems Analysis and Development — SENA' },
      ],
      certificacionesTitulo: 'Courses and certifications',
      certificaciones: [
        { anio: '2026', texto: 'Foundations of Building Agents — Universidad de los Andes' },
        { anio: '2025', texto: 'Diploma: DevOps, Large-Scale Architecture and Digital Transformation — National University of Colombia' },
        { anio: '2024', texto: 'Diploma: Agile, Cloud Computing and Business Processes — National University of Colombia' },
        { anio: '2023', texto: 'AWS Certified Cloud Practitioner' },
        { anio: '—', texto: 'Microsoft Certified: Programming in HTML5 with JavaScript & CSS3' },
      ],
      idiomasTitulo: 'Languages',
      idiomas: 'Spanish (native) · English (B1)',
    },
    contacto: {
      titulo: 'Contact',
      texto: 'Have a project or an opportunity in mind?',
      boton: 'Message me on LinkedIn',
    },
    cajetin: { autor: 'Author', oficio: 'Craft', oficioValor: '10+ years · AI', escala: 'Scale' },
    pie: 'Built with React and Vite.',
  },
}

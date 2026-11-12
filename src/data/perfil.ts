// Todo el contenido del sitio sale de aquí. Fuente: CV 2026 (Arquitecto de Software AWS).
export type Idioma = 'es' | 'en'

export const usuarioGithub = 'chaquen'

// Si algún repo tiene este topic en GitHub, solo se muestran los que lo tengan.
export const topicPortafolio = 'portafolio'

// Repos que nunca se muestran en la sección de proyectos.
export const reposExcluidos = ['chaquen', 'Portfolio']

export const enlaces = {
  linkedin: 'https://www.linkedin.com/in/eaguzmanv',
  github: 'https://github.com/chaquen',
}

export const nombre = 'Edgar Adrián Guzmán Vargas'

type Experiencia = {
  cargo: string
  empresa: string
  lugar: string
  periodo: string
  logros: string[]
}

type GrupoHabilidades = { titulo: string; items: string[] }

export type Contenido = {
  nav: { sobreMi: string; experiencia: string; proyectos: string; habilidades: string; formacion: string; contacto: string }
  saltar: string
  rol: string
  lema: string
  ubicacion: string
  destacados: string[]
  sobreMi: { titulo: string; parrafos: string[] }
  experiencia: { titulo: string; items: Experiencia[] }
  proyectos: { titulo: string; intro: string; verCodigo: string; verSitio: string; cargando: string; error: string; verTodos: string; sinDescripcion: string; actualizado: string }
  habilidades: { titulo: string; grupos: GrupoHabilidades[] }
  formacion: { titulo: string; educacionTitulo: string; educacion: string[]; certificacionesTitulo: string; certificaciones: string[]; idiomasTitulo: string; idiomas: string }
  contacto: { titulo: string; texto: string }
  pie: string
}

const habilidadesComunes = {
  nube: ['Lambda', 'API Gateway', 'S3', 'ECR', 'CloudWatch', 'SQS', 'SNS', 'EventBridge', 'Step Functions'],
  iac: ['AWS CDK', 'Terraform', 'CloudFormation / SAM', 'Pulumi', 'Docker', 'CI/CD', 'Git (GitFlow)'],
  mensajeria: ['SQS / SNS', 'EventBridge', 'Step Functions', 'RabbitMQ', 'Kafka', 'APIs REST'],
  backend: ['C# / .NET Core', '.NET Framework', 'Python', 'PHP (Laravel)', 'Node.js', 'TypeScript'],
  datos: ['SQL Server', 'MySQL', 'MongoDB', 'Redis'],
  frontend: ['React', 'TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3 (SASS / LESS)'],
}

export const contenido: Record<Idioma, Contenido> = {
  es: {
    nav: { sobreMi: 'Sobre mí', experiencia: 'Experiencia', proyectos: 'Proyectos', habilidades: 'Habilidades', formacion: 'Formación', contacto: 'Contacto' },
    saltar: 'Saltar al contenido',
    rol: 'Desarrollador .NET Senior · Arquitectura cloud AWS',
    lema: 'Diseño y evoluciono soluciones escalables en AWS: microservicios, integraciones orientadas a eventos e infraestructura como código.',
    ubicacion: 'Colombia',
    destacados: ['10 años en desarrollo de software', 'Magíster · Universidad Nacional de Colombia', 'AWS Certified Cloud Practitioner'],
    sobreMi: {
      titulo: 'Sobre mí',
      parrafos: [
        'Soy ingeniero de software con 10 años de trayectoria, enfocado en el diseño y la evolución de soluciones escalables en AWS. He liderado la modernización de sistemas legados hacia microservicios con .NET Core, arquitecturas serverless y en contenedores, e integraciones asíncronas orientadas a eventos.',
        'Automatizo despliegues con CI/CD e infraestructura como código (AWS CDK, Terraform). Soy Magíster en Ingeniería de Sistemas y Computación de la Universidad Nacional de Colombia, con una tesis aplicada a la evaluación de disponibilidad de sistemas en un caso empresarial real.',
        'También lidero técnicamente células de desarrollo, acompaño a perfiles Junior y Semi-Senior, y diseño arquitecturas agénticas basadas en LLM.',
      ],
    },
    experiencia: {
      titulo: 'Experiencia',
      items: [
        {
          cargo: 'Desarrollador .NET Senior',
          empresa: 'RGC Activa',
          lugar: 'Bogotá, Colombia',
          periodo: '2021 – Actualidad',
          logros: [
            'Diseño y desarrollo soluciones serverless y en contenedores sobre AWS (Lambda, API Gateway, S3, ECR, CloudWatch) y GCP.',
            'Lideré la migración de aplicaciones con código legado hacia .NET Core, servicios serverless y contenedores (Docker).',
            'Diseño integraciones asíncronas y orientadas a eventos con SQS/SNS, EventBridge, Step Functions y RabbitMQ.',
            'Implemento flujos de CI/CD e infraestructura como código con AWS CDK y Terraform.',
            'Coordino técnicamente nuevas funcionalidades, lidero un equipo de desarrolladores y brindo mentoría.',
            'Diseñé arquitecturas de sistemas agénticos basados en LLM y pruebas de concepto para automatizar procesos internos.',
          ],
        },
        {
          cargo: 'Desarrollador .NET Semi-Senior',
          empresa: 'RGC Activa',
          lugar: 'Bogotá, Colombia',
          periodo: '2021',
          logros: [
            'Participé en la evaluación y selección de nuevos stacks tecnológicos para los proyectos de modernización.',
            'Mantenimiento preventivo y correctivo de aplicaciones críticas. Ascendí a Senior el mismo año.',
          ],
        },
        {
          cargo: 'Desarrollador de software',
          empresa: 'Big Pass',
          lugar: 'Bogotá, Colombia',
          periodo: '2019 – 2021',
          logros: [
            'Ejecuté la transición de una aplicación monolítica en PHP hacia microservicios con .NET Core.',
            'Mejoré procesos de software para facilitar el escalamiento de los servicios de la compañía.',
            'Mantenimiento preventivo y correctivo de las plataformas críticas del negocio.',
          ],
        },
        {
          cargo: 'Desarrollador',
          empresa: 'Freelance',
          lugar: 'Bogotá, Colombia',
          periodo: '2015 – 2019',
          logros: [
            'Desarrollé aplicaciones web a la medida, desde el levantamiento de requerimientos hasta el despliegue.',
            'Traduje las necesidades de clientes finales en soluciones técnicas.',
          ],
        },
      ],
    },
    proyectos: {
      titulo: 'Proyectos',
      intro: 'Se cargan en vivo desde mi GitHub. Mi trabajo con .NET y AWS en empresa está en repositorios privados, por eso aquí aparecen mis proyectos personales.',
      verCodigo: 'Ver código',
      verSitio: 'Ver sitio',
      cargando: 'Cargando proyectos desde GitHub…',
      error: 'No pude cargar los proyectos en este momento.',
      verTodos: 'Ver todos mis repositorios en GitHub',
      sinDescripcion: 'Sin descripción.',
      actualizado: 'Actualizado',
    },
    habilidades: {
      titulo: 'Habilidades',
      grupos: [
        { titulo: 'Nube AWS', items: habilidadesComunes.nube },
        { titulo: 'IaC y DevOps', items: habilidadesComunes.iac },
        { titulo: 'Arquitectura', items: ['Microservicios', 'Orientada a eventos', 'Hexagonal', 'DDD', 'APIs RESTful', 'Alta disponibilidad', 'Patrones de diseño'] },
        { titulo: 'Integración y mensajería', items: habilidadesComunes.mensajeria },
        { titulo: 'Backend', items: habilidadesComunes.backend },
        { titulo: 'Bases de datos', items: habilidadesComunes.datos },
        { titulo: 'Frontend', items: habilidadesComunes.frontend },
        { titulo: 'IA', items: ['Soluciones con LLM', 'Arquitecturas agénticas', 'Pruebas de concepto', 'LangGraph'] },
        { titulo: 'Metodologías', items: ['Scrum', 'Kanban', 'Pruebas unitarias'] },
      ],
    },
    formacion: {
      titulo: 'Formación',
      educacionTitulo: 'Educación',
      educacion: [
        'Magíster en Ingeniería de Sistemas y Computación — Universidad Nacional de Colombia (2026)',
        'Ingeniería de Sistemas — Fundación Universitaria del Área Andina (2022)',
        'Especialización Técnica en Aplicaciones Móviles — SENA (2016)',
        'Tecnología en Análisis y Desarrollo de Sistemas de Información — SENA (2015)',
      ],
      certificacionesTitulo: 'Certificaciones',
      certificaciones: [
        'Curso: Fundamentos de Construcción de Agentes — Universidad de los Andes (2026)',
        'Diplomado: DevOps, Arquitectura a Gran Escala y Transformación Digital — Universidad Nacional de Colombia (2025)',
        'Diplomado: Agilismo, Cloud Computing y Procesos de Negocio — Universidad Nacional de Colombia (2024)',
        'AWS Certified Cloud Practitioner (2023)',
        'Microsoft Certified: Programming in HTML5 with JavaScript & CSS3',
      ],
      idiomasTitulo: 'Idiomas',
      idiomas: 'Español (nativo) · Inglés (B1)',
    },
    contacto: {
      titulo: 'Contacto',
      texto: '¿Tienes un proyecto o una oportunidad en mente? Escríbeme por LinkedIn.',
    },
    pie: 'Hecho con React y Vite.',
  },
  en: {
    nav: { sobreMi: 'About', experiencia: 'Experience', proyectos: 'Projects', habilidades: 'Skills', formacion: 'Education', contacto: 'Contact' },
    saltar: 'Skip to content',
    rol: 'Senior .NET Developer · AWS Cloud Architecture',
    lema: 'I design and evolve scalable solutions on AWS: microservices, event-driven integrations and infrastructure as code.',
    ubicacion: 'Colombia',
    destacados: ['10 years in software development', 'MSc · National University of Colombia', 'AWS Certified Cloud Practitioner'],
    sobreMi: {
      titulo: 'About me',
      parrafos: [
        "I'm a software engineer with 10 years of experience, focused on designing and evolving scalable solutions on AWS. I have led the modernization of legacy systems into .NET Core microservices, serverless and container-based architectures, and asynchronous event-driven integrations.",
        'I automate deployments with CI/CD and infrastructure as code (AWS CDK, Terraform). I hold an MSc in Systems and Computer Engineering from the National University of Colombia, with a thesis on evaluating system availability in a real business case.',
        'I also act as technical lead for development teams, mentor junior and mid-level developers, and design LLM-based agentic architectures.',
      ],
    },
    experiencia: {
      titulo: 'Experience',
      items: [
        {
          cargo: 'Senior .NET Developer',
          empresa: 'RGC Activa',
          lugar: 'Bogotá, Colombia',
          periodo: '2021 – Present',
          logros: [
            'Design and build serverless and container-based solutions on AWS (Lambda, API Gateway, S3, ECR, CloudWatch) and GCP.',
            'Led the migration of legacy applications to .NET Core, serverless services and containers (Docker).',
            'Design asynchronous, event-driven integrations with SQS/SNS, EventBridge, Step Functions and RabbitMQ.',
            'Implement CI/CD pipelines and infrastructure as code with AWS CDK and Terraform.',
            'Coordinate the technical delivery of new features, lead a team of developers and mentor them.',
            'Designed LLM-based agentic system architectures and proofs of concept to automate internal processes.',
          ],
        },
        {
          cargo: '.NET Developer (Mid-level)',
          empresa: 'RGC Activa',
          lugar: 'Bogotá, Colombia',
          periodo: '2021',
          logros: [
            'Took part in evaluating and selecting new technology stacks for modernization projects.',
            'Preventive and corrective maintenance of critical applications. Promoted to Senior the same year.',
          ],
        },
        {
          cargo: 'Software Developer',
          empresa: 'Big Pass',
          lugar: 'Bogotá, Colombia',
          periodo: '2019 – 2021',
          logros: [
            'Moved a monolithic PHP application to a .NET Core microservices ecosystem.',
            "Improved software processes to help scale the company's services.",
            'Preventive and corrective maintenance of business-critical platforms.',
          ],
        },
        {
          cargo: 'Developer',
          empresa: 'Freelance',
          lugar: 'Bogotá, Colombia',
          periodo: '2015 – 2019',
          logros: [
            'Built custom web applications, from requirements gathering to deployment.',
            "Turned end clients' needs into technical solutions.",
          ],
        },
      ],
    },
    proyectos: {
      titulo: 'Projects',
      intro: 'Loaded live from my GitHub. My .NET and AWS work at companies lives in private repositories, so these are my personal projects.',
      verCodigo: 'View code',
      verSitio: 'View site',
      cargando: 'Loading projects from GitHub…',
      error: 'I could not load the projects right now.',
      verTodos: 'See all my repositories on GitHub',
      sinDescripcion: 'No description.',
      actualizado: 'Updated',
    },
    habilidades: {
      titulo: 'Skills',
      grupos: [
        { titulo: 'AWS Cloud', items: habilidadesComunes.nube },
        { titulo: 'IaC & DevOps', items: habilidadesComunes.iac },
        { titulo: 'Architecture', items: ['Microservices', 'Event-driven', 'Hexagonal', 'DDD', 'RESTful APIs', 'High availability', 'Design patterns'] },
        { titulo: 'Integration & messaging', items: habilidadesComunes.mensajeria },
        { titulo: 'Backend', items: habilidadesComunes.backend },
        { titulo: 'Databases', items: habilidadesComunes.datos },
        { titulo: 'Frontend', items: habilidadesComunes.frontend },
        { titulo: 'AI', items: ['LLM solutions', 'Agentic architectures', 'Proofs of concept', 'LangGraph'] },
        { titulo: 'Methodologies', items: ['Scrum', 'Kanban', 'Unit testing'] },
      ],
    },
    formacion: {
      titulo: 'Education',
      educacionTitulo: 'Degrees',
      educacion: [
        'MSc in Systems and Computer Engineering — National University of Colombia (2026)',
        'BSc in Systems Engineering — Fundación Universitaria del Área Andina (2022)',
        'Technical Specialization in Mobile Applications — SENA (2016)',
        'Technologist in Information Systems Analysis and Development — SENA (2015)',
      ],
      certificacionesTitulo: 'Certifications',
      certificaciones: [
        'Course: Foundations of Building Agents — Universidad de los Andes (2026)',
        'Diploma: DevOps, Large-Scale Architecture and Digital Transformation — National University of Colombia (2025)',
        'Diploma: Agile, Cloud Computing and Business Processes — National University of Colombia (2024)',
        'AWS Certified Cloud Practitioner (2023)',
        'Microsoft Certified: Programming in HTML5 with JavaScript & CSS3',
      ],
      idiomasTitulo: 'Languages',
      idiomas: 'Spanish (native) · English (B1)',
    },
    contacto: {
      titulo: 'Contact',
      texto: 'Have a project or an opportunity in mind? Reach me on LinkedIn.',
    },
    pie: 'Built with React and Vite.',
  },
}

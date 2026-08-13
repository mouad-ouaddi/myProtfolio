// ---------------------------------------------------------------------------
// PARCOURS / EXPÉRIENCE - ajoutez ou modifiez des entrées ; la frise se met à
// jour automatiquement.
// type : education | project | internship
// highlight : met l'entrée en avant (utilisé pour SUP2I).
// subtitle : ligne secondaire affichée sous le titre.
// bullets : liste à puces affichée dans la description.
// ---------------------------------------------------------------------------

const entries = [
  {
    type: 'education',
    period: '2022 - 2023',
    title: { fr: 'Baccalauréat Scientifique', en: 'Scientific Baccalaureate' },
    subtitle: { fr: 'Option Physique', en: 'Physics option' },
    organization: 'Lycée Zineb Nafzaouia - Casablanca',
    description: {
      fr: 'Obtention du baccalauréat scientifique, option physique.',
      en: 'Completion of the scientific baccalaureate, physics option.',
    },
    tags: ['Physique'],
  },
  {
    type: 'education',
    period: '2023 - 2025',
    title: {
      fr: 'Technicien Spécialisé en Développement Digital',
      en: 'Specialized Technician in Digital Development',
    },
    subtitle: { fr: 'Option Full Stack', en: 'Full Stack option' },
    organization: 'Institut Spécialisé de Gestion et de l’Informatique - Casablanca',
    description: {
      fr: 'Bac+2 en développement full stack : frontend, backend, conception de bases de données et bonnes pratiques du métier.',
      en: 'Two-year degree in full stack development: frontend, backend, database design and industry best practices.',
    },
    tags: ['Full Stack', 'PHP', 'Laravel', 'MySQL'],
  },
  {
    type: 'education',
    highlight: true,
    period: '2025 - Présent',
    title: {
      fr: 'Licence Professionnelle en Développement Informatique',
      en: 'Professional Bachelor in Software Development',
    },
    organization: 'École SUP2I - Casablanca',
    description: {
      fr: 'Licence professionnelle en cours, orientée développement logiciel. Technologies étudiées : J2EE, Spring Boot et Python.',
      en: 'Ongoing professional bachelor focused on software development. Studied technologies: J2EE, Spring Boot and Python.',
    },
    tags: ['J2EE', 'Spring Boot', 'Python'],
  },
  {
    type: 'project',
    period: 'Janvier 2023',
    title: {
      fr: 'Création front-end d’un site web de vente de motos',
      en: 'Front-end creation of a motorcycle sales website',
    },
    organization: 'Projet académique',
    description: {
      fr: 'Interface complète avec navigation fluide et fiches produits.',
      en: 'Complete interface with smooth navigation and product sheets.',
    },
    bullets: {
      fr: ['Accueil', 'Catalogue', 'Détails', 'Contact', 'Navigation fluide', 'Fiches produits avec image, prix et description'],
      en: ['Home', 'Catalogue', 'Details', 'Contact', 'Smooth navigation', 'Product sheets with image, price and description'],
    },
    tags: ['Front-end'],
  },
  {
    type: 'project',
    period: 'Mai 2023',
    title: {
      fr: 'Projet de gestion des absences des stagiaires',
      en: 'Intern absence management project',
    },
    organization: 'Projet académique',
    description: {
      fr: 'Site PHP/MySQL de gestion et de suivi des absences.',
      en: 'PHP/MySQL website for managing and tracking absences.',
    },
    bullets: {
      fr: ['Tableau de bord', 'Gestion des stagiaires', 'Suivi des absences', 'Historique', 'Rapports'],
      en: ['Dashboard', 'Intern management', 'Absence tracking', 'History', 'Reports'],
    },
    tags: ['PHP', 'MySQL'],
  },
  {
    type: 'internship',
    period: 'Avril 2025',
    title: { fr: 'Développeur Web', en: 'Web Developer' },
    subtitle: { fr: 'Stage - Vente de produits dentaires', en: 'Internship - Dental products sales' },
    organization: 'Tikamed',
    description: {
      fr: 'Développement d’un site web de gestion destiné à remplacer l’utilisation d’Excel. Création d’une interface moderne et intuitive pour faciliter le suivi des activités et améliorer l’efficacité de l’entreprise.',
      en: 'Development of a management website designed to replace the use of Excel. Creation of a modern, intuitive interface to ease activity tracking and improve the company’s efficiency.',
    },
    tags: [],
  },
  {
    type: 'internship',
    period: 'Mai 2026',
    title: { fr: 'Développeur Web', en: 'Web Developer' },
    subtitle: { fr: 'Stage', en: 'Internship' },
    organization: 'Faculté Ben M’Sik',
    description: {
      fr: 'Projet : SGBL - Système de Gestion Budgétaire des Laboratoires. Développement d’une plateforme de gestion budgétaire pour les laboratoires universitaires, avec traçabilité complète, contrôle des dépassements et gestion des rôles utilisateurs.',
      en: 'Project: SGBL - Laboratory Budget Management System. Development of a budget management platform for university laboratories, with full traceability, overspending control and user role management.',
    },
    tags: [],
  },
]

export const experienceItems = entries

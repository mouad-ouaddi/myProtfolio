// ---------------------------------------------------------------------------
// COMPÉTENCES - ajoutez/retirez librement des catégories et des compétences.
// "icon" correspond au nom du composant d'icône affiché dans la grille.
// ---------------------------------------------------------------------------

const categories = {
  frontend: {
    id: 'frontend',
    icon: 'Monitor',
    display: 'icons',
    skills: [
      { name: 'React', icon: 'React' },
      { name: 'JavaScript', icon: 'JavaScript' },
      { name: 'HTML', icon: 'Html' },
      { name: 'CSS', icon: 'Css' },
      { name: 'Next.js', icon: 'NextJs' },
    ],
  },
  backend: {
    id: 'backend',
    icon: 'Server',
    display: 'icons',
    skills: [
      { name: 'Laravel', icon: 'Laravel' },
      { name: 'PHP', icon: 'Php' },
      { name: 'Node.js', icon: 'NodeJs' },
      { name: 'Express.js', icon: 'Express' },
      { name: 'Python', icon: 'Python' },
      { name: 'Spring Boot', icon: 'SpringBoot' },
      { name: 'REST APIs', icon: 'Api' },
    ],
  },
  database: {
    id: 'database',
    icon: 'Database',
    display: 'icons',
    skills: [
      { name: 'MySQL', icon: 'Mysql' },
      { name: 'MongoDB', icon: 'Mongodb' },
      { name: 'Oracle', icon: 'Oracle' },
    ],
  },
  tools: {
    id: 'tools',
    icon: 'Wrench',
    display: 'icons',
    skills: [
      { name: 'Git', icon: 'Git' },
      { name: 'GitHub', icon: 'GitHub' },
      { name: 'Figma', icon: 'Figma' },
      { name: 'Docker', icon: 'Docker' },
    ],
  },
}

export const skillCategories = {
  fr: [
    { ...categories.frontend, label: 'Frontend', description: 'Interfaces modernes, réactives et accessibles' },
    { ...categories.backend, label: 'Backend', description: 'APIs robustes et logique métier solide' },
    { ...categories.database, label: 'Base de données', description: 'Modélisation et gestion des données' },
    { ...categories.tools, label: 'Outils', description: 'Outils de travail et de collaboration' },
  ],
  en: [
    { ...categories.frontend, label: 'Frontend', description: 'Modern, reactive and accessible interfaces' },
    { ...categories.backend, label: 'Backend', description: 'Robust APIs and solid business logic' },
    { ...categories.database, label: 'Database', description: 'Data modeling and management' },
    { ...categories.tools, label: 'Tools', description: 'Work and collaboration tools' },
  ],
}

// PROFIL - modifiez chaque valeur ici pour personnaliser le portfolio.
// Les champs statiques (name, email, cvUrl, socials) sont partagés ;
// les champs texte sont fournis en français (fr) et en anglais (en).

export const profile = {
  name: 'Mouad',
  fullName: 'Mouad Ouaddi',
  email: 'mouadouaddi5@gmail.com',
  cvUrl: '/Cv_Mouad_Ouaddi.pdf',
  socials: {
    github: 'https://github.com/mouad-ouaddi',
    linkedin: 'https://www.linkedin.com/in/mouad-ouaddi-6a9b4a30b/',
  },

  fr: {
    role: 'Développeur Full Stack',
    roles: ['Développeur Full Stack', 'Développeur Web'],
    location: 'Casablanca, Maroc',
    education: 'Licence en Développement Informatique - SUP2I',
    interests: ['Développement Web', 'UI/UX', 'Fitness', 'Montage & Édition', 'Design'],
    heroIntro:
      "Je construis des applications web rapides, accessibles et maintenables - des interfaces soignées aux API robustes.",
    about: {
      paragraphs: [
        "Je suis Mouad, développeur full stack basé à Casablanca, Maroc. Je suis actuellement en licence en développement informatique à SUP2I, après un Bac+2 en tant que technicien spécialisé en développement digital (option full stack) à l'ISGI - un socle solide sur toute la chaîne : interfaces propres, architecture backend et modélisation des données.",
        "J'aime faire passer une idée d'un écran vierge à un produit fonctionnel : façonner la base de données, construire l'API et créer une interface que les gens prennent réellement plaisir à utiliser.",
        "Mon approche est simple - interface soignée, code maintenable et attention au détail. Qu'il s'agisse d'un dashboard, d'une boutique e-commerce ou d'un système de gestion, je soigne la performance, l'accessibilité et les petites interactions qui rendent un logiciel premium.",
        "En dehors du code, je suis passionné d'UI/UX, de design, de montage et de fitness - des centres d'intérêt qui aiguisent mon œil pour le détail.",
      ],
    },
    stats: [
      { value: '15+', label: 'Technologies' },
      { value: '3+', label: "Années d'expérience professionnelle" },
    ],
  },

  en: {
    role: 'Full Stack Developer',
    roles: ['Full Stack Developer', 'Web Developer'],
    location: 'Casablanca, Morocco',
    education: "Bachelor's degree in Software Development - SUP2I",
    interests: ['Web Development', 'UI/UX', 'Fitness', 'Video Editing', 'Design'],
    heroIntro:
      "I build fast, accessible and maintainable web applications - from polished interfaces to robust APIs.",
    about: {
      paragraphs: [
        "I'm Mouad, a full stack developer based in Casablanca, Morocco. I'm currently pursuing a professional bachelor's degree in software development at SUP2I, after a two-year technical degree in digital development (full stack track) at ISGI - a solid foundation across the whole chain: clean interfaces, backend architecture and data modeling.",
        "I love taking an idea from a blank screen to a working product: shaping the database, building the API and creating an interface people genuinely enjoy using.",
        "My approach is simple - polished interface, maintainable code and attention to detail. Whether it's a dashboard, an e-commerce store or a management system, I care about performance, accessibility and the small interactions that make software feel premium.",
        "Outside of code, I'm passionate about UI/UX, design, video editing and fitness - interests that keep my eye for detail sharp.",
      ],
    },
    stats: [
      { value: '15+', label: 'Technologies' },
      { value: '3+', label: 'Years of professional experience' },
    ],
  },
}

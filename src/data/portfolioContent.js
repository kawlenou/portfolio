export const defaultPortfolioContent = {
  site: {
    brand: '2A.',
    cvUrl: '/cv-awlenou-alain.pdf',
    footerName: 'Awlenou Alain',
    socials: {
      github: 'https://github.com/kawlenou',
      linkedin: 'https://www.linkedin.com/in/alainawlenou/',
      instagram: 'https://instagram.com',
    },
  },
  i18n: {
    fr: {
      nav: {
        home: 'Accueil',
        about: 'À propos',
        projects: 'Projets',
        blog: 'Blog',
        contact: 'Contact',
        cv: 'Telecharger le CV',
      },
      footer: {
        rights: 'Tous droits reserves.',
      },
      home: {
        greeting: 'Salut, je suis Awlenou Alain !',
        heroTitle: 'Développeur fullstack web & mobile',
        heroText: 'Je conçois des applications robustes, performantes et sécurisées, avec une attention particulière portée à l\'expérience utilisateur.',
        aboutCta: 'À propos',
        talkCta: 'Discutons',
        bookCall: 'Reserver un appel',
        servicesTitle: 'Mes services.',
        skillsTitle: 'Mes competences.',
        recentProjectsTitle: 'Projets recents.',
        viewAllProjects: 'Voir tous les projets',
        testimonialsTitle: 'Temoignages.',
        faqTitle: 'FAQ.',
        openProject: 'Ouvrir le projet',
        backToTop: 'Retour en haut',
      },
      projects: {
        filters: 'Filtres',
        all: 'Tous',
        openProject: 'Ouvrir le projet',
        source: 'Source',
        quickNav: 'Navigation rapide',
        cards: 'Cartes',
        apiReferences: 'References API',
        apiIntro: 'Ce tableau resume des proprietes produit utilisees sur la majorite des projets.',
        apiProp: 'Propriete',
        apiType: 'Type',
        apiUseCase: 'Cas d usage',
        apiRows: [
          { prop: 'performance_budget', type: 'boolean', useCase: 'Monitoring vitesse de chargement' },
          { prop: 'responsive_matrix', type: 'array', useCase: 'Validation mobile / tablet / desktop' },
          { prop: 'design_tokens', type: 'object', useCase: 'Consistance typographie et couleurs' },
        ],
      },
      allProjects: {
        openProject: 'Ouvrir le projet',
      },
      blog: {
        readNote: 'Lire la note',
      },
      contact: {
        bookMeeting: 'Prendre rendez-vous',
        form: {
          name: 'Nom',
          email: 'Email',
          subject: 'Sujet',
          message: 'Message',
          namePlaceholder: 'Votre nom',
          emailPlaceholder: 'vous@email.com',
          subjectPlaceholder: 'Type de projet',
          messagePlaceholder: 'Explique ton besoin en quelques lignes...',
          sending: 'Envoi en cours...',
          submit: 'Envoyer',
        },
        status: {
          success: 'Message envoye avec succes.',
          error: 'Envoi impossible pour le moment.',
        },
      },
      notFound: {
        title: 'Page introuvable',
        description: 'Le lien que vous avez suivi ne correspond a aucune page de ce portfolio.',
        backHome: 'Retour accueil',
        viewProjects: 'Voir les projets',
      },
    },
    en: {
      nav: {
        home: 'Home',
        about: 'About',
        projects: 'Projects',
        blog: 'Blog',
        contact: 'Contact',
        cv: 'Download CV',
      },
      footer: {
        rights: 'All rights reserved.',
      },
      home: {
        greeting: "Hi, I'm Awlenou Alain!",
        heroTitle: 'Full-Stack Web & Mobile Developer',
        heroText:
          'I design robust, high-performance, and secure applications, with particular attention to user experience.',
        aboutCta: 'About me',
        talkCta: "Let's talk",
        bookCall: 'Book a call',
        servicesTitle: 'My services.',
        skillsTitle: 'My skills.',
        recentProjectsTitle: 'Recent projects.',
        viewAllProjects: 'View all projects',
        testimonialsTitle: 'Testimonials.',
        faqTitle: 'FAQ.',
        openProject: 'Open project',
        backToTop: 'Back to top',
      },
      projects: {
        filters: 'Filters',
        all: 'All',
        openProject: 'Open project',
        source: 'Source',
        quickNav: 'Quick nav',
        cards: 'Cards',
        apiReferences: 'API references',
        apiIntro: 'This table summarizes product properties used on most projects.',
        apiProp: 'Property',
        apiType: 'Type',
        apiUseCase: 'Use case',
        apiRows: [
          { prop: 'performance_budget', type: 'boolean', useCase: 'Loading speed monitoring' },
          { prop: 'responsive_matrix', type: 'array', useCase: 'Mobile / tablet / desktop validation' },
          { prop: 'design_tokens', type: 'object', useCase: 'Typography and color consistency' },
        ],
      },
      allProjects: {
        openProject: 'Open project',
      },
      blog: {
        readNote: 'Read note',
      },
      contact: {
        bookMeeting: 'Book a meeting',
        form: {
          name: 'Name',
          email: 'Email',
          subject: 'Subject',
          message: 'Message',
          namePlaceholder: 'Your name',
          emailPlaceholder: 'you@email.com',
          subjectPlaceholder: 'Project type',
          messagePlaceholder: 'Describe your need in a few lines...',
          sending: 'Sending...',
          submit: 'Send',
        },
        status: {
          success: 'Message sent successfully.',
          error: 'Unable to send for now.',
        },
      },
      notFound: {
        title: 'Page not found',
        description: 'The link you followed does not match any page of this portfolio.',
        backHome: 'Back home',
        viewProjects: 'View projects',
      },
    },
  },
  home: {
    availabilityText: {
      fr: 'Disponibilite: ouvert aux nouvelles missions front-end et fullstack.',
      en: 'Availability: open to new front-end and fullstack missions.',
    },
    aboutTitle: { fr: 'À propos.', en: 'About Me.' },
    aboutText: {
      fr: 'Je travaille sur l’ensemble du cycle de développement : conception, implémentation, du backend, intégration d’API, déploiement serveur et optimisation. Mon approche repose sur trois piliers : architecture propre, sécurité en production et expérience utilisateur maîtrisée.',
      en: 'I work across the entire development lifecycle: design, backend implementation, API integration, server deployment, and optimization. My approach is built on three core pillars: clean architecture, production-grade security, and a well-crafted user experience.'
    },
    stats: [
      { value: '6+', label: { fr: 'Années d\'experience', en: 'Years of experience' } },
      { value: '87+', label: { fr: 'Projets realisés', en: 'Completed projects' } },
      { value: '100%', label: { fr: 'Satisfaction client', en: 'Client satisfaction' } },
    ],
    services: [
      {
        icon: 'code',
        title: { fr: 'Développement web & mobile', en: 'Web & mobile development' },
        description: {
          fr: 'Applications React, Laravel et Flutter performantes et évolutives.',
          en: 'Scalable React, Laravel and Flutter applications.',
        },
      },
     {
        icon: 'layers',
        title: { fr: 'Architecture & API', en: 'Architecture & APIs' },
        description: {
          fr: 'Conception d’architectures propres, découplées et maintenables.',
          en: 'Clean and maintainable system architecture.',
        },
      },
      {
        icon: 'shield',
        title: { fr: 'Sécurité & Déploiement', en: 'Security & Deployment' },
        description: {
          fr: 'Configuration VPS, SSL, CI/CD et bonnes pratiques DevOps.',
          en: 'VPS configuration, SSL, CI/CD and DevOps best practices.',
        },
      },
    ],
    skills: [
      { name: 'React', level: 95 },
      { name: 'Laravel', level: 97 },
      { name: 'Node js', level: 80 },
      { name: 'Vue js', level: 77 },
      { name: 'Flutter', level: 90 },
      { name: 'WordPress', level: 98 },
      { name: 'DevOps', level: 90 },

    ],
    faqs: [
      {
        q: { fr: 'Quels types de projets prends-tu ?', en: 'What types of projects do you take on?' },
        a: {
          fr: 'Applications web, dashboards admin, refontes UX/UI et plateformes metier.',
          en: 'Web applications, admin dashboards, UX/UI redesigns and business platforms.',
        },
      },
      {
        q: { fr: 'En combien de temps un projet est livre ?', en: 'How quickly is a project delivered?' },
        a: {
          fr: 'Selon le scope, entre 1 et 6 semaines avec des livraisons incrementales.',
          en: 'Depending on scope, between 1 and 6 weeks with incremental deliveries.',
        },
      },
      {
        q: { fr: 'Tu fais le suivi apres livraison ?', en: 'Do you provide post-delivery support?' },
        a: {
          fr: 'Oui, avec phase de stabilisation, corrections et accompagnement evolutif.',
          en: 'Yes, with a stabilization phase, bug fixes and ongoing support.',
        },
      },
    ],
    contactCta: {
      title: { fr: 'Construisons ensemble', en: "Let's build together" },
      text: {
        fr: "Tu as un projet ou une idee produit ? Je peux t'aider a le structurer et le lancer vite.",
        en: 'Have a project or product idea? I can help you structure it and launch fast.',
      },
      email: 'contact@awlenou.dev',
      buttonLabel: { fr: 'Ecrire un message', en: 'Send a message' },
    },
  },
  about: {
    title: { fr: 'À propos de moi', en: 'About Me' },

intro: {
  fr: "Développeur full-stack spécialisé dans la conception de plateformes SaaS, d’applications web et mobiles à forte valeur métier. J’interviens sur l’ensemble du cycle produit, de l’architecture technique au déploiement en production, avec une attention particulière à la performance, la sécurité et l’expérience utilisateur.",
  
  en: "Full-stack developer specialized in building SaaS platforms and high-impact web and mobile applications. I work across the full product lifecycle, from technical architecture to production deployment, with a strong focus on performance, security, and user experience."
},

highlights: [
  {
    icon: 'briefcase',
    title: { fr: 'Expérience', en: 'Experience' },
    value: '6+',
    detail: { 
      fr: 'Années en développement logiciel', 
      en: 'Years in software development' 
    },
  },
  {
    icon: 'rocket',
    title: { fr: 'Produits', en: 'Products' },
    value: 'Production',
    detail: { 
      fr: 'SaaS, ERP, CRM, Marketplace, Mobile', 
      en: 'SaaS, ERP, CRM, Marketplace, Mobile apps' 
    },
  },
  {
    icon: 'shield',
    title: { fr: 'Expertise', en: 'Expertise' },
    value: 'Architecture',
    detail: { 
      fr: 'API, sécurité, déploiement VPS', 
      en: 'API design, security, VPS deployment' 
    },
  },
  {
    icon: 'lightbulb',
    title: { fr: 'Approche', en: 'Approach' },
    value: 'Product-driven',
    detail: { 
      fr: 'Orienté impact métier et scalabilité', 
      en: 'Business impact & scalability focused' 
    },
  },
],


stackTitle: { fr: 'Stack principale', en: 'Core Stack' },

stackItems: {
  fr: [
    'React / Vue / Flutter',
    'Laravel / Node.js / API REST',
    'SaaS & Architecture modulaire',
    'Intégration paiement',
    'Déploiement VPS & sécurité production'
  ],
  en: [
    'React / Vue / Flutter',
    'Laravel / Node.js / REST APIs',
    'SaaS & Modular Architecture',
    'Payment Integration',
    'VPS Deployment & Production Security'
  ],
},

    methodologyTitle: { fr: 'Ma methode de travail', en: 'How I work' },
    methodology: [
      {
        step: '01',
        title: { fr: 'Cadrage & Discovery', en: 'Scoping & Discovery' },
        description: {
          fr: 'Analyse du besoin, definition du perimetre fonctionnel et choix techniques adaptes au contexte.',
          en: 'Needs analysis, functional scope definition, and tech choices adapted to the context.',
        },
      },
      {
        step: '02',
        title: { fr: 'Architecture & Prototypage', en: 'Architecture & Prototyping' },
        description: {
          fr: 'Conception de l\'architecture technique, modelisation des donnees et validation du parcours utilisateur.',
          en: 'Technical architecture design, data modeling, and user journey validation.',
        },
      },
      {
        step: '03',
        title: { fr: 'Developpement iteratif', en: 'Iterative Development' },
        description: {
          fr: 'Livraisons incrementales avec revues regulieres, tests et ajustements continus.',
          en: 'Incremental deliveries with regular reviews, testing, and continuous adjustments.',
        },
      },
      {
        step: '04',
        title: { fr: 'Deploiement & Suivi', en: 'Deployment & Monitoring' },
        description: {
          fr: 'Mise en production securisee, monitoring des performances et accompagnement post-livraison.',
          en: 'Secure production deployment, performance monitoring, and post-launch support.',
        },
      },
    ],

    toolsTitle: { fr: 'Outils & Technologies', en: 'Tools & Technologies' },
    toolCategories: [
      {
        label: 'Frontend',
        items: ['React', 'Vue.js', 'Tailwind CSS', 'Framer Motion', 'Vite'],
      },
      {
        label: 'Backend',
        items: ['Laravel', 'Node.js', 'Express', 'REST API', 'Filament'],
      },
      {
        label: 'Mobile',
        items: ['Flutter', 'Dart', 'Firebase'],
      },
      {
        label: { fr: 'Base de donnees', en: 'Database' },
        items: ['MySQL', 'PostgreSQL', 'Supabase'],
      },
      {
        label: 'DevOps',
        items: ['VPS', 'Nginx', 'SSL', 'CI/CD', 'Git'],
      },
      {
        label: { fr: 'Paiement', en: 'Payments' },
        items: ['Stripe', 'CinetPay', 'PayGate'],
      },
    ],

    educationTitle: { fr: 'Formation', en: 'Education' },
    education: [
      {
        degree: { fr: 'Licence en Informatique de Gestion', en: 'Bachelor in Management Information Systems' },
        school: 'UCAO-UUT',
        period: '2018 - 2021',
      },
      {
        degree: { fr: 'Formation continue & certifications', en: 'Ongoing training & certifications' },
        school: { fr: 'Auto-formation, Udemy, documentation officielle', en: 'Self-taught, Udemy, official documentation' },
        period: { fr: '2019 - Present', en: '2019 - Present' },
      },
    ],

    experiencesTitle: { fr: 'Experiences professionnelles', en: 'Professional experience' },
    experiences: [
      {
        title: { fr: 'Developpeur Fullstack Remote | Benevole', en: 'Remote Fullstack Developer | Volunteer' },
        org: 'CDEJ CBT Shalom - Akodessewa',
        period: { fr: '2020 - Aujourd hui', en: '2020 - Present' },
      },
      {
        title: { fr: 'Developpeur Fullstack', en: 'Fullstack Developer' },
        org: 'Bahiniba Sarlu - Adidogome',
        period: { fr: 'Mai 2023 - Decembre 2025', en: 'May 2023 - December 2025' },
      },
      {
        title: { fr: 'Developpeur Fullstack Remote', en: 'Remote Fullstack Developer' },
        org: 'Sunofa - Agoe',
        period: { fr: 'Aout 2025 - Aujourd hui', en: 'August 2025 - Present' },
      },
      {
        title: { fr: 'Developpeur Fullstack Remote', en: 'Remote Fullstack Developer' },
        org: 'Ubuntu Consulting - Adidogome',
        period: { fr: 'Mai 2025 - Octobre 2025', en: 'May 2025 - October 2025' },
      },
    ],
  },
  projects: {
    title: 'Components',
    intro: {
      fr: 'Une bibliotheque de projets reels, presentes comme une documentation produit: lisible, structuree, et orientee impact.',
      en: 'A library of real projects, presented as product documentation: readable, structured, and impact-oriented.',
    },
    allTitle: { fr: 'Tous les projets', en: 'All projects' },
    allIntro: {
      fr: "L'ensemble des projets regroupes sur une grille claire et responsive.",
      en: 'All projects displayed on a clean and responsive grid.',
    },
    items: [

  {
  id: 'global-lead',
  title: 'SaaS Global Lead',
  category: 'SaaS Platform',
  imageKey: 'lead',
  stack: [
    'Laravel',
    'Filament',
    'Postgrer',
    'Stripe Subscription',
    'REST Architecture',
    'Role-Based Access Control'
  ],
  description: {
    fr: `Plateforme SaaS de gestion des leads développée avec Laravel et Filament, intégrant un système d’abonnement via Stripe.

La solution combine une marketplace de leads, la gestion des clients B2B/B2C et un CRM intégré permettant aux entreprises d’acheter des leads qualifiés, gérer leur pipeline commercial et suivre leurs performances.

Le système inclut la gestion des abonnements, la facturation récurrente, le contrôle d’accès basé sur les rôles et une architecture sécurisée conçue pour assurer la scalabilité et l’intégrité des transactions.`,

    en: `A SaaS lead management platform built with Laravel and Filament, featuring Stripe-based subscription billing.

The solution combines a lead marketplace, B2B/B2C client management, and an integrated CRM enabling companies to purchase qualified leads, manage sales pipelines, and track performance metrics.

The system includes subscription management, recurring billing, role-based access control, and a secure architecture designed to ensure scalability and transactional integrity.`
  },
  link: '#'
},

{
  id: 'sepamap',
  title: 'SEPAMAP',
  imageKey: 'sepamap',
  category: 'Social & Community Platform',
  stack: [
    'Vue JS',
    'Laravel API',
    'MySQL',
    'Pusher (Real-time Notifications)',
    'Cloudinary (Media Management)'
  ],
  description: {
    fr: `Plateforme web développée avec Vue JS et une API Laravel permettant aux utilisateurs de rechercher, enregistrer et organiser des adresses à l’échelle mondiale.

En plus des fonctionnalités de géolocalisation et de gestion de favoris, la plateforme intègre un module communautaire avancé.

Les utilisateurs peuvent créer et gérer des communautés, administrer les adhésions, organiser des activités telles que des tontines, gérer les membres, ainsi que les cycles d’encaissement et de contribution.

Le système inclut des notifications instantanées via Pusher et une gestion optimisée des médias avec Cloudinary.`,

    en: `A web platform built with Vue JS and a Laravel API that enables users to search, save, and organize locations worldwide.

Beyond geolocation and bookmarking features, the platform includes an advanced community module.

Users can create and manage communities, handle memberships, organize group activities such as rotating savings (tontine systems), manage members, and oversee contribution and payout cycles.

The system integrates real-time notifications via Pusher and optimized media management using Cloudinary.`
  },
  link: 'https://sepamap.com/'
},

{
  id: 'cta-investments',
  imageKey: 'cta',
  category: 'Business Platform',
  title: 'CTA Investments',
  description: {
    fr: `Une plateforme web corporate accompagnée d’un dashboard interne développée pour CTA Investments.
    
Le projet combine une interface frontend en React JS et une API backend en Laravel pour assurer la gestion des produits et des stocks.
    
En plus du site vitrine présentant les équipements industriels, la solution intègre un tableau de bord sécurisé permettant le suivi des inventaires en temps réel, la gestion des produits, et le pilotage opérationnel.
    
Conçu pour optimiser les processus internes, améliorer la traçabilité des stocks et renforcer l’efficacité logistique.`,

    en: `A corporate web platform with an integrated internal dashboard developed for CTA Investments.
    
The project combines a React JS frontend with a Laravel-based API backend to manage products and inventory operations.
    
Beyond the public-facing website showcasing industrial equipment, the solution includes a secure stock management dashboard enabling real-time inventory tracking, product management, and operational monitoring.
    
Designed to streamline internal workflows, improve stock traceability, and enhance logistical efficiency.`
  },
  stack: [
    'React JS',
    'Laravel API',
    'REST Architecture',
    'Inventory Management System',
    'Role-Based Access Control'
  ],
  link: 'https://cta-investments.com/'
},

 {
  id: 'bahiniba-booking',
  title: 'Bahiniba Booking',
  category: 'Web Application',
  imageKey: 'booking',
  stack: [
    'React JS',
    'Laravel API',
    'REST Architecture',
    'CinetPay Integration',
    'PayGate Integration',
    'Booking Management System'
  ],
  description: {
    fr: `Plateforme de réservation en ligne développée avec une architecture découplée (React JS + API Laravel).
    
Le système permet aux clients de consulter les créneaux disponibles, effectuer des réservations directes ou soumettre des demandes de devis.
    
La solution intègre les paiements en ligne via CinetPay et PayGate, ainsi qu’un dashboard administratif complet pour la gestion des réservations, des créneaux, des services et des packages.
    
Conçue pour centraliser les opérations, sécuriser les transactions et optimiser la gestion des disponibilités.`,

    en: `An online booking platform built with a decoupled architecture (React JS frontend and Laravel API backend).
    
Users can view available time slots, make direct reservations, or submit custom quote requests.
    
The system integrates online payments via CinetPay and PayGate, and includes a comprehensive administrative dashboard for managing bookings, time slots, services, and packages.
    
Designed to centralize operations, secure transactions, and optimize availability management.`
  },
  link: '#'
},
     {
  id: 'amelegal',
  imageKey: 'amelegal',
  category: 'Web Platform',
  title: 'Amelegal Conseils',
  description: {
    fr: `Une plateforme web professionnelle développée pour AMELEGAL Conseils, un cabinet juridique spécialisé en droit du numérique, protection des données, cybersécurité et propriété intellectuelle.
    
La solution inclut un site vitrine responsive ainsi qu’un dashboard interne permettant la gestion des articles de blog et des demandes de devis. 
    
J’ai pris en charge l’ensemble du projet, du développement frontend et backend jusqu’à la configuration du serveur VPS et le déploiement en production.`,

    en: `A professional web platform developed for AMELEGAL Conseils, a legal firm specializing in digital law, data protection, cybersecurity, and intellectual property.
    
The solution includes a responsive corporate website along with an internal dashboard for blog management and quote request handling.
    
I handled the entire project lifecycle, from frontend and backend development to VPS server configuration and production deployment.`
  },
  stack: [
    'HTML',
    'Tailwind CSS',
    'Node.js',
    'VPS Deployment',
    'Server Configuration'
  ],
  link: 'https://amelegalconseils.com'
},
{
  id: 'erp-crm',
   imageKey: 'erpcrm',
  title: 'ERP / CRM System',
  category: 'Business Platform',
  stack: [
    'React JS',
    'Laravel API',
    'MySQL',
    'Modular Architecture',
    'Role-Based Access Control'
  ],
  description: {
    fr: `Système de gestion d’entreprise développé avec une architecture modulaire structurée autour des modules Core, ERP et CRM.
    
L’application combine un frontend en React JS et une API Laravel pour gérer les processus métier, la relation client, les opérations internes et la centralisation des données.
    
Le module ERP couvre la gestion opérationnelle, tandis que le CRM permet le suivi des prospects, clients et interactions commerciales.
    
Conçu avec une architecture évolutive favorisant la séparation des responsabilités, la maintenabilité du code et l’extensibilité des modules.`,

    en: `An enterprise management system built with a modular architecture structured around Core, ERP, and CRM modules.
    
The application combines a React JS frontend with a Laravel-based API to manage business operations, customer relationships, and centralized data workflows.
    
The ERP module handles operational processes, while the CRM module supports lead tracking, customer management, and sales interactions.
    
Designed with a scalable modular architecture to ensure separation of concerns, maintainability, and long-term extensibility.`
  },
  link: '#'
},

      

{
  id: 'spotshimmer',
  title: 'SpotShimmer',
  imageKey: 'spotshimmer',
  category: 'Civic & Community Platform',
  stack: [
    'React JS',
    'Supabase',
    'PostgreSQL',
    'Firebase Cloud Messaging',
    'Real-time Architecture'
  ],
  description: {
    fr: `Plateforme participative développée avec React et Supabase permettant aux citoyens de documenter, évaluer et partager des observations sur leur environnement, les services publics et les infrastructures.

La solution inclut des fonctionnalités de signalement en temps réel, de sondages, de systèmes de notation et d’outils de contribution structurée afin de favoriser la transparence civique et l’engagement communautaire.

L’architecture repose sur Supabase pour la gestion de la base de données et de l’authentification, ainsi que Firebase pour l’envoi de notifications en temps réel.`,

    en: `A civic engagement platform built with React and Supabase that enables citizens to document, evaluate, and share observations about public services, infrastructure, and their environment.

The platform features real-time reporting, surveys, rating systems, and structured contribution tools to promote civic transparency and community engagement.

The architecture leverages Supabase for database management and authentication, along with Firebase for real-time push notifications.`
  },
  link: 'https://spotshimmer.com/'
},


 {
  id: 'cdej-shalom',
  imageKey: 'cdejshalom',
  category: 'Institutional Website',
  title: 'CDEJ CBT SHALOM',
  description: {
    fr: `Site institutionnel développé sous WordPress pour le CDEJ CBT SHALOM, une organisation dédiée à l’accompagnement des enfants et des jeunes.
    
Le projet inclut la configuration et la personnalisation du CMS, l’intégration de plugins de sécurité, l’optimisation du référencement (SEO), ainsi que l’implémentation de Google Analytics pour le suivi des performances.
    
J’ai également assuré le déploiement et la configuration sur un serveur VPS, incluant la mise en place de l’environnement de production et la sécurisation du site.`,

    en: `An institutional website built with WordPress for CDEJ CBT SHALOM, an organization focused on supporting children and youth development.
    
The project included CMS configuration and customization, security plugin integration, SEO optimization, and Google Analytics implementation for performance tracking.
    
I also handled VPS deployment and production environment configuration, ensuring proper setup and website security.`
  },
  stack: [
    'WordPress',
    'PHP',
    'SEO Optimization',
    'Google Analytics',
    'Security Plugins',
    'VPS Deployment'
  ],
  link: 'https://cdejcbtshalom.org/'
},
{
  id: 'runweek',
  title: 'RunWeek',
  imageKey: 'runweek',
  category: 'Health & Fitness Platform',
  stack: [
    'React JS',
    'Node.js',
    'Express.js',
    'REST API',
    'MySQL',
    'Wearable API Integration',
    'AI Integration'
  ],
  description: {
    fr: `Plateforme web fitness développée avec React et une API REST Node.js (Express), intégrant des API de montres connectées pour récupérer et synchroniser les données de santé des utilisateurs.

Le système permet l’affichage en temps réel des métriques d’activité (pas, calories, fréquence cardiaque, etc.) avec un traitement sécurisé des données.

La plateforme intègre également un coach IA capable d’analyser les performances et de générer des recommandations personnalisées basées sur les données collectées.`,

    en: `A fitness web platform built with React and a Node.js (Express) REST API, integrating wearable device APIs to retrieve and synchronize user health data.

The system displays real-time activity metrics (steps, calories, heart rate, etc.) while ensuring secure data processing.

The platform also features an AI-powered coaching module that analyzes performance data and generates personalized recommendations based on user activity.`
  },
  link: '#'
},

{
  id: 'kellele',
  imageKey: 'kellele',
  category: 'Event Management Mobile App',
  title: 'Kellele',
  description: {
    fr: `Application mobile de gestion d’événements développée avec Flutter et une API Laravel.

La plateforme permet la création et la gestion d’événements, la vente de tickets en ligne et la mise en relation avec des prestataires disponibles pour des allocations (logistique, services, etc.).

Le système inclut la gestion des réservations, le suivi des ventes, l’administration des événements via un backend sécurisé, ainsi que des notifications en temps réel via Firebase.

Conçue pour centraliser l’organisation événementielle et simplifier l’expérience des organisateurs comme des participants.`,

    en: `A mobile event management application built with Flutter and a Laravel-based API.

The platform enables event creation and management, online ticket sales, and vendor allocation through an integrated service marketplace.

The system includes booking management, sales tracking, secure administrative controls, and real-time push notifications via Firebase.

Designed to centralize event operations and simplify the experience for both organizers and attendees.`
  },
  stack: [
    'Flutter',
    'Laravel API',
    'MySQL',
    'Firebase Cloud Messaging',
    'Ticketing System',
    'Vendor Marketplace'
  ],
  link: 'https://play.google.com/store/apps/details?id=com.kellele.kellele&pcampaignid=web_share'
},

    ],
  },
  blog: {
    title: { fr: 'Journal technique', en: 'Technical journal' },
    intro: {
      fr: 'Notes courtes sur l engineering front-end, l architecture et les decisions produit.',
      en: 'Short notes on front-end engineering, architecture, and product decisions.',
    },
    posts: [
      {
        id: 1,
        title: {
          fr: 'Comment je structure un projet React maintainable',
          en: 'How I structure a maintainable React project',
        },
        date: '2026-02-05',
        readTime: '6 min',
        excerpt: {
          fr: 'Architecture dossiers, conventions de composants et bonnes pratiques pour garder un code clair.',
          en: 'Folder architecture, component conventions and best practices to keep code clean.',
        },
      },
      {
        id: 2,
        title: {
          fr: 'Checklist performance front-end avant mise en production',
          en: 'Front-end performance checklist before going live',
        },
        date: '2026-01-20',
        readTime: '5 min',
        excerpt: {
          fr: 'Images, cache, split de bundle et monitoring: les points a verifier avant le deploy.',
          en: 'Images, cache, bundle splitting and monitoring: what to check before deployment.',
        },
      },
      {
        id: 3,
        title: {
          fr: 'Animations utiles: quand Framer Motion apporte une vraie valeur UX',
          en: 'Useful animations: when Framer Motion delivers real UX value',
        },
        date: '2025-12-28',
        readTime: '4 min',
        excerpt: {
          fr: 'Des transitions qui guident l utilisateur au lieu de l interrompre.',
          en: 'Transitions that guide the user instead of interrupting them.',
        },
      },
    ],
  },
  contact: {
    title: 'Contact',
    intro: {
      fr: 'Tu as un besoin produit, une idee ou un projet a lancer ? Envoie-moi les details et je te reponds rapidement avec une proposition claire.',
      en: 'Have a product need, an idea or a project to launch? Send me the details and I will respond quickly with a clear proposal.',
    },
    channels: [
      { icon: 'mail', label: 'Email', value: 'contact@awlenou.dev' },
      { icon: 'phone', label: { fr: 'Telephone', en: 'Phone' }, value: '+228 97 46 33 39' },
      { icon: 'message', label: 'WhatsApp', value: { fr: 'Disponible en semaine', en: 'Available on weekdays' } },
      { icon: 'map', label: { fr: 'Localisation', en: 'Location' }, value: { fr: 'Lome, Togo', en: 'Lome, Togo' } },
    ],
    availabilityLabel: { fr: 'Disponibilite', en: 'Availability' },
    availabilityText: {
      fr: 'Disponible pour nouvelles missions a partir de cette semaine.',
      en: 'Available for new missions starting this week.',
    },
    formTitle: { fr: 'Envoyer un message', en: 'Send a message' },
  },
  appointments: {
    title: { fr: 'Rendez-vous', en: 'Appointments' },
    intro: {
      fr: 'Planifiez un appel de cadrage pour discuter de votre besoin.',
      en: 'Schedule a scoping call to discuss your needs.',
    },
    calendlyUrl: 'https://calendly.com/your-handle/30min',
    duration: '30 min',
    timezone: 'Africa/Lome',
  },
  analytics: {
    provider: 'Plausible + Google Analytics',
    gaMeasurementId: '',
    plausibleDomain: '',
    ctaEvents: [
      'book_call_click',
      'cta_about_click',
      'cta_talk_click',
      'project_open_click',
      'contact_form_submit',
    ],
  },
  seo: {
    defaultTitle: 'Awlenou Alain | Portfolio',
    defaultDescription: 'Portfolio de developpement web avec projets, services et contact.',
    ogImage: '',
    pages: {
      home: { title: 'Awlenou Alain | Portfolio', description: 'Accueil du portfolio.' },
      about: { title: 'About | Awlenou Alain', description: 'Parcours, experience professionnelle et vision.' },
      projects: { title: 'Projects | Awlenou Alain', description: 'Catalogue de projets web et applications.' },
      blog: { title: 'Blog technique | Awlenou Alain', description: 'Journal technique sur React, Laravel et performance.' },
      contact: { title: 'Contact | Awlenou Alain', description: 'Contact pour discuter de votre projet.' },
    },
  },
};

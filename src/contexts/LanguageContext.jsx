/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from 'react';
import { useContent } from './ContentContext';

const LanguageContext = createContext(null);

const defaultDictionaries = {
  fr: {
    nav: {
      home: 'Accueil',
      about: 'A propos',
      projects: 'Projets',
      blog: 'Blog',
      contact: 'Contact',
      cv: 'Telecharger le CV',
    },
    footer: {
      rights: 'Tous droits reserves.',
    },
    home: {
      greeting: "Salut, je suis Awlenou Alain !",
      heroTitle: 'Solutions logicielles innovantes pour un monde connecte',
      heroText:
        'Je concois des experiences web robustes, fluides et orientees metier, avec un focus sur la performance, la qualite de code et la clarte du produit.',
      aboutCta: 'A propos de moi',
      talkCta: 'Discutons',
      bookCall: 'Reserver un appel',
      servicesTitle: 'Mes services __.',
      skillsTitle: 'Mes competences __.',
      recentProjectsTitle: 'Projets recents __.',
      viewAllProjects: 'Voir tous les projets',
      testimonialsTitle: 'Temoignages __.',
      faqTitle: 'FAQ __.',
      openProject: 'Ouvrir le projet',
      backToTop: 'Retour en haut',
    },
    projects: {
      filters: 'Filtres',
      all: 'Tous',
      openProject: 'Voir les détails',
      source: 'Source',
      projectDetails: 'Détails du projet',
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
      openProject: 'Voir les détails',
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
    projectDetail: {
      notFoundTitle: 'Projet introuvable',
      notFoundDescription: 'Le projet que vous recherchez n\'existe pas ou a ete deplace.',
      backToProjects: 'Retour aux projets',
      aboutProject: 'A propos du projet',
      techStack: 'Technologies utilisees',
      projectInfo: 'Informations',
      categoryLabel: 'Categorie',
      techLabel: 'Technologies',
      visitSite: 'Visiter le site',
      viewAllProjects: 'Voir tous les projets',
      relatedProjects: 'Projets similaires',
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
      heroTitle: 'Innovative software solutions to build a connected world',
      heroText:
        'I build robust and fluid web experiences focused on performance, code quality, and product clarity.',
      aboutCta: 'About me',
      talkCta: "Let's talk",
      bookCall: 'Book a call',
      servicesTitle: 'My services __.',
      skillsTitle: 'My skills __.',
      recentProjectsTitle: 'Recent projects __.',
      viewAllProjects: 'View all projects',
      testimonialsTitle: 'Testimonials __.',
      faqTitle: 'FAQ __.',
      openProject: 'Open project',
      backToTop: 'Back to top',
    },
    projects: {
      filters: 'Filters',
      all: 'All',
      openProject: 'View details',
      source: 'Source',
      projectDetails: 'Project Details',
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
      openProject: 'View details',
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
    projectDetail: {
      notFoundTitle: 'Project not found',
      notFoundDescription: 'The project you are looking for does not exist or has been moved.',
      backToProjects: 'Back to projects',
      aboutProject: 'About the project',
      techStack: 'Tech stack',
      projectInfo: 'Project info',
      categoryLabel: 'Category',
      techLabel: 'Technologies',
      visitSite: 'Visit website',
      viewAllProjects: 'View all projects',
      relatedProjects: 'Related projects',
    },
    notFound: {
      title: 'Page not found',
      description: 'The link you followed does not match any page of this portfolio.',
      backHome: 'Back home',
      viewProjects: 'View projects',
    },
  },
};

const isObject = (value) => value && typeof value === 'object' && !Array.isArray(value);

const mergeDeep = (base, override) => {
  if (!isObject(base)) return override === undefined ? base : override;

  const merged = { ...base };

  if (!isObject(override)) return merged;

  Object.keys(override).forEach((key) => {
    merged[key] = mergeDeep(base[key], override[key]);
  });

  return merged;
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('fr');
  const { content } = useContent();

  const dictionaries = useMemo(
    () => mergeDeep(defaultDictionaries, content?.i18n),
    [content?.i18n],
  );

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: dictionaries[lang] || defaultDictionaries.fr,
    }),
    [lang, dictionaries],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
};

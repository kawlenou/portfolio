# Guide complet: Accessibilite, Analytics/Tracking et SEO (React + Vite)

Ce document explique comment implementer:
- Accessibilite (A11y)
- Analytics + tracking d'evenements (GA/Plausible)
- SEO technique (meta, Open Graph, Twitter, canonical, sitemap, robots)

---

## 1) Variables d'environnement

### Front (`.env`)
```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
VITE_GA_MEASUREMENT_ID=
VITE_PLAUSIBLE_DOMAIN=
VITE_PLAUSIBLE_SRC=https://plausible.io/js/script.js
VITE_CALENDLY_URL=https://calendly.com/your-handle/30min
```

### Backend (`backend/.env`)
```env
APP_URL=http://localhost
FRONTEND_URL=http://localhost:5173
CONTACT_RECEIVER_EMAIL=your@email.com
```

---

## 2) Accessibilite (A11y)

### 2.1 Focus visible global
Ajoute dans `src/index.css`:

```css
a:focus-visible,
button:focus-visible,
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
  outline: 2px solid #a8c2ff;
  outline-offset: 3px;
}
```

### 2.2 Etats ARIA utiles

- Menu actif:
```jsx
<Link aria-current={isActive ? 'page' : undefined} to="/about">About</Link>
```

- Bouton toggle langue:
```jsx
<button aria-pressed={lang === 'fr'} aria-label="Passer en francais">FR</button>
```

- Bouton icone:
```jsx
<button aria-label="Retour en haut">...</button>
```

### 2.3 Images
- Toujours `alt` pertinent.
- Pour images non critiques:
```jsx
<img src={image} alt="Description" loading="lazy" decoding="async" />
```

---

## 3) Analytics + Tracking

### 3.1 Utilitaire analytics
Creer `src/utils/analytics.js`:

```js
const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const PLAUSIBLE_DOMAIN = import.meta.env.VITE_PLAUSIBLE_DOMAIN;
const PLAUSIBLE_SRC =
  import.meta.env.VITE_PLAUSIBLE_SRC || 'https://plausible.io/js/script.js';

const injectScript = (id, src, attrs = {}) => {
  if (document.getElementById(id)) return;
  const script = document.createElement('script');
  script.id = id;
  script.async = true;
  script.src = src;
  Object.entries(attrs).forEach(([k, v]) => script.setAttribute(k, v));
  document.head.appendChild(script);
};

export const initAnalytics = () => {
  if (GA_ID) {
    injectScript('ga-script', `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`);
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
  }

  if (PLAUSIBLE_DOMAIN) {
    injectScript('plausible-script', PLAUSIBLE_SRC, { 'data-domain': PLAUSIBLE_DOMAIN });
  }
};

export const trackEvent = (name, props = {}) => {
  if (window.gtag) window.gtag('event', name, props);
  if (window.plausible) window.plausible(name, { props });
};

export const trackPageView = (path) => {
  if (window.gtag) window.gtag('event', 'page_view', { page_path: path });
  if (window.plausible) window.plausible('pageview', { props: { path } });
};
```

### 3.2 Initialisation et pageview SPA
Dans `src/App.jsx`:

```jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initAnalytics, trackPageView } from './utils/analytics';

function RouteTracker() {
  const location = useLocation();
  useEffect(() => trackPageView(location.pathname), [location.pathname]);
  return null;
}

function App() {
  useEffect(() => initAnalytics(), []);

  return (
    <>
      <RouteTracker />
      {/* routes */}
    </>
  );
}
```

### 3.3 Tracer les CTA
Exemple:
```jsx
import { trackEvent } from '../utils/analytics';

<a
  href="/cv-awlenou-alain.pdf"
  download
  onClick={() => trackEvent('cv_download_click', { source: 'header' })}
>
  Telecharger CV
</a>
```

Exemples d'evenements:
- `cv_download_click`
- `contact_form_submit`
- `project_open_click`
- `book_call_click`
- `cta_about_click`
- `cta_talk_click`

---

## 4) SEO complet

### 4.1 Hook SEO reutilisable
Creer `src/hooks/useSeo.js`:

```js
import { useEffect } from 'react';

const ensureMeta = (selector, attrs) => {
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement('meta');
    Object.entries(attrs).forEach(([k, v]) => tag.setAttribute(k, v));
    document.head.appendChild(tag);
  }
  return tag;
};

export const useSeo = ({
  title,
  description,
  image = '/vite.svg',
  canonicalPath = '/',
  noIndex = false,
}) => {
  useEffect(() => {
    const baseUrl = window.location.origin;
    const canonicalUrl = `${baseUrl}${canonicalPath}`;
    const imageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;

    document.title = title;

    ensureMeta('meta[name="description"]', { name: 'description' }).setAttribute('content', description);
    ensureMeta('meta[name="robots"]', { name: 'robots' }).setAttribute(
      'content',
      noIndex ? 'noindex, nofollow' : 'index, follow'
    );

    ensureMeta('meta[property="og:title"]', { property: 'og:title' }).setAttribute('content', title);
    ensureMeta('meta[property="og:description"]', { property: 'og:description' }).setAttribute('content', description);
    ensureMeta('meta[property="og:type"]', { property: 'og:type' }).setAttribute('content', 'website');
    ensureMeta('meta[property="og:url"]', { property: 'og:url' }).setAttribute('content', canonicalUrl);
    ensureMeta('meta[property="og:image"]', { property: 'og:image' }).setAttribute('content', imageUrl);

    ensureMeta('meta[name="twitter:card"]', { name: 'twitter:card' }).setAttribute('content', 'summary_large_image');
    ensureMeta('meta[name="twitter:title"]', { name: 'twitter:title' }).setAttribute('content', title);
    ensureMeta('meta[name="twitter:description"]', { name: 'twitter:description' }).setAttribute('content', description);
    ensureMeta('meta[name="twitter:image"]', { name: 'twitter:image' }).setAttribute('content', imageUrl);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);
  }, [title, description, image, canonicalPath, noIndex]);
};
```

### 4.2 Utiliser dans chaque page
Exemple:
```jsx
useSeo({
  title: 'Contact | Awlenou Alain',
  description: 'Contactez Awlenou Alain pour discuter de votre projet web.',
  canonicalPath: '/contact',
});
```

### 4.3 Fichiers SEO statiques

`public/robots.txt`:
```txt
User-agent: *
Allow: /

Sitemap: https://awlenou.dev/sitemap.xml
```

`public/sitemap.xml` (exemple):
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://awlenou.dev/</loc></url>
  <url><loc>https://awlenou.dev/about</loc></url>
  <url><loc>https://awlenou.dev/all-projects</loc></url>
  <url><loc>https://awlenou.dev/blog</loc></url>
  <url><loc>https://awlenou.dev/contact</loc></url>
</urlset>
```

---

## 5) Checklist rapide de validation

- [ ] `npm run lint` passe sans erreur.
- [ ] `npm run build` passe sans erreur.
- [ ] Les pages ont un `title` unique.
- [ ] Les CTA principaux envoient des events.
- [ ] Le focus clavier est visible partout.
- [ ] Les images lourdes ont `loading="lazy"` quand possible.
- [ ] `robots.txt` et `sitemap.xml` existent en production.

---

## 6) Commandes utiles

```bash
npm run lint
npm run build
```

Backend Laravel:
```bash
php artisan serve
```

---

Si tu veux, je peux aussi te generer la version PDF de ce guide directement dans le projet.

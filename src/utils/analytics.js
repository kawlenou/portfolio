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
  Object.entries(attrs).forEach(([key, value]) => script.setAttribute(key, value));
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
  if (window.gtag) {
    window.gtag('event', name, props);
  }

  if (window.plausible) {
    window.plausible(name, { props });
  }
};

export const trackPageView = (path) => {
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
    });
  }

  if (window.plausible) {
    window.plausible('pageview', { props: { path } });
  }
};

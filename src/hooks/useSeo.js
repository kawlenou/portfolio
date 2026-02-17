import { useEffect } from 'react';

const ensureMeta = (selector, attrs) => {
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement('meta');
    Object.entries(attrs).forEach(([key, value]) => tag.setAttribute(key, value));
    document.head.appendChild(tag);
  }
  return tag;
};

export const useSeo = ({
  title,
  description,
  image = '',
  canonicalPath = '/',
  noIndex = false,
}) => {
  useEffect(() => {
    const baseUrl = window.location.origin;
    const canonicalUrl = `${baseUrl}${canonicalPath}`;
    const imageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;

    document.title = title;

    const descriptionTag = ensureMeta('meta[name="description"]', { name: 'description' });
    descriptionTag.setAttribute('content', description);

    const robotsTag = ensureMeta('meta[name="robots"]', { name: 'robots' });
    robotsTag.setAttribute('content', noIndex ? 'noindex, nofollow' : 'index, follow');

    const ogTitle = ensureMeta('meta[property="og:title"]', { property: 'og:title' });
    ogTitle.setAttribute('content', title);

    const ogDescription = ensureMeta('meta[property="og:description"]', { property: 'og:description' });
    ogDescription.setAttribute('content', description);

    const ogType = ensureMeta('meta[property="og:type"]', { property: 'og:type' });
    ogType.setAttribute('content', 'website');

    const ogUrl = ensureMeta('meta[property="og:url"]', { property: 'og:url' });
    ogUrl.setAttribute('content', canonicalUrl);

    const ogImage = ensureMeta('meta[property="og:image"]', { property: 'og:image' });
    ogImage.setAttribute('content', imageUrl);

    const twCard = ensureMeta('meta[name="twitter:card"]', { name: 'twitter:card' });
    twCard.setAttribute('content', 'summary_large_image');

    const twTitle = ensureMeta('meta[name="twitter:title"]', { name: 'twitter:title' });
    twTitle.setAttribute('content', title);

    const twDescription = ensureMeta('meta[name="twitter:description"]', { name: 'twitter:description' });
    twDescription.setAttribute('content', description);

    const twImage = ensureMeta('meta[name="twitter:image"]', { name: 'twitter:image' });
    twImage.setAttribute('content', imageUrl);

    let canonicalTag = document.head.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', canonicalUrl);
  }, [title, description, image, canonicalPath, noIndex]);
};

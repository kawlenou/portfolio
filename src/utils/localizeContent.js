const LOCALES = ['fr', 'en'];

const isObject = (value) => value && typeof value === 'object' && !Array.isArray(value);

const isLocaleObject = (value) => {
  if (!isObject(value)) return false;
  const keys = Object.keys(value);
  if (keys.length === 0) return false;
  return keys.every((key) => LOCALES.includes(key));
};

export const localizeValue = (value, lang = 'fr', fallback = 'fr') => {
  if (!isLocaleObject(value)) return value;
  return value[lang] ?? value[fallback] ?? value[Object.keys(value)[0]];
};

export const localizeDeep = (value, lang = 'fr', fallback = 'fr') => {
  const localized = localizeValue(value, lang, fallback);

  if (Array.isArray(localized)) {
    return localized.map((item) => localizeDeep(item, lang, fallback));
  }

  if (isObject(localized)) {
    const result = {};
    Object.keys(localized).forEach((key) => {
      result[key] = localizeDeep(localized[key], lang, fallback);
    });
    return result;
  }

  return localized;
};

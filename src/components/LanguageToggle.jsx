import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle = () => {
  const { lang, setLang } = useLanguage();

  return (
    <div className="inline-flex rounded-full border border-[#7AA4EE]/60 bg-[#1A2554]/80 p-1 text-xs">
      <button
        type="button"
        onClick={() => setLang('fr')}
        aria-pressed={lang === 'fr'}
        aria-label="Passer en francais"
        className={`rounded-full px-3 py-1 transition ${lang === 'fr' ? 'bg-[#7AA4EE] text-[#0A1130]' : 'text-[#D6E4FF]'}`}
      >
        FR
      </button>
      <button
        type="button"
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
        aria-label="Switch to english"
        className={`rounded-full px-3 py-1 transition ${lang === 'en' ? 'bg-[#7AA4EE] text-[#0A1130]' : 'text-[#D6E4FF]'}`}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageToggle;

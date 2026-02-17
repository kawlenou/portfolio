import { useMemo } from 'react';
import { Github, Instagram, Linkedin } from 'lucide-react';
import usePortfolioContent from '../hooks/usePortfolioContent';
import { useLanguage } from '../contexts/LanguageContext';
import { localizeValue } from '../utils/localizeContent';

const SiteFooter = () => {
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const content = usePortfolioContent();
  const { t, lang } = useLanguage();
  const footerName = localizeValue(content?.site?.footerName, lang) || 'Awlenou Alain';
  const socials = content?.site?.socials || {};

  return (
    <footer className="border-t border-[#2A376E] pt-8 text-sm text-[#9AAEDC]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p>{`© ${currentYear} ${footerName}. ${t.footer.rights}`}</p>
        <div className="flex items-center gap-4">
          <a href={socials.github || 'https://github.com'} target="_blank" rel="noreferrer" className="hover:text-white">
            <Github size={18} />
          </a>
          <a href={socials.linkedin || 'https://linkedin.com'} target="_blank" rel="noreferrer" className="hover:text-white">
            <Linkedin size={18} />
          </a>
          <a href={socials.instagram || 'https://instagram.com'} target="_blank" rel="noreferrer" className="hover:text-white">
            <Instagram size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;

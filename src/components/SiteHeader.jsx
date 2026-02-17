import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '../contexts/LanguageContext';
import { trackEvent } from '../utils/analytics';
import usePortfolioContent from '../hooks/usePortfolioContent';
import { localizeValue } from '../utils/localizeContent';

const navItems = [
  { key: 'home', to: '/' },
  { key: 'about', to: '/about' },
  { key: 'projects', to: '/all-projects' },
  { key: 'blog', to: '/blog' },
  { key: 'contact', to: '/contact' },
];

const SiteHeader = ({ cvEventSource = 'site_header' }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { t, lang } = useLanguage();
  const content = usePortfolioContent();
  const brand = localizeValue(content?.site?.brand, lang) || '2A.';
  const cvUrl = content?.site?.cvUrl || '/cv-awlenou-alain.pdf';

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#2A376E]/60 bg-[#0D1434]/85 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 sm:px-14 lg:px-20 xl:px-28 lg:py-5">
          <Link to="/" className="text-2xl font-semibold tracking-tight">
            {brand}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-9 text-sm text-[#CFDBFF] lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.to}
                className={`transition hover:text-white ${location.pathname === item.to ? 'text-white' : ''}`}
              >
                {t.nav[item.key]}
              </Link>
            ))}
            <a
              href={cvUrl}
              download
              className="rounded-full border border-[#7AA4EE] px-4 py-2 font-medium text-white transition hover:bg-[#7AA4EE]/25"
              onClick={() => trackEvent('cv_download_click', { source: cvEventSource })}
            >
              {t.nav.cv}
            </a>
            <LanguageToggle />
          </nav>

          {/* Mobile hamburger */}
          <button
            className="inline-flex items-center justify-center rounded-lg p-2 text-[#CFDBFF] transition hover:bg-[#1A2555] hover:text-white lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile menu - portaled to body so it's above everything */}
      {mobileOpen && createPortal(
        <div className="fixed inset-0 z-[9999] lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
          />

          {/* Slide panel */}
          <nav className="absolute inset-y-0 right-0 flex w-72 flex-col bg-[#0D1434] shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#2A376E]/60 px-6 py-4">
              <span className="text-lg font-semibold text-white">{brand}</span>
              <button
                className="rounded-lg p-2 text-[#CFDBFF] transition hover:bg-[#1A2555] hover:text-white"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Nav links */}
            <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.to}
                  className={`rounded-lg px-4 py-3 text-base transition hover:bg-[#1A2555] hover:text-white ${
                    location.pathname === item.to
                      ? 'bg-[#1A2555] font-medium text-white'
                      : 'text-[#CFDBFF]'
                  }`}
                >
                  {t.nav[item.key]}
                </Link>
              ))}
            </div>

            {/* Footer actions */}
            <div className="border-t border-[#2A376E]/60 px-6 py-5 space-y-4">
              <a
                href={cvUrl}
                download
                className="block rounded-full border border-[#7AA4EE] px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-[#7AA4EE]/25"
                onClick={() => trackEvent('cv_download_click', { source: cvEventSource })}
              >
                {t.nav.cv}
              </a>
              <div className="flex justify-center">
                <LanguageToggle />
              </div>
            </div>
          </nav>
        </div>,
        document.body
      )}
    </>
  );
};

export default SiteHeader;

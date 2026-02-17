import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import { useSeo } from '../../hooks/useSeo';
import { useLanguage } from '../../contexts/LanguageContext';

const NotFound = () => {
  const { t } = useLanguage();
  useSeo({
    title: `404 | ${t.notFound.title}`,
    description: t.notFound.description,
    canonicalPath: '/404',
    noIndex: true,
  });

  return (
    <div className="portfolio-bg min-h-screen text-[#F2F6FF]">
      <SiteHeader cvEventSource="not_found_page" />
      <div className="mx-auto max-w-[1400px] px-10 py-8 sm:px-14 lg:px-20 xl:px-28">
        <main className="flex min-h-[65vh] items-center justify-center">
          <article className="glass-panel w-full max-w-2xl rounded-3xl p-8 text-center sm:p-12">
            <p className="title-mono text-6xl font-bold text-[#8FB2F0]">404</p>
            <h1 className="mt-3 text-3xl font-semibold">{t.notFound.title}</h1>
            <p className="mx-auto mt-3 max-w-xl text-[#C7D6FB]">
              {t.notFound.description}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/"
                className="rounded-full bg-[#7AA4EE] px-6 py-3 text-sm font-semibold text-[#0A1130] hover:bg-[#93B7F5]"
              >
                {t.notFound.backHome}
              </Link>
              <Link
                to="/all-projects"
                className="inline-flex items-center gap-2 rounded-full border border-[#7AA4EE] px-6 py-3 text-sm font-semibold text-[#DCE8FF] hover:bg-[#7AA4EE]/20"
              >
                <Compass size={16} />
                {t.notFound.viewProjects}
              </Link>
            </div>
          </article>
        </main>
        <SiteFooter />
      </div>
    </div>
  );
};

export default NotFound;


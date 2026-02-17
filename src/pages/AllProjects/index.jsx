import { useEffect, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import { useSeo } from '../../hooks/useSeo';
import usePortfolioContent from '../../hooks/usePortfolioContent';
import { trackEvent } from '../../utils/analytics';
import { resolveProjectImage } from '../../utils/portfolioUi';
import { useLanguage } from '../../contexts/LanguageContext';
import { localizeDeep } from '../../utils/localizeContent';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const AllProjects = () => {
  const [isLoading, setIsLoading] = useState(true);
  const content = usePortfolioContent();
  const { t, lang } = useLanguage();
  const projectsSection = localizeDeep(content?.projects || {}, lang);
  const projects = projectsSection?.items || [];

  useSeo({
    title: 'Tous les projets | Awlenou Alain',
    description: 'Vue complete des projets en grille avec details et liens.',
    canonicalPath: '/all-projects',
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="portfolio-bg min-h-screen text-[#F2F6FF]">
      <SiteHeader cvEventSource="all_projects_page" />

      <div className="mx-auto max-w-[1400px] px-10 py-8 sm:px-14 lg:px-20 xl:px-28">
        <main id="all-projects" className="space-y-10">
          <div id="featured">
            <h1 className="title-mono text-4xl font-bold sm:text-5xl">{projectsSection?.allTitle || 'Tous les projets'}</h1>
            <p className="mt-3 max-w-3xl text-[#B7C7EE]">{projectsSection?.allIntro}</p>
          </div>

          <section id="catalog">
            {isLoading ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <article key={index} className="glass-panel overflow-hidden rounded-2xl">
                    <div className="h-52 w-full animate-pulse bg-[#26376A]" />
                    <div className="space-y-3 p-5">
                      <div className="h-3 w-24 animate-pulse rounded bg-[#31457E]" />
                      <div className="h-7 w-2/3 animate-pulse rounded bg-[#31457E]" />
                      <div className="h-3 w-full animate-pulse rounded bg-[#2A3D74]" />
                      <div className="h-3 w-5/6 animate-pulse rounded bg-[#2A3D74]" />
                      <div className="h-4 w-28 animate-pulse rounded bg-[#385191]" />
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <Motion.div
                className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
                initial="hidden"
                animate="visible"
                transition={{ staggerChildren: 0.08 }}
              >
                {projects.map((project) => (
                  <Motion.article
                    key={project.id}
                    variants={fadeUp}
                    transition={{ duration: 0.4 }}
                    className="glass-panel overflow-hidden rounded-2xl"
                  >
                    <img src={resolveProjectImage(project.imageKey, project.imageUrl)} alt={project.title} className="h-52 w-full object-cover" loading="lazy" decoding="async" />
                    <div className="p-5">
                      <p className="text-xs uppercase tracking-[0.2em] text-[#9BB5EC]">{project.category}</p>
                      <h2 className="mt-2 text-2xl font-semibold">{project.title}</h2>
                      <p className="mt-3 text-sm text-[#B8C7EB]">{project.description}</p>
                      <Link
                        to={`/projects/${project.id}`}
                        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#91B2F1] hover:text-white"
                        onClick={() => trackEvent('project_view_details_click', { project: project.title, source: 'all_projects_page' })}
                      >
                        {t.allProjects.openProject} <ArrowUpRight size={15} />
                      </Link>
                    </div>
                  </Motion.article>
                ))}
              </Motion.div>
            )}
          </section>

          <SiteFooter />
        </main>
      </div>
    </div>
  );
};

export default AllProjects;

import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, ExternalLink, Layers3 } from 'lucide-react';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import { useSeo } from '../../hooks/useSeo';
import usePortfolioContent from '../../hooks/usePortfolioContent';
import { useLanguage } from '../../contexts/LanguageContext';
import { localizeDeep } from '../../utils/localizeContent';
import { resolveProjectImage } from '../../utils/portfolioUi';
import { trackEvent } from '../../utils/analytics';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const ProjectDetail = () => {
  const { id } = useParams();
  const content = usePortfolioContent();
  const { t, lang } = useLanguage();
  const projectsSection = localizeDeep(content?.projects || {}, lang);
  const projects = projectsSection?.items || [];
  const project = projects.find((item) => item.id === id);

  const relatedProjects = useMemo(() => {
    if (!project) return [];
    return projects
      .filter((p) => p.id !== project.id && p.category === project.category)
      .slice(0, 3);
  }, [project, projects]);

  useSeo({
    title: project ? `${project.title} | Awlenou Alain` : t.projectDetail.notFoundTitle,
    description: project?.description || '',
    canonicalPath: `/projects/${id}`,
    noIndex: !project,
  });

  if (!project) {
    return (
      <div className="portfolio-bg min-h-screen text-[#F2F6FF]">
        <SiteHeader cvEventSource="project_detail" />
        <div className="mx-auto max-w-[1400px] px-10 py-8 sm:px-14 lg:px-20 xl:px-28">
          <main>
            <Motion.article
              className="glass-panel rounded-2xl p-10 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#1E2D5B]">
                <Layers3 className="h-10 w-10 text-[#7AA4EE]" />
              </div>
              <h1 className="title-mono text-3xl font-bold">{t.projectDetail.notFoundTitle}</h1>
              <p className="mt-3 text-[#B7C7EE]">{t.projectDetail.notFoundDescription}</p>
              <Link
                to="/all-projects"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#7AA4EE] px-6 py-2.5 text-sm font-medium text-[#D9E4FF] transition hover:bg-[#7AA4EE]/20"
              >
                <ArrowLeft size={16} />
                {t.projectDetail.backToProjects}
              </Link>
            </Motion.article>
            <div className="mt-10">
              <SiteFooter />
            </div>
          </main>
        </div>
      </div>
    );
  }

  const hasLiveLink = project.link && project.link !== '#';

  return (
    <div className="portfolio-bg min-h-screen text-[#F2F6FF]">
      <SiteHeader cvEventSource="project_detail" />

      <div className="mx-auto max-w-[1400px] px-10 py-8 sm:px-14 lg:px-20 xl:px-28">
        <main className="space-y-10">
          {/* Back navigation */}
          <Motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35 }}>
            <Link
              to="/all-projects"
              className="inline-flex items-center gap-2 text-sm text-[#9FC0FF] transition hover:text-white"
            >
              <ArrowLeft size={16} />
              {t.projectDetail.backToProjects}
            </Link>
          </Motion.div>

          {/* Hero image */}
          <Motion.section
            className="glass-panel overflow-hidden rounded-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <img
                src={resolveProjectImage(project.imageKey, project.imageUrl)}
                alt={project.title}
                className="h-64 w-full object-cover sm:h-80 lg:h-[420px]"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1030]/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <span className="inline-block rounded-full bg-[#7AA4EE]/20 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-[#B8D0FF] backdrop-blur-sm">
                  {project.category}
                </span>
                <h1 className="mt-3 title-mono text-3xl font-bold sm:text-4xl lg:text-5xl">{project.title}</h1>
              </div>
            </div>
          </Motion.section>

          {/* Content grid */}
          <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
            {/* Main content */}
            <Motion.div className="space-y-6" initial="hidden" animate="visible" variants={stagger}>
              {/* Description */}
              <Motion.article variants={fadeUp} transition={{ duration: 0.45 }} className="glass-panel rounded-2xl p-6 sm:p-8">
                <h2 className="title-mono text-xl font-bold text-[#D5E3FF]">{t.projectDetail.aboutProject}</h2>
                <p className="mt-4 text-[#BFD0F9] leading-relaxed">{project.description}</p>
              </Motion.article>

              {/* Stack */}
              {project.stack?.length > 0 && (
                <Motion.article variants={fadeUp} transition={{ duration: 0.45 }} className="glass-panel rounded-2xl p-6 sm:p-8">
                  <h2 className="title-mono text-xl font-bold text-[#D5E3FF]">{t.projectDetail.techStack}</h2>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-xl bg-[#1E2D5B] px-4 py-2 text-sm font-medium text-[#B8D0FF] border border-[#2A3D74]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </Motion.article>
              )}
            </Motion.div>

            {/* Sidebar */}
            <Motion.aside
              className="space-y-6"
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              {/* Actions card */}
              <Motion.div variants={fadeUp} transition={{ duration: 0.45 }} className="glass-panel rounded-2xl p-6">
                <h3 className="title-mono text-lg font-bold text-[#D5E3FF]">{t.projectDetail.projectInfo}</h3>

                <div className="mt-5 space-y-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[#8BA3D9]">{t.projectDetail.categoryLabel}</p>
                    <p className="mt-1 text-sm font-medium text-[#D5E3FF]">{project.category}</p>
                  </div>

                  {project.stack?.length > 0 && (
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-[#8BA3D9]">{t.projectDetail.techLabel}</p>
                      <p className="mt-1 text-sm font-medium text-[#D5E3FF]">{project.stack.join(' / ')}</p>
                    </div>
                  )}
                </div>

                {hasLiveLink && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#7AA4EE] px-6 py-3 text-sm font-semibold text-[#0A1130] transition hover:bg-[#92B5F3]"
                    onClick={() => trackEvent('project_open_click', { project: project.title, source: 'project_detail' })}
                  >
                    <ExternalLink size={16} />
                    {t.projectDetail.visitSite}
                  </a>
                )}
              </Motion.div>

              {/* All projects link */}
              <Motion.div variants={fadeUp} transition={{ duration: 0.45 }}>
                <Link
                  to="/all-projects"
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-[#7AA4EE] px-6 py-3 text-sm font-medium text-[#D9E4FF] transition hover:bg-[#7AA4EE]/20"
                >
                  {t.projectDetail.viewAllProjects}
                </Link>
              </Motion.div>
            </Motion.aside>
          </div>

          {/* Related projects */}
          {relatedProjects.length > 0 && (
            <Motion.section
              className="space-y-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
            >
              <h2 className="title-mono text-2xl font-bold">{t.projectDetail.relatedProjects}</h2>
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {relatedProjects.map((related) => (
                  <Motion.article
                    key={related.id}
                    variants={fadeUp}
                    transition={{ duration: 0.45 }}
                    className="glass-panel overflow-hidden rounded-2xl transition hover:-translate-y-1"
                  >
                    <img
                      src={resolveProjectImage(related.imageKey, related.imageUrl)}
                      alt={related.title}
                      className="h-44 w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="p-5">
                      <p className="text-xs uppercase tracking-[0.2em] text-[#9BB5EC]">{related.category}</p>
                      <h3 className="mt-2 text-lg font-semibold">{related.title}</h3>
                      <Link
                        to={`/projects/${related.id}`}
                        className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#91B2F1] hover:text-white"
                      >
                        {t.allProjects.openProject} <ArrowUpRight size={15} />
                      </Link>
                    </div>
                  </Motion.article>
                ))}
              </div>
            </Motion.section>
          )}

          <SiteFooter />
        </main>
      </div>
    </div>
  );
};

export default ProjectDetail;

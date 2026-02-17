import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import {
  ArrowUp,
  ArrowUpRight,
  CalendarDays,
  Mail,
} from 'lucide-react';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import { useLanguage } from '../../contexts/LanguageContext';
import { useSeo } from '../../hooks/useSeo';
import usePortfolioContent from '../../hooks/usePortfolioContent';
import { trackEvent } from '../../utils/analytics';
import { resolveProjectImage, serviceIconMap } from '../../utils/portfolioUi';
import { localizeDeep } from '../../utils/localizeContent';

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const Home = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const { t, lang } = useLanguage();
  const content = usePortfolioContent();
  const home = useMemo(() => localizeDeep(content?.home || {}, lang), [content?.home, lang]);
  const projectsContent = useMemo(() => localizeDeep(content?.projects || {}, lang), [content?.projects, lang]);
  const appointments = useMemo(() => localizeDeep(content?.appointments || {}, lang), [content?.appointments, lang]);
  const calendlyUrl = appointments?.calendlyUrl
    || import.meta.env.VITE_CALENDLY_URL
    || 'https://calendly.com';

  const projectItems = useMemo(() => (projectsContent?.items || []).slice(0, 3), [projectsContent?.items]);

  useSeo({
    title: 'Awlenou Alain | Portfolio',
    description: 'Portfolio de developpement web avec projets, services et contact.',
    canonicalPath: '/',
  });

  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 320);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setProjectsLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="portfolio-bg min-h-screen text-[#F2F6FF]">
      <SiteHeader cvEventSource="home_header" />

      <div className="mx-auto max-w-[1400px] px-10 py-8 sm:px-14 lg:px-20 xl:px-28">
        <main className="space-y-16">
          <section className="glass-panel rounded-2xl px-5 py-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-[#DCE8FF]">
                {home.availabilityText || 'Disponibilite: ouvert aux nouvelles missions front-end et fullstack.'}
              </p>
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#7AA4EE] px-4 py-2 text-sm font-medium text-[#DDE9FF] hover:bg-[#7AA4EE]/20"
                onClick={() => trackEvent('book_call_click', { source: 'home_banner' })}
              >
                <CalendarDays size={16} />
                {t.home.bookCall}
              </a>
            </div>
          </section>

          <section id="home" className="section-anchor">
            <Motion.div className="grid gap-10" initial="hidden" animate="visible" variants={stagger}>
              <Motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
                <p className="mb-6 text-xl text-[#D0DDFF]">{t.home.greeting}</p>
                <div className="mb-8 flex items-center gap-2">
                  <span className="h-[2px] w-10 bg-[#E3ECFF]" />
                  <span className="h-[2px] w-24 bg-[#7AA4EE]" />
                </div>
                <h1 className="max-w-3xl title-mono mb-8 text-4xl font-bold leading-[1.12] sm:text-5xl lg:text-6xl">
                  {t.home.heroTitle}
                </h1>
                <p className="max-w-3xl text-lg leading-relaxed text-[#B7C7EE]">{t.home.heroText}</p>

                <Motion.div variants={fadeUp} transition={{ duration: 0.55, delay: 0.08 }} className="mt-10 flex flex-wrap gap-4">
                  <a
                    href="#about"
                    className="rounded-full bg-[#7AA4EE] px-8 py-3 text-sm font-semibold text-[#0A1130] transition hover:bg-[#92B5F3]"
                    onClick={() => trackEvent('cta_about_click', { source: 'home_hero' })}
                  >
                    {t.home.aboutCta}
                  </a>
                  <a
                    href="#contact"
                    className="group inline-flex items-center gap-2 rounded-full border border-[#D9E4FF] px-8 py-3 text-sm font-semibold text-white transition hover:border-[#7AA4EE] hover:text-[#7AA4EE]"
                    onClick={() => trackEvent('cta_talk_click', { source: 'home_hero' })}
                  >
                    {t.home.talkCta}
                    <ArrowUpRight size={16} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </Motion.div>
              </Motion.div>
            </Motion.div>
          </section>

          <section id="about" className="section-anchor space-y-9">
            <Motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} transition={{ duration: 0.55 }}>
              <h2 className="title-mono text-4xl font-bold">{home.aboutTitle || 'About Me'}</h2>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[#B7C7EE]">{home.aboutText}</p>
            </Motion.div>

            <Motion.div className="grid gap-4 sm:grid-cols-3" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={stagger}>
              {(home.stats || []).map((item) => (
                <Motion.article key={`${item.label}-${item.value}`} variants={fadeUp} transition={{ duration: 0.45 }} className="soft-panel rounded-2xl p-5">
                  <p className="text-4xl font-bold text-[#EAF1FF]">{item.value}</p>
                  <p className="mt-2 text-sm text-[#C1D0F3]">{item.label}</p>
                </Motion.article>
              ))}
            </Motion.div>
          </section>

          <section id="services" className="section-anchor space-y-8">
            <h3 className="title-mono text-3xl font-bold">{t.home.servicesTitle}</h3>
            <Motion.div className="grid gap-4 md:grid-cols-3" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
              {(home.services || []).map((service) => {
                const Icon = serviceIconMap[service.icon] || serviceIconMap.code;
                return (
                  <Motion.article key={service.title} variants={fadeUp} transition={{ duration: 0.45 }} className="glass-panel group rounded-2xl p-5 transition hover:-translate-y-1">
                    <Icon className="h-8 w-8 text-[#89AEF2]" />
                    <h4 className="mt-5 text-2xl font-semibold">{service.title}</h4>
                    <p className="mt-3 text-[#B7C7EE]">{service.description}</p>
                  </Motion.article>
                );
              })}
            </Motion.div>
          </section>

          <section className="space-y-8">
            <h3 className="title-mono text-3xl font-bold">{t.home.skillsTitle}</h3>
            <Motion.div className="grid gap-6 md:grid-cols-2" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={stagger}>
              {(home.skills || []).map((skill) => (
                <Motion.div key={skill.name} variants={fadeUp} transition={{ duration: 0.45 }}>
                  <div className="mb-2 flex items-center justify-between text-[#DAE6FF]">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[#243466]">
                    <Motion.div
                      className="h-full rounded-full bg-[#7AA4EE]"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                </Motion.div>
              ))}
            </Motion.div>
          </section>

          <section id="projects" className="section-anchor space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h3 className="title-mono text-3xl font-bold">{t.home.recentProjectsTitle}</h3>
              <Link to="/all-projects" className="rounded-full border border-[#7AA4EE] px-5 py-2 text-sm font-medium text-[#D9E4FF] transition hover:bg-[#7AA4EE]/20">
                {t.home.viewAllProjects}
              </Link>
            </div>

            {projectsLoading ? (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <article key={index} className="glass-panel overflow-hidden rounded-2xl">
                    <div className="h-52 w-full animate-pulse bg-[#26376A]" />
                    <div className="space-y-3 p-6">
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
              <Motion.div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
                {projectItems.map((project) => (
                  <Motion.article key={project.id} variants={fadeUp} transition={{ duration: 0.5 }} className="glass-panel overflow-hidden rounded-2xl">
                    <img src={resolveProjectImage(project.imageKey, project.imageUrl)} alt={project.title} className="h-52 w-full object-cover" loading="lazy" decoding="async" />
                    <div className="p-6">
                      <p className="text-xs uppercase tracking-[0.25em] text-[#9BB5EC]">{project.category}</p>
                      <h4 className="mt-3 text-2xl font-semibold">{project.title}</h4>
                      <p className="mt-3 text-[#B8C7EB]">{project.description}</p>
                      <a href={project.link} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#91B2F1] hover:text-white" onClick={() => trackEvent('project_open_click', { project: project.title, source: 'home_recent_projects' })}>
                        {t.home.openProject} <ArrowUpRight size={16} />
                      </a>
                    </div>
                  </Motion.article>
                ))}
              </Motion.div>
            )}
          </section>

          <section className="section-anchor space-y-8">
            <h3 className="title-mono text-3xl font-bold">{t.home.faqTitle}</h3>
            <div className="space-y-3">
              {(home.faqs || []).map((item) => (
                <article key={item.q} className="glass-panel rounded-2xl p-5">
                  <p className="font-semibold text-[#EAF1FF]">{item.q}</p>
                  <p className="mt-2 text-[#B7C7EE]">{item.a}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="contact" className="section-anchor pb-2">
            <Motion.div className="glass-panel rounded-3xl px-6 py-10 text-center sm:px-10" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.5 }}>
              <h3 className="title-mono text-3xl font-bold">{home.contactCta?.title || "Let's build together"}</h3>
              <p className="mx-auto mt-3 max-w-2xl text-[#B7C7EE]">{home.contactCta?.text}</p>
              <a href={`mailto:${home.contactCta?.email || 'awlenoualain@gmail.com'}`} className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#7AA4EE] px-7 py-3 font-semibold text-[#0A1130] transition hover:bg-[#92B5F3]" onClick={() => trackEvent('contact_email_click', { source: 'home_contact_block' })}>
                <Mail size={16} />
                {home.contactCta?.buttonLabel || 'Ecrire un message'}
              </a>
            </Motion.div>
          </section>

          <SiteFooter />
        </main>
      </div>

      {showTopBtn && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 rounded-full border border-[#7AA4EE] bg-[#0C1332]/85 p-3 text-[#CFE0FF] backdrop-blur transition hover:bg-[#7AA4EE] hover:text-[#0A1130]"
          aria-label={t.home.backToTop}
          title={t.home.backToTop}
        >
          <ArrowUp size={18} />
        </button>
      )}
    </div>
  );
};

export default Home;

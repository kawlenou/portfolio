import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { ArrowUpRight, Mail } from 'lucide-react';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import { useSeo } from '../../hooks/useSeo';
import usePortfolioContent from '../../hooks/usePortfolioContent';
import { highlightIconMap } from '../../utils/portfolioUi';
import { useLanguage } from '../../contexts/LanguageContext';
import { localizeDeep } from '../../utils/localizeContent';
import { trackEvent } from '../../utils/analytics';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const About = () => {
  const content = usePortfolioContent();
  const { t, lang } = useLanguage();
  const about = useMemo(() => localizeDeep(content?.about || {}, lang), [content?.about, lang]);
  const home = useMemo(() => localizeDeep(content?.home || {}, lang), [content?.home, lang]);

  useSeo({
    title: 'About | Awlenou Alain',
    description: 'Parcours, experience professionnelle et vision produit.',
    canonicalPath: '/about',
  });

  return (
    <div className="portfolio-bg min-h-screen text-[#F2F6FF]">
      <SiteHeader cvEventSource="about_page" />

      <div className="mx-auto max-w-[1400px] px-10 py-8 sm:px-14 lg:px-20 xl:px-28">
        <main className="space-y-14">
          {/* Hero section */}
          <Motion.section initial="hidden" animate="visible" variants={stagger}>
            <Motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
              <div className="mb-6 flex items-center gap-2">
                <span className="h-[2px] w-10 bg-[#E3ECFF]" />
                <span className="h-[2px] w-24 bg-[#7AA4EE]" />
              </div>
              <h1 className="title-mono text-4xl font-bold sm:text-5xl">{about.title || 'About Me'}</h1>
            </Motion.div>
            <Motion.p variants={fadeUp} transition={{ duration: 0.5 }} className="mt-5 max-w-4xl text-lg leading-relaxed text-[#B7C7EE]">
              {about.intro}
            </Motion.p>
          </Motion.section>

          {/* Highlights / stats cards */}
          <Motion.section
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            {(about.highlights || []).map((item) => {
              const Icon = highlightIconMap[item.icon] || highlightIconMap.lightbulb;
              return (
                <Motion.article
                  key={`${item.title}-${item.value}`}
                  variants={fadeUp}
                  transition={{ duration: 0.45 }}
                  className="glass-panel rounded-2xl p-5 transition hover:-translate-y-1"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1E2D5B]">
                    <Icon className="h-6 w-6 text-[#7AA4EE]" />
                  </div>
                  <p className="mt-4 text-xs uppercase tracking-[0.2em] text-[#A6BAEA]">{item.title}</p>
                  <p className="mt-1 text-3xl font-bold text-[#EAF1FF]">{item.value}</p>
                  <p className="mt-2 text-sm text-[#B7C7EE]">{item.detail}</p>
                </Motion.article>
              );
            })}
          </Motion.section>

          {/* Methodology */}
          {(about.methodology || []).length > 0 && (
            <Motion.section
              className="space-y-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
            >
              <Motion.h2 variants={fadeUp} className="title-mono text-3xl font-bold">
                {about.methodologyTitle || 'How I work'}
              </Motion.h2>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {about.methodology.map((item) => (
                  <Motion.article
                    key={item.step}
                    variants={fadeUp}
                    transition={{ duration: 0.45 }}
                    className="glass-panel rounded-2xl p-5 transition hover:-translate-y-1"
                  >
                    <span className="title-mono text-3xl font-bold text-[#7AA4EE]/40">{item.step}</span>
                    <h3 className="mt-3 text-lg font-semibold text-[#EAF1FF]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#B7C7EE]">{item.description}</p>
                  </Motion.article>
                ))}
              </div>
            </Motion.section>
          )}

          {/* Tools & Technologies */}
          {(about.toolCategories || []).length > 0 && (
            <Motion.section
              className="space-y-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
            >
              <Motion.h2 variants={fadeUp} className="title-mono text-3xl font-bold">
                {about.toolsTitle || 'Tools & Technologies'}
              </Motion.h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {about.toolCategories.map((cat) => (
                  <Motion.article
                    key={cat.label}
                    variants={fadeUp}
                    transition={{ duration: 0.45 }}
                    className="glass-panel rounded-2xl p-5"
                  >
                    <p className="text-xs uppercase tracking-[0.2em] text-[#7AA4EE]">{cat.label}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {(cat.items || []).map((tool) => (
                        <span
                          key={tool}
                          className="rounded-lg bg-[#1E2D5B] px-3 py-1.5 text-sm text-[#D5E3FF] border border-[#2A3D74]"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </Motion.article>
                ))}
              </div>
            </Motion.section>
          )}

          {/* Stack */}
          <Motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="glass-panel rounded-2xl p-6 sm:p-8"
          >
            <h3 className="title-mono text-2xl font-bold">{about.stackTitle || 'Core stack'}</h3>
            <ul className="mt-5 space-y-3">
              {(about.stackItems || []).map((item) => (
                <li key={item} className="flex items-center gap-3 text-[#D5E3FF]">
                  <span className="h-2 w-2 rounded-full bg-[#7AA4EE]" />
                  {item}
                </li>
              ))}
            </ul>
          </Motion.section>

          {/* Professional experience — UNTOUCHED */}
          <section className="glass-panel rounded-2xl p-6">
            <h3 className="title-mono text-3xl font-bold">{about.experiencesTitle || 'Experiences professionnelles'}</h3>
            <div className="mt-6 space-y-3">
              {(about.experiences || []).map((item) => (
                <Motion.article
                  key={`${item.title}-${item.org}-${item.period}`}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="soft-panel rounded-xl p-4"
                >
                  <p className="text-lg font-semibold">{item.title}</p>
                  <p className="mt-1 text-sm text-[#B7C7EE]">{item.org} | {item.period}</p>
                </Motion.article>
              ))}
            </div>
          </section>

          {/* CTA section */}
          <Motion.section
            className="glass-panel rounded-3xl px-6 py-10 text-center sm:px-10"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="title-mono text-3xl font-bold">{home.contactCta?.title || "Let's build together"}</h3>
            <p className="mx-auto mt-3 max-w-2xl text-[#B7C7EE]">{home.contactCta?.text}</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <a
                href={`mailto:${home.contactCta?.email || 'contact@awlenou.dev'}`}
                className="inline-flex items-center gap-2 rounded-full bg-[#7AA4EE] px-7 py-3 font-semibold text-[#0A1130] transition hover:bg-[#92B5F3]"
                onClick={() => trackEvent('contact_email_click', { source: 'about_cta' })}
              >
                <Mail size={16} />
                {home.contactCta?.buttonLabel || 'Ecrire un message'}
              </a>
              <Link
                to="/all-projects"
                className="group inline-flex items-center gap-2 rounded-full border border-[#D9E4FF] px-7 py-3 text-sm font-semibold text-white transition hover:border-[#7AA4EE] hover:text-[#7AA4EE]"
              >
                {t.home.viewAllProjects}
                <ArrowUpRight size={16} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Motion.section>

          <SiteFooter />
        </main>
      </div>
    </div>
  );
};

export default About;

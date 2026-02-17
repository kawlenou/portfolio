import { motion as Motion } from 'framer-motion';
import { CalendarDays, Clock3 } from 'lucide-react';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import { useSeo } from '../../hooks/useSeo';
import usePortfolioContent from '../../hooks/usePortfolioContent';
import { trackEvent } from '../../utils/analytics';
import { formatDate } from '../../utils/portfolioUi';
import { useLanguage } from '../../contexts/LanguageContext';
import { localizeDeep } from '../../utils/localizeContent';

const Blog = () => {
  const content = usePortfolioContent();
  const { t, lang } = useLanguage();
  const blog = localizeDeep(content?.blog || {}, lang);
  const posts = blog?.posts || [];

  useSeo({
    title: 'Blog technique | Awlenou Alain',
    description: 'Journal technique sur React, Laravel, performance et architecture produit.',
    canonicalPath: '/blog',
  });

  return (
    <div className="portfolio-bg min-h-screen text-[#F2F6FF]">
      <SiteHeader cvEventSource="blog_page" />

      <div className="mx-auto max-w-[1400px] px-10 py-8 sm:px-14 lg:px-20 xl:px-28">
        <main className="space-y-8">
          <section>
            <h1 className="title-mono text-5xl font-bold">{blog?.title || 'Journal technique'}</h1>
            <p className="mt-3 max-w-3xl text-[#C7D6FB]">{blog?.intro}</p>
          </section>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <Motion.article
                key={post.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-panel rounded-2xl p-5"
              >
                <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-[#A8BDEA]">
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays size={14} />
                    {formatDate(post.date)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock3 size={14} />
                    {post.readTime}
                  </span>
                </div>
                <h2 className="text-2xl font-semibold">{post.title}</h2>
                <p className="mt-3 text-[#C7D6FB]">{post.excerpt}</p>
                <button
                  type="button"
                  className="mt-5 rounded-full border border-[#7AA4EE] px-4 py-2 text-sm font-medium text-[#DCE8FF] hover:bg-[#7AA4EE]/20"
                  onClick={() => trackEvent('blog_read_more_click', { post_id: post.id })}
                >
                  {t.blog.readNote}
                </button>
              </Motion.article>
            ))}
          </section>
          <SiteFooter />
        </main>
      </div>
    </div>
  );
};

export default Blog;

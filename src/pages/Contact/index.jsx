import { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { CalendarDays, Send } from 'lucide-react';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import { useSeo } from '../../hooks/useSeo';
import usePortfolioContent from '../../hooks/usePortfolioContent';
import { trackEvent } from '../../utils/analytics';
import { channelIconMap } from '../../utils/portfolioUi';
import { useLanguage } from '../../contexts/LanguageContext';
import { localizeDeep } from '../../utils/localizeContent';

const Contact = () => {
  const calendlyUrl = import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com';
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const { t, lang } = useLanguage();
  const content = usePortfolioContent();
  const contact = localizeDeep(content?.contact || {}, lang);
  const appointments = localizeDeep(content?.appointments || {}, lang);
  const bookingUrl = appointments?.calendlyUrl || calendlyUrl;
  const contactEmail = contact?.channels?.find((c) => c.icon === 'mail')?.value || 'contact@awlenou.dev';

  useSeo({
    title: 'Contact | Awlenou Alain',
    description: 'Contactez Awlenou Alain pour discuter de votre projet web.',
    canonicalPath: '/contact',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subject = encodeURIComponent(form.subject || 'Contact depuis le portfolio');
    const body = encodeURIComponent(
      `Nom: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    trackEvent('contact_form_submit', { source: 'contact_page' });
  };

  return (
    <div className="portfolio-bg min-h-screen text-[#F2F6FF]">
      <SiteHeader cvEventSource="contact_page" />

      <div className="mx-auto max-w-[1400px] px-10 py-8 sm:px-14 lg:px-20 xl:px-28">
        <main className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="glass-panel rounded-2xl p-6">
            <h1 className="title-mono text-4xl font-bold">{contact.title || 'Contact'}</h1>
            <p className="mt-4 text-[#C7D6FB]">{contact.intro}</p>

            <div className="mt-6 space-y-3">
              {(contact.channels || []).map((item) => {
                const Icon = channelIconMap[item.icon] || channelIconMap.mail;
                return (
                  <Motion.article
                    key={item.label}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="soft-panel flex items-center gap-3 rounded-xl p-4"
                  >
                    <Icon className="h-5 w-5 text-[#8FB2F0]" />
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-[#9DB5EA]">{item.label}</p>
                      <p className="text-sm text-[#E4EDFF]">{item.value}</p>
                    </div>
                  </Motion.article>
                );
              })}
            </div>

            <article className="soft-panel mt-6 rounded-xl p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[#9DB5EA]">{contact.availabilityLabel || 'Disponibilite'}</p>
              <p className="mt-2 text-sm text-[#E4EDFF]">{contact.availabilityText}</p>
              <a
                href={bookingUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#7AA4EE] px-4 py-2 text-sm font-medium text-[#DDE9FF] hover:bg-[#7AA4EE]/20"
                onClick={() => trackEvent('book_call_click', { source: 'contact_page' })}
              >
                <CalendarDays size={16} />
                {t.contact.bookMeeting}
              </a>
            </article>
          </section>

          <section className="glass-panel rounded-2xl p-6">
            <h2 className="title-mono text-3xl font-bold">{contact.formTitle || 'Envoyer un message'}</h2>
            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm text-[#CBD9FB]">
                  {t.contact.form.name}
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    type="text"
                    required
                    placeholder={t.contact.form.namePlaceholder}
                    className="mt-2 w-full rounded-xl border border-[#3B4D88] bg-[#101A44]/70 px-4 py-3 text-white placeholder:text-[#8BA1D6] outline-none focus:border-[#7AA4EE]"
                  />
                </label>
                <label className="text-sm text-[#CBD9FB]">
                  {t.contact.form.email}
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    type="email"
                    required
                    placeholder={t.contact.form.emailPlaceholder}
                    className="mt-2 w-full rounded-xl border border-[#3B4D88] bg-[#101A44]/70 px-4 py-3 text-white placeholder:text-[#8BA1D6] outline-none focus:border-[#7AA4EE]"
                  />
                </label>
              </div>

              <label className="text-sm text-[#CBD9FB]">
                {t.contact.form.subject}
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  type="text"
                  required
                  placeholder={t.contact.form.subjectPlaceholder}
                  className="mt-2 w-full rounded-xl border border-[#3B4D88] bg-[#101A44]/70 px-4 py-3 text-white placeholder:text-[#8BA1D6] outline-none focus:border-[#7AA4EE]"
                />
              </label>

              <label className="text-sm text-[#CBD9FB]">
                {t.contact.form.message}
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={6}
                  required
                  placeholder={t.contact.form.messagePlaceholder}
                  className="mt-2 w-full rounded-xl border border-[#3B4D88] bg-[#101A44]/70 px-4 py-3 text-white placeholder:text-[#8BA1D6] outline-none focus:border-[#7AA4EE]"
                />
              </label>

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-[#7AA4EE] px-7 py-3 font-semibold text-[#0A1130] transition hover:bg-[#93B7F5]"
              >
                <Send size={16} />
                {t.contact.form.submit}
              </button>
            </form>
          </section>
        </main>
        <SiteFooter />
      </div>
    </div>
  );
};

export default Contact;

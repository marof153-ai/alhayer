import Link from "next/link";
import { notFound } from "next/navigation";
import { Phone, MessageCircle, BadgeCheck, ClipboardList, Leaf, Handshake, Plus, ArrowLeft, ArrowRight } from "lucide-react";
import { content } from "@/lib/content";
import { SITE, SERVICES } from "@/lib/site";
import { Blades, HeroArt } from "@/components/Art";
import RequestForm from "@/components/RequestForm";
import Projects from "@/components/Projects";
import { PROJECTS } from "@/lib/projects";
import Header from "@/components/Header";

const TRUST_ICONS = [BadgeCheck, ClipboardList, Leaf, Handshake];
// توحيد نمط بطاقات الخدمات بالكامل
const VARIANTS = { 
  design: "v-light w",            // البطاقة الرئيسية البارزة باللون الأخضر الداكن الفاخر
  build: "v-light w",           // بطاقات فاتحة وموحدة بلون الأوف وايت الهادئ (var(--lawn))
  irrigation: "v-light", 
  "natural-grass": "v-light", 
  "artificial-grass": "v-light", 
  trees: "v-light w", 
  lawns: "v-light" 
};

export default async function Home({ params }) {
  const { lang } = await params;
  const t = content[lang];
  if (!t) notFound();

  const isRtl = t.dir === "rtl";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const wa = `https://wa.me/${SITE.whatsapp}`;

  return (
    <>
      {/* Sticky Header مع تأثير زجاجي */}
    
      <Header t={t} />
      <main id="top">
        {/* قسم البداية (Hero) */}
        <section className="hero">
  <div className="wrap hero-in hero-centered">
    <div className="hero-text">
      <h1>
        {t.hero.h1[0]}<br />
        <span className="highlight">{t.hero.h1[1]}</span>
      </h1>
      <p>{t.hero.p}</p>
      <div className="hero-cta">
        <a className="btn" href="#request">{t.hero.cta1}</a>
        <a className="btn btn-ghost" href={wa} target="_blank" rel="noopener noreferrer">{t.hero.cta2}</a>
      </div>
    </div>
  </div>
</section>

        {/* مميزات الثقة */}
        <section className="trust wrap">
          {t.trust.map(([h, p], i) => { 
            const I = TRUST_ICONS[i] || Leaf; 
            return (
              <div key={h}>
                <I size={28} className="trust-icon" aria-hidden="true" />
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            ); 
          })}
        </section>

        {/* قسم الخدمات (Bento Grid) */}
        <section id="services" className="sec wrap">
          <h2>{t.services.title}</h2>
          <p className="lead">{t.services.lead}</p>
          <div className="bento">
            {SERVICES.map(({ id, icon: Icon }) => (
              <article key={id} className={`b ${VARIANTS[id] || ""}`}>
                {Icon && <Icon className="wm" size={170} strokeWidth={1.2} aria-hidden="true" />}
                <span className="ico">{Icon && <Icon size={24} aria-hidden="true" />}</span>
                <h3>{t.services.items[id]?.[0]}</h3>
                <p>{t.services.items[id]?.[1]}</p>
              </article>
            ))}
          </div>
        </section>

        {/* قسم المشاريع */}
        <section id="projects" className="sec wrap">
          <h2>{t.projects.title}</h2>
          <p className="lead">{t.projects.lead}</p>
          <Projects
            items={PROJECTS.map((p) => ({ id: p.id, cat: p.cat, img: p.img, area: p.area, ...(p[lang] || {}) }))}
            cats={Object.fromEntries(Object.entries(t.services.items).map(([k, v]) => [k, v[0]]))}
            t={t.projects}
          />
          <div className="pcta">
            <strong>{t.projects.cta}</strong>
            <a className="btn" href="#request">{t.projects.btn}</a>
          </div>
        </section>

        {/* مراحل العمل */}
        <section id="process" className="process">
          <div className="wrap">
            <h2>{t.process.title}</h2>
            <ol className="steps">
              {t.process.steps.map(([h, p], i) => (
                <li key={h}>
                  <b>{i + 1}</b>
                  <h3>{h}</h3>
                  <p>{p}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* نموذج الطلب والتواصل */}
        <section id="request" className="sec wrap">
          <h2>{t.request.title}</h2>
          <p className="lead">{t.request.lead}</p>
          <div className="req">
            <aside className="side">
  <h3>{t.request.side.h}</h3>
  
  <ol>
    {t.request.side.list.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ol>

  <p className="or">{t.request.side.or}</p>

  <a href={`tel:${SITE.phone}`} dir="ltr">
    <Phone size={18} aria-hidden="true" />
    <span>{SITE.phone}</span>
  </a>

  <a href={wa} target="_blank" rel="noopener noreferrer">
    <MessageCircle size={18} aria-hidden="true" />
    <span>WhatsApp</span>
  </a>
</aside>
            <RequestForm t={t.form} lang={lang} />
          </div>
        </section>

        {/* الأسئلة الشائعة */}
        <section id="faq" className="sec wrap faq">
          <h2>{t.faq.title}</h2>
          {t.faq.items.map(([q, a]) => (
            <details key={q}>
              <summary>{q}<Plus size={20} aria-hidden="true" /></summary>
              <p>{a}</p>
            </details>
          ))}
        </section>
      </main>

      <footer className="foot">
  <div className="wrap foot-in">
    {/* الهوية والتعريف */}
    <div className="foot-brand">
      <strong>{t.footer?.aboutTitle || t.name}</strong>
      <p>{t.tagline}</p>
      <div className="social-links">
        <a href="#" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 448 512" width="18" height="18" fill="currentColor"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
        </a>
        <a href="#" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 320 512" width="16" height="16" fill="currentColor"><path d="M279.1 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.4 0 225.4 0c-73.22 0-121.1 44.38-121.1 124.7v70.62H22.89V288h81.39v224h100.2V288z"/></svg>
        </a>
        <a href="#" aria-label="X" target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 512 512" width="16" height="16" fill="currentColor"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>
        </a>
      </div>
    </div>

    {/* روابط سريعة */}
    <div className="foot-sec">
      <h4>{t.footer?.quickLinksTitle || "روابط سريعة"}</h4>
      <ul>
        <li><a href="#top">{t.nav?.home || "الرئيسية"}</a></li>
        <li><a href="#services">{t.nav?.services}</a></li>
        <li><a href="#projects">{t.nav?.projects}</a></li>
        <li><a href="#process">{t.nav?.process}</a></li>
        <li><a href="#faq">{t.nav?.faq}</a></li>
      </ul>
    </div>

    {/* معلومات الاتصال والتواصل */}
    <div className="foot-sec">
      <h4>{t.footer?.contactTitle || "تواصل معنا"}</h4>
      <ul className="foot-contact">
        <li>📍 {t.footer?.location || "أبوظبي، الإمارات العربية المتحدة"}</li>
        <li dir="ltr"><a href="tel:+971504877232">📞 +971 50 487 7232</a></li>
        <li dir="ltr"><a href="tel:+97126416332">☎️ +971 2 641 6332</a></li>
        <li dir="ltr">📠 +971 2 641 6334</li>
        <li dir="ltr">📦 {t.footer?.poBox || "P.O.Box : 53064"}</li>
        <li><a href="mailto:info@alhayereastern.com">✉️ info@alhayereastern.com</a></li>
      </ul>
    </div>
  </div>

  <div className="wrap foot-bottom">
    <p>&copy; 2026 {t.name}. {t.footer?.copyright || "جميع الحقوق محفوظة."}</p>
  </div>
</footer>
      
      {/* زر الواتساب العائم */}
      <a className="fab" href={wa} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
        <MessageCircle size={26} aria-hidden="true" />
      </a>
    </>
  );
}
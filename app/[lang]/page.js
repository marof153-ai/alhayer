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
          <div>
            <strong>{t.name}</strong>
            <span>{t.tagline}</span>
          </div>
          <a href={`tel:${SITE.phone}`} dir="ltr">{SITE.phone}</a>
          <Link href={`/${t.other}`}>{t.switchLabel}</Link>
        </div>
      </footer>
      
      {/* زر الواتساب العائم */}
      <a className="fab" href={wa} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
        <MessageCircle size={26} aria-hidden="true" />
      </a>
    </>
  );
}
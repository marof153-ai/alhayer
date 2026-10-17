import Link from "next/link";
import { notFound } from "next/navigation";
import { Phone, MessageCircle, BadgeCheck, ClipboardList, Leaf, Handshake, Plus } from "lucide-react";
import { content } from "@/lib/content";
import { SITE, SERVICES } from "@/lib/site";
import { Blades, HeroArt } from "@/components/Art";
import RequestForm from "@/components/RequestForm";
import Projects from "@/components/Projects";
import { PROJECTS } from "@/lib/projects";

const TRUST_ICONS = [BadgeCheck, ClipboardList, Leaf, Handshake];
const VARIANTS = { design: "v-dark w", build: "v-light w", irrigation: "v-sprout", "natural-grass": "v-light", "artificial-grass": "v-soil", trees: "v-grass w", lawns: "v-light w" };

export default async function Home({ params }) {
  const { lang } = await params;
  const t = content[lang];
  if (!t) notFound();
  const wa = `https://wa.me/${SITE.whatsapp}`;

  return (
    <>
      <header className="nav">
        <div className="wrap nav-in">
          <a className="logo" href="#top"><Leaf size={22} />{t.name}</a>
          <nav>
            <a href="#services">{t.nav.services}</a><a href="#projects">{t.nav.projects}</a><a href="#process">{t.nav.process}</a><a href="#faq">{t.nav.faq}</a>
            <Link className="lang" href={`/${t.other}`} hrefLang={t.other} lang={t.other}>{t.switchLabel}</Link>
            <a className="btn btn-sm" href="#request">{t.nav.cta}</a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="wrap hero-in">
            <div className="hero-text">
              <h1>{t.hero.h1[0]}<br />{t.hero.h1[1]}</h1>
              <p>{t.hero.p}</p>
              <div className="hero-cta">
                <a className="btn" href="#request">{t.hero.cta1}</a>
                <a className="btn btn-ghost" href={wa}>{t.hero.cta2}</a>
              </div>
            </div>
            <HeroArt />
          </div>
          <Blades color="#2F7D2B" base="#2F7D2B" />
        </section>

        <section className="trust wrap">
          {t.trust.map(([h, p], i) => { const I = TRUST_ICONS[i]; return (
            <div key={h}><I size={26} /><h3>{h}</h3><p>{p}</p></div>); })}
        </section>

        <section id="services" className="sec wrap">
          <h2>{t.services.title}</h2>
          <p className="lead">{t.services.lead}</p>
          <div className="bento">
            {SERVICES.map(({ id, icon: Icon }) => (
              <article key={id} className={`b ${VARIANTS[id]}`}>
                <Icon className="wm" size={170} strokeWidth={1.2} aria-hidden="true" />
                <span className="ico"><Icon size={24} /></span>
                <h3>{t.services.items[id][0]}</h3>
                <p>{t.services.items[id][1]}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="sec wrap">
          <h2>{t.projects.title}</h2>
          <p className="lead">{t.projects.lead}</p>
          <Projects
            items={PROJECTS.map((p) => ({ id: p.id, cat: p.cat, img: p.img, area: p.area, ...p[lang] }))}
            cats={Object.fromEntries(Object.entries(t.services.items).map(([k, v]) => [k, v[0]]))}
            t={t.projects}
          />
          <div className="pcta"><strong>{t.projects.cta}</strong><a className="btn" href="#request">{t.projects.btn}</a></div>
        </section>

        <section id="process" className="process">
          <div className="wrap">
            <h2>{t.process.title}</h2>
            <ol className="steps">
              {t.process.steps.map(([h, p], i) => (<li key={h}><b>{i + 1}</b><h3>{h}</h3><p>{p}</p></li>))}
            </ol>
          </div>
        </section>

        <section id="request" className="sec wrap">
          <h2>{t.request.title}</h2>
          <p className="lead">{t.request.lead}</p>
          <div className="req">
            <aside className="side">
              <h3>{t.request.side.h}</h3>
              <ol>{t.request.side.list.map((x) => <li key={x}>{x}</li>)}</ol>
              <p className="or">{t.request.side.or}</p>
              <a href={`tel:${SITE.phone}`} dir="ltr"><Phone size={18} />{SITE.phone}</a>
              <a href={wa}><MessageCircle size={18} />WhatsApp</a>
            </aside>
            <RequestForm t={t.form} lang={lang} />
          </div>
        </section>

        <section id="faq" className="sec wrap faq">
          <h2>{t.faq.title}</h2>
          {t.faq.items.map(([q, a]) => (
            <details key={q}><summary>{q}<Plus size={20} /></summary><p>{a}</p></details>
          ))}
        </section>
      </main>

      <footer className="foot">
        <div className="wrap foot-in">
          <div><strong>{t.name}</strong><span>{t.tagline}</span></div>
          <a href={`tel:${SITE.phone}`} dir="ltr">{SITE.phone}</a>
          <Link href={`/${t.other}`}>{t.switchLabel}</Link>
        </div>
      </footer>
      <a className="fab" href={wa} aria-label="WhatsApp"><MessageCircle size={26} /></a>
    </>
  );
}

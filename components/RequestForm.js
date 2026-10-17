"use client";
import { useState } from "react";
import { Check } from "lucide-react";
import { SERVICES, SITE } from "@/lib/site";
import { content } from "@/lib/content";

const init = { name: "", phone: "", email: "", city: "", address: "", spaceType: "", area: "", services: [],
  budget: "", timeline: "", hasPlans: false, notes: "", website: "" };

export default function RequestForm({ t, lang }) {
  const names = content[lang].services.items;
  const [step, setStep] = useState(0);
  const [f, setF] = useState(init);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));
  const toggle = (id) => set("services", f.services.includes(id) ? f.services.filter((s) => s !== id) : [...f.services, id]);
  const check = () => {
    if (step === 0 && (f.name.trim().length < 2 || f.phone.replace(/\D/g, "").length < 8 || !f.city)) return t.e0;
    if (step === 1 && (!f.spaceType || f.services.length === 0)) return t.e1;
    return "";
  };
  const next = () => { const e = check(); setErr(e); if (!e) setStep(step + 1); };

  async function submit(e) {
    e.preventDefault(); setBusy(true); setErr("");
    try {
      const r = await fetch("/api/requests", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...f, lang }) });
      if (!r.ok) throw new Error();
      setDone(true);
    } catch { setErr(t.eSrv); }
    setBusy(false);
  }

  const chips = (key, opts, type = "radio") => (
    <div className="chips">{opts.map(([v, l]) => (
      <label key={v} className={"chip" + (f[key] === v ? " on" : "")}>
        <input type={type} name={key} checked={f[key] === v} onChange={() => set(key, f[key] === v ? "" : v)} />{l}
      </label>))}</div>
  );

  if (done) return (
    <div className="form done" role="status">
      <span className="ok"><Check size={30} /></span>
      <h3>{t.doneT}</h3><p>{t.doneP}</p>
      <a className="btn" href={`https://wa.me/${SITE.whatsapp}`}>{t.wa}</a>
    </div>
  );

  return (
    <form className="form" onSubmit={submit} noValidate>
      <div className="bar" aria-hidden="true"><i style={{ width: `${((step + 1) / 3) * 100}%` }} /></div>
      <ol className="tabs">{t.tabs.map((x, i) => <li key={x} aria-current={i === step ? "step" : undefined} className={i === step ? "on" : i < step ? "past" : ""}>{x}</li>)}</ol>

      {step === 0 && <div className="fields">
        <label>{t.name} *<input value={f.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" /></label>
        <label>{t.phone} *<input dir="ltr" inputMode="tel" placeholder="+971 5X XXX XXXX" value={f.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" /></label>
        <label>{t.email}<input dir="ltr" type="email" value={f.email} onChange={(e) => set("email", e.target.value)} /></label>
        <label>{t.city} *<select value={f.city} onChange={(e) => set("city", e.target.value)}><option value="">{t.choose}</option>{t.cities.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></label>
        <label className="full">{t.address}<input value={f.address} onChange={(e) => set("address", e.target.value)} /></label>
      </div>}

      {step === 1 && <div className="fields">
        <fieldset className="full"><legend>{t.space} *</legend>{chips("spaceType", t.spaces)}</fieldset>
        <fieldset className="full"><legend>{t.services} *</legend>
          <div className="svc">{SERVICES.map(({ id, icon: I }) => (
            <label key={id} className={"opt" + (f.services.includes(id) ? " on" : "")}>
              <input type="checkbox" checked={f.services.includes(id)} onChange={() => toggle(id)} /><I size={20} />{names[id][0]}
            </label>))}</div></fieldset>
        <label>{t.area}<input dir="ltr" inputMode="numeric" value={f.area} onChange={(e) => set("area", e.target.value)} /></label>
        <label className="check"><input type="checkbox" checked={f.hasPlans} onChange={(e) => set("hasPlans", e.target.checked)} />{t.plans}</label>
      </div>}

      {step === 2 && <div className="fields">
        <fieldset className="full"><legend>{t.budget}</legend>{chips("budget", t.budgets)}</fieldset>
        <fieldset className="full"><legend>{t.timeline}</legend>{chips("timeline", t.timelines)}</fieldset>
        <label className="full">{t.notes}<textarea rows={4} placeholder={t.notesPh} value={f.notes} onChange={(e) => set("notes", e.target.value)} /></label>
        <input className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" name="website" value={f.website} onChange={(e) => set("website", e.target.value)} />
      </div>}

      {err && <p className="err" role="alert">{err}</p>}
      <div className="actions">
        {step > 0 && <button type="button" className="btn btn-ghost dark" onClick={() => { setErr(""); setStep(step - 1); }}>{t.back}</button>}
        {step < 2 ? <button type="button" className="btn" onClick={next}>{t.next}</button>
          : <button className="btn" disabled={busy}>{busy ? t.sending : t.send}</button>}
      </div>
    </form>
  );
}

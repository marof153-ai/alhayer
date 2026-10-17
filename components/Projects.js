"use client";
import { useState } from "react";
import { MapPin, Ruler } from "lucide-react";

const PAL = [["#E3F1BB", "#F4FA9A", "#2F7D2B", "#1E5524"], ["#D5EAF5", "#FBF3B0", "#4E9A33", "#2B6A2C"],
  ["#F5E7CF", "#FFF0A8", "#6DAE31", "#3C7A2A"], ["#CFE8D8", "#EAF7A0", "#2A7A4B", "#14391A"]];

function Scene({ i }) {
  const [bg, sun, a, b] = PAL[i % PAL.length];
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="400" height="300" fill={bg} />
      <circle cx={80 + ((i * 70) % 240)} cy="64" r="26" fill={sun} />
      <path d="M0 190 Q120 130 250 175 T400 160 V300H0Z" fill={b} />
      <g transform={`translate(${290 - i * 25} 150)`}><rect x="-4" y="0" width="8" height="36" rx="3" fill="#3A2B1F" /><circle cy="-6" r="26" fill={b} /><circle cx="-16" cy="8" r="18" fill={b} /><circle cx="16" cy="8" r="18" fill={b} /></g>
      <path d="M0 238 Q140 188 280 228 T400 212 V300H0Z" fill={a} />
    </svg>
  );
}

export default function Projects({ items, cats, t }) {
  const [cat, setCat] = useState("all");
  const used = [...new Set(items.map((p) => p.cat))];
  const shown = cat === "all" ? items : items.filter((p) => p.cat === cat);
  return (
    <>
      <div className="chips pf" role="group" aria-label={t.title}>
        {["all", ...used].map((c) => (
          <button key={c} type="button" aria-pressed={cat === c} className={"chip" + (cat === c ? " on" : "")} onClick={() => setCat(c)}>
            {c === "all" ? t.all : cats[c]}
          </button>
        ))}
      </div>
      <div className="pgrid">
        {shown.map((p, i) => (
          <article className="proj" key={p.id}>
            <div className="shot">
              {p.img ? <img src={p.img} alt={p.title} loading="lazy" /> : <Scene i={items.indexOf(p)} />}
              <span className="tag">{cats[p.cat]}</span>
            </div>
            <h3>{p.title}</h3>
            <p><span><MapPin size={15} />{p.place}</span>{p.area ? <span><Ruler size={15} />{p.area.toLocaleString("en")} {t.unit}</span> : null}</p>
          </article>
        ))}
      </div>
    </>
  );
}

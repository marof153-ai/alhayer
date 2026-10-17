"use client";
import { useState, useTransition } from "react";
import Link from "next/link";
import { moveRequest } from "@/lib/actions";

const fmt = (n) => (n == null ? "" : new Intl.NumberFormat("en-US").format(n) + " د.إ");

export default function Kanban({ stages, items }) {
  const [rows, setRows] = useState(items);
  const [over, setOver] = useState(null);
  const [, start] = useTransition();
  const move = (id, status) => {
    setRows((r) => r.map((x) => (x.id === id ? { ...x, status } : x)));
    start(async () => { await moveRequest(id, status); });
  };
  const now = Date.now();
  return (
    <div className="kanban">
      {stages.map((s) => {
        const col = rows.filter((r) => r.status === s.id);
        const sum = col.reduce((a, r) => a + (r.quoteValue || 0), 0);
        return (
          <section key={s.id} className={over === s.id ? "col over" : "col"}
            onDragOver={(e) => { e.preventDefault(); setOver(s.id); }} onDragLeave={() => setOver(null)}
            onDrop={(e) => { e.preventDefault(); setOver(null); const id = e.dataTransfer.getData("id"); if (id) move(id, s.id); }}>
            <header style={{ borderColor: s.c }}><b>{s.label}</b><span>{col.length}</span>{sum > 0 && <small>{fmt(sum)}</small>}</header>
            {col.map((r) => {
              const late = r.followUpAt && new Date(r.followUpAt).getTime() < now && !["won", "lost"].includes(r.status);
              return (
                <article key={r.id} className="kcard" draggable onDragStart={(e) => e.dataTransfer.setData("id", r.id)}>
                  <Link href={`/admin/requests/${r.id}`}><b>{r.name}</b></Link>
                  <p>{r.services}</p>
                  <small>{r.city}{r.area ? ` · ${r.area} م²` : ""}</small>
                  {r.quoteValue != null && <strong>{fmt(r.quoteValue)}</strong>}
                  {late && <em>متابعة متأخرة</em>}
                  <select aria-label="نقل إلى مرحلة" value={r.status} onChange={(e) => move(r.id, e.target.value)}>
                    {stages.map((x) => <option key={x.id} value={x.id}>{x.label}</option>)}
                  </select>
                </article>
              );
            })}
          </section>
        );
      })}
    </div>
  );
}

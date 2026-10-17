import { requireAdmin } from "@/lib/auth";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { STAGES, L, SOURCES, money, dt, toInput, svcName, parseServices } from "@/lib/crm";
import { waLink } from "@/lib/phone";
import { moveRequest, saveDeal, addNote } from "@/lib/actions";
import { Badge } from "@/components/admin/ui";

export const dynamic = "force-dynamic";
const ICON = { note: "📝", call: "📞", visit: "📍", status: "🔄", quote: "💰", system: "🌿" };

export default async function RequestPage({ params }) {
  await requireAdmin();
  const { id } = await params;
  const r = await prisma.request.findUnique({ where: { id }, include: { client: true, activities: { orderBy: { createdAt: "desc" } } } });
  if (!r) notFound();
  const c = r.client;
  const dl = [
    ["الخدمات", parseServices(r.services).map(svcName).join("، ")], ["نوع المساحة", L.space[r.spaceType] || r.spaceType],
    ["المساحة", r.area ? `${r.area} م²` : "—"], ["المدينة", L.city[r.city] || r.city], ["العنوان", r.address || "—"],
    ["الميزانية", L.budget[r.budget] || "—"], ["موعد البدء", L.timeline[r.timeline] || "—"],
    ["مخططات/صور", r.hasPlans ? "نعم" : "لا"], ["المصدر", SOURCES[r.source] || r.source],
  ];
  return (
    <>
      <div className="head">
        <div><h1><Link href={`/admin/clients/${c.id}`}>{c.name}</Link></h1><span className="mute">استُلم {dt(r.createdAt, true)}</span> <Badge status={r.status} /></div>
        <div className="acts">
          <a className="btn" href={`tel:${c.phone}`}>اتصال</a>
          <a className="btn alt" href={waLink(c.phone)} target="_blank" rel="noreferrer">واتساب</a>
          {c.email && <a className="btn alt" href={`mailto:${c.email}`}>بريد</a>}
        </div>
      </div>

      <div className="steps2">
        {STAGES.map((s) => (
          <form key={s.id} action={moveRequest.bind(null, r.id, s.id)}>
            <button className={r.status === s.id ? "on" : ""} style={r.status === s.id ? { background: s.c, borderColor: s.c } : null}>{s.label}</button>
          </form>))}
      </div>

      <div className="two wide">
        <div>
          <section className="card"><h2>تفاصيل الطلب</h2>
            <dl>{dl.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
            {r.notes && <p className="note">{r.notes}</p>}
          </section>
          <section className="card"><h2>سجل المتابعة</h2>
            <form action={addNote.bind(null, r.id)} className="noteform">
              <select name="type"><option value="note">ملاحظة</option><option value="call">مكالمة</option><option value="visit">زيارة</option></select>
              <textarea name="text" rows={2} placeholder="ماذا حدث؟ وما الخطوة التالية؟" required />
              <label>تذكير بالمتابعة<input type="date" name="followUpAt" /></label>
              <button className="btn">إضافة</button>
            </form>
            <ul className="tl">{r.activities.map((a) => (
              <li key={a.id}><span>{ICON[a.type] || "•"}</span><div>{a.text}<small>{dt(a.createdAt, true)}</small></div></li>))}</ul>
          </section>
        </div>
        <aside className="side2">
          <form action={saveDeal.bind(null, r.id)} className="card">
            <h2>الصفقة</h2>
            <label>قيمة العرض (د.إ)<input name="quoteValue" type="number" min="0" step="1" dir="ltr" defaultValue={r.quoteValue ?? ""} /></label>
            <label>موعد المعاينة<input name="visitAt" type="datetime-local" dir="ltr" defaultValue={toInput(r.visitAt, true)} /></label>
            <label>المتابعة القادمة<input name="followUpAt" type="date" dir="ltr" defaultValue={toInput(r.followUpAt)} /></label>
            {r.status === "lost" && <label>سبب الخسارة<textarea name="lostReason" rows={2} defaultValue={r.lostReason || ""} /></label>}
            <button className="btn">حفظ</button>
          </form>
          <section className="card"><h2>العميل</h2>
            <p dir="ltr" className="mute">{c.phone}</p>{c.email && <p dir="ltr" className="mute">{c.email}</p>}
            {c.notes && <p className="note">{c.notes}</p>}
            <Link href={`/admin/clients/${c.id}`}>ملف العميل ←</Link>
          </section>
        </aside>
      </div>
    </>
  );
}

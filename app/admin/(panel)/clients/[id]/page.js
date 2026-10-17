import { requireAdmin } from "@/lib/auth";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { L, money, dt, svcName, parseServices } from "@/lib/crm";
import { waLink } from "@/lib/phone";
import { saveClient } from "@/lib/actions";
import { Badge } from "@/components/admin/ui";
import { content } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function ClientPage({ params }) {
  await requireAdmin();
  const { id } = await params;
  const c = await prisma.client.findUnique({ where: { id }, include: { requests: { orderBy: { createdAt: "desc" } } } });
  if (!c) notFound();
  const won = c.requests.filter((r) => r.status === "won").reduce((a, r) => a + (r.quoteValue || 0), 0);
  return (
    <>
      <div className="head"><div><h1>{c.name}</h1><span className="mute" dir="ltr">{c.phone}</span></div>
        <div className="acts"><a className="btn" href={`tel:${c.phone}`}>اتصال</a><a className="btn alt" href={waLink(c.phone)} target="_blank" rel="noreferrer">واتساب</a></div></div>
      <div className="two wide">
        <section className="card"><h2>الطلبات ({c.requests.length}) · تعاقدات {money(won)}</h2>
          {c.requests.map((r) => (
            <Link key={r.id} href={`/admin/requests/${r.id}`} className="row">
              <span>{parseServices(r.services).map(svcName).join("، ")}</span><span className="mute">{dt(r.createdAt)}</span><span>{money(r.quoteValue)}</span><Badge status={r.status} />
            </Link>))}
        </section>
        <form action={saveClient.bind(null, c.id)} className="card">
          <h2>بيانات العميل</h2>
          <label>الاسم<input name="name" defaultValue={c.name} required /></label>
          <label>البريد<input name="email" type="email" dir="ltr" defaultValue={c.email || ""} /></label>
          <label>المدينة<select name="city" defaultValue={c.city || ""}><option value="">—</option>{content.ar.form.cities.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></label>
          <label>العنوان<input name="address" defaultValue={c.address || ""} /></label>
          <label>ملاحظات داخلية<textarea name="notes" rows={4} defaultValue={c.notes || ""} /></label>
          <button className="btn">حفظ</button>
        </form>
      </div>
    </>
  );
}

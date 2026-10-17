import { requireAdmin } from "@/lib/auth";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { STAGES, L, money, dt, svcName, parseServices } from "@/lib/crm";
import { Badge } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function Requests({ searchParams }) {
  await requireAdmin();
  const { q = "", status = "" } = await searchParams;
  const where = {
    ...(status ? { status } : {}),
    ...(q ? { OR: [
      { client: { name: { contains: q, mode: "insensitive" } } },
      { client: { phone: { contains: q.replace(/\s/g, "") } } },
      { notes: { contains: q, mode: "insensitive" } },
    ] } : {}),
  };
  const rows = await prisma.request.findMany({ where, include: { client: true }, orderBy: { createdAt: "desc" }, take: 150 });
  return (
    <>
      <div className="head"><h1>الطلبات</h1><Link className="btn" href="/admin/requests/new">+ طلب يدوي</Link></div>
      <form className="filters">
        <input name="q" defaultValue={q} placeholder="بحث بالاسم أو الجوال…" />
        <select name="status" defaultValue={status}>
          <option value="">كل المراحل</option>{STAGES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
        </select>
        <button className="btn">تصفية</button>
      </form>
      <div className="table"><table>
        <thead><tr><th>العميل</th><th>الخدمات</th><th>المدينة</th><th>المرحلة</th><th>القيمة</th><th>المتابعة</th><th>التاريخ</th></tr></thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td><Link href={`/admin/requests/${r.id}`}><b>{r.client.name}</b></Link><br /><small dir="ltr">{r.client.phone}</small></td>
              <td>{parseServices(r.services).map(svcName).join("، ")}</td>
              <td>{L.city[r.city] || r.city}</td><td><Badge status={r.status} /></td>
              <td>{money(r.quoteValue)}</td><td>{dt(r.followUpAt)}</td><td>{dt(r.createdAt)}</td>
            </tr>))}
          {rows.length === 0 && <tr><td colSpan="7" className="mute">لا نتائج.</td></tr>}
        </tbody>
      </table></div>
    </>
  );
}

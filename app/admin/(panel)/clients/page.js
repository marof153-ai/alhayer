import { requireAdmin } from "@/lib/auth";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { L, money, dt } from "@/lib/crm";

export const dynamic = "force-dynamic";

export default async function Clients({ searchParams }) {
  await requireAdmin();
  const { q = "" } = await searchParams;
  const rows = await prisma.client.findMany({
    where: q ? { OR: [{ name: { contains: q, mode: "insensitive" } }, { phone: { contains: q.replace(/\s/g, "") } }] } : {},
    include: { requests: { select: { status: true, quoteValue: true, createdAt: true } } }, orderBy: { createdAt: "desc" }, take: 200,
  });
  return (
    <>
      <h1>العملاء</h1>
      <form className="filters"><input name="q" defaultValue={q} placeholder="بحث بالاسم أو الجوال…" /><button className="btn">بحث</button></form>
      <div className="table"><table>
        <thead><tr><th>العميل</th><th>المدينة</th><th>الطلبات</th><th>إجمالي التعاقدات</th><th>آخر طلب</th></tr></thead>
        <tbody>{rows.map((c) => {
          const won = c.requests.filter((r) => r.status === "won").reduce((a, r) => a + (r.quoteValue || 0), 0);
          const last = c.requests.map((r) => r.createdAt).sort((a, b) => b - a)[0];
          return (<tr key={c.id}>
            <td><Link href={`/admin/clients/${c.id}`}><b>{c.name}</b></Link><br /><small dir="ltr">{c.phone}</small></td>
            <td>{L.city[c.city] || c.city || "—"}</td><td>{c.requests.length}</td><td>{money(won)}</td><td>{dt(last)}</td></tr>);
        })}{rows.length === 0 && <tr><td colSpan="5" className="mute">لا عملاء بعد.</td></tr>}</tbody>
      </table></div>
    </>
  );
}

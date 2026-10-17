import { requireAdmin } from "@/lib/auth";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { OPEN, money, dt, svcName, parseServices, endOfToday } from "@/lib/crm";
import { Badge, Kpi } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  await requireAdmin();
  const monthStart = new Date(); monthStart.setUTCDate(1); monthStart.setUTCHours(0, 0, 0, 0);
  const [groups, wonMonth, due, recent, svcRows] = await Promise.all([
    prisma.request.groupBy({ by: ["status"], _count: { _all: true }, _sum: { quoteValue: true } }),
    prisma.request.aggregate({ where: { status: "won", closedAt: { gte: monthStart } }, _count: { _all: true }, _sum: { quoteValue: true } }),
    prisma.request.findMany({ where: { status: { in: OPEN }, followUpAt: { lte: endOfToday() } }, include: { client: true }, orderBy: { followUpAt: "asc" }, take: 8 }),
    prisma.request.findMany({ include: { client: true }, orderBy: { createdAt: "desc" }, take: 8 }),
    prisma.request.findMany({ select: { services: true }, orderBy: { createdAt: "desc" }, take: 300 }),
  ]);
  const g = Object.fromEntries(groups.map((x) => [x.status, x]));
  const cnt = (s) => g[s]?._count._all ?? 0;
  const open = OPEN.reduce((a, s) => a + cnt(s), 0);
  const pipe = ["quoted", "negotiation"].reduce((a, s) => a + (g[s]?._sum.quoteValue || 0), 0);
  const won = cnt("won"), lost = cnt("lost");
  const rate = won + lost ? Math.round((won / (won + lost)) * 100) + "%" : "—";
  const svc = {};
  for (const r of svcRows) for (const s of parseServices(r.services)) svc[s] = (svc[s] || 0) + 1;
  const top = Object.entries(svc).sort((a, b) => b[1] - a[1]);
  const max = top[0]?.[1] || 1;

  return (
    <>
      <h1>لوحة التحكم</h1>
      <div className="kpis">
        <Kpi label="طلبات جديدة" value={cnt("new")} tone="hot" />
        <Kpi label="قيد المتابعة" value={open} />
        <Kpi label="قيمة العروض المفتوحة" value={money(pipe)} />
        <Kpi label="تعاقدات هذا الشهر" value={wonMonth._count._all} sub={money(wonMonth._sum.quoteValue || 0)} />
        <Kpi label="نسبة التحويل" value={rate} sub={`${won} فوز / ${lost} خسارة`} />
      </div>
      <div className="two">
        <section className="card">
          <h2>متابعات مستحقة</h2>
          {due.length === 0 && <p className="mute">لا توجد متابعات متأخرة. 👌</p>}
          {due.map((r) => (
            <Link key={r.id} href={`/admin/requests/${r.id}`} className="row">
              <b>{r.client.name}</b><span className="mute">{dt(r.followUpAt)}</span><Badge status={r.status} />
            </Link>))}
        </section>
        <section className="card">
          <h2>الخدمات الأكثر طلباً</h2>
          {top.length === 0 && <p className="mute">لا بيانات بعد.</p>}
          {top.map(([id, n]) => (
            <div key={id} className="bar"><span>{svcName(id)}</span><i style={{ width: `${(n / max) * 100}%` }} /><b>{n}</b></div>))}
        </section>
      </div>
      <section className="card">
        <h2>أحدث الطلبات</h2>
        {recent.map((r) => (
          <Link key={r.id} href={`/admin/requests/${r.id}`} className="row">
            <b>{r.client.name}</b><span className="mute">{parseServices(r.services).map(svcName).join("، ")}</span><span className="mute">{dt(r.createdAt)}</span><Badge status={r.status} />
          </Link>))}
      </section>
    </>
  );
}

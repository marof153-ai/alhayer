import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { STAGES, L, svcName, parseServices } from "@/lib/crm";
import Kanban from "@/components/admin/Kanban";

export const dynamic = "force-dynamic";

export default async function Pipeline() {
  await requireAdmin();
  const rows = await prisma.request.findMany({ include: { client: true }, orderBy: { updatedAt: "desc" }, take: 400 });
  const items = rows.map((r) => ({
    id: r.id, status: r.status, name: r.client.name, city: L.city[r.city] || r.city, area: r.area,
    services: parseServices(r.services).map(svcName).join("، "), quoteValue: r.quoteValue, followUpAt: r.followUpAt?.toISOString() || null,
  }));
  return (<><h1>مسار المبيعات</h1><p className="mute">اسحب البطاقة إلى مرحلة أخرى، أو استخدم القائمة داخل البطاقة على الجوال.</p><Kanban stages={STAGES} items={items} /></>);
}

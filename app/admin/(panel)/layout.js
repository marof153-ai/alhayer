import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { logoutAction } from "@/lib/actions";
import Nav from "@/components/admin/Nav";

export default async function Panel({ children }) {
  await requireAdmin();
  const newCount = await prisma.request.count({ where: { status: "new" } });
  return (
    <div className="shell">
      <aside>
        <div className="brand">🌿 الواحة الخضراء</div>
        <Nav newCount={newCount} />
        <form action={logoutAction}><button className="out">تسجيل الخروج</button></form>
      </aside>
      <main>{children}</main>
    </div>
  );
}

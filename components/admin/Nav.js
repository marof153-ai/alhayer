"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [["/admin", "لوحة التحكم"], ["/admin/pipeline", "مسار المبيعات"], ["/admin/requests", "الطلبات"], ["/admin/clients", "العملاء"]];
export default function Nav({ newCount }) {
  const p = usePathname();
  return (
    <nav>
      {ITEMS.map(([href, label]) => {
        const on = href === "/admin" ? p === href : p.startsWith(href);
        return <Link key={href} href={href} className={on ? "on" : ""}>{label}{href === "/admin/requests" && newCount > 0 && <i>{newCount}</i>}</Link>;
      })}
    </nav>
  );
}

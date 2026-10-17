import "@fontsource/reem-kufi/arabic-500.css";
import "@fontsource/almarai/arabic-400.css";
import "@fontsource/almarai/arabic-700.css";
import "./admin.css";

export const metadata = { title: "نظام إدارة الطلبات", robots: { index: false, follow: false } };
export default function AdminRoot({ children }) {
  return <html lang="ar" dir="rtl"><body>{children}</body></html>;
}

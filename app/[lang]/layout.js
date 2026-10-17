import { notFound } from "next/navigation";
import "@fontsource/reem-kufi/arabic-500.css";
import "@fontsource/reem-kufi/arabic-700.css";
import "@fontsource/almarai/arabic-400.css";
import "@fontsource/almarai/arabic-700.css";
import "@fontsource/fraunces/latin-600.css";
import "@fontsource/fraunces/latin-700.css";
import "@fontsource/manrope/latin-400.css";
import "@fontsource/manrope/latin-700.css";
import "../globals.css";
import { content, LANGS } from "@/lib/content";

export const generateStaticParams = () => LANGS.map((lang) => ({ lang }));

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = content[lang];
  return t ? { title: t.meta.title, description: t.meta.desc, alternates: { languages: { ar: "/ar", en: "/en" } } } : {};
}

export default async function RootLayout({ children, params }) {
  const { lang } = await params;
  const t = content[lang];
  if (!t) notFound();
  return (
    <html lang={lang} dir={t.dir}>
      <body>{children}</body>
    </html>
  );
}

import { notFound } from "next/navigation";
import { Tajawal, Inter } from "next/font/google";
import "../globals.css";
import { content, LANGS } from "@/lib/content";

// الخط العربي الرسمي
const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-ar",
  display: "swap",
});

// الخط الإنجليزي الرسمي
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-en",
  display: "swap",
});

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
    <html lang={lang} dir={t.dir} className={`${tajawal.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
import { notFound } from "next/navigation";
import { Reem_Kufi, Almarai, Fraunces, Manrope } from "next/font/google";
import "../globals.css";
import { content, LANGS } from "@/lib/content";

// إعداد الخطوط وتحسين تحميلها
const reemKufi = Reem_Kufi({
  subsets: ["arabic"],
  weight: ["500", "700"],
  variable: "--font-reem-kufi",
  display: "swap",
});

const almarai = Almarai({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-almarai",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-fraunces",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const generateStaticParams = () => LANGS.map((lang) => ({ lang }));

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = content[lang];
  if (!t) return {};

  return {
    title: {
      default: t.meta.title,
      template: `%s | ${t.meta.title}`,
    },
    description: t.meta.desc,
    alternates: {
      languages: {
        ar: "/ar",
        en: "/en",
      },
    },
  };
}

export default async function RootLayout({ children, params }) {
  const { lang } = await params;
  const t = content[lang];

  if (!t) notFound();

  // تجميع متغيّرات الخطوط لتطبيقها على الـ body
  const fontVariables = `${reemKufi.variable} ${almarai.variable} ${fraunces.variable} ${manrope.variable}`;

  return (
    <html lang={lang} dir={t.dir} className={fontVariables}>
      <body className="antialiased selection:bg-primary selection:text-white">
        {children}
      </body>
    </html>
  );
}
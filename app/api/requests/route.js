import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { SERVICES } from "@/lib/site";
import { normalizePhone } from "@/lib/phone";
import { notifyTelegram } from "@/lib/telegram";

const ids = SERVICES.map((s) => s.id);

export async function POST(req) {
  let b;
  try { b = await req.json(); } catch { return NextResponse.json({ error: "invalid" }, { status: 400 }); }
  if (b.website) return NextResponse.json({ ok: true }); // honeypot

  const name = String(b.name || "").trim();
  const phone = normalizePhone(b.phone);
  const services = (Array.isArray(b.services) ? b.services : []).filter((s) => ids.includes(s));
  if (name.length < 2 || phone.replace(/\D/g, "").length < 8 || !b.city || !b.spaceType || !services.length)
    return NextResponse.json({ error: "missing" }, { status: 422 });

  const email = b.email ? String(b.email).slice(0, 120) : null;
  const area = Number(b.area);
  const lang = b.lang === "en" ? "en" : "ar";

  const client = await prisma.client.upsert({
    where: { phone }, update: {}, create: { name, phone, email, city: String(b.city) },
  });
  const request = await prisma.request.create({
    data: {
      clientId: client.id, city: String(b.city),
      address: b.address ? String(b.address).slice(0, 200) : null,
      spaceType: String(b.spaceType),
      area: Number.isFinite(area) && area > 0 ? area : null,
      services: JSON.stringify(services),
      budget: b.budget || null, timeline: b.timeline || null, hasPlans: !!b.hasPlans,
      extra: JSON.stringify({ lang }),
      notes: b.notes ? String(b.notes).slice(0, 1500) : null,
      activities: { create: { type: "system", text: `وصل الطلب من الموقع (${lang === "en" ? "النسخة الإنجليزية" : "النسخة العربية"})` } },
    },
  });
  try { await notifyTelegram({ client, request, lang }); } catch (e) { console.error("Telegram failed", e); }
  return NextResponse.json({ ok: true, id: request.id });
}

"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "./prisma";
import { requireAdmin, checkPassword, createSession, clearSession } from "./auth";
import { STAGES, stage, fromInput, svcName, money } from "./crm";
import { normalizePhone } from "./phone";
import { SERVICES } from "./site";

const refresh = () => revalidatePath("/admin", "layout");
const str = (v) => { const s = String(v ?? "").trim(); return s || null; };

export async function loginAction(_, fd) {
  if (!checkPassword(String(fd.get("password") || ""))) return { error: "كلمة المرور غير صحيحة أو لم تُضبط متغيرات البيئة." };
  await createSession();
  redirect("/admin");
}
export async function logoutAction() { await clearSession(); redirect("/admin/login"); }

export async function moveRequest(id, status) {
  await requireAdmin();
  if (!STAGES.some((s) => s.id === status)) return;
  const r = await prisma.request.findUnique({ where: { id } });
  if (!r || r.status === status) return;
  await prisma.$transaction([
    prisma.request.update({ where: { id }, data: { status, closedAt: status === "won" || status === "lost" ? new Date() : null } }),
    prisma.activity.create({ data: { requestId: id, type: "status", text: `نُقل من «${stage(r.status).label}» إلى «${stage(status).label}»` } }),
  ]);
  refresh();
}

export async function saveDeal(id, fd) {
  await requireAdmin();
  const old = await prisma.request.findUnique({ where: { id } });
  if (!old) return;
  const q = Number(fd.get("quoteValue"));
  const quoteValue = fd.get("quoteValue") && Number.isFinite(q) && q >= 0 ? q : null;
  await prisma.request.update({ where: { id }, data: {
    quoteValue, visitAt: fromInput(fd.get("visitAt"), true), followUpAt: fromInput(fd.get("followUpAt")), lostReason: str(fd.get("lostReason")),
  } });
  if (quoteValue !== old.quoteValue)
    await prisma.activity.create({ data: { requestId: id, type: "quote", text: `قيمة العرض: ${money(quoteValue)}` } });
  refresh();
}

export async function addNote(id, fd) {
  await requireAdmin();
  const text = str(fd.get("text"));
  if (!text) return;
  const type = ["note", "call", "visit"].includes(fd.get("type")) ? fd.get("type") : "note";
  const followUp = fromInput(fd.get("followUpAt"));
  await prisma.activity.create({ data: { requestId: id, type, text: text.slice(0, 2000) } });
  if (followUp) await prisma.request.update({ where: { id }, data: { followUpAt: followUp } });
  refresh();
}

export async function saveClient(id, fd) {
  await requireAdmin();
  const name = str(fd.get("name"));
  if (!name) return;
  await prisma.client.update({ where: { id }, data: { name, email: str(fd.get("email")), city: str(fd.get("city")), address: str(fd.get("address")), notes: str(fd.get("notes")) } });
  refresh();
}

export async function createManual(fd) {
  await requireAdmin();
  const name = str(fd.get("name")), phone = normalizePhone(fd.get("phone"));
  const services = SERVICES.map((s) => s.id).filter((s) => fd.getAll("services").includes(s));
  if (!name || phone.replace(/\D/g, "").length < 8 || !services.length) return;
  const city = str(fd.get("city")) || "other";
  const client = await prisma.client.upsert({ where: { phone }, update: {}, create: { name, phone, city } });
  const area = Number(fd.get("area"));
  const source = ["phone", "whatsapp", "referral", "other"].includes(fd.get("source")) ? fd.get("source") : "phone";
  const r = await prisma.request.create({ data: {
    clientId: client.id, city, source, spaceType: str(fd.get("spaceType")) || "other", area: area > 0 ? area : null,
    services: JSON.stringify(services), notes: str(fd.get("notes")),
    activities: { create: { type: "system", text: "أُضيف الطلب يدوياً" } },
  } });
  refresh();
  redirect(`/admin/requests/${r.id}`);
}

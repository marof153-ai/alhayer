import crypto from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const NAME = "crm_session";
const sig = (v) => crypto.createHmac("sha256", process.env.SESSION_SECRET || "").update(v).digest("hex");
const eq = (a, b) => { const x = Buffer.from(String(a)), y = Buffer.from(String(b)); return x.length === y.length && crypto.timingSafeEqual(x, y); };

export const checkPassword = (pw) => !!process.env.ADMIN_PASSWORD && !!process.env.SESSION_SECRET && eq(pw ?? "", process.env.ADMIN_PASSWORD);

export async function createSession() {
  const exp = String(Date.now() + 7 * 864e5);
  (await cookies()).set(NAME, `${exp}.${sig(exp)}`, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 7 * 86400 });
}
export async function clearSession() { (await cookies()).delete(NAME); }
export async function isAdmin() {
  if (!process.env.SESSION_SECRET) return false;
  const v = (await cookies()).get(NAME)?.value;
  if (!v) return false;
  const [exp, s] = v.split(".");
  return !!s && Number(exp) > Date.now() && eq(s, sig(exp));
}
export async function requireAdmin() { if (!(await isAdmin())) redirect("/admin/login"); }

export function normalizePhone(raw) {
  let p = String(raw || "").replace(/[^\d+]/g, "");
  if (p.startsWith("00")) p = "+" + p.slice(2);
  if (p.startsWith("+")) return p;
  if (p.startsWith("971")) return "+" + p;
  if (/^0\d{9}$/.test(p)) return "+971" + p.slice(1);
  if (/^5\d{8}$/.test(p)) return "+971" + p;
  return "+" + p;
}
export const waLink = (p) => `https://wa.me/${String(p).replace(/\D/g, "")}`;

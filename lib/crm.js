import { content } from "./content";

const F = content.ar.form;
export const STAGES = [
  { id: "new", label: "جديد", c: "#2F7D2B" }, { id: "contacted", label: "تم التواصل", c: "#2F86A6" },
  { id: "visit", label: "معاينة", c: "#7C5CD1" }, { id: "quoted", label: "عرض سعر", c: "#C48A12" },
  { id: "negotiation", label: "تفاوض", c: "#D1641F" }, { id: "won", label: "تم التعاقد", c: "#1E5524" },
  { id: "lost", label: "خسارة", c: "#8A8F8A" },
];
export const OPEN = ["new", "contacted", "visit", "quoted", "negotiation"];
export const stage = (id) => STAGES.find((s) => s.id === id) || STAGES[0];
export const SOURCES = { website: "الموقع", phone: "اتصال هاتفي", whatsapp: "واتساب", referral: "توصية", other: "أخرى" };

const map = (a) => Object.fromEntries(a);
export const L = { space: map(F.spaces), budget: map(F.budgets), timeline: map(F.timelines), city: map(F.cities) };
export const svcName = (id) => content.ar.services.items[id]?.[0] || id;
export const parseServices = (s) => { try { return JSON.parse(s) || []; } catch { return []; } };

export const money = (n) => (n == null ? "—" : new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n) + " د.إ");
export const dt = (d, time = false) => d ? new Intl.DateTimeFormat("ar-AE-u-nu-latn", { timeZone: "Asia/Dubai", dateStyle: "medium", ...(time ? { timeStyle: "short" } : {}) }).format(d) : "—";
export const toInput = (d, time = false) => d ? d.toLocaleString("sv-SE", { timeZone: "Asia/Dubai" }).slice(0, time ? 16 : 10).replace(" ", "T") : "";
export const fromInput = (v, time = false) => (v ? new Date(time ? `${v}:00+04:00` : `${v}T09:00:00+04:00`) : null);
export const endOfToday = () => fromInput(`${toInput(new Date())}T23:59`, true);

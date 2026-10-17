import { L, svcName, parseServices } from "./crm";
import { waLink } from "./phone";

const esc = (s) => String(s ?? "").replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));

export async function notifyTelegram({ client, request, lang }) {
  const token = process.env.TELEGRAM_BOT_TOKEN, chat = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) return;
  const base = (process.env.APP_URL || "").replace(/\/$/, "");
  const lines = [
    "🌿 <b>طلب جديد</b>", "",
    `👤 <b>${esc(client.name)}</b>`,
    `📞 <code>${esc(client.phone)}</code>`,
    client.email && `✉️ ${esc(client.email)}`,
    `📍 ${esc(L.city[request.city] || request.city)}${request.address ? " — " + esc(request.address) : ""}`, "",
    `🏡 ${esc(L.space[request.spaceType] || request.spaceType)}${request.area ? ` · ${request.area} م²` : ""}`,
    `🛠 ${parseServices(request.services).map((s) => esc(svcName(s))).join("، ")}`,
    request.budget && `💰 ${esc(L.budget[request.budget] || request.budget)}`,
    request.timeline && `⏱ ${esc(L.timeline[request.timeline] || request.timeline)}`,
    request.hasPlans && "📎 لديه مخططات أو صور للموقع",
    request.notes && `\n📝 ${esc(request.notes)}`,
    `\n🌐 ${lang === "en" ? "English" : "العربية"}`,
  ].filter((l) => typeof l === "string");
  const kb = [[{ text: "💬 واتساب", url: waLink(client.phone) }]];
  if (base.startsWith("https://")) kb.push([{ text: "📂 فتح في النظام", url: `${base}/admin/requests/${request.id}` }]);
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chat, text: lines.join("\n"), parse_mode: "HTML", disable_web_page_preview: true, reply_markup: { inline_keyboard: kb } }),
  });
  if (!res.ok) console.error("Telegram error", res.status, await res.text());
}

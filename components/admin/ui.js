import { stage } from "@/lib/crm";

export const Badge = ({ status }) => { const s = stage(status); return <span className="badge" style={{ background: s.c + "22", color: s.c }}>{s.label}</span>; };
export const Kpi = ({ label, value, sub, tone }) => (
  <div className={"kpi " + (tone || "")}><span>{label}</span><b>{value}</b>{sub && <small>{sub}</small>}</div>
);

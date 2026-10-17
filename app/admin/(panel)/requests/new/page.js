import { requireAdmin } from "@/lib/auth";
import { createManual } from "@/lib/actions";
import { SERVICES } from "@/lib/site";
import { svcName, L, SOURCES } from "@/lib/crm";
import { content } from "@/lib/content";

export default async function NewRequest() {
  await requireAdmin();
  const F = content.ar.form;
  return (
    <>
      <h1>طلب يدوي</h1>
      <p className="mute">لتسجيل عميل جاء عبر الهاتف أو واتساب أو توصية.</p>
      <form action={createManual} className="card form2">
        <label>الاسم *<input name="name" required /></label>
        <label>الجوال *<input name="phone" dir="ltr" required placeholder="05X XXX XXXX" /></label>
        <label>المدينة<select name="city">{F.cities.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></label>
        <label>المصدر<select name="source">{Object.entries(SOURCES).filter(([k]) => k !== "website").map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></label>
        <label>نوع المساحة<select name="spaceType">{F.spaces.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></label>
        <label>المساحة (م²)<input name="area" dir="ltr" inputMode="numeric" /></label>
        <fieldset className="full"><legend>الخدمات *</legend>
          {SERVICES.map((s) => <label key={s.id} className="inl"><input type="checkbox" name="services" value={s.id} />{svcName(s.id)}</label>)}
        </fieldset>
        <label className="full">ملاحظات<textarea name="notes" rows={3} /></label>
        <button className="btn">حفظ</button>
      </form>
    </>
  );
}

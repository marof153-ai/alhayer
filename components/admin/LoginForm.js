"use client";
import { useActionState } from "react";
import { loginAction } from "@/lib/actions";

export default function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, null);
  return (
    <form action={action} className="login">
      <h1>نظام إدارة الطلبات</h1>
      <p>سجّل الدخول للمتابعة</p>
      <input type="password" name="password" placeholder="كلمة المرور" autoFocus required />
      {state?.error && <em role="alert">{state.error}</em>}
      <button className="btn" disabled={pending}>{pending ? "…" : "دخول"}</button>
    </form>
  );
}

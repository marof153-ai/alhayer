import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import LoginForm from "@/components/admin/LoginForm";

export default async function Login() {
  if (await isAdmin()) redirect("/admin");
  return <div className="center"><LoginForm /></div>;
}

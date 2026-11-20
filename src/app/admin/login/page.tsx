import { redirect } from "next/navigation";
import { LoginForm } from "@/app/admin/login/login-form";
import { getAdminSession } from "@/server/auth/authorization";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await getAdminSession()) redirect("/admin");
  return <LoginForm />;
}

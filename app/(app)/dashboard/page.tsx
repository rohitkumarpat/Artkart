"use server";

import { redirect } from "next/navigation";
import { saveuser } from "@/lib/save-user";

export default async function DashboardRedirectPage() {
  
  const dbUser = await saveuser();

  if (!dbUser) redirect("/sign-in");

  if (!dbUser.role) redirect("/select-role");

  if (dbUser.role === "customer") redirect("/dashboard/c_dashboard");
  if (dbUser.role === "seller") redirect("/dashboard/s_dashboard");
  if (dbUser.role === "admin") redirect("/dashboard/a_dashboard");

  return (
    <div>Loading...</div>
  );
}
  
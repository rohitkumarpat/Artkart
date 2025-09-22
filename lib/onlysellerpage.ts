import { auth } from "@clerk/nextjs/server";
import { prismaclient } from "@/lib/db";
import { redirect } from "next/navigation";

export async function onlySeller() {
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");

  const user = await prismaclient.user.findUnique({
    where: { clerkId: userId },
  });

  if (user?.role !== "seller") {
    redirect("/not-authorized");
  }

  return user; 
}

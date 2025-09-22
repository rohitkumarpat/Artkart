import { currentUser } from "@clerk/nextjs/server";
import { prismaclient } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { role } = await req.json();
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

    try{
  await prismaclient.user.update({
    where: { clerkId: user.id },
    data: { role },
  });

  return NextResponse.json({ success: true });

}catch (err: any) {
    console.error("❌ Error in set-role API:", err);
    return NextResponse.json(
      { error: "Internal server error", detail: err.message },
      { status: 500 }
    );
}
}

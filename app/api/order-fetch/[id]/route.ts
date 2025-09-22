import { prismaclient } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request ) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ msg: "Not signed in" }, { status: 401 });
  }

  const dbUser = await prismaclient.user.findUnique({
    where: { clerkId: user.id },
  });

  if (!dbUser) {
    return NextResponse.json({ msg: "User not found" }, { status: 404 });
  }

  const order = await prismaclient.order.findMany({
    where: { userId: dbUser.id },
    include: {
      product: true,
      user: true,
    },
  });

  if (!order) {
    return NextResponse.json({ msg: "Order not found" }, { status: 404 });
  }


  return NextResponse.json(order);
}

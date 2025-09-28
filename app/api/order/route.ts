import { prismaclient } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const user = await currentUser();
  if (!user) return NextResponse.json({ msg: "Not signed in" }, { status: 401 });

  const dbUser = await prismaclient.user.findUnique({ where: { clerkId: user.id } });
  if (!dbUser || dbUser.role !== "customer") {
    return NextResponse.json({ msg: "Only customers can create orders" }, { status: 403 });
  }

  const { city, state, pincode, productId, quantity,name,phonenumber } = await req.json();

  
  const product = await prismaclient.product.findUnique({ where: { id: productId } });
  if (!product) return NextResponse.json({ msg: "Product not found" }, { status: 404 });

  const lastOrder = await prismaclient.order.findFirst({
    where: { userId: dbUser.id },
    orderBy: { createdAt: "desc" },
  });
  if (lastOrder && (Date.now() - lastOrder.createdAt.getTime()) < 60 * 1000) {
    return NextResponse.json(
      { msg: "You already placed an order. Please wait before placing another." },
      { status: 400 }
    );
  }

  
  const totalPrice = product.price * quantity;

  const order = await prismaclient.order.create({
    data: {
      userId: dbUser.id,
       name,
      phonenumber,
      productId,
      quantity,
      price: totalPrice,
      city,
      state,
      pincode,
    },
    include: { product: true, user: true },
  });

  return NextResponse.json(order);
}

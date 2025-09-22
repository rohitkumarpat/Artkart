import { prismaclient } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const allProducts = await prismaclient.product.findMany({
      where: {
        user: {
          role: "seller",
        },
      },
      select: {
        id: true,
        title: true,
        imageUrl: true,
        price: true,
        discount: true,
      },
    });

    return NextResponse.json(allProducts);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ msg: "Something went wrong" }, { status: 500 });
  }
}

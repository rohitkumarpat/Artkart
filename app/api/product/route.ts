import { prismaclient } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { User } from "lucide-react";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ msg: "Not signed in" }, { status: 401 });
  }


  const dbUser = await prismaclient.user.findUnique({
    where: { clerkId: user.id },
  });

  if (!dbUser || dbUser.role !== "seller") {
    return NextResponse.json(
      { msg: "Only sellers can create products" },
      { status: 403 }
    );
  }

  const { title, description, imageUrl, price, discount } = await req.json();

  const product = await prismaclient.product.create({
    data: {
      title,
      description,
      imageUrl,
      price,
      discount,
      userId: dbUser.id, 
    },
  });

  return NextResponse.json(product);
}

export async function GET(req:Request) {
   const user=await currentUser();
   if(!user) {
    return NextResponse.json({msg:"Not Signed In"},{status:411});
   }

  const products = await prismaclient.product.findMany({
    where: {
       user: {
        clerkId: user.id
      },
    },
    include: {
      user: true, 
    },
  });

  return NextResponse.json(products);
}

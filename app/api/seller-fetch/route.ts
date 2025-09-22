import { prismaclient } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const user=await currentUser();
  if(!user) {
    return NextResponse.json({msg:"not signin"},{status:411});
  }
   
  const dbUser=await prismaclient.user.findUnique({
    where:{
        clerkId:user.id
    }
  })

  if(!dbUser) {
    return NextResponse.json({msg:"invalid user"},{status:411});
  }

  const products = await prismaclient.product.findMany({
      where :{
         userId:dbUser.id
      }
  });

  return NextResponse.json(products);
}

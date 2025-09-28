import { prismaclient } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req:Request) {

    try {
    const {productid,flag}=await req.json(); 
     const product = await prismaclient.product.update({
      where: { id: productid },
      data: { addtocart: flag },
    });

    return NextResponse.json({ success: true, product });
    } 
    catch (error) {
    return NextResponse.json({ success: false, error });
  }

}

export async function GET() {

    try {
        const product=await prismaclient.product.findMany ({
            where:{
                addtocart:true
            }
        })
       return NextResponse.json(product);
    }catch(error) {
         return NextResponse.json({ success: false, error });
    } 
}
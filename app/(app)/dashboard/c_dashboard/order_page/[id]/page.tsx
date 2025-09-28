"use client"


import OrderForm from "@/components/order-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

export default function OrderPage() {
  const params = useParams();
  const [productPrice, setProductPrice] = useState<number>(0);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await axios.get(`/api/singleproduct/${params.id}`);
        setProductPrice(res.data.price);
      } catch (err) {
        console.error(err);
      }
    }
    fetchProduct();
  }, [params.id]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-background text-foreground">
     
      <div className="z-10 w-full flex justify-center font-mono text-sm mb-8">
        <h1 className="text-4xl font-bold text-balance text-center">
          Place Your Order
        </h1>
      </div>

   
      <div className="relative flex place-items-center 
        before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] before:pointer-events-none
        after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] after:pointer-events-none
        before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10
        after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40
        lg:static lg:size-auto lg:bg-none"
      >
        <OrderForm price={productPrice} />
      </div>
    </main>
  );
}

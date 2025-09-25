"use client";

import { useEffect, useState } from "react";
import { CldImage } from "next-cloudinary";
import { useParams } from "next/navigation";
import axios from "axios";

interface Product {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  discount: string;
  createdAt: string;
  user: { username: string; email: string };
}



export default function Singleproduct () {
     const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
   const params=useParams();

   useEffect(()=>{

     async function fetchProduct() {
      try {
        const res = await axios.get(`/api/singleproduct/${params.id}`);
        setProduct(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    }
    fetchProduct();

   },[params.id])


 
     if (loading) return <p className="text-white">Loading product...</p>;  
       if (!product) return <p className="text-white">Product not found</p>;
   
    return (
       <div className="max-w-3xl mx-auto mt-10 p-6 bg-background rounded-lg border border-border text-white">
      <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
      {product.imageUrl && (
        <CldImage
          src={product.imageUrl}
          alt={product.title}
          width={600}
          height={800}
          className="rounded mb-4"
        />
      )}
      <p className="mb-2">{product.description}</p>
      <p className="font-semibold text-primary">
        Price: ₹{product.price} {product.discount && `(Discount: ${product.discount}%)`}
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        Seller: {product.user.username} ({product.user.email})
      </p>
    </div>
    )
}
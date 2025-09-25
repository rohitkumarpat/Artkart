"use client";

import { useEffect, useState } from "react";
import { CldImage } from "next-cloudinary"; 
import axios from "axios";
import { useRouter } from "next/navigation";

interface Product {
   id?:string,
  title: string;
  price: number;
  discount: string;
  imageUrl: string;
  username: string;

}

export default function Customer() {
    const router=useRouter();
  const [products, setProducts] = useState<Product[]>([]);
   const [loading, setLoading] = useState<boolean>(true); 

  async function fetchProducts() {
    try {
      const response = await axios.get("/api/allproduct");
      setProducts(response.data);
        setLoading(false);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    fetchProducts();
  
    const interval = setInterval(fetchProducts, 5000);
    return () => clearInterval(interval);
  }, []);

   if (loading) {
    return (
      <div className="flex justify-center items-center mt-20 text-white text-lg font-semibold">
        Loading products...
      </div>
    );
  }
    const view=(id:string)=>{
    router.push(`/dashboard/c_dashboard/singleproduct/${id}`);
    console.log(id);
    }


  return (
    <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {products.map((product, index) => (
        <div
          key={index}
          className="p-4 bg-background rounded-lg border border-border shadow hover:shadow-lg transition-shadow duration-300"
        >
          <h4 className="text-sm font-medium text-muted-foreground mb-3">
            Preview:
          </h4>
          <div className="flex flex-col items-center">
            <h5 className="font-semibold text-card-foreground">
              {product.title || "Your Artwork Title"}
            </h5>
            {product.imageUrl && (
              <CldImage
                src={product.imageUrl}
                alt="Preview"
                className="mt-4 max-h-48 rounded"
                width={400}
                height={800}
               onClick={() => view(product.id as string)}
              />
            )}
            <p className="text-sm text-primary font-semibold mt-1">
             Original-Price: ₹{product.price} {product.discount && `(Discount: ${product.discount}%)`}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

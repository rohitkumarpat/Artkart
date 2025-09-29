"use client"

import axios from "axios";
import { CldImage } from "next-cloudinary";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react"; 

interface Product {
  id?: string;
  title: string;
  price: number;
  discount: string;
  imageUrl: string;
  username: string;
  addtocart: boolean;
}

export default function Mycart() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchProducts() {
    try {
      const response = await axios.get("/api/my-cart");
      setProducts(response.data);
      setLoading(false);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const view = (id: string) => {
    router.push(`/dashboard/c_dashboard/singleproduct/${id}`);
  }

  const deleteProduct = async (id?: string) => {
    if (!id) return;
   try {
      await axios.post("/api/my-cart", { productid:id,flag:false });
      setProducts(products.filter((product) => product.id !== id));
    } catch (err) {
      console.error(err);
    } 
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-20 text-white text-lg font-semibold">
        Loading products...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {products.map((product, index) => (
        <div
          key={index}
          className="p-4  bg-gradient-to-b from-gray-900 to-black rounded-lg border border-border shadow hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex flex-col items-center">
            {/* Title and Delete icon on same line */}
            <div className="w-full flex justify-between items-center">
              <h5 className="font-semibold text-card-foreground truncate">
                {product.title || "Your Artwork Title"}
              </h5>
              <Trash2
                className="text-white-500 cursor-pointer hover:text-red-600"
                size={20}
                onClick={() => deleteProduct(product.id)}
              />
            </div>

            {/* Product Image */}
            {product.imageUrl && (
              <CldImage
                src={product.imageUrl}
                alt="Preview"
                className="mt-4 max-h-48 rounded cursor-pointer"
                width={400}
                height={800}
                onClick={() => view(product.id as string)}
              />
            )}

            {/* Price */}
            <p className="text-sm text-primary font-semibold mt-1">
              Original-Price: ₹{product.price} {product.discount && `(Discount: ${product.discount}%)`}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

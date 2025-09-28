"use client";

import { useEffect, useState } from "react";
import { CldImage } from "next-cloudinary";
import { useParams } from "next/navigation";
import axios from "axios";
import { useRouter } from "next/navigation";
import OrderPage from "../../order_page/[id]/page";

interface Product {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  discount: string;
  addtocart: boolean; 
  createdAt: string;
  user: { username: string; email: string };
}

export default function Singleproduct() {
   const router=useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const params = useParams();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await axios.get(`/api/singleproduct/${params.id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [params.id]);


  const handleCart = async () => {
    if (!product || product.addtocart) return;

    setAdding(true);
    try {
      await axios.post("/api/my-cart", { productid: product.id,flag:true });
      setProduct({ ...product, addtocart: true });
    } catch (err) {
      console.error(err);
    } finally {
      setAdding(false);
    }
  };

  const handleorder=()=>{
    router.push(`/dashboard/c_dashboard/order_page/${product?.id}`);
  }

  if (loading)
    return (
      <div className="flex justify-center items-center mt-20 text-white text-lg font-semibold">
        Loading product...
      </div>
    );

  if (!product)
    return <p className="text-white mt-20 text-center">Product not found</p>;

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

      <div className="mt-6 flex gap-4">
        <button
          onClick={handleCart}
          disabled={adding || product.addtocart}
          className={`px-5 py-2 rounded-xl font-semibold shadow-md transition ${
            product.addtocart
              ? "bg-green-600 text-white cursor-not-allowed"
              : "bg-yellow-500 text-black hover:bg-yellow-600"
          }`}
        >
          {adding ? "Adding..." : product.addtocart ? "Added to Cart ✅" : "🛒 Add to Cart"}
        </button>

        <button 
         onClick={handleorder}
        className="px-5 py-2 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold shadow-md transition">
          📦 Order Now
        </button>
      </div>
    </div>
  );
}

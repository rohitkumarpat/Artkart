"use client";

import { useEffect, useState } from "react";
import { CldImage } from "next-cloudinary"; 
import axios from "axios";

interface Product {
  title: string;
  description: string;
  price: number;
  discount: string;
  imageUrl: string;
  username: string;
 
}

export default function View() {
  const [products, setProducts] = useState<Product[]>([]);

  async function fetchProducts() {
    try {
      const response = await axios.get("/api/product");
      setProducts(response.data);
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
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
            {product.description && (
              <p className="text-sm text-muted-foreground mt-1 text-pretty">
                {product.description.slice(0, 100)}
                {product.description.length > 100 ? "..." : ""}
              </p>
            )}
            {product.imageUrl && (
              <CldImage
                src={product.imageUrl}
                alt="Preview"
                className="mt-4 max-h-48 rounded"
                width={400}
                height={800}
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

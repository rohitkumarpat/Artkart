"use client";

import { useEffect, useState } from "react";
import { CldImage } from "next-cloudinary"; 
import axios from "axios";

export default function View() {
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: 0,
    discount: "",
    imageUrl: "",
    username:"",
    createdat:"",
  });

  async function fetchingtheproduct() {
   const response= await axios.get('/api/product');
   setProductData(response.data);
    console.log(response);
  }

    
  useEffect(()=>{
    fetchingtheproduct();
  },[5000])

  return (
    <div>
      {(productData.title || productData.price > 0 || productData.imageUrl) && (
        <div className="mt-8 p-4 bg-background rounded-lg border border-border">
          <h4 className="text-sm font-medium text-muted-foreground mb-3">
            Preview:
          </h4>
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-semibold text-card-foreground">
                {productData.title || "Your Artwork Title"}
              </h5>
              {productData.description && (
                <p className="text-sm text-muted-foreground mt-1 text-pretty">
                  {productData.description.slice(0, 100)}
                  {productData.description.length > 100 ? "..." : ""}
                </p>
              )}
              {productData.imageUrl && (
                <CldImage
                  src={productData.imageUrl}
                  alt="Preview"
                  className="mt-4 max-h-48 rounded"
                  width={400}
                  height={800}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


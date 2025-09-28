"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ConfirmOrderPage() {
  const [status, setStatus] = useState<"loading" | "success">("loading");
  const router = useRouter();

  useEffect(() => {
    // Simulate loading and order confirmation
    const timer = setTimeout(() => {
      setStatus("success");
    }, 2000); // 2 seconds loading

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      {status === "loading" ? (
        <div className="flex flex-col items-center justify-center bg-green-500 text-white rounded-xl p-8 shadow-lg animate-pulse">
          <h2 className="text-3xl font-bold mb-2">Processing Your Order...</h2>
          <p className="text-lg">Please wait</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center bg-green-500 text-white rounded-xl p-8 shadow-lg">
          <div className="w-20 h-20 flex items-center justify-center bg-white rounded-full mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-2">Thank you for your order!</h2>
          <p className="text-lg text-center">
            Your order has been successfully placed with ArtKart.
             
          </p>
        </div>
      )}
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
}

interface Order {
  id: string;
  quantity: number;
  createdAt: string;
  status: string; // optional: for badges
  product: Product;
}

export default function Order() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("/api/order-fetch");    
        setOrders(res.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const view = (id: string) => {
    router.push(`/dashboard/c_dashboard/singleproduct/${id}`);
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-100">Your Orders</h1>

      {loading ? (
        <p className="text-center text-gray-400">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-400">No orders found.</p>
      ) : (
        <div className="grid gap-6 max-w-5xl mx-auto">
          {orders.map((order) => (
            <Card 
              key={order.id} 
              className="bg-gray-800 shadow-xl rounded-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex flex-col md:flex-row">
                {/* Product Image */}
                <div className="flex-shrink-0 w-40 md:w-48 h-48 md:h-48 bg-gray-700 flex items-center justify-center cursor-pointer"
                     onClick={() => view(order.product.id)}>
                  <CldImage
                    src={order.product.imageUrl}
                    alt={order.product.title}
                    width={180}
                    height={180}
                    className="object-contain rounded"
                  />
                </div>

                {/* Order Details */}
                <div className="flex-1 p-4 md:p-6 grid gap-2">
                  <CardTitle className="text-xl font-semibold text-gray-100">
                    {order.product.title}
                  </CardTitle>
                  <p className="text-gray-200">
                    <span className="font-medium">Quantity:</span> {order.quantity}
                  </p>
                  <p className="text-gray-200">
                    <span className="font-medium">Total Price:</span> ₹{order.product.price * order.quantity}
                  </p>
                  <p className="text-sm text-gray-400">
                    Ordered on: {new Date(order.createdAt).toLocaleString()}
                  </p>
                  {order.status && (
                    <span className={`inline-block mt-2 px-3 py-1 text-sm font-medium rounded ${
                      order.status === "Delivered" ? "bg-green-600 text-white" :
                      order.status === "Pending" ? "bg-yellow-500 text-white" :
                      "bg-red-600 text-white"
                    }`}>
                      {order.status}
                    </span>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

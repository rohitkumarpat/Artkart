"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

interface OrderFormProps {
  price: number;
}

export default function OrderForm({ price }: OrderFormProps) {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [quantity, setQuantity] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    setTotalPrice(quantity ? parseInt(quantity) * price : 0);
  }, [quantity, price]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("/api/order", {
        name,
        phoneNumber,
        quantity: parseInt(quantity),
        city,
        state,
        pincode : parseInt(pincode),
        productId: params.id,
      });

      router.push("/dashboard/c_dashboard/confirm_order");
    } catch (error) {
      console.error("Order failed:", error);
      alert("Failed to place order. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl p-10 bg-gray-900 text-gray-100 shadow-2xl rounded-3xl grid gap-8"
      >
        <h1 className="text-3xl font-bold text-center">Place Your Order</h1>

        {/* Customer Info */}
        <div className="grid gap-4">
          <h2 className="text-xl font-semibold">Customer Information</h2>

          <div className="grid gap-2">
            <Label htmlFor="name" className="text-gray-300">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-gray-800 text-gray-100 border-gray-700 placeholder-gray-500"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phoneNumber" className="text-gray-300">Phone Number</Label>
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="bg-gray-800 text-gray-100 border-gray-700 placeholder-gray-500"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="grid gap-4">
          <h2 className="text-xl font-semibold">Product Information</h2>

          <div className="grid gap-2">
            <Label htmlFor="quantity" className="text-gray-300">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              className="bg-gray-800 text-gray-100 border-gray-700 placeholder-gray-500"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="totalPrice" className="text-gray-300">Total Price</Label>
            <Input
              id="totalPrice"
              type="number"
              value={totalPrice}
              readOnly
              className="bg-gray-800 text-gray-100 border-gray-700 placeholder-gray-500"
            />
          </div>
        </div>

        {/* Shipping Info */}
        <div className="grid gap-4">
          <h2 className="text-xl font-semibold">Shipping Information</h2>

          <div className="grid gap-2">
            <Label htmlFor="city" className="text-gray-300">City</Label>
            <Input
              id="city"
              type="text"
              placeholder="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="bg-gray-800 text-gray-100 border-gray-700 placeholder-gray-500"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="state" className="text-gray-300">State</Label>
            <Input
              id="state"
              type="text"
              placeholder="Enter state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
              className="bg-gray-800 text-gray-100 border-gray-700 placeholder-gray-500"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="pincode" className="text-gray-300">Pincode</Label>
            <Input
              id="pincode"
              type="text"
              placeholder="Enter pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              required
              className="bg-gray-800 text-gray-100 border-gray-700 placeholder-gray-500"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium py-3 rounded-xl"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </Button>
      </form>
    </div>
  );
}

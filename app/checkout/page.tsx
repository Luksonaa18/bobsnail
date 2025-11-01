"use client";

import Image from "next/image";
import { useCartStore, useAuthStore } from "@/zustand";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CheckoutPage = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (!user) {
      alert("You must be logged in!");
      return;
    }

    if (!cartItems.length) {
      alert("Cart is empty!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, cartItems, total }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout failed");

      alert(`✅ Checkout successful! Total: $${total.toFixed(2)}. Check your email.`);
      
      // Clear cart after successful checkout
      useCartStore.getState().clearCart();

      router.push("/thank-you");
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Something went wrong during checkout!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBF0] flex flex-col items-center py-16 px-4 md:px-0">
      <h1 className="text-3xl font-bold mb-8 text-[#353C1B]">Checkout</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8">
          {/* Cart Items */}
          <div className="bg-white shadow-lg rounded-2xl p-6 space-y-4">
            <h2 className="font-bold text-xl mb-4">Order Summary</h2>
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-gray-600">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-bold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
            <div className="flex justify-between font-bold text-lg mt-4">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Checkout / Payment */}
          <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col gap-6">
            <h2 className="font-bold text-xl">Billing & Payment</h2>
            <p className="text-gray-500">
              Your order summary will be sent to your email after checkout.
            </p>

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="bg-[#a2c617] hover:bg-[#8ab312] text-white font-bold py-3 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : `Pay $${total.toFixed(2)}`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;

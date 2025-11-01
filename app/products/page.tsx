"use client";

import { useEffect, useState, useCallback } from "react";
import Header from "../components/header/Header";
import { Product } from "../types/productsType/product";
import Link from "next/link";
import Loading from "../loading-state/Loading";
import { useAuthStore, useCartStore } from "@/zustand";
import { motion, AnimatePresence } from "framer-motion";
import { useDebounce } from "use-debounce";
import vampire from "@/public/eccom/ChatGPT Image Nov 1, 2025, 05_46_03 PM.png"
import Image from "next/image";
const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [debouncedSearch] = useDebounce(searchQuery, 500);

  const addToCart = useCartStore((state) => state.addToCart);
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  const handleAddToCart = (product: Product) => {
    if (!user || !token) {
      alert("Please log in to add items to your cart.");
      return;
    }
    addToCart(product);
  };

  // ✅ Fetch products
  const fetchProducts = useCallback(
    async (showGlobalLoader = false) => {
      try {
        if (showGlobalLoader) setLoading(true);
        else setSearchLoading(true);

        setError(null);

        const url = `${process.env.NEXT_PUBLIC_API_URL}/products${
          debouncedSearch ? `?search=${encodeURIComponent(debouncedSearch)}` : ""
        }`;

        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        setProducts(data);
      } catch (err: any) {
        console.error("Error fetching products:", err);
        setError(err.message);
      } finally {
        setLoading(false);
        setSearchLoading(false);
      }
    },
    [debouncedSearch]
  );

  // ✅ Initial load
  useEffect(() => {
    fetchProducts(true);
  }, []);

  // ✅ Search change
  useEffect(() => {
    if (debouncedSearch.trim() !== "") {
      fetchProducts(false);
    } else {
      // If search is cleared → reload all products
      fetchProducts(false);
    }
  }, [debouncedSearch]);

  if (loading) return <Loading />;

  if (error)
    return <p className="text-red-500 text-center mt-4">Error: {error}</p>;

  return (
    <>
      <Header />

      {/* ✅ Sticky search bar */}
      <div className="sticky top-0 bg-white z-10 py-4 flex justify-center shadow-sm">
        <div className="relative w-full max-w-md p-2">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          {searchLoading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-500 animate-spin">
              ⟳
            </div>
          )}
        </div>
      </div>

      {/* ✅ Product grid with smooth animations */}
      <div className="p-4 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center">
        <AnimatePresence mode="popLayout">
          {products.length > 0 ? (
            products.map((product, index) => (
              <motion.div
                key={product._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 10px 20px rgba(0,0,0,0.15)",
                }}
                className="border rounded-lg p-4 flex flex-col items-center bg-white"
              >
                <h2 className="font-bold text-center text-gray-800">
                  {product.name}
                </h2>

                <Link href={`/products/${product._id}`}>
                  <Image
                    src={vampire}
                    alt={product.name}
                    width={150}
                    height={150}
                    className="object-cover rounded mt-2"
                  />
                </Link>

                <p className="mt-2 text-lg font-semibold text-gray-700">
                  ${product.price.toFixed(2)}
                </p>

                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={!user || !token}
                  className={`mt-3 border cursor-pointer rounded-lg w-28 h-10 text-orange-500 transition-colors ${
                    !user || !token
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-orange-100"
                  }`}
                >
                  Add to Cart
                </button>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No products found.
            </p>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Products;

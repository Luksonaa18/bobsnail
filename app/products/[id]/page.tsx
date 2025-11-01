"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading-state/Loading";
import { Product, useAuthStore, useCartStore } from "@/zustand";

const ProductPage = () => {
  const params = useParams();
  const { id } = params;
  const router = useRouter();
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(true);
  const addToCart = useCartStore((state) => state.addToCart);
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);
  const handleAddTocart = () => {
    if (!token || !user) {
      router.push("/login");
      return;
    }
    if (!product) return;
    addToCart(product);
    alert("Added successfully");
  };
  if (loading) return <Loading />;
  if (!product) return <p>Product not found</p>;

  return (
    <>
      <div>
        <IoMdArrowRoundBack
          onClick={() => router.back()}
          size={30}
          className="m-4 cursor-pointer"
        />
      </div>
      <div className="max-w-3xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <img
          src={product.imageUrl?.[0] || product.imageUrl}
          alt={product.name}
          className="w-full h-80 object-cover rounded-lg mb-4"
        />
        <p className="mb-2 font-bold">Price: ${product.price.toFixed(2)}</p>
        <p className="mb-2">Stock: {product.stock}</p>
        <p className="text-gray-700">{product.description}</p>
      </div>
      <div className="w-full flex items-center justify-center">
        <button
          onClick={() => handleAddTocart()}
          className="border w-40 rounded-lg h-15 text-orange-500"
        >
          Add to cart
        </button>
      </div>
    </>
  );
};

export default ProductPage;

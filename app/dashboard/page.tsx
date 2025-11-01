"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuthStore } from "@/zustand";
import { IoMdArrowRoundBack } from "react-icons/io";


import { createProduct, updateProduct, deleteProduct } from "../helpers/products/products";
import AddProductForm from "../tasks/page";
import UpdateForm from "../tasks/Update";
import Loading from "../loading-state/Loading";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl?: string;
  images?: string[];
}

const Page = () => {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showTasks, setShowTasks] = useState(false);
  const [activeTask, setActiveTask] = useState<"add" | "update" | "delete" | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!user || user.role !== "admin") router.push("/");
  }, [user, router]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/products");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleProductCreate = async (product: any) => {
    try {
      const created = await createProduct(product, token ?? "");
      setProducts((prev) => [...prev, created]);
      alert("Product created successfully");
    } catch (err) {
      alert("Failed to create product");
    }
  };

  const handleProductUpdate = async (product: Product) => {
    if (!product._id) return;
    try {
      const updated = await updateProduct(product._id, product, token ?? "");
      setProducts((prev) =>
        prev.map((p) => (p._id === updated._id ? updated : p))
      );
      alert("Product updated successfully");
      setSelectedProduct(null);
    } catch (err) {
      alert("Failed to update product");
    }
  };

  const handleProductDelete = async (id: string) => {
    try {
      await deleteProduct(id, token ?? "");
      setProducts((prev) => prev.filter((p) => p._id !== id));
      alert("Product deleted successfully");
    } catch (err) {
      alert("Failed to delete product");
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <div>
        <IoMdArrowRoundBack
          onClick={() => router.back()}
          size={30}
          className="m-4 cursor-pointer"
        />
      </div>

      <div className="w-full min-h-screen bg-linear-to-br from-gray-100 to-gray-200 p-4 sm:p-6 md:p-8 lg:p-12">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold mb-8 text-gray-900 text-center"
          >
            Admin Dashboard
          </motion.h1>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowTasks(!showTasks)}
            className="mb-8 px-8 py-3 bg-[#C8D400] cursor-pointer text-white font-bold rounded-xl shadow-lg w-full sm:w-auto"
          >
            {showTasks ? "Close Tasks" : "Manage Product Tasks"}
          </motion.button>

          {showTasks && (
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-6 md:p-8 mb-12 flex flex-col md:flex-row justify-center gap-6 flex-wrap"
            >
              {activeTask === "add" ? (
                <AddProductForm onAdd={handleProductCreate} />
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTask("add")}
                  className="w-full md:w-auto px-6 py-3 bg-green-500 cursor-pointer text-white rounded-xl font-semibold"
                >
                  Add Product
                </motion.button>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTask("update")}
                className="w-full md:w-auto px-6 py-3 bg-blue-500 cursor-pointer text-white rounded-xl font-semibold"
              >
                Update Product
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTask("delete")}
                className="w-full md:w-auto px-6 py-3 bg-red-500 cursor-pointer text-white rounded-xl font-semibold"
              >
                Delete Product
              </motion.button>
            </motion.div>
          )}

          {error && <p className="text-red-500 text-lg mb-4">{error}</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full justify-items-center">
            {products.map((product) => (
              <motion.div
                key={product._id}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-3xl shadow-xl p-6 flex flex-col items-center transition-transform max-w-[300px] w-full"
              >
                <h2 className="font-bold text-xl mb-3 text-gray-800 text-center">
                  {product.name}
                </h2>
                <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mb-4">
                  <img
                    src={product.images?.[0] || product.imageUrl || "/placeholder.png"}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
                <p className="font-bold text-gray-700 mb-2">${product.price.toFixed(2)}</p>
                <p className="text-gray-500 mb-4">Stock: {product.stock}</p>

                {activeTask === "update" && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedProduct(product)}
                    className="px-4 py-2 cursor-pointer bg-blue-500 text-white rounded-lg mb-2 w-full"
                  >
                    Edit
                  </motion.button>
                )}

                {activeTask === "delete" && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleProductDelete(product._id)}
                    className="px-4 py-2 cursor-pointer bg-red-500 text-white rounded-lg w-full"
                  >
                    Delete
                  </motion.button>
                )}
              </motion.div>
            ))}
          </div>

          {selectedProduct && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-auto">
              <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-4">Update Product</h2>
                <UpdateForm
                  product={selectedProduct}
                  onUpdate={handleProductUpdate}
                />
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="mt-4 px-4 py-2 cursor-pointer bg-gray-500 text-white rounded-lg w-full"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;

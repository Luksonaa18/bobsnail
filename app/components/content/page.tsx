"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import hand from "@/public/eccom/hand.png";
import pumpkin from "@/public/eccom/pumpkin.png";
import Slider from "@/app/swiper/page";
import { useRouter } from "next/navigation";
import FlyingBats from "@/app/animation/page";
import { useEffect, useState } from "react";
import { Product } from "@/zustand";

const MotionImage = motion(Image);

const ContentPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/products"); // your backend endpoint
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data); // set dynamic products
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 px-4 md:px-12 lg:px-24 py-8">
      <FlyingBats />

      <motion.div
        className="relative bg-linear-to-br from-neutral-900 via-black to-neutral-800 w-full rounded-3xl p-6 sm:p-8 md:p-12 flex flex-col md:flex-row items-center justify-between overflow-hidden shadow-2xl"
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <MotionImage
          src={hand}
          alt="floating hand"
          loading="eager"
          width={160}
          height={160}
          className="absolute -top-7 right-6 w-28 sm:w-36 md:w-44 rotate-12 drop-shadow-[0_8px_15px_rgba(0,0,0,0.5)]"
          initial={{ y: -10, rotate: 12, opacity: 0 }}
          animate={{ y: [0, -8, 0], rotate: [12, 18, 12], opacity: 1 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: 0.3,
          }}
        />
        <motion.div
          className="absolute inset-0 bg-linear-to-b from-transparent via-black/30 to-black/80 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.18, 0.36, 0.18] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative z-10 text-center md:text-left max-w-xl space-y-4 md:space-y-6">
          <motion.h1
            className="text-white font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight"
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Your <span className="text-orange-400">Fashion</span> Starts Here
          </motion.h1>
          <motion.p
            className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed"
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Discover unique styles that define your vibe — curated collections,
            exclusive drops, and looks that turn heads.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push("/products")}
            className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-500 text-white font-semibold text-sm sm:text-base shadow-lg hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-400/30"
          >
            Explore Collection
          </motion.button>
        </div>
        <motion.div
          className="relative z-10 mt-8 md:mt-0 flex justify-center md:justify-end w-full md:w-auto"
          animate={{
            scale: [1, 1.05, 1],
            filter: [
              "drop-shadow(0 0 8px rgba(255,120,0,0.6))",
              "drop-shadow(0 0 25px rgba(255,150,0,1))",
              "drop-shadow(0 0 8px rgba(255,120,0,0.6))",
            ],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          whileHover={{
            scale: 1.1,
            filter: "drop-shadow(0 0 40px rgba(255,160,0,1))",
          }}
        >
          <Image
            src={pumpkin}
            alt="glowing pumpkin"
            width={200}
            height={200}
            className="rounded-full w-32 sm:w-40 md:w-48 lg:w-56"
          />
        </motion.div>
      </motion.div>

      {/* SLIDER */}
      <div className="w-full mt-8">
        <Slider />
      </div>

      {/* CREATIVE GRID */}
      <section className="relative w-full mt-12">
        <div className="mx-auto max-w-[1400px]">
          {loading ? (
            <p className="text-white text-center py-20">Loading products...</p>
          ) : products.length === 0 ? (
            <p className="text-white text-center py-20">No products found</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[180px] sm:auto-rows-[200px] md:auto-rows-[220px] lg:auto-rows-[240px] grid-flow-dense">
              {products.map((p, i) => {
                const rotate =
                  (i % 2 === 0 ? 1 : -1) * (Math.floor(Math.random() * 6) + 2);
                const translateY = Math.floor(Math.random() * 18) - 8;
                const scale = 1 + Math.random() * 0.04;
                const spanClass =
                  i % 7 === 0
                    ? "col-span-2 row-span-2"
                    : i % 5 === 0
                    ? "row-span-2"
                    : i % 3 === 0
                    ? "col-span-2"
                    : "col-span-1";

                return (
                  <motion.article
                    key={p._id}
                    className={`relative group overflow-visible rounded-2xl shadow-[0_18px_40px_rgba(2,6,23,0.6)] border border-neutral-800 bg-neutral-900/70 ${spanClass}`}
                    initial={{ opacity: 0, y: 28, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.6,
                      ease: "easeOut",
                      delay: i * 0.06,
                    }}
                    whileHover={{ zIndex: 40 }}
                    style={{
                      transform: `rotate(${rotate}deg) translateY(${translateY}px) scale(${scale})`,
                    }}
                  >
                    {/* Image wrapper */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl overflow-hidden"
                      whileHover={{
                        scale: 1.06,
                        rotate: 0,
                        transition: { duration: 0.5 },
                      }}
                      style={{ willChange: "transform" }}
                    >
                      <Image
                        src="/eccom/asd.png"
                        alt={p.name}
                        width={800}
                        height={800}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300" />
                    </motion.div>

                    {/* Text block */}
                    <div className="absolute left-4 bottom-4 z-20">
                      <h3 className="text-white text-sm sm:text-base font-bold tracking-tight drop-shadow-md">
                        {p.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-orange-400 font-semibold text-sm">
                          ${p.price}
                        </span>
                        <button
                          onClick={() => router.push(`/products/${p._id}`)}
                          className="ml-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/6 backdrop-blur-sm text-xs text-white border border-white/6 shadow-sm hover:bg-white/10"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ContentPage;

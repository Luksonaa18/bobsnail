"use client";

import Image from "next/image";
import logo from "../../../public/eccom/Logo.svg";
import React, { useEffect, useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuthStore, useCartStore } from "@/zustand";
import { FaShoppingCart } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

const Header = React.memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const cartItems = useCartStore((state) => state.cartItems);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();
  const role = user?.role?.toLowerCase();
  const isAdmin = role === "admin";
  const isUser = role === "user" || role === "customer";

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const menuItems = isAdmin
    ? [
        { label: "CONTACT", path: "/contact" },
        { label: "ABOUT", path: "/about" },
        { label: "DASHBOARD", path: "/dashboard" },
      ]
    : [
        { label: "CONTACT", path: "/contact" },
        { label: "ABOUT", path: "/about" },
        { label: "PRODUCTS", path: "/products" },
        { label: "PROFILE", path: "/profile" },
      ];

  const handleToggle = () => setIsOpen((prev) => !prev);
  const handleNavigate = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    clearCart();
    router.push("/login");
    setIsOpen(false);
    setShowCart(false);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen || showCart ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, showCart]);
  useEffect(() => {
    const updateHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    window.addEventListener("orientationchange", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
      window.removeEventListener("orientationchange", updateHeight);
    };
  }, []);

  return (
    <header className="w-full bg-[#FFFBF0] relative z-50 shadow-md">
      <nav className="flex items-center justify-between p-4 max-w-7xl mx-auto relative">
        {/* Logo */}
        <div className="cursor-pointer" onClick={() => router.push("/")}>
          <Image src={logo} alt="logo" width={120} height={40} />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 font-bold text-[#353C1B] items-center">
          {menuItems.map((item) => (
            <div
              key={item.label}
              className="hover:text-[#a2c617] cursor-pointer transition-colors duration-300"
              onClick={() => handleNavigate(item.path)}
            >
              {item.label}
            </div>
          ))}

          {/* Desktop Cart */}
          {isUser && (
            <div
              className="relative cursor-pointer"
              onClick={() => setShowCart(true)}
            >
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              )}
              <FaShoppingCart className="text-2xl text-[#353C1B]" />
            </div>
          )}

          {/* Desktop Logout */}
          {isAdmin && (
            <FiLogOut
              className="text-2xl text-orange-500 cursor-pointer"
              onClick={handleLogout}
            />
          )}
        </div>

        {/* Mobile Icons (Cart + Menu) */}
        <div className="flex items-center gap-6 md:hidden z-70">
          {isUser && (
            <div className="relative">
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              )}
              <FaShoppingCart
                onClick={() => setShowCart(true)}
                className="text-2xl text-[#353C1B] cursor-pointer"
              />
            </div>
          )}

          <div className="cursor-pointer" onClick={handleToggle}>
            {isOpen ? (
              <IoClose className="text-3xl text-[#353C1B]" />
            ) : (
              <IoMenu className="text-3xl text-[#353C1B]" />
            )}
          </div>
        </div>
      </nav>

      {/* Full-Screen Cart Drawer */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            className="fixed top-0 right-0 w-full h-screen bg-white z-70 p-6 overflow-y-auto shadow-2xl flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-2xl">Your Cart</h3>
              <IoClose
                className="text-2xl cursor-pointer"
                onClick={() => setShowCart(false)}
              />
            </div>

            {cartItems.length === 0 ? (
              <p className="text-center text-gray-500 flex-1 flex items-center justify-center">
                Your cart is empty
              </p>
            ) : (
              <div className="space-y-6 flex-1">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between border-b pb-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-16 h-16">
                        <Image
                          src="/eccom/asd.png"
                          alt={item.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-gray-600">
                          ${item.price.toFixed(2)}
                        </p>
                        <p className="text-gray-500 text-sm">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <button
                      className="text-red-500 font-bold text-lg cursor-pointer"
                      onClick={() => removeFromCart(item._id)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Checkout Button */}
            {cartItems.length === 0 ? (
              <div className="mt-6">
                <button
                  className="w-full bg-[#353C1B] text-white py-3 rounded-md font-bold cursor-pointer hover:bg-[#a2c617] transition-colors duration-300"
                  onClick={() => {
                    router.push("/products");
                    setShowCart(false);
                  }}
                >
                  Go to Products
                </button>
              </div>
            ) : (
              <div className="mt-6">
                <button
                  className="w-full bg-[#353C1B] text-white py-3 rounded-md font-bold cursor-pointer hover:bg-[#a2c617] transition-colors duration-300"
                  onClick={() => {
                    router.push("/checkout");
                    setShowCart(false);
                  }}
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed top-0 left-0 w-full h-dvh bg-[#FFFBF0] z-65 flex flex-col justify-between p-6"
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Menu Items */}
            <div className="flex flex-col items-center justify-center gap-6 flex-1 mt-12">
              {menuItems.map((item, idx) => (
                <motion.div
                  key={item.label}
                  className="text-[#353C1B] font-bold text-xl hover:text-[#a2c617] cursor-pointer"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  transition={{
                    delay: 0.1 * idx + 0.2,
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                  onClick={() => handleNavigate(item.path)}
                >
                  {item.label}
                </motion.div>
              ))}
            </div>

            {/* Admin Logout at the bottom */}
            {isAdmin && (
              <div className="w-full flex justify-center mb-8">
                <button
                  onClick={handleLogout}
                  className="px-6 py-3 bg-orange-500 text-white rounded-full font-bold hover:bg-orange-600 transition"
                >
                  Log Out
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
});

export default Header;

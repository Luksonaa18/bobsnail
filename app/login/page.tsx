"use client";
import { useState } from "react";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/zustand";
import { login } from "../services/authService";
import Image from "next/image";
import logo from "@/public/eccom/Logo.svg";

export default function LoginPage() {
  const setUser = useAuthStore((state) => state.setUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      setUser(data.user, data.token);
      if (data.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="w-full flex flex-row items-center justify-center p-4">
        <Image src={logo} alt="logo" />
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-80 mx-auto mt-20"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2"
          required
        />
        <button type="submit" className="bg-green-500 p-2 text-white cursor-pointer">
          Login
        </button>
        <div
          className="w-full flex items-center justify-center "
          
        >
          <p className="cursor-pointer" onClick={()=>router.push("/register")}>Don't have an account yet?</p>
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </>
  );
}

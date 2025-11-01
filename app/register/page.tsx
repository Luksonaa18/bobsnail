"use client";
import { useState } from "react";
import { useAuthStore } from "@/zustand";
import { register as registerService } from "../services/authService";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/public/eccom/Logo.svg";

export default function RegisterPage() {
  const setUser = useAuthStore((state) => state.setUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await registerService(email, password, name);
      setUser(data.user, data.access_token);
      router.push("/admin");
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
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2"
          required
        />
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
        <button type="submit" className="bg-blue-500 p-2 text-white cursor-pointer">
          Register
        </button>
        <button
          onClick={() => router.push("/login")}
          className="underline text-blue-300 hover:text-black cursor-pointer"
        >
          Already have an account?
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </>
  );
}

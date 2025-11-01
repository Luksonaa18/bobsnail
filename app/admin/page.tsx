"use client";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/zustand";
import { useEffect, useState } from "react";
import Header from "../components/header/Header";
import Loading from "../loading-state/Loading";
import ContentPage from "../components/content/page";
import Footer from "../components/footer/page";

export default function AdminLayout() {
  const user = useAuthStore((state) => state.user);
  const [hydrated, setHydrated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setHydrated(true);
  }, []);
  useEffect(() => {
    if (hydrated && (!user || user.role !== "admin")) {
      router.push("/login");
    }
  }, [hydrated, user, router]);

  if (!hydrated || !user || user.role !== "admin") {
    return <Loading />;
  }

  return (
    <div>
      <Header />
      <ContentPage />
      <Footer />
    </div>
  );
}

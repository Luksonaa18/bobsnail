"use client";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/zustand";
import { useEffect, useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import Image from "next/image";
import background from "@/public/eccom/ChatGPT Image Oct 31, 2025, 07_27_00 PM.png";
import Loading from "../loading-state/Loading";
import Header from "../components/header/Header";

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const [hydrated, setHydrated] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => setHydrated(true), []);

  useEffect(() => {
    if (hydrated && user?.role === "admin") {
      router.push("/admin");
    }
  }, [hydrated, user, router]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!hydrated || !token) return;
      if (!user) return router.push("/login");
      try {
        const res = await fetch("http://localhost:5000/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setProfile(data);
      } catch {
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [hydrated, token]);

  if (!hydrated || loading) return <Loading />;
  

  return (
    <>
      <Header />

      <div className="relative min-h-screen flex flex-col items-center justify-center p-6 text-white bg-black">
        {/* Background Image for all screen sizes */}
        <div className="absolute inset-0">
          <Image
            src={background}
            alt="Halloween background"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Profile Card */}
        <div className="relative z-10 bg-black/70 md:bg-neutral-900 md:shadow-xl rounded-3xl p-6 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl backdrop-blur-md">
          <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6">
            {/* Avatar */}
            <div className="shrink-0">
              <FaCircleUser className="text-7xl md:text-9xl text-orange-500 drop-shadow-[0_0_12px_#ff6600]" />
            </div>

            {/* Info */}
            <div className="flex-1 space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-orange-400">
                Profile
              </h1>

              <div className="w-full h-px bg-orange-500/50 my-2" />

              <div className="space-y-2 text-base md:text-lg">
                <p>
                  <strong className="text-orange-400">Name:</strong>{" "}
                  {profile.name}
                </p>
                <p>
                  <strong className="text-orange-400">Email:</strong>{" "}
                  {profile.email}
                </p>
              </div>

              <button
                onClick={() => {
                  logout(); // clear auth state
                  router.push("/login"); // redirect to login page
                }}
                className="mt-4 w-full bg-orange-500/20 rounded-xl py-3 text-orange-300 font-semibold text-center md:text-left"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

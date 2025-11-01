"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import hand from "@/public/eccom/hand.png";
import pumpkin from "@/public/eccom/pumpkin.png";
import Slider from "@/app/swiper/page";
import { useRouter } from "next/navigation";
import FlyingBats from "@/app/animation/page";

const MotionImage = motion(Image);

const ContentPage = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center gap-8 px-4 md:px-12 lg:px-24 py-8">
     <FlyingBats/>
      <motion.div
        className="relative bg-linear-to-br from-neutral-900 via-black to-neutral-800 w-full rounded-3xl p-6 sm:p-8 md:p-12 flex flex-col md:flex-row items-center justify-between overflow-hidden shadow-2xl"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* 💫 Floating Hand */}
        <MotionImage
          src={hand}
          alt="floating hand"
          loading="lazy"
          width={160}
          height={160}
          className="absolute top-[-30px] -right-2.5 sm:right-0 md:right-8 lg:right-16 w-28 sm:w-36 md:w-44 lg:w-56 rotate-15 drop-shadow-[0_8px_15px_rgba(0,0,0,0.5)]"
          initial={{ y: -20, rotate: 15, opacity: 0 }}
          animate={{
            y: [0, -10, 0],
            rotate: [15, 18, 15],
            opacity: 1,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: 0.4,
          }}
        />

        {/* 🔮 Overlay Gradient */}
        <motion.div
          className="absolute inset-0 bg-linear-to-b from-transparent via-black/30 to-black/80 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.25, 0.4, 0.25] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />

        {/* 🧡 Left Text */}
        <div className="relative z-10 text-center md:text-left max-w-xl space-y-4 md:space-y-6">
          <motion.h1
            className="text-white font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Your <span className="text-orange-400">Fashion</span> Starts Here
          </motion.h1>

          <motion.p
            className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            Discover unique styles that define your vibe — curated collections,
            exclusive deals, and timeless looks for every mood.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/products")}
            className="mt-4 px-6 py-3 rounded-full bg-orange-500 text-white font-semibold text-sm sm:text-base shadow-lg hover:bg-orange-600 transition"
          >
            Explore Collection
          </motion.button>
        </div>

        {/* 🎃 Animated Pumpkin */}
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

      {/* 🧭 Slider Section */}
      <div className="w-full mt-8">
        <Slider />
      </div>
    </div>
  );
};

export default ContentPage;

"use client";

import pumpkin from "@/public/eccom/pumpkin.png";
import { motion } from "framer-motion";
import Image, { type StaticImageData } from "next/image";

type GlowingPumpkinProps = {
  size?: number;
  src?: string | StaticImageData;
};

const Loading: React.FC<GlowingPumpkinProps> = ({ src = pumpkin, size = 100 }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <motion.div
        animate={{
          y: [0, -20, 0], // floating up and down
          scale: [1, 1.1, 1], // pulsing
          filter: [
            "drop-shadow(0 0 10px #FFA500)",
            "drop-shadow(0 0 20px #FFA500)",
            "drop-shadow(0 0 10px #FFA500)",
          ], // glowing
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut",
        }}
      >
        <Image src={src} alt="loading" width={size} height={size} />
      </motion.div>
    </div>
  );
};

export default Loading;

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import batImg from "@/public/eccom/610bd3295e91db0004e598fe.png";

const bats = Array.from({ length: 5 });

const FlyingBats = () => {
  return (
    <div className="fixed top-0 inset-0 pointer-events-none overflow-hidden z-50 h-screen">
      {bats.map((_, i) => {
        const delay = i * 0.8;
        const duration = 4 + Math.random() * 2;
        const startY = Math.random() * 60 + 20;
        const yPath = [
          0,
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 25,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 15,
        ];

        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: `${startY}%`,
              left: "-10%",
              zIndex: 9999,
            }}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0.8 }}
            animate={{
              x: ["0vw", "30vw", "70vw", "110vw"],
              y: yPath.map((v) => `${v}vh`),
              opacity: [0, 1, 1, 1, 0],
              scale: [0.8, 1.2, 1, 0.9, 0.7],
            }}
            transition={{
              duration,
              delay,
              ease: [0.43, 0.13, 0.23, 0.96],
              times: [0, 0.25, 0.5, 0.75, 1],
            }}
          >
            <motion.div
              animate={{
                rotateY: [0, 15, -15, 0],
                rotateZ: [0, -5, 5, 0],
              }}
              transition={{
                duration: 0.3,
                repeat: Math.floor(duration / 0.3),
                ease: "linear",
              }}
            >
              <Image
                src={batImg}
                alt="Flying bat"
                width={50}
                height={50}
                className="opacity-70 drop-shadow-lg"
              />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default FlyingBats;

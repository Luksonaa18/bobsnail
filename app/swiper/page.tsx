"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import slender from "@/public/eccom/slenred.png";
import house from "@/public/eccom/ChatGPT Image Oct 31, 2025, 07_27_00 PM.png";

export default function Slider() {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        spaceBetween={20}
        slidesPerView={1}
        loop
        className="w-full h-64 sm:h-80 md:h-96 rounded-3xl overflow-hidden relative"
      >
        {/* Slide 1 */}
        <SwiperSlide className="relative w-full h-full">
          <Image src={house} alt="Halloween Slide 1" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center p-4">
            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-orange-400 drop-shadow-lg">
              Spooky Halloween Collection
            </h2>
            <p className="mt-2 text-sm sm:text-base md:text-lg text-white/90">
              Check out our amazing Halloween-themed products!
            </p>
            <button className="mt-4 px-6 py-2 bg-orange-500 rounded-full text-white font-semibold hover:bg-orange-600 transition">
              Shop Now
            </button>
          </div>
        </SwiperSlide>
        <SwiperSlide className="relative w-full h-full">
          <Image
            src={slender}
            alt="Halloween Slide 2"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-start p-6 md:p-12 text-left">
            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-purple-400 drop-shadow-lg">
              Spooky Slender Costume
            </h2>
            <p className="mt-2 text-sm sm:text-base md:text-lg text-white/90 max-w-md">
              Perfect costume to scare your friends and win every Halloween
              party!
            </p>
            <button className="mt-4 cursor-pointer px-6 py-2 bg-purple-500 rounded-full text-white font-semibold hover:bg-purple-600 transition">
              View Product
            </button>
          </div>
        </SwiperSlide>

        {/* You can add more slides here */}
      </Swiper>
    </div>
  );
}

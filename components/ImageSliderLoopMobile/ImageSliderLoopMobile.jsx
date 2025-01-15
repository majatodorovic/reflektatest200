"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { convertHttpToHttps } from "@/helpers/convertHttpToHttps";
import Link from "next/link";

const ImageSliderLoop = ({ bannerimagesMobile, onBannerChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swiper, setSwiper] = useState(null);
  return (
    <div className="relative ">
      <Swiper
        modules={[Pagination]}
        className="indexslider1"
        slidesPerView={1}
        loop={true}
        // autoplay={{
        //   delay: 2000,
        //   disableOnInteraction: false,
        // }}
        onSlideChange={(swiper) => {
          setCurrentIndex(swiper.realIndex);
          onBannerChange(swiper.realIndex);
        }}
      >
        {bannerimagesMobile?.map((bannerimage, index) => {
          return (
            <SwiperSlide key={index} className="relative">
              <div className="relative max-sm:h-[600px] sm:h-[630px] md:h-[700px]">
                <Link
                  href={`${bannerimage?.url}` ?? "/stranica-u-izradi"}
                  target={`${bannerimage?.target ?? "_self"}`}
                >
                  {bannerimage?.image && (
                    <Image
                      src={convertHttpToHttps(bannerimage?.image)}
                      alt={bannerimage?.text}
                      className="w-full"
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  )}
                </Link>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="absolute w-[90%] mx-auto -bottom-[20px] left-0 right-0 flex justify-end">
        <div className="flex items-center gap-3 justify-end">
          {bannerimagesMobile?.map((bannerimage, index) => (
            <div
              key={index}
              className={`w-16 rounded-[10px] cursor-pointer h-1.5 ${
                index === currentIndex
                  ? "bg-[#f8f4f1]"
                  : " border bg-croonus-1 border-croonus-1"
              }`}
              onClick={() => {
                setCurrentIndex(index);
                onBannerChange(index);
                swiper.slideTo(index);
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSliderLoop;

"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/swiper.css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import Link from "next/link";

const ImageSliderLoop = ({ bannerimages, onBannerChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swiper, setSwiper] = useState(null);
  return (
    <div className="relative w-full h-full">
      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        pagination={true}
        className="h-full !w-full"
        slidesPerView={1}
        autoplay={{
          delay: 3000,
        }}
        loop={true}
        onSlideChange={(swiper) => {
          setCurrentIndex(swiper.realIndex);
          onBannerChange(swiper.realIndex);
        }}
        onSwiper={(swiper) => setSwiper(swiper)}
      >
        {bannerimages?.map((bannerimage, index) => (
          <SwiperSlide key={index} className="relative !h-full">
            <Link
              target={`${bannerimage?.target}`}
              href={`${bannerimage?.url}` ?? "/stranica-u-izradi"}
            >
              <div className="relative w-full h-full">
                {bannerimage?.image && (
                  <Image
                    src={bannerimage?.image }
                    alt={bannerimage?.text}
                    className="w-full h-full"
                    width={0}
                    height={0}
                    sizes="100vw"
                  />
                )}

                <div className="absolute top-0 left-0 w-full h-full">
                  <div className="py-2 px-6 rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
                    {bannerimage?.title && (
                      <p className="font-medium text-[2.4rem] ">
                        {bannerimage?.title}
                      </p>
                    )}
                    {bannerimage?.subtitle && (
                      <p className="font-thin text-[1.4rem] uppercase">
                        {bannerimage?.subtitle}
                      </p>
                    )}
                    {bannerimage?.text && (
                      <p className="font-thin text-[1rem] text-[#c3c3c3] my-[1rem]">
                        {bannerimage?.text}
                      </p>
                    )}
                    {bannerimage?.button && (
                      <div className="w-full mt-[1rem]">
                        <div className="border-2 border-white py-2 px-6 mt-4 rounded-lg  text-white text-center w-fit mx-auto flex">
                          <p className="font-medium text-3xl ">
                            {bannerimage?.button}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSliderLoop;

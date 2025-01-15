"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import {Autoplay, Pagination} from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";


const BlogSlider = ({ images }) => {

  return (
    <div className={`mt-10`}>
      <Swiper
        modules={[Pagination,Autoplay]}
        pagination={{
          enabled: true,
          clickable: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        slidesPerView={1}
        className={`!w-full blogSwiper`}
      >
        {images?.map((image) => {
          return (
            <SwiperSlide className={`h-full`}>
              <div className={`relative`}>
                <Image
                  src={image}
                  alt={`Reflekta blog`}
                  width={0}
                  height={0}
                  sizes={`100vw`}
                  layout={`responsive`}
                  className={`object-contain aspect-video w-auto max-h-[800px]`}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default BlogSlider;

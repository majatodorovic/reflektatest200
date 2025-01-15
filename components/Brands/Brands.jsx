"use client";

import Image from "next/image";
import Brand1 from "../../assets/Brands/cropped-MATUSKO-LOGO-SIROKI-01.webp";
import Brand2 from "../../assets/Brands/logo.png";

import classes from "@/components/DealsOfTheDay/DealsItem.module.css";
import Link from "next/link";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination} from "swiper";
import "swiper/css";
import "swiper/css/pagination";
const Brands = () => {
    const images = [
        {
            id: 1,
            src: Brand1,
            url: 'vinarije/matusko',
            invert:false,
        },
        {
            id: 2,
            src: Brand2,
            url: 'vinarije/lazar',
            invert:true,
        }
    ]
  return (
    <div className=" relative  w-[90%] lg:pt-[4rem] lg:pb-[4rem] mx-auto  max-lg:py-7">
      <div className={`w-full text-left`}>
        <h2 className={`text-black text-3xl font-bold`}>Vinarije</h2>
      </div>


      <div className="flex flex-row max-sm:hidden max-lg:gap-2 gap-[3.8rem] justify-center items-center">
        <div className=" py-[1rem] px-[3rem] border self-stretch border-[#1b1b1b]">
          <Link href={`vinarije/matusko`} className={`max-sm:hidden`}>
            <Image
              src={Brand1}
              width="180"
              height="50"
              className={` max-sm:w-full`}
            />
          </Link>
        </div>
        <div className="py-[1rem] px-[3rem] border  self-stretch border-[#1b1b1b]">
          <Link href={`vinarije/lazar`} className={`max-sm:hidden`}>
            <Image
              src={Brand2}
              width="180"
              height="50"
              className={`invert max-sm:w-full`}
            />
          </Link>
        </div>
      </div>

        <Swiper modules={[Pagination]} slidesPerView={1} spaceBetween={10} className={`sm:hidden brandsSwiper`} pagination={true}>
            {images.map((image) => (
                <SwiperSlide key={image.id} className={`!relative`}>
                    <Link href={`${image.url}`}>
                        <Image
                            src={image.src}
                            width={250}
                            height={150}
                            priority
                            alt={``}/>
                    </Link>
                </SwiperSlide>
                ))}
        </Swiper>



    </div>
  );
};

export default Brands;

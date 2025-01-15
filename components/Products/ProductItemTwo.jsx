"use client";
import { useEffect, useState } from "react";
import { list } from "@/app/api/api";
import { currencyFormat } from "@/helpers/functions";
import Translated from "../../context/state";
import Link from "next/link";
import Image from "next/image";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Autoplay } from "swiper";
import ProductPrice from "../ProductPrice/ProductPrice";

const ProductItemTwo = ({ actionProducts, action2, indexBanner2 }) => {

  const [swiper, setSwiper] = useState(null);
  const onSwiperLeftClick = () => {
    swiper.slidePrev();
  };
  const onSwiperRightClick = () => {
    swiper.slideNext();
  };

  const items = actionProducts?.map((item) => {
    return (
      <SwiperSlide key={item.id}>
        <div
          className="h-[400px] 2xl:w-[440px] 3xl:w-[480px] relative w-full ml-auto"
          style={{ width: "100%" }}
        >
          <Link href={`/proizvod/${item?.slug}`}>
            <Image
              src={item?.image[0]?.toString()}
              alt="Reflekta"
              fill={true}
              style={{ objectFit: "contain" }}
              className="h-full w-full object-cover"
            />
          </Link>
        </div>
        {/* <Link href={`/proizvod/${item?.slug}`} className="cursor-pointer">
          <div className="absolute bottom-[4.6rem] max-lg:-right-3 px-5 py-2 text-base right-[0rem] bg-croonus-3 text-white rounded-lg">
            <ProductPrice price={item?.price} inventory={item?.inventory} />
          </div>
        </Link> */}
        {item?.basic_data?.name && (
          <Link href={`/proizvod/${item?.slug}`}>
            <h1 className="text-[1rem] font-semibold text-right mt-[0.2rem] text-black rows2">
              {item?.basic_data?.name}
            </h1>
          </Link>
        )}
      </SwiperSlide>
    );
  });
  return (
    <>
    {indexBanner2[0]?.image ? (
      <>
       <div className="col-span-2 mt-10 h-full max-lg:w-[100%] w-full max-lg:col-span-5 max-xl:mt-5">
       <div className="max-sm:w-full min-h-[190px]  relative rounded-lg overflow-hidden">
         <Image
           src={indexBanner2[0]?.image}
           alt="Reflekta"
           className="w-full"
           width={600}
           height={400}
           style={{ objectFit: "cover", width: "100%", height: "auto" }}
         />
         <div className="w-[100%] bg-croonus-1 bg-opacity-50 pb-2 h-full absolute top-0 left-0 px-3 flex flex-col gap-2 justify-end rounded-lg overflow-hidden">
           <h1 className="font-medium text-lg text-white">
             {indexBanner2[0]?.title}
           </h1>
           <p className="text-white text-xs">{indexBanner2[0]?.text}</p>
           <Link href={indexBanner2[0]?.url ?? "/"} className="mb-2">
             <button className="bg-croonus-3  flex items-center font-semibold text-white text-[0.9rem]  px-[1.2rem] py-[0.4rem] rounded-lg">
               <p>Saznaj</p>
               <i className="fa-solid pl-2 no-underline fa-chevron-right text-[0.622rem]"></i>
             </button>
           </Link>
         </div>
       </div>
     </div>
     <div className="col-span-2 mt-10 max-lg:col-span-4 ">
       <div className="grid grid-cols-5 gap-x-20 xl:gap-x-10">
         <div className="col-span-2 max-lg:place-self-center place-self-center max-sm:col-span-5">
           <h1 className="font-medium text-[2rem] mt-[2rem] max-md:text-xl lg:mt-[6.875rem] text-black">
             {action2[0]?.title}
           </h1>
           <div className="relative mt-[2rem] lg:mt-[2rem] afterborder flex flex-col items-start">
             <Link
               href={`/sekcija/top_sellers`}
               className="text-black text-base"
             >
               <Translated Key="view_all_products" />
             </Link>

             <div className="flex flex-row gap-5 divide-x divide-x-2 divide-black mt-8">
               <i
                 className="fa-solid fa-arrow-left text-black text-base cursor-pointer"
                 onClick={() => onSwiperLeftClick()}
               ></i>
               <i
                 className="fa-solid fa-arrow-right pl-5 text-black text-base cursor-pointer"
                 onClick={() => onSwiperRightClick()}
               ></i>
             </div>
           </div>
         </div>
         <div className="col-span-3 sm:col-start-3 sm:col-end-6 max-lg:mt-3 max-sm:mt-[1rem] max-sm:col-span-5  max-sm:w-[100%]">
           <Swiper
             slidesPerView={1}
             modules={[Autoplay]}
             autoplay={{
               delay: 3000,
               disableOnInteraction: false,
             }}
             loop={true}
             onSwiper={(swiper) => setSwiper(swiper)}
             spaceBetween={30}
             className="homeSwiper"
             style={{ width: "100%" }}
           >
             {items}
           </Swiper>
         </div>
       </div>
     </div>
     </>
    ): null}
     
    </>
  );
};

export default ProductItemTwo;

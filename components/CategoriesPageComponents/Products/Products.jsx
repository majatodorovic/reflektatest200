"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { convertHttpToHttps } from "@/helpers/convertHttpToHttps";
import Chevron from "../../../assets/Icons/right-chevron.png";
import { useGlobalAddToWishList } from "@/app/api/globals";
import { ToastContainer, toast } from "react-toastify";
import classes from "./ProductsItem.module.css";
import Missing from "@/assets/Images/missingphoto.jpg";

const Thumb = ({ data, slider, loading, closeMenu = () => {} }) => {
  if (slider) {
    const addToWishlist = useGlobalAddToWishList();

    const imageIndexes = data?.map(() => useState(0)); // Create array of image index states
    const products = data?.map((product, index) => {
      const [imageIndex, setImageIndex] = imageIndexes[index]; // Access the correct state for the current product
      return (
        <SwiperSlide key={product?.basic_data?.id} className="">
          <div className="w-full item">
            {" "}
            <div
              className={`${classes.item} max-md:h-[250px] flex items-center justify-center md:h-[350px] lg:h-[450px] relative`}
            >
              {product?.image[0] ? (
                <Link
                  href={`/proizvod/${product?.slug}`}
                  scroll={true}
                  className="relative z-[5]"
                >
                  <Image
                    src={convertHttpToHttps(product?.image[imageIndex])}
                    alt={product?.basic_data?.name}
                    width={22000}
                    height={22000}
                    className={`transition-all duration-200 opacity-100 object-cover w-full h-full`}
                    loading="lazy"
                  />{" "}
                </Link>
              ) : (
                <Link
                  href={`/proizvod/${product?.slug}`}
                  scroll={true}
                  className="relative z-[5]"
                >
                  <Image
                    src={Missing}
                    alt={product?.basic_data?.name}
                    width={22000}
                    height={22000}
                    className={`transition-all duration-200 opacity-100 object-cover w-full h-full`}
                    loading="lazy"
                  />{" "}
                </Link>
              )}

              {product?.stickers[0]?.name ? (
                <div className="px-2 py-1 absolute top-1 left-1 bg-croonus-3 w-fit text-white text-[0.8rem] ">
                  <span>{product?.stickers[0]?.name}</span>
                </div>
              ) : null}
              <div className="absolute max-md:hidden z-[5] px-4 top-0 left-0 w-full h-full chevrons items-center justify-between">
                <div>
                  <Image
                    className="cursor-pointer rotate-180"
                    src={Chevron}
                    alt="chevron"
                    width={15}
                    height={15}
                    onClick={() => {
                      if (imageIndex === 0) {
                        setImageIndex(product?.image.length - 1);
                      } else {
                        setImageIndex(imageIndex - 1);
                      }
                    }}
                  />
                </div>
                <div>
                  <Image
                    className="cursor-pointer rotate-0"
                    src={Chevron}
                    alt="chevron"
                    width={15}
                    height={15}
                    onClick={() => {
                      if (imageIndex === product?.image.length - 1) {
                        setImageIndex(0);
                      } else {
                        setImageIndex(imageIndex + 1);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="absolute z-[100] rounded-lg py-5 left-3 bottom-[4rem] w-[95%] mx-auto bg-white chevrons">
              <div className="flex flex-col items-center justify-center w-full">
                {/* <h1 className="text-[0.938rem] font-semibold text-center">
                  Izaberi veličinu
                </h1> */}
                <div className="flex flex-row items-center justify-center gap-3 w-full mt-2">
                  {product?.variant_options?.length > 0 ? (
                    <>
                      {product?.variant_options?.slice(0, 1).map((item2) => {
                        return (
                          <>
                            {item2?.values.map((item3) => {
                              return (
                                <>
                                  <div className="rounded-full cursor-pointer flex items-center justify-center text-center text-xs w-[35px] h-[35px] border-[#7d7d7d] hover:border-[#242424] transition-all duration-500 border">
                                    {item3?.name}
                                  </div>
                                </>
                              );
                            })}
                          </>
                        );
                      })}
                    </>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="mt-[0.813rem] max-md:text-left flex max-md:items-start items-center justify-between relative z-[19]">
              <Link
                href={`/proizvod/${product?.slug}`}
                scroll={true}
                className="relative z-[5]"
              >
                <span className="font-semibold text-base hover:text-[#a3a3a3] rows2 max-md:text-[0.85rem] max-md:leading-4 row1 mt-[1rem]cursor-pointer">
                  {product?.basic_data?.name}
                </span>

                <div className="min-h-[2.8rem] flex items-center">
                  <span className="text-[0.9rem] flex text-[#939393] row2">
                    {product?.basic_data?.short_description}
                  </span>
                </div>
              </Link>
            </div>
            {/* <div className="mt-0 max-md:text-left max-md:items-start max-md:mt-1.5 flex max-md:flex-col items-center max-md:gap-1 gap-[10px]">
              <div className="bg-croonus-1 max-md:text-[0.75rem] text-[0.813rem] font-bold text-center min-w-[5.938rem] max-w-[6rem]">
                <ProductPrice
                  price={product?.price}
                  inventory={product?.inventory}
                />
              </div>
              <span className="text-[0.813rem] max-md:text-[0.75rem] font-semibold text-[#818181]">
                {" "}
                {currencyFormat(product?.price?.price?.original)}
              </span>
            </div> */}
          </div>
        </SwiperSlide>
      );
    });

    return (
      <>
        <ToastContainer />
        <Swiper
          slidesPerView={2}
          spaceBetween={10}
          navigation={true}
          modules={[Navigation]}
          fadeEffect={{ crossFade: true }}
          loop={true}
          className="mySwiper w-full select-none"
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1680: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
          }}
        >
          {products}
        </Swiper>
      </>
    );
  } else {
    const products = data?.map((product, index) => {
      return (
        <div className="col-span-1 relative item" onClick={closeMenu}>
          <div className="border border-[#e6e6e6] rounded-lg overflow-hidden h-full flex flex-col gap-5">
            <div
              className={`${classes.item} max-md:h-[240px] md:h-[400px] lg:h-[350px] item relative`}
            >
              {loading ? (
                <div className="h-full w-full bg-[#f8f8f8] object-cover animate-pulse"></div>
              ) : product?.image[0] ? (
                <Link href={`/proizvod/${product?.slug_path}`} scroll={true}>
                  <Image
                    src={convertHttpToHttps(product?.image[0])}
                    alt={product?.basic_data?.name}
                    width={22000}
                    height={22000}
                    className={`transition-all duration-200 opacity-100 object-cover w-full h-full`}
                    loading="lazy"
                  />
                </Link>
              ) : (
                <Link href={`/proizvod/${product?.slug_path}`} scroll={true}>
                  <Image
                    src={Missing}
                    alt={product?.basic_data?.name}
                    width={22000}
                    height={22000}
                    className={`transition-all duration-200 opacity-100 object-cover w-full h-full`}
                    loading="lazy"
                  />
                </Link>
              )}

              {product?.stickers[0]?.name ? (
                <div className="py-[0.6rem] px-[0.8rem] absolute top-0 left-0 bg-croonus-3 w-fit text-white text-[0.8rem] rounded-br-lg">
                  <span>{product?.stickers[0]?.name}</span>
                </div>
              ) : null}
            </div>
            <Link href={`/proizvod/${product?.slug}`}>
              <div
                className={`${classes.item} flex-col flex relative z-[19] pl-[0.6rem]`}
              >
                <span className="font-semibold text-base hover:text-[#a3a3a3] rows2 max-md:text-[0.85rem] max-md:leading-4 row1 mt-[1rem] cursor-pointer">
                  {product?.basic_data?.name}
                </span>

                <div className="max-h-[3rem] min-h-[2.8rem] flex items-center">
                  <span className="text-[0.9rem] flex text-[#939393] row2">
                    {product?.basic_data?.short_description}
                  </span>
                </div>
              </div>
            </Link>
            {/* <div className="mt-auto max-md:mt-2 flex max-md:items-start flex-wrap max-md:gap-1 items-center gap-[10px]">
              {product?.price?.discount?.active && (
                <span
                  className={`line-through text-sm whitespace-nowrap ml-[0.6rem]`}
                >
                  {currencyFormat(product?.price?.price?.original)}
                </span>
              )}
              <div className="bg-croonus-3 max-md:text-[0.8rem] text-lg font-bold text-start text-white p-[0.4rem] w-full pl-[0.6rem] rounded-b-lg flex">
                <ProductPrice
                  price={product?.price}
                  className="font-semibold text-lg px-2 py-1 whitespace-nowrap"
                  inventory={product?.inventory}
                />
              </div>
            </div> */}
          </div>
        </div>
      );
    });
    return (
      <>
        {products}
        <ToastContainer />
      </>
    );
  }
};

export default Thumb;

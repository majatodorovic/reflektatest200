"use client";
import { useState } from "react";
import { useGlobalAddToCart, useGlobalAddToWishList } from "@/app/api/globals";
import { useRouter } from "next/navigation";
import { currencyFormat } from "../../helpers/functions";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import Link from "next/link";
import classes from "../RelatedProducts/RelatedProducts.module.css";
import "keen-slider/keen-slider.min.css";

import Wishlist from "../../assets/Icons/heart.png";
import ProductPrice from "@/components/ProductPrice/ProductPrice";
import Translated from "@/context/state";

const NewProducts = ({ newProducts = [], loading }) => {
  const globalAddToWishlist = useGlobalAddToWishList();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slides: {
      perView: 4,
    },
    breakpoints: {
      "(max-width: 1024px)": {
        slides: {
          perView: 1.2,
          spacing: 20,
        },
      },
      "(min-width:1024px)": {
        slides: {
          perView: 4,
          spacing: 20,
        },
      },
      "(min-width:1440px)": {
        slides: {
          perView: 5,
          spacing: 30,
        },
      },
      "(min-width:1680px)": {
        slides: {
          perView: 5,
          spacing: 30,
        },
      },
    },
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });
  const items = newProducts?.map((item, index) => {
    return (
      <div
        key={item?.id}
        className={`slider col-span-1  flex-col keen-slider__slide number-slide${
          index + 1
        }`}
      >
        <div className="border border-[#e6e6e6] rounded-lg overflow-hidden">
          <div
            className={`${classes.item} relative flex items-center justify-center px-[0.8rem] pt-[0.8rem] pb-[0.2rem]`}
          >
            <div className="h-[280px] relative">
              {item?.stickers[0]?.name ? (
                <div className="pb-[0.6rem] pt-[0.8rem] px-[0.8rem] absolute -top-[1rem] -left-[1rem] bg-croonus-3 w-fit text-white text-[0.8rem] rounded-br-lg">
                  <span>{item?.stickers[0]?.name}</span>
                </div>
              ) : null}
              <Link href={`/proizvod/${item?.slug_path}`} key={item?.id}>
                {item?.image[0]?.toString() && (
                  <Image
                    src={item?.image[0]?.toString()}
                    width={2222}
                    height={2222}
                    className="h-full object-cover"
                    alt={item?.basic_data?.name}
                  />
                )}
              </Link>
            </div>
            {/*<div*/}
            {/*  className={`${classes.more} absolute bottom-[0.1rem] mx-auto hidden w-[100%] justify-center py-2 text-center bg-croonus-3 text-white max-lg:hidden z-50`}*/}
            {/*>*/}

            {/*</div>*/}
            {/* <div className="absolute top-2 left-2 rounded-full bg-croonus-3 bg-opacity-80 hover:bg-opacity-40">
            <Image
              src={Wishlist}
              height={32}
              width={32}
              alt="Reflekta"
              className={`p-[4px]`}
              onClick={() => {
                addToWishlist(item?.id);
              }}
            />
          </div> */}
          </div>

          <div className="mt-1 flex flex-col gap-1 max-lg:justify-center max-lg:items-start">
            <Link
              href={`/proizvod/${item.slug_path}`}
              key={item?.id}
              className="pl-[0.6rem]"
            >
              <span className="font-semibold text-base hover:text-[#a3a3a3] rows2 max-md:text-[0.85rem] max-md:leading-4 row1 mt-[1rem]">
                {item?.basic_data?.name}
              </span>
              <div className="min-h-[2.8rem] flex items-center">
                <span className="text-[0.9rem] flex text-[#939393] row2">
                  {item?.basic_data?.short_description}
                </span>
              </div>
            </Link>

            <div className="mt-0 max-md:mt-2 flex max-md:items-start flex-wrap max-md:gap-1 items-center gap-[10px] w-full">
              {/* {item?.price?.discount?.active && (
                <span className={`line-through text-sm whitespace-nowrap ml-[0.6rem]`}>
                  {currencyFormat(item?.price?.price?.original)}
                </span>
              )}
              <div className="bg-croonus-3 max-md:text-[0.8rem] text-lg font-bold text-start text-white p-[0.4rem] w-full pl-[0.6rem] rounded-b-lg flex">
                <ProductPrice
                  price={item?.price}
                  className="font-semibold text-lg px-2 py-1 whitespace-nowrap"
                  inventory={item?.inventory}
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  });
  return (
    <>
      {loading ? (
        <div className={`h-[200px] animate-pulse w-full bg-slate-300`}></div>
      ) : (
        <div className="max-md:mx-5 md:px-[3rem] pt-[4rem] pb-[1rem]">
          <div className="relative col-span-2 md:col-span-1 flex flex-row justify-between gap-5  lg:col-span-1">
            <h1
              className={`${classes.border} text-2xl max-md:text-xl text-black font-normal`}
            >
              Novo u ponudi
            </h1>
            <div className="flex items-center gap-3">
              <Link
                className="text-black cursor-pointer"
                href={`/new_in`}
              >
                <Translated Key="view_all_products" />
              </Link>
              <div className="max-md:hidden">
                <i className="fa-solid fa-arrow-right text-[#f15923] text-lg"></i>
              </div>
            </div>
          </div>
          <div className="mt-7 grid grid-cols-2 gap-x-3 max-lg:gap-y-5 lg:grid-cols-4 2xl:grid-cols-4 4xl:grid-cols-5"></div>
          <div
            ref={sliderRef}
            className="slider keen-slider grid md:col-span-4 lg:col-span-3 4xl:col-span-4 4xl:grid-cols-5 mt-[1.625rem] mb-[2rem]"
          >
            {items}
          </div>
        </div>
      )}
    </>
  );
};

export default NewProducts;

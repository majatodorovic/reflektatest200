import { useState } from "react";
import { useGlobalAddToCart, useGlobalAddToWishList } from "@/app/api/globals";
import { currencyFormat } from "../../helpers/functions";
import { useKeenSlider } from "keen-slider/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import classes from "./DealsItem.module.css";
import "keen-slider/keen-slider.min.css";

import Wishlist from "../../assets/Icons/heart.png";
import ProductPrice from "../ProductPrice/ProductPrice";

const DealsItem = ({ products = [], action3 }) => {
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
          spacing: 40,
        },
      },
      "(min-width:1024px)": {
        slides: {
          perView: 4,
          spacing: 40,
        },
      },
      "(min-width:1440px)": {
        slides: {
          perView: 4,
          spacing: 40,
        },
      },
      "(min-width:1680px)": {
        slides: {
          perView: 4,
          spacing: 40,
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
  const items = products?.map((item, index) => {
    return (
      <div
        key={item?.id}
        className={`slider col-span-1  flex-col keen-slider__slide number-slide${
          index + 1
        }`}
      >
        <div
          className={`${classes.item} relative flex items-center justify-center`}
        >
          <div className="h-[350px]">
            {item?.stickers[0]?.name ? (
              <div className="px-[0.7rem] py-[0.05rem] absolute top-1 right-1 bg-[#b0976d] w-fit text-white text-[0.9rem]">
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
          {/*  className={`${classes.more} absolute bottom-3 mx-auto hidden w-[90%] justify-center py-2 text-center bg-croonus-1 text-white  max-lg:hidden`}*/}
          {/*>*/}
          {/*  {item?.categories?.length > 0 ? (*/}
          {/*    <Link*/}
          {/*      href={`/proizvod/${item.categories[0].slug}/${item?.slug}`}*/}
          {/*      key={item?.id}*/}
          {/*    >*/}
          {/*      <span className="">Saznajte više </span>*/}
          {/*    </Link>*/}
          {/*  ) : null}*/}
          {/*</div>*/}
        </div>

        <div className="mt-1 flex flex-col gap-1 lg:pl-3 max-lg:items-start max-lg:justify-start">
          {item?.categories?.length > 0 ? (
            <Link
              href={`/proizvod/${item.categories[0].slug}/${item?.slug}`}
              key={item?.id}
            >
              <span className="font-semibold text-base text-white rows2 max-md:text-[0.85rem] max-md:leading-4 row1 mt-[1rem]">
                {item?.basic_data?.name}
              </span>
              <div className="min-h-[2.8rem] flex items-center">
                <span className="text-[0.9rem] flex text-[#939393] row2">
                  {item?.basic_data?.short_description}
                </span>
              </div>
            </Link>
          ) : null}
          <div className="mt-0 max-md:mt-2 flex max-md:items-start flex-wrap max-md:gap-1 items-center gap-[10px]">
            
            {item?.price?.discount?.active && (
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
              </div>
            
            </div>
        </div>
      </div>
    );
  });
  return (
    <>
      <div className="relative col-span-2 md:col-span-1 flex flex-col justify-center gap-5  lg:col-span-1">
        <h1
          className={`${classes.border} relative max-md:text-xl text-[2rem] font-normal text-black`}
        >
          Proizvodi koje drugi{" "}
          <span className="font-medium">najčešće kupuju</span>
        </h1>
        <h1 className="relative afterborder max-md:mt-5 mt-10">
          <span className="text-base text-black relative">
            Doživite potpuno nova iskustva...
          </span>
        </h1>
        {products?.length > 4 && (
          <div className="flex flex-row gap-5 divide-x divide-x-2 divide-white mt-8">
            <i
              className="fa-solid fa-arrow-left text-white text-base cursor-pointer"
              onClick={() => instanceRef.current.prev()}
            ></i>
            <i
              className="fa-solid fa-arrow-right pl-5 text-white text-base cursor-pointer"
              onClick={() => instanceRef.current.next()}
            ></i>
          </div>
        )}
      </div>
      <div
        ref={sliderRef}
        className="slider keen-slider grid md:col-span-2 lg:col-span-3 4xl:col-span-4 4xl:grid-cols-4 mt-[1.625rem]"
      >
        {items}
      </div>
    </>
  );
};

export default DealsItem;

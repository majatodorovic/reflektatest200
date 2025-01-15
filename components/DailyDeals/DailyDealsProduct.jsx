import { useEffect, useState } from "react";
import { list } from "@/app/api/api";
import { useGlobalAddToWishList } from "@/app/api/globals";
import { currencyFormat } from "../../helpers/functions";
import Translated from "../../context/state";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import "swiper/css";
import classes from "./DailyDeals.module.css";

import Wishlist from "../../assets/Icons/heart.png";
import ProductPrice from "../ProductPrice/ProductPrice";

const DailyDealsProduct = ({ recommendedProducts, action4 }) => {
  const [products, setProducts] = useState(recommendedProducts);
  const uniqueNames = [];
  const uniqueIds = [];
  const [selectedCategory, setSelectedCategory] = useState(null);

  const items = products?.map((item, index) => {
    return (
      <SwiperSlide
        key={item?.id}
        className={`flex-col keen-slider__slide max-w-[345px] number-slide${
          index + 1
        }`}
      >
        <div className="bg-white rounded-lg overflow-hidden">
          <div
            className={`${classes.item} relative flex items-center justify-center`}
          >
            <div className="h-[280px] w-full pt-[0.6rem]">
              {item?.stickers[0]?.name ? (
                <div className="pb-[0.6rem] pt-[0.6rem] px-[0.8rem] absolute top-0 left-0 bg-croonus-3 w-fit text-white text-[0.8rem] rounded-br-lg">
                  <p>{item?.stickers[0]?.name}</p>
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
                {item?.image[0]?.length === 0 && (
                  <div key={"missing"}>
                    <Image
                      alt={item?.basic_data?.name}
                      className="h-full object-cover"
                      src={"/assets/Images/missingphoto.jpg"}
                      width={2222}
                      height={2222}
                    />
                  </div>
                )}
              </Link>
            </div>
            {/*<div*/}
            {/*  className={`${classes.more} absolute bottom-3 mx-auto hidden w-[90%] justify-center py-2 text-center bg-[#f15923] text-white hover:bg-opacity-90  max-lg:hidden`}*/}
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

          <div className="mt-1 flex flex-col gap-1 max-lg:items-start max-lg:justify-start">
            <Link href={`/proizvod/${item?.slug_path}`} key={item?.id}>
              <span className="font-semibold text-base text-black rows2 max-md:text-[0.85rem] max-md:leading-4 row1 mt-[1rem] ml-[0.4rem]">
                {item?.basic_data?.name}
              </span>
              <div className="min-h-[2.8rem] flex items-center">
                <span className="text-[0.9rem] flex text-[#939393] ml-[0.4rem] row2">
                  {item?.basic_data?.short_description}
                </span>
              </div>
            </Link>

            {/* <div className="mt-0 max-md:mt-2 flex max-md:items-start flex-wrap max-md:gap-1 items-center gap-[10px] w-full">
              {item?.price?.discount?.active && (
                <span
                  className={`line-through text-sm whitespace-nowrap ml-[0.6rem]`}
                >
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
            </div> */}
          </div>
        </div>
      </SwiperSlide>
    );
  });
  return (
    <>
      <div className="grid grid-cols-1 gap-x-2 max-md:gap-y-5 gap-y-10 lg:mt-5 lg:grid-cols-4 2xl:grid-cols-4 4xl:grid-cols-5 lg:gap-x-12 lg:gap-y-12">
        <div className="max-lg:col-span-1 lg:col-span-4 2xl:col-span-4 4xl:col-span-5">
          <div className="relative flex flex-col justify-between max-lg:gap-3 lg:flex-row lg:items-center">
            <h1
              className={`${classes.border} text-2xl max-md:text-xl text-black font-normal`}
            >
              {action4[0]?.title}{" "}
            </h1>
            <div className="flex flex-row max-md:hidden items-center gap-6">
              {recommendedProducts?.map((category) => {
                const uniqueCategories = category?.categories?.filter(
                  (item, index, arr) =>
                    arr.findIndex((el) => el.name === item.name) === index
                );

                if (uniqueNames.includes(uniqueCategories[0]?.name)) {
                  return null;
                } else {
                  uniqueNames.push(uniqueCategories[0]?.name);
                  return (
                    <div className="" key={category.id}>
                      <button
                        className={
                          selectedCategory === uniqueCategories[0]?.id
                            ? `font-bold active-button uppercase text-xl underline text-black`
                            : `font-normal uppercase text-lg text-black`
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          let newProducts = [...recommendedProducts];
                          newProducts = recommendedProducts?.filter((item) => {
                            return (
                              item?.categories[0]?.id ===
                              uniqueCategories[0]?.id
                            );
                          });
                          setProducts(newProducts);
                          setSelectedCategory(uniqueCategories[0]?.id);
                        }}
                      >
                        {uniqueCategories[0]?.name}
                      </button>
                    </div>
                  );
                }
              })}
            </div>
            <div className="md:hidden pr-5">
              {uniqueIds?.length > 0 && (
                <select
                  onChange={(e) => {
                    let newProducts = [...recommendedProducts];
                    newProducts = recommendedProducts?.filter((item) => {
                      return item?.categories[0]?.id === Number(e.target.value);
                    });
                    setProducts(newProducts);
                  }}
                  className="rounded-md bg-[#b0976d] border-none bg-opacity-50 text-white w-full"
                >
                  {recommendedProducts?.map((category) => {
                    const uniqueCategories = category?.categories?.filter(
                      (item, index, arr) =>
                        arr.findIndex((el) => el.name === item.name) === index
                    );

                    if (uniqueIds.includes(uniqueCategories[0]?.id)) {
                      return null;
                    } else {
                      uniqueIds.push(uniqueCategories[0]?.id);
                      return (
                        <option
                          key={uniqueCategories[0]?.id}
                          value={Number(uniqueCategories[0]?.id)}
                        >
                          {uniqueCategories[0]?.name}
                        </option>
                      );
                    }
                  })}
                </select>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Link
                className="text-black cursor-pointer"
                href={`/sekcija/recommendation`}
              >
                <Translated Key="view_all_products" />
              </Link>
              <div className="max-md:hidden">
                <i className="fa-solid fa-arrow-right text-[#f15923] text-lg"></i>
              </div>
            </div>
          </div>
        </div>

        <Swiper
          className="keen-slider flex gap-3 col-span-1 lg:col-span-4 4xl:col-span-5 mt-[1.625rem]"
          loop={true}
          breakpoints={{
            320: {
              slidesPerView: products?.length > 1 ? 1.2 : 1,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1440: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
            1700: {
              slidesPerView: process.env.SLIDESPERVIEW1,
              spaceBetween: 30,
            },
          }}
        >
          {items}
        </Swiper>
      </div>
    </>
  );
};

export default DailyDealsProduct;

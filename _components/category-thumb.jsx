"use client";

import Link from "next/link";
import classes from "@/components/CategoriesPageComponents/Products/ProductsItem.module.css";
import Image from "next/image";
import Missing from "@/assets/Images/missingphoto.jpg";
import { convertHttpToHttps } from "@/helpers/convertHttpToHttps";

export const CategoryThumb = ({ data, loading }) => {
  return data?.map((category) => {
    return (
      <Link
        href={`/kategorije/${category?.slug_path}`}
        className="col-span-1 relative item"
      >
        <div className="border border-[#e6e6e6] rounded-lg overflow-hidden h-full flex flex-col gap-5">
          <div
            className={`${classes.item} max-md:h-[240px] md:h-[400px] lg:h-[350px] item relative`}
          >
            {loading ? (
              <div className="h-full w-full bg-[#f8f8f8] object-cover animate-pulse"></div>
            ) : category?.image ? (
              <Image
                src={convertHttpToHttps(category?.image)}
                alt={category?.name}
                width={22000}
                height={22000}
                className={`transition-all duration-200 opacity-100 object-cover w-full h-full`}
                loading="lazy"
              />
            ) : (
              <Image
                src={Missing}
                alt={category?.name}
                width={22000}
                height={22000}
                className={`transition-all duration-200 opacity-100 object-cover w-full h-full`}
                loading="lazy"
              />
            )}
          </div>
          <div
            className={`${classes.item} flex-col flex relative z-[19] pl-[0.6rem]`}
          >
            <span className="font-semibold text-base hover:text-[#a3a3a3] rows2 max-md:text-[0.85rem] max-md:leading-4 row1 mt-[1rem] cursor-pointer">
              {category?.name}
            </span>

            <div className="max-h-[3rem] min-h-[2.8rem] flex items-center">
              <span className="text-[0.9rem] flex text-[#939393] row2">
                {category?.short_description}
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  });
};

import { useState } from "react";
import { sortProductsByPriceAsc } from "./SortByPrice";
import { sortProductsByPriceDesc } from "./SortByPrice";
import Link from "next/link";
import Image from "next/image";
import classes from "./ProductsItem.module.css";

import Wishlist from "../../../assets/Icons/heart.png";


const ProductsItem = ({ products = [] }) => {
    const [sortedProducts, setSortedProducts] = useState(products);
  const handlePriceSortAsc = () => {
    const sorted = sortProductsByPriceAsc([...sortedProducts]);
    setSortedProducts(sorted);
  };
  const handlePriceSortDesc = () => {
    const sorted = sortProductsByPriceDesc([...sortedProducts]);
    setSortedProducts(sorted);
  };
  const items = sortedProducts.map((item) => (
    <div key={item.id} className={`${classes.item} col-span-1`}>
      <div className={`${classes.item} relative flex justify-center`}>
        
        <Link href={`/product/${item.id}`}>
          {item.image[0].toString() && (
            <Image
              src={item.image[0].toString()}
              width={3300}
              height={3300}
              className="h-auto w-full"
              alt={item.basic_data.name}
            />
          )}
        </Link>
        <div
          className={`${classes.more} absolute bottom-3 mx-auto hidden w-[90%] justify-center py-2 text-center bg-croonus-3 text-white  hover:bg-opacity-90 max-lg:hidden`}
        >
          <Link href={`/product/${item.id}`}>
            <span>More Details</span>{" "}
          </Link>
        </div>
        <div className="absolute top-2 left-2 rounded-full hover:bg-croonus-2 hover:bg-opacity-30">
          <Image
            src={Wishlist}
            height={32}
            width={32}
            alt=""
            className="p-[4px]"
          />
        </div>
      </div>
      <div className="mt-1 flex flex-col gap-1 max-lg:items-center max-lg:justify-center">
        <span className="text-base text-croonus-3">{item.basic_data.name}</span>
        <div className="flex flex-row items-center gap-1">
          <span className="text-sm text-croonus-2 line-through">
            ${item.price.price.original}{" "}
          </span>
          <span className="text-base font-bold text-croonus-3">USD 299</span>
        </div>
        <span className="text-sm font-bold text-red-500">50% OFF</span>
      </div>
    </div>
  ));
  return <>{items}</>;
};

export default ProductsItem;

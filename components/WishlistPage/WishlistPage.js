"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCartContext } from "@/app/api/cartContext";
import { list } from "@/app/api/api";
import Link from "next/link";
import Breadcrumbs from "../../helpers/generateBreadCrumbsServer";
import Layout from "../../components/UI/Layout";
import WishlistItems from "../../components/WishlistItems/WishlistItems";

const WishlistPage = () => {
  const [wishListData, setWishListData] = useState();
  const [, , wishlist] = useCartContext();

  useEffect(() => {
    list("/wishlist")
      .then((response) => setWishListData(response?.payload))
      .catch((error) => console.warn(error));
  }, [wishlist]);

  const wishListProducts = wishListData?.items ?? [];
  const router = useRouter();
  return (
    <div className="mx-auto 4xl:container">
      {/*<div className="bg-[#191919] max-md:py-2 py-4">*/}
      {/*  <Layout>*/}
      {/*    <div className="flex  flex-col  justify-between max-lg:items-center max-lg:gap-3 lg:flex-row ">*/}
      {/*      <div className="flex flex-col gap-2 w-full">*/}
      {/*        <div className="flex flex-row gap-2 items-center">*/}
      {/*          <i className="text-white fa-solid fa-chevron-left text-lg w-[10px]" />*/}
      {/*          <span*/}
      {/*            className="text-white cursor-pointer"*/}
      {/*            onClick={() => router.back()}*/}
      {/*          >*/}
      {/*            Nazad*/}
      {/*          </span>*/}
      {/*        </div>*/}
      {/*        <h1 className="text-2xl max-md:text-lg font-bold text-white">*/}
      {/*          Vaša lista želja*/}
      {/*        </h1>*/}
      {/*      </div>*/}
      {/*      <Breadcrumbs />*/}
      {/*    </div>*/}
      {/*  </Layout>*/}
      {/*</div>*/}
      <Layout>
        <div className="py-10 max-md:pt-3 max-md:my-[6rem]">
          <div className="grid  grid-cols-2 gap-x-5 max-md:gap-y-10 lg:grid-cols-4">
            {wishListProducts.map((item) => (
              <div key={item?.wishlist?.id}>
                <WishlistItems
                  items={item?.wishlist?.id}
                  product={item?.product}
                />
              </div>
            ))}
          </div>
          {wishListProducts.length === 0 && (
            <div className="text-center flex items-center justify-center py-10">
              <div className="flex border p-6 rounded-3xl flex-col items-center gap-4 p-[2rem] text-black">
                <div className="title">
                  <p className="text-2xl font-medium">Lista želja</p>
                </div>
                <div className="content">
                  <p className="text-base">
                    Trenutno ne postoji sadržaj u Vašoj listi želja.{" "}
                  </p>
                </div>
                <div className="buttonHolder">
                  <div className="text-center">
                    <Link href="/">
                      <button className="bg-croonus-3 mt-[0.2rem] px-10 font-medium text-white hover:bg-opacity-80 py-4 rounded-lg">
                        Vrati se na početnu stranu
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default WishlistPage;

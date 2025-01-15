"use client";
import { useState, useEffect } from "react";

import { useSearchParams } from "next/navigation";
import { list } from "@/app/api/api";
import Thumb from "../CategoriesPageComponents/Products/Products";
import Link from "next/link";

const SearchPagee = () => {
  const [newProductsArray, setNewProductsArray] = useState();

  const params = useSearchParams();
  const search = params.get("search");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      await list(`/products/search/list`, {
        search,
      })
        .then((response) => {
          setNewProductsArray(response?.payload?.items);
        })
        .finally(() => {
          setTimeout(() => {
            setLoading(false);
          }, 1200);
        });
    };
    getProducts();
  }, [search]);

  return (
    <>
      <div className="flex flex-col gap-8 py-5 font-medium  max-lg:gap-8">
        <div className="w-[95%] mx-auto py-5">
          <h1 className="text-xl font-semibold ">Pretražili ste: {search}</h1>
        </div>
      </div>
      <div className="mx-auto w-[95%] lg:w-[95%] pb-[5rem]">
        <div
          className={`grid ${
            newProductsArray?.length > 0 ? `` : `flex-1`
          } max-md:grid-cols-2 gap-y-[40px] gap-x-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-[11px]`}
        >
          {loading ? (
            <>
              {Array.from({ length: 12 }, (x, i) => (
                <div
                  key={i}
                  className="max-md:h-[250px] h-[500px] max-md:w-full w-full col-span-1 bg-slate-300 object-cover animate-pulse"
                ></div>
              ))}
            </>
          ) : newProductsArray?.length > 0 ? (
            <Thumb data={newProductsArray} slider={false} loading={false} />
          ) : (
            <div
              className={`col-span-2 md:col-span-2 lg:col-span-3 2xl:col-span-4 text-left`}
            >
              <>
                <div className="mx-auto mt-10 max-lg:text-center max-md:flex max-md:items-center max-md:justify-center max-md:flex-col text-black lg:mt-10 mb-[3rem]">
                  <h1 className="text-2xl font-semibold ">
                    Ne postoji rezultat za vašu pretragu "{search}".
                  </h1>
                  <h2 className="mt-6 text-xl font-normal ">
                    Pomoć u pretrazi:
                  </h2>
                  <ul className="mt-6 text-lg  ">
                    <li>- Proverite greške u kucanju</li>
                    <li>- Koristite više generičkih termina za pretragu</li>
                    <li>
                      - Proizvod ili kategorija koju tražite možda još uvek nisu
                      dostupni na našem portalu. Kontaktirajte nas u cilju
                      dodatnog informisanja.
                    </li>
                    <li>
                      - Ukoliko vam je potrebna pomoć, u svakom trenutku nas
                      možete kontakirati pozivom na broj call centra:{" "}
                      {process.env.TELEPHONE}
                    </li>
                  </ul>
                  <Link
                    href="/"
                    className="mt-[1rem] max-md:w-[90%] max-md:mx-auto flex max-sm:justify-center rounded-xl bg-croonus-2 px-6 py-2 text-base text-white hover:bg-opacity-80 w-fit"
                  >
                    Početna strana
                  </Link>
                </div>
              </>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchPagee;

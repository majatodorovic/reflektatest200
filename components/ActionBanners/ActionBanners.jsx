"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { list} from "../../app/api/api"
import classes from './ActionBanners.module.css';

const ActionBanners = () => {

    const [landingPagesList, setLandingPagesList] = useState([]);

    useEffect(() => {
      const getLandingPages = async () => {
        const data = await list(`/landing-pages/list`, {search:"reflektapromo"}).then((response) =>
          setLandingPagesList(response?.payload)
        );
      };
      getLandingPages();
    }, []);

    return (
        <div className={`${classes["action-banners-holder"]}`}>
            <div className="md:px-[2rem] px-[0.4rem]">
                <div className="flex justify-around md:gap-3 max-md:flex-col">
                {landingPagesList?.items?.map((item, index) => {
                  return (

                      <Link
                      onClick={() => {
                        setOpen(false);
                      }}
                      href={`/promo/${item?.slug}`}
                      className="uppercase text-red-500 hover:translate-x-1 hover:text-slate-500 transition-all duration-300 text-lg  font-medium w-full md:w-[48%] rounded-lg overflow-hidden"
                    >
                        <div className="relative w-full h-[300px] max-md:h-[130px] max-md:my-[0.2rem]">
                            <Image src={item?.image}
                            alt="Reflekta"  
                            fill={true}
                            style={{ objectFit: "cover" }}
              />
                        </div>
             </Link>
                  );
                })}
                </div>
            </div>
        </div>
    )
};

export default ActionBanners;

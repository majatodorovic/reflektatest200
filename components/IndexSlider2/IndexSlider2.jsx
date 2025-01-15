"use client";
import Image from "next/image";
import classes from "./IndexSlider2.module.css";
import Link from "next/link";
import Translated from "../../context/state";
import check from "../../assets/Icons/checkred.png";
import { useEffect, useState } from "react";
import { list } from "@/app/api/api";

const IndexSlider2 = ({ indexBanner }) => {
  const [blog, setBlog] = useState([]);
  useEffect(() => {
    const fetchBlog = async () => {
      const fetchBlog = await list("news/category/list/all").then((res) =>
        setBlog(res?.payload?.items)
      );
    };
    fetchBlog();
  }, []);

  return (
    <>
      {indexBanner?.length > 0 && (
        <div className="border-b-2 border-b-white w-full relative max-sm:h-[400px] h-[600px]">
          <span className="borderDesc"></span>
          {indexBanner?.map((item) => (
            <>
              <Image
                key={item?.id}
                src={item?.image}
                alt="Reflekta"
                fill={true}
                style={{ objectFit: "cover" }}
              />
              <div className="indexDesc absolute h-[100%] w-[100%] max-sm:text-center flex max-md:items-center max-sm:bg-black/40 justify-center flex-col z-50 md:pl-[6rem]">
                <h1 className="text-white text-[2rem] w-[22rem] mb-[1.2rem] relative">
                  {item?.title}
                </h1>
                <div className={`${classes.borderDesc} flex flex-col`}>
                  <h1 className={`text-white mt-3 font-semibold text-xl`}>
                    {blog[0]?.basic_data?.title}
                  </h1>
                  <p
                    className={`text-white mt-3 font-light line-clamp-2 text-[0.9rem]`}
                    dangerouslySetInnerHTML={{
                      __html: blog[0]?.basic_data?.short_description,
                    }}
                  ></p>
                </div>
                <Link
                  className="text-white mt-[5rem] cursor-pointer font-light"
                  href={`/blog`}
                >
                  Pročitaj više
                </Link>
              </div>
            </>
          ))}
        </div>
      )}
    </>
  );
};

export default IndexSlider2;

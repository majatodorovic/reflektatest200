"use client";

import { useEffect, useState } from "react";
import { get, list } from "@/app/api/api";
import Image from "next/image";
import Thumb from "@/components/CategoriesPageComponents/Products/Products";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";

const LandingPage = ({ slug }) => {
  const [loadingBasicData, setLoadingBasicData] = useState(true);
  const [loadingThumb, setLoadingThumb] = useState(true);
  const [loadingConditions, setLoadingConditions] = useState(true);

  const [data, setData] = useState({
    basic_data: [],
    thumb: null,
    conditions: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      const basicDataResponse = await get(
        `/landing-pages/basic-data/${slug}`
      ).then((res) => {
        setData((prevData) => ({
          ...prevData,
          basic_data: res?.payload,
        }));
        setLoadingBasicData(false);
      });

      const thumbResponse = await list(`/landing-pages/thumb/${slug}`).then(
        (res) => {
          setData((prevData) => ({
            ...prevData,
            thumb: res?.payload?.items,
          }));
          setLoadingThumb(false);
        }
      );

      const conditionsResponse = await list(
        `/landing-pages/conditions/${slug}`
      ).then((res) => {
        setData((prevData) => ({
          ...prevData,
          conditions: res?.payload,
        }));
        setLoadingConditions(false);
      });
    };
    if (slug) {
      fetchData();
    }
  }, [slug]);

  return (
    <>
      <div className={`w-[90%] mx-auto`}>
        <div className={`mt-5 pb-10`}>
          <div className={`flex items-center flex-col justify-center`}>
            {loadingBasicData ? (
              <div className="h-[50px] mb-4 w-full bg-slate-300 object-cover animate-pulse"></div>
            ) : (
              <h1
                className={`text-2xl mt-3 mb-10 border-b pb-2 border-b-croonus-3 font-medium self-start w-full`}
              >
                {data?.basic_data?.name}
              </h1>
            )}
            <div className={`relative w-full`}>
              {loadingBasicData ? (
                <>
                  <div className="max-md:h-[250px] h-[350px] w-full bg-slate-300 object-cover animate-pulse"></div>
                </>
              ) : (
                data?.basic_data?.image && (
                  <Image
                    src={data?.basic_data?.image}
                    alt={``}
                    width={1920}
                    height={263}
                    priority
                    quality={100}
                    style={{ objectFit: "cover" }}
                    className={`w-full h-auto`}
                  />
                )
              )}
            </div>
            {loadingBasicData ? (
              <div className="h-[50px] w-full bg-slate-300 object-cover animate-pulse mt-5"></div>
            ) : (
              <>
                <div
                  className={`${
                    data?.basic_data?.gallery?.length > 0
                      ? `grid grid-cols-2 gap-x-5 gap-y-5`
                      : ``
                  } mt-10 flex w-full`}
                >
                  <div
                    className={`${
                      data?.basic_data?.gallery?.length > 0 &&
                      `col-span-1 max-sm:col-span-2`
                    }`}
                    dangerouslySetInnerHTML={{
                      __html: data?.basic_data?.description,
                    }}
                  />

                  <div
                    className={`${
                      data?.basic_data?.gallery?.length > 0
                        ? `block max-sm:col-span-2 col-span-1`
                        : `hidden`
                    }
                `}
                  >
                    <Swiper
                      style={{
                        width: "100%",
                        maxHeight: "500px",
                        minHeight: "350px",
                      }}
                      modules={[Pagination]}
                      pagination={{ clickable: true }}
                    >
                      {data?.basic_data?.gallery?.map((image) => {
                        return (
                          <SwiperSlide>
                            <div className={``}>
                              <div
                                className={`max-sm:h-[350px] relative h-[500px]`}
                              >
                                <Image
                                  src={image?.image}
                                  alt={``}
                                  fill
                                  priority
                                  quality={100}
                                  style={{ objectFit: "cover" }}
                                  className={`w-full h-auto`}
                                />
                              </div>
                            </div>
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  </div>
                </div>
              </>
            )}
            <div
              className={`grid ${
                data?.conditions?.length > 0 ? `` : `flex-1`
              } max-md:grid-cols-2 mt-16 w-full gap-y-[40px] gap-x-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-[11px]`}
            >
              {loadingConditions ? (
                <>
                  {Array.from({ length: 12 }, (x, i) => (
                    <div
                      key={i}
                      className="max-md:h-[250px] h-[500px] w-full col-span-1 bg-slate-300 object-cover animate-pulse"
                    ></div>
                  ))}
                </>
              ) : (
                <Thumb
                  data={data?.conditions?.items}
                  slider={false}
                  loading={false}
                />
              )}
            </div>
            <div
              className={`grid grid-cols-2 w-full md:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-5 mt-16`}
            >
              {loadingThumb ? (
                <>
                  {Array.from({ length: 4 }, (x, i) => (
                    <div
                      key={i}
                      className="max-md:h-[250px] h-[500px] w-full col-span-1 bg-slate-300 object-cover animate-pulse"
                    ></div>
                  ))}
                </>
              ) : (
                data?.thumb?.map((thumb) => {
                  return (
                    <div
                      className={`max-sm:col-span-2 col-span-1 flex flex-col items-center justify-center p-5 gap-3 border border-[#f0f0f0]  hover:scale-105 transition-all duration-500`}
                    >
                      {thumb?.name && (
                        <Link href={`${thumb?.url}`}>
                          {" "}
                          <h1 className={`text-2xl font-medium`}>
                            {thumb?.name}
                          </h1>
                        </Link>
                      )}
                      {thumb?.description && (
                        <p className={`text-center`}>{thumb?.description}</p>
                      )}
                      {thumb?.thumb_image && (
                        <Link href={`${thumb?.url}`}>
                          {" "}
                          <div className={``}>
                            <Image
                              src={thumb?.thumb_image}
                              alt={``}
                              width={500}
                              height={203}
                              priority
                              quality={100}
                              style={{ objectFit: "contain" }}
                              className={`w-full h-auto`}
                            />
                          </div>
                        </Link>
                      )}
                      {thumb?.button && (
                        <Link href={`${thumb?.url}`} className={`w-full`}>
                          <button
                            className={`bg-croonus-2 text-white p-2 mt-2 w-full hover:bg-opacity-90 transition-all`}
                          >
                            {thumb?.button}
                          </button>
                        </Link>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;

"use client";
import { useState, useCallback, useEffect } from "react";
import { list, get } from "../../app/api/api";
import Image from "next/image";
import careerImg from "../../assets/Icons/briefcase.png"
import Link from "next/link";
import dynamic from "next/dynamic";
import Layout from "@/components/UI/Layout";


const CareerPage = () => {
  const [career, setCareer] = useState([]);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchCareer = async () => {
      const fetchCareer = await list("career/list").then((res) =>
        setCareer(res?.payload?.items)
      );
    };
    fetchCareer();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const getData = await list(`/static-pages/content/karijera`).then(
        (res) => {
          console.log(res);
          setData(res?.payload);
        }
      );
    };

    getData();
  }, []);

  const [postNum, setPostNum] = useState(15);

  function handleClick() {
    setPostNum((prevPostNum) => prevPostNum + 3);
  }
  const numPostsLoaded = Math.min(postNum, career.length);
  const allPostsLoaded = numPostsLoaded === career.length;

  const staticData = data?.items?.map((item) => {
    return item;
  });

  return (
    <>
      <Layout>

        <div className="mx-auto 4xl:container text-black">
          <div className=" blogHolder mx-4 md:mb-[3rem] md:min-h-[400px]">
            <div className=" titleHolder text-center">
              <h1 className="mt-10 mb-6 text-center text-4xl font-bold uppercase">
                Karijera
              </h1>
              {staticData?.map((item) => {
                return (
                  <div dangerouslySetInnerHTML={{ __html: item?.content }}></div>
                )
              })}
            </div>
            <div className="grid grid-cols-1 gap-x-2 gap-y-10 lg:grid-cols-3 lg:gap-x-4 md:mt-[6rem] mt-[2rem] max-md:mb-[2rem]">
              {career?.slice(0, postNum).map((item) => {

                return (

                  <div className={`col-span-1 h-full w-full`} key={item?.id}>
                    <Link
                      href={`/karijera/${item?.id}`}
                      className={`flex flex-col gap-2 w-full h-[100%]`}
                    >
                      <div className="bg-[#f3f3f3] py-[1rem] px-[1rem] rounded-lg relative">
                        <h5 className="mt-2 mb-[1rem] text-[1.2rem] max-sm:text-[0.9rem] font-bold uppercase relative z-5">
                          {item?.name}
                        </h5>
                        <Image
                          src={careerImg}
                          width={160}
                          height={160}
                          className="absolute top-[18px] right-[30px] invert z-1 opacity-[64%]" />
                        <div className="flex text-sm">
                          <i className="fa-solid fa-user text-md max-md:text-2xl hover:text-[#a3a3a3] mr-3 mt-1"></i>

                          {item?.candidates_number > 1 ? (
                            <span >{item?.candidates_number} Izvršioca</span>
                          ) : (
                            <span >{item?.candidates_number} Izvršilac</span>
                          )}
                        </div>
                        <div className="flex text-sm">
                          <i className="fa-solid fa-location-dot text-md max-md:text-2xl hover:text-[#a3a3a3] mr-3 mt-1"></i>
                          <span>{item?.town_name}, {item?.country_name}</span>
                        </div>
                        <p className="mt-[1rem] text-[15px] relative z-4">{item?.short_description}</p>
                        <button className=" blogReadMore flex items-center text-[0.8rem] sm:text-[16px] bg-white border-2 border-white p-2 rounded-lg mt-[1rem] ml-auto">
                          Pročitajte više
                          <i className="fa-solid fa-arrow-right ml-2 h-[20px] text-base hover:text-croonus-4 " />
                        </button>

                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </Layout>
    </>
  );
};

export default CareerPage;

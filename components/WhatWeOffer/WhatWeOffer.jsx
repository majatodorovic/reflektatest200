"use client";
import { useState } from "react";
import Layout from "../UI/Layout";
import Image from "next/image";
import classes from "./WhatWeOffer.module.css";
import Translated from "../../context/state";
import logo from "../../assets/Images/Reflekta-logo.png";
import Icon1 from "../../assets/Icons/1.png";
import Icon2 from "../../assets/Icons/2.png";
import Icon3 from "../../assets/Icons/3.png";
import Icon4 from "../../assets/Icons/4.png";
import Link from "next/link";

const WhatWeOffer = () => {
  const [active, setActive] = useState({
    id: null,
    open: false,
  });

  return (
    <div className="bg-[#f8f8f8] max-md:py-6 py-12">
      <Layout>
        <div className="flex flex-col items-center justify-between lg:flex-row ">
          <div className="relative flex w-full flex-col gap-3 max-lg:text-center lg:w-[75%] items-center lg:items-start">
            <div className="flex max-md:flex-col max-md:items-center max-md:justify-center w-[100%] items-center">
              <h1
                className={`${classes.borderr} relative pb-2 text-2xl font-bold`}
              >
                O nama
              </h1>
              {/*<Image*/}
              {/*  src={logo}*/}
              {/*  alt=""*/}
              {/*  className="mx-auto max-md:self-center h-auto md:w-[14%] md:ml-[22rem] "*/}
              {/*/>*/}
            </div>
            <span className={classes.line}></span>
            <span className="text-base lg:w-[80%] pt-5 font-light">
              <Link href={`/stranica-u-izradi`}>
                <p className={`italic relative linehorizontal`}>
                  “Dobrodošli u prodavnicu u kojoj ćete imati priliku da
                  istražite nove i interesantne dizajne svetiljki. Takođe,
                  REFLEKTA DOO se bavi projektovanjem rasvete, u mogućnosti smo
                  da Vam predočimo kroz 3D vizualizaciju Vašeg prostora izgled i
                  isijavanje naših svetiljki. ”
                </p>
              </Link>
            </span>
          </div>
          <div className="grid max-md:mt-10 w-full grid-cols-2 grid-rows-2 gap-x-1 gap-y-1 max-lg:mt-4 lg:w-1/2">
            <div
              className={`${classes.icon} cursor-pointer bg-[#e7e7e7] md:h-[90px] max-md:min-h-[100%] max-md:self-start col-span-1 row-start-1 row-end-2 flex max-md:flex-col flex-row items-center justify-between p-3  max-lg:justify-center max-lg:text-center  rounded-lg`}
              onClick={() => {
                setActive({ id: 1, open: !active.open });
              }}
            >
              <div className="flex flex-col gap-2 max-w-[84%]">
                <h1 className="text-lg font-bold">
                  <Translated Key="title_benefit1" />{" "}
                </h1>
                {active.id === 1 && active.open && (
                  <div
                    className={`fixed z-[1000] top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center`}
                    onClick={() => {
                      setActive({ id: null, open: false });
                    }}
                  >
                    <div
                      className={`bg-white p-10 max-md:w-[95%] max-md:mx-auto rounded-lg relative z-[1001] flex flex-col gap-1 items-center justify-center`}
                    >
                      <div className={`${classes.image}  `}>
                        <Image
                          src={Icon3}
                          alt="Reflekta"
                          width={50}
                          height={50}
                          className={``}
                        />
                      </div>
                      <h1 className="text-lg font-bold">
                        <Translated Key="title_benefit1" />{" "}
                      </h1>
                      <span className="text-base">
                        <Translated Key="benefit1" />
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div className={`${classes.image}  `}>
                <Image
                  src={Icon3}
                  alt="Reflekta"
                  width={50}
                  height={50}
                  className={`mix-blend-color-burn`}
                />
              </div>
            </div>

            <div
              className={`${classes.icon} cursor-pointer bg-[#e7e7e7] md:h-[90px] max-md:min-h-[100%] max-md:self-start col-span-1 max-md:flex-col row-start-1 row-end-2 flex flex-row items-center justify-between p-3  max-lg:justify-center max-lg:text-center rounded-lg`}
              onClick={() => {
                setActive({ id: 2, open: !active.open });
              }}
            >
              <div className="flex flex-col gap-2 max-w-[84%]">
                <h1 className="text-lg font-bold ">
                  <Translated Key="title_benefit2" />{" "}
                </h1>
                {active.id === 2 && active.open && (
                  <div
                    className={`fixed z-[1000] top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center`}
                    onClick={() => {
                      setActive({ id: null, open: false });
                    }}
                  >
                    <div
                      className={`bg-white p-10 max-md:w-[95%] max-md:mx-auto rounded-lg relative z-[1001] flex flex-col gap-1 items-center justify-center`}
                    >
                      <div className={`${classes.image}  `}>
                        <Image
                          src={Icon2}
                          alt="Reflekta"
                          width={50}
                          height={50}
                          className={``}
                        />
                      </div>
                      <h1 className="text-lg font-bold">
                        <Translated Key="title_benefit2" />{" "}
                      </h1>
                      <span className="text-base">
                        <Translated Key="benefit2" />
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div className={`${classes.image}  `}>
                <Image src={Icon2} alt="Reflekta" width={50} height={48} />
              </div>
            </div>

            <div
              className={`${classes.icon} cursor-pointer md:h-[90px] max-md:min-h-[100%] bg-[#e7e7e7] max-md:self-start col-span-1 max-md:flex-col row-start-2 row-end-3 flex flex-row items-center justify-between p-3  max-lg:justify-center max-lg:text-center rounded-lg`}
              onClick={() => {
                setActive({ id: 3, open: !active.open });
              }}
            >
              <div className="flex flex-col max-md:items-start gap-2 max-w-[84%]">
                <h1 className="text-lg font-bold ">
                  <Translated Key="title_benefit3" />
                </h1>
                {active.id === 3 && active.open && (
                  <div
                    className={`fixed z-[1000] top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center`}
                    onClick={() => {
                      setActive({ id: null, open: false });
                    }}
                  >
                    <div
                      className={`bg-white p-10 max-md:w-[95%] max-md:mx-auto rounded-lg relative z-[1001] flex flex-col gap-1 items-center justify-center`}
                    >
                      <div className={`${classes.image}  `}>
                        <Image
                          src={Icon1}
                          alt="Reflekta"
                          width={50}
                          height={50}
                          className={``}
                        />
                      </div>
                      <h1 className="text-lg font-bold">
                        <Translated Key="title_benefit3" />{" "}
                      </h1>
                      <span className="text-base">
                        <Translated Key="benefit3" />
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div className={`${classes.image}  `}>
                <Image
                  src={Icon1}
                  alt="Reflekta"
                  width={50}
                  height={50}
                  className={`mix-blend-color-burn`}
                />
              </div>
            </div>

            <div
              className={`${classes.icon} cursor-pointer bg-[#e7e7e7] md:h-[90px] max-md:min-h-[100%] max-md:self-start col-span-1 max-md:flex-col row-start-2 row-end-3 flex flex-row items-center justify-between p-3  max-lg:justify-center max-lg:text-center rounded-lg`}
              onClick={() => {
                setActive({ id: 4, open: !active.open });
              }}
            >
              <div className="flex flex-col max-md:items-start gap-2 max-w-[84%]">
                <h1 className="text-lg font-bold ">
                  <Translated Key="title_benefit4" />
                </h1>
                {active.id === 4 && active.open && (
                  <div
                    className={`fixed z-[1000] top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center`}
                    onClick={() => {
                      setActive({ id: null, open: false });
                    }}
                  >
                    <div
                      className={`bg-white p-10 max-md:w-[95%] max-md:mx-auto rounded-lg relative z-[1001] flex flex-col gap-1 items-center justify-center`}
                    >
                      <div className={`${classes.image}  `}>
                        <Image
                          src={Icon4}
                          alt="Reflekta"
                          width={50}
                          height={50}
                          className={``}
                        />
                      </div>
                      <h1 className="text-lg font-bold">
                        <Translated Key="title_benefit4" />{" "}
                      </h1>
                      <span className="text-base">
                        <Translated Key="benefit4" />
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div className={`${classes.image}  `}>
                <Image src={Icon4} alt="Reflekta" width={50} height={50} />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default WhatWeOffer;

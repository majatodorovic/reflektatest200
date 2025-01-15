"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Logo from "../../assets/Images/logo.png";

const Footer = () => {
  const [isOpen, setOpen] = useState();
  const [isOpen2, setOpen2] = useState();
  const [isOpen3, setOpen3] = useState();

  const [isOpen5, setOpen5] = useState();

  const handleClick = () => {
    setOpen(!isOpen);
    setOpen2(false);
    setOpen3(false);
    setOpen5(false);
  };
  const handleClick2 = () => {
    setOpen2(!isOpen2);
    setOpen(false);
    setOpen3(false);
    setOpen5(false);
  };
  const handleClick3 = () => {
    setOpen3(!isOpen3);
    setOpen(false);
    setOpen2(false);
    setOpen5(false);
  };
  const handleClick5 = () => {
    setOpen5(!isOpen5);
    setOpen(false);
    setOpen2(false);
    setOpen3(false);
  };

  return (
    <div className="bg-croonus-2">
      <div className="w-[90%] mx-auto max-md:w-[95%] flex flex-col gap-5 md:pt-[2rem] md:pb-[1.8rem] py-[1rem]">
        <div className="flex flex-row justify-between max-md:flex-col max-md:justify-center  items-center">
          <div className="md:hidden">
            <div className="acc1">
              <button
                onClick={handleClick}
                className="text-white text-[1.125rem] font-bold max-md:mb-[1rem] buttonAcc"
              >
                Reflekta
              </button>
              {isOpen && (
                <div className="p-4">
                  <div className="flex flex-col gap-1">
                    <Link
                      href="/onama"
                      className="text-base text-white"
                    >
                      O nama
                    </Link>

                    <Link href="/reference" className="text-base text-white">
                      Reference
                    </Link>
                    <Link href="/kontakt" className="text-base text-white">
                      Kontakt
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <div className="acc2">
              <button
                onClick={handleClick2}
                className="text-white text-[1.125rem] font-bold max-md:mb-[1rem] buttonAcc"
              >
                Podrška
              </button>
              {isOpen2 && (
                <div className="p-4">
                  <div className="flex flex-col gap-1">
                    <Link
                      href="/stranica-u-izradi"
                      className="text-base text-white hover:text-[#a3a3a3]"
                    >
                      Projektni konsalting
                    </Link>
                    <Link
                      href="/stranica-u-izradi"
                      className="text-base text-white hover:text-[#a3a3a3]"
                    >
                      Kako postati distributer
                    </Link>
                    <Link
                      className={`text-base text-white hover:text-[#a3a3a3]`}
                      href={`/karijera`}
                    >
                      Karijera
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <div className="acc3">
              <button
                onClick={handleClick3}
                className="text-white text-[1.125rem] font-bold max-md:mb-[1rem] buttonAcc"
              >
                Informacije
              </button>
              {isOpen3 && (
                <div className="p-4">
                  <div className="flex flex-col gap-1">
                    <Link
                      href="/strana/politika-privatnosti"
                      className="text-base text-white hover:text-[#a3a3a3]"
                    >
                      Politika privatnosti
                    </Link>
                    <Link
                      href="/strana/zastita-licnih-podataka"
                      className="text-base text-white hover:text-[#a3a3a3]"
                    >
                      Zaštita ličnih podataka
                    </Link>
                    <Link
                      href="/strana/copyright"
                      className="text-base text-white hover:text-[#a3a3a3]"
                    >
                      Copyright
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div className="acc5">
              <button
                onClick={handleClick5}
                className="text-white text-[1.125rem] font-bold max-md:mb-[1rem] buttonAcc"
              >
                Kontakt
              </button>
              {isOpen5 && (
                <div className="p-4 !text-white">
                  <div className="flex flex-col gap-1">
                    <ul className="text-base">
                      <li>
                        <Link
                          href="https://goo.gl/maps/fiq9Gy4eYaAQ9R3QA"
                          rel="noopener norefferer"
                          target="_blank"
                        >
                          {process.env.STREET}
                        </Link>
                      </li>
                      <li className="mb-[1rem]">
                        {process.env.POSTCODE} {process.env.CITY},{" "}
                        {process.env.STATE}
                      </li>
                      <li>Radno vreme:</li>
                      <li>Radnim danima: 08 - 16h</li>
                      <li className="mb-[1rem]">Subotom: 09 - 14h</li>
                      <li>
                        <Link href="tel:+381216741990">+381 21 674 1990</Link>
                      </li>
                      <li>
                        <Link href="tel:+381 21 636 1705">
                          +381 21 636 1705
                        </Link>
                      </li>

                      <li className="mb-[1rem]">
                        <a
                          target={"_blank"}
                          href={`mailto:${process.env.EMAIL}`}
                        >
                          {process.env.EMAIL}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div
            className="flex flex-col max-md:w-full max-md:text-center self-start md:gap-10 max-md:mb-[2rem] max-md:hidden">
            <h1 className="text-white uppercase text-[1.125rem] font-bold max-md:mb-[1rem]">
              Reflekta
            </h1>
            <div className="flex flex-col gap-1">
              <Link
                href="/onama"
                className="text-base text-white hover:text-[#a3a3a3]"
              >
                O nama
              </Link>

              <Link
                href="/reference"
                className="text-base text-white hover:text-[#a3a3a3]"
              >
                Reference
              </Link>
              <Link
                href="/kontakt"
                className="text-base text-white hover:text-[#a3a3a3]"
              >
                Kontakt
              </Link>
            </div>
          </div>
          <div className="flex flex-col max-md:w-full max-md:text-center self-start md:gap-10 max-md:mb-[2rem] max-md:hidden">
            <h1 className="text-white uppercase text-[1.125rem] font-bold max-md:mb-[1rem]">
              Podrška
            </h1>
            <div className="flex flex-col gap-1">
              <Link
                href="/stranica-u-izradi"
                className="text-base text-white hover:text-[#a3a3a3]"
              >
                Projektni konsalting
              </Link>
              <Link
                href="/stranica-u-izradi"
                className="text-base text-white hover:text-[#a3a3a3]"
              >
                Kako postati distributer
              </Link>
              <Link
                className={`text-base text-white hover:text-[#a3a3a3]`}
                href={`/karijera`}
              >
                Karijera
              </Link>
            </div>
          </div>
          <div className="flex flex-col max-md:w-full max-md:text-center self-start md:gap-10 max-md:mb-[2rem] max-md:hidden">
            <h1 className="text-white uppercase text-[1.125rem] font-bold max-md:mb-[1rem]">
              Informacije
            </h1>
            <div className="flex flex-col gap-1">
              <Link
                href="/strana/politika-privatnosti"
                className="text-base text-white hover:text-[#a3a3a3]"
              >
                Politika privatnosti
              </Link>
              <Link
                href="/strana/zastita-licnih-podataka"
                className="text-base text-white hover:text-[#a3a3a3]"
              >
                Zaštita ličnih podataka
              </Link>
              <Link
                href="/strana/copyright"
                className="text-base text-white hover:text-[#a3a3a3]"
              >
                Copyright
              </Link>
            </div>
          </div>

          <div className="flex flex-col max-md:flex-row md:self-start md:gap-10 max-md:w-full max-md:text-center max-md:justify-center max-md:hidden">
            <h1 className="text-white text-[1.125rem] font-bold max-md:mb-[1rem] max-md:mr-[1rem] uppercase">
              Kontakt
            </h1>
            <ul className="text-base text-white">
              <Link
                href="https://goo.gl/maps/fiq9Gy4eYaAQ9R3QA"
                rel="noopener norefferer"
                target="_blank"
              >
                {process.env.STREET}
              </Link>
              <li className="mb-[1rem]">
                {process.env.POSTCODE} {process.env.CITY}, {process.env.STATE}
              </li>
              <li>Radno vreme:</li>
              <li>Radnim danima: 08 - 16h</li>
              <li className="mb-[1rem]">Subotom: 09 - 14h</li>
              <li>
                <Link href={`tel:+381216741990`}>+381 21 674 1990</Link>
              </li>
              <li>
                <Link href={`tel:+381 21 636 1705`}>+381 21 636 1705</Link>
              </li>

              <li className="mb-[1rem]">
                <a target={"_blank"} href={`mailto:${process.env.EMAIL}`}>
                  {process.env.EMAIL}
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-2 max-md:self-center md:self-start lg:max-w-[20%] max-md:w-[40%] max-sm:w-[100%] mb-[1rem]">
            <Link href="/">
              <Image
                src={Logo}
                alt="Reflekta"
                className="lg:mr-auto mx-auto w-auto h-auto w-[50%] max-w-[200px] min-w-[140px]"
              />
            </Link>
            <h1 className="text-white text-2xl font-bold mt-[0.2rem] mb-[2rem] relative afterborder2"></h1>
            <div className="mt-[10px] flex flex-col max-md:mx-auto max-md:mb-[2rem] ">
              <h5 className="text-[1.125rem] font-bold text-white uppercase">
                Pratite nas
              </h5>
              <div className="flex flex-col gap-3 max-md:text-center max-md:justify-center max-md:flex-row mt-[0.8rem]">
                <Link
                  href="https://www.facebook.com/Reflekta.shop"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="flex flex-row gap-5 max-md:justify-center hover:text-[#a3a3a3]">
                    <i className="fa-brands fa-facebook-f text-white text-2xl max-md:text-2xl hover:text-[#a3a3a3]"></i>
                    <span className="text-white text-base max-md:hidden hover:text-[#a3a3a3]">
                      Facebook
                    </span>
                  </div>
                </Link>
                <Link
                  href="https://www.instagram.com/Reflekta_shop/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="flex flex-row gap-5 max-md:justify-center ">
                    <div className="flex flex-row gap-5">
                      <i className="fa-brands fa-instagram text-white text-2xl max-md:text-2xl hover:text-[#a3a3a3]"></i>
                      <span className="text-white text-base max-md:hidden hover:text-[#a3a3a3]">
                        Instagram
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

"use client";
import Image from "next/image";
import Link from "next/link";
import Image1 from "../../assets/Icons/uspesna-kupovina.png";
import Image2 from "../../assets/Icons/neuspesno.png";
import { useRouter } from "next/navigation";
import { useCartContext } from "@/app/api/cartContext";
import { get } from "@/app/api/api";
import { useEffect, useState } from "react";
import { currencyFormat } from "@/helpers/functions";



const OrderSuccess = ({ order }) => {
  const router = useRouter();
  const [cart, , ,] = useCartContext();

  let conditions;
  if (order?.credit_card !== null && order) {
    if (order?.credit_card?.payment_status?.toLowerCase() === "approved") {
      conditions = (
        <div
          className={`grid grid-cols-2 w-[95%] lg:w-[90%] mx-auto gap-x-10 gap-y-10 md:divide-y md:divide-gray-200`}
        >
          <div className="flex items-center col-span-2 md:col-span-1 px-5 md:px-10 justify-center text-center relative">
            <div
              className={`md:after:absolute md:after:h-[90%] md:after:my-auto md:after:w-[1px] md:after:bg-gray-300 md:after:top-[30px] md:after:right-[30px]`}
            ></div>
            <div className="flex items-center justify-center text-center ">
              <div className="flex flex-col items-center gap-4 lg:p-[3.5rem]">
                <div>
                  <Image src={Image1} alt="Reflekta" width={130} height={130} />
                </div>
                <span className="text-lg font-medium">
                  BROJ PORUDŽBENICE: {order?.slug}
                </span>
                <span>
                  Uspešno ste izvršili plaćanje, račun Vaše platne kartice je
                  zadužen! SLEDI OBRADA PORUDŽBENICE NAKON ČEGA ĆETE DOBITI SVE
                  POTREBNE INFORMACIJE PUTEM E-MAILA KOJIM STE SE REGISTROVALI.
                </span>
                <span>Podaci o transakciji:</span>
                <span className="text-lg font-medium">
                  {" "}
                  Autorizacioni kod:{" "}
                  {order.credit_card.auth_code !== null
                    ? order.credit_card.auth_code
                    : "-"}{" "}
                </span>
                <span className="text-lg font-medium">
                  {" "}
                  Status transakcije:{" "}
                  {order.credit_card.payment_status !== null
                    ? order.credit_card.payment_status
                    : "-"}{" "}
                </span>
                <span className="text-lg font-medium">
                  {" "}
                  Kod statusa transakcije:{" "}
                  {order.credit_card.transaction_status_code !== null
                    ? order.credit_card.transaction_status_code
                    : "-"}{" "}
                </span>
                <span className="text-lg font-medium">
                  {" "}
                  Datum transakcije:{" "}
                  {order.credit_card.transaction_date !== null
                    ? order.credit_card.transaction_date
                    : "-"}{" "}
                </span>
                <span className="text-lg font-medium">
                  Statusni kod 3D transakcije:{" "}
                  {order.credit_card.status_code_3D_transaction !== null
                    ? order.credit_card.status_code_3D_transaction
                    : "-"}
                </span>
                <p className="mt-3 text-base">
                  Za sve dodatne informacije možete nas kontaktirati putem call
                  centra {process.env.TELEPHONE} ili putem emaila{" "}
                  {process.env.EMAIL}
                </p>
                <div>
                  <a href="/">
                    <button className="bg-croonus-3 mt-10 px-10 font-medium text-white hover:bg-opacity-80 py-4 rounded-lg">
                      Nastavi kupovinu{" "}
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`col-span-2 md:col-span-1 grid gap-y-[1.5rem] gap-x-[5.5rem] grid-cols-2 py-10 h-fit max-md:mt-5`}
          >
            <div className={`col-span-2 xl:col-span-1 relative flex flex-col`}>
              <h1
                className={`font-semibold text- border-b-2 border-b-gray-300`}
              >
                Pregled porudžbenice
              </h1>
              <p className={`mt-2 text-sm`}>
                Broj porudžbenice:{" "}
                <span className={`font-semibold`}>{order?.order?.slug}</span>
              </p>
              <p className={`mt-2 text-sm`}>
                Status porudžbenice:{" "}
                <span className={`font-semibold text-yellow-500`}>
                  Na čekanju
                </span>
              </p>
            </div>
            <div className={`col-span-2 xl:col-span-1 relative flex flex-col`}>
              <h1
                className={`font-semibold text- border-b-2 border-b-gray-300`}
              >
                Podaci o korisniku
              </h1>
              <p className={`mt-2 text-sm`}>
                Ime i prezime: &nbsp;
                <span>
                  {order?.billing_address?.first_name}{" "}
                  {order?.billing_address?.last_name}
                </span>
              </p>
              <p className={`mt-2 text-sm`}>
                E-mail adresa:
                <span> {order?.billing_address?.email}</span>
              </p>
              <p className={`mt-2 text-sm`}>
                Adresa korisnika:
                <span> {order?.billing_address?.address}</span>
              </p>
              <p className={`mt-2 text-sm`}>
                Adresa dostave:
                <span> {order?.shipping_address?.address}</span>
              </p>
            </div>
            <div className={`col-span-2 xl:col-span-1 relative flex flex-col`}>
              <h1
                className={`font-semibold text- border-b-2 border-b-gray-300`}
              >
                Poručeni artikli
              </h1>
              {order?.items?.map((item) => {
                return (
                  <Link href={`/proizvod/${item?.basic_data?.slug}`}>
                    <div
                      className={`flex mt-3 items-center gap-10`}
                      key={Math.random()}
                    >
                      <div>
                        <Image
                          src={item?.basic_data?.image}
                          alt={``}
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className={`flex flex-col`}>
                        <h1 className={`text-sm font-semibold`}>
                          {item?.basic_data?.name}
                        </h1>
                        <p className={`text-xs`}>{item?.basic_data?.sku}</p>
                        <p className={`mt-2 font-semibold text-smbg-croonus-3 w-fit p-1 text-white`}>
                          {currencyFormat(item?.price?.total_with_vat)}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div
              className={`col-span-2 xl:col-span-1 relative flex flex-col pb-7 max-md:mb-5`}
            >
              <h1
                className={`font-semibold text- border-b-2 border-b-gray-300`}
              >
                Podaci o trgovcu
              </h1>
              <p className={`mt-2 text-sm`}>
                Naziv:
                <span className={``}> {process.env.NAME}</span>
              </p>
              <p className={`mt-2 text-sm`}>
                PIB:
                <span>{process.env.PIB}</span>
              </p>
              <p className={`mt-2 text-sm`}>
                Adresa:
                <span>{process.env.ADDRESS}</span>
              </p>
            </div>
          </div>
        </div>
      );
    } else {
      conditions = (
        <div className="flex items-center justify-center py-10 text-center ">
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-white p-6">
            <div>
              <Image src={Image2} alt="Reflekta" width={130} height={130} />
            </div>

            <span className="text-lg font-medium">
              Plaćanje neuspešno, račun vaše platne kartice nije zadužen!
            </span>
            <span>
              Poštovani, Vaša kupovina je uspešno evidentirana ali plaćanje
              platnom karticom nije realizovano. Uskoro ćemo Vas kontaktirati
              radi realizacije Vaše kupovine.
            </span>

            <span className="text-lg font-medium">Podaci o transakciji:</span>
            <span className="text-lg font-medium">
              {" "}
              Autorizacioni kod:{" "}
              {order.credit_card.auth_code !== null
                ? order.credit_card.auth_code
                : "-"}{" "}
            </span>
            <span className="text-lg font-medium">
              {" "}
              Status transakcije:{" "}
              {order.credit_card.payment_status !== null
                ? order.credit_card.payment_status
                : "-"}{" "}
            </span>
            <span className="text-lg font-medium">
              {" "}
              Kod statusa transakcije:{" "}
              {order.credit_card.transaction_status_code !== null
                ? order.credit_card.transaction_status_code
                : "-"}{" "}
            </span>
            <span className="text-lg font-medium">
              {" "}
              Datum transakcije:{" "}
              {order.credit_card.transaction_date !== null
                ? order.credit_card.transaction_date
                : "-"}{" "}
            </span>
            <span className="text-lg font-medium">
              Statusni kod 3D transakcije:{" "}
              {order.credit_card.status_code_3D_transaction !== null
                ? order.credit_card.status_code_3D_transaction
                : "-"}
            </span>
            <p className="mt-2 text-base">
              Za sve dodatne informacije možete nas kontaktirati putem call
              centra {process.env.TELEPHONE} ili putem emaila{" "}
              {process.env.EMAIL}
            </p>
          </div>
        </div>
      );
    }
  } else {
    conditions = (
      <div
        className={`grid grid-cols-2 md:w-[90%] mx-auto gap-x-10 md:divide-y md:divide-gray-200`}
      >
        <div className="flex items-center col-span-2 md:col-span-1 px-10 justify-center py-10 text-center relative">
          <div className="flex flex-col items-center gap-4  p-[3.5rem] bg-croonus-gray rounded-lg h-full">
            <div>
              <Image src={Image1} alt="Reflekta" width={130} height={130} />
            </div>
            <div>
              <p className="text-lg font-medium">
                Uspešno ste napravili porudžbenicu!
              </p>
              <p className="text-base">Hvala Vam na ukazanom poverenju. </p>

              <p className="mt-2 text-sm">
                Uskoro ćemo Vas kontaktirati u cilju dodatnog informisanja.
              </p>
              <p className="mt-2 text-sm">
                Za sve dodatne informacije možete nas kontaktirati putem call
                centra {process.env.TELEPHONE} ili putem emaila{" "}
                {process.env.EMAIL}
              </p>
            </div>
            <div>
              <a href="/">
                <button className="bg-croonus-3 mt-10 px-10 font-medium text-white hover:bg-opacity-80 py-4 rounded-lg">
                  Nastavi kupovinu{" "}
                </button>
              </a>
            </div>
          </div>
        </div>
        <div
          className={`col-span-2 md:col-span-1 grid gap-y-[1.5rem] gap-x-[1.5rem] grid-cols-2 py-10 max-md:mt-5`}
        >
          <div className={`col-span-2 xl:col-span-1 relative flex flex-col bg-croonus-gray rounded-lg p-[2rem] h-[245px]`}>
            <h1 className={`font-semibold text- border-b-2 border-b-gray-300`}>
              Pregled porudžbenice
            </h1>
            <p className={`mt-2 text-sm`}>
              Broj porudžbenice:{" "}
              <span className={`font-semibold`}>{order?.order?.slug}</span>
            </p>
            <p className={`mt-2 text-sm`}>
              Status porudžbenice:{" "}
              <span className={`font-semibold text-yellow-500`}>
                Na čekanju
              </span>
            </p>
          </div>
          <div className={`col-span-2 xl:col-span-1 relative flex flex-col bg-croonus-gray rounded-lg p-[2rem] h-[245px]`}>
            <h1 className={`font-semibold text- border-b-2 border-b-gray-300`}>
              Podaci o korisniku
            </h1>
            <p className={`mt-2 text-sm`}>
              Ime i prezime: &nbsp;
              <span className={`font-semibold`}>
                {order?.billing_address?.first_name}{" "}
                {order?.billing_address?.last_name}
              </span>
            </p>
            <p className={`mt-2 text-sm`}>
              E-mail adresa:
              <span className={`font-semibold`}> {order?.billing_address?.email}</span>
            </p>
            <p className={`mt-2 text-sm`}>
              Adresa korisnika:
              <span className={`font-semibold`}> {order?.billing_address?.address}</span>
            </p>
            <p className={`mt-2 text-sm`}>
              Adresa dostave:
              <span className={`font-semibold`}> {order?.shipping_address?.address}</span>
            </p>
          </div>
          <div className={`col-span-2 xl:col-span-1 relative flex flex-col bg-croonus-gray rounded-lg p-[2rem] h-[245px] overflow-y-scroll scrollCustom`}>
            <h1 className={`font-semibold text- border-b-2 border-b-gray-300`}> Poručeni artikli</h1>
           
           
            {order?.items?.map((item) => {
              return (
                <Link href={`/proizvod/${item?.basic_data?.slug}`}>
                  <div
                    className={`flex mt-3 items-center gap-10`}
                    key={Math.random()}
                  >
                    <div>
                      <Image
                        src={item?.basic_data?.image}
                        alt={``}
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className={`flex flex-col gap-y-1`}>
                      <h1 className={`text-sm font-semibold`}>
                        {item?.basic_data?.name}
                      </h1>
                      <p className={`text-xs`}>{item?.basic_data?.sku}</p>
                      <p className={`mt-2 font-semibold text-sm bg-croonus-3 w-fit p-1 text-white rounded-sm`}>
                        {currencyFormat(item?.price?.total_with_vat)}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div
            className={`col-span-2 xl:col-span-1 relative flex flex-col pb-7 bg-croonus-gray rounded-lg p-[2rem] h-[245px] max-md:mb-5`}
          >
            <h1 className={`font-semibold text- border-b-2 border-b-gray-300`}>
              Podaci o trgovcu
            </h1>
            <p className={`mt-2 text-sm`}>
              Naziv:
              <span className={`font-semibold`}> {process.env.NAME}</span>
            </p>
            <p className={`mt-2 text-sm`}>
              PIB:
              <span className={`font-semibold`}>{process.env.PIB}</span>
            </p>
            <p className={`mt-2 text-sm`}>
              Adresa:
              <span className={`font-semibold`}>{process.env.ADDRESS}</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <div className={["orderDataContainer"]}>{conditions}</div>;
};

export default OrderSuccess;
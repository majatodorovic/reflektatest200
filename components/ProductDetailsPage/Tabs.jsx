"use client";
import React, { useState, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";

import missingDoc from "../../assets/Icons/missingdocimage.png"

const Tabs = ({
  productsDesc,
  specification = [],
  productDeclaration,
  loading,
  tehnicalDoc
}) => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <>
      {loading ? (
        <div
          className={`h-[100px] pb-5 w-full bg-slate-300 animate-pulse`}
        ></div>
      ) : (
        <div className=" flex flex-col max-lg:mt-10 text-black max-md:w-full max-md:mt-[2rem] w-[92%] mt-[5rem] ml-auto mb-14">
          {productsDesc?.description ||
          specification[0]?.groups[0]?.attributes ||
          tehnicalDoc?.file ||
          productDeclaration ? (
            <div className="flex border-b-2 border-b-croonus-1 ">
              {productsDesc?.description ? (
                <div
                  onClick={() => setActiveTab(1)}
                  className={`cursor-pointer px-4 py-2 max-lg:text-sm ${
                    activeTab === 1 ? "border-b-2 border-b-croonus-3" : ""
                  }`}
                >
                  Opis proizvoda
                </div>
              ) : null}
               
              {specification[0]?.groups[0]?.attributes ? (
                <div
                  onClick={() => setActiveTab(2)}
                  className={`cursor-pointer px-4 py-2 max-lg:text-sm ${
                    activeTab === 2 ? "border-b-2 border-b-croonus-3" : ""
                  }`}
                >
                  Specifikacija
                </div>
              ) : null}
              {productDeclaration?.name ? (
                <div
                  onClick={() => setActiveTab(3)}
                  className={`cursor-pointer px-4 py-2 max-lg:text-sm ${
                    activeTab === 3 ? "border-b-2 border-b-croonus-3" : ""
                  }`}
                >
                  Deklaracija
                </div>
              ) : null}
              {tehnicalDoc?.items[0]?.file ? (
                <div
                  onClick={() => setActiveTab(4)}
                  className={`cursor-pointer px-4 py-2 max-lg:text-sm ${
                    activeTab === 4 ? "border-b-2 border-b-croonus-3" : ""
                  }`}
                >
                  Tehnička dokumentacija
                </div>
              ) : null}
            </div>
          ) : null}

          <div className="p-4 max-md:p-1">
            {activeTab === 1 && (
              <div
                id="description"
                dangerouslySetInnerHTML={{ __html: productsDesc?.description }}
              ></div>
            )}
            {activeTab === 2 && (
              <div id="specification">
                {(specification ?? []).map((data) => {
                  return (
                    <Fragment key={data?.set?.id}>
                      {(Object.values(data.groups) ?? []).map((item) => {
                        return (
                          <Fragment key={item?.group?.id}>
                            {(Object.values(item.attributes) ?? []).map(
                              (attribute, index) => {
                                return (
                                  <table
                                    className="table-fixed max-md:w-full w-[100%] mx-auto my-1rem table"
                                    key={attribute?.attribute?.id}
                                  >
                                    <tbody>
                                      <tr
                                        className={`table_row ${
                                          index % 2 === 1 ? "" : "bg-croonus-gray"
                                        }`}
                                      >
                                        <td className=" pl-[1.4rem] py-[0.4rem]">
                                          {attribute?.attribute?.name}
                                        </td>
                                        <td className=" pl-[1.4rem] py-[0.4rem]">
                                          {(attribute?.values ?? []).map(
                                            (value, i) => {
                                              if (
                                                i + 1 <
                                                attribute?.values.length
                                              ) {
                                                return value.name + ",";
                                              } else {
                                                return value.name;
                                              }
                                            }
                                          )}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                );
                              }
                            )}
                          </Fragment>
                        );
                      })}
                    </Fragment>
                  );
                })}
              </div>
            )}
            {activeTab === 3 && (
              <>
                {productDeclaration && (
                  <table
                    className="table-fixed max-md:w-full w-[100%] mx-auto my-1rem table"
                    key={Math.random()}
                  >
                    <tbody>
                    {productDeclaration?.name ? (
                    <tr className={`table_row bg-croonus-gray`}>
                      <td className=" pl-[1.4rem] py-[0.4rem]">Naziv:</td>
                      <td className=" pl-[1.4rem] py-[0.4rem]">
                        {productDeclaration?.name}
                      </td>
                    </tr>
                    ): null}
                     {productDeclaration?.manufacture_name ? (
                        <tr className={`table_row `}>
                          <td className=" pl-[1.4rem] py-[0.4rem]">
                            Proizvođač:
                          </td>
                          <td className=" pl-[1.4rem] py-[0.4rem]">
                            {productDeclaration?.manufacture_name}
                          </td>
                      </tr>
                     ): null}
                    {productDeclaration?.year ? (
                      <tr className={`table_row bg-croonus-gray`}>
                        <td className=" pl-[1.4rem] py-[0.4rem]">
                          Godina proizvodnje:
                        </td>
                        <td className=" pl-[1.4rem] py-[0.4rem]">
                          {productDeclaration?.year}
                        </td>
                      </tr>
                    ) : null}
                     {productDeclaration?.country_name ? (
                        <tr className={`table_row `}>
                          <td className=" pl-[1.4rem] py-[0.4rem]">
                            Zemlja porekla:
                          </td>
                          <td className=" pl-[1.4rem] py-[0.4rem]">
                            {productDeclaration?.country_name}
                          </td>
                        </tr>
                     ) : null}
                      {productDeclaration?.importer_name ? (
                        <tr className={`table_row bg-croonus-gray`}>
                          <td className=" pl-[1.4rem] py-[0.4rem]">Uvoznik:</td>
                          <td className=" pl-[1.4rem] py-[0.4rem]">
                            {productDeclaration?.importer_name}
                          </td>
                      </tr>
                      ):null}
                      {productDeclaration?.note ? (
                        <tr className={`table_row `}>
                        <td className=" pl-[1.4rem] py-[0.4rem]">Napomena:</td>
                        <td className=" pl-[1.4rem] py-[0.4rem]">
                          {productDeclaration?.note}
                        </td>
                      </tr>
                      ):null}
                      
                    </tbody>
                  </table>
                )}
              </>
            )}
              {activeTab === 4 && (
              <div
                id="user-manual"
                className="flex mr-5"
              >
                <div className="grid grid-cols-6 gap-4 mt-5">
                  
                {tehnicalDoc?.items?.map((doc, index) => {
                  return(
                  <div key={index} className="col-span-1 max-md:col-span-3">
                    <div className="text-center w-fit flex flex-col justify-between h-full">
                      <Link href={doc?.file} target="_blank" className="flex justify-center">
                        {doc?.thumb_image ? (
                          <div className="w-[180px] h-[200px] relative">
                              <Image src={doc?.thumb_image}
                            fill={true} 
                            alt="Reflekta"
                            style={{ objectFit: "cover" }}  />
                         </div>
                        ) : (
                          <div className="w-[180px] h-[200px] relative">
                          <Image 
                          src={missingDoc} 
 
                          alt="Reflekta"  
                          fill={true} 
                          style={{ objectFit: "cover" }}/>
                          </div>
                        )}
                      
                      </Link>
                      <div>
                      <p className="text-sm font-semibold mt-3 text-center rows2">{doc?.title}</p>
                      <div className="flex gap-2 divide-x divide-[#ccc] text-sm justify-center">
                      <Link href={doc?.file} target="_blank">Pogledajte</Link>
                      <Link href={doc?.file} download  className="block pl-2">
                        
                      Preuzmite</Link>
                      </div>
                      </div>
                    </div>
                  </div>
                  )})}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Tabs;

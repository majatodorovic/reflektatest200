"use client";
import { useEffect, useState, useContext } from "react";
import Variants from "../Variants/Variants";
import { useParams, useRouter } from "next/navigation";
import { useGlobalAddToCart, useGlobalAddToWishList } from "@/app/api/globals";
import { currencyFormat } from "@/helpers/functions";
import Translated from "../../context/state";
import Image from "next/image";
import { Flip, toast, ToastContainer } from "react-toastify";
import Measure from "../../assets/Icons/measure.png";
import Wishlist from "../../assets/Icons/heart.png";

import Cancel from "../../assets/Icons/cancel.png";
import { notFound } from "next/navigation";
import ProductPrice from "../ProductPrice/ProductPrice";
import PlusMinusInputOne from "@/components/PlusMinusInputOne";
import { post } from "@/app/api/api";
import { useCartContext } from "@/app/api/cartContext";

const ItemInfo = ({ product, desc, badge, loading, path }) => {
  const [loadingCart, setLoadingCart] = useState(false);
  const [loadingWishlist, setLoadingWishlist] = useState(false);
  const [productVariant, setProductVariant] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (window.scrollY > 0) {
      window.scrollTo(0, 0);
    }
  }, []);
  const [newURL, setNewURL] = useState(null);
  useEffect(() => {
    if (newURL) {
      window.history.replaceState(null, null, newURL);
    }
  }, [newURL]);

  const updateProductVariant = (newProduct) => {
    setProductVariant(newProduct);
  };

  const handleURLChange = (newURL) => {
    setNewURL(newURL);
  };

  const [productAmount, setProductAmount] = useState(1);
  const globalAddToCart = useGlobalAddToCart();
  const globalAddToWishList = useGlobalAddToWishList();
  const [count, setCount] = useState(1);

  const addToWishlist = (e) => {
    if (product.product_type === "single") {
      globalAddToWishList(product.data.item.basic_data?.id_product);
      toast.success(
        `Proizvod ${product.data.item.basic_data?.name} dodat u listu želja!`,
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );
    } else {
      if (productVariant) {
        globalAddToWishList(productVariant?.basic_data?.id_product);
        toast.success(
          `Proizvod ${productVariant?.basic_data?.name} dodat u listu želja!`,
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
      } else {
        globalAddToWishList(product.data.item.basic_data?.id_product);
        toast.success(
          `Proizvod ${product.data.item.basic_data.name} dodat u listu želja!`,
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
      }
    }
    setTimeout(() => {
      setLoadingWishlist(false);
    }, 500);
  };
  const [isError, setIsError] = useState(false);
  const [, mutateCart] = useCartContext();

  const addToCart = (e) => {
    if (product.product_type === "single") {
      post("/cart", {
        id_product: product.data.item.basic_data?.id_product,
        quantity: count,
        id_product_parent: null,
        description: null,
        status: null,
        quantity_calc_type: false ? "replace" : "calc",
      }).then((res) => {
        if (res?.code === 200) {
          toast.success(`Proizvod dodat u korpu!`, {
            position: toast.POSITION.TOP_CENTER,
          });
          mutateCart();
        } else {
          toast.error("Došlo je do nepoznate greške!", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
    } else {
      if (productVariant === null || productVariant?.length === 0) {
        toast.error("Morate izabrati varijantu proizvoda!", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        post("/cart", {
          id_product: productVariant?.basic_data?.id_product,
          quantity: count,
          id_product_parent: null,
          description: null,
          status: null,
          quantity_calc_type: false ? "replace" : "calc",
        }).then((res) => {
          if (res?.code === 200) {
            toast.success(`Proizvod dodat u korpu!`, {
              position: toast.POSITION.TOP_CENTER,
            });
            mutateCart();
          } else {
            toast.error("Došlo je do nepoznate greške!", {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        });
        setCount(1);
      }
    }

    setTimeout(() => {
      setLoadingCart(false);
    }, 500);
    setProductAmount(1);
  };
  const [deliveryModal, setDeliveryModal] = useState(false);
  const [infoModal, setInfoModal] = useState(false);
  const [returnModal, setReturnModal] = useState(false);

  useEffect(() => {
    const handleBodyScroll = () => {
      if (deliveryModal || infoModal || returnModal) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
    };
    handleBodyScroll();
  }, [deliveryModal, infoModal, returnModal]);
  const [price, setPrice] = useState();
  const handlePrice = (price) => {
    setPrice(price);
  };
  const [setVariant, setVariantOnOff] = useState(true);
  return (
    <>
      {product ? (
        <>
          <div className="max-md:col-span-4 w-[100%] max-md:mb-[2rem] text-black mb-[6rem] max-md:mt-[2rem]">
            <div className="flex flex-col mb-[2rem]">
              {badge[0]?.name ? (
                <div className="px-2 py-1 bg-croonus-3 w-fit text-white text-[0.8rem]">
                  <span>{badge[0]?.name}</span>
                </div>
              ) : null}
              {loading ? (
                <div
                  className={`w-full h-[35px] animate-pulse bg-slate-300`}
                ></div>
              ) : (
                <h1 className="text-3xl mt-[1rem] max-md:text-[1.6rem] font-bold lg:w-[90%] row3 leading-5 max-md:w-[93%]">
                  {product?.data?.item?.basic_data?.name}
                </h1>
              )}

              {loading ? (
                <div
                  className={`mt-7 h-[25px] w-[20%] animate-pulse bg-slate-300`}
                ></div>
              ) : (
                <h2 className="mt-[1rem] max-md:mt-[0.4rem] text-[#636363] text-base">
                  Šifra:&nbsp;
                  {!productVariant?.id
                    ? product?.data?.item?.basic_data?.sku
                    : productVariant?.basic_data?.sku}
                </h2>
              )}

                {loading ? (
                <div
                  className={`mt-7 h-[25px] w-[20%] animate-pulse bg-slate-300`}
                ></div>
              ) : (
                <h2 className="mt-[0.2rem] max-md:mt-[0.2rem] text-[#636363] text-base">
                  Barkod:&nbsp;
                  {!productVariant?.id
                    ? product?.data?.item?.basic_data?.barcode
                    : productVariant?.basic_data?.barcode}
                </h2>
              )}

              {product?.data?.item?.basic_data?.brand_name ? (
                <p className="max-md:mt-[0.4rem] text-[#636363] text-base">
                  Brend:&nbsp;
                  {product?.data?.item?.basic_data?.brand_name}
                </p>
              ) : null}
              {product?.data?.item?.basic_data?.manufacture_name ? (
                <p className="max-md:mt-[0.4rem] text-[#636363] text-base">
                  Proizvođač:&nbsp;
                  {product?.data?.item?.basic_data?.manufacture_name}
                </p>
              ) : null}

              {/* <div
                className={`mt-[2.325rem] text-[27px] flex flex-col-reverse items-start font-bold`}
              >
                <ProductPrice
                  price={
                    productVariant?.id
                      ? productVariant?.price
                      : product?.data?.item?.price
                  }
                  inventory={
                    productVariant?.id
                      ? productVariant?.inventory
                      : product?.data?.item?.inventory
                  }
                />
                {product?.data?.item?.price?.discount?.active && (
                  <span className="text-[#727374] font-bold text-[16px] line-through -mb-[0.2rem]">
                    {currencyFormat(
                      product?.data?.item?.price?.price?.original
                    )}
                  </span>
                )}
              </div> */}
              {loading ? (
                <div
                  className={`w-full mt-8 h-[25px] animate-pulse bg-slate-300`}
                ></div>
              ) : (
                <p
                  className="mt-[1rem] max-md:mt-[1.5rem] max-sm:max-w-full sm:max-w-[90%] font-p font-regular max-md:w-full text-base"
                  dangerouslySetInnerHTML={{
                    __html: product?.data?.item?.basic_data?.short_description,
                  }}
                ></p>
              )}
            </div>
            {/* {product?.product_type === "variant" && (
              <div className="pt-[1rem] pb-[1.4rem] max-md:py-[0.8rem]">
                <Variants
                  firstVariantOption={false}
                  product={product}
                  productSlug={path}
                  handleURLChange={handleURLChange}
                  updateProductVariant={updateProductVariant}
                  productVariant={productVariant}
                  slug={path}
                />
              </div>
            )} */}
            {/* <div className="flex items-center gap-2">
              <Image src={Measure} alt="measure" width={30} height={20} />
              <span className="text-[13px] font-bold">Pomoć za veličine</span>
            </div> */}
            {/* {loading ? (
              <div
                className={`mt-12 h-[35px] w-[25%] animate-pulse bg-slate-300`}
              ></div>
            ) : (
              <div className={`flex mt-3 items-center gap-5`}>
                <h1>Količina:</h1>
                <PlusMinusInputOne setCount={setCount} amount={count} />
              </div>
            )} */}
            
            {loading ? (
              <div
                className={`mt-20 h-[50px] w-[50%] animate-pulse bg-slate-300`}
              ></div>
            ) : (
              <div className="mt-[4.188rem] max-md:mt-[2rem] flex items-center gap-[31px] ">
                {/* {price !== "Cena na upit" ? (
                  <button
                    className={
                      product.product_type === "variant" &&
                      (productVariant === null || productVariant?.length === 0)
                        ? `w-[360px] rounded-lg max-md:w-[260px] hover:bg-opacity-90 max-md:h-[40px] h-[58px] flex items-center  justify-center text-white font-bold text-base bg-croonus-3`
                        : `w-[360px] rounded-lg max-md:w-[260px] hover:bg-opacity-90 max-md:h-[40px] h-[58px] flex items-center  justify-center text-white font-bold text-base bg-croonus-3`
                    }
                    onClick={() => {
                      setLoadingCart(true);
                      addToCart();
                    }}
                  >
                    {loadingCart ? (
                      <i
                        className={`fa fa-solid fa-spinner fa-spin text-white text-xl`}
                      ></i>
                    ) : (
                      <span>
                        <Translated Key="add_to_cart" />
                      </span>
                    )}
                  </button>
                ) : (
                  <button
                    disabled={
                      product.product_type === "variant" &&
                      (productVariant === null || productVariant.length === 0)
                    }
                    className={
                      product.product_type === "variant" &&
                      (productVariant === null || productVariant.length === 0)
                        ? `w-[360px] rounded-lg max-md:w-[260px] hover:bg-opacity-90 max-md:h-[40px] h-[58px] flex items-center cursor-not-allowed justify-center text-black font-bold text-base bg-croonus-3`
                        : `w-[360px] rounded-lg max-md:w-[260px] hover:bg-opacity-90 max-md:h-[40px] h-[58px] flex items-center  justify-center text-black font-bold text-base bg-croonus-3`
                    }
                    onClick={() => {
                      productVariant
                        ? router?.push(`/kontakt?slug=${productVariant?.slug}`)
                        : router?.push(
                            `/kontakt?slug=${product?.data?.item?.slug}`
                          );
                    }}
                  >
                    {loadingCart ? (
                      <i
                        className={`fa fa-solid fa-spinner fa-spin text-white text-xl`}
                      ></i>
                    ) : (
                      <span>Pošaljite upit</span>
                    )}
                  </button>
                )} */}

                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setLoadingWishlist(true);
                    addToWishlist();
                  }}
                >
                  {loadingWishlist ? (
                    <i
                      className={`fa fa-solid fa-spinner fa-spin text-black text-xl`}
                    ></i>
                  ) : (
                    <div className="flex items-center">
                    <Image
                      src={Wishlist}
                      alt="wishlist"
                      width={39}
                      height={35}
                      className="h-full object-cover"
                    />
                    <span className="w-full ml-4">Dodajte u listu želja</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* <div className="md:hidden mt-5 flex items-center gap-[10px] justify-between py-5 ">
              <div className="flex flex-col items-center text-center justify-center">
                <Image
                  src={FreeDelivery}
                  alt="free delivery"
                  width={30}
                  height={30}
                />
                <p className="text-sm regular">Besplatna dostava</p>
              </div>
              <div className="flex flex-col items-center text-center justify-center">
                <Image
                  src={Calendar}
                  alt="free delivery"
                  width={30}
                  height={30}
                />
                <p className="text-sm regular">2 dana isporuka</p>
              </div>
              <div className="flex flex-col items-center text-center justify-center">
                <Image
                  src={DeliveryStatus}
                  alt="free delivery"
                  width={30}
                  height={30}
                />
                <p className="text-sm regular">Povrat do 14 dana</p>
              </div>
            </div> */}
            {/*<div className="mt-[5.125rem] max-md:mt-[2rem] max-md:flex max-md:items-center max-md:justify-center max-md:w-full">*/}
            {/*  <ul className="flex flex-row gap-[47px] text-base relative separate">*/}
            {/*    <div*/}
            {/*      className="relative cursor-pointer"*/}
            {/*      onClick={() => setDeliveryModal(true)}*/}
            {/*    >*/}
            {/*      Dostava*/}
            {/*    </div>*/}
            {/*    <div*/}
            {/*      className="relative cursor-pointer"*/}
            {/*      onClick={() => setInfoModal(true)}*/}
            {/*    >*/}
            {/*      Informacije*/}
            {/*    </div>*/}
            {/*    <div*/}
            {/*      className="relative cursor-pointer"*/}
            {/*      onClick={() => setReturnModal(true)}*/}
            {/*    >*/}
            {/*      Povraćaj*/}
            {/*    </div>*/}
            {/*  </ul>*/}
            {/*</div>*/}
          </div>
          <div
            className={
              deliveryModal
                ? `max-md:z-[20000] fixed max-md:mx-auto max-md:overflow-y-scroll scale-100 transition-all duration-500 z-[101] top-0 left-0 w-screen h-screen flex items-center justify-center`
                : `max-md:z-[20000] fixed max-md:mx-auto max-md:overflow-y-scroll scale-0 transition-all duration-500 z-[101] top-0 left-0 w-screen h-screen flex items-center justify-center`
            }
          >
            <div
              className={`
          
              bg-white rounded-lg max-md:overflow-y-scroll  p-[40px] flex flex-col md:w-[890px] md:h-[490px]`}
            >
              <div className="flex items-center justify-between">
                <h1 className="text-[20px] font-bold">Dostava</h1>
                <Image
                  src={Cancel}
                  alt="cancel"
                  width={20}
                  height={20}
                  onClick={() => setDeliveryModal(false)}
                  className="cursor-pointer"
                />
              </div>
              <div className="mt-[4.375rem]">
                <p className="font-light text-[15px]">
                  Mesto isporuke poruče ne robe mora se nalaziti na teritoriji
                  Republike Srbije. Isporuku proizvoda poručenih na sajtu
                  Reflekta.rs vrši kurirska služba „YU – PD Express“ d.o.o .
                  Beograd – D Express, na teritoriji Republike Srbije, radnim
                  danima u periodu od 8 do 16h, na adresu primaoca pošiljke.
                </p>
                <p className="font-light mt-[30px] text-[15px]">
                  U slučaju da je na porudžbenici više artikala, velika je
                  verovatnoće da nemamo sve artikle na jednom mestu, zbog čega
                  ćete porudžbinu dobiti u više pošiljki. Nakon obrade
                  porudžbine, na vašu e-mail adresu stići će obaveštenje o
                  statusu porudžbine.
                </p>
                <p className="font-light mt-[30px] text-[15px]">
                  Po Zakonu o zaštiti potrošača, član 32 – Trgovac je dužan da u
                  roku od 30 dana od dana zaključenja ugovora na daljinu i
                  ugovora koji se zaključuje izvan poslovnih prostorija izvrši
                  isporuku robe. Okvirni rok isporuke je do 3 radna dana. Rok
                  isporuke može biti i duži od navedenog (3 radna dana), u
                  vanrednim slučajevima poput velikih gužvi, pandemija,
                  neprohodnosti puteva u slučaju vremenskih nepogoda i sl.
                  Kurirska služba je u obavezi da isporuku vrši što efikasnije u
                  skladu sa svojim mogućnostima i poslovnim kapacitetima.
                </p>
              </div>
            </div>
          </div>
          <div
            className={
              infoModal
                ? `max-md:z-[20000] fixed max-md:mx-auto max-md:overflow-y-scroll scale-100 transition-all duration-500 z-[101] top-0 left-0 w-screen h-screen flex items-center justify-center`
                : `max-md:z-[20000] fixed max-md:mx-auto max-md:overflow-y-scroll scale-0 transition-all duration-500 z-[101] top-0 left-0 w-screen h-screen flex items-center justify-center`
            }
          >
            <div
              className={`
          
              bg-white rounded-lg max-md:overflow-y-scroll  p-[40px] flex flex-col md:w-[890px] md:h-[490px]`}
            >
              <div className="flex items-center justify-between">
                <h1 className="text-[20px] font-bold">Informacije</h1>
                <Image
                  src={Cancel}
                  alt="cancel"
                  width={20}
                  height={20}
                  onClick={() => setInfoModal(false)}
                  className="cursor-pointer"
                />
              </div>
              <div className="mt-[4.375rem]">
                <p className="font-light text-[15px]">
                  Više informacija nije dostupno.
                </p>
              </div>
            </div>
          </div>
          <div
            className={
              returnModal
                ? `max-md:z-[20000] fixed max-md:mx-auto max-md:overflow-y-scroll scale-100 transition-all duration-500 z-[101] top-0 left-0 w-screen h-screen flex items-center justify-center`
                : `max-md:z-[20000] fixed max-md:mx-auto max-md:overflow-y-scroll scale-0 transition-all duration-500 z-[101] top-0 left-0 w-screen h-screen flex items-center justify-center`
            }
          >
            <div
              className={`
          
              bg-white rounded-lg max-md:overflow-y-scroll  p-[40px] flex flex-col md:w-[890px] md:h-[490px]`}
            >
              <div className="flex items-center justify-between">
                <h1 className="text-[20px] font-bold">Povraćaj</h1>
                <Image
                  src={Cancel}
                  alt="cancel"
                  width={20}
                  height={20}
                  onClick={() => setReturnModal(false)}
                  className="cursor-pointer"
                />
              </div>
              <div className="mt-[4.375rem]">
                <p className="font-light text-[15px]">
                  Više informacija nije dostupno.
                </p>
              </div>
            </div>
          </div>
          {(deliveryModal || infoModal || returnModal) && (
            <div
              className="fixed z-[100] bg-black bg-opacity-40 top-0 left-0 w-screen h-screen transition-all duration-500"
              onClick={() => {
                setDeliveryModal(false);
                setInfoModal(false);
                setReturnModal(false);
              }}
            ></div>
          )}
          <ToastContainer transition={Flip} />
        </>
      ) : (
        notFound()
      )}
    </>
  );
};

export default ItemInfo;

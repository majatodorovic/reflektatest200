"use client";
import Image from "next/image";
import Logo from "../../assets/Images/logo.png";
import { useState, useCallback, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Search from "../../assets/Icons/search.png";
import Wishlist from "../../assets/Icons/heart.png";
import MobileLanguageSelector from "../MobileLanguageSelector/MobileLanguageSelector";
import { useContext } from "react";
import { userContext } from "@/context/userContext";
import Cart from "../../assets/Icons/cart.png";
import { useCartContext } from "@/app/api/cartContext";
import { get, list } from "@/app/api/api";

import Menu from "../../assets/Icons/hamburger.png";
import User from "../../assets/Icons/user.png";
import { useSuspenseQuery } from "@tanstack/react-query";

const NavigationMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [cart, , wishList] = useCartContext();
  const [wishListCount, setWishListCount] = useState(0);
  const pathname = usePathname();
  const { isLoggedIn, setIsLoggedIn } = useContext(userContext);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const { data: categories } = useSuspenseQuery({
    queryKey: ["categoriesTree"],
    queryFn: async () => {
      return await get("/categories/product/tree").then((res) => res?.payload);
    },
  });

  const logoutHandler = () => {
    post("/customers/profile/logout")
      .then((response) => {
        if (response?.code === 200) {
          setIsLoggedIn(false);
          const deviceToken = Cookies.get("device_token");
          Cookies.set("customer_token", deviceToken, { expires: 365 });
          router.push("/nalog");
        } else {
          setErrors("Greška.");
        }
        if (response?.code === 500 || response?.code === 400) {
          setErrors(
            "Došlo je do nepoznate greške pri obrađivanju Vašeg zahteva.",
          );
        }
      })
      .catch((error) => console.warn(error));
  };

  useEffect(() => {
    const disableBodyScroll = () => {
      isOpen && (document.body.style.overflow = "hidden");
    };
    disableBodyScroll();

    return () => {
      document.body.style.overflow = "visible";
    };
  }, [isOpen]);

  const getCartCount = useCallback(() => {
    get("/cart/badge-count")
      .then((response) => {
        setCartCount(response?.payload?.summary?.items_count ?? 0);
      })
      .catch((error) => console.warn(error));
  }, []);

  const getWishlistCount = useCallback(() => {
    get("/wishlist/badge-count")
      .then((response) => {
        setWishListCount(response?.payload?.summary?.items_count ?? 0);
      })
      .catch((error) => console.warn(error));
  }, []);

  useEffect(() => {
    getWishlistCount();
  }, [getWishlistCount, wishList]);

  useEffect(() => {
    getCartCount();
  }, [getCartCount, cart]);
  const { push: navigate, asPath } = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/pretraga?search=${searchTerm}`);
    setSearchTerm("");
    setSearch("");
    setSearchOpen(false);
  };
  const [subcategory, setSubcategory] = useState({
    id: null,
    data: [],
  });
  const [searchData, setSearchData] = useState([]);
  useEffect(() => {
    const fetchSearchData = async () => {
      const data = await list("/products/search/list", { search }).then(
        (response) => {
          setSearchData(response?.payload?.items);
        },
      );
    };
    fetchSearchData();
  }, [search]);

  let all_categories = [
    ...categories,
    {
      id: 999,
      name: "Nameštaj",
      slug_path: "/strana/reflekta-namestaj",
    },
  ];

  return (
    <>
      <div className="sticky bg-croonus-2 backdrop-blur-md z-[80] top-0 block lg:hidden">
        <div className=" p-3  flex flex-row items-center justify-between ">
          <div className="flex items-center gap-5">
            <Image
              src={Menu}
              alt="Menu"
              width={25}
              height={25}
              onClick={() => setIsOpen(!isOpen)}
              className="invert"
            />
            <div>
              <Link href="/">
                <Image src={Logo} alt="Logo" width={120} height={120} />
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Image
              src={Search}
              alt="Search"
              width={20}
              height={20}
              onClick={() => setSearchOpen(!searchOpen)}
              className="invert"
            />
            <div className="relative">
              <Link href="/lista-zelja">
                {" "}
                <Image
                  src={Wishlist}
                  alt="Wishlist"
                  width={20}
                  height={20}
                  className="invert"
                />
              </Link>
              <span className="absolute text-xs text-white -top-3 -right-3 bg-croonus-3 px-1.5 rounded-full">
                {wishListCount}
              </span>
            </div>{" "}
            {/* <div className="relative">
              <Link href="/korpa">
                <Image
                  src={Cart}
                  alt="Cart"
                  width={20}
                  height={20}
                  className="invert"
                />
              </Link>
              <span className="absolute text-xs -top-3 -right-2 text-white bg-croonus-3 px-1.5 rounded-full">
                {cartCount}
              </span>
            </div> */}
          </div>

          <div
            className={
              isOpen
                ? ` translate-x-0 transition-all duration-500 fixed flex flex-col z-40 left-0 top-0 h-screen w-[90%] bg-white bg-opacity-100 shadow-2xl`
                : `-translate-x-[100%] transition-all duration-500 fixed flex flex-col z-40 left-0 top-0 h-screen w-[90%] bg-white bg-opacity-100 `
            }
          >
            <div className="bg-croonus-2 flex flex-row p-3 justify-between items-end">
              <Link href="/">
                {" "}
                <Image src={Logo} alt="Logo" width={130} height={130} />
              </Link>
              <div className="flex">
                {isLoggedIn ? (
                  <>
                    <p className="text-black ml-[2rem]">
                      Dobrodošli na profil!
                    </p>
                    <div
                      className="relative p-[0.3rem] ml-[1rem] rounded-[50%] -mt-[0.4rem] hover:translate-y-0.5 transition-all ease cursor-pointer z-[20]"
                      onClick={toggleDropdown}
                    >
                      <div className="bg-croonus-3 p-1 rounded-3xl">
                        <Image src={User} alt="user" width={22} height={22} />
                      </div>
                      {isDropdownOpen && (
                        <div className="dropdownProfil">
                          <ul>
                            <li className="border-b border-[#f0f0f0] px-[2.2rem] py-[0.4rem] bg-[#d3c2a8] hover:bg-[#ab926a]">
                              <Link href="/customer-profil">Moj profil</Link>
                            </li>
                            <li className="px-[2.2rem] py-[0.4rem] bg-[#d3c2a8] hover:bg-[#ab926a]">
                              <button onClick={logoutHandler}>Odjava</button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="mr-5 items-end flex"
                  >
                    {/* <Link
                      href="/nalog"
                      className=" p-[0.3rem] rounded-[50%]  hover:translate-y-0.5 transition-all ease cursor-pointer "
                    >
                      <div className="bg-croonus-3 p-1 min-h-[30px] min-w-[30px] rounded-lg">
                        <Image
                          src={User}
                          alt="user"
                          width={22}
                          height={22}
                          className="invert"
                        />
                      </div>
                    </Link> */}
                  </div>
                )}
                <i
                  className="fa-solid fa-xmark text-3xl text-white absolute top-[0.4rem] right-[0.4rem]"
                  onClick={() => setIsOpen(!isOpen)}
                ></i>{" "}
              </div>
            </div>

            <div className="flex flex-col mt-10 max-h-[464px] overflow-y-auto">
              {all_categories?.map((item, index) => (
                <>
                  {item.children ? (
                    <>
                      <div
                        key={item.id}
                        className={`p-3 flex items-center justify-between ${
                          index % 2 === 0 ? "bg-croonus-2 text-white" : ""
                        }`}
                        onClick={() =>
                          setSubcategory({
                            id: item.id === subcategory.id ? null : item.id,
                            data:
                              item.children === subcategory.data
                                ? []
                                : item.children,
                          })
                        }
                      >
                        <p key={item?.id} className="uppercase font-medium">
                          {item.name}
                        </p>
                        {item.children ? (
                          <i
                            key={item?.id}
                            className="fa-solid fa-chevron-right text-sm"
                          ></i>
                        ) : null}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={
                        item?.slug_path === "/strana/reflekta-namestaj"
                          ? `${item?.slug_path}`
                          : `/kategorije/${item?.slug_path}`
                      }
                      className="uppercase font-medium"
                      key={item?.id}
                      onClick={() => setIsOpen(false)}
                    >
                      <div
                        key={item.id}
                        className={`p-3 flex items-center justify-between ${
                          index % 2 === 0 ? "bg-croonus-2 text-white" : ""
                        }`}
                      >
                        <p
                          className="uppercase font-medium"
                          onClick={() => setIsOpen(false)}
                          key={item?.id}
                        >
                          {item.name}
                        </p>
                        {item.children ? (
                          <i
                            key={item?.id}
                            className="fa-solid fa-chevron-right text-sm"
                          ></i>
                        ) : null}
                      </div>
                    </Link>
                  )}

                  {subcategory.id === item?.id
                    ? subcategory?.data?.map((child) => {
                        return (
                          <Link
                            href={`/kategorije/${item?.slug}/${child?.slug}`}
                            onClick={() => {
                              setIsOpen(false);
                              setSubcategory({
                                id: null,
                                data: [],
                              });
                            }}
                            className={
                              subcategory && item?.children
                                ? `p-3 pl-10 translate-x-0 duration-500 transition-all uppercase font-medium text-sm`
                                : `p-3 pl-10 =translate-x-full duration-500 transition-all uppercase font-medium text-sm`
                            }
                            key={child?.id}
                          >
                            {child?.name}
                          </Link>
                        );
                      })
                    : null}
                </>
              ))}
            </div>
            <div className="flex mt-auto flex-col gap-4 p-3 text-white bg-croonus-2">
              <Link
                className="uppercase font-medium"
                href="/brendovi"
                onClick={() => setIsOpen(false)}
              >
                {" "}
                <div className="flex items-center justify-between">
                  Brendovi
                  <i className="fa-solid fa-chevron-right text-sm"></i>
                </div>
              </Link>
              <Link
                className="uppercase font-medium"
                href="/reference"
                onClick={() => setIsOpen(false)}
              >
                {" "}
                <div className="flex items-center justify-between">
                  Reference
                  <i className="fa-solid fa-chevron-right text-sm"></i>
                </div>
              </Link>
              <Link
                className="uppercase font-medium"
                href="https://b2b.reflekta.rs/"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center justify-between">
                  B2B <i className="fa-solid fa-chevron-right text-sm"></i>
                </div>
              </Link>
              <Link
                className="uppercase font-medium"
                href="/kontakt"
                onClick={() => setIsOpen(false)}
              >
                {" "}
                <div className="flex items-center justify-between">
                  Kontakt
                  <i className="fa-solid fa-chevron-right text-sm"></i>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div
          className={
            searchOpen
              ? `h-full w-full flex items-center justify-start  absolute z-[61] bg-white shadow-black shadow-2xl transition-all duration-[550ms] translate-y-0`
              : `h-full w-full flex items-center justify-start  absolute z-[61] bg-white  transition-all duration-[550ms] -translate-y-[200%]`
          }
        >
          <form
            onSubmit={handleSearch}
            className="relative flex px-3 w-full items-center justify-between"
          >
            <div className="flex items-center justify-center gap-5 relative">
              <input
                type="text"
                placeholder="Pretraži proizvode"
                className="w-[300px] h-10 border-b border-l-0 border-t-0 border-r-0 border-b-gray-300 focus:outline-none focus:border-b-croonus-2 focus:ring-0"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onInput={(e) => setSearch(e.target.value)}
              />
              <Image
                src={Search}
                alt="search"
                width={20}
                height={20}
                className="absolute right-2 cursor-pointer fa-solid fa-search text-gray-400"
              />
            </div>
            <i
              className="fa-solid fa-xmark text-2xl cursor-pointer"
              onClick={() => {
                setSearchOpen(!searchOpen);
                setSearchTerm("");
                setSearch("");
              }}
            ></i>
          </form>
          {search.length > 0 ? (
            <div className="absolute top-[3rem] w-full bg-white shadow-xl rounded-b-lg  ">
              <div className="flex flex-col gap-2 w-full relative">
                <div className="max-h-[400px] overflow-y-auto customscroll2">
                  {searchData?.length > 0
                    ? searchData.slice(0, 6).map((item) => (
                        <Link
                          href={`/proizvod/${item?.categories[0]?.slug}/${item.slug}`}
                          className="h-[83px]"
                          onClick={() => {
                            setSearchTerm("");
                            setSearch("");
                            setSearchOpen(false);
                          }}
                        >
                          <div className="flex items-center justify-between h-[83px] p-2.5 hover:bg-croonus-3 cursor-pointer">
                            <div className="flex items-center p-1 gap-5 h-[83px] ">
                              {item?.image[0]?.toString() ? (
                                <Image
                                  src={item?.image[0]?.toString()}
                                  width={50}
                                  height={50}
                                  alt="Reflekta"
                                  className="h-full object-contain"
                                />
                              ) : null}
                              <div className="flex flex-col gap-1">
                                <p className="text-sm font-semibold">
                                  {item.basic_data.name}
                                </p>
                                <p className="italic text-xs">
                                  U kategoriji {item?.categories[0]?.name}
                                </p>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))
                    : null}
                </div>
                {searchData?.length > 6 && (
                  <div
                    className="flex py-1.5 justify-center items-center sticky bottom-0 w-full bg-croonus-3 text-white hover:bg-opacity-90 cursor-pointer"
                    onClick={handleSearch}
                  >
                    {searchData?.length > 6 ? (
                      <span>
                        Prikaži sve rezultate ( još&nbsp;
                        {searchData.length - 6} )
                      </span>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div
        className={
          searchOpen
            ? `h-[100vh] w-[100vw] bg-black bg-opacity-50 fixed top-0 left-0 z-[70] transition-all duration-500`
            : `h-[100vh] w-[100vw] bg-black bg-opacity-0 invisible fixed top-0 left-0 z-[70] transition-all duration-500`
        }
        onClick={() => {
          setSearchOpen(!searchOpen);
          setSearch("");
          setSearchTerm("");
        }}
      ></div>
      {isOpen && (
        <div
          className="fixed top-0 left-0 bg-black bg-opacity-50 w-full h-full z-[70]"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default NavigationMobile;

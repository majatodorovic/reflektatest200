"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import { get, list } from "@/app/api/api";
import { useCartContext } from "@/app/api/cartContext";
import { useRouter, usePathname } from "next/navigation";
import { useContext } from "react";
import { userContext } from "@/context/userContext";
import Translated from "../../context/state";
import Link from "next/link";
import Image from "next/image";

import User from "../../assets/Icons/user.png";
import logo from "../../assets/Images/logo.png";
import Cart from "../../assets/Icons/cart.png";
import Wishlist from "../../assets/Icons/heart.png";
import Search from "../../assets/Icons/search.png";
import Thumb from "@/components/CategoriesPageComponents/Products/Products";
import { icons } from "@/lib/icons";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

const Navigation = () => {
  const { push: navigate, asPath } = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [cart, , wishList] = useCartContext();
  const [wishListCount, setWishListCount] = useState(0);
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const searchRef = useRef(null);
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
    const handleOutsideClick = (e) => {
      if (myRef.current && !myRef.current.contains(e.target)) {
        // Check if the clicked element is the search input
        if (e.target !== searchRef.current) {
          setSearchTerm("");
          setSearchData([]);
          setSearchIsOpen(false);
          setSearch("");
        }
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  const pathname = usePathname();

  const [message, setMessage] = useState({
    errorCart: false,
    messageCart: "",
    errorWishlist: false,
    messageWishlist: "",
  });
  const myRef = useRef(null);

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
  }, [getCartCount, cart, cartCount]);

  const handleButtonClickWishList = () => {
    if (wishListCount === 0) {
      setShowDivWishListCount(!showDivWishListCount);
    } else {
      router.push("/lista-zelja");
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/pretraga?search=${searchTerm}`);
    setSearchTerm("");
    setSearchData([]);
    setSearchIsOpen(false);
  };
  useEffect(() => {
    const handleRouteChange = () => {
      setOpen(false);
    };

    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    const fetchSearchData = async () => {
      const data = await list("/products/search/list", {
        search: search,
      })
        .then((response) => {
          setTimeout(() => {
            setSearchData(response?.payload?.items);
          }, 1000);
        })
        .finally(() => {
          setTimeout(() => {
            setLoading(false);
          }, 1200);
        });
    };
    fetchSearchData();
  }, [search]);

  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (pathname?.includes("/korpa/")) {
      getCartCount();
      router?.refresh();
    }
  }, [pathname]);
  const [loading, setLoading] = useState(false);

  const [active, setActive] = useState(null);

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
      <div className="bg-croonus-2 backdrop-blur-md hidden lg:block sticky pt-[1rem] pb-[1rem] top-0 z-[600]">
        <div className="w-[90%] mx-auto flex items-center justify-between relative">
          <div className="mr-4 w-fit">
            <Link
              href="/"
              onClick={() => {
                setOpen(false);
                setActive(null);
              }}
            >
              <Image src={logo} alt="Reflekta" width={130} height={130} />
            </Link>
          </div>
          <div className="flex xl:ml-[60px] ml-[10px] items-center gap-3 mr-auto w-[50%] mt-[0.6rem] relative">
            <Link
              href="/"
              className={`text-white hovereditem relative ${
                pathname === "/" && `underlineactive`
              } text-sm uppercase nowrap font-medium hover:bg-white hover:text-black rounded-[.5rem] px-2 xl:px-4 py-2`}
              onClick={() => setOpen(false)}
            >
              Početna
            </Link>

            <div
              onMouseEnter={() => setOpen(true)}
              className={`text-sm uppercase relative font-medium rounded-[.5rem] px-2 xl:px-4 py-2 cursor-pointer bg-croonus-3 text-white`}
            >
              Asortiman
              <div
                className={
                  open
                    ? `absolute top-full w-max mt-2 left-0 bg-white shadow-lg`
                    : `!hidden`
                }
              >
                <div className="flex flex-col relative">
                  {(all_categories ?? [])?.map((item, i) => {
                    let { id, name, slug_path, children } = item;
                    let has_children = children && children?.length > 0;
                    if (has_children) {
                      return (
                        <Link
                          onClick={() => {
                            setActive(null);
                            setOpen(false);
                          }}
                          href={`/kategorije/${slug_path}`}
                          onMouseEnter={() => {
                            setActive({
                              parent_category: item,
                            });
                          }}
                          className={`flex items-center text-black justify-between px-3 gap-10 hover:bg-croonus-3 py-2 hover:text-white  ${
                            active?.parent_category?.id === id &&
                            `bg-croonus-3 text-white`
                          }`}
                          key={`category-${id}`}
                        >
                          <p>{name}</p>
                          {icons.chevron_right}
                        </Link>
                      );
                    } else {
                      return (
                        <Link
                          onClick={() => {
                            setActive(null);
                            setOpen(false);
                          }}
                          onMouseEnter={() => {
                            setActive(null);
                          }}
                          className={`text-black block px-3 hover:bg-croonus-3 py-2 hover:text-white`}
                          href={
                            slug_path === "/strana/reflekta-namestaj"
                              ? `${slug_path}`
                              : `/kategorije/${slug_path}`
                          }
                          key={`category-${id}`}
                        >
                          {name}
                        </Link>
                      );
                    }
                  })}

                  {active?.parent_category &&
                    active?.parent_category?.children && (
                      <div
                        className={`absolute flex flex-col  top-0 left-full bg-white shadow-lg w-max`}
                      >
                        {active?.parent_category?.children?.map((item, i) => {
                          let { id, name, slug_path, children } = item;
                          let has_children = children && children?.length > 0;
                          if (has_children) {
                            return (
                              <Link
                                onClick={() => {
                                  setActive(null);
                                  setOpen(false);
                                }}
                                onMouseEnter={() => {
                                  setActive({
                                    ...active,
                                    child_category: item,
                                    child_child_category: null,
                                    child_child_child_category: null,
                                    child_child_child_child_category: null,
                                    child_child_child_child_child_category:
                                      null,
                                  });
                                }}
                                href={`/kategorije/${slug_path}`}
                                className={`flex items-center text-black justify-between px-3 gap-10 hover:bg-croonus-3 py-2 hover:text-white ${
                                  active?.child_category?.id === id &&
                                  `bg-croonus-3 text-white`
                                }`}
                                key={`category-${id}`}
                              >
                                <p>{name}</p>
                                {icons.chevron_right}{" "}
                              </Link>
                            );
                          } else {
                            return (
                              <Link
                                onClick={() => {
                                  setActive(null);
                                  setOpen(false);
                                }}
                                onMouseEnter={() => {
                                  setActive({
                                    ...active,
                                    child_category: null,
                                    child_child_category: null,
                                    child_child_child_category: null,
                                    child_child_child_child_category: null,
                                    child_child_child_child_child_category:
                                      null,
                                  });
                                }}
                                className={`text-black block px-3 hover:bg-croonus-3 py-2 hover:text-white`}
                                href={`/kategorije/${slug_path}`}
                                key={`category-${id}`}
                              >
                                {name}
                              </Link>
                            );
                          }
                        })}

                        {active?.child_category &&
                          active?.child_category?.children && (
                            <div
                              className={`absolute flex flex-col  top-0 left-full bg-white shadow-lg w-max`}
                            >
                              {active?.child_category?.children?.map(
                                (item, i) => {
                                  let { id, name, slug_path, children } = item;
                                  let has_children =
                                    children && children?.length > 0;
                                  if (has_children) {
                                    return (
                                      <Link
                                        onClick={() => {
                                          setActive(null);
                                          setOpen(false);
                                        }}
                                        onMouseEnter={() => {
                                          setActive({
                                            ...active,
                                            child_child_category: item,
                                            child_child_child_category: null,
                                            child_child_child_child_category:
                                              null,
                                            child_child_child_child_child_category:
                                              null,
                                          });
                                        }}
                                        href={`/kategorije/${slug_path}`}
                                        className={`flex items-center text-black justify-between px-3 gap-10 hover:bg-croonus-3 ${
                                          active?.child_child_category?.id ===
                                            id && `bg-croonus-3 text-white`
                                        } py-2 hover:text-white`}
                                        key={`category-${id}`}
                                      >
                                        <p>{name}</p>
                                        {icons.chevron_right}
                                      </Link>
                                    );
                                  } else {
                                    return (
                                      <Link
                                        onClick={() => {
                                          setActive(null);
                                          setOpen(false);
                                        }}
                                        className={`text-black block px-3 hover:bg-croonus-3 py-2 hover:text-white`}
                                        href={`/kategorije/${slug_path}`}
                                        key={`category-${id}`}
                                      >
                                        {name}
                                      </Link>
                                    );
                                  }
                                },
                              )}
                              {active?.child_child_category && (
                                <div
                                  className={`absolute flex flex-col  top-0 left-full bg-white shadow-lg w-max`}
                                >
                                  {active?.child_child_category?.children?.map(
                                    (item, i) => {
                                      let { id, name, slug_path, children } =
                                        item;
                                      let has_children =
                                        children && children?.length > 0;
                                      if (has_children) {
                                        return (
                                          <Link
                                            onClick={() => {
                                              setActive(null);
                                              setOpen(false);
                                            }}
                                            onMouseEnter={() => {
                                              setActive({
                                                ...active,
                                                child_child_child_child_category:
                                                  item,
                                                child_child_child_child_child_category:
                                                  null,
                                              });
                                            }}
                                            href={`/kategorije/${slug_path}`}
                                            className={`flex items-center text-black justify-between  px-3 gap-10  ${
                                              active
                                                ?.child_child_child_child_category
                                                ?.id === id
                                                ? `!bg-croonus-3 !text-white`
                                                : `hover:bg-croonus-3 hover:text-white`
                                            } py-2 `}
                                            key={`category-${id}`}
                                          >
                                            <p>{name}</p>
                                            {icons.chevron_right}
                                          </Link>
                                        );
                                      } else {
                                        return (
                                          <Link
                                            onClick={() => {
                                              setActive(null);
                                              setOpen(false);
                                            }}
                                            className={`text-black block px-3 hover:bg-croonus-3 py-2 hover:text-white`}
                                            href={`/kategorije/${slug_path}`}
                                            key={`category-${id}`}
                                          >
                                            {name}
                                          </Link>
                                        );
                                      }
                                    },
                                  )}
                                  {active?.child_child_child_child_category && (
                                    <div
                                      className={`absolute flex flex-col  top-0 left-full bg-white shadow-lg w-max`}
                                    >
                                      {active?.child_child_child_child_category?.children?.map(
                                        (item, i) => {
                                          let {
                                            id,
                                            name,
                                            slug_path,
                                            children,
                                          } = item;
                                          let has_children =
                                            children && children?.length > 0;
                                          if (has_children) {
                                            return (
                                              <Link
                                                onClick={() => {
                                                  setActive(null);
                                                  setOpen(false);
                                                }}
                                                onMouseEnter={() => {
                                                  setActive({
                                                    ...active,
                                                    child_child_child_child_child_category:
                                                      item,
                                                  });
                                                }}
                                                href={`/kategorije/${slug_path}`}
                                                className={`flex items-center text-black justify-between px-3 gap-10 ${
                                                  active
                                                    ?.child_child_child_child_child_category
                                                    ?.id === id
                                                    ? `!bg-croonus-3 !text-white`
                                                    : `hover:bg-croonus-3 hover:text-white`
                                                } py-2`}
                                                key={`category-${id}`}
                                              >
                                                <p>{name}</p>
                                                {icons.chevron_right}
                                              </Link>
                                            );
                                          } else {
                                            return (
                                              <Link
                                                onClick={() => {
                                                  setActive(null);
                                                  setOpen(false);
                                                }}
                                                className={`text-black block px-3 hover:bg-croonus-3 py-2 hover:text-white`}
                                                href={`/kategorije/${slug_path}`}
                                                key={`category-${id}`}
                                              >
                                                {name}
                                              </Link>
                                            );
                                          }
                                        },
                                      )}

                                      {active?.child_child_child_child_child_category && (
                                        <div
                                          className={`absolute flex flex-col  top-0 left-full bg-white shadow-lg w-max`}
                                        >
                                          {active?.child_child_child_child_child_category?.children?.map(
                                            (item, i) => {
                                              let {
                                                id,
                                                name,
                                                slug_path,
                                                children,
                                              } = item;
                                              let has_children =
                                                children &&
                                                children?.length > 0;
                                              if (has_children) {
                                                return (
                                                  <Link
                                                    onClick={() => {
                                                      setActive(null);
                                                      setOpen(false);
                                                    }}
                                                    href={`/kategorije/${slug_path}`}
                                                    className={`flex items-center text-black justify-between px-3 gap-10 hover:bg-croonus-3 py-2 hover:text-white ${
                                                      active
                                                        ?.child_child_child_child_child_category
                                                        ?.id === id &&
                                                      `bg-croonus-3 text-white`
                                                    }`}
                                                    key={`category-${id}`}
                                                  >
                                                    <p>{name}</p>
                                                    {icons.chevron_right}
                                                  </Link>
                                                );
                                              } else {
                                                return (
                                                  <Link
                                                    onClick={() => {
                                                      setActive(null);
                                                      setOpen(false);
                                                    }}
                                                    className={`text-black block px-3 hover:bg-croonus-3 py-2 hover:text-white`}
                                                    href={`/kategorije/${slug_path}`}
                                                    key={`category-${id}`}
                                                  >
                                                    {name}
                                                  </Link>
                                                );
                                              }
                                            },
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                      </div>
                    )}
                </div>
              </div>
            </div>
            <Link
              href="/brendovi"
              className={`text-white text-sm uppercase hovereditem relative ${
                pathname === "/brendovi" && `underlineactive`
              } font-medium hover:bg-white hover:text-black rounded-[.5rem] nowrap px-2 xl:px-4 py-2`}
              onClick={() => {
                setOpen(false);
                setActive(null);
              }}
            >
              Brendovi
            </Link>
            <Link
              href={`/sekcija/new_arrival`}
              className={`text-white hovereditem relative ${
                pathname === "/sekcija/new_arrival" && `underlineactive`
              } text-sm uppercase font-medium hover:bg-white hover:text-black rounded-[.5rem] nowrap px-2 xl:px-4 py-2`}
              onClick={() => {
                setOpen(false);
                setActive(null);
              }}
            >
              Novo
            </Link>
            <Link
              href="/reference"
              className={`text-white text-sm uppercase hovereditem relative ${
                pathname === "/reference" && `underlineactive`
              } font-medium hover:bg-white hover:text-black rounded-[.5rem] nowrap px-2 xl:px-4 py-2`}
              onClick={() => {
                setOpen(false);
                setActive(null);
              }}
            >
              Reference
            </Link>

            <Link
              href="https://b2b.reflekta.rs/"
              rel="norefferer nopener"
              target="_blank"
              className="text-white text-sm uppercase font-medium hover:bg-white hover:text-black rounded-[.5rem] nowrap px-2 xl:px-4 py-2"
              onClick={() => {
                setOpen(false);
                setActive(null);
              }}
            >
              B2B Portal
            </Link>

            <Link
              href="/kontakt"
              className={`text-white text-sm hovereditem relative ${
                pathname === "/kontakt" && `underlineactive`
              } uppercase font-medium hover:bg-white hover:text-black rounded-[.5rem] nowrap px-2 xl:px-4 py-2`}
              onClick={() => {
                setOpen(false);
                setActive(null);
              }}
            >
              Kontakt
            </Link>
          </div>

          <div className="flex items-center xl:gap-5 lg:gap-2 min-w-fit">
            <div
              className="relative"
              ref={myRef}
              onClick={() => {
                setSearchIsOpen(!searchIsOpen);
                setSearchTerm("");
                setSearchData([]);
                setSearch("");

                setOpen(false);
                setActive(null);
              }}
            >
              <Image
                src={Search}
                width={31}
                height={31}
                alt="search"
                className="cursor-pointer hover:translate-y-0.5 transition-all ease min-w-[24px] mr-[0.4rem] invert"
              />
            </div>
            <div className="w-full relative">
              {wishListCount > 0 ? (
                <Link
                  href="/lista-zelja"
                  onClick={() => {
                    setOpen(false);
                    setActive(null);
                  }}
                >
                  <Image
                    src={Wishlist}
                    alt="wishlist"
                    width={31}
                    height={31}
                    className="cursor-pointer hover:translate-y-0.5 transition-all ease min-w-[24px] invert"
                  />
                </Link>
              ) : (
                <>
                  <Image
                    src={Wishlist}
                    width={31}
                    height={31}
                    alt="Reflekta"
                    className="cursor-pointer hover:translate-y-0.5 transition-all ease min-w-[24px] invert"
                    onClick={() => {
                      setMessage({
                        errorWishlist: !message?.errorWishlist,
                        messageWishlist: "Vaša lista želja je prazna.",
                      });
                      setOpen(false);
                      setActive(null);
                    }}
                  />
                  {message.errorWishlist && (
                    <div className="absolute z-[1500]  bg-white w-96 p-1.5 rounded-xl xl:right-0 top-9">
                      <div className="border-2 rounded-xl p-3.5">
                        <span className="font-medium">
                          {message?.messageWishlist}
                        </span>
                        <p className="w-[80%] text-sm">
                          Da biste videli sadržaj ove stranice, prvo morate
                          dodati artikle u listu želja.
                        </p>
                        <i
                          className="fa-solid fa-x absolute top-4 right-4 text-xs hover:text-red-500 cursor-pointer"
                          onClick={() =>
                            setMessage({
                              errorWishlist: !message?.errorWishlist,
                            })
                          }
                        ></i>
                      </div>
                    </div>
                  )}
                </>
              )}

              <span className="absolute -top-4 -right-2 text-white">
                {wishListCount}
              </span>
            </div>
            {/* {wishListCount > 0 ? (
              <div ref={myRef} className="on-click-show-div-zero">
                <span
                  className="close-div-zero"
                  onClick={handleCloseClickWishlist}
                >
                  X
                </span>
                <b>Vaša lista želja je prazna.</b>
                Da biste videli sadržaj ove stranice, prvo morate dodati artikle
                u Vašu listu želja.
              </div>
            ): null} */}
            {/* <span className="text-black text-base font-light"> |</span> */}

            {/* <div className="w-full relative">
                  {cartCount > 0 ? (
                    <Link href="/korpa" onClick={() => setOpen(false)}>
                      <Image
                        src={Cart}
                        alt="cart"
                        width={30}
                        height={30}
                        className="cursor-pointer hover:translate-y-0.5 transition-all ease min-w-[24px] invert"
                      />
                    </Link>
                  ) : (
                    <>
                      <Image
                        src={Cart}
                        width={30}
                        height={30}
                        alt="cart"
                        className="cursor-pointer hover:translate-y-0.5 transition-all ease min-w-[24px] invert"
                        onClick={() =>
                          setMessage({
                            errorCart: !message?.errorCart,
                            messageCart: "Vaša korpa je prazna.",
                          })
                        }
                      />
                      {message.errorCart && (
                        <div className="absolute z-[1500]  bg-white w-96 p-1.5 rounded-xl xl:right-0 top-9">
                          <div className="border-2 rounded-xl p-3.5">
                            <span className="font-medium">
                              {message?.messageCart}
                            </span>
                            <p className="w-[80%] text-sm">
                              Da biste videli sadržaj ove stranice, prvo morate
                              dodati artikle u korpu.
                            </p>
                            <i
                              className="fa-solid fa-x absolute top-4 right-4 text-xs hover:text-red-500 cursor-pointer"
                              onClick={() =>
                                setMessage({
                                  errorCart: !message?.errorCart,
                                })
                              }
                            ></i>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  <span className="absolute -top-4 -right-2 text-white">
                    {cartCount}
                  </span>
                </div>
                {isLoggedIn ? (
                  <>
                    <p className="text-white ml-[2rem] absolute -top-[10px] right-[0rem] text-[13px]">
                      Dobrodošli na profil!
                    </p>
                    <div
                      className="relative bg-croonus-3 p-[0.3rem] ml-[1rem] rounded-lg min-w-[45px] min-h-[45px] -mt-[0.4rem] hover:translate-y-0.5 transition-all ease cursor-pointer flex justify-center items-center"
                      onClick={toggleDropdown}
                    >
                      <Image src={User} alt="user"
                             width={26}
                             height={26}
                             className="invert" />
                      {isDropdownOpen && (
                        <div className="dropdownProfil">
                          <ul className="absolute right-0 top-[3.2rem] min-w-max rounded-lg">
                            <li className="mb-[0.2rem] px-[3rem] py-[1rem] bg-[#f8f8f8] rounded-lg transition-all ease border border-[#dadada]">
                              <Link href="/customer-profil">Moj profil</Link>
                            </li>
                            <li className="px-[3rem] py-[1rem] bg-[#f8f8f8]  rounded-lg transition-all ease border border-[#dadada]">
                              <button onClick={logoutHandler}>Odjava</button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <Link
                    href="/nalog"
                    className="bg-croonus-3 p-[0.3rem] ml-[1rem] rounded-lg min-w-[45px] min-h-[45px] -mt-[0.4rem] hover:translate-y-0.5 transition-all ease cursor-pointer flex justify-center items-center"
                  >
                    <Image
                      src={User}
                      alt="user"
                      width={26}
                      height={26}
                      className="invert"
                    />
                  </Link>
                )}
                 */}
          </div>
        </div>
      </div>
      {open && (
        <div
          className="bg-black bg-opacity-40 w-full h-screen fixed top-0 left-0 z-[500]"
          onClick={() => {
            setOpen(false);
            setActive(null);
          }}
        ></div>
      )}
      {message.errorWishlist || message.errorCart ? (
        <div
          onClick={() => setMessage({ errorWishlist: false })}
          className="fixed top-0 left-0 bg-black bg-opacity-40 z-[500] h-screen w-screen"
        ></div>
      ) : null}
      <div
        className={
          searchIsOpen
            ? `bg-white py-[8rem] shadow-xl fixed top-[4.8rem] left-0 w-full translate-y-0 duration-[700ms] transition-all min-h-[30%] z-[21] flex justify-center items-center`
            : `bg-white  py-[8rem] fixed shadow-xl top-0 left-0 w-full -translate-y-full duration-[700ms] transition-all min-h-[30%] z-[21] flex justify-center items-center`
        }
      >
        <form onSubmit={handleSearch} className="relative">
          <div className="flex items-center gap-5 relative">
            <input
              type="text"
              ref={searchRef}
              placeholder="Pretraži proizvode"
              className="w-[600px] placeholder:text-white h-[3rem] border-l-0 placeholder:text-sm border-t-0 border-r-0 border-b-gray-300 focus:outline-none focus:border-croonus-2 text-white focus:ring-0 placeholder:uppercase bg-croonus-2 rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onInput={(e) => setSearch(e.target.value)}
            />
            <i
              onClick={handleSearch}
              className="absolute right-2 cursor-pointer fa-solid fa-search text-gray-400"
            ></i>
          </div>
          {searchTerm.length > 0 ? (
            <div className="absolute top-10 w-full bg-white shadow-xl rounded-b-lg max-h-[350px] overflow-y-auto customscroll">
              <div className="flex flex-col gap-2 w-full relative">
                <div>
                  {searchData?.length > 0
                    ? searchData.slice(0, 6).map((item) => (
                        <Link
                          href={`/proizvod/${item?.slug_path}`}
                          className="h-[83px]"
                          onClick={() => {
                            setSearchTerm("");
                            setSearch("");
                            setSearchIsOpen(false);
                          }}
                        >
                          <div className="flex items-center justify-between h-[83px] p-2.5 hover:bg-[#f0f0f0] cursor-pointer">
                            <div className="flex items-center p-1 gap-5 max-h-[83px]">
                              <div>
                                {item?.image[0]?.toString() && (
                                  <Image
                                    src={item?.image[0]?.toString()}
                                    width={60}
                                    height={60}
                                    alt="Reflekta"
                                    className="object-contain"
                                  />
                                )}
                              </div>

                              <p className="text-sm">{item.basic_data.name}</p>
                            </div>
                            <p className="italic text-xs">
                              U {item?.categories[0]?.name}
                            </p>
                          </div>
                        </Link>
                      ))
                    : null}
                </div>
                {searchData?.length > 6 && (
                  <div
                    className="flex py-1.5 justify-center items-center sticky bottom-0 w-full bg-croonus-3 text-white hover:text-white hover:bg-croonus-2 cursor-pointer"
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
        </form>
        <span
          onClick={() => {
            setSearchIsOpen(!searchIsOpen);
            setSearchTerm("");
          }}
          className="absolute text-lg hover:text-red-500 text-white cursor-pointer top-3 right-3"
        >
          X
        </span>
      </div>
      {searchIsOpen ? (
        <div
          onClick={() => {
            setSearchIsOpen(false);
            setSearchTerm("");
            setSearch("");
          }}
          className="bg-black bg-opacity-40 w-full fixed w-screen h-screen z-20"
        ></div>
      ) : null}
    </>
  );
};

export default Navigation;

const CategoryItem = ({ category, level = 0, setActive, active, setOpen }) => {
  const { id, name, slug_path, children } = category;
  const hasChildren = children && children.length > 0;

  const handleMouseEnter = () => {
    setActive((prevActive) => ({
      ...prevActive,
      [`${"child_".repeat(level)}category`]: category,
      [`${"child_".repeat(level + 1)}category`]: null,
    }));
  };

  return (
    <div
      className={`relative ${level > 0 ? "ml-4" : ""}`}
      onMouseEnter={handleMouseEnter}
    >
      <Link
        href={`/kategorije/${slug_path}`}
        onClick={() => {
          setActive(null);
          setOpen(false);
        }}
        className={`text-black block px-3 hover:bg-croonus-3 py-2 hover:text-white ${active[`child_${"child_".repeat(level)}category`]?.id === id ? "bg-croonus-3 text-white" : ""}`}
      >
        {name}
        {hasChildren && icons.chevron_right}
      </Link>
      {hasChildren && (
        <div
          className={`absolute flex flex-col top-0 left-full bg-white shadow-lg w-max`}
        >
          {children.map((child) => (
            <CategoryItem
              key={`category-${child.id}`}
              category={child}
              level={level + 1}
              setActive={setActive}
              active={active}
              setOpen={setOpen}
            />
          ))}
        </div>
      )}
    </div>
  );
};

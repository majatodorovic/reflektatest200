"use client";
import { useState, useEffect, useCallback } from "react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import Image from "next/image";
import FilterIcon from "../../../assets/Icons/filter.png";
import Thumb from "../Products/Products";
import { get, list, post } from "@/app/api/api";
import Filters from "../../Filters/Filters";
import { useUrl } from "nextjs-current-url";
import GenerateBreadCrumbsServer from "@/helpers/generateBreadCrumbsServer";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import Link from "next/link";
import classes from "@/components/CategoriesPageComponents/Products/ProductsItem.module.css";
import { convertHttpToHttps } from "@/helpers/convertHttpToHttps";
import { CategoryThumb } from "@/_components/category-thumb";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

const CategoryPage = ({
  filter,
  singleCategory,
  productsFromSection,
  slug,
}) => {
  const { data: categoryChildren } = useQuery({
    queryKey: [
      "categoryChildren",
      singleCategory?.id,
      singleCategory?.group?.id,
    ],
    queryFn: async () => {
      return await get(
        `/categories/product/tree?parent=${singleCategory?.id}&group=${singleCategory?.group?.id}`,
      ).then((res) => res?.payload);
    },
  });

  const params = useSearchParams();
  const url = useUrl();
  useEffect(() => {
    if (window.scrollY > 0) {
      window.scrollTo(0, 0);
    }
  }, []);
  const [openFilter, setOpenFilter] = useState(false);
  const [productData, setProductData] = useState({
    products: [],
    pagination: {},
  });
  const [sort, setSort] = useState({ field: "", direction: "" });
  const [tempSort, setTempSort] = useState({ field: "", direction: "" });
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [availableFilters, setAvailableFilters] = useState(filter);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [changeFilters, setChangeFilters] = useState(false);
  const [tempSelectedFilters, setTempSelectedFilters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isBeingFiltered, setIsBeingFiltered] = useState(false);
  const isPagination = process.env.PAGINATION === "true";
  const [filterObjectBasedOnQuery, setFilterObjectBasedOnQuery] = useState([]);
  const getProducts = useCallback(
    async (limit, page, sort, selectedFilters) => {
      if (!productsFromSection && !slug) {
        const getProductList = await list(
          `/products/category/list/${singleCategory?.id}`,
          {
            limit: limit,
            sort: sort,
            page: page,
            filters: selectedFilters,
          },
        ).then((res) => {
          if (isPagination) {
            setProductData({
              products: res?.payload?.items,
              pagination: res?.payload?.pagination,
            });
          } else {
            setIsBeingFiltered(false);
            setProductData((prevProductData) => {
              const existingProducts = prevProductData.products || [];
              const newProducts = res?.payload?.items || [];
              const filteredNewProducts = newProducts.filter(
                (newProduct) =>
                  !existingProducts.some(
                    (existingProduct) => existingProduct.id === newProduct.id,
                  ),
              );

              const updatedProducts = [
                ...existingProducts,
                ...filteredNewProducts,
              ];

              return {
                ...prevProductData,
                products:
                  selectedFilters?.length > 0 ? newProducts : updatedProducts,
                pagination: res?.payload?.pagination,
              };
            });
          }

          setTimeout(() => {
            setLoading(false);
          }, 1200);
        });
        return getProductList;
      } else if (!productsFromSection && slug) {
        const getProductList = await list(`/products/section/list/${slug}`, {
          limit: limit,
          sort: sort,
          page: page,
          filters: selectedFilters,
        }).then((res) => {
          setProductData({
            products: res?.payload?.items,
            pagination: res?.payload?.pagination,
          });
          setTimeout(() => {
            setLoading(false);
          }, 1200);
        });
        return getProductList;
      } else {
        const getProductList = await list(`/products/new-in/list`, {
          limit: limit,
          sort: sort,
          page: page,
          filters: selectedFilters,
        }).then((res) => {
          setProductData({
            products: res?.payload?.items,
            pagination: res?.payload?.pagination,
          });
          setTimeout(() => {
            setLoading(false);
          }, 1200);
        });
        return getProductList;
      }
    },
    [slug, singleCategory, page, url?.search],
  );

  useEffect(() => {
    getProducts(limit, page, sort, selectedFilters);
  }, [limit, sort, page, selectedFilters, getProducts, url?.search]);

  useEffect(() => {
    if (changeFilters) {
      if (!productsFromSection && !slug) {
        post(`/products/category/filters/${singleCategory?.id}`, {
          filters: tempSelectedFilters,
        }).then((response) => {
          setAvailableFilters(response?.payload);
        });
      } else if (productsFromSection?.length !== 0 && slug) {
        post(`/products/section/filters/${slug}`, {
          filters: tempSelectedFilters,
        }).then((response) => {
          setAvailableFilters(response?.payload);
        });
      } else {
        post(`/products/section/filters/new-in`, {
          filters: tempSelectedFilters,
        }).then((response) => {
          setAvailableFilters(response?.payload);
        });
      }

      setChangeFilters(false);
    }
  }, [
    changeFilters,
    productsFromSection,
    slug,
    singleCategory,
    tempSelectedFilters,
  ]);

  //izabrani filteri u URL-u
  const [newQuery, setNewQuery] = useState();
  useEffect(() => {
    const updateQuery = () => {
      if (tempSelectedFilters?.length > 0) {
        const filterQuery = tempSelectedFilters
          .map((item) => {
            if (item?.column && item?.value?.selected?.length > 0) {
              const selectedValues = item.value.selected
                .map((value) => encodeURIComponent(value))
                .join("_");
              return `${encodeURIComponent(item.column)}=${selectedValues}`;
            }
            return null;
          })
          .filter(Boolean)
          .join("&");

        const sortQuery =
          tempSort?.field && tempSort?.direction
            ? `&sort=${tempSort.field}_${tempSort.direction}`
            : "";

        const pageQuery = `&strana=${page}`;

        setNewQuery(
          filterQuery ? `?${filterQuery}${sortQuery}${pageQuery}` : "",
        );
      } else {
        setNewQuery("");
      }
    };

    updateQuery();
  }, [tempSelectedFilters, tempSort, page]);

  useEffect(() => {
    const extractFiltersFromQuery = async () => {
      const filtersURL = url?.search?.slice(1, url?.search?.length);
      const splittedFiltersURL = filtersURL?.split("&");

      const splittedFiltersURL2 = splittedFiltersURL?.filter((item) => {
        return !item.startsWith("sort=") && !item.startsWith("strana=");
      });

      const sortQuery = params?.get("sort");
      let pageQuery;

      if (process.env.PAGINATION === "true") {
        pageQuery = params?.get("strana");
      }

      const sortArray = sortQuery?.split("_") ?? [];
      const sortObject = {
        field: sortArray[0] ?? "",
        direction: sortArray[1] ?? "",
      };
      if (filtersURL) {
        const filterObject = splittedFiltersURL2?.map((filter) => {
          const [column, value] = (filter ?? "").split("=");
          const selected = (value ?? "").split("_").map((val) => {
            return column === "pv-r|cena"
              ? Number(decodeURI(val))
              : decodeURIComponent(val);
          });

          return {
            column: decodeURIComponent(column),
            value: {
              selected: selected,
            },
          };
        });

        setSelectedFilters(filterObject);
        setTempSelectedFilters(filterObject);
        setFilterObjectBasedOnQuery(filterObject);
        setPage(pageQuery);
        if (sortQuery) {
          setSort(sortObject);
          setTempSort(sortObject);
        }
        await getProducts(limit, pageQuery, sort, filterObject);
      }

      //ukljuciti kada bude imala paginacija
      // if (page) {
      //   setPage(page);
      // }
    };
    const showButton = document.getElementById("showButton");
    if (showButton) {
      setTimeout(() => {
        showButton.click();
      }, 1000);
    }
    extractFiltersFromQuery();
  }, [url?.search]);

  useEffect(() => {
    if (newQuery) {
      let path;

      if (singleCategory) {
        path = `/kategorije/${singleCategory.slug_path}${newQuery}`;
      } else if (slug) {
        path = `/sekcija/${slug}${newQuery}`;
      } else {
        path = `/products/new-in/list${newQuery}`;
      }

      window.history.replaceState(null, "", path);
    }
  }, [newQuery, singleCategory, slug]);

  const [label, setLabel] = useState("");
  let steps = [""];
  if (singleCategory?.parents?.length > 0) {
    singleCategory?.parents?.map((item) => {
      steps.push(item);
    });
  }
  const pathame = usePathname();

  const { data: categories, isFetching: isLoading } = useQuery({
    queryKey: ["categoriesTree"],
    queryFn: async () => {
      return await get("/categories/product/tree").then((res) => res?.payload);
    },
  });

  let slug_path = (pathame ?? "/")
    ?.split("/")
    ?.slice(2, (pathame ?? "/")?.split("/")?.length)
    ?.join("/");

  const findActiveCategories = (categories = [], slug_path = "") => {
    let arr = [];

    const findParentCategories = (id, categories) => {
      for (const category of categories) {
        if (category.id === id) {
          arr.push(category);
          findParentCategories(category.parent_id, categories);
        }
      }
    };

    for (const category of categories) {
      if (category.slug_path === slug_path) {
        arr.push(category);
      } else {
        arr.push(...findActiveCategories(category.children, slug_path));
      }
    }

    findParentCategories(arr[arr?.length - 1]?.parent_id, categories);
    return arr;
  };

  const reverseArray = (arr) => {
    let reversedArray = [];
    for (let i = arr.length - 1; i >= 0; i--) {
      reversedArray.push(arr[i]);
    }
    return reversedArray;
  };

  const active_categories = reverseArray(
    findActiveCategories(categories, slug_path),
  );

  const active_categories_ids = (active_categories ?? [])?.map(
    (item) => item?.id,
  );

  const renderData = () => {
    if (categoryChildren?.length > 0) {
      return <CategoryThumb data={categoryChildren} loading={loading} />;
    } else {
      return (
        <Thumb
          data={productData?.products ?? productsFromSection}
          slider={false}
          loading={loading}
        />
      );
    }
  };

  return (
    <>
      <div className="w-full text-black">
        {router?.pathname?.includes("search") ? null : (
          <div className="w-[90%] mx-auto mt-4 pb-1 pt-1 max-md:hidden">
            <Link href={`/`} className={`text-sm font-medium`}>
              Početna /
            </Link>
            {pathame?.includes("new_arrival") ? (
              <h3 className={`text-sm font-bold inline-block`}>&nbsp;Novo</h3>
            ) : null}
            {pathame?.includes("top_sellers") ? (
              <h3 className={`text-sm font-bold inline-block`}>
                &nbsp;Najprodavanije
              </h3>
            ) : null}
            {pathame?.includes("recommendation") ? (
              <h3 className={`text-sm font-bold inline-block`}>
                &nbsp;Preporučeno
              </h3>
            ) : null}
            {singleCategory?.parents &&
              singleCategory?.parents?.map((item, index) => {
                return (
                  <Link
                    className={`text-sm font-medium`}
                    href={`/kategorije/${item?.slug_path}`}
                  >
                    &nbsp;{item?.name} /
                  </Link>
                );
              })}
            <h3 className={`text-sm font-bold inline-block`}>
              &nbsp;{singleCategory?.basic_data?.name}
            </h3>
          </div>
        )}
      </div>
      <div
        className={`4xl:container mx-auto ${
          productData?.products?.length > 0 ? `mb-[4rem]` : `mb-[25rem]`
        } `}
      >
        <div className="px-[5%] max-md:mt-[2rem] mt-[4rem] flex items-center justify-between">
          <h1 className="font-bold text-[1.313rem] max-md:text-[1rem] text-black">
            {singleCategory?.basic_data?.name ??
              "Proizvodi iz izabrane sekcije"}
          </h1>
          <div
            className={`flex items-center gap-3 max-md:hidden ${categoryChildren?.length > 0 && "!hidden"}`}
          >
            <h1 className="font-medium text-[0.875rem] max-md:text-[0.75rem] text-black">
              Prikaži artikala:
            </h1>
            <select
              className={`border-[#e6e6e6] rounded-lg border focus:outline-0 focus:ring-0 focus:border-[#e6e6e6] cursor-pointer`}
              onChange={(e) => {
                setLimit(e.target.value);
                setLoading(true);
              }}
            >
              <option value="6">6</option>
              <option value="12">12</option>
              <option value="24">24</option>
            </select>
          </div>
          <div
            className={`border-2 ${
              process.env.FILTER_TYPE === "left"
                ? `md:hidden border-black max-md:flex max-md:items-center max-md:gap-[30px] px-[14px] py-[10px] cursor-pointer`
                : `border-black max-md:flex max-md:items-center md:gap-[30px] pl-[14px] py-[10px] cursor-pointer`
            } `}
            onClick={() => setOpenFilter(true)}
          >
            <Image
              src={FilterIcon}
              alt="Filter"
              width={20}
              height={20}
              className={``}
            />
            <h1 className="uppercase max-md:px-1 font-bold text-[13.74px] text-black">
              Filteri
            </h1>
          </div>
        </div>
        <div className={`px-[5%]`}>
          <h1 className="font-medium max-sm:mt-5 text-[1rem] max-md:text-[1rem] text-black">
            {singleCategory?.basic_data?.short_description}
          </h1>
          <h1 className="font-medium max-sm:mt-5 text-[.9rem] max-md:text-[1rem] sm:mt-5 text-black">
            {singleCategory?.basic_data?.description}
          </h1>
          <div
            className={`${
              process.env.FILTER_LIST === "ON" &&
              tempSelectedFilters?.length > 0
                ? `mt-5 flex flex-wrap items-center gap-[0.25rem]`
                : `hidden`
            }`}
          >
            {tempSelectedFilters?.map((filter) => {
              const splitFilter = filter?.column?.split("|");
              const filterName = splitFilter[1];
              return (
                <div
                  className={`font-normal bg-[#f6f6f6] text-[0.8rem] relative max-md:text-[0.7rem]  rounded-lg flex items-center gap-1 mr-[0.6rem]`}
                >
                  <div className={`flex items-center gap-2  px-1 pl-[0.8rem]`}>
                    <h1>
                      {filterName?.charAt(0).toUpperCase() +
                        filterName?.slice(1)}
                      :
                    </h1>
                    <span>
                      {filter?.value?.selected?.map((item, index, array) => {
                        const isLastItem = index === array.length - 1;
                        return `${filterName === "cena" ? item + "RSD" : item}${
                          isLastItem ? "" : ","
                        }`;
                      })}
                    </span>
                  </div>
                  <div
                    onClick={() => {
                      const newSelectedFilters = tempSelectedFilters.filter(
                        (item) => item.column !== filter.column,
                      );
                      setTempSelectedFilters(newSelectedFilters);
                      setSelectedFilters(newSelectedFilters);
                      setChangeFilters(true);
                      if (tempSelectedFilters.length === 1) {
                        window.history.replaceState(
                          null,
                          "",
                          singleCategory
                            ? `/kategorije/${singleCategory.slug_path}`
                            : `/sekcija/${slug}`,
                        );
                      }
                    }}
                    className={`bg-[#f6f6f6] py-[0.4rem] pl-[0.2rem] pr-[0.8rem] cursor-pointer  self-stretch h-full flex-1 right-0  rounded-r-lg flex items-center flex-col justify-center`}
                  >
                    <i
                      className={`fa fa-solid  fa-trash text-[0.8rem] text-black cursor-pointer py-[0.35rem] px-1 hover:text-red-500`}
                      onClick={() => {
                        const newSelectedFilters = tempSelectedFilters.filter(
                          (item) => item.column !== filter.column,
                        );
                        setTempSelectedFilters(newSelectedFilters);
                        setSelectedFilters(newSelectedFilters);
                        setChangeFilters(true);
                        if (tempSelectedFilters.length === 1) {
                          window.history.replaceState(
                            null,
                            "",
                            singleCategory
                              ? `/kategorije/${singleCategory.slug_path}`
                              : `/sekcija/${slug}`,
                          );
                        }
                      }}
                    ></i>
                  </div>
                </div>
              );
            })}
            {tempSort?.field && (
              <div
                onClick={() => {
                  setTempSort({
                    field: "",
                    direction: "",
                  });
                  setSort({ field: "", direction: "" });
                  setChangeFilters(true);
                  window.history.replaceState(
                    null,
                    "",
                    singleCategory
                      ? `/kategorije/${singleCategory.slug_path}`
                      : `/sekcija/${slug}`,
                  );
                }}
                className={`font-normal bg-[#f6f6f6] text-[0.8rem] relative max-md:text-[0.7rem]  rounded-lg flex items-center gap-1 mr-[0.6rem]`}
              >
                <div className={`flex items-center gap-2  px-1 pl-[0.8rem]`}>
                  <h1>Sortiraj po:</h1>
                  <span>{label}</span>
                </div>
                <div
                  className={`bg-[#f6f6f6] py-[0.4rem] pl-[0.2rem] pr-[0.8rem] cursor-pointer  self-stretch h-full flex-1 right-0  rounded-r-lg flex items-center flex-col justify-center`}
                >
                  <i
                    className={`fa fa-solid  fa-trash text-[0.8rem] text-black cursor-pointer py-[0.35rem] px-1 hover:text-red-500`}
                    onClick={() => {
                      setTempSort({
                        field: "",
                        direction: "",
                      });
                      setSort({ field: "", direction: "" });
                      setChangeFilters(true);
                      window.history.replaceState(
                        null,
                        "",
                        singleCategory
                          ? `/kategorije/${singleCategory.slug_path}`
                          : `/sekcija/${slug}`,
                      );
                    }}
                  ></i>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mx-[5%] mt-[4.125rem] flex flex-row">
          <div
            className={`flex flex-col max-w-[340px] ${
              process.env.FILTER_TYPE === "left" ? "max-md:hidden" : "hidden"
            }
          }`}
          >
            <div className="mt-[1.245rem] mr-[1rem] max-h-full ">
              <Filters
                categoryChildren={categoryChildren}
                active_categories_ids={active_categories_ids}
                categories={categories}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
                availableFilters={availableFilters}
                changeFilters={changeFilters}
                setTempSelectedFilters={setTempSelectedFilters}
                tempSelectedFilters={tempSelectedFilters}
                setChangeFilters={setChangeFilters}
                setSort={setTempSort}
                sort={tempSort}
                setLabel={setLabel}
                setIsBeingFiltered={setIsBeingFiltered}
                isLoading={isLoading}
              />
            </div>

            <div
              className={`sticky bottom-0 bg-white border-t border-t-[#ededed] mr-[1rem] ${(categoryChildren?.length > 0 || isLoading) && "!hidden"}`}
            >
              <div className="mx-[1.25rem] py-[2.813rem] flex gap-[20px] items-center">
                <button
                  className="w-[7.625rem] h-[3.188rem] text-sm font-bold border border-[#191919] text-[#191919] uppercase flex items-center justify-center text-center rounded-lg"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedFilters([]);
                    setTempSelectedFilters([]);
                    setChangeFilters(true);
                    setSort({ field: "", direction: "" });
                    setTempSort({ field: "", direction: "" });
                    if (selectedFilters?.length > 0) {
                      setLoading(true);
                    }
                    setIsBeingFiltered(true);
                    if (newQuery) {
                      window.history.replaceState(
                        null,
                        "",
                        singleCategory
                          ? `/kategorije/${singleCategory.slug_path}`
                          : `/sekcija/${slug}`,
                      );
                    }
                  }}
                >
                  Obriši
                </button>
                <button
                  id={`showButton`}
                  className="w-[237px] h-[3.188rem] text-sm font-bold border bg-croonus-3 text-white uppercase flex items-center justify-center text-center rounded-lg"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedFilters(tempSelectedFilters);
                    setIsBeingFiltered(true);
                    setChangeFilters(true);
                    setOpenFilter(false);
                    setSort(tempSort);
                    if (tempSelectedFilters?.length > 0) {
                      setLoading(true);
                    }
                  }}
                >
                  Prikaži rezultate
                </button>
              </div>
            </div>
          </div>
          <div
            className={`h-fit grid flex-1 max-md:grid-cols-2 gap-y-[40px] gap-x-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-[11px]`}
          >
            {loading ? (
              <>
                {Array.from({ length: 12 }, (x, i) => (
                  <div
                    key={i}
                    className="max-md:h-[250px] h-[500px] max-md:w-full xl:w-[300px] lg:w-[250px] w-[120px] 2xl:w-[240px] 3xl:w-[300px] col-span-1 bg-slate-300 object-cover animate-pulse"
                  ></div>
                ))}
              </>
            ) : (
              renderData()
            )}

            <div
              className={`col-span-2 md:col-span-2 lg:col-span-3 2xl:col-span-4 flex items-center gap-3.5 justify-end ${categoryChildren?.length > 0 && "!hidden"}`}
            >
              {productData?.pagination?.selected_page &&
                productData?.pagination?.total_items > 12 &&
                process.env.PAGINATION === "true" && (
                  <div className={`flex items-center gap-1`}>
                    {Array.from(
                      {
                        length: Math.min(
                          5,
                          productData.pagination.total_pages -
                            productData.pagination.selected_page +
                            3,
                          productData.pagination.total_pages,
                        ),
                      },
                      (x, i) =>
                        i +
                        Math.max(productData.pagination.selected_page - 2, 1),
                    ).map((num) => (
                      <span
                        key={num}
                        className={`${
                          num === productData.pagination.selected_page
                            ? "cursor-pointer select-none bg-croonus-3 py-1 px-3 rounded-lg text-white"
                            : "cursor-pointer select-none py-1 px-3 border border-white hover:border-croonus-3 hover:text-croonus-3 rounded-lg"
                        }`}
                        onClick={() => {
                          setPage(num);
                          window.scrollTo(0, 0);
                          setLoading(true);
                        }}
                      >
                        {num}
                      </span>
                    ))}
                  </div>
                )}
            </div>

            <div
              className={`col-span-2 md:col-span-2 lg:col-span-3 2xl:col-span-4 flex items-center justify-center`}
            >
              {!isPagination &&
                productData?.pagination?.selected_page <
                  productData?.pagination?.total_pages && (
                  <button
                    onClick={() => {
                      setPage(Number(page) + 1);
                      setLoading(true);
                      localStorage.setItem("page", Number(page) + 1);
                    }}
                    className={`bg-croonus-2 text-white rounded-xl px-4 py-2.5 text-sm font-medium hover:bg-opacity-90`}
                  >
                    Učitaj još
                  </button>
                )}
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          openFilter
            ? `fixed ${
                process.env.FILTER_TYPE === "left" ? `md:hidden` : ``
              } overflow-y-auto flex flex-col justify-between z-[6000] top-0 right-0 bg-white shadow-lg translate-x-0 transition-all duration-500 h-screen max-md:w-screen w-[26.125rem]`
            : `
      fixed flex flex-col ${
        process.env.FILTER_TYPE === "left" ? `md:hidden` : ``
      } justify-between z-[6000] top-0 right-0 bg-white shadow-lg translate-x-full transition-all duration-500 h-screen w-[26.125rem]`
        }
      >
        <div>
          <div className="border-l-0 border-t-0 border-r-0 border-b border-b-[#ededed] py-[1.563rem]">
            <div className="mx-[1.25rem] flex text-center items-center justify-end">
              <h1 className="text-[#191919] self-center mx-auto text-[0.938rem] font-bold">
                Filtriraj
              </h1>
              <div className="self-end">
                <i
                  className="fas fa-times ml-auto text-[#a3a3a3] cursor-pointer text-xl"
                  onClick={() => setOpenFilter(false)}
                ></i>
              </div>
            </div>
          </div>
          <div className="mx-[1.25rem] mt-[1.245rem] max-h-full h-full">
            <Filters
              setLabel={setLabel}
              categoryChildren={categoryChildren}
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
              availableFilters={availableFilters}
              changeFilters={changeFilters}
              setTempSelectedFilters={setTempSelectedFilters}
              tempSelectedFilters={tempSelectedFilters}
              setChangeFilters={setChangeFilters}
              setSort={setSort}
              sort={sort}
              categories={categories}
              active_categories_ids={active_categories_ids}
              setIsBeingFiltered={setIsBeingFiltered}
            />
          </div>
        </div>
        <div className="sticky bottom-0 bg-white border-t border-t-[#ededed]">
          <div className="mx-[1.25rem] py-[2.813rem] flex gap-[20px] items-center">
            <button
              className="w-[7.625rem] h-[3.188rem] text-sm font-bold border border-[#191919] text-[#191919] uppercase flex items-center justify-center text-center rounded-lg"
              onClick={(e) => {
                e.preventDefault();
                setSelectedFilters([]);
                setTempSelectedFilters([]);
                setTempSort({ field: "", direction: "" });
                if (selectedFilters?.length > 0) {
                  setLoading(true);
                }
                setIsBeingFiltered(true);
                setChangeFilters(true);
                setSort({ field: "", direction: "" });
                if (newQuery) {
                  window.history.replaceState(
                    null,
                    "",
                    singleCategory
                      ? `/kategorije/${singleCategory.slug_path}`
                      : `/sekcija/${slug}`,
                  );
                }
              }}
            >
              Obriši
            </button>
            <button
              id={`showButton`}
              className="w-[237px] h-[3.188rem] text-sm font-bold border bg-croonus-3 text-white uppercase flex items-center justify-center text-center rounded-lg"
              onClick={(e) => {
                e.preventDefault();
                setSelectedFilters(tempSelectedFilters);
                setChangeFilters(true);
                setOpenFilter(false);
                setSort(tempSort);
                setIsBeingFiltered(true);
                if (tempSelectedFilters?.length > 0) {
                  setLoading(true);
                }
              }}
            >
              Prikaži rezultate
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryPage;

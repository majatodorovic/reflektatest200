import { get, list } from "./api/api";
import IndexSlider from "../components/IndexSlider/IndexSlider";
import WhatWeOffer from "@/components/WhatWeOffer/WhatWeOffer";
import Products from "@/components/Products/Products";
import DailyDeals from "@/components/DailyDeals/DailyDeals";
import IndexSlider2 from "../components/IndexSlider2/IndexSlider2";
import DealsOfTheDay from "../components/DealsOfTheDay/DealsOfTheDay";
import IndexSlider3 from "../components/IndexSlider3/IndexSlider3";
import NewProducts from "@/components/NewProducts/NewProducts";
import ActionBanners from "@/components/ActionBanners/ActionBanners";

const fetchBanners = async () => {
  return await get("/banners/reflekta_index_slider").then(
    (response) => response?.payload
  );
};
const fetchMobileBanners = async () => {
  return await get("/banners/reflekta_index_slider_mobile").then(
    (response) => response?.payload
  );
};
const fetchIndexBanner = async () => {
  return await get("/banners/index_banner").then(
    (response) => response?.payload
  );
};
const fetchIndexBanner1 = async () => {
  return await get("/banners/index_banner_1").then(
    (response) => response?.payload
  );
};
const fetchIndexBanner2 = async () => {
  return await get("/banners/index_banner_2").then(
    (response) => response?.payload
  );
};
const fetchRecommendedCategories = async () => {
  return await list(
    "/categories/section/recommended"
  ).then((response) => response?.payload);
};
const fetchNewProducts = async () => {
  return await list("/products/new-in/list").then(
    (response) => response?.payload?.items
  );
};
const fetchTopSeller = async () => {
  return await list("/products/section/list/top_sellers").then(
    (res) => res?.payload.items
  );
};
const fetchAction = async () => {
  return await list("/products/section/list/action").then(
    (res) => res?.payload.items
  );
};
const fetchNewIn = async () => {
  return await list("/products/section/list/new_in").then(
    (res) => res?.payload.items
  );
};
const fetchAction1 = async () => {
  return await get("/banners/akcija1").then(
    (response) => response?.payload
  );
};
const fetchAction2 = async () => {
  return await get("/banners/akcija2").then(
    (response) => response?.payload
  );
};
const fetchAction3 = async () => {
  return await get("/banners/akcija3").then(
    (response) => response?.payload
  );
};
const fetchAction4 = async () => {
  return await get("/banners/akcija4").then(
    (response) => response?.payload
  );
};
const fetchRecommendedProducts = async () => {
  return await list(
    "/products/section/list/recommendation", { limit: -1 }
  ).then((res) => res?.payload.items);
};
const fetchBestSeller = async () => {
  return await list("/products/section/list/best_sell").then(
    (res) => res?.payload.items
  );
};
const fetchActionBanners = async () => {
  return await get("banners/action_banners").then(
    (response) => response?.payload
  );
};

const Index = async () => {
  const banners = await fetchBanners();
  const mobileBanner = await fetchMobileBanners();
  const indexBanner = await fetchIndexBanner();
  const indexBanner1 = await fetchIndexBanner1();
  const indexBanner2 = await fetchIndexBanner2();
  const topSeller = await fetchTopSeller();
  const actionProducts = await fetchAction();
  const action1 = await fetchAction1();
  const action2 = await fetchAction2();
  const action3 = await fetchAction3();
  const action4 = await fetchAction4();
  const newIn = await fetchNewIn();
  const recommendedProducts = await fetchRecommendedProducts();
  const bestSeller = await fetchBestSeller();
  const newProducts = await fetchNewProducts();
  const actionBanners = await fetchActionBanners();
  return (
    <>
      <IndexSlider banner={banners} mobileBanner={mobileBanner} />
      <WhatWeOffer />
      <Products
        indexBanner1={indexBanner1}
        indexBanner2={indexBanner2}
        topSeller={topSeller}
        newIn={newIn}
        actionProducts={actionProducts}
        action1={action1}
        action2={action2}
      />
      <NewProducts newProducts={newProducts} />
      <ActionBanners actionBanners={actionBanners} />
      <DailyDeals recommendedProducts={recommendedProducts} action4={action4} />
      <IndexSlider2 indexBanner={indexBanner} />
      <DealsOfTheDay products={bestSeller} action3={action3} />
      <IndexSlider3 />
    </>
  );
};
export default Index;

export const revalidate = 30;

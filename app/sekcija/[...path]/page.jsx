import { get, list, post } from "@/app/api/api";
import CategoryPage from "@/components/CategoriesPageComponents/CategoriesPageDisplay/CategoriesPageDisplay";

const fetchFilters = async (slug) => {
  const fetchFilters = await post(`/products/section/filters/${slug}`).then(
    (res) => res?.payload
  );
  return fetchFilters;
};

const fetchProductsFromSection = async (slug) => {
  const fetchProductsFromSection = await list(
    `/products/section/list/${slug}`
  ).then((res) => res?.payload?.items);
  return fetchProductsFromSection;
};

const Section = async ({ params: { path } }) => {
  const filters = await fetchFilters(path[path?.length - 1]);
  const productsFromSection = await fetchProductsFromSection(
    path[path?.length - 1]
  );
  return (
    <>
      <CategoryPage
        filter={filters}
        productsFromSection={productsFromSection}
        slug={path[path?.length - 1]}
      />
    </>
  );
};

export default Section;

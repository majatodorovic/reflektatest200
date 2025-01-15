import { get, list, post } from "@/app/api/api";
import CategoryPage from "@/components/CategoriesPageComponents/CategoriesPageDisplay/CategoriesPageDisplay";

const fetchFilters = async () => {
  const fetchFilters = await post(`/products/section/filters/new-in`).then(
    (res) => res?.payload
  );
  return fetchFilters;
};

const fetchProductsFromSection = async () => {
  const fetchProductsFromSection = await list(
    `/products/new-in/list`
  ).then((res) => res?.payload?.items);
  return fetchProductsFromSection;
};

const NewIn = async () => {
  const filters = await fetchFilters();
  const productsFromSection = await fetchProductsFromSection(
  );
  return (
    <>
      <CategoryPage
        filter={filters}
        productsFromSection={productsFromSection}
        slug="new-in"
      />
    </>
  );
};

export default NewIn;

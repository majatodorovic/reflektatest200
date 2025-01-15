import { get, list, post } from "@/app/api/api";
import CategoryPage from "@/components/CategoriesPageComponents/CategoriesPageDisplay/CategoriesPageDisplay";

const fetchFilters = async (slug) => {
  const fetchFilters = await post(`/products/category/filters/${slug}`).then(
    (res) => res?.payload
  );
  return fetchFilters;
};

const fetchSingleCategory = async (slug) => {
  const fetchSingleCategory = await get(
    `/categories/product/single/${slug}`
  ).then((res) => res?.payload);
  return fetchSingleCategory;
};

const getProducts = async (slug) => {
  const products = await list(`/products/category/list/${slug}`).then(
    (res) => res?.payload?.items
  );
  return products;
};

export const generateMetadata = async ({ params: { path } }) => {
  const category = await fetchSingleCategory(path[path?.length - 1]);
  return {
    title: category?.basic_data?.name,
    description:
      category?.basic_data?.description ??
      category?.basic_data?.short_description ??
      "Reflekta",
    image:
      category?.images?.image ??
      "https://api.reflekta.rs/croonus-uploads/config/b2c/logo-9d36d2206a200637a491d22d319d390e.png",
    openGraph: {
      title: category?.basic_data?.name,
      description:
        category?.basic_data?.description ??
        category?.basic_data?.short_description ??
        "Reflekta",
      images: [
        {
          url:
            category?.images?.image ??
            "https://api.reflekta.rs/croonus-uploads/config/b2c/logo-9d36d2206a200637a491d22d319d390e.png",
          width: 800,
          height: 600,
          alt: category?.basic_data?.name,
          description:
            category?.basic_data?.description ??
            category?.basic_data?.short_description ??
            "Reflekta",
        },
      ],
    },
  };
};

const Category = async ({ params: { path } }) => {
  const filters = await fetchFilters(path[path?.length - 1]);
  const singleCategory = await fetchSingleCategory(path[path?.length - 1]);
  const products = await getProducts(path[path?.length - 1]);

  return (
    <>
      <CategoryPage
        filter={filters}
        singleCategory={singleCategory}
        products={products}
      />
    </>
  );
};

export default Category;

export async function generateStaticParams() {
  const categories = await get("/categories/product/tree").then(
    (res) => res?.payload
  );

  let paths = [];

  const recursive = (categories) => {
    categories?.map((category) => {
      paths.push(category?.slug_path);
      recursive(category?.children);
    });
  };

  recursive(categories);

  return paths?.map((path) => ({
    path: path?.split("/"),
  }));
}

export const revalidate = 30;

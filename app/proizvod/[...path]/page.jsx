import { get, list } from "@/app/api/api";
import ProductDetailsPage from "@/components/ProductDetailsPage/ProductDetailsPage";
import { Suspense } from "react";
import { notFound } from "next/navigation";

const getProduct = async (id) => {
  const getProduct = await get(`/product-details/basic-data/${id}`).then(
    (response) => response?.payload
  );
  return getProduct;
};

const getProductImages = async (id) => {
  const getProductImages = await get(`/product-details/gallery/${id}`).then(
    (response) => response?.payload?.gallery
  );
  return getProductImages;
};

const getBadge = async (id) => {
  const getBadge = await get(`/product-details/gallery/${id}`).then(
    (response) => response?.payload?.stickers
  );
  return getBadge;
};

const getSpecification = async (id) => {
  const getSpecification = await get(
    `/product-details/specification/${id}`
  ).then((response) => response?.payload);
  return getSpecification;
};

const upsellProductsList = async (id) => {
  const upsellProducts = await list(`product-details/up-sell/${id}`).then(
    (response) => response?.payload?.items
  );
  return upsellProducts;
};
const relatedProductsList = async (id) => {
  const relatedProducts = await list(`product-details/recommended/${id}`).then(
    (response) => response?.payload?.items
  );
  return relatedProducts;
};

const crosssellProductsList = async (id) => {
  const crosssellProducts = await list(`product-details/cross-sell/${id}`).then(
    (response) => response?.payload?.items
  );
  return crosssellProducts;
};
const getProductDesc = async (id) => {
  const getProductDesc = await get(`/product-details/description/${id}`).then(
    (response) => response?.payload
  );
  return getProductDesc;
};

const getProductDeclaration = async (id) => {
  const getProductDeclaration = await get(
    `/product-details/declaration/${id}`
  ).then((response) => response?.payload);
  return getProductDeclaration;
};

const getBreadcrumbs = async (id) => {
  return await get(`/product-details/breadcrumbs/${id}`).then(
    (res) => res?.payload
  );
};
const tehnicalDocList = async (id) => {
  const tehnicalDoc = await list(`/product-details/technical-doc/${id}`).then(
    (response) => response?.payload
  );
  return tehnicalDoc;
};

const getProductSEO = async (id) => {
  return await get(`/product-details/seo/${id}`).then((res) => res?.payload);
};

export const generateMetadata = async ({ params: { path } }) => {
  const productSEO = await getProductSEO(path[path?.length - 1]);
  return {
    title: productSEO?.meta_title,
    description: productSEO?.meta_description,
    keywords: productSEO?.meta_keywords ?? [""],
    image: productSEO?.meta_image,
    openGraph: {
      title: productSEO?.meta_title,
      description: productSEO?.meta_description,
      image: productSEO?.meta_image,
      type: "website",
      images: [
        {
          url: productSEO?.meta_image,
          width: 800,
          height: 600,
          alt: productSEO?.meta_title,
        },
      ],
    },
  };
};

const ProductPage = async ({ params: { path } }) => {
  const product = await getProduct(path[path?.length - 1]);
  const gallery = await getProductImages(path[path?.length - 1]);
  const badge = await getBadge(path[path?.length - 1]);
  const specification = await getSpecification(path[path?.length - 1]);
  const productsDesc = await getProductDesc(path[path?.length - 1]);
  const relatedProducts = await relatedProductsList(path[path?.length - 1]);
  const upsellProducts = await upsellProductsList(path[path?.length - 1]);
  const crosssellProducts = await crosssellProductsList(path[path?.length - 1]);
  const productDeclaration = await getProductDeclaration(
    path[path?.length - 1]
  );
  const breadcrumbs = await getBreadcrumbs(path[path?.length - 1]);
  const tehnicalDoc = await tehnicalDocList(path[path?.length - 1]);

  return (
    <>
      {product ? (
        <ProductDetailsPage
          path={path[path?.length - 1]}
          gallery={gallery}
          badge={badge}
          specification={specification}
          products={product}
          productsDesc={productsDesc}
          relatedProducts={relatedProducts}
          upsellProducts={upsellProducts}
          crosssellProducts={crosssellProducts}
          productDeclaration={productDeclaration}
          breadcrumbs={breadcrumbs}
          tehnicalDoc={tehnicalDoc}
        />
      ) : (
        notFound()
      )}
    </>
  );
};

export default ProductPage;
export async function generateStaticParams() {
  const categories = await get("/categories/product/tree").then(
    (res) => res?.payload
  );
  const products = await list(
    `/products/category/list/${categories[0]?.slug}`,
    {
      limit: 10,
      page: 1,
      render: true,
      sort: {},
      filters: [],
    }
  ).then((res) => res?.payload);
  const trimmedProducts = products?.items;
  return trimmedProducts?.map((product) => ({
    path: product?.slug?.split("/"),
  }));
}

export const revalidate = 30;

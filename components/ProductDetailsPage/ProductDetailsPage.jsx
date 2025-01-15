"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ThumbSlider from "../ThumbSlider/ThumbSlider";
import Layout from "../UI/Layout";
import ItemInfo from "./ItemInfo";
import GenerateBreadCrumbsServer from "@/helpers/generateBreadCrumbsServer";
import Tabs from "./Tabs";
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import UpsellProducts from "../UpsellProducts/UpsellProducts";
import CrosssellProducts from "../CrosssellProducts/CrosssellProducts";
import Link from "next/link";

const ProductDetailsPage = ({
  products,
  gallery,
  path,
  badge,
  specification,
  productsDesc,
  relatedProducts,
  upsellProducts,
  crosssellProducts,
  productDeclaration,
  breadcrumbs,
  tehnicalDoc
}) => {
  const [loading, setLoading] = useState(true);
  const { push: navigate, asPath } = useRouter();
  const router = useRouter();
  useEffect(() => {
    products &&
      setTimeout(() => {
        setLoading(false);
      }, 2000);
  }, [products]);

  let steps = [];
  if (breadcrumbs) {
    breadcrumbs?.steps?.map((item) => {
      steps.push(item);
    });
    steps?.push(breadcrumbs?.end);
  }

  return (
    <>
      <div className="w-full text-black">
        {router?.pathname?.includes("search") ? null : (
          <div className="w-[90%] mx-auto mt-4 pb-1 pt-1 max-md:hidden">
            <Link className={`text-sm font-medium`} href={`/`}>
              Početna /
            </Link>
            {breadcrumbs &&
              steps?.map((item, index) => {
                const isLastItem = index === steps.length - 1;
                return isLastItem ? (
                  <h3 className={`text-sm font-bold inline-block`} key={index}>
                    &nbsp;{item?.name}
                  </h3>
                ) : (
                  <>
                    <Link
                      className={`text-sm font-medium`}
                      href={`/kategorije/${item?.slug}`}
                    >
                      &nbsp;{item?.name} /
                    </Link>
                  </>
                );
              })}
          </div>
        )}
      </div>
      <div className="mx-auto 4xl:container">
        <Layout>
          <div className="max-md:mt-[1rem] mt-[5rem] max-md:w-[95%] max-md:mx-auto mx-[5rem] gap-x-[4.063rem] md:grid md:grid-cols-4 max-md:mb-[2rem] mb-[5rem]">
            <ThumbSlider
              loading={loading}
              gallery={gallery}
              className="grid-row-span-4"
            />

            <div className="flex col-span-2">
              <ItemInfo
                product={products}
                badge={badge}
                loading={loading}
                path={path}
              />
            </div>
          </div>
          <div className="col-span-2">
            <Tabs
              products={products}
              productsDesc={productsDesc}
              specification={specification}
              productDeclaration={productDeclaration}
              loading={loading}
              tehnicalDoc={tehnicalDoc}
            />
          </div>
          {relatedProducts?.length > 0 && (
            <RelatedProducts
              relatedProducts={relatedProducts}
              loading={loading}
            />
          )}
          {upsellProducts?.length > 0 && (
            <UpsellProducts upsellProducts={upsellProducts} loading={loading} />
          )}
          {crosssellProducts?.length > 0 && (
            <CrosssellProducts
              crosssellProducts={crosssellProducts}
              loading={loading}
            />
          )}
        </Layout>
      </div>
    </>
  );
};

export default ProductDetailsPage;

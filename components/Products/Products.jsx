"use client";
import Layout from "../UI/Layout";
import ProductItemOne from "./ProductItemOne";
import ProductItemTwo from "./ProductItemTwo";

const Products = ({
  indexBanner2,
  indexBanner1,
  topSeller,
  action1,
  actionProducts,
  action2,
}) => {
  return (
    <div className={`pb-20 max-md:pb-5 bg-white`}>
      <Layout>
        <div className="pt-10 max-sm:pt-0 grid xl:grid-cols-4 relative gap-x-20 ">
          <ProductItemOne
            indexBanner1={indexBanner1}
            topSeller={topSeller}
            action1={action1}
          />
          <ProductItemTwo
            indexBanner2={indexBanner2}
            actionProducts={actionProducts}
            action2={action2}
          />
        </div>
      </Layout>
    </div>
  );
};

export default Products;

"use client";
import DealsItem from "./DealsItem";
import Layout from "../UI/Layout";

const DealsOfTheDay = ({ products, action3 }) => {
  return (
    <Layout>
      {products?.length > 0 && action3?.length > 0 && (
        <div className="max-md:-mt-36 grid grid-cols-1 max-md:gap-y-0 gap-x-12 py-[2rem] max-sm:pt-[2rem] max-sm:pb-[4rem] max-lg:gap-x-2 max-lg:gap-y-5 max-lg:py-20 lg:grid-cols-4 2xl:grid-cols-4 4xl:grid-cols-5 ">
          <DealsItem products={products} action3={action3} />
        </div>
      )}
    </Layout>
  );
};

export default DealsOfTheDay;

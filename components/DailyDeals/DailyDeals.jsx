"use client";
import DailyDealsProduct from "./DailyDealsProduct";
import Layout from "../UI/Layout";

const DailyDeals = ({ recommendedProducts, action4 }) => {
  return (
      <div className="my-[3rem] max-md:py-3 max-md:mt-0 gap-5 bg-[#f8f8f8] py-[2rem] max-md:pl-5 md:px-[3rem]">
        <DailyDealsProduct
          recommendedProducts={recommendedProducts}
          action4={action4}
        />
      </div>
  );
};

export default DailyDeals;

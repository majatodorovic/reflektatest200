"use client";
import { useState } from "react";
import ImageSliderLoop from "../ImageSliderLoop/ImageSliderLoop";
import ImageSliderLoopMobile from "../ImageSliderLoopMobile/ImageSliderLoopMobile";
import "/styles/globals.css";

const IndexSlider = ({ banner, mobileBanner }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <div className={`mx-auto relative mt-[2rem] `}>
      <div className="mx-auto w-full">
        <div className="flex flex-col mng">
          {banner?.length > 0 && (
            <div className="hidden lg:block ">
              <ImageSliderLoop
                bannerimages={banner}
                onBannerChange={setCurrentIndex}
              />
            </div>
          )}
          {mobileBanner?.length > 0 && (
            <div className="block lg:hidden h-full">
              <ImageSliderLoopMobile
                bannerimagesMobile={mobileBanner}
                onBannerChange={setCurrentIndex}
              />
            </div>
          )}
          <div className="bg-white">
            <div className=" max-lg:mx-auto max-lg:w-full max-lg:text-center w-[90%] mx-auto flex items-center justify-between">
              <p className="max-lg:text-[1.1rem] text-xl uppercase font-extrabold text-white lg:w-[55%] max-lg:w-[99%] max-lg:mx-auto relative z-100 y-[1rem]">
                {/*{banner[currentIndex]?.text}*/}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexSlider;

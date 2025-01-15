"use client";
import React, { useRef, useState, useEffect, use } from "react";
import { Autoplay, FreeMode, Pagination, Thumbs, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import classes from "./styles.module.css";

const ProductGallery = ({ gallery, loading }) => {
  const [navigationEnabled, setNavigationEnabled] = useState(true);
  useEffect(() => {
    if (gallery?.length >= 4) {
      setNavigationEnabled(true);
    } else {
      setNavigationEnabled(false);
    }
  }, [gallery?.length, navigationEnabled]);
  function ImageMagnifier({
    src,
    width,
    height,
    magnifierHeight = 300,
    magnifierWidth = 300,
    zoomLevel = 2.5,
  }) {
    const [[x, y], setXY] = useState([0, 0]);

    const [[imgWidth, imgHeight], setSize] = useState([0, 0]);

    const [showMagnifier, setShowMagnifier] = useState(false);

    return (
      <div
        style={{
          position: "relative",
          zIndex: 100,
        }}
        className="object-cover h-full bg-white"
      >
        <Image
          src={src}
          width={2000}
          height={2000}
          priority={true}
          className="h-full object-contain cursor-pointer"
          onMouseEnter={(e) => {
            const elem = e.currentTarget;
            const { width, height } = elem.getBoundingClientRect();
            setSize([width, height]);
            setShowMagnifier(true);
          }}
          onMouseMove={(e) => {
            const elem = e.currentTarget;
            const { top, left } = elem.getBoundingClientRect();
            const x = e.pageX - left - window.pageXOffset;
            const y = e.pageY - top - window.pageYOffset;
            setXY([x, y]);
          }}
          onMouseLeave={() => {
            setShowMagnifier(false);
          }}
          alt={src.alt}
        />

        <div
          style={{
            display: showMagnifier ? "" : "none",
            position: "absolute",
            pointerEvents: "none",
            height: `${magnifierHeight}px`,
            width: `${magnifierWidth}px`,
            top: `${y - magnifierHeight / 2}px`,
            left: `${x - magnifierWidth / 2}px`,
            opacity: "1",
            border: "1px solid lightgray",
            borderRadius: "50%",
            backgroundColor: "white",
            backgroundImage: `url('${src}')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${imgWidth * zoomLevel}px ${
              imgHeight * zoomLevel
            }px`,
            backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
            backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
          }}
        ></div>
      </div>
    );
  }
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const [modal, setModal] = useState({ image: null, open: false });
  const thumbRef = useRef(null);
  useEffect(() => {
    modal.open && thumbRef.current.focus();
  }, [modal.open]);
  useEffect(() => {
    const bodyOverflow = document.body.style.overflow;

    if (modal.open) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
      document.documentElement.style.overflow = "visible";
    }

    // Cleanup function to restore the default behavior when the component unmounts
    return () => {
      document.body.style.overflow = "visible";
      document.documentElement.style.overflow = "visible";
    };
  }, [modal]);

  const productImage = gallery?.map((image, index) => {
    return (
      <SwiperSlide key={index}>
        <ImageMagnifier
          src={image?.image}
          fill
          alt="Reflekta"
          priority={true}
          className={`cursor-pointer object-contain max-md:hidden`}
        />
      </SwiperSlide>
    );
  });
  const thumbImage = gallery?.map((image, index) => {
    return (
      <SwiperSlide key={index}>
        <Image
          src={image?.image}
          fill
          priority={true}
          alt=""
          className="cursor-pointer object-contain max-md:hidden"
        />
      </SwiperSlide>
    );
  });
  return (
    <div className="col-span-2 max-md:col-span-4 max-md:h-[450px] md:flex md:flex-row-reverse gap-5 md:max-h-[380px] lg:max-h-[550px] xl:max-h-[680px] 2xl:max-h-[720px] 3xl:max-h-[700px]">
      {loading ? (
        <div className={`h-[500px] flex flex-row gap-3 w-full`}>
          <div className={`flex flex-col gap-3 max-md:hidden`}>
            <div
              className={`h-[150px] w-[150px] bg-slate-300 animate-pulse`}
            ></div>
            <div
              className={`h-[150px] w-[150px] bg-slate-300 animate-pulse`}
            ></div>
            <div
              className={`h-[150px] w-[150px] bg-slate-300 animate-pulse`}
            ></div>
          </div>
          <div
            className={`max-md:h-[450px] md:h-[500px] bg-slate-300 animate-pulse w-full`}
          ></div>
        </div>
      ) : (
        <>
          <Swiper
            spaceBetween={10}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            onClick={(swiper) => {
              setModal({
                image: gallery[swiper.activeIndex].image,
                open: true,
              });
            }}
            pagination={true}
            navigation={navigationEnabled}
            modules={[FreeMode, Thumbs, Pagination, Navigation]}
            className={`${classes.mySwiper2} mySwiper2 select-none`}
            breakpoints={{
              320: {
                direction: "horizontal",
                slidesPerView: 1,
                pagination: {
                  clickable: true,
                  enabled: true,
                },
                navigation: {
                  enabled: false,
                },
              },
              768: {
                direction: "horizontal",
                slidesPerView: 1,
                pagination: {
                  enabled: false,
                },
                navigation: {
                  enabled: navigationEnabled,
                },
              },
            }}
          >
            {productImage}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={0}
            modules={[Navigation]}
            autoplay={true}
            navigation={navigationEnabled}
            breakpoints={{
              320: {
                enabled: false,
                navigation: {
                  enabled: false,
                },
              },
              768: {
                direction: "vertical",
                slidesPerView: 4.3,
                enabled: true,

                modules: [FreeMode, Thumbs, Navigation],
                navigation: {
                  enabled: gallery?.length > 4.3 ? true : false,
                },
              },
            }}
            freeMode={true}
            watchSlidesProgress={true}
            className={`${classes.mySwiper} mySwiper max-md:hidden select-none`}
          >
            {" "}
            {thumbImage}
          </Swiper>{" "}
        </>
      )}
      {modal.open && (
        <>
          <div
            className="fixed top-0 left-0  w-screen h-screen bg-black bg-opacity-50 z-[1000]"
            ref={thumbRef}
            tabIndex={1}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setModal({ image: null, open: false });
              }
            }}
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                setModal({ image: null, open: false });
              }
            }}
          >
            <div
              className="h-full py-5 flex items-center justify-center relative mt-auto"
              onClick={(event) => {
                if (event.target === event.currentTarget) {
                  setModal({ image: null, open: false });
                }
              }}
            >
              <Swiper
                spaceBetween={10}
                slidesPerView={1}
                modules={[Navigation]}
                navigation={true}
                initialSlide={gallery.findIndex(
                  (image) => image.image === modal.image
                )}
                className="mySwiper3 relative select-none"
              >
                {productImage}
                <i
                  className="absolute z-[10000] top-2 right-2 fa-solid fa-times text-xl cursor-pointer hover:text-red-500"
                  onClick={() => setModal({ image: null, open: false })}
                ></i>
              </Swiper>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductGallery;

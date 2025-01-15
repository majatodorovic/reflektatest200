import { useGlobalRemoveFromWishlist } from "@/app/api/globals";
import { currencyFormat } from "../../helpers/functions";
import Link from "next/link";
import Image from "next/image";
import classes from "./WishlistItem.module.css";
import { convertHttpToHttps } from "@/helpers/convertHttpToHttps";
import { toast, ToastContainer } from "react-toastify";
import ProductPrice from "@/components/ProductPrice/ProductPrice";

const WishlistItems = ({ items, product }) => {
  const removeFromWishList = useGlobalRemoveFromWishlist();

  return (
    <div className="col-span-1 relative item">
      <div className="border border-[#e6e6e6] rounded-lg overflow-hidden">
      <div
        className={`${classes.item} max-md:h-[240px] md:h-[450px] lg:h-[350px] item relative`}
      >
        {product?.image[0] && (
          <Link href={`/proizvod/${product?.slug}`} scroll={true}>
            <Image
              src={convertHttpToHttps(product?.image[0])}
              alt={product?.basic_data?.name}
              width={2222}
              height={2222}
              className="h-full object-cover"
            />
          </Link>
        )}
        <div className="absolute top-1 right-1 rounded-full bg-croonus-3 bg-opacity-80 hover:bg-opacity-40">
          <i
            className="fa-solid px-2 py-1 fa-times text-lg text-white"
            onClick={() => {
              removeFromWishList(items);
              toast.success(
                `Proizvod ${product?.basic_data?.name} je obrisan iz liste želja!`,
                {
                  position: "top-center",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                }
              );
            }}
          />
        </div>

            {product?.stickers[0]?.name ? (
              <div className="py-[0.6rem] px-[0.8rem] absolute top-[0rem] left-[0rem] bg-croonus-3 w-fit text-white text-[0.8rem] rounded-br-lg">
                <span>{product?.stickers[0]?.name}</span>
              </div>
            ) : null}
          </div>
          <Link href={`/proizvod/${product?.slug}`}>
            <div className={`${classes.item} flex-col flex relative z-[19] ml-[0.6rem]`}>
              <span className="font-semibold text-base hover:text-[#a3a3a3] rows2 max-md:text-[0.85rem] max-md:leading-4 row1 mt-[1rem] cursor-pointer">
                {product?.basic_data?.name}
              </span>

              <div className="min-h-[2.8rem] flex items-center">
                <span className="text-[0.9rem] flex text-[#939393] row2">
                  {product?.basic_data?.short_description}
                </span>
              </div>
            </div>
          </Link>
          {/* <div className="mt-0 max-md:mt-2 max-md:items-start flex-wrap max-md:gap-1 items-center gap-[10px]">
            
            {product?.price?.discount?.active && (
                <span className={`line-through text-sm whitespace-nowrap ml-[0.6rem] `}>
                  {currencyFormat(product?.price?.price?.original)}
                </span>
              )}
              <div className="bg-croonus-3 max-md:text-[0.8rem] text-lg font-bold text-start text-white p-[0.4rem] w-full pl-[0.6rem] rounded-b-lg flex mt-[0.4rem]">
                <ProductPrice
                  price={product?.price}
                  className="font-semibold text-lg px-2 py-1 whitespace-nowrap"
                  inventory={product?.inventory}
                />
              </div>
           
           
          </div> */}
          <ToastContainer/>
      </div>
    </div>
  );
};

export default WishlistItems;

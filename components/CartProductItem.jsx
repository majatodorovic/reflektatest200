import { useEffect, useState } from "react";
import Image from "next/image";
import { useGlobalAddToCart } from "@/app/api/globals";
import { useGlobalRemoveFromCart } from "@/app/api/globals";
import { currencyFormat } from "../helpers/functions";
import RemoveProductModal from "./RemoveProductModal/RemoveProductModal";
import PlusMinusInputTwo from "./PlusMinusInputTwo";
import classes from "./CartProductItem.module.css";
import PlusMinusInputOne from "./PlusMinusInputOne";
import { convertHttpToHttps } from "@/helpers/convertHttpToHttps";
import Link from "next/link";

const CartProductItem = ({ item }) => {
  const [productAmount, setProductAmount] = useState(
    Number(item.cart.quantity)
  );
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = useGlobalAddToCart(true);

  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    if (productAmount != item.cart.quantity) {
      addToCart(item?.product?.id, productAmount, true);
    }
  }, [productAmount, addToCart, item.cart.quantity, item?.product?.id]);

  const per_item = item?.product?.price?.per_item;
  const total = item?.product?.price?.cost;
  const currency = item?.product?.price?.currency;
  return (
    <>
      <div className="col-span-2 py-8 text-black grid grid-cols-3 gap-x-10 mt-1 relative">
        <div className="relative col-span-1 w-full flex items-center justify-center">
          <div className="xl:h-[186px] max-md:h-[150px] max-md:w-[150px] xl:w-[139px]  ">
            <Link href={`/proizvod/${item?.product?.slug}`}>
              <Image
                src={convertHttpToHttps(item?.product?.image[0])}
                width={250}
                height={250}
                alt=""
                className="object-cover h-full"
              />
            </Link>
          </div>
        </div>
        <div className="col-span-2 flex  flex-col ">
          <Link href={`/proizvod/${item?.product?.slug}`}>
            <span className="text-[1.025rem] font-semibold break-all row2">
              {item?.product?.basic_data?.name}
            </span>
          </Link>
          <div className="flex flex-col gap-2 text-base">
            <span className="mt-5">
              Šifra: {item?.product?.basic_data?.sku}
            </span>
            <div className="flex items-center gap-3 text-base">
              <span>Količina</span>
              
              <PlusMinusInputOne amount={productAmount} setCount={setProductAmount}/>
            </div>
            {/*<div className="flex items-center gap-3 md:hidden text-base">*/}
            {/*  <span>Količina:</span>*/}
            {/*  {productAmount}*/}
            {/*</div>*/}
            <span>
              Ukupan iznos: <span className="font-bold">{currencyFormat(total?.with_vat, currency)}</span> sa PDV
            </span>
          </div>
        </div>
        <span
          className="absolute top-[6px] right-2 cursor-pointer"
          onClick={handleOpenModal}
        >
          X
        </span>
        <RemoveProductModal isOpen={isOpen} onClose={handleCloseModal} item={item}/>
      </div>
    </>
  );
};

export default CartProductItem;

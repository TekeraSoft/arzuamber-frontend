"use client";

import Button from "../general/Button";
import { useTranslations } from "next-intl";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaRegCreditCard } from "react-icons/fa";
import { CartSummaryProps } from "@/types/Props";
import { Link } from "@/i18n/routing";
import { useDispatch } from "react-redux";
import { closeCartModal } from "@/store/modalsSlice";

const CartSummary = ({ total }: CartSummaryProps) => {
  const t = useTranslations();
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeCartModal());
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className=" w-full  px-5 bg-gray-50 border border-gray-200 rounded-lg">
        {/* Heading and Close button */}

        <h2 className="w-full text-center text-xl uppercase font-semibold my-2">
          {t("CartPage.cartSummary.title")}
        </h2>
        <hr className="w-full mb-2 " />

        <div className="w-full flex  justify-center items-center gap-2   ">
          {/* Kargo */}
          {/* <div className="flex justify-between items-center my-2 rounded-md">
            <span className="text-sm font-bold">
              {t("CartPage.cartSummary.shipping")}
            </span>
            <span className="text-sm font-semibold text-primary">
              {t("CartPage.cartSummary.freeShipping")}
            </span>
          </div> */}

          {/* Toplam */}
          <div className="flex justify-between items-center  rounded-md w-full">
            <span className="text-sm font-bold">
              {t("CartPage.cartSummary.total")}
            </span>
            <span className="text-lg font-semibold text-primary underline">
              {t("CartPage.cartSummary.symbol")}
              {total.toFixed(2)}
            </span>
          </div>
        </div>

        <hr className="w-full  mt-2" />

        {/* Buttons and Input */}
        <div
          className="flex flex-col items-center justify-center w-full 
        mt-2"
        >
          <div className="flex flex-col  w-full justify-center items-center gap-2 mb-3 mt-2">
            <Link href={`/payment`} className="w-full ">
              <Button
                animation
                text={t("CartPage.cartSummary.proceedToPayment")}
                color="primary"
                size="large"
                icon={FaRegCreditCard}
                iconSize={15}
                className="text-xs"
                onClick={handleCloseModal}
              />
            </Link>
            <Link href={`/products`} className="w-full">
              <Button
                text={t("CartPage.cartSummary.continueShopping")}
                color="primary"
                size="large"
                icon={FaArrowRightLong}
                iconSize={15}
                animation
                className="text-xs"
                onClick={handleCloseModal}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;

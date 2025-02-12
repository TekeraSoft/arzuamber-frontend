"use client";

import Button from "../general/Button";
import Input from "../general/Input";
import Heading from "../general/Heading";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { FaArrowRightLong } from "react-icons/fa6";
import { BiSolidDiscount } from "react-icons/bi";
import { FaRegCreditCard } from "react-icons/fa";
import { CartSummaryProps } from "@/types/Props";

const CartSummary = ({ total, tax }: CartSummaryProps) => {
  const t = useTranslations();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className=" w-full  px-5 bg-gray-50 border border-gray-200 rounded-lg">
        {/* Heading and Close button */}
        <Heading
          text={t("CartPage.cartSummary.title")}
          font="bold"
          textSize="2xl"
          hr
        />
        <div className="w-full flex flex-col gap-2   ">
          {/* Kargo */}
          <div className="flex justify-between items-center  rounded-md">
            <span className="text-sm font-bold">
              {t("CartPage.cartSummary.shipping")}
            </span>
            <span className="text-sm font-semibold text-primary">
              {t("CartPage.cartSummary.freeShipping")}
            </span>
          </div>

          {/* Vergi */}
          <div className="flex justify-between items-center  rounded-md">
            <span className="text-sm font-bold">
              {t("CartPage.cartSummary.tax")}
            </span>
            <span className="text-sm font-semibold text-primary">
              {t("CartPage.cartSummary.symbol")}
              {tax.toFixed(2)}
            </span>
          </div>

          {/* Toplam */}
          <div className="flex justify-between items-center  rounded-md">
            <span className="text-sm font-bold">
              {t("CartPage.cartSummary.total")}
            </span>
            <span className="text-sm font-semibold text-primary">
              {t("CartPage.cartSummary.symbol")}
              {total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Buttons and Input */}
        <div className="flex flex-col items-center justify-center w-full border-t mt-2">
          <form
            className="flex flex-row justify-between items-center gap-3  w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              id="discountCode"
              placeholder={t("CartPage.cartSummary.discountCodePlaceholder")}
              type="text"
              register={register}
              errors={errors}
            />
            <Button
              animation
              text={t("CartPage.cartSummary.submitDiscountCode")}
              type="submit"
              color="primary"
              size="large"
              icon={BiSolidDiscount}
              className="text-xs "
            />
          </form>

          <div className="flex flex-row w-full justify-center items-center gap-2 mb-3 mt-2">
            <Button
              text={t("CartPage.cartSummary.continueShopping")}
              color="primary"
              size="large"
              onClick={() => {}}
              icon={FaArrowRightLong}
              iconSize={15}
              animation
              className="text-xs "
            />
            <Button
              animation
              text={t("CartPage.cartSummary.proceedToPayment")}
              color="primary"
              size="large"
              onClick={() => {}}
              icon={FaRegCreditCard}
              iconSize={15}
              className="text-xs "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;

"use client";

import Button from "../general/Button";
import Input from "../general/Input";
import Heading from "../general/Heading";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// import { useTranslations } from "next-intl";
import { FaArrowRightLong } from "react-icons/fa6";
import { BiSolidDiscount } from "react-icons/bi";
import { FaRegCreditCard } from "react-icons/fa";
import { CartSummaryProps } from "@/types/Props";

const CartSummary = ({ total, tax, savings }: CartSummaryProps) => {
  //   const t = useTranslations();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <div className="w-full sm:w-2/6 h-full p-4 bg-gray-50 border border-gray-200 shadow-lg rounded-lg">
      <Heading
        text="Sepet özeti"
        // text={t("CartPage.cartSummary.title")}
        font="bold"
        textSize="3xl"
        hr
      />

      {/* Toplam */}
      <div className="flex justify-between items-center mb-4 p-3  rounded-md ">
        <span className="text-sm font-medium">
          {/* {t("CartPage.cartSummary.total")} */}
          Toplam:
        </span>
        <span className="text-lg font-semibold text-primary">
          {/* {t("CartPage.cartSummary.symbol")} */}${total.toFixed(2)}
        </span>
      </div>

      {/* Kargo */}
      <div className="flex justify-between items-center mb-4 p-3  rounded-md ">
        <span className="text-sm font-medium">
          {/* {t("CartPage.cartSummary.shipping")} */}
          Kargo:
        </span>
        <span className="text-sm font-semibold text-primary">
          {/* {t("CartPage.cartSummary.freeShipping")} */}
          Ücretsiz
        </span>
      </div>

      {/* Vergi */}
      <div className="flex justify-between items-center mb-4 p-3  rounded-md ">
        <span className="text-sm font-medium">
          {/* {t("CartPage.cartSummary.tax")} */}
          Vergi:
        </span>
        <span className="text-sm font-semibold text-primary">
          {/* {t("CartPage.cartSummary.symbol")} */}${tax.toFixed(2)}
        </span>
      </div>

      {/* Toplam Tasarruf */}
      <div className="flex justify-between items-center mb-4 p-3  rounded-md ">
        <span className="text-sm font-medium">
          {/* {t("CartPage.cartSummary.savings")} */}
          Toplam Kazanç:
        </span>
        <span className="text-sm font-semibold text-primary">
          {/* {t("CartPage.cartSummary.symbol")} */}${savings.toFixed(2)}
        </span>
      </div>

      {/* Buttons ve Input */}
      <div className="flex flex-col items-center justify-center gap-2 w-full">
        <hr className="w-full bg-secondary" />
        <form
          className=" flex justify-between items-center gap-3 h-full w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            id="discountCode"
            placeholder="İndirim Kodu"
            // placeholder={t("CartPage.cartSummary.discountCodePlaceholder")}
            type="text"
            register={register}
            errors={errors}
          />
          <Button
            animation
            text="Kod Gir"
            // text={t("CartPage.cartSummary.submitDiscountCode")}
            type="submit"
            color="primary"
            size="small"
            icon={BiSolidDiscount}
            className="text-xs md:text-sm lg:text-base"
          />
        </form>

        <div className="flex w-full justify-center items-center gap-3">
          <Button
            text="Alışverişe Devam Et"
            // text={t("CartPage.cartSummary.continueShopping")}
            color="primary"
            size="large"
            onClick={() => {}}
            icon={FaArrowRightLong}
            iconSize={15}
            animation
            className="text-xs md:text-xs lg:text-base"
          />
          <Button
            animation
            text="Ödeme Yap"
            // text={t("CartPage.cartSummary.proceedToPayment")}
            color="primary"
            size="large"
            onClick={() => {}}
            icon={FaRegCreditCard}
            iconSize={15}
            className="text-xs md:text-sm lg:text-base"
          />
        </div>
      </div>
    </div>
  );
};

export default CartSummary;

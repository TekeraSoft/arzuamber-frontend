"use client";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import PaymentForm from "@/components/payment/PaymentForm";
import PageContainer from "@/components/Containers/PageContainer";

const PaymentPage = () => {
  // const t = useTranslations();
  const navigation = useRouter();
  const { cartProducts, total } = useSelector((state: RootState) => state.cart);
  const t = useTranslations();

  useEffect(() => {
    if (cartProducts.length === 0) navigation.back();
  }, [cartProducts, navigation]);

  return (
    <PageContainer>
      {/* İçerikler için container */}
      <div className=" px-5 flex flex-col-reverse md:flex-row w-full items-start justify-center bg-mywhite rounded-lg">
        {/* Sol taraftaki içerik */}
        <div className="md:w-1/2 w-full">
          <PaymentForm />
        </div>

        {/* Sağ taraftaki içerik */}
        <div className="w-full  md:w-1/2  relative bg-white py-5">
          {cartProducts.map((item, index) => (
            <div key={index} className="flex flex-row items-center w-full">
              <div className="relative h-16 w-12">
                <Image
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                  src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${item.image}`}
                  alt="product.jpg"
                />
                <span
                  className="bg-gray-700 text-white w-5 h-5 rounded-full absolute -top-3 -right-3 items-center
                      justify-center flex text-xs font-semibold"
                >
                  {item.quantity}
                </span>
              </div>
              <div className="flex flex-col w-full ml-6">
                <div className="flex flex-row items-center justify-between w-full">
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-sm font-medium">
                    <span className="mr-1">
                      {" "}
                      {t("PaymentSummaryProductDetail.Price")}:
                    </span>
                    ₺{item.price}
                  </p>
                </div>
                <div className="w-full">
                  <p className="text-xs font-semibold text-gray-700">
                    {t("PaymentSummaryProductDetail.size")} - {item.size}
                  </p>
                  <p className="text-xs font-semibold text-gray-700">
                    {t("PaymentSummaryProductDetail.color")}- {item.color}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div className="flex flex-col justify-center items-center w-full gap-2 my-3">
            <div className="flex flex-row justify-between items-center text-sm font-medium w-full">
              <p>
                {t("PaymentSummaryProductDetail.Subtotal")} •{" "}
                {cartProducts.reduce((total, item) => {
                  return total + item.quantity;
                }, 0)}{" "}
                {t("PaymentSummaryProductDetail.Product")}
              </p>
              <p className="font-semibold text-lg">₺ {total.toFixed(2)}</p>
            </div>
            <div className="flex flex-row justify-between items-center text-sm font-medium w-full">
              <p> {t("PaymentSummaryProductDetail.Shipping")}</p>
              <p className="font-semibold text-sm">
                {t("PaymentSummaryProductDetail.ShippingText")}
              </p>
            </div>
            <div className="flex flex-row justify-between items-center text-xl font-semibold w-full">
              <p> {t("PaymentSummaryProductDetail.Total")}</p>
              <p>₺ {total.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default PaymentPage;

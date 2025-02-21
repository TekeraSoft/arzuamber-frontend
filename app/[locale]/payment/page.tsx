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

const PaymentPage = () => {
  // const t = useTranslations();
  const navigation = useRouter();
  const { cartProducts, total } = useSelector((state: RootState) => state.cart);
  const t = useTranslations();

  useEffect(() => {
    if (cartProducts.length === 0) navigation.back();
  }, [cartProducts, navigation]);

  return (
    <div className="md:container md:mx-auto rounded-lg">
      {/* İçerikler için container */}
      <div className="  flex flex-col-reverse md:flex-row w-full items-start justify-center gap-2 bg-mywhite rounded-lg px-4 py-2">
        {/* Sol taraftaki içerik */}

        <div className="w-full md:w-1/2 relative bg-white py-6 border border-gray-200 px-4 my-2 rounded-lg">
          {cartProducts.map((item, index) => (
            <div
              key={index}
              className="flex flex-row items-center w-full border-b py-2 last:border-none"
            >
              {/* Ürün Görseli */}
              <div className="relative h-20 w-16">
                <Image
                  fill
                  className="rounded-md object-cover"
                  src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${item.image}`}
                  alt={item.name}
                />
                <span className="bg-secondary text-white w-5 h-5 rounded-full absolute -top-2 -right-2 flex items-center justify-center text-xs font-semibold">
                  {item.quantity}
                </span>
              </div>

              {/* Ürün Detayları */}
              <div className="flex flex-col w-full ml-6">
                <div className="flex flex-row items-center justify-between w-full">
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-sm font-medium text-secondary">
                    <span className="mr-1">
                      {t("PaymentSummaryProductDetail.Price")}:
                    </span>
                    ₺{item.price}
                  </p>
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  <p>
                    {t("PaymentSummaryProductDetail.size")} - {item.size}
                  </p>
                  <p>
                    {t("PaymentSummaryProductDetail.color")} - {item.color}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Sipariş Özeti */}
          <div className="flex flex-col justify-center items-center w-full gap-3 my-3 text-gray-800">
            <div className="flex flex-row justify-between items-center text-sm font-medium w-full">
              <p className="text-gray-700">
                {t("PaymentSummaryProductDetail.Subtotal")} •{" "}
                {cartProducts.reduce((total, item) => total + item.quantity, 0)}{" "}
                {t("PaymentSummaryProductDetail.Product")}
              </p>
              <p className="font-semibold text-lg text-secondary">
                ₺{total.toFixed(2)}
              </p>
            </div>

            <div className="flex flex-row justify-between items-center text-sm font-medium w-full">
              <p>{t("PaymentSummaryProductDetail.Shipping")}</p>
              <p className="font-semibold text-gray-600">
                {t("PaymentSummaryProductDetail.ShippingText")}
              </p>
            </div>

            <div className="flex flex-row justify-end items-center text-sm font-semibold w-full">
              <p>{t("PaymentSummaryProductDetail.KDV")}</p>
            </div>

            <div className="flex flex-row justify-between items-center text-xl font-semibold w-full border-t pt-2">
              <p>{t("PaymentSummaryProductDetail.Total")}</p>
              <p className="text-primary">₺{total.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Sağ taraftaki içerik */}
        <div className="md:w-1/2 w-full border my-2 rounded-lg px-3">
          <PaymentForm />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;

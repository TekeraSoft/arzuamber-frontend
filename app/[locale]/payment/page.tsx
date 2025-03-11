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
import {filterData} from "@/data/filterData";
import {Button} from "primereact/button";

const PaymentPage = () => {
  // const t = useTranslations();
  const navigation = useRouter();
  const { cartProducts, total } = useSelector((state: RootState) => state.cart);
  const t = useTranslations();

  useEffect(() => {
    if (cartProducts.length === 0) navigation.back();
  }, [cartProducts, navigation]);

  return (
    <div className="md:mx-32 mx-4 rounded-lg my-20">
      {/* İçerikler için container */}
      <div className="  flex flex-col-reverse md:flex-row w-full md:gap-x-4 items-start justify-center rounded-lg">
        {/* Sol taraftaki içerik */}

        {/* Sağ taraftaki içerik */}
        <div className="md:w-2/3 w-full  border rounded-lg animate__animated animate__backInDown md:mt-0 mt-6 bg-white px-3">
          <PaymentForm />
        </div>

        <div className="w-full md:w-1/3 relative bg-white py-1 border border-gray-200 px-4 rounded-lg animate__animated animate__backInDown">
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
                    {item.price.toLocaleString('tr-TR', {style: 'currency', currency:'TRY'})}
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
          <div className="flex flex-col justify-center items-center w-full gap-2 my-3 text-gray-800">
            <div className="flex flex-row justify-between items-center text-sm font-medium w-full">
              <p className="text-gray-700">
                {t("PaymentSummaryProductDetail.Subtotal")} •{" "}
                {cartProducts.reduce((total, item) => total + item.quantity, 0)}{" "}
                {t("PaymentSummaryProductDetail.Product")}
              </p>
              <p className="font-semibold text-lg text-secondary">
                {total.toLocaleString('tr-TR', {style: 'currency', currency:'TRY'})}
              </p>
            </div>

            <div className="flex flex-row justify-between items-center my-4 font-medium w-full">
              <p>{t("PaymentSummaryProductDetail.Shipping")}</p>
              <p className="font-semibold text-gray-600">
                {
                   total >= filterData.maxShippingPrice ? t("PaymentSummaryProductDetail.ShippingText") : filterData.shippingPrice.toLocaleString('tr-TR', {style: 'currency', currency:'TRY'})
                }
              </p>
            </div>

            <div className="flex flex-row justify-end items-center text-sm font-semibold w-full">
              <p>{t("PaymentSummaryProductDetail.KDV")}</p>
            </div>

            <div className="flex bg-gray-50 p-4 flex-row justify-between items-center text-xl font-semibold w-full rounded-lg pt-2">
              <p className={'text-primary text-2xl'}>Toplam</p>
              <p className="text-primary">{((total >= filterData.maxShippingPrice) ? total : (total + filterData.shippingPrice)).toLocaleString('tr-TR', {
                style: 'currency',
                currency: 'TRY'
              })}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;

"use client";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import React, { useEffect, useState } from "react";
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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (cartProducts.length === 0) navigation.back();
  }, [cartProducts]);

  return (
    <PageContainer>
      <div className="relative flex w-full  bg-mywhite ">
        {/* Sol taraf - Beyaz arka plan */}
        <div className="left-0 sm:hidden md:absolute top-0 w-1/2 h-full bg-white "></div>

        {/* Sağ taraf - Gri arka plan */}

        {/* İçerikler için container */}
        <div className="container mx-auto flex flex-col-reverse md:flex-row w-full items-start justify-center">
          {/* Sol taraftaki içerik */}
          <div className="md:w-1/2 w-full">
            <PaymentForm />
          </div>

          {/* Sağ taraftaki içerik */}
          <div className="w-full  md:w-1/2  relative bg-white">
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
                    className="bg-gray-700 text-white w-6 h-6 rounded-full absolute -top-3 -right-3 items-center
                      justify-center flex text-xs font-semibold"
                  >
                    {item.quantity}
                  </span>
                </div>
                <div className="flex flex-col w-full ml-6">
                  <div className="flex flex-row items-center justify-between w-full">
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="text-sm font-medium">₺ {item.price}</p>
                  </div>
                  <div className="w-full">
                    <p className="text-xs font-semibold text-gray-700">
                      Beden - {item.size}
                    </p>
                    <p className="text-xs font-semibold text-gray-700">
                      Renk - {item.color}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex flex-row justify-between items-center p-4 text-sm font-medium w-full">
              <p>
                Alt Toplam •{" "}
                {cartProducts.reduce((total, item) => {
                  return total + item.quantity;
                }, 0)}{" "}
                Ürün
              </p>
              <p className="font-semibold text-lg">₺ {total.toFixed(2)}</p>
            </div>
            <div className="flex flex-row justify-between items-center p-4 text-sm font-medium w-full">
              <p>Kargo</p>
              <p className="font-semibold text-lg">Ücretsiz</p>
            </div>
            <div className="flex flex-row justify-between items-center p-4 text-2xl font-semibold w-full">
              <p>Toplam</p>
              <p>₺ {total.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default PaymentPage;

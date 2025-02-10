"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import PageContainer from "../Containers/PageContainer";
import Button from "../general/Button";
import { removeFromCart } from "@/store/cartSlice";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loading from "../utils/Loading";
import TextClip from "../utils/TextClip";
import Heading from "../general/Heading";
import EmptyCart from "./EmptyCart";
import CartSummary from "./CartSummary";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useTranslations } from "next-intl";

function CartClient() {
  const dispatch = useDispatch();
  const t = useTranslations();
  const carts = useSelector((state: RootState) => state.cart.carts);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Loading />;
  }

  const removeItemFromCart = (id: string) => {
    dispatch(removeFromCart(id));
  };

  if (!carts || carts.length === 0) {
    return <EmptyCart />;
  }

  const total = carts.reduce((total, item) => {
    // Ürün fiyatını indirim oranına göre güncelle
    const discountedPrice =
      item.price - (item.price * item.discountPercent) / 100;
    // İndirimli fiyatı miktar ile çarp ve toplam tutara ekle
    return total + discountedPrice * item.quantity;
  }, 0);

  // Sabit değerler
  const tax = 150.0;
  const savings = carts.reduce((totalSavings, item) => {
    // Her ürün için sağlanan tasarrufu hesapla

    const savingsPerItem =
      ((item.price * item.discountPercent) / 100) * item.quantity;
    return totalSavings + savingsPerItem;
  }, 0);

  return (
    <PageContainer>
      <Heading
        text={t("CartPage.heading")}
        center
        textSize="4xl"
        hr
        font="bold"
      />

      <div className="flex  justify-center items-start md:flex-row flex-wrap gap-8 mb-5 p-5 md:p-0  ">
        {/* Ürün Tablosu */}
        <div className="flex-1 bg-mywhite  rounded-lg   h-full ">
          <table className="w-full border border-gray-200 rounded-lg text-sm md:text-base ">
            <thead className="bg-gray-100">
              <tr className="text-center">
                <th className="p-3 text-xs sm:text-base">
                  {t("CartPage.product")}
                </th>
                <th className="p-3 text-xs sm:text-base hidden md:block">
                  {t("CartPage.name")}
                </th>
                <th className="p-3 text-xs sm:text-base">
                  {t("CartPage.quantity")}
                </th>
                <th className="p-3 text-xs sm:text-base">
                  {t("CartPage.price")}
                </th>
                <th className="p-3 text-xs sm:text-base">
                  {t("CartPage.size")}
                </th>
                <th className="p-3 text-xs sm:text-base">
                  {t("CartPage.color")}
                </th>
                <th className="p-3 text-xs sm:text-base">
                  {t("CartPage.actions")}
                </th>
              </tr>
            </thead>

            <tbody>
              {carts.map((cart) => {
                // Ürün fiyatını indirimli hale getir
                const discountedPrice =
                  cart.price - (cart.price * cart.discountPercent) / 100;
                return (
                  <tr
                    key={cart.id}
                    className="border-b border-gray-200 text-center "
                  >
                    <td className="p-3 flex flex-col items-center w-16">
                      <Image
                        src={cart.image}
                        alt={cart.name}
                        width={80}
                        height={80}
                        priority
                        className="rounded-md object-cover  h-24 md:w-auto md:h-auto"
                      />
                    </td>
                    <td className="text-gray-900 font-medium hidden md:table-cell">
                      {TextClip(cart.name)}
                    </td>

                    <td className="text-gray-900">{cart.quantity}</td>
                    <td className="text-gray-900 font-semibold">
                      {discountedPrice}
                      {t("CartPage.cartPriceSymbol")}
                    </td>
                    <td className="text-gray-900">{cart.size}</td>
                    <td className="text-gray-900">{cart.color}</td>
                    <td className="p-2 w-8 ">
                      <Button
                        type="button"
                        onClick={() => removeItemFromCart(cart.id)}
                        icon={MdOutlineDeleteOutline}
                        iconSize={20}
                        color="third"
                        className="w-full h-8"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Sepet Özeti */}
        <CartSummary total={total + tax} tax={tax} savings={savings} />
      </div>
    </PageContainer>
  );
}

export default CartClient;

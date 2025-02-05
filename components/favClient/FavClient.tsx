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
import { Link } from "@/i18n/routing";
import EmptyFav from "./EmptyFav";
import FavSummary from "./FavSummary";
// import { useTranslations } from "next-intl";

function CartClient() {
  const dispatch = useDispatch();
  // const t = useTranslations();
  const favs = useSelector((state: RootState) => state.favorites.favs);
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

  if (!favs || favs.length === 0) {
    return <EmptyFav />;
  }

  const total = favs.reduce((total, item) => {
    // Ürün fiyatını indirim oranına göre güncelle
    const discountedPrice =
      item.price - (item.price * item.discountPercent) / 100;
    // İndirimli fiyatı miktar ile çarp ve toplam tutara ekle
    return total + discountedPrice * item.quantity;
  }, 0);

  // Sabit değerler
  const tax = 150.0;
  const savings = favs.reduce((totalSavings, item) => {
    // Her ürün için sağlanan tasarrufu hesapla

    const savingsPerItem =
      ((item.price * item.discountPercent) / 100) * item.quantity;
    return totalSavings + savingsPerItem;
  }, 0);

  return (
    <PageContainer>
      <Heading
        text="Sepetiniz"
        // text={t("FavPage.title")}
        center
        textSize="4xl"
        hr
        font="bold"
      />

      <div className="flex  justify-center items-start md:flex-row flex-wrap gap-8 mb-5 p-5 md:p-0  ">
        {/* Ürün Tablosu */}
        <div className="flex-1 bg-mywhite p-4 rounded-lg md:shadow-lg  h-full md:border md:border-gray-200">
          <table className="w-full border border-gray-200 rounded-lg text-sm md:text-base ">
            <thead className="bg-gray-100">
              <tr className="text-center">
                <th className="p-3 text-xs sm:text-base">
                  Ürün
                  {/* {t("FavPage.product")} */}
                </th>
                <th className="p-3 text-xs sm:text-base hidden md:block">
                  Adı
                  {/* {t("FavPage.name")} */}
                </th>

                <th className="p-3 text-xs sm:text-base">
                  Miktar
                  {/* {t("FavPage.quantity")} */}
                </th>
                <th className="p-3 text-xs sm:text-base">
                  Fiyat
                  {/* {t("FavPage.price")} */}
                </th>
                <th className="p-3 text-xs sm:text-base">
                  Beden
                  {/* {t("FavPage.size")} */}
                </th>
                <th className="p-3 text-xs sm:text-base">
                  Renk
                  {/* {t("FavPage.color")} */}
                </th>
                <th className="p-3 text-xs sm:text-base">
                  İşlemler
                  {/* {t("FavPage.actions")} */}
                </th>
              </tr>
            </thead>

            <tbody>
              {favs.map((fav) => {
                // Ürün fiyatını indirimli hale getir
                const discountedPrice =
                  fav.price - (fav.price * fav.discountPercent) / 100;
                return (
                  <tr
                    key={fav.id}
                    className="border-b border-gray-200 text-center "
                  >
                    <td className="p-3 flex flex-col items-center w-16">
                      <Image
                        src={fav.image}
                        alt={fav.name}
                        width={80}
                        height={80}
                        priority
                        className="rounded-md object-cover  h-24 md:w-auto md:h-auto"
                      />
                    </td>
                    <td className="text-gray-900 font-medium hidden md:table-cell">
                      {TextClip(fav.name)}
                    </td>

                    <td className="text-gray-900">{fav.quantity}</td>
                    <td className="text-gray-900 font-semibold">
                      {/* {t("FavPage.favPriceSymbol")} */}
                      {/* İndirimli fiyatı göster */}${discountedPrice}
                    </td>
                    <td className="text-gray-900">{fav.size}</td>
                    <td className="text-gray-900">{fav.color}</td>
                    <td className=" p-2">
                      <Button
                        type="button"
                        onClick={() => removeItemFromCart(fav.id)}
                        text="Sil"
                        // text={t("FavPage.remove")}
                        color="third"
                        className="w-full h-7 md:w-14 md:h-10 text-sm"
                      />
                      <Link href={`product/${fav.id}`}>
                        <Button
                          type="button"
                          text="Detay"
                          // text={t("CartPage.details")}
                          color="third"
                          className="w-full h-7 md:w-14 md:h-10 text-sm mt-2"
                        />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Sepet Özeti */}
        <FavSummary total={total + tax} tax={tax} savings={savings} />
      </div>
    </PageContainer>
  );
}

export default CartClient;

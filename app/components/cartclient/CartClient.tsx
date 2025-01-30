"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import PageContainer from "../Containers/PageContainer";
import Button from "../general/Button"; // Buton bileşenini kullanıyoruz
import { removeFromCart } from "@/store/cartSlice"; // Sepetten ürün çıkarma işlemi
import Image from "next/image";
import { useEffect, useState } from "react";

import Loading from "../utils/Loading";
import TextClip from "../utils/TextClip";

function CartClient() {
  const dispatch = useDispatch();
  const carts = useSelector((state: RootState) => state.cart.carts);

  // Local state to check if component is loaded
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Mark component as client-side after mounting
  }, []);

  if (!isClient) {
    return <Loading />;
  }

  const removeItemFromCart = (id: string) => {
    dispatch(removeFromCart(id));
  };

  if (!carts || carts.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold text-gray-700">
        Sepette Hiç Ürün Yok.
      </div>
    );
  }

  return (
    <PageContainer>
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Sepetiniz</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Ürün Tablosu */}
        <div className="flex-1">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">Ürün Resmi</th>
                <th className="p-4 text-left">Ürün Adı</th>
                <th className="p-4 text-left">Açıklama</th>
                <th className="p-4 text-left">Miktar</th>
                <th className="p-4 text-left">Fiyat</th>
                <th className="p-4 text-left">Sepetten Çıkar</th>
              </tr>
            </thead>
            <tbody>
              {carts.map((cart) => (
                <tr key={cart.id} className="border-b border-gray-200">
                  <td className="p-4">
                    <Image
                      src={cart.image}
                      alt={cart.name}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </td>
                  <td className="p-4 text-gray-900">{TextClip(cart.name)}</td>
                  <td className="p-4 text-gray-600">{cart.description}</td>
                  <td className="p-4 text-gray-600">{cart.quantity}</td>
                  <td className="p-4 text-gray-900">${cart.price}</td>
                  <td className="p-4">
                    <Button
                      onClick={() => removeItemFromCart(cart.id)}
                      text="Sepetten Çıkar"
                      outline
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sepet Toplamı Kartı */}
        <div className="w-full lg:w-1/3 p-6 bg-gray-50 border-t border-gray-200 shadow-lg rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <span className="text-2xl font-semibold">Toplam:</span>
            <span className="text-2xl font-semibold text-primary">
              $
              {carts.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              )}
            </span>
          </div>
          <div className="mt-6 text-center">
            <Button onClick={() => {}} text="Alışverişe Devam Et" />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default CartClient;

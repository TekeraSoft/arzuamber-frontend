"use client";
import PageContainer from "@/components/Containers/PageContainer";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { CiCircleCheck } from "react-icons/ci";
import { FaTruckFast } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { clearCart, clearOrderSummaryProduct } from "@/store/cartSlice";
import { useSession } from "next-auth/react";
import ManualWhatsappMessage from "@/components/payment/ManualWhatsappMessage";
import { setRegisterModal } from "@/store/modalsSlice";
import PaymentSummaryItem from "@/components/payment/PaymentSummaryItem";
import OrderSummaryCustomerInfo from "@/components/payment/OrderSummaryCustomerInfo";
import { RiFilePaper2Line } from "react-icons/ri";

const SuccessPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const session = useSession();
  const t = useTranslations();

  const { cartProducts } = useSelector((state: RootState) => state.cart);

  const [orderSummaryProducts, setOrderSummaryProducts] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("orderSummaryProducts");
        return stored ? JSON.parse(stored) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    if (cartProducts.length > 0) {
      setOrderSummaryProducts(cartProducts);
      dispatch(clearCart());
    }
  }, [cartProducts, dispatch]);

  useEffect(() => {
    localStorage.setItem(
      "orderSummaryProducts",
      JSON.stringify(orderSummaryProducts)
    );
  }, [orderSummaryProducts]);

  return (
    <div className=" mx-auto md:container w-full h-full mb-12 md:mb-20  mt-8 md:mt-5">
      <div className="w-full  flex justify-center items-center bg-gray-50 rounded-lg">
        <div className="flex flex-col-reverse md:flex-row justify-center items-center w-full h-full  py-5 ">
          {orderSummaryProducts?.length > 0 && (
            <div className="border-r w-full flex flex-col justify-center items-center gap-2 mt-4 md:mt-0">
              <h2 className="text-2xl md:text-3xl text-gray-800 font-semibold text-center flex justify-center items-center gap-2">
                Sipariş Özeti
                <RiFilePaper2Line />
              </h2>

              <OrderSummaryCustomerInfo />

              <div className="w-full items-center grid md:grid-cols-2 gap-2 px-2">
                {orderSummaryProducts.map((product, index) => (
                  <div
                    key={index}
                    className={
                      orderSummaryProducts.length === 1 ? "col-span-2" : ""
                    }
                  >
                    <PaymentSummaryItem
                      summaryNumber={index + 1}
                      product={product}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div
            className={`${
              orderSummaryProducts.length > 0 ? " w-full" : "w-full md:w-3/4"
            } flex flex-col items-center gap-1 px-4 md:px-0 `}
          >
            <CiCircleCheck className="h-24 w-24  text-green-500" />
            <h1 className=" text-xl md:text-3xl font-bold text-gray-800 text-center">
              {t("paymentSuccess.title")}
            </h1>

            <div className="flex justify-center items-center w-full gap-2 text-center mt-2 text-xs md:text-lg font-semibold text-gray-700">
              <p>{t("paymentSuccess.cargoMessage")}</p>
              <FaTruckFast className="text-xl md:text-2xl text-gray-600" />
            </div>

            {session?.status === "unauthenticated" && (
              <div className="text-red-600 text-center text-sm md:text-base underline">
                *Sipariş Durumunuzun takibi için üye olun.*
              </div>
            )}

            {session?.status === "authenticated" ? (
              <Link
                href="/profile/orders"
                onClick={() => dispatch(clearOrderSummaryProduct())}
                className="mt-1 px-6 py-1 md:py-2 text-sm md:text-base bg-secondary text-white rounded-lg shadow-md hover:scale-105 transition duration-200"
              >
                {t("paymentSuccess.CheckOrders")}
              </Link>
            ) : (
              <div className="flex flex-col md:flex-row justify-between items-center gap-3 mt-1 w-full px-5">
                <Link
                  href="/"
                  onClick={() => dispatch(clearOrderSummaryProduct())}
                  className="w-full text-center px-6 py-2 text-sm md:text-base bg-secondary text-white rounded-lg shadow-md hover:scale-105 transition duration-200"
                >
                  {t("paymentFailure.returnHome")}
                </Link>
                <button
                  onClick={() => dispatch(setRegisterModal(true))}
                  className="w-full text-center px-6 py-2  text-sm bg-secondary text-white rounded-lg shadow-md hover:scale-105 transition duration-200"
                >
                  Üye Ol
                </button>
              </div>
            )}

            <div className="w-full mt-2">
              <ManualWhatsappMessage />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;

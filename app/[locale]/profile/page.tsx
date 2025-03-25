"use client";
import { useTranslations } from "next-intl";
import {
  FaPhoneAlt,
  FaRegAddressCard,
  FaEnvelope,
  FaExclamationTriangle,
  FaCheckCircle,
  FaCreditCard,
  FaExclamationCircle,
  FaChartBar,
  FaShoppingCart,
  FaMoneyBillWave,
  FaTimesCircle,
} from "react-icons/fa";
import { useSession } from "next-auth/react";
import Loading from "@/components/utils/Loading";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { setLoginModal } from "@/store/modalsSlice";
import { getUserOrdersDispatch } from "@/store/userSlice";
import { useEffect } from "react";
import { BiSolidDiscount } from "react-icons/bi";

import { Link } from "@/i18n/routing";import { FaTruck } from "react-icons/fa";import { FaHouseChimney } from "react-icons/fa6";



export default function ProfilePage() {
  const t = useTranslations();
  const { data: session, status } = useSession();

  const dispatch = useDispatch<AppDispatch>();

  const { orders, loading } = useSelector((state: RootState) => state.user);

  // orders dispatch
  useEffect(() => {
    dispatch(getUserOrdersDispatch(session?.user.email));
  }, [dispatch, session?.user.email]);

  // Durumlara göre siparişleri gruplama
  // const pendingOrders = orders.filter((order) => order.status === "PENDING");
  const completedOrders = orders.filter((order) => order.status === "SHIPPED");
  const paidOrders = orders.filter((order) => order.status === "PAID");
  const canceledOrders = orders.filter((order) => order.status === "CANCELLED");

  console.log(orders);

  if (status === "loading" || loading) {
    return <Loading />;
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex justify-center items-center w-full h-full ">
        <div className="p-8  ounded-md flex flex-col items-center text-center space-y-4">
          <FaExclamationTriangle className="text-yellow-500 text-4xl" />
          <h2 className="text-2xl font-semibold text-gray-800">
            {t("profile.notLoggedIn.title")}
          </h2>
          <p className="text-gray-600">
            {t("profile.notLoggedIn.description")}
          </p>
          <button
            onClick={() => {
              dispatch(setLoginModal(true));
            }}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
          >
            {t("profile.notLoggedIn.loginButton")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 space-y-8 h-full rounded-md">
      {/* Kişisel Bilgiler Bölümü */}
      <div className="space-y-3">
        <h3 className="text-xl md:text-2xl font-semibold text-primary">
          {t("userInfo.title")}
        </h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <FaRegAddressCard className="text-primary text-xl" />
            <span className="font-medium text-gray-800 capitalize">
              <strong>{t("userInfo.name")}: </strong> {session?.user?.name}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <FaEnvelope className="text-primary text-xl" />
            <span className="font-medium text-gray-800">
              <strong>{t("userInfo.email")}: </strong> {session?.user?.email}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <FaPhoneAlt className="text-primary text-xl" />
            <span className="font-medium text-gray-800">
              <strong>{t("userInfo.phone")}: </strong>{" "}
              {session?.user?.phoneNumber ? (
                session?.user?.phoneNumber
              ) : (
                <Link
                  href={"/profile/update"}
                  className="text-sm text-red-500 hover:underline"
                >
                  {t("profile.updatePhone")}
                </Link>
              )}
            </span>
          </div>
          {/* Adres Bölümü */}
          <div className="flex  items-center justify-start w-full gap-2">
<div className="flex items-center space-x-3">  <FaHouseChimney className="text-primary text-xl" />
  <h3 className="font-semibold text-primary">
    {t("userInfo.address")}:
  </h3>
</div>

            {session?.user?.address ? (
                <p className="text-sm">{session.user.address}</p>
            ) : (
                <Link
                    href={"/profile/update"}
                    className="text-sm text-red-500 hover:underline"
                >
                  {t("profile.updateAddress")}
                </Link>
            )}
          </div>{" "}
        </div>
      </div>

      <div className="w-full  space-y-8 ">
        {/* Profil İstatistikleri */}
        <div className="space-y-3 mt-6">
          <h3 className="text-xl md:text-2xl font-semibold text-primary flex items-center gap-2">
            <FaChartBar className="text-primary text-2xl" />
            {t("profile.statistics.title")}
          </h3>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {/* Sipariş Sayısı */}
            <div className="flex flex-col items-center bg-indigo-200 p-4 rounded-lg shadow-md">
              <FaShoppingCart className="text-indigo-600 text-3xl" />
              <span className="text-3xl font-semibold text-indigo-700">
                {orders.length}
              </span>
              <p className="text-sm text-gray-600 truncate">
                {t("profile.statistics.totalOrders")}
              </p>
            </div>
            {/* Toplam Harcama */}
            <div className="flex flex-col items-center bg-emerald-200 p-4 rounded-lg shadow-md">
              <FaMoneyBillWave className="text-emerald-600 text-3xl" />
              <span className="text-2xl font-semibold text-emerald-700">
                {orders
                  .reduce(
                    (total, order) => total + parseFloat(order.totalPrice),
                    0
                  )
                  .toFixed(2)}
              </span>
              <p className="text-sm text-gray-600 truncate">
                {t("profile.statistics.totalSpent")}
              </p>
            </div>
            {/* Bekleyen Siparişler */}
            {/* <div className="flex flex-col items-center bg-yellow-100 p-4 rounded-lg shadow-md">
              <FaExclamationCircle className="text-yellow-500 text-3xl" />
              <span className="text-3xl font-semibold text-yellow-600">
                {pendingOrders.length}
              </span>
              <p className="text-sm text-gray-600 truncate">
                {t("profile.statistics.pendingOrders")}
              </p>
            </div> */}

            {/* Kuponlarım */}
            <div className="flex flex-col items-center bg-yellow-100 p-4 rounded-lg shadow-md">
              <BiSolidDiscount className="text-yellow-500 text-3xl" />
              <span className="text-3xl font-semibold text-yellow-600">0</span>
              <p className="text-sm text-gray-600 truncate">Kuponlarım</p>
            </div>


            {/* Ödenen Siparişler */}
            <div className="flex flex-col items-center bg-blue-100 p-4 rounded-lg shadow-md">
              <FaCreditCard className="text-blue-500 text-3xl" />
              <span className="text-3xl font-semibold text-blue-600">
                {paidOrders.length}
              </span>
              <p className="text-sm text-gray-600 truncate">
                {t("profile.statistics.paidOrders")}
              </p>
            </div>

            {/* kargolanan Siparişler */}
            <div className="flex flex-col items-center bg-gray-50 p-4 rounded-lg shadow-md">
              <FaTruck className=" text-3xl" />
              <span className="text-3xl font-semibold ">
                {completedOrders.length}
              </span>
              <p className="text-sm text-gray-600 truncate">
                {t("profile.statistics.completedOrders")}
              </p>
            </div>


            {/* İptal Edilen Siparişler */}
            <div className="flex flex-col items-center bg-red-100 p-4 rounded-lg shadow-md">
              <FaTimesCircle className="text-red-500 text-3xl" />
              <span className="text-3xl font-semibold text-red-600">
                {canceledOrders.length}
              </span>
              <p className="text-sm text-gray-600 truncate">
                {t("profile.statistics.canceledOrders")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
} from "react-icons/fa";
import { useSession } from "next-auth/react";
import Loading from "@/components/utils/Loading";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { setLoginModal } from "@/store/modalsSlice";
import { getUserOrdersDispatch } from "@/store/userSlice";
import { useEffect } from "react";
import { Link } from "@/i18n/routing";

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
  const pendingOrders = orders.filter((order) => order.status === "PENDING");
  const completedOrders = orders.filter((order) => order.status === "SHIPPED");
  const paidOrders = orders.filter((order) => order.status === "SHIPPED");
  console.log(orders);

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex justify-center items-center w-full h-full ">
        <div className="p-8  ounded-md flex flex-col items-center text-center space-y-4">
          <FaExclamationTriangle className="text-yellow-500 text-4xl" />
          <h2 className="text-2xl font-semibold text-gray-800">
            Giriş Yapmadınız
          </h2>
          <p className="text-gray-600">
            Profilinize erişebilmek için giriş yapmanız gerekiyor.
          </p>
          <button
            onClick={() => {
              dispatch(setLoginModal(true));
            }}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
          >
            Giriş Yap
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
              {session?.user?.phoneNumber ? session.user.phoneNumber : "-"}
            </span>
          </div>
        </div>
      </div>

      <div className="w-full px-4 space-y-8 ">
        {/* Profil İstatistikleri */}
        <div className="space-y-3 mt-6">
          <h3 className="text-xl md:text-2xl font-semibold text-primary">
            Profil İstatistikleri
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Sipariş Sayısı */}
            <div className="flex flex-col items-center bg-gray-50 p-4 rounded-lg shadow-md">
              <span className="text-3xl font-semibold text-primary">
                {orders.length}
              </span>
              <p className="text-sm text-gray-600">Sipariş Sayısı</p>
            </div>

            {/* Toplam Harcama */}
            <div className="flex flex-col items-center bg-gray-50 p-4 rounded-lg shadow-md">
              <span className="text-3xl font-semibold text-primary">
                {orders
                  .reduce(
                    (total, order) => total + parseFloat(order.totalPrice),
                    0
                  )
                  .toFixed(2)}
              </span>
              <p className="text-sm text-gray-600">Toplam Harcama (₺)</p>
            </div>

            {/* Bekleyen Siparişler */}
            <div className="flex flex-col items-center bg-yellow-50 p-4 rounded-lg shadow-md">
              <FaExclamationCircle className="text-yellow-500 text-3xl" />
              <span className="text-3xl font-semibold text-yellow-600">
                {pendingOrders.length}
              </span>
              <p className="text-sm text-gray-600">Bekleyen Siparişler</p>
            </div>

            {/* Tamamlanan Siparişler */}
            <div className="flex flex-col items-center bg-green-50 p-4 rounded-lg shadow-md">
              <FaCheckCircle className="text-green-500 text-3xl" />
              <span className="text-3xl font-semibold text-green-600">
                {completedOrders.length}
              </span>
              <p className="text-sm text-gray-600">Tamamlanan Siparişler</p>
            </div>

            {/* Ödenen Siparişler */}
            <div className="flex flex-col items-center bg-blue-50 p-4 rounded-lg shadow-md">
              <FaCreditCard className="text-blue-500 text-3xl" />
              <span className="text-3xl font-semibold text-blue-600">
                {paidOrders.length}
              </span>
              <p className="text-sm text-gray-600">Ödenen Siparişler</p>
            </div>
          </div>
        </div>
        {/* Adres Bölümü */}
        <div className="flex flex-col items-start justify-center w-full gap-2">
          <h3 className="text-xl md:text-2xl font-semibold text-primary">
            {t("userInfo.address")}
          </h3>

          {session?.user?.adress ? (
            <p className="text-sm">{session.user.adress}</p>
          ) : (
            <Link
              href={"/profile/update"}
              className="text-sm text-red-500 hover:underline"
            >
              Adresinizi Güncelleyin
            </Link>
          )}
        </div>{" "}
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { RiFilePaper2Line } from "react-icons/ri";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useSession } from "next-auth/react";
import { AppDispatch } from "@/store/store";
import { getUserOrdersDispatch } from "@/store/userSlice";
import Loading from "@/components/utils/Loading";
import { Paginator } from "primereact/paginator";
import { PaginatorPageChangeEvent } from "primereact/paginator";
import Image from "next/image";

function OrderPage() {
  const { data: session } = useSession();
  const t = useTranslations();
  const dispatch = useDispatch<AppDispatch>();

  const { orders, loading } = useSelector((state: RootState) => state.user);

  // orders dispatch
  useEffect(() => {
    dispatch(getUserOrdersDispatch(session?.user.email));
  }, [dispatch, session?.user.email]);

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(3);

  if (loading == true) {
    return <Loading />;
  }

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  // Sayfalama için gösterilecek siparişleri belirle
  const displayedOrders = orders.slice(first, first + rows);

  return (
    <div className=" flex flex-col justify-center items-center w-full px-2   ">
      {/* Show message if there are no orders */}
      {!orders || orders.length === 0 ? (
        <div className="flex flex-col justify-center items-center text-center py-8 min-h-96 w-full ">
          <RiFilePaper2Line size={35} />
          <h2 className="text-lg font-semibold">{t("ordersPage.noOrders")}</h2>
          <p className="text-gray-500">{t("ordersPage.startShopping")}</p>
        </div>
      ) : (
        <div>
          {/* Orders List */}
          {displayedOrders.map((order, index) => (
            <div key={index} className=" border-y  w-full  ">
              <div className="flex  justify-between items-center gap-1 mb-4 px-1 py-1">
                <h3 className="text-base md:text-lg font-semibold">
                  {t("ordersPage.order")} #{order.paymentId}
                </h3>
                <span
                  className={`font-semibold text-sm md:text-sm p-2 ${
                    order.status === "PAID"
                      ? "bg-green-500 text-mywhite"
                      : order.status === "PENDING"
                      ? "bg-yellow-500 text-mywhite"
                      : order.status === "FAILED"
                      ? "bg-red-500 text-mywhite"
                      : order.status === "CANCELED"
                      ? "bg-gray-500 text-mywhite"
                      : "bg-blue-500 text-mywhite"
                  }  px-2 rounded-md`}
                >
                  {t("ordersPage.status")}:{" "}
                  {t(`ordersPage.statuses.${order.status}`) ||
                    t("ordersPage.statuses.OTHER")}
                </span>
              </div>
              <div className="flex justify-between items-center  px-1">
                <div className="text-xs md:text-sm text-gray-500 mb-4">
                  <span className="font-semibold">
                    {t("ordersPage.orderDate")}
                  </span>
                  :
                  {new Date(order.createdAt).toLocaleString("tr-TR", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    weekday: "short",
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  })}
                </div>
                <div className="text-sm md:text-sm font-semibold mb-4 underline">
                  {t("ordersPage.totalPrice")}: ₺{order.totalPrice}
                </div>
              </div>

              {/* Products in the order */}
              <div className="flex flex-wrap justify-between items-center gap-1 ">
                {order.basketItems.map((product, index) => (
                  <div
                    key={index}
                    className="flex gap-3 md:mb-6 p-2  rounded-lg w-full border "
                  >
                    <div className="flex justify-between items-center  gap-2 w-full ">
                      <div className="flex gap-2 justify-center items-center ">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${product.image}`}
                          alt={product.image}
                          width={45}
                          height={45}
                          className={"rounded"}
                        />
                      </div>
                      <div className="flex flex-col gap-2 justify-center items-start md:items-center max-w-32 md:max-w-48">
                        <p className="text-xsa md:text-base font-semibold ">
                          {product.name}
                        </p>
                        <p className="text-xs md:text-base text-gray-600">
                          <span className="font-semibold">
                            {t("ordersPage.stockCode")}
                          </span>
                          :{product.stockCode}
                        </p>
                      </div>
                      <div className="grid gap-2 grid-cols-2 sm:w-2/6">
                        <div className="text-gray-600 text-xs md:text-sm">
                          <span className="font-semibold">
                            {t("ordersPage.color")}
                          </span>
                          : {product.color}
                        </div>
                        <div className="text-gray-600 text-xs md:text-sm">
                          <span className="font-semibold">
                            {t("ordersPage.size")}
                          </span>
                          : {product.size}
                        </div>
                        <div className="text-gray-600 text-xs md:text-sm">
                          <span className="font-semibold">
                            {t("ordersPage.quantity")}
                          </span>
                          : {product.quantity}
                        </div>
                        <div className="text-gray-600 text-xs md:text-sm">
                          <span className="font-semibold">
                            {t("ordersPage.price")}
                          </span>
                          : ₺
                          {product.price.toLocaleString("tr-TR", {
                            style: "currency",
                            currency: "TRY",
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="w-full p-2 rounded-lg ">
                  <h4 className="text-lg font-semibold mb-3 text-center border-b">
                    {t("ordersPage.shippingAddress")}
                  </h4>
                  <div className="grid grid-cols-3  gap-4 text-sm text-gray-700 w-full">
                    <p className="capitalize">
                      <span className="font-semibold ">
                        {t("ordersPage.contactName")}:
                      </span>{" "}
                      {order.shippingAddress.contactName}
                    </p>
                    <p>
                      <span className="font-semibold">
                        {t("ordersPage.country")}:
                      </span>{" "}
                      {order.shippingAddress.country}
                    </p>
                    <p>
                      <span className="font-semibold">
                        {t("ordersPage.city")}:
                      </span>{" "}
                      {order.shippingAddress.city}
                    </p>

                    <p>
                      <span className="font-semibold">
                        {t("ordersPage.state")}:
                      </span>{" "}
                      {order.shippingAddress.state}
                    </p>
                    <p className="capitalize">
                      <span className="font-semibold">
                        {t("ordersPage.street")}:
                      </span>{" "}
                      {order.shippingAddress.street}
                    </p>
                  </div>
                  <div className=" my-2">
                    <span className="font-semibold text-sm">
                      {t("ordersPage.DetailAdres")}:
                    </span>{" "}
                    {order.shippingAddress.address}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {orders.length > rows && (
            <div className="card">
              <Paginator
                first={first}
                rows={rows}
                totalRecords={orders.length}
                rowsPerPageOptions={[5, 10, 20]}
                onPageChange={onPageChange}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default OrderPage;

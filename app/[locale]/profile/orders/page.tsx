"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { RiFilePaper2Line } from "react-icons/ri";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useSession } from "next-auth/react";
import { AppDispatch } from "@/store/store";
import {getUserOrdersDispatch} from "@/store/userSlice";

function OrderPage() {
  const { data: session } = useSession();
  const t = useTranslations();
  const dispatch = useDispatch<AppDispatch>();

  const [currentPage, setCurrentPage] = useState(0);
  const ordersPerPage = 2;
  const { orders, loading } = useSelector((state: RootState) => state.user);

  // orders dispatch
  useEffect(() => {
      dispatch(getUserOrdersDispatch('bdurak3@gmail.com'));
  }, []);

  // Calculate the orders to show on the current page
  const pageCount = Math.ceil(orders.length / ordersPerPage);
  const offset = currentPage * ordersPerPage;
  const currentOrders = orders.slice(offset, offset + ordersPerPage);

  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  return (
    <div className="px-5 py-2 bg-gray-50">
      {/* Show message if there are no orders */}
      {!orders || orders.length === 0 ? (
        <div className="flex flex-col justify-center items-center  text-center py-8">
          <RiFilePaper2Line size={35} />
          <h2 className="text-lg font-semibold">{t("ordersPage.noOrders")}</h2>
          <p className="text-gray-500">{t("ordersPage.startShopping")}</p>
        </div>
      ) : (
        <>
          {/* Orders List */}
          {orders.map((order) => (
            <div key={order.id} className="mb-8 border-b  w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base md:text-lg font-semibold">
                  {t("ordersPage.order")} #{order.id}
                </h3>
                <span className="font-semibold text-base md:text-lg">
                  {t("ordersPage.status")}: {order.status}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-xs md:text-sm text-gray-500 mb-4">
                  {t("ordersPage.orderDate")}:
                  {new Date(order.orderDate).toLocaleDateString()}
                </div>
                <div className="text-sm md:text-sm font-semibold mb-4">
                  {t("ordersPage.totalPrice")}: ₺{order.totalPrice}
                </div>
              </div>
              {/* Products in the order */}
              <div className="flex flex-wrap justify-between items-center">
                {order.basketItems.map((product,index) => (
                  <div
                    key={index}
                    className="flex gap-3 mb-6 p-4 bg-gray-100 rounded-lg w-full "
                  >
                    <div className="flex justify-between items-center gap-2 w-full ">
                      <p className="text-xs md:text-base font-semibold">
                        {product.name}
                      </p>
                      <div className="text-gray-600 text-xs md:text-sm">
                        {t("ordersPage.color")}: {product.color}
                      </div>
                      <div className="text-gray-600 text-xs md:text-sm">
                        {t("ordersPage.size")}: {product.size}
                      </div>
                      <div className="text-gray-600 text-xs md:text-sm">
                        {t("ordersPage.size")}: {product.quantity}
                      </div>
                      <div className="text-gray-600 text-xs md:text-sm">
                        {t("ordersPage.price")}: ₺{product.price.toLocaleString('tr-TR', {style: 'currency', currency:'TRY'})}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Pagination */}
          <div className="flex justify-center">
            <ReactPaginate
              previousLabel={<FaChevronLeft className="text-gray-600" />}
              nextLabel={<FaChevronRight className="text-gray-600" />}
              pageCount={pageCount}
              onPageChange={handlePageClick}
              containerClassName="flex items-center space-x-4"
              pageClassName="px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 hover:text-black cursor-pointer"
              activeClassName="bg-secondary text-white"
              breakClassName="px-4 py-2 text-gray-500"
              pageLinkClassName="cursor-pointer"
              breakLinkClassName="cursor-pointer"
              disabledClassName="cursor-not-allowed text-gray-400"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default OrderPage;

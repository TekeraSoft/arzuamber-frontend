"use client";
import React, { useEffect, useState } from "react";
import { format } from "date-fns/format";
import { tr } from "date-fns/locale";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  changeOrderStatusDispatch,
  deleteOrderDispatch,
  getAllOrdersDispatch,
  setNewOrderToReturnWebsocket,
} from "@/store/adminSlice";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { MdDelete } from "react-icons/md";
import { Dropdown } from "primereact/dropdown";
import { isToday, parseISO } from "date-fns";
import Image from "next/image";
import useWebSocket from "@/hooks/useWebSocket";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

function AdminPage() {
  const dispatch = useDispatch<AppDispatch>();

  const imageUri = process.env.NEXT_PUBLIC_RESOURCE_API || "";
  const { orders, page, loading } = useSelector(
    (state: RootState) => state.admin
  );
  const [pageable, setPageable] = useState({ currentPage: 0, size: 15 });
  const [expandedRows, setExpandedRows] = useState(null);
  //const { orders } = useWebSocket(pageable.currentPage,pageable.size);

  const statusOptions = [
    { label: "ÖDENDİ", value: "PAID" },
    { label: "KARGOYA VERİLDİ", value: "SHIPPED" },
    { label: "İPTAL ET", value: "CANCELLED" },
    { label: "KAPIDA ÖDEME", value: "PAY_AT_DOOR" },
  ];

  useEffect(() => {
    dispatch(getAllOrdersDispatch(pageable.currentPage, pageable.size));
    const socket = new SockJS(process.env.NEXT_PUBLIC_SOCKET_URI);
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, function () {
      // 🔔 Yeni siparişleri dinle
      stompClient.subscribe("/topic/orders", function (res) {
        const newOrder = JSON.parse(res.body);
        playAudio();
        dispatch(setNewOrderToReturnWebsocket(newOrder));
      });
    });

    return () => {
      stompClient.disconnect();
    };
  }, [pageable.currentPage, pageable.size, dispatch]);

  const onPageChange = (event) => {
    setPageable({ size: event.rows, currentPage: event.page });
  };

  const playAudio = () => {
    const audio = new Audio("/audio/order-alert.mp3");
    audio.play();
  };

  const allowExpansion = (rowData) => {
    return rowData.basketItems.length > 0;
  };

  const rowExpansionTemplate = (data) => {
    return (
      <DataTable
        size={"small"}
        tableStyle={{
          minWidth: "50rem",
          fontSize: "12px",
        }}
        value={data.basketItems}
      >
        <Column
          field={"image"}
          header={"Image"}
          body={(row) => (
            <Image
              src={`${imageUri}${row.image}`}
              alt={row.image}
              width={35}
              height={35}
              className={
                "rounded hover:w-44 hover:h-44 transition-all cursor-zoom-in"
              }
            />
          )}
        />
        <Column field={"name"} header={"Name"} />
        <Column field={"stockCode"} header={"Stock Code"} />
        <Column field={"color"} header={"Color"} />
        <Column field={"size"} header={"Size"} />
        <Column field={"quantity"} header={"Unit"} />
      </DataTable>
    );
  };

  return (
    <div className="w-full">
      <DataTable
        value={orders}
        responsiveLayout="scroll"
        size="small"
        tableStyle={{ fontSize: "13px" }}
        paginator
        rows={pageable.size}
        first={pageable.currentPage}
        onPage={onPageChange}
        rowsPerPageOptions={[15, 25, 100]}
        rowExpansionTemplate={rowExpansionTemplate}
        expandedRows={expandedRows}
        onRowToggle={(e) => setExpandedRows(e.data)}
        rowClassName={(data) => {
          const base = "text-sm";
          const highlight = isToday(parseISO(data.createdAt))
            ? "bg-green-100"
            : "";
          return `${base} ${highlight}`;
        }}
        tableClassName="border border-gray-200 w-full"
      >
        <Column expander={allowExpansion} className="bg-violet-400/15 " />
        <Column
          body={(data) => (
            <div className="flex flex-col gap-2  p-3  md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-4 md:items-center flex-wrap">
              <div>
                <strong>Buyer Name:</strong> {data.buyer.name}{" "}
                {data.buyer.surname}
              </div>
              <div>
                <strong>GSM:</strong> {data.buyer.gsmNumber}
              </div>
              <div>
                <strong>Email:</strong> {data.buyer.email}
              </div>
              <div>
                <strong>Price:</strong>{" "}
                <span className="font-bold">
                  {data.totalPrice.toLocaleString("tr-TR", {
                    style: "currency",
                    currency: "TRY",
                  })}
                </span>
              </div>
              <div>
                <strong>Created At:</strong>{" "}
                {format(data.createdAt, "dd.MM.yyyy | HH:mm:ss", {
                  locale: tr,
                })}
              </div>
              <div>
                <strong>Address:</strong>{" "}
                <span className="text-[12px] block">
                  {data.shippingAddress.address} - {data.shippingAddress.street}{" "}
                  - {data.shippingAddress.state} / {data.shippingAddress.city}
                </span>
              </div>
              <div>
                <strong>Status:</strong>{" "}
                <Dropdown
                  value={data.status}
                  className="text-xs mt-1"
                  options={statusOptions}
                  optionLabel="label"
                  optionValue="value"
                  onChange={(e) =>
                    dispatch(changeOrderStatusDispatch(data.id, e.target.value))
                  }
                />
              </div>
              <div className="bg-violet-400/70 p-2 rounded-lg max-w-96 flex items-center space-x-3 w-f ">
                <strong className="text-white font-semibold">Actions:</strong>

                <MdDelete
                  className=" text-3xl border  rounded-md p-0.5 text-white hover:text-red-500 cursor-pointer transition-colors duration-300 hover:border-red-500"
                  onClick={() => {
                    const isConfirmed = confirm(
                      "Are you sure you want to delete this order?"
                    );
                    if (isConfirmed) {
                      dispatch(deleteOrderDispatch(data.id));
                    }
                  }}
                />
              </div>
            </div>
          )}
        />
      </DataTable>
    </div>
  );
}

export default AdminPage;

"use client";
import React, { useEffect, useState } from "react";
import { format } from "date-fns/format";
import { tr } from "date-fns/locale";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {changeOrderStatusDispatch, deleteOrderDispatch, getAllOrdersDispatch} from "@/store/adminSlice";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { MdDelete } from "react-icons/md";
import { Dropdown } from "primereact/dropdown";
import { isToday, parseISO } from "date-fns";
import Image from "next/image";

function AdminPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, page, loading } = useSelector(
    (state: RootState) => state.admin
  );
  const [pageable, setPageable] = useState({ currentPage: 0, size: 15 });
  const [expandedRows, setExpandedRows] = useState(null);

  useEffect(() => {
    dispatch(getAllOrdersDispatch(pageable.currentPage, pageable.size));
  }, [pageable.currentPage, pageable.size, dispatch]);

  const onPageChange = (event) => {
    setPageable({ size: event.rows, currentPage: event.page });
  };

  const allowExpansion = (rowData) => {
    return rowData.basketItems.length > 0;
  };

  const rowExpansionTemplate = (data) => {
    return (
      <DataTable
        size={"small"}
        tableStyle={{ minWidth: "50rem", fontSize: "12px" }}
        value={data.basketItems}
      >
        <Column
          field={"image"}
          header={"Image"}
          body={(row) => (
            <Image
              src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${row.image}`}
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
    <div className={"w-full"}>
      <DataTable
        size={"small"}
        tableStyle={{ minWidth: "50rem", fontSize: "13px" }}
        value={orders}
        paginator
        rows={pageable.size}
        first={pageable.currentPage}
        totalRecords={page.totalElements}
        onPage={onPageChange}
        rowsPerPageOptions={[15, 25, 100]}
        rowExpansionTemplate={rowExpansionTemplate}
        expandedRows={expandedRows}
        onRowToggle={(e) => setExpandedRows(e.data)}
        rowClassName={(data) =>
          isToday(parseISO(data.createdAt)) ? "!bg-green-100" : ""
        }
      >
        <Column expander={allowExpansion} style={{ width: "5rem" }} />
        <Column
          header={"Buyer Name"}
          body={(data) => (
            <span>
              {data.buyer.name} {data.buyer.surname}
            </span>
          )}
        />
        <Column field={"buyer.gsmNumber"} header={"Gsm Number"} />
        <Column field={"buyer.email"} header={"E-mail"} />
        <Column
          header={"Price"}
          body={(data) => (
            <span className={"font-extrabold"}>
              {data.totalPrice.toLocaleString("tr-TR", {
                style: "currency",
                currency: "TRY",
              })}
            </span>
          )}
        />
        <Column
          header={"Payment Status"}
          body={(data) => (
            <span>
              {format(data.createdAt, "dd.MM.yyyy | HH:mm:ss", { locale: tr })}
            </span>
          )}
        />
        <Column
          header={"Shipping Address"}
          style={{ width: "12rem" }}
          body={(data) => (
            <span className={"text-[12px]"}>
              {data.shippingAddress.address} - {data.shippingAddress.street} -{" "}
              {data.shippingAddress.state} / {data.shippingAddress.city}
            </span>
          )}
        />

        <Column
          header={"Payment Status"}
          body={(row) => (
            <Dropdown
              value={row.status}
              className={"text-xs"}
              options={["PAID", "SHIPPED", "CANCELLED"]}
              onChange={(e) => {
                dispatch(changeOrderStatusDispatch(row.id, e.target.value));
              }}
            />
          )}
        />
        <Column
          header={"Actions"}
          body={(data) => (
            <MdDelete
              className={"text-red-600 cursor-pointer"}
              size={24}
              onClick={() => {
                const isConfirmed = confirm(
                  "Are you sure you want to delete this order?"
                );
                if (isConfirmed) {
                  dispatch(deleteOrderDispatch(data.id));
                }
              }}
            />
          )}
        />
      </DataTable>
    </div>
  );
}

export default AdminPage;

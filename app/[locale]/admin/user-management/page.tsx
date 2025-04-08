"use client";

import React, { useEffect, useState } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  changeUserRoleDispatch,
  getUsersDispatch,
} from "@/store/superAdminSlice";
import { format } from "date-fns/format";
import { tr } from "date-fns/locale";
import { Dropdown } from "primereact/dropdown";

function Page() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, page, loading } = useSelector(
    (state: RootState) => state.superAdmin
  );
  const [pageable, setPageable] = useState({ currentPage: 0, size: 15 });

  const statusOptions = [
    { label: "USER", value: "USER" },
    { label: "ADMIN", value: "ADMIN" },
    { label: "SUPER_ADMIN", value: "SUPER_ADMIN" },
  ];

  useEffect(() => {
    dispatch(getUsersDispatch(pageable.currentPage, pageable.size));
  }, [dispatch, pageable.currentPage, pageable.size]);

  const onPageChange = (event) => {
    setPageable({ size: event.rows, currentPage: event.page });
  };

  return (
    <DataTable
      size={"small"}
      value={users}
      className={"rounded-lg"}
      tableStyle={{ minWidth: "50rem", fontSize: "14px" }}
      paginator
      lazy={true}
      first={pageable.currentPage * pageable.size}
      rows={pageable.size}
      rowsPerPageOptions={[15, 30, 50, 70]}
      paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="{first} to {last} of {totalRecords}"
      totalRecords={page.totalElements}
      onPage={onPageChange}
      loading={loading}
    >
      <Column
        header="Stok Kodu"
        body={(row) => (
          <span>
            {row.firstName} {row.lastName}
          </span>
        )}
      />
      <Column field="email" header="Mail" />
      <Column
        header="GSM Number"
        body={(row) => (
          <span>
            {row.phoneNumber ? (
              row.phoneNumber
            ) : (
              <p className={"text-red-600"}>-</p>
            )}
          </span>
        )}
      />
      <Column
        header="Last Login"
        body={(row) => (
          <span>
            {format(row.lastLogin, "dd.MM.yyyy | HH:mm:ss", { locale: tr })}
          </span>
        )}
      />
      <Column
        header="Created At"
        body={(row) => (
          <span>
            {format(row.createdAt, "dd.MM.yyyy | HH:mm:ss", { locale: tr })}
          </span>
        )}
      />
      <Column
        header="Role"
        body={(row) => (
          <Dropdown
            size={"small"}
            value={row.role[0]}
            options={statusOptions}
            onChange={(e) => {
              dispatch(changeUserRoleDispatch(row.id, e.target.value));
            }}
          />
        )}
      />
    </DataTable>
  );
}

export default Page;

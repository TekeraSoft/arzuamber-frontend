"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  adminDeleteContactMessage, getAllContacts,
} from "@/store/adminSlice";
import { AppDispatch, RootState } from "@/store/store";
import Loading from "@/components/utils/Loading";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { useTranslations } from "next-intl";
import { Button } from "primereact/button";
import { Dialog } from "@mui/material";
import { FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

function ContactMessagesPage() {

  const dispatch = useDispatch<AppDispatch>();
  const { contactForms, loading } = useSelector(
    (state: RootState) => state.admin
  );
  const t = useTranslations();
  const [visible, setVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [pageable,setPageable] = useState({ page: 0, size: 15 });
  useEffect(() => {
    dispatch(getAllContacts(pageable.page,pageable.size));
  }, [dispatch,pageable.page,pageable.size]);

  const handleDelete = (id: string) => {
    setSelectedId(id);
    setVisible(true);
  };

  const confirmDelete = () => {
    if (selectedId !== null) {
      dispatch(adminDeleteContactMessage(selectedId));
      setVisible(false);
    }
  };

  const onPageChange = (event) => {
    setPageable({ size: event.rows, currentPage: event.page });
  };

  const actionBodyTemplate = (rowData: { id: string }) => (
    <Button
      icon="pi pi-trash"
      className="p-button-danger p-button-sm"
      onClick={() => handleDelete(rowData.id)}
    >
      <FaTimes size={14} />
    </Button>
  );

  return (
    <div className="">
      <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">
        {t("adminTranslate.contactForm.title")}
      </h2>

      {loading ? (
        <Loading />
      ) : contactForms?._embedded?.contactDtoes.length > 0 ? (
        <div className="overflow-x-auto border">
          <DataTable
            value={contactForms._embedded.contactDtoes}
            paginator
            lazy={true}
            first={pageable.page * pageable.size}
            rows={pageable.size}
            rowsPerPageOptions={[15, 30, 50, 70]}
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} to {last} of {totalRecords}"
            totalRecords={contactForms.page.totalElements}
            onPage={onPageChange}
            loading={loading}
            className="min-w-full"
          >
            <Column
              field="name"
              header={t("adminTranslate.labels.name")}
              className="whitespace-nowrap"
            />
            <Column
              field="surname"
              header={t("adminTranslate.labels.surname")}
              className="whitespace-nowrap"
            />
            <Column
              field="email"
              header={t("adminTranslate.labels.email")}
              className="whitespace-nowrap"
            />
            <Column
              field="message"
              header={t("adminTranslate.labels.message")}
              className="min-w-[250px] md:min-w-[400px]"
            />
            <Column
              header="İşlem"
              body={actionBodyTemplate}
              className="text-center"
            />
          </DataTable>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center p-6 w-full border rounded-lg text-center">
          <MdOutlineMarkEmailUnread size={48} className="text-gray-500 mb-3" />
          <p className="text-lg text-gray-600">
            {t("adminTranslate.contactForm.message")}
          </p>
        </div>
      )}

      {/* Silme onay diyalogu */}
      <Dialog
        open={visible}
        onClose={() => setVisible(false)}
        maxWidth="sm"
        fullWidth
      >
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-3">
            {t("adminTranslate.sureMessage")}
          </h3>
          <div className="flex justify-end gap-2">
            <Button
              className="p-button-secondary"
              onClick={() => setVisible(false)}
            >
              <FaTimes size={18} />
            </Button>
            <Button
              icon="pi pi-trash"
              className="p-button-danger"
              onClick={confirmDelete}
            >
              <FaCheck size={18} />
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default ContactMessagesPage;

"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  adminDeleteContactMessage,
  getAllContactForn,
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
  // const contactForms = [
  //   {
  //     id: 1,
  //     name: "Ahmet",
  //     surname: "Yılmaz",
  //     email: "ahmetyilmaz@example.com",
  //     message: "Merhaba, ürünleriniz hakkında bilgi almak istiyorum.",
  //   },
  //   {
  //     id: 2,
  //     name: "Ayşe",
  //     surname: "Kara",
  //     email: "aysekara@example.com",
  //     message: "Siparişimle ilgili bir sorunum var, yardımcı olabilir misiniz?",
  //   },
  //   {
  //     id: 3,
  //     name: "Mehmet",
  //     surname: "Demir",
  //     email: "mehmetdemir@example.com",
  //     message: "Web sitenizde bazı hatalar fark ettim, düzeltilebilir mi?",
  //   },
  //   {
  //     id: 4,
  //     name: "Zeynep",
  //     surname: "Çelik",
  //     email: "zeynepcelik@example.com",
  //     message: "Yeni ürünler ne zaman stoklara gelecek?",
  //   },
  // ];

  const dispatch = useDispatch<AppDispatch>();
  const { contactForms, loading } = useSelector(
    (state: RootState) => state.admin
  );
  const t = useTranslations();
  const [visible, setVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getAllContactForn());
  }, [dispatch]);

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
      ) : contactForms.length > 0 ? (
        <div className="overflow-x-auto border">
          <DataTable
            value={contactForms}
            responsiveLayout="scroll"
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

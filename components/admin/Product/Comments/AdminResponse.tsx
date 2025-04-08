"use client";

import {
  AcceptComment,
  createCommentAdminResponse,
  deleteProductCommet,
} from "@/store/adminSlice";
import { AppDispatch } from "@/store/store";
import { useFormik } from "formik";
import Image from "next/image";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import React, { useState } from "react";
import { FaCheck, FaCommentSlash } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import * as yup from "yup";

function AdminResponse({ showCommentModal, setShowCommentModal, product }) {
  const dispatch = useDispatch<AppDispatch>();

  // Modal durumları
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showAcceptDialog, setShowAcceptDialog] = useState(false);
  const [currentProductId, setCurrentProductId] = useState<string | null>(null);
  const [currentCommentId, setCurrentCommentId] = useState<string | null>(null);

  // Yorum silme işlemi için açılacak dialog
  const deleteCommentHandler = (productId: string, commentId: string) => {
    setCurrentProductId(productId);
    setCurrentCommentId(commentId);
    setShowDeleteDialog(true); // Silme onay pop-up'ını göster
  };

  const acceptCommentHandler = (productId: string, commentId: string) => {
    setCurrentProductId(productId);
    setCurrentCommentId(commentId);
    setShowAcceptDialog(true); // Onaylama pop-up'ını göster
  };

  const confirmDelete = () => {
    if (currentProductId && currentCommentId) {
      dispatch(deleteProductCommet(currentProductId, currentCommentId));
    }
    setShowDeleteDialog(false); // Modalı kapat
  };

  const confirmAccept = () => {
    if (currentProductId && currentCommentId) {
      dispatch(AcceptComment(currentProductId, currentCommentId));
    }
    setShowAcceptDialog(false); // Modalı kapat
  };

  // Formik ile yönetilen form
  const formik = useFormik({
    initialValues: {
      adminResponse: "",
    },
    validationSchema: yup.object({
      adminResponse: yup
        .string()
        .required("Yanıt gereklidir")
        .min(5, "Yanıt en az 5 karakter olmalıdır"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);

      if (currentProductId && currentCommentId) {
        // Admin yanıtını gönder
        dispatch(createCommentAdminResponse(values, resetForm));
      }
    },
  });
  return (
    <div>
      {/* Modal */}
      <Dialog
        header="Yorumlar"
        visible={showCommentModal}
        style={{ width: "50vw", zIndex: "999" }}
        onHide={() => {
          setShowCommentModal(false);
        }}
      >
        {!product?.comments || product?.comments.length === 0 ? (
          <div className="w-full flex flex-col items-center justify-center text-center bg-gradient-to-r from-primary  to-secondary text-white rounded-xl shadow-2xl  py-5 mx-auto transition-all  transform duration-300 ease-in-out">
            <span className="text-4xl mb-4">
              <FaCommentSlash className="inline-block" />
            </span>
            <p className="text-lg font-semibold">
              Henüz bu ürüne ait yorum bulunmamaktadır.
            </p>
          </div>
        ) : (
          <DataTable
            value={product?.comments}
            tableStyle={{ minWidth: "50rem" }}
            scrollable
            scrollHeight="flex"
            className="w-full"
            responsiveLayout="scroll"
          >
            <Column
              field="userName"
              header="Kullanıcı"
              style={{ minWidth: "120px" }}
            />

            <Column
              field="message"
              header="Yorum"
              body={(rowData) => (
                <div className="line-clamp-3 overflow-hidden text-ellipsis max-h-[6rem]">
                  {rowData.message}
                </div>
              )}
            />

            {/* Admin cevap alanı ayrı kolon olarak */}
            <Column
              header="Yorum Ekle"
              style={{ minWidth: "250px" }}
              body={() => (
                <div className="flex flex-col gap-1">
                  <InputTextarea
                    rows={3}
                    autoResize
                    placeholder="Yoruma cevap yazın..."
                    className="p-inputtext-sm"
                    value={formik.values.adminResponse} // Formik'in değerini alıyoruz
                    onChange={formik.handleChange} // handleChange fonksiyonu ile değeri güncelliyoruz
                    name="adminResponse" // Formik ile eşleşmesi için name ekliyoruz
                  />
                  <button
                    className="bg-blue-500 text-white text-sm rounded px-2 py-1 hover:bg-blue-600 transition"
                    onClick={() => {
                      formik.handleSubmit(); // Formu göndermek için handleSubmit fonksiyonunu çağırıyoruz
                    }}
                  >
                    Yanıtla
                  </button>
                </div>
              )}
            />

            <Column field="rate" header="Puan" />

            <Column
              field="productImages"
              header="Resim"
              body={(rowData) => (
                <div className="flex gap-2 flex-wrap">
                  {rowData.productImages.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative w-16 h-16 rounded overflow-hidden"
                    >
                      <Image
                        src={img}
                        alt="product"
                        layout="fill"
                        objectFit="cover"
                        unoptimized // next/image optimizasyonunu kapatıyoruz hız için
                      />
                    </div>
                  ))}
                </div>
              )}
            />

            <Column
              field="id"
              header="Aksiyonlar"
              body={(row) => (
                <div className="flex flex-row justify-center items-center gap-3">
                  <button
                    onClick={() => deleteCommentHandler(row.productId, row.id)}
                  >
                    <MdDelete size={24} color="red" />
                  </button>
                  <button
                    onClick={() => acceptCommentHandler(row.productId, row.id)}
                  >
                    <FaCheck size={24} color="green" />
                  </button>
                </div>
              )}
            />
          </DataTable>
        )}
      </Dialog>

      {/* Yorum Silme onayı için Dialog */}
      <Dialog
        header="Yorum Silme"
        visible={showDeleteDialog}
        style={{ width: "50vw" }}
        onHide={() => setShowDeleteDialog(false)}
        footer={
          <div>
            <button
              onClick={confirmDelete}
              className="p-button p-button-danger"
            >
              Sil
            </button>
            <button
              onClick={() => setShowDeleteDialog(false)}
              className="p-button p-button-secondary"
            >
              Kapat
            </button>
          </div>
        }
      >
        <p>Bu yorumu silmek istediğinizden emin misiniz?</p>
      </Dialog>

      {/* Yorum Onaylama için Dialog */}
      <Dialog
        header="Yorum Onaylama"
        visible={showAcceptDialog}
        style={{ width: "50vw" }}
        onHide={() => setShowAcceptDialog(false)}
        footer={
          <div>
            <button
              onClick={confirmAccept}
              className="p-button p-button-success"
            >
              Onayla
            </button>
            <button
              onClick={() => setShowAcceptDialog(false)}
              className="p-button p-button-secondary"
            >
              Kapat
            </button>
          </div>
        }
      >
        <p>Bu yorumu onaylamak istediğinizden emin misiniz?</p>
      </Dialog>
    </div>
  );
}

export default AdminResponse;

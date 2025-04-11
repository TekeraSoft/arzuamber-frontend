"use client";

import {
  AcceptComment,
  changeCommentStatusDispatch,
  createCommentAdminResponse,
  deleteAdminCommentDispatch,
  deleteProductCommet,
} from "@/store/adminSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useFormik } from "formik";
import Image from "next/image";
import { Dialog } from "primereact/dialog";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import { replyCommentDispatch } from "@/store/adminSlice";
import { MdDelete } from "react-icons/md";
import { Checkbox } from "primereact/checkbox";

function AdminResponse({ showCommentModal, setShowCommentModal }) {
  const dispatch = useDispatch<AppDispatch>();
  const { commentProduct } = useSelector((state: RootState) => state.admin);
  // Modal durumları
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showAcceptDialog, setShowAcceptDialog] = useState(false);
  const [currentProductId, setCurrentProductId] = useState<string | null>(null);
  const [currentCommentId, setCurrentCommentId] = useState<string | null>(null);
  const [messages, setMessages] = useState({});

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
        className="h-[800px]"
        style={{ width: "50vw", zIndex: "999" }}
        onHide={() => setShowCommentModal(false)}
      >
        <div className="flex flex-col gap-y-4">
          {commentProduct?.comments.map((comment, commentIndex) => (
            <div
              key={comment.id}
              className="flex flex-col gap-y-4 border p-3 rounded w-full relative"
            >
              <span
                className={
                  "flex flex-row items-center gap-x-4 absolute right-4 top-1"
                }
              >
                <Rating value={comment.rate.rate} readOnly cancel={false} />
                <div className="flex align-items-center">
                  <Checkbox
                    inputId={`inputId-${comment.id}`}
                    checked={comment.isActive === true}
                    onChange={(e) => {
                      const newStatus = e.checked;
                      dispatch(
                        changeCommentStatusDispatch(comment.id, newStatus),
                      );
                    }}
                  />
                  <label htmlFor="ingredient1" className="ml-2">
                    Is Active?
                  </label>
                </div>
                <MdDelete
                  size={24}
                  color={"red"}
                  className={"cursor-pointer"}
                  onClick={() =>
                    dispatch(
                      deleteAdminCommentDispatch(
                        comment.id,
                        commentProduct.rates[commentIndex]?.id,
                      ),
                    )
                  }
                />
              </span>
              {/* Tüm içerikleri sırayla göster */}
              {comment.content.map((content, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-y-1 w-full border-b pb-2"
                >
                  <div className="flex flex-row items-center justify-between">
                    <span className="font-bold text-sm">
                      {content.userName}
                    </span>
                  </div>
                  <small className="text-gray-600 text-xs">
                    {content.message}
                  </small>
                </div>
              ))}

              {/* Görseller */}
              {comment.images.length > 0 && (
                <div className="grid grid-cols-3 gap-2 my-2">
                  {comment.images.map((image, index) => (
                    <Image
                      key={index}
                      src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${image}`}
                      alt={image}
                      width={60}
                      height={60}
                      className="rounded object-cover"
                    />
                  ))}
                </div>
              )}

              {/* Cevap textarea ve gönderme butonu */}
              <div className="flex flex-row gap-x-4 items-center mt-2">
                <textarea
                  value={messages[comment.id] || ""}
                  onChange={(e) =>
                    setMessages({
                      ...messages,
                      [comment.id]: e.target.value,
                    })
                  }
                  rows={3}
                  className="border placeholder:text-xs w-52 text-xs p-1 rounded"
                  placeholder="Enter your answer"
                />
                <Button
                  size="small"
                  className="!p-1 text-xs"
                  onClick={() =>
                    dispatch(
                      replyCommentDispatch(
                        {
                          commentId: comment.id,
                          message: messages[comment.id] || "",
                        },
                        setMessages,
                      ),
                    )
                  }
                >
                  Reply
                </Button>
              </div>
            </div>
          ))}
        </div>
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

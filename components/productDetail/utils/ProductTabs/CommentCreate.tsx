"use client";

import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";

function CommentCreate() {
  const [showModal, setShowModal] = useState(false); // Modal kontrolü
  const [imagePreviews, setImagePreviews] = useState([]);

  // Form doğrulama şeması (Yup ile)
  const validationSchema = Yup.object({
    comment: Yup.string()
      .min(5, "Yorum en az 5 karakter olmalı")
      .required("Yorum alanı boş bırakılamaz"),
    images: Yup.array().max(3, "En fazla 3 resim yükleyebilirsiniz."),
  });

  // Formik başlangıç değerleri
  const initialValues = {
    comment: "",
    images: [],
  };

  // Resim yükleme ve önizleme fonksiyonu
  const handleImageChange = (e, setFieldValue) => {
    const files = Array.from(e.target.files);

    // Eğer 3 resimden fazla yüklenmeye çalışıldıysa, modali gösteriyoruz
    if (files.length + imagePreviews.length > 3) {
      setShowModal(true); // Modal'ı göster
      return;
    }

    // Yeni yüklenen resimleri önceki önizlemelere ekleyin
    const updatedPreviews = [
      ...imagePreviews,
      ...files.map((file) => URL.createObjectURL(file)),
    ];

    // Image previews güncellemesi
    setImagePreviews(updatedPreviews);

    // Formik'e güncel dosyaları ekleyin
    setFieldValue("images", updatedPreviews); // Burada güncel previews dizisini kullanıyoruz
  };

  const handleSubmit = (values, { resetForm, setFieldValue }) => {
    // Yorum ve resimleri konsola yazdırıyoruz
    console.log("Yorum:", values.comment);
    console.log("Yüklenen Resimler:", values.images);

    // Formu sıfırlıyoruz
    resetForm();
    setImagePreviews([]); // Resimleri sıfırlıyoruz
    setFieldValue("images", []); // Formik'e yüklenen resimleri sıfırlıyoruz
  };

  return (
    <div className="mx-auto px-6 py-2">
      <h2 className="text-2xl font-semibold mb-4 text-center">Yorum Yap</h2>

      <Formik
        initialValues={initialValues} // Başlangıç değerleri
        validationSchema={validationSchema} // Doğrulama şeması
        onSubmit={(values, { resetForm, setFieldValue }) =>
          handleSubmit(values, { resetForm, setFieldValue })
        } // Form gönderildiğinde yapılacak işlem
      >
        {({ isSubmitting, setFieldValue, errors, touched }) => (
          <Form>
            {/* Yorum Metni */}
            <div className="mb-4">
              <Field
                as="textarea"
                name="comment"
                rows="4"
                placeholder="Yorumunuzu buraya yazın..."
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <ErrorMessage
                name="comment"
                component="div"
                className="text-red-500 text-sm mt-2"
              />
            </div>

            {/* Resim Yükleme Alanı */}
            <div className="mb-4">
              <div className="flex space-x-4">
                {/* Yüklenen Resimlerin Önizlemesi */}
                {imagePreviews.map((preview, index) => (
                  <div
                    key={index}
                    className="relative w-24 h-24 border-2 border-dashed rounded-md overflow-hidden"
                  >
                    <Image
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      fill
                      objectFit="cover"
                      className="rounded-md"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 text-white bg-red-500  p-0.5 rounded-lg"
                      onClick={() => {
                        const updatedPreviews = imagePreviews.filter(
                          (_, i) => i !== index
                        );
                        setImagePreviews(updatedPreviews);
                        setFieldValue("images", updatedPreviews);
                      }}
                    >
                      <IoClose />
                    </button>
                  </div>
                ))}

                {/* Eğer 3 resimden az yüklenmişse, yeni resim eklemek için alan */}
                {imagePreviews.length < 3 && (
                  <label
                    htmlFor="image-upload"
                    className="w-24 h-24 border-2 border-dashed flex items-center justify-center cursor-pointer rounded-md"
                  >
                    <span className="text-xl text-gray-600">
                      <FaPlus size={15} />
                    </span>
                    <input
                      id="image-upload"
                      type="file"
                      name="images"
                      accept="image/*"
                      multiple
                      onChange={(e) => handleImageChange(e, setFieldValue)}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Resim hataları */}
              <ErrorMessage
                name="images"
                component="div"
                className="text-red-500 text-sm mt-2"
              />
              {errors.images && touched.images && (
                <div className="text-red-500 text-sm mt-2">{errors.images}</div>
              )}
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-secondary text-white py-2 px-6 rounded-lg hover:opacity-85  transition duration-300"
                disabled={isSubmitting} // Form gönderme sırasında butonu devre dışı bırak
              >
                Yorum Gönder
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-96">
            <h3 className="text-xl font-semibold text-center mb-4">Uyarı</h3>
            <p className="text-center text-gray-600 mb-4">
              En fazla 3 resim yükleyebilirsiniz.
            </p>
            <div className="flex justify-center">
              <button
                className="bg-primary text-white py-2 px-6 rounded-lg hover:opacity-80 transition duration-300"
                onClick={() => setShowModal(false)} // Modal'ı kapat
              >
                Tamam
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommentCreate;

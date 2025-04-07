"use client";

import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { FaPlus, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { Rating } from "primereact/rating";
import Resizer from "react-image-file-resizer";
import { useSession } from "next-auth/react";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { setLoginModal, setRegisterModal } from "@/store/modalsSlice";
import { motion } from "framer-motion";
import { createCommentDispatch } from "@/store/productSlice";

function CommentCreate({ productId }) {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const [showModal, setShowModal] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);

  const validationSchema = Yup.object({
    comment: Yup.string()
      .min(5, "Yorum en az 5 karakter olmalı")
      .required("Yorum alanı boş bırakılamaz"),
    images: Yup.array().max(3, "En fazla 3 resim yükleyebilirsiniz."),
    rating: Yup.number()
      .min(1, "Lütfen bir puan verin")
      .required("Puan vermeniz gereklidir"),
  });

  const initialValues = {
    comment: "",
    images: [],
    rating: null,
    authorMail: session?.user?.email,
    productId: productId,
  };

  const handleImageChange = async (e, setFieldValue, values) => {
    const files = Array.from(e.target.files);

    if (files.length + values.images.length > 3) {
      setShowModal(true);
      return;
    }

    const resizedFiles = await Promise.all(
      files.map(
        (file) =>
          new Promise((resolve) => {
            Resizer.imageFileResizer(
              file,
              920,
              1840,
              "WEBP",
              100,
              0,
              (resizedFile) => {
                const newFile = new File([resizedFile], file.name, {
                  type: "image/webp",
                });
                resolve(newFile);
              },
              "file"
            );
          })
      )
    );

    const updatedFiles = [...values.images, ...resizedFiles];
    const updatedPreviews = [
      ...imagePreviews,
      ...resizedFiles.map((file) => URL.createObjectURL(file)),
    ];

    setImagePreviews(updatedPreviews);
    setFieldValue("images", updatedFiles);
  };

  const handleSubmit = (values, { resetForm, setFieldValue }) => {
    console.log(values);

    dispatch(createCommentDispatch(values));

    resetForm();
    setImagePreviews([]);
    setFieldValue("images", []);
  };

  if (!session) {
    return (
      <div className="flex justify-center items-center  w-full ">
        <motion.div
          className="rounded-lg p-4 w-full max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="  whitespace-nowrap md:text-xl font-semibold text-center text-gray-800 mb-6">
            Yorum yapabilmek için lütfen giriş yapın veya üye olun.
          </h2>

          <div className="flex flex-col gap-4">
            {/* Giriş Yap */}
            <motion.button
              onClick={() => dispatch(setLoginModal(true))}
              className="w-full flex items-center justify-center bg-primary text-white py-1.5 md:py-3 rounded-lg font-medium text-lg hover:bg-primary-dark transition duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaSignInAlt className="mr-3 text-xl" />
              Giriş Yap
            </motion.button>

            {/* Üye Ol */}
            <motion.button
              onClick={() => dispatch(setRegisterModal(true))}
              className="w-full flex items-center justify-center bg-secondary text-white py-1.5 md:py-3 rounded-lg font-medium text-lg hover:bg-secondary-dark transition duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaUserPlus className="mr-3 text-xl" />
              Üye Ol
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto px-6 py-2">
      <h2 className="text-2xl font-semibold mb-4 text-center">Yorum Yap</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm, setFieldValue }) =>
          handleSubmit(values, { resetForm, setFieldValue })
        }
      >
        {({ isSubmitting, setFieldValue, errors, touched, values }) => (
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

            {/* Puan Verme Alanı */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Puanınız:
              </label>
              <Field name="rating">
                {({ field, form }) => (
                  <div>
                    <Rating
                      value={field.value}
                      onChange={(e) => form.setFieldValue("rating", e.value)}
                      cancel={false}
                    />
                    {form.errors.rating && form.touched.rating && (
                      <div className="text-red-500 text-sm mt-2">
                        {form.errors.rating}
                      </div>
                    )}
                  </div>
                )}
              </Field>
            </div>

            {/* Resim Yükleme Alanı */}
            <div className="mb-4">
              <div className="flex space-x-4">
                {imagePreviews.map((preview, index) => (
                  <div
                    key={index}
                    className="relative w-24 h-24 border-2 border-dashed rounded-md overflow-hidden"
                  >
                    <Image
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      fill
                      className="rounded-md object-cover"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 text-white bg-red-500 p-0.5 rounded-lg"
                      onClick={() => {
                        const updatedPreviews = imagePreviews.filter(
                          (_, i) => i !== index
                        );
                        const updatedFiles = values.images.filter(
                          (_, i) => i !== index
                        );
                        setImagePreviews(updatedPreviews);
                        setFieldValue("images", updatedFiles);
                      }}
                    >
                      <IoClose />
                    </button>
                  </div>
                ))}

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
                      onChange={(e) =>
                        handleImageChange(e, setFieldValue, values)
                      }
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <ErrorMessage
                name="images"
                component="div"
                className="text-red-500 text-sm mt-2"
              />
              {errors.images && touched.images && (
                <span className="text-red-500 text-sm mt-2">
                  {errors.images}
                </span>
              )}
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-secondary text-white py-2 px-6 rounded-lg hover:opacity-85 transition duration-300"
                disabled={isSubmitting}
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
                onClick={() => setShowModal(false)}
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

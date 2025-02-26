"use client";

import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { useLocale } from "next-intl";

const validationSchema = yup.object().shape({
  title: yup.string().required("Blog ismi gereklidir."),
  category: yup.string().required("Kategori seçilmelidir."),
  tags: yup.array().min(1, "En az bir etiket ekleyin."),
  image: yup.mixed().required("Resim yüklemek zorunludur."),
  description: yup.string().required("Açıklama gereklidir."),
});

const AdminBlogCreate = () => {
  const formik = useFormik({
    initialValues: {
      title: "",
      category: "",
      image: null,
      description: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Blog Gönderildi:", values);
    },
  });

  const locale = useLocale();

  const categories = {
    tr: [
      { label: "Moda", value: "Moda" },
      { label: "Trendler", value: "Trendler" },
      { label: "Yeni Gelenler", value: "Yeni Gelenler" },
      { label: "Koleksiyonlar", value: "Koleksiyonlar" },
      { label: "Özel Günler", value: "Özel Günler" },
      { label: "İndirimler", value: "İndirimler" },
      { label: "Lüks Giyim", value: "Lüks Giyim" },
      { label: "Sokak Modası", value: "Sokak Modası" },
      { label: "Klasik Tarz", value: "Klasik Tarz" },
      { label: "Spor Şıklık", value: "Spor Şıklık" },
    ],
    en: [
      { label: "Fashion", value: "Fashion" },
      { label: "Trends", value: "Trends" },
      { label: "New Arrivals", value: "New Arrivals" },
      { label: "Collections", value: "Collections" },
      { label: "Special Occasions", value: "Special Occasions" },
      { label: "Discounts", value: "Discounts" },
      { label: "Luxury Wear", value: "Luxury Wear" },
      { label: "Street Style", value: "street-style" },
      { label: "Classic Style", value: "Classic Style" },
      { label: "Sporty Chic", value: "Sporty Chic" },
    ],
  };

  return (
    <div className="w-full min-h-[700px] flex justify-center items-center ">
      <div className="p-6 w-full max-w-3xl mx-auto bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Yeni Blog Oluştur</h2>
        <form
          onSubmit={formik.handleSubmit}
          className=" flex flex-col  space-y-4"
        >
          <div className="grid gap-1">
            <label className="block text-sm font-medium">Blog İsmi</label>
            <InputText
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              className="w-full"
            />
            {formik.errors.title && (
              <p className="text-red-500">{formik.errors.title}</p>
            )}
          </div>

          <div className="grid gap-1">
            <label className="block text-sm font-medium">Kategori</label>
            <Dropdown
              name="category"
              value={formik.values.category}
              options={categories[locale]}
              onChange={(e) => formik.setFieldValue("category", e.value)}
              className="w-full"
            />
            {formik.errors.category && (
              <p className="text-red-500">{formik.errors.category}</p>
            )}
          </div>

          <div className="grid gap-1">
            <label className="block text-sm font-medium">Resim Yükle</label>
            <FileUpload
              mode="basic"
              accept="image/*"
              maxFileSize={1000000}
              onSelect={(e) => formik.setFieldValue("image", e.files[0])}
            />
            {formik.errors.image && typeof formik.errors.image === "string" && (
              <p className="text-red-500">{formik.errors.image}</p>
            )}
          </div>

          <div className="grid gap-1">
            <label className="block text-sm font-medium">Açıklama</label>
            <InputTextarea
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              className="w-full"
              rows={4}
            />

            {formik.errors.description && (
              <p className="text-red-500">{formik.errors.description}</p>
            )}
          </div>

          <Button type="submit" label="Blogu Kaydet" className="w-full" />
        </form>
      </div>
    </div>
  );
};

export default AdminBlogCreate;

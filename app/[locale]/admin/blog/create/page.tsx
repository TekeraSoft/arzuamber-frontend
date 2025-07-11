"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { useLocale } from "next-intl";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { createBlogDispatch } from "@/store/adminSlice";
import TextEditor from "@/components/admin/Product/TextEditor/TextEditor";

const validationSchema = yup.object().shape({
  title: yup.string().required("Blog name required."),
  category: yup.string().required("Plase choose one category."),
  content: yup.string().required("Description required."),
});

const AdminBlogCreate = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [image, setImage] = useState(null);
  const formik = useFormik({
    initialValues: {
      title: "",
      category: "",
      content: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const formData = new FormData();
      formData.append(
        "values",
        new Blob([JSON.stringify(values)], { type: "application/json" })
      );
      formData.append(
        "image",
        new File([image], image.name, { type: image.type })
      );
      console.log(formData.get("values"))
      dispatch(createBlogDispatch(formData, resetForm,setImage));
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
      { label: "Kombinler", value: "Özel Kombinler" },
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
      { label: "Combines", value: "Combines" },
    ],
  };

  return (
    <div className="w-full min-h-[700px] flex justify-center items-center ">
      <div className="p-6 w-full max-w-3xl mx-auto bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Create New Blog</h2>
        <form
          onSubmit={formik.handleSubmit}
          className=" flex flex-col  space-y-4"
        >
          <div className="grid gap-1">
            <label className="block text-sm font-medium">Blog Title</label>
            <InputText
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              className="w-full"
            />
            {formik.errors.title && (
              <p className="text-red-500  text-sm">{formik.errors.title}</p>
            )}
          </div>

          <div className="grid gap-1">
            <label className="block text-sm font-medium">Blog Category</label>
            <Dropdown
              name="category"
              value={formik.values.category}
              options={categories[locale]}
              onChange={(e) => formik.setFieldValue("category", e.value)}
              className="w-full"
            />
            {formik.errors.category && (
              <p className="text-red-500 text-sm">{formik.errors.category}</p>
            )}
          </div>

          <div className="grid gap-1">
            <label className="block text-sm font-medium">Upload Image</label>
            <FileUpload
              mode="basic"
              accept="image/*"
              onSelect={(e) => setImage(e.files[0])}
            />
          </div>

          <div className="grid gap-1">
            <label className="block text-sm font-medium">Açıklama</label>
            <TextEditor
                content={formik.values.content}
                onChange={(value) => formik.setFieldValue("content", value)}
            />

            {formik.errors.content && (
              <p className="text-red-500  text-sm">{formik.errors.content}</p>
            )}
          </div>

          <Button type="submit" label="Blogu Kaydet" className="w-full" />
        </form>
      </div>
    </div>
  );
};

export default AdminBlogCreate;

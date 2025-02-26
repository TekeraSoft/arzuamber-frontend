"use client";

import { useFormik } from "formik";
import { OrderList } from "primereact/orderlist";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import React, {useEffect, useState} from "react";
import * as yup from "yup";
import { TiMinus } from "react-icons/ti";
import { useLocale } from "next-intl";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store/store";
import {createColorDispatch, deleteColorDispatch, getAllColorsDispatch} from "@/store/adminSlice";

function ProductColorsEditPage() {
    const dispatch = useDispatch<AppDispatch>();
    const {colors} = useSelector((state:RootState)=> state.admin)

  useEffect(()=> {
      dispatch(getAllColorsDispatch())
  },[])

  const local = useLocale();

  const colorValidationSchema = yup.object().shape({
    name: yup.string().required("You should enter color name.*"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: colorValidationSchema,
    onSubmit: (values, { resetForm }) => {
        dispatch(createColorDispatch({name: values.name, lang: local}))
      resetForm();
    },
  });

  return (
    <div className="flex flex-col justify-center items-center mt-12 w-full h-full">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col items-center gap-4 w-full max-w-md"
      >
        <p className="text-sm text-red-600">
          {local == "tr"
            ? "TR için renk girişi yapıyorsunuzz"
            : "EN için renk girişi yapıyorsunuz"}
        </p>

        <div className="w-full">
          <InputText
            type="text"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            className="w-full"
            placeholder="Enter color name"
          />
          {formik.errors.name && formik.touched.name && (
            <small className="p-error">{formik.errors.name}</small>
          )}
        </div>
        <Button
          type="button"
          label="Add"
          onClick={()=> formik.handleSubmit()}
          icon="pi pi-plus"
          className="w-full"
        />
      </form>

      <OrderList
        className="mt-6 w-full max-w-md"
        value={colors}
        itemTemplate={(color) => (
          <div className="flex justify-between items-center p-2">
            <span>{color.name}</span>
            <TiMinus
              size={20}
              onClick={() => dispatch(deleteColorDispatch(color.id))}
              className="cursor-pointer text-red-500 ml-4"
            />
          </div>
        )}
        header="Existing Colors"
      />
    </div>
  );
}

export default ProductColorsEditPage;

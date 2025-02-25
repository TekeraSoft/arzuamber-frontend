"use client";

import { useFormik } from "formik";
import { OrderList } from "primereact/orderlist";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import React, { useState } from "react";
import * as yup from "yup";
import { TiMinus } from "react-icons/ti";
import { useLocale } from "next-intl";

function ProductColorsEditPage() {
  const [localColors, setLocalColors] = useState([]);

  const local = useLocale();

  const colorValidationSchema = yup.object().shape({
    color: yup.string().required("You should enter color name.*"),
  });

  const formik = useFormik({
    initialValues: {
      color: "",
    },
    validationSchema: colorValidationSchema,
    onSubmit: (values, { resetForm }) => {
      const lowerCaseColor = values.color.toLowerCase();

      if (!localColors.includes(lowerCaseColor)) {
        setLocalColors([...localColors, lowerCaseColor]);
      }

      resetForm();
    },
  });

  const handleRemoveColor = (colorToRemove) => {
    setLocalColors(localColors.filter((color) => color !== colorToRemove));
  };

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
            name="color"
            onChange={formik.handleChange}
            value={formik.values.color}
            className="w-full"
            placeholder="Enter color name"
          />
          {formik.errors.color && formik.touched.color && (
            <small className="p-error">{formik.errors.color}</small>
          )}
        </div>
        <Button
          type="submit"
          label="Add"
          icon="pi pi-plus"
          className="w-full"
        />
      </form>

      <OrderList
        className="mt-6 w-full max-w-md"
        value={localColors}
        onChange={(e) => setLocalColors(e.value)}
        itemTemplate={(color) => (
          <div className="flex justify-between items-center p-2 border-b">
            <span>{color}</span>
            <TiMinus
              size={20}
              onClick={() => handleRemoveColor(color)}
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

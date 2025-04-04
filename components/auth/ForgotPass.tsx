"use client";

import { setLoginModal, setForgotPassModal } from "@/store/modalsSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { MdCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "use-intl";
import Button from "../general/Button";
import { useForgotPassValidationSchema } from "@/error/forgotPassSchema";
import axios from "axios";
import { toast } from "react-toastify";

function ForgotPasswordModal() {
  const dispatch = useDispatch<AppDispatch>();
  const [loadin, setLoadin] = useState(false);
  const t = useTranslations();
  const [recaptcha, setRecaptcha] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      forgotEmail: "",
    },
    validationSchema: useForgotPassValidationSchema(),
    onSubmit: async (values) => {
      try {
        setLoadin(true);
        const response = await axios
          .get(
            `${process.env.NEXT_PUBLIC_BACKEND_API}/user/forgot-password-mail`,
            {
              params: { email: values.forgotEmail },
            },
          )
          .then((res) => {
            dispatch(setForgotPassModal(false));
            toast.success(
              "Yeni şifrenizi belirlemek için mail adresinizi kontrol ediniz",
            );
            setLoadin(false);
          });
      } catch (error) {
        setLoadin(false);
      }
    },
  });

  // Butonun devre dışı kalma durumunu kontrol et
  const isButtonDisabled = recaptcha == null ? true : false;

  const handleChangeModal = () => {
    dispatch(setForgotPassModal(false));
    dispatch(setLoginModal(true));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold my-5 text-center">
        {t("forgotPassForm.title")}
      </h2>

      <form
        onSubmit={formik.handleSubmit}
        className=" w-full flex flex-col gap-4"
      >
        <button
          type={"button"}
          color="primary"
          onClick={() => dispatch(setForgotPassModal(false))}
          className="absolute top-3 right-4 md:top-6 md:right-6 text-primary hover:scale-95 outline-secondary"
        >
          <MdCancel size={28} />
        </button>

        <span className="w-full  flex flex-col">
          <label className={"font-medium"}>{t("loginForm.email")}</label>

          <InputText
            id="forgotEmail"
            value={formik.values.forgotEmail}
            onChange={formik.handleChange}
            className={`w-full h-8 rounded border px-2 outline-secondary ring-secondary ${
              formik.touched.forgotEmail && formik.errors.forgotEmail
                ? "border-red-500"
                : ""
            }`}
          />

          {formik.touched.forgotEmail && formik.errors.forgotEmail && (
            <small className="text-xs text-red-600 mt-1  ">
              {formik.errors.forgotEmail}
            </small>
          )}

          <p className="text-start text-xs text-primary font-bold mt-1">
            ***{t("forgotPassForm.description")}
          </p>
        </span>

        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
          onChange={setRecaptcha}
        />

        <div className="flex flex-col justify-center items-center w-full ">
          <Button
            loading={loadin}
            text={t("forgotPassForm.submit")}
            type="submit"
            color="primary"
            animation
            size="center"
            className={` ${
              isButtonDisabled
                ? "bg-secondary  cursor-not-allowed"
                : "bg-primary "
            }   text-mywhite py-2 rounded-lg transition duration-200  `}
            disabled={isButtonDisabled}
          />
        </div>
      </form>

      {/* login , register modal  */}
      <p
        className="w-full  text-center hover:underline cursor-pointer text-primary font-semibold mt-4"
        onClick={() => handleChangeModal()}
      >
        {t("forgotPassForm.login")}
      </p>
    </div>
  );
}

export default ForgotPasswordModal;

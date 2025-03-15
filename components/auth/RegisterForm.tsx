"use client";

import { registerUserDispatch } from "@/store/authSlice";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import {
  closeRegisterModal,
  openDynamicModal,
  openLoginModal,
} from "@/store/modalsSlice";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { useTranslations } from "next-intl";
import { MdCancel } from "react-icons/md";
import { useRegisterValidationSchema } from "@/error/registerSchema";
import DynamicModal from "../utils/DynamicModal";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";
function RegisterForm() {
  const dispatch = useDispatch<AppDispatch>();
  const t = useTranslations();
  const router = useRouter();

  const handleChangeModal = () => {
    dispatch(closeRegisterModal());
    dispatch(openLoginModal());
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema: useRegisterValidationSchema(),
    onSubmit: (values, { resetForm }) => {
      dispatch(
        registerUserDispatch(values, resetForm, handleChangeModal, router)
      );
    },
  });

  const handleOpenModal = (title: string, content: string) => {
    dispatch(openDynamicModal({ title, content }));
  };

  const [recaptcha, setRecaptcha] = useState();
  const [checkboxes, setCheckboxes] = useState({
    KVKK: false,
    ElectronicMessage: false,
    MembershipAgreement: false,
  });

  // Checkbox'ların durumunu değiştiren fonksiyon
  const handleCheckboxChange = (name) => {
    setCheckboxes((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  // Butonun devre dışı kalma durumunu kontrol et
  const isButtonDisabled = !checkboxes.KVKK || !checkboxes.MembershipAgreement;

  return (
    <div>
      <button
        type={"button"}
        color="primary"
        onClick={() => dispatch(closeRegisterModal())}
        className="absolute top-3 right-4 md:top-6 md:right-6 text-primary hover:scale-95"
      >
        <MdCancel size={28} />
      </button>

      <h2 className="text-2xl font-semibold my-2 text-center">
        {t("registerForm.createAccount")}
      </h2>

      <form
        onSubmit={formik.handleSubmit}
        className={"flex flex-col gap-2 w-full"}
      >
        <div className="flex gap-x-3 w-full justify-start items-center">
          <div className="w-full flex gap-y-1 flex-col">
            <div className="flex  items-center justify-between gap-1">
              <label className={"font-medium text-sm"}>
                {t("registerForm.firstName")}
              </label>
              {formik.touched.name && formik.errors.name && (
                <small className="text-[10px] text-red-600 ">
                  {formik.errors.name}
                </small>
              )}{" "}
            </div>
            <InputText
              id="name"
              value={formik.values.name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className={`w-full h-10 rounded border px-2 outline-secondary ring-secondary ${
                formik.touched.name && formik.errors.name
                  ? "border-red-500"
                  : ""
              }`}
            />
          </div>
          <div className="w-full relative gap-y-1 flex flex-col">
            <div className="flex  items-center justify-between gap-1">
              <label className={"font-medium text-sm"}>
                {t("registerForm.lastName")}
              </label>
              {formik.touched.surname && formik.errors.surname && (
                <small className="text-[10px] text-red-600 ">
                  {formik.errors.surname}
                </small>
              )}
            </div>
            <InputText
              id="surname"
              value={formik.values.surname}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className={`w-full h-10 rounded border px-2 outline-secondary ring-secondary ${
                formik.touched.surname && formik.errors.surname
                  ? "border-red-500"
                  : ""
              }`}
            />
          </div>
        </div>
        <div className="w-full relative gap-y-1 flex flex-col">
          <label className={"font-medium text-sm"}>
            {t("registerForm.email")}
          </label>

          <InputText
            id="email"
            onBlur={formik.handleBlur}
            value={formik.values.email}
            onChange={formik.handleChange}
            className={`w-full h-10 !rounded !border px-2 !outline-secondary !ring-secondary ${
              formik.touched.email && formik.errors.email
                ? "border-red-500"
                : ""
            }`}
          />
          {formik.touched.email && formik.errors.email && (
            <small className="text-[10px] text-red-600  ">
              {formik.errors.email}
            </small>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex  gap-2 justify-between items-center">
            <div className="w-full relative gap-y-1 flex flex-col">
              <label className={"font-medium text-sm"}>
                {t("registerForm.password")}
              </label>

              <InputText
                id="password"
                type={"password"}
                value={formik.values.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className={`w-full h-10 rounded border px-2 outline-secondary ring-secondary ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : ""
                }`}
              />

              {formik.touched.password && formik.errors.password && (
                <small className="text-[10px] text-red-600 ">
                  {formik.errors.password}
                </small>
              )}
            </div>

            <div className="w-full relative gap-y-1 flex flex-col">
              <label className={"font-medium text-sm"}>
                {t("registerForm.rePassword")}
              </label>

              <InputText
                id="rePassword"
                type={"password"}
                onBlur={formik.handleBlur}
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                className={`w-full h-10 rounded border px-2 outline-secondary ring-secondary ${
                  formik.touched.rePassword && formik.errors.rePassword
                    ? "border-red-500"
                    : ""
                }`}
              />
              {formik.touched.rePassword && formik.errors.rePassword && (
                <small className="text-[10px] text-red-600  ">
                  {formik.errors.rePassword}
                </small>
              )}
            </div>
          </div>
          <div className="text-[10px] font-bold text-primary">
            *{t("registerForm.errors.passwordSpecials")}*
          </div>
        </div>

        <div className="w-full flex flex-col items-center justify-center gap-2 mt-1">
          <div className="w-full flex items-center justify-start gap-2">
            <input
              type="checkbox"
              checked={checkboxes.KVKK}
              onChange={() => handleCheckboxChange("KVKK")}
              className="accent-primary cursor-pointer"
            />
            <div
              className="text-xs font-semibold underline cursor-pointer"
              onClick={() =>
                handleOpenModal(
                  t("registerForm.registerFormCheckBox.KVKK.title"),
                  t("registerForm.registerFormCheckBox.KVKK.content")
                )
              }
            >
              <span className="text-red-600">*</span>{" "}
              {t("registerForm.registerFormCheckBox.KVKK.title")}{" "}
            </div>
          </div>

          <div className="w-full flex items-center justify-start gap-2">
            <input
              type="checkbox"
              checked={checkboxes.MembershipAgreement}
              onChange={() => handleCheckboxChange("MembershipAgreement")}
              className="accent-primary cursor-pointer"
            />
            <div
              className="text-xs font-semibold underline cursor-pointer"
              onClick={() =>
                handleOpenModal(
                  t(
                    "registerForm.registerFormCheckBox.MembershipAgreement.title"
                  ),
                  t(
                    "registerForm.registerFormCheckBox.MembershipAgreement.content"
                  )
                )
              }
            >
              <span className="text-red-600">*</span>{" "}
              {t("registerForm.registerFormCheckBox.MembershipAgreement.title")}
            </div>
          </div>

          <div className="w-full flex items-center justify-start gap-2">
            <input
              type="checkbox"
              checked={checkboxes.ElectronicMessage}
              onChange={() => handleCheckboxChange("ElectronicMessage")}
              className="accent-primary cursor-pointer"
            />
            <div
              className="text-xs font-semibold underline cursor-pointer"
              onClick={() =>
                handleOpenModal(
                  t(
                    "registerForm.registerFormCheckBox.ElectronicMessage.title"
                  ),
                  t(
                    "registerForm.registerFormCheckBox.ElectronicMessage.content"
                  )
                )
              }
            >
              {t("registerForm.registerFormCheckBox.ElectronicMessage.title")}
            </div>
          </div>

          <DynamicModal />
        </div>



        {/*<ReCAPTCHA*/}
        {/*    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}*/}
        {/*    onChange={setRecaptcha}*/}
        {/*/>*/}

        {isButtonDisabled && (
          <div className="text-xs text-red-600">
            {t("registerForm.acceptAgreementError")}
          </div>
        )}

        <div className="flex flex-col space-y-2 w-full justify-center items-center ">
          <button
            disabled={isButtonDisabled}
            type="submit"
            className={`  w-full transition duration-300 bg-primary  text-mywhite py-2 rounded-lg mt-2 ${
              isButtonDisabled
                ? "cursor-not-allowed bg-primary opacity-45"
                : " hover:bg-primaryDark"
            }   `}
          >
            {t("registerForm.registerButton")}
          </button>
        </div>
      </form>
      <p
        className="w-full  text-center hover:underline cursor-pointer text-primary font-semibold mt-4"
        onClick={() => handleChangeModal()}
      >
        {t("registerForm.registerLink")}
      </p>
    </div>
  );
}

export default RegisterForm;

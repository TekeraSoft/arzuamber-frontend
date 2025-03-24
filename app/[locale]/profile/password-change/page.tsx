"use client";

import { useTranslations } from "next-intl";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useUserPassChangeSchema } from "@/error/userPassChangeSchema";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/store/store";
import {changePasswordDispatch} from "@/store/userSlice";

function PasswordChangePage() {
  const t = useTranslations();
  const dispatch = useDispatch<AppDispatch>();
  const {data:session} = useSession();
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      changedPassword: "",
      confirmPassword: "",
      currentPassword: "",
      email: session?.user?.email,
      token: session?.accessToken
    },
    validationSchema: useUserPassChangeSchema(),
    onSubmit: async (values,{resetForm}) => {
       dispatch(changePasswordDispatch({
         oldPassword: values.currentPassword,
         password: values.changedPassword,
         email: values.email,
         token: values.token,
       },resetForm))
    },
  });

  return (
    <div className="flex flex-col w-full h-full container max-w-2xl ">
      <h1 className="uppercase text-center md:text-xl">
        {t("profile.passchange")}
      </h1>
      <form onSubmit={formik.handleSubmit} className="w-full mx-auto space-y-3">
        {/* old Şifre alanı */}
        <div className="w-full relative gap-y-1 flex flex-col w-f">
          <label className={"font-medium text-sm"}>
            {t("registerForm.currentPassword")}
          </label>
          <div className="relative w-full">
            <InputText
              id="currentPassword"
              type={showCurrentPassword ? "text" : "password"}
              value={formik.values.currentPassword}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className={`w-full h-10 rounded border px-2 pr-10 outline-secondary ring-secondary ${
                formik.touched.currentPassword && formik.errors.currentPassword
                  ? "border-red-500"
                  : ""
              }`}
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-900"
            >
              {showCurrentPassword ? (
                <FaEyeSlash size={18} />
              ) : (
                <FaEye size={18} />
              )}
            </button>
          </div>
        </div>
        {/*  new Şifre alanı */}
        <div className="w-full relative gap-y-1 flex flex-col w-f">
          <label className={"font-medium text-sm"}>
            {t("registerForm.newPassword")}
          </label>
          <div className="relative w-full">
            <InputText
              id="changedPassword"
              type={showPassword ? "text" : "password"}
              value={formik.values.changedPassword}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className={`w-full h-10 rounded border px-2 pr-10 outline-secondary ring-secondary ${
                formik.touched.changedPassword && formik.errors.changedPassword
                  ? "border-red-500"
                  : ""
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-900"
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>
          {formik.touched.changedPassword && formik.errors.changedPassword && (
            <small className="text-[10px] text-red-600 ">
              {formik.errors.changedPassword}
            </small>
          )}
        </div>

        {/* Şifre Tekrarı (Sadece doğrulama için) */}
        <div className="w-full relative gap-y-1 flex flex-col">
          <label className={"font-medium text-sm"}>
            {t("registerForm.newRePassword")}
          </label>
          <div className="relative w-full">
            <InputText
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formik.values.confirmPassword}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className={`w-full h-10 rounded border px-2 pr-10 outline-secondary ring-secondary ${
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? "border-red-500"
                  : ""
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-900"
            >
              {showConfirmPassword ? (
                <FaEyeSlash size={18} />
              ) : (
                <FaEye size={18} />
              )}
            </button>
          </div>
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <small className="text-[10px] text-red-600 ">
              {formik.errors.confirmPassword}
            </small>
          )}
        </div>

        {/* Gönderme Butonu */}
        <button
          type="submit"
          disabled={!formik.isValid || formik.isSubmitting}
          className={`mt-4 w-full bg-primary text-white py-2 rounded hover:opacity-80 transition duration-300 ${
            (!formik.isValid || formik.isSubmitting) &&
            "opacity-50 cursor-not-allowed"
          }`}
        >
          {formik.isSubmitting
            ? t("profile.submitting")
            : t("profile.passchange")}
        </button>
      </form>
    </div>
  );
}

export default PasswordChangePage;

"use client";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useFormik } from "formik";
import { useNewPassSchema } from "@/error/newPassSchema";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { forgotPasswordDispatch } from "@/store/userSlice";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ForgotPasswordPage = () => {
  const t = useTranslations();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();
  const mail = searchParams.get("mail");
  const token = searchParams.get("_cpjwt");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: useNewPassSchema(),
    onSubmit: async (values) => {
      dispatch(forgotPasswordDispatch(mail, token, values.newPassword, router));
    },
  });

  return (
    <div className="flex items-center justify-center min-h-[80vh] ">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold text-center mb-4">
          {t("forgotPass.title")}
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">
              {t("forgotPass.newPassLabel")}
            </label>
            <div className="relative">
              <InputText
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                className="w-full p-inputtext"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl"
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {formik.touched.newPassword && formik.errors.newPassword ? (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.newPassword}
              </p>
            ) : null}
          </div>

          <div>
            <label className="block text-sm font-medium">
              {t("forgotPass.newPassReLabel")}
            </label>
            <div className="relative">
              <InputText
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                className="w-full p-inputtext"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.confirmPassword}
              </p>
            ) : null}
          </div>

          <Button
            type="submit"
            label={t("forgotPass.passUpdateBtn")}
            className="w-full !bg-secondary text-white !border-none  hover:bg-opacity-85"
          />
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

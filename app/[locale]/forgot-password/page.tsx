"use client";

import axios from "axios";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useFormik } from "formik";
import { useNewPassSchema } from "@/error/newPassSchema";
import { useTranslations } from "next-intl";
import {useSearchParams} from "next/navigation";

const ForgotPasswordPage = () => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const mail = searchParams.get("mail")
  const token = searchParams.get("token")

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: useNewPassSchema(),
    onSubmit: async (values) => {
      try {
        const response = await axios.post("/api/reset-password", {
          password: values.newPassword,
        });
        console.log(t("forgotPass.passUpdate"), response.data);
      } catch (error) {
        console.error(t("forgotPass.passNotUpdate"), error);
      }
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
            <InputText
              type="password"
              id="newPassword"
              name="newPassword"
              className="w-full p-inputtext"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
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
            <InputText
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full p-inputtext"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
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

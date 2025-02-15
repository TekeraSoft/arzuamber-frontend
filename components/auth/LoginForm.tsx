"use client";

import Button from "@/components/general/Button";
import { closeLoginModal, openRegisterModal } from "@/store/modalsSlice";
import { AppDispatch, RootState } from "@/store/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { signIn } from "next-auth/react";
import { MdCancel } from "react-icons/md";
import { useTranslations } from "next-intl";
import { useLoginValidationSchema } from "@/error/loginSchema";

function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const t = useTranslations();
  const { isLoginModalOpen } = useSelector((state: RootState) => state.modals);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: useLoginValidationSchema(),
    onSubmit: (values) => {
      signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      })
        .then((res) => {
          if (res.status === 200) {
            toast.success("Login successfully");
            dispatch(closeLoginModal());
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    },
  });

  const handleChangeModal = () => {
    dispatch(closeLoginModal());
    dispatch(openRegisterModal());
  };

  return (
    <div
      onClick={(e) => {
        // Form dışına tıklanırsa kapanmasını sağlıyoruz
        if (e.target === e.currentTarget) {
          dispatch(closeLoginModal());
        }
      }}
      className={`${
        isLoginModalOpen ? "fixed" : "hidden"
      } px-5 md:px-0 inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 cursor `}
    >
      <div
        className={`w-full md:w-1/4    bg-white rounded-2xl  px-6 py-5 shadow-lg relative transform transition-all duration-300`}
      >
        <h2 className="text-3xl font-semibold my-5 text-center">
          {t("loginForm.welcomeBack")}
        </h2>

        <form
          onSubmit={formik.handleSubmit}
          className=" w-full flex flex-col gap-4"
        >
          <button
            type={"button"}
            color="primary"
            onClick={() => dispatch(closeLoginModal())}
            className="absolute top-6 right-6 text-primary hover:scale-95"
          >
            <MdCancel size={28} />
          </button>

          <span className="w-full  flex flex-col">
            <label className={"font-medium"}>{t("loginForm.email")}</label>
            <InputText
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="w-full h-10 rounded border px-2"
            />
            {formik.touched.email && formik.errors.email && (
              <small className="text-xs text-red-600 mt-1 ">
                {formik.errors.email}
              </small>
            )}
          </span>

          <span className="w-full flex flex-col">
            <label className={"font-medium"}>{t("loginForm.password")}</label>
            <InputText
              id="password"
              value={formik.values.password}
              type={"password"}
              onChange={formik.handleChange}
              className="w-full  h-10 rounded border px-2"
            />
            {formik.touched.password && formik.errors.password && (
              <small className="text-xs text-red-600 mt-1">
                {formik.errors.password}
              </small>
            )}
          </span>

          <Button
            text={t("loginForm.loginButton")}
            type="submit"
            color="primary"
            animation
            size="large"
            className="w-full bg-primary hover:bg-primaryDark text-mywhite py-2 rounded-lg transition duration-200 "
          />
          {/* <Button
            size="small"
            outline
            icon={IoLogoGoogleplus}
            iconSize={23}
            className="w-full bg-transparent hover:bg-primaryLight border border-primary text-primary hover:text-mywhite rounded-lg py-3 transition duration-200"
          /> */}
        </form>

        {/* login , register modal  */}
        <p
          className="w-full  text-center hover:underline cursor-pointer text-primary font-semibold mt-4"
          onClick={() => handleChangeModal()}
        >
          {t("loginForm.noAccount")}
        </p>
      </div>
    </div>
  );
}

export default LoginForm;

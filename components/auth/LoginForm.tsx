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
      }   px-5 md:px-0 inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50   `}
    >
      <div
        className={`w-full md:w-2/4  lg:w-4/12 xl:w-3/12 h-auto   bg-white rounded-2xl  px-6 py-5 shadow-lg relative transform transition-all duration-300 animate__animated  animate__fadeIn `}
      >
        <h2 className="text-2xl font-semibold my-5 text-center">
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
            className="absolute top-3 right-4 md:top-6 md:right-6 text-primary hover:scale-95 outline-secondary"
          >
            <MdCancel size={28} />
          </button>

          <span className="w-full  flex flex-col">
            <label className={"font-medium"}>{t("loginForm.email")}</label>
            <InputText
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className={`w-full h-8 rounded border px-2 outline-secondary ring-secondary ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.email && formik.errors.email && (
              <small className="text-xs text-red-600 mt-1  ">
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
              className={`w-full h-8 rounded border px-2 outline-secondary ring-secondary ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.password && formik.errors.password && (
              <small className="text-xs text-red-600 mt-1">
                {formik.errors.password}
              </small>
            )}
          </span>

          <div className="flex flex-col justify-center items-center w-full ">
            <Button
              text={t("loginForm.loginButton")}
              type="submit"
              color="primary"
              animation
              size="center"
              className=" bg-primary hover:bg-primaryDark text-mywhite py-2 rounded-lg transition duration-200 "
            />
            {/* <Button
            size="small"
            outline
            icon={IoLogoGoogleplus}
            iconSize={23}
            className="w-full bg-transparent hover:bg-primaryLight border border-primary text-primary hover:text-mywhite rounded-lg py-3 transition duration-200"
          /> */}
          </div>
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

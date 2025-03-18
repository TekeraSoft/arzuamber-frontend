"use client";

import Button from "@/components/general/Button";
import { closeLoginModal, openRegisterModal } from "@/store/modalsSlice";
import { AppDispatch } from "@/store/store";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { signIn } from "next-auth/react";
import { MdCancel } from "react-icons/md";
import { useTranslations } from "next-intl";
import { useLoginValidationSchema } from "@/error/loginSchema";
import { Message } from "primereact/message";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha";

function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [errorState, setErrorState] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [recaptcha, setRecaptcha] = useState();
  const t = useTranslations();
  const router = useRouter();

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
            router.push("/");
          } else {
            if (res.status === 401) {
              setErrorState("Email or password is incorrect");
            }
          }
        })
        .catch((err) => {
          setErrorState(err.response.data.message);
        });
    },
  });

  const handleChangeModal = () => {
    dispatch(closeLoginModal());
    dispatch(openRegisterModal());
  };

  // Butonun devre dışı kalma durumunu kontrol et
  const isButtonDisabled = recaptcha == null ? true : false;

  return (
    <div>
      <h2 className="text-2xl font-semibold my-5 text-center">
        {t("loginForm.welcomeBack")}
      </h2>
      {errorState && (
        <span className={"relative"}>
          <Message
            severity="error"
            text={errorState}
            className={"w-full my-2"}
          />
          <MdCancel
            onClick={() => setErrorState("")}
            className={"text-red-600 absolute right-0 top-0 cursor-pointer"}
            size={24}
          />
        </span>
      )}
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
          <div className="relative w-full">
            <InputText
              id="password"
              type={showPassword ? "text" : "password"}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full h-8 rounded border px-2 pr-10 outline-secondary ring-secondary ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : ""
              }`}
            />
            {/* Şifreyi Göster/Gizle Butonu */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-900"
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>

          {formik.touched.password && formik.errors.password && (
            <small className="text-xs text-red-600 mt-1">
              {formik.errors.password}
            </small>
          )}
        </span>

        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
          onChange={setRecaptcha}
        />

        <div className="flex flex-col justify-center items-center w-full ">
          <Button
            text={t("loginForm.loginButton")}
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
  );
}

export default LoginForm;

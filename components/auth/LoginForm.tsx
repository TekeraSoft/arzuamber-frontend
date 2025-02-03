"use client";

import Button from "@/components/general/Button";
import Heading from "@/components/general/Heading";
import Input from "@/components/general/Input";
import { closeLoginModal, openRegisterModal } from "@/store/modalsSlice";
import { AppDispatch, RootState } from "@/store/store";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IoIosCloseCircleOutline, IoLogoGoogleplus } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
// import { useTranslations } from "next-intl";

function LoginForm() {
  // const t = useTranslations();
  const dispatch = useDispatch<AppDispatch>();

  const isLoginModalopen = useSelector(
    (state: RootState) => state.modals.isLoginModalOpen
  );

  const handleClose = () => dispatch(closeLoginModal());
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    try {
      const formData = { ...data };
      console.log("Form Data", formData);

      toast.success("Login Successfully!");
      // toast.success(t("loginForm.loginSuccess"));
    } catch (error) {
      console.error(error);
      toast.error("Login Error!");
      // toast.error(t("loginForm.loginError"));
    }
  };

  //! id = loginEmail and loginPassword  ??

  const handleChangeModal = () => {
    dispatch(closeLoginModal());
    dispatch(openRegisterModal());
  };

  return (
    <div
      onClick={(e) => {
        // Form dışına tıklanırsa kapanmasını sağlıyoruz
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
      className={`${
        isLoginModalopen ? "fixed" : "hidden"
      } inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50`}
    >
      <div
        className={`w-full md:w-1/4 h-auto bg-white rounded-2xl p-10 shadow-lg space-y-3 relative transform transition-all duration-300`}
      >
        <Heading
          center
          text="Welcome Back!"
          // text={t("loginForm.welcomeBack")}
          font="bold"
          textSize="2xl"
          color="black"
        />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 w-full">
          <Button
            size={"icon"}
            icon={IoIosCloseCircleOutline}
            color="primary"
            onClick={handleClose}
            className="absolute top-4 right-4 w-12 "
            animation
          />

          <Input
            id="loginEmail"
            placeholder="Email"
            // placeholder={t("loginForm.email")}
            type="email"
            required
            errors={errors}
            register={register}
          />

          <Input
            id="loginPassword"
            placeholder="Password"
            // placeholder={t("loginForm.password")}
            type="password"
            required
            errors={errors}
            register={register}
          />

          <Button
            text="Login"
            // text={t("loginForm.loginButton")}
            type="submit"
            color="primary"
            animation
            size="small"
            className="w-full bg-primary hover:bg-primaryDark text-mywhite py-3 rounded-lg transition duration-200 "
          />
          <Button
            size="small"
            outline
            icon={IoLogoGoogleplus}
            iconSize={23}
            className="w-full bg-transparent hover:bg-primaryLight border border-primary text-primary hover:text-mywhite rounded-lg py-3 transition duration-200"
          />
        </form>

        {/* login , register modal  */}
        <p
          className="w-full  text-center hover:underline cursor-pointer text-primary font-semibold"
          onClick={handleChangeModal}
        >
          Don’t have an account? Sign up
          {/* {t("loginForm.noAccount")} */}
        </p>
      </div>
    </div>
  );
}

export default LoginForm;

"use client";

import Button from "@/components/general/Button";
import Heading from "@/components/general/Heading";
import Input from "@/components/general/Input";
import { closeLoginModal } from "@/store/modalsSlice";
import { AppDispatch, RootState } from "@/store/store";
import Link from "next/link";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// import { useTranslations } from "next-intl";
import { IoIosCloseCircleOutline, IoLogoGoogleplus } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

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
        className={`w-full md:w-1/3 h-auto bg-white rounded-2xl p-8 shadow-lg space-y-6 relative transform transition-all duration-300`}
      >
        <Heading
          center
          text="Welcome Back!"
          // text={t("loginForm.welcomeBack")}
          font="bold"
          textSize="2xl"
          color="black"
        />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Button
            size={"icon"}
            icon={IoIosCloseCircleOutline}
            color="primary"
            onClick={handleClose}
            iconSize={25}
            className="absolute top-4 right-4 w-12 "
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

          <div className="flex flex-col space-y-3">
            <Button
              text="Login"
              // text={t("loginForm.loginButton")}
              type="submit"
              color="primary"
              animation
              size="small"
              className="w-full bg-primary hover:bg-primaryDark text-mywhite py-3 rounded-lg transition duration-200"
            />
            <Button
              size="small"
              outline
              icon={IoLogoGoogleplus}
              iconSize={23}
              className="w-full bg-transparent hover:bg-primaryLight border border-primary text-primary hover:text-mywhite rounded-lg py-3 transition duration-200"
            />
          </div>
        </form>

        <div className="text-center mt-4">
          <Link
            href={`/register`}
            className="text-md text-primary font-semibold hover:underline"
          >
            {/* {t("loginForm.noAccount")} */}
            Don’t have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;

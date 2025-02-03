"use client";

import Button from "@/components/general/Button";
import Heading from "@/components/general/Heading";
import Input from "@/components/general/Input";
import { registerUserDispatch } from "@/store/authSlice";
import { AppDispatch, RootState } from "@/store/store";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IoLogoGoogleplus } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { closeRegisterModal, openLoginModal } from "@/store/modalsSlice";
// import { useTranslations } from "next-intl";

function RegisterForm() {
  const dispatch = useDispatch<AppDispatch>();
  // const t = useTranslations();

  const isRegisterModalOpen = useSelector(
    (state: RootState) => state.modals.isRegisterModalOpen
  );

  const handleClose = () => dispatch(closeRegisterModal());

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);

    dispatch(registerUserDispatch(data));
  };

  const handleChangeModal = () => {
    dispatch(closeRegisterModal());
    dispatch(openLoginModal());
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
        isRegisterModalOpen ? "fixed" : "hidden"
      } inset-0  bg-black bg-opacity-50 flex justify-center items-center z-50`}
    >
      <div
        className={`w-1/4 h-auto flex flex-col justify-center items-center bg-mywhite rounded-xl p-6 shadow-xl space-y-4 relative`}
      >
        {/* Close Button - Positioned to top-right */}
        <Button
          size={"icon"}
          icon={IoIosCloseCircleOutline}
          color="primary"
          onClick={handleClose}
          iconSize={25}
          className="absolute top-4 right-4 w-12 "
          animation
        />

        <Heading
          center
          text="Create an Account"
          // placeholder={t("registerForm.createAccount")}
          font="bold"
          textSize="2xl"
          color="black"
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-3 w-full justify-start items-center">
            <Input
              id="firstName"
              placeholder="First Name"
              // placeholder={t("registerForm.firstName")}
              type="text"
              required
              errors={errors}
              register={register}
            />
            <Input
              id="lastName"
              placeholder="Last Name"
              // placeholder={t("registerForm.lastName")}
              type="text"
              required
              errors={errors}
              register={register}
            />
          </div>
          <Input
            id="email"
            placeholder="Email"
            // placeholder={t("registerForm.email")}
            type="email"
            required
            errors={errors}
            register={register}
          />
          <Input
            id="password"
            placeholder="Password"
            // placeholder={t("registerForm.password")}

            type="password"
            required
            errors={errors}
            register={register}
          />

          <div className="flex flex-col space-y-3">
            <Button
              text="Register"
              // placeholder={t("registerForm.registerButton")}
              type="submit"
              animation
              size="large"
              color="primary"
            />
            <Button
              size="small"
              outline
              icon={IoLogoGoogleplus}
              iconSize={23}
              className="w-full bg-transparent hover:bg-primaryLight border border-primary text-primary hover:text-mywhite rounded-lg py-2"
            />
          </div>
        </form>

        {/* login , register modal  */}
        <p
          className="w-full  text-center hover:underline cursor-pointer text-primary font-semibold"
          onClick={handleChangeModal}
        >
          Already have an account? Login
          {/* {t("registerForm.loginLink")} */}
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;

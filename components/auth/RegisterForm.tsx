"use client";

import Button from "@/components/general/Button";
import { registerUserDispatch } from "@/store/authSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { closeRegisterModal, openLoginModal } from "@/store/modalsSlice";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { useTranslations } from "next-intl";
import { MdCancel } from "react-icons/md";
import { useRegisterValidationSchema } from "@/error/registerSchema";

function RegisterForm() {
  const dispatch = useDispatch<AppDispatch>();
  const t = useTranslations();
  const { isRegisterModalOpen } = useSelector(
    (state: RootState) => state.modals
  );

  const handleClose = () => {
    dispatch(closeRegisterModal());
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
      dispatch(registerUserDispatch(values, resetForm));
    },
  });

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
      } px-4 md:px-0 inset-0  bg-black bg-opacity-50 flex justify-center items-center z-50   `}
    >
      <div
        className={`w-full md:w-2/4  lg:w-4/12 h-autoflex flex-col justify-center items-center bg-mywhite rounded-xl  shadow-xl space-y-4 relative  px-5 py-3 animate__animated  animate__fadeIn `}
      >
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
          <div className="flex gap-3 w-full justify-start items-center">
            <div className="w-full  flex flex-col">
              <label className={"font-medium text-sm"}>
                {t("registerForm.firstName")}
                {}
              </label>
              <InputText
                id="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                className={`w-full h-8 rounded border px-2 outline-secondary ring-secondary ${
                  formik.touched.name && formik.errors.name
                    ? "border-red-500"
                    : ""
                }`}
              />
              {formik.touched.name && formik.errors.name && (
                <small className="text-xs text-red-600 mt-1 ">
                  {formik.errors.name}
                </small>
              )}
            </div>
            <span className="w-full relative flex flex-col">
              <label className={"font-medium text-sm"}>
                {t("registerForm.lastName")}
              </label>
              <InputText
                id="surname"
                value={formik.values.surname}
                onChange={formik.handleChange}
                className={`w-full h-8 rounded border px-2 outline-secondary ring-secondary ${
                  formik.touched.surname && formik.errors.surname
                    ? "border-red-500"
                    : ""
                }`}
              />
              {formik.touched.surname && formik.errors.surname && (
                <small className="text-xs text-red-600 mt-1 ">
                  {formik.errors.surname}
                </small>
              )}
            </span>
          </div>
          <span className="w-full relative flex flex-col">
            <label className={"font-medium text-sm"}>
              {t("registerForm.email")}
            </label>
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
              <small className="text-xs text-red-600 mt-1 ">
                {formik.errors.email}
              </small>
            )}
          </span>

          <div className="flex  gap-2 justify-between items-center">
            <span className="w-full relative flex flex-col">
              <label className={"font-medium text-sm"}>
                {t("registerForm.password")}
              </label>
              <InputText
                id="password"
                type={"password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                className={`w-full h-8 rounded border px-2 outline-secondary ring-secondary ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : ""
                }`}
              />
              {formik.touched.password && formik.errors.password && (
                <small className="text-xs text-red-600 mt-1 ">
                  {formik.errors.password}
                </small>
              )}
            </span>
            <span className="w-full relative flex flex-col">
              <label className={"font-medium text-sm"}>
                {t("registerForm.rePassword")}
              </label>
              <InputText
                id="rePassword"
                type={"password"}
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                className={`w-full h-8 rounded border px-2 outline-secondary ring-secondary ${
                  formik.touched.rePassword && formik.errors.rePassword
                    ? "border-red-500"
                    : ""
                }`}
              />
              {formik.touched.rePassword && formik.errors.rePassword && (
                <small className="text-xs text-red-600 mt-1 ">
                  {formik.errors.rePassword}
                </small>
              )}
            </span>
          </div>
          <div className="flex flex-col space-y-2 w-full justify-center items-center ">
            <Button
              text={t("registerForm.registerButton")}
              type="submit"
              animation
              size="center"
              className=" bg-primary hover:bg-primaryDark text-mywhite py-2 rounded-lg mt-2"
            />
            {/* <Button
              size="small"
              outline
              icon={IoLogoGoogleplus}
              iconSize={23}
              className="w-full bg-transparent hover:bg-primaryLight border border-primary text-primary hover:text-mywhite rounded-lg py-2"
            /> */}
          </div>
        </form>
        <p
          className="w-full  text-center hover:underline cursor-pointer text-primary font-semibold mt-4"
          onClick={() => handleChangeModal()}
        >
          {t("registerForm.registerLink")}
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;

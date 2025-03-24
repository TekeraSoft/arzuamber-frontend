"use client";

import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { useFormik } from "formik";
import { InputMask } from "primereact/inputmask";
import { InputTextarea } from "primereact/inputtextarea";
import { toast } from "react-toastify";
import { useUserUpdateAddressSchema } from "@/error/userUpdateAddressSchema";
import { useUserUpdatePhoneSchema } from "@/error/userUpdatePhoneSchema";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/store/store";
import {editUserDetailsDispatch} from "@/store/userSlice";

function UserUpdatePage() {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const t = useTranslations();

  // Telefon Formu
  const formik = useFormik({
    initialValues: { phoneNumber: "",address: "", token: session?.accessToken, email: session?.user?.email },
    validationSchema: useUserUpdatePhoneSchema(),
    onSubmit: async (values,{resetForm}) => {
      dispatch(editUserDetailsDispatch(values,resetForm))
    },
  });

  return (
    <div className="w-full flex flex-col items-center container px-12 md:p-4">
      <h2 className="text-2xl font-semibold mb-4">
        {t("profileUpdate.updateInfo")}
      </h2>

      {/* Telefon Güncelleme Formu */}
      <form
        onSubmit={formik.handleSubmit}
        className="w-full md:w-2/4 flex flex-col gap-4"
      >
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700"
        >
          {t("profileUpdate.phone")}
        </label>
        <InputMask
          id="phoneNumber"
          name="phoneNumber"
          mask="(999) 999 9999"
          placeholder="(000) 000 0000"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={
            formik.touched.phoneNumber && formik.errors.phoneNumber
              ? "p-invalid w-full"
              : "w-full"
          }
        />
        {formik.touched.phoneNumber && formik.errors.phoneNumber && (
          <small className="p-error">{formik.errors.phoneNumber}</small>
        )}
        <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
        >
          {t("profileUpdate.address")}
        </label>

        <InputTextarea
            id="address"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.touched.address && formik.errors.address
                  ? "p-invalid w-full"
                  : "w-full"
            }
            rows={4} // Yüksekliği ayarlamak için
            cols={30} // Genişliği ayarlamak için
            placeholder="Adresinizi girin"
        />
        {formik.touched.address && formik.errors.address && (
            <small className="p-error">{formik.errors.address}</small>
        )}
        <button
          type="submit"
          className="w-full bg-secondary text-white py-2 rounded-md hover:opacity-80 transition duration-300 outline-none focus:outline-none"
        >
          {t("profileUpdate.updatePhone")}
        </button>
      </form>
    </div>
  );
}

export default UserUpdatePage;

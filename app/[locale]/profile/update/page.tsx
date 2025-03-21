"use client";

import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { useFormik } from "formik";
import { InputMask } from "primereact/inputmask";
import { InputTextarea } from "primereact/inputtextarea";
import { toast } from "react-toastify";
import { useUserUpdateAddressSchema } from "@/error/userUpdateAddressSchema";
import { useUserUpdatePhoneSchema } from "@/error/userUpdatePhoneSchema";

function UserUpdatePage() {
  const { data: session } = useSession();
  const t = useTranslations();

  // Telefon Formu
  const phoneFormik = useFormik({
    initialValues: { phone: "" },
    validationSchema: useUserUpdatePhoneSchema(),
    onSubmit: async (values) => {
      const response = await fetch("/api/update-phone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, email: session?.user?.email }),
      });
      if (response.ok) {
        toast.success(t("forgotPassForm.phoneSuccess"));
      } else {
        toast.error(t("forgotPassForm.phoneFail"));
      }
    },
  });

  // Adres Formu
  const addressFormik = useFormik({
    initialValues: { address: "" },
    validationSchema: useUserUpdateAddressSchema(),

    onSubmit: async (values) => {
      const response = await fetch("/api/update-address", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, email: session?.user?.email }),
      });
      if (response.ok) {
        toast.success(t("forgotPassForm.addressSuccess"));
      } else {
        toast.error(t("forgotPassForm.adressFail"));
      }
    },
  });

  return (
    <div className="w-full flex flex-col items-center container px-12 md:p-4">
      <h2 className="text-2xl font-semibold mb-4">
        {t("profileUpdate.updateInfo")}
      </h2>

      {/* Telefon Güncelleme Formu */}
      <form
        onSubmit={phoneFormik.handleSubmit}
        className="w-full md:w-2/4 flex flex-col gap-4"
      >
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700"
        >
          {t("profileUpdate.phone")}
        </label>
        <InputMask
          id="phone"
          name="phone"
          mask="(999) 999 9999"
          placeholder="(000) 000 0000"
          value={phoneFormik.values.phone}
          onChange={phoneFormik.handleChange}
          onBlur={phoneFormik.handleBlur}
          className={
            phoneFormik.touched.phone && phoneFormik.errors.phone
              ? "p-invalid w-full"
              : "w-full"
          }
        />
        {phoneFormik.touched.phone && phoneFormik.errors.phone && (
          <small className="p-error">{phoneFormik.errors.phone}</small>
        )}
        <button
          type="submit"
          className="w-full bg-secondary text-white py-2 rounded-md hover:opacity-80 transition duration-300 outline-none focus:outline-none"
        >
          {t("profileUpdate.updatePhone")}
        </button>
      </form>

      {/* Adres Güncelleme Formu */}
      <form
        onSubmit={addressFormik.handleSubmit}
        className="w-full md:w-2/4 flex flex-col gap-4 mt-6"
      >
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-700"
        >
          {t("profileUpdate.address")}
        </label>

        <InputTextarea
          id="address"
          name="address"
          value={addressFormik.values.address}
          onChange={addressFormik.handleChange}
          onBlur={addressFormik.handleBlur}
          className={
            addressFormik.touched.address && addressFormik.errors.address
              ? "p-invalid w-full"
              : "w-full"
          }
          rows={4} // Yüksekliği ayarlamak için
          cols={30} // Genişliği ayarlamak için
          placeholder="Adresinizi girin"
        />
        {addressFormik.touched.address && addressFormik.errors.address && (
          <small className="p-error">{addressFormik.errors.address}</small>
        )}
        <button
          type="submit"
          className="w-full bg-secondary text-white py-2 rounded-md hover:opacity-80 transition duration-300 outline-none focus:outline-none"
        >
          {t("profileUpdate.updateAddress")}
        </button>
      </form>
    </div>
  );
}

export default UserUpdatePage;

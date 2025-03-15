"use client";

import Head from "next/head";
import PageContainer from "@/components/Containers/PageContainer";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import "primereact/resources/primereact.min.css";
import { useContactPageValidationSchema } from "@/error/contactSchema";
import { FaMapMarkedAlt } from "react-icons/fa";

import axios from "axios";
import { toast } from "react-toastify";

function ContactPage() {
  const t = useTranslations();

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      message: "",
    },
    validationSchema: useContactPageValidationSchema(),
    onSubmit: (values, { resetForm }) => {
      axios
        .post(`${process.env.NEXT_PUBLIC_BACKEND_API}/contact`, values)
        .then((res) => {
          toast.success(res.data.message);
          resetForm();
        })
        .catch((error) => {
          toast.error(error.response.data);
        });
    },
  });

  return (
    <>
      <Head>
        <title>{t("ContactPage.title")}</title>
        <meta name="description" content={t("ContactPage.metaDescription")} />
      </Head>

      <PageContainer>
        <form onSubmit={formik.handleSubmit}>
          <div className=" mx-auto animate__animated animate__fadeIn  ">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
                {t("ContactPage.header")}
              </h2>
              <p className="max-w-xl mx-auto mt-3 text-base leading-relaxed text-gray-500">
                {t("ContactPage.subheader")}
              </p>
            </div>

            <div className="max-w-5xl mx-auto mt-5">
              <div className="grid grid-cols-1 gap-6 text-center md:grid-cols-3">
                <div className="bg-white rounded-xl flex flex-col justify-center items-center p-6">
                  <FaPhoneAlt className="w-10 h-10 text-secondary" />
                  <p className="mt-3 text-sm font-medium text-gray-900">
                    +90 (534) 260 8385
                  </p>
                </div>
                <div className="bg-white rounded-xl flex flex-col justify-center items-center p-6">
                  <FaEnvelope className="w-10 h-10 text-secondary" />
                  <p className="mt-3  text-sm font-medium text-gray-900">
                    arzuambermoda@gmail.com
                  </p>
                </div>
                <div className="bg-white rounded-xl flex flex-col justify-center items-center p-6">
                  <FaMapMarkedAlt className="w-12 h-11 text-secondary" />
                  <div className="mt-3 font-medium text-gray-900">
                    <div className="grid text-xs ">
                      <span>{t("ContactPage.address.street")}, </span>
                      <span>{t("ContactPage.address.building")}, </span>
                      <span>
                        {t("ContactPage.address.number")},
                        {t("ContactPage.address.floor")}
                      </span>
                      <span>
                        {t("ContactPage.address.city")},
                        {t("ContactPage.address.district")},
                        {t("ContactPage.address.country")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-white rounded-lg px-6 md:px-8 py-6 w-full">
                <h3 className="text-3xl font-semibold text-center text-gray-900">
                  {t("ContactPage.messageTitle")}
                </h3>

                <div className="mt-3 grid gap-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="text-sm font-medium text-gray-700"
                      >
                        {t("ContactPage.form.nameLabel")}
                      </label>
                      <InputText
                        id="name"
                        name="name"
                        placeholder={t("ContactPage.form.namePlaceholder")}
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={classNames(
                          "w-full border px-2 py-2 h-10 rounded-lg  outline-secondary text-sm",
                          {
                            "p-invalid":
                              formik.touched.name && formik.errors.name,
                          }
                        )}
                      />
                      {formik.touched.name && formik.errors.name && (
                        <div className="text-red-500 text-sm mt-1">
                          {formik.errors.name}
                        </div>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="text-sm font-medium text-gray-700"
                      >
                        {t("ContactPage.form.lastNameLabel")}
                      </label>
                      <InputText
                        id="surname"
                        name="surname"
                        placeholder={t("ContactPage.form.lastNamePlaceholder")}
                        value={formik.values.surname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={classNames(
                          "w-full border px-2 py-2 rounded-lg  h-10  outline-secondary text-sm",
                          {
                            "p-invalid":
                              formik.touched.surname && formik.errors.surname,
                          }
                        )}
                      />
                      {formik.touched.surname && formik.errors.surname && (
                        <div className="text-red-500 text-sm mt-1">
                          {formik.errors.surname}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700"
                    >
                      {t("ContactPage.form.emailLabel")}
                    </label>
                    <InputText
                      id="email"
                      name="email"
                      placeholder={t("ContactPage.form.emailPlaceholder")}
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={classNames(
                        "w-full border px-2 py-2  h-10  rounded-lg outline-secondary text-sm",
                        {
                          "p-invalid":
                            formik.touched.email && formik.errors.email,
                        }
                      )}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="text-red-500 text-sm mt-1">
                        {formik.errors.email}
                      </div>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="text-sm font-medium text-gray-700"
                    >
                      {t("ContactPage.form.messageLabel")}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder={t("ContactPage.form.messagePlaceholder")}
                      value={formik.values.message}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={classNames(
                        "w-full min-h-24 p-2 border rounded-lg outline-secondary",
                        {
                          "p-invalid":
                            formik.touched.message && formik.errors.message,
                        }
                      )}
                    />
                    {formik.touched.message && formik.errors.message && (
                      <div className="text-red-500 text-sm mt-1">
                        {formik.errors.message}
                      </div>
                    )}
                  </div>
                  <div className="flex justify-center mt-4">
                    <Button
                      label={t("ContactPage.form.submitButton")}
                      type="submit"
                      className="!bg-secondary  !shadow-sm !py-1  !w-1/2 !text-center  text-mywhite !rounded-lg hover:scale-105 !transition !duration-300 !border-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </PageContainer>
    </>
  );
}

export default ContactPage;

"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import il from "@/data/il.json";
import ice from "@/data/ilce.json";
import { Field, Form, Formik } from "formik";
import { BasketItem } from "@/types";
import { InputMask } from "primereact/inputmask";
import { InputSwitch } from "primereact/inputswitch";
import { InputText } from "primereact/inputtext";
import { FaUser } from "react-icons/fa";
import { VscCreditCard } from "react-icons/vsc";
import { BsCreditCard2Front } from "react-icons/bs";
import { ImCreditCard } from "react-icons/im";
import Image from "next/image";
import Loading from "../utils/Loading";
import { useTranslations } from "next-intl";
import { useOrderValidationSchema } from "@/error/orderSchema";
import { IoIosArrowRoundForward } from "react-icons/io";
import {Button} from "primereact/button";
import {toast} from "react-toastify";

export default function PaymentForm() {
  const { cartProducts, total } = useSelector((state: RootState) => state.cart);
  const [states, setStates] = useState<
    { id: string; il_id: string; name: string }[]
  >([]);
  const [billingStates, setBillingStates] = useState<{ id: string; il_id: string; name: string }[]>([]);
  const [openBillingAddress, setOpenBillingAddress] = useState<boolean>(false);
  const [ip, setIp] = useState();
  const [threeDsModal, setThreeDsModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
  const t = useTranslations();

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => setIp(data.ip))
      .catch((err) => console.error("IP alınamadı", err));
  }, []);

  useEffect(() => {
    const basketItems = cartProducts.map((cp) => ({
      id: cp.id,
      name: cp.name,
      category1: cp.category1,
      category2: cp.category2,
      price: cp.price,
      quantity: cp.quantity,
      size: cp.size,
      stockSizeId: cp.stockSizeId,
      stockCode: cp.stockCode,
      color: cp.color,
    }));
    setBasketItems(basketItems);
  }, [cartProducts]);

  useEffect(() => {
    if (threeDsModal) {
      setLoading(true);
      const form = document.getElementById(
        "iyzico-3ds-form"
      ) as HTMLFormElement;
      if (form) {
        form.submit();
      }
      setLoading(false);
    }
  }, [threeDsModal]);

  const _handleSubmit = async (values) => {
    setLoading(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/order/pay`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          shippingAddress: {
            ...values.shippingAddress,
            contactName: values.buyer.name,
          },
          billingAddress: openBillingAddress
            ? { ...values.billingAddress, contactName: values.buyer.name }
            : { ...values.shippingAddress, contactName: values.buyer.name },
          buyer: {
            ...values.buyer,
            ip: ip,
            registrationAddress: values.shippingAddress.address,
            city: values.shippingAddress.city,
            country: values.shippingAddress.country,
          },
          paymentCard: {
            ...values.paymentCard,
            cardNumber: values.paymentCard.cardNumber.replace(/\D/g, ""),
          },
          basketItems: basketItems,
        }),
      }
    );
    const data = await response.json();

    if (data.status === "success") {
      setLoading(false)
      setThreeDsModal(data.htmlContent);
    } else {
      setLoading(false)
      toast.error(data.errorMessage);
    }
    //console.log({
    //  ...values,
    //  shippingAddress: {
    //    ...values.shippingAddress,
    //    contactName: values.buyer.name,
    //  },
    //  billingAddress: openBillingAddress ?
    //      {...values.billingAddress, contactName: values.buyer.name }: {...values.shippingAddress,contactName: values.buyer.name},
    //  buyer: {
    //    ...values.buyer,
    //    ip: ip,
    //    registrationAddress: values.shippingAddress.address,
    //    city: values.shippingAddress.city,
    //    country: values.shippingAddress.country,
    //  },
    //  paymentCard: {
    //    ...values.paymentCard,
    //    cardNumber: values.paymentCard.cardNumber.replace(/\D/g, ""),
    //  },
    //  basketItems: basketItems,
    //});
  };

  const validationSchema = useOrderValidationSchema(openBillingAddress);
  return (
    <div className="flex flex-col  gap-2 py-3 ">
      {loading ? (
        <Loading />
      ) : (
        <Formik
          initialValues={{
            paymentCard: {
              cardHolderName: "",
              cardNumber: "",
              expireMonth: "",
              expireYear: "",
              cvc: "",
            },
            buyer: {
              id: Math.random().toString(36).substring(2, 15),
              name: "",
              surname: "",
              gsmNumber: "",
              email: "",
              identityNumber: "55555555555",
              ip: "",
              lastLoginDate: "2024-03-25 20:28:29",
              registrationDate: "2024-03-25 20:28:29",
            },
            shippingAddress: {
              city: "",
              state: "",
              country: "Turkey",
              address: "",
              street: "",
              zipCode: "",
            },
            billingAddress: {
              city: "",
              state: "",
              country: "Turkey",
              address: "",
              street: "",
              zipCode: "",
            },
          }}
          onSubmit={_handleSubmit}
          validationSchema={validationSchema}
        >
          {({ values, touched, handleSubmit, setFieldValue, errors }) => (
            <Form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-y-4">
                <h3 className="text-2xl font-bold text-center">
                  {t("paymentForm.title")}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-y-2 relative">
                    <label className="text-sm">
                      {t("paymentForm.PaymentLabels.BuyerInfo.name")}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <Field
                      name="buyer.name"
                      className="w-full text-sm border py-2 px-2 placeholder:text-sm rounded"
                      placeholder={t(
                        "paymentForm.PaymentLabels.BuyerInfo.name"
                      )}
                    />
                    {errors.buyer?.name && touched.buyer?.name && (
                      <span className="text-xs text-red-500 ">
                        {errors.buyer.name}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-y-2 relative">
                    <label className="text-sm">
                      {t("paymentForm.PaymentLabels.BuyerInfo.surname")}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <Field
                      name="buyer.surname"
                      className="w-full text-sm border py-2 px-2 placeholder:text-sm rounded"
                      placeholder={t(
                        "paymentForm.PaymentLabels.BuyerInfo.surname"
                      )}
                    />
                    {errors.buyer?.surname && touched.buyer?.surname && (
                      <span className="text-xs text-red-500 ">
                        {errors.buyer.surname}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-y-2 relative">
                  <label className="text-sm">
                    {t("paymentForm.PaymentLabels.BuyerInfo.email")}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <Field
                    name="buyer.email"
                    className="w-full border text-sm py-2 px-2 placeholder:text-sm rounded"
                    placeholder={t("paymentForm.PaymentLabels.BuyerInfo.email")}
                  />
                  {errors.buyer?.email && touched.buyer?.email && (
                    <span className="text-xs text-red-500 ">
                      {errors.buyer.email}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-x-2 relative">
                  <div className="flex flex-col gap-y-2">
                    <label className=" text-sm text-gray-600">
                      {t("paymentForm.PaymentLabels.BuyerInfo.phone")}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <InputMask
                      value={values.buyer.gsmNumber}
                      onChange={(e) =>
                        setFieldValue("buyer.gsmNumber", e.target.value)
                      }
                      id="phone"
                      mask="(999) 999 9999"
                      placeholder="(000) 000 0000"
                      className="w-full text-sm border py-2 px-2 placeholder:text-sm rounded"
                    />
                    {errors.buyer?.gsmNumber && touched.buyer?.gsmNumber && (
                      <span className="text-xs text-red-500  ">
                        {errors.buyer.gsmNumber}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-y-2 relative">
                    <label className="text-sm">
                      {t("paymentForm.PaymentLabels.Adress.cities")}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      defaultValue={values.shippingAddress.city}
                      className="w-full border text-sm py-2 px-2 placeholder:text-sm rounded"
                      onChange={(e) => {
                        const [id, name] = e.target.value.split(",") as [
                          string,
                          string
                        ];
                        setFieldValue("shippingAddress.city", name);
                        setFieldValue("shippingAddress.state", "");
                        const selectedStates = ice.filter(
                          (i) => i.il_id === id
                        );
                        setStates(selectedStates);
                      }}
                    >
                      <option value="" disabled className="text-gray-400">
                        {t("paymentForm.PaymentLabels.choose")}
                      </option>
                      {il.map((item, index) => (
                        <option key={index} value={`${item.id},${item.name}`}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    {errors.shippingAddress?.city &&
                      touched.shippingAddress?.city && (
                        <span className="text-xs text-red-500  ">
                          {errors.shippingAddress.city}
                        </span>
                      )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-2 relative">
                  <div className="flex flex-col gap-y-2">
                    <label className="text-sm">
                      {t("paymentForm.PaymentLabels.Adress.District")}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <Field
                      name="shippingAddress.state"
                      as="select"
                      className="w-full text-sm border py-2 px-2 placeholder:text-sm rounded"
                      placeholder="İlçe"
                    >
                      <option value="" disabled>
                        {t("paymentForm.PaymentLabels.choose")}
                      </option>
                      {states.map((item, index) => (
                        <option key={index} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </Field>
                    {errors.shippingAddress?.state &&
                      touched.shippingAddress?.state && (
                        <span className="text-xs text-red-500 ">
                          {errors.shippingAddress.state}
                        </span>
                      )}
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <label className="text-sm">
                      {t("paymentForm.PaymentLabels.Adress.Neighborhood")}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <Field
                      name="shippingAddress.street"
                      className="w-full border text-sm py-2 px-2 placeholder:text-sm rounded"
                      placeholder={t(
                        "paymentForm.PaymentLabels.Adress.Neighborhood"
                      )}
                    />
                    {errors.shippingAddress?.street &&
                      touched.shippingAddress?.street && (
                        <span className="text-xs text-red-500 ">
                          {errors.shippingAddress.street}
                        </span>
                      )}
                  </div>
                </div>
                <div className="flex flex-col gap-y-2 relative">
                  <label className="text-sm">
                    {" "}
                    {t("paymentForm.PaymentLabels.Adress.zipcode")}
                  </label>
                  <Field
                    name="shippingAddress.zipCode"
                    className="w-full border text-sm py-2 px-2 placeholder:text-sm rounded"
                    placeholder={t("paymentForm.PaymentLabels.Adress.zipcode")}
                  />
                </div>
                <div className="flex flex-col gap-y-2 relative">
                  <label className="text-sm">
                    {t("paymentForm.PaymentLabels.Adress.DetailedAddress")}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <Field
                    rows={5}
                    as="textarea"
                    name="shippingAddress.address"
                    className="w-full border text-sm py-2 px-2 placeholder:text-sm rounded"
                    placeholder={t(
                      "paymentForm.PaymentLabels.Adress.DetailedAddress"
                    )}
                  />
                  {errors.shippingAddress?.address &&
                    touched.shippingAddress?.address && (
                      <span className="text-xs text-red-500 ">
                        {errors.shippingAddress.address}
                      </span>
                    )}
                </div>

                {/*  BILLING ADDRESS */}
                <div className="flex flex-col gap-y-4">
                  <div className="flex flex-row items-center w-full justify-between">
                    <span className="text-xs md:text-sm font-semibold flex  justify-center items-center gap-1">
                      {t("paymentForm.PaymentLabels.Adress.otherAdressLabel")}
                      <IoIosArrowRoundForward size={25} className="" />
                    </span>
                    <InputSwitch
                      checked={openBillingAddress}
                      onChange={() =>
                        setOpenBillingAddress(!openBillingAddress)
                      }
                    />
                  </div>
                  <div
                    className={`${
                      openBillingAddress ? "flex" : "hidden"
                    } flex flex-col gap-y-4`}
                  >
                    <div className="grid grid-cols-2 gap-x-2">
                      <div className="flex flex-col gap-y-2 relative">
                        <label className="text-sm">
                          {t("paymentForm.PaymentLabels.Adress.cities")}{" "}
                          <span className="text-red-500 ">*</span>
                        </label>
                        <select
                          defaultValue={values.billingAddress.city}
                          className="w-full border text-sm py-2 px-2 placeholder:text-sm rounded"
                          onChange={(e) => {
                            const [id, name] = e.target.value.split(",") as [
                              string,
                              string
                            ];
                            setFieldValue("billingAddress.city", name);
                            setFieldValue("billingAddress.state", "");
                            const selectedStates = ice.filter(
                              (i) => i.il_id === id
                            );
                            setBillingStates(selectedStates);
                          }}
                        >
                          <option value="" disabled className="text-gray-400">
                            {t("paymentForm.PaymentLabels.choose")}
                          </option>
                          {il.map((item, index) => (
                            <option
                              key={index}
                              value={`${item.id},${item.name}`}
                            >
                              {item.name}
                            </option>
                          ))}
                        </select>
                        {errors.billingAddress?.city &&
                          touched.billingAddress?.city && (
                            <span className="text-xs text-red-500 ">
                              {errors.billingAddress.city}
                            </span>
                          )}
                      </div>
                      <div className="flex flex-col gap-y-2">
                        <label className="text-sm">
                          {t("paymentForm.PaymentLabels.Adress.District")}{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <Field
                          name="billingAddress.state"
                          as="select"
                          className="w-full text-sm border py-2 px-2 placeholder:text-sm rounded"
                          placeholder={t(
                            "paymentForm.PaymentLabels.Adress.District"
                          )}
                        >
                          <option value="" disabled>
                            {t("paymentForm.PaymentLabels.choose")}
                          </option>
                          {billingStates.map((item, index) => (
                            <option key={index} value={item.name}>
                              {item.name}
                            </option>
                          ))}
                        </Field>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-2">
                      <div className="flex flex-col gap-y-2">
                        <label className="text-sm">
                          {t("paymentForm.PaymentLabels.Adress.Neighborhood")}
                          <span className="text-red-500">*</span>
                        </label>
                        <Field
                          name="billingAddress.street"
                          className="w-full border text-sm py-2 px-2 placeholder:text-sm rounded"
                          placeholder={t(
                            "paymentForm.PaymentLabels.Adress.Neighborhood"
                          )}
                        />
                        {errors.billingAddress?.street &&
                            touched.billingAddress?.street && (
                                <span className="text-xs text-red-500 ">
                              {errors.billingAddress.street}
                            </span>
                            )}
                      </div>
                      <div className="flex flex-col gap-y-2">
                        <label className="text-sm">
                          {" "}
                          {t("paymentForm.PaymentLabels.Adress.zipcode")}
                        </label>
                        <Field
                          name="billingAddress.zipCode"
                          className="w-full border text-sm py-2 px-2 placeholder:text-sm rounded"
                          placeholder={t(
                            "paymentForm.PaymentLabels.Adress.zipcode"
                          )}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-y-2">
                      <label className="text-sm">
                        {t("paymentForm.PaymentLabels.Adress.DetailedAddress")}{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <Field
                        rows={5}
                        as="textarea"
                        name="billingAddress.address"
                        className="w-full border text-sm py-2 px-2 placeholder:text-sm rounded"
                        placeholder={t(
                          "paymentForm.PaymentLabels.Adress.DetailedAddress"
                        )}
                      />
                      {errors.billingAddress?.address &&
                          touched.billingAddress?.address && (
                              <span className="text-xs text-red-500 ">
                              {errors.billingAddress.address}
                            </span>
                          )}
                    </div>
                  </div>
                </div>
                {/* BILLING ADDRESS END */}

                <div className="flex flex-col gap-y-6 bg-slate-200 rounded-lg px-2 py-8">
                  <h3 className="text-xl font-semibold text-center">
                    {t("paymentForm.PaymentLabels.PaymentPageTitle")}
                  </h3>
                  <div className="p-inputgroup flex-1 relative ">
                    <span className="p-inputgroup-addon">
                      <FaUser className="text-base md:text-xl" />
                    </span>
                    <InputText
                      value={values.paymentCard.cardHolderName}
                      onChange={(e) =>
                        setFieldValue(
                          "paymentCard.cardHolderName",
                          e.target.value
                        )
                      }
                      className={`border  px-4 text-md placeholder:text-md  ${
                        errors.paymentCard?.cardHolderName && "border-red-600"
                      }`}
                      placeholder={t(
                        "paymentForm.PaymentLabels.cardHolderNameLabel"
                      )}
                    />
                    {errors.paymentCard?.cardHolderName &&
                      touched.paymentCard?.cardHolderName && (
                        <span className="text-xs text-red-500  left-12">
                          {errors.paymentCard.cardHolderName}
                        </span>
                      )}
                  </div>
                  <div className="p-inputgroup flex-1 relative">
                    <span className="p-inputgroup-addon">
                      <BsCreditCard2Front size={24} />
                    </span>
                    <InputMask
                      value={values.paymentCard.cardNumber}
                      onChange={(e) =>
                        setFieldValue("paymentCard.cardNumber", e.target.value)
                      }
                      mask="9999-9999-9999-9999"
                      className={`border px-4 text-md placeholder:text-md ${
                        errors.paymentCard?.cardNumber &&
                        touched.paymentCard?.cardNumber &&
                        "border-red-600"
                      }`}
                      placeholder={t(
                        "paymentForm.PaymentLabels.cardNumberLabel"
                      )}
                    />
                    {errors.paymentCard?.cardNumber &&
                      touched.paymentCard?.cardNumber && (
                        <span className="text-xs text-red-500  left-12">
                          {errors.paymentCard.cardNumber}
                        </span>
                      )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 justify-between mb-4">
                    <div className="p-inputgroup flex-1">
                      <span className="p-inputgroup-addon">
                        <VscCreditCard size={24} />
                      </span>
                      <InputMask
                        onChange={(e) =>
                          setFieldValue(
                            "paymentCard.expireMonth",
                            e.target.value
                          )
                        }
                        mask="99"
                        className={`border px-2 text-md placeholder:text-md  ${
                          errors.paymentCard?.expireMonth &&
                          touched.paymentCard?.cardNumber &&
                          "border-red-600"
                        }`}
                        placeholder={t(
                          "paymentForm.PaymentLabels.CardDate.expireMonthLabel"
                        )}
                      />
                      <InputMask
                        onChange={(e) =>
                          setFieldValue(
                            "paymentCard.expireYear",
                            e.target.value
                          )
                        }
                        mask="99"
                        className={`border px-2 text-md placeholder:text-md ${
                          errors.paymentCard?.expireYear &&
                          touched.paymentCard?.cardNumber &&
                          "border-red-600"
                        }`}
                        placeholder={t(
                          "paymentForm.PaymentLabels.CardDate.expireYearLabel"
                        )}
                      />
                    </div>
                    <div className="p-inputgroup flex-1">
                      <span className="p-inputgroup-addon">
                        <ImCreditCard size={24} />
                      </span>
                      <InputMask
                        value={values.paymentCard.cvc}
                        onChange={(e) =>
                          setFieldValue("paymentCard.cvc", e.value)
                        }
                        mask="999"
                        className={`border px-2 text-md placeholder:text-md ${
                          errors.paymentCard?.cvc &&
                          touched.paymentCard?.cardNumber &&
                          "border-red-600"
                        }`}
                        placeholder="CVC"
                      />
                    </div>
                  </div>
                  <Image
                    src="/images/utils/iyzicoImages.png"
                    alt="logo_band_colored@2x.png"
                    layout="responsive"
                    width={500}
                    height={500}
                  />
                </div>
                <div className="w-full flex justify-center items-center">
                  <Button
                      loading={loading}
                    type="submit"
                    className="bg-secondary !font-extrabold flex justify-center text-white rounded-lg py-3 text-lg hover:scale-105 w-full transition duration-300"
                  >
                    {t("paymentForm.PaymentLabels.Button")} - {total.toLocaleString('tr-TR', {style: 'currency', currency:'TRY'})}{" "}
                    TL
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      )}
      {/* 3D Form */}
      {threeDsModal && (
        <div>
          <h3>3D Secure Doğrulama</h3>
          <div
            id="3ds-form-container"
            dangerouslySetInnerHTML={{ __html: threeDsModal }} // html içeriği burada
          />
          {/* Otomatik gönderim için formun doğru şekilde render edilmesini bekle */}
        </div>
      )}
    </div>
  );
}

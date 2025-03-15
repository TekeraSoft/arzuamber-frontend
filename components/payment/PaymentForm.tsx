"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import il from "@/data/il.json";
import ice from "@/data/ilce.json";
import { Field, Form, Formik } from "formik";
import { BasketItem, PaymentFormValues } from "@/types";
import { InputMask } from "primereact/inputmask";
import { InputSwitch } from "primereact/inputswitch";
import { InputText } from "primereact/inputtext";
import { FaExclamationCircle, FaUser } from "react-icons/fa";
import { VscCreditCard } from "react-icons/vsc";
import { BsCreditCard2Front } from "react-icons/bs";
import { ImCreditCard } from "react-icons/im";
import { useTranslations } from "next-intl";
import { useOrderValidationSchema } from "@/error/orderSchema";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Button } from "primereact/button";
import { toast } from "react-toastify";
import { filterData } from "@/data/filterData";
import FormStepper from "@/components/productDetail/utils/FormStepper";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import axios from "axios";
import DynamicModal from "../utils/DynamicModal";
import { openDynamicModal } from "@/store/modalsSlice";
import { useSession } from "next-auth/react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import Image from "next/image";
import ReCAPTCHA from "react-google-recaptcha";
// import { clearCart } from "@/store/cartSlice";

export default function PaymentForm() {
  const { cartProducts, total } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();
  const [states, setStates] = useState<
    { id: string; il_id: string; name: string }[]
  >([]);
  const [billingStates, setBillingStates] = useState<
    { id: string; il_id: string; name: string }[]
  >([]);
  const [openBillingAddress, setOpenBillingAddress] = useState<boolean>(false);
  const [ip, setIp] = useState();
  const [threeDsModal, setThreeDsModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
  const [step, setStep] = useState(0);
  const t = useTranslations();
  const session = useSession();

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
      image: cp.image,
    }));
    setBasketItems(basketItems);
  }, [cartProducts]);

  useEffect(() => {
    if (threeDsModal) {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = String(threeDsModal);
      const form = tempDiv.querySelector("form"); // Formu bul
      if (!form) {
        console.error("❌ İyzico formu bulunamadı!");
        return;
      }

      const actionUrl = form.getAttribute("action"); // Formun yönlendirileceği URL
      if (!actionUrl) {
        console.error("❌ Form action URL bulunamadı!");
        return;
      }
      const formData = new FormData(form);
      // Tarayıcıyı 3D Secure sayfasına yönlendir
      const newForm = document.createElement("form");
      newForm.method = "POST";
      newForm.action = actionUrl;

      for (const [name, value] of formData.entries()) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        if (typeof value === "string") {
          input.value = value;
        }
        newForm.appendChild(input);
      }

      document.body.appendChild(newForm);
      newForm.submit(); // Yönlendirmeyi başlat
    }
  }, [threeDsModal]);

  const _handleSubmit = async (values) => {
    setLoading(true);
    await axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_API}/order/pay`, {
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
        shippingPrice:
          total > filterData.maxShippingPrice ? 0 : filterData.shippingPrice,
      })
      .then((res) => {
        if (res.data.status === "success") {
          setLoading(false);
          setThreeDsModal(res.data.htmlContent);
        } else {
          toast.error(res.data.errorMessage);
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data);
      })
      .finally(() => setLoading(false));
  };

  const validationSchema = useOrderValidationSchema(openBillingAddress);

  const handleOpenModal = (title: string, content: string) => {
    dispatch(openDynamicModal({ title, content }));
  };

  const [checkboxes, setCheckboxes] = useState({
    KVKK: session.status == "authenticated" ? false : true,
    MembershipAgreement: session.status == "authenticated" ? false : true,
  });

  // Checkbox'ların durumunu değiştiren fonksiyon
  const handleCheckboxChange = (name) => {
    setCheckboxes((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };



  const [recaptcha, setRecaptcha] = useState();




  const isButtonDisabled =
    checkboxes.KVKK || checkboxes.MembershipAgreement || recaptcha===undefined ? true : false;



  return (
    <div className="flex flex-col  gap-2 py-3 ">
      <>
        <FormStepper step={step} />
        <Formik<PaymentFormValues>
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
              <div className={`flex flex-col gap-y-4 mt-6`}>
                {step === 0 && (
                  <>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col gap-y-2 relative">
                        <label className="text-sm">
                          {t("paymentForm.PaymentLabels.BuyerInfo.name")}{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <Field
                          name="buyer.name"
                          className="w-full border py-3 px-2 placeholder:text-sm rounded"
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
                          className="w-full border py-3 px-2 placeholder:text-sm rounded"
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
                        className="w-full border py-3 px-2 placeholder:text-sm rounded"
                        placeholder={t(
                          "paymentForm.PaymentLabels.BuyerInfo.email"
                        )}
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
                          className="w-full border py-3 px-2 placeholder:text-sm rounded"
                        />
                        {errors.buyer?.gsmNumber &&
                          touched.buyer?.gsmNumber && (
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
                          className="w-full border py-3 px-2 placeholder:text-sm rounded"
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
                            <option
                              key={index}
                              value={`${item.id},${item.name}`}
                            >
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
                          className="w-full border py-3 px-2 placeholder:text-sm rounded"
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
                          className="w-full border py-3 px-2 placeholder:text-sm rounded"
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
                        className="w-full border py-3 px-2 placeholder:text-sm rounded"
                        placeholder={t(
                          "paymentForm.PaymentLabels.Adress.zipcode"
                        )}
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
                        className="w-full border py-3 px-2 placeholder:text-sm rounded"
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
                      <div className="flex flex-row items-center   justify-start ">
                        <span className="text-xs md:text-sm font-semibold flex  justify-center items-center gap-1">
                          {t(
                            "paymentForm.PaymentLabels.Adress.otherAdressLabel"
                          )}
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
                              className="w-full border text-sm py-3 px-2 placeholder:text-sm rounded"
                              onChange={(e) => {
                                const [id, name] = e.target.value.split(
                                  ","
                                ) as [string, string];
                                setFieldValue("billingAddress.city", name);
                                setFieldValue("billingAddress.state", "");
                                const selectedStates = ice.filter(
                                  (i) => i.il_id === id
                                );
                                setBillingStates(selectedStates);
                              }}
                            >
                              <option
                                value=""
                                disabled
                                className="text-gray-400"
                              >
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
                              className="w-full text-sm border py-3 px-2 placeholder:text-sm rounded"
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
                              {t(
                                "paymentForm.PaymentLabels.Adress.Neighborhood"
                              )}
                              <span className="text-red-500">*</span>
                            </label>
                            <Field
                              name="billingAddress.street"
                              className="w-full border text-sm py-3 px-2 placeholder:text-sm rounded"
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
                              className="w-full border text-sm py-3 px-2 placeholder:text-sm rounded"
                              placeholder={t(
                                "paymentForm.PaymentLabels.Adress.zipcode"
                              )}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-y-2">
                          <label className="text-sm">
                            {t(
                              "paymentForm.PaymentLabels.Adress.DetailedAddress"
                            )}{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <Field
                            rows={5}
                            as="textarea"
                            name="billingAddress.address"
                            className="w-full border text-sm py-3 px-2 placeholder:text-sm rounded"
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
                      <div className={"flex w-full justify-end"}>
                        <Button
                          size={"small"}
                          onClick={() => {
                            if (
                              values.buyer.name === "" ||
                              errors.buyer?.name ||
                              errors.buyer?.surname ||
                              errors.buyer?.email ||
                              errors.buyer?.gsmNumber ||
                              errors.shippingAddress?.city ||
                              errors.shippingAddress?.state ||
                              errors.shippingAddress?.street ||
                              errors.shippingAddress?.address
                            ) {
                              toast.info(
                                t(
                                  "paymentForm.PaymentLabels.Missingİnformation"
                                )
                              );
                            } else {
                              setStep(1);
                              window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                              });
                            }
                          }}
                          className={"!font-semibold !p-1 !px-4"}
                          icon={<MdArrowRight size={32} />}
                        >
                          {t("paymentForm.PaymentLabels.DescPayment")}
                        </Button>
                      </div>
                    </div>
                  </>
                )}

                {step === 1 && (
                  <>
                    <div
                      className={`flex flex-col relative gap-y-6 rounded-lg px-2 py-8`}
                    >
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
                          className={`border  px-4 placeholder:text-md  ${
                            errors.paymentCard?.cardHolderName &&
                            touched.paymentCard?.cardHolderName &&
                            "border-red-600"
                          }`}
                          placeholder={t(
                            "paymentForm.PaymentLabels.cardHolderNameLabel"
                          )}
                        />
                      </div>
                      <div className="p-inputgroup flex-1 relative">
                        <span className="p-inputgroup-addon">
                          <BsCreditCard2Front size={24} />
                        </span>
                        <InputMask
                          value={values.paymentCard.cardNumber}
                          onChange={(e) =>
                            setFieldValue(
                              "paymentCard.cardNumber",
                              e.target.value
                            )
                          }
                          mask="9999-9999-9999-9999"
                          className={`border px-4 placeholder:text-md ${
                            errors.paymentCard?.cardNumber &&
                            touched.paymentCard?.cardNumber &&
                            "border-red-600"
                          }`}
                          placeholder={t(
                            "paymentForm.PaymentLabels.cardNumberLabel"
                          )}
                        />
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
                            value={values.paymentCard.expireMonth}
                            className={`border px-2 placeholder:text-md  ${
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
                            value={values.paymentCard.expireYear}
                            mask="99"
                            className={`border px-2 placeholder:text-md ${
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
                            className={`border px-2 placeholder:text-md ${
                              errors.paymentCard?.cvc &&
                              touched.paymentCard?.cardNumber &&
                              "border-red-600"
                            }`}
                            placeholder="CVC"
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      className={"flex flex-row w-full justify-between px-4"}
                    >
                      <Button
                        onClick={() => {
                          setStep(0);
                          window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                          });
                        }}
                        size={"small"}
                        className={"!p-1 !px-4"}
                        icon={<MdArrowLeft size={32} />}
                      >
                        {t("paymentForm.PaymentLabels.Back")}
                      </Button>
                      <Button
                        onClick={() => {
                          setStep(2);
                          window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                          });
                        }}
                        size={"small"}
                        className={"!p-1 !px-4"}
                        icon={<MdArrowRight size={32} />}
                      >
                        {t("paymentForm.PaymentLabels.ShoppingDetail")}
                      </Button>
                    </div>
                  </>
                )}
                {step === 2 && (
                  <div
                    className={"tex-xs md:text-base flex flex-col mx-4 gap-y-6"}
                  >
                    <div className={"flex justify-between flex-col  gap-4"}>
                      <span
                        className={"bg-gray-100 p-4 rounded-lg break-words "}
                      >
                        <p className={"font-bold break-w"}>
                          {t("paymentForm.PaymentLabels.paymentDetailAdress")}:
                        </p>
                        <p className="text-sm">
                          {values.shippingAddress.address}
                        </p>
                      </span>
                      <span
                        className={"bg-gray-100 p-4 rounded-lg  break-words"}
                      >
                        <p className={"font-bold"}>
                          {t(
                            "paymentForm.PaymentLabels.PaymentDetailBillingAddress"
                          )}
                          :
                        </p>
                        <p className="text-sm">
                          {values.billingAddress.address
                            ? values.billingAddress.address
                            : values.shippingAddress.address}
                        </p>
                      </span>
                    </div>
                    <div
                      className={
                        "flex flex-col gap-y-3 bg-gray-100 p-4 rounded-lg"
                      }
                    >
                      <p className={"font-bold"}>
                        {t("paymentForm.PaymentLabels.BuyerInfo.title")}
                      </p>
                      <span className={"flex flex-row gap-x-2"}>
                        <p className={"font-semibold"}>
                          {t("paymentForm.PaymentLabels.name")}:
                        </p>
                        {values.buyer.name}
                      </span>
                      <span className={"flex flex-row gap-x-2"}>
                        <p className={"font-semibold"}>
                          {t("paymentForm.PaymentLabels.surname")}:
                        </p>
                        {values.buyer.surname}
                      </span>
                      <span className={"flex flex-row gap-x-2"}>
                        <p className={"font-semibold"}>
                          {t("paymentForm.PaymentLabels.email")}:
                        </p>
                        {values.buyer.email}
                      </span>
                      <span className={"flex flex-row gap-x-2"}>
                        <p className={"font-semibold"}>
                          {" "}
                          {t("paymentForm.PaymentLabels.phone")}:{" "}
                        </p>
                        {values.buyer.gsmNumber}
                      </span>
                    </div>

                    <div className="flex flex-col gap-2">
                      {session.status === "authenticated" ? null : (
                        <div className="w-full flex flex-col items-center justify-center gap-2 mt-1">
                          <div className="w-full flex items-center justify-start gap-2">
                            <input
                              type="checkbox"
                              checked={!checkboxes.KVKK}
                              onChange={() => handleCheckboxChange("KVKK")}
                              className="accent-primary cursor-pointer"
                            />
                            <div
                              className="text-xs font-semibold underline cursor-pointer"
                              onClick={() =>
                                handleOpenModal(
                                  t(
                                    "registerForm.registerFormCheckBox.KVKK.title"
                                  ),
                                  t(
                                    "registerForm.registerFormCheckBox.KVKK.content"
                                  )
                                )
                              }
                            >
                              <span className="text-red-600">*</span>{" "}
                              {t(
                                "registerForm.registerFormCheckBox.KVKK.title"
                              )}
                            </div>
                          </div>

                          <div className="w-full flex items-center justify-start gap-2">
                            <input
                              type="checkbox"
                              checked={!checkboxes.MembershipAgreement}
                              onChange={() =>
                                handleCheckboxChange("MembershipAgreement")
                              }
                              className="accent-primary cursor-pointer"
                            />
                            <div
                              className="text-xs font-semibold underline cursor-pointer"
                              onClick={() =>
                                handleOpenModal(
                                  t(
                                    "registerForm.registerFormCheckBox.MembershipAgreement.title"
                                  ),
                                  t(
                                    "registerForm.registerFormCheckBox.MembershipAgreement.content"
                                  )
                                )
                              }
                            >
                              <span className="text-red-600">*</span>{" "}
                              {t(
                                "registerForm.registerFormCheckBox.MembershipAgreement.title"
                              )}
                            </div>
                          </div>

                          <DynamicModal />
                        </div>
                      )}

                      <div className="mt-2 bg-green-100 rounded-lg shadow p-2">
                        {session.status === "authenticated" ? (
                          <div className="flex justify-start items-center gap-2 text-xs md:text-sm text-green-600">
                            <div className="flex items-center   rounded-full">
                              <FaExclamationCircle
                                size={22}
                                className="text-green-600"
                              />
                            </div>
                            <span className="font-semibold">
                              {t("paymentForm.authenticatedOrderInfo")}
                            </span>
                          </div>
                        ) : (
                          <div className="flex justify-start items-center gap-2 text-xs md:text-sm text-red-600">
                            <div className="flex items-center bg-green-100p-2 rounded-full">
                              <FaExclamationCircle
                                size={22}
                                className="text-green-600"
                              />
                            </div>
                            <span className="font-semibold">
                              * {t("paymentForm.unauthenticatedOrderInfo")}*
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex justify-start items-center p-2 bg-orange-100 rounded-lg shadow my-2">
                        <div className="flex items-center text-orange-700 text-lg gap-2">
                          <FaExclamationCircle />
                          <span className="font-semibold text-xs md:text-sm">
                            {t("paymentForm.cardInfo")}
                          </span>
                        </div>
                      </div>



                      <ReCAPTCHA
                          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                          onChange={setRecaptcha}
                      />






                    </div>

                    <Button
                      onClick={() => {
                        setStep(0);
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }}
                      disabled={loading}
                      className={"flex justify-center"}
                    >
                      {t("paymentForm.PaymentLabels.EditInformation")}
                    </Button>
                    <div className="w-full flex justify-center items-center">
                      <Button
                        type="button"
                        onClick={handleSubmit}
                        loading={loading}
                        disabled={loading || isButtonDisabled}
                        className="bg-secondary !font-bold flex justify-center text-white rounded-lg py-3 text-lg w-full transition duration-300"
                      >
                        {t("paymentForm.PaymentLabels.Button")} -{" "}
                        {(total > filterData.maxShippingPrice
                          ? total
                          : total + filterData.shippingPrice
                        ).toLocaleString("tr-TR", {
                          style: "currency",
                          currency: "TRY",
                        })}{" "}
                        TL
                      </Button>
                    </div>
                    <div className={"flex flex-col gap-y-4"}>
                      {(errors.paymentCard?.cardNumber && (
                        <small className={"text-sm text-red-600"}>
                          *{errors.paymentCard.cardNumber}
                        </small>
                      )) ||
                        (errors.paymentCard?.cardHolderName && (
                          <small className={"text-sm text-red-600"}>
                            *{errors.paymentCard.cardHolderName}
                          </small>
                        )) ||
                        (errors.paymentCard?.expireMonth && (
                          <small className={"text-sm text-red-600"}>
                            *{errors.paymentCard.expireMonth}
                          </small>
                        )) ||
                        (errors.paymentCard?.expireYear && (
                          <small className={"text-sm text-red-600"}>
                            *{errors.paymentCard.expireYear}
                          </small>
                        )) ||
                        (errors.buyer?.name && (
                          <small className={"text-sm text-red-600"}>
                            *{errors.buyer.name}
                          </small>
                        )) ||
                        (errors.buyer?.surname && (
                          <small className={"text-sm text-red-600"}>
                            *{errors.buyer.surname}
                          </small>
                        )) ||
                        (errors.buyer?.email && (
                          <small className={"text-sm text-red-600"}>
                            *{errors.buyer.email}
                          </small>
                        )) ||
                        (errors.buyer?.gsmNumber && (
                          <small className={"text-sm text-red-600"}>
                            *{errors.buyer.gsmNumber}
                          </small>
                        )) ||
                        (errors.shippingAddress?.address && (
                          <small className={"text-sm text-red-600"}>
                            *{errors.shippingAddress.address}
                          </small>
                        )) ||
                        (errors.shippingAddress?.city && (
                          <small className={"text-sm text-red-600"}>
                            *{errors.shippingAddress.city}
                          </small>
                        )) ||
                        (errors.shippingAddress?.state && (
                          <small className={"text-sm text-red-600"}>
                            *{errors.shippingAddress.state}
                          </small>
                        )) ||
                        (errors.shippingAddress?.street && (
                          <small className={"text-sm text-red-600"}>
                            *{errors.shippingAddress.street}
                          </small>
                        )) ||
                        (errors.billingAddress?.address && (
                          <small className={"text-sm text-red-600"}>
                            *{errors.billingAddress.address}
                          </small>
                        )) ||
                        (errors.billingAddress?.city && (
                          <small className={"text-sm text-red-600"}>
                            *{errors.billingAddress.city}
                          </small>
                        )) ||
                        (errors.billingAddress?.state && (
                          <small className={"text-sm text-red-600"}>
                            *{errors.shippingAddress.state}
                          </small>
                        )) ||
                        (errors.billingAddress?.street && (
                          <small className={"text-sm text-red-600"}>
                            *{errors.shippingAddress.street}
                          </small>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </>
    </div>
  );
}

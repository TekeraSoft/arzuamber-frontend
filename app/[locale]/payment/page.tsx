"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputMask } from "primereact/inputmask";
import { InputTextarea } from "primereact/inputtextarea";
import { format } from "date-fns";
import { paymentValidationSchema } from "@/error/paymentSchema";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Image from "next/image";
import { useTranslations } from "next-intl";
import EmptyCart from "@/components/cartclient/EmptyCart";
import TextClip from "@/components/utils/TextClip";
import Heading from "@/components/general/Heading";
import { Dropdown } from "primereact/dropdown";
import { Cities } from "@/constans/Citites";
import { Checkbox } from "@mui/material";

const PaymentPage = () => {
  const t = useTranslations();

  const formik = useFormik({
    initialValues: {
      paymentCard: {
        cardHolderName: "",
        cardNumber: "",
        expireMonth: "",
        expireYear: "",
        cvc: "",
      },
      buyer: {
        name: "",
        surname: "",
        gsmNumber: "",
        email: "",
        ip: "",
        identyNumber: "",
        lastLogin: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        registrationDate: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      },
      shoppingAddress: {
        address: "",
        city: "",
        country: "Turkey",
        zipCode: "",
      },

      billingAddress: {
        contactName: "",
        address: "",
        city: "",
        country: "Turkey",
        zipCode: "",
      },
    },

    validationSchema: paymentValidationSchema,
    onSubmit: (values) => {
      console.log("Ödeme Bilgileri:", values);
      formik.resetForm();
    },
  });

  console.log(formik.values);

  const [checked, setChecked] = useState(false);
  const months = Array.from({ length: 12 }, (_, i) => ({
    label: (i + 1).toString().padStart(2, "0"),
    value: (i + 1).toString().padStart(2, "0"),
  }));

  const years = Array.from({ length: 10 }, (_, i) => ({
    label: (new Date().getFullYear() + i).toString(),
    value: (new Date().getFullYear() + i).toString(),
  }));

  const carts = useSelector((state: RootState) => state.cart.carts);

  // Toplam fiyatı hesapla
  const totalPrice = carts.reduce((total, product) => {
    const discountedPrice =
      product.price - (product.price * product.discountPercent) / 100;
    return total + discountedPrice;
  }, 0);

  // Ekstra vergi
  const tax = 150;

  // Vergiyi ekleyerek toplam fiyatı hesapla
  const finalPrice = totalPrice + tax;

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-7xl bg-white  container mx-auto flex-col-reverse  flex md:flex-row justify-center items-start px-4 py-4 gap-4 my-5"
    >
      <div className="w-full  md:w-1/2 border rounded-lg px-4 md:px-4   py-1  ">
        <h2 className="text-3xl font-semibold text-center mb-6 mt-3  text-gray-800">
          Ödeme Sayfası
        </h2>

        <div className="space-y-6">
          {/* Kart Bilgileri */}
          <h3 className="text-xl font-semibold mb-3 text-gray-700">
            Kart Bilgileri
          </h3>
          <div className="flex flex-col gap-4">
            <label
              htmlFor="cardHolderName"
              className="text-sm font-medium text-gray-700"
            >
              Kart Sahibi
            </label>
            <InputText
              id="cardHolderName"
              placeholder="Kart Sahibi Adı Soyadı"
              className="w-full p-3 border rounded-md  focus:outline-none focus:ring-2 focus:ring-secondary"
              {...formik.getFieldProps("paymentCard.cardHolderName")}
            />
            {formik.errors.paymentCard?.cardHolderName &&
              formik.touched.paymentCard?.cardHolderName && (
                <div className="text-red-600 text-xs mt-1">
                  {formik.errors.paymentCard?.cardHolderName}
                </div>
              )}

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <div className=" w-full flex gap-3">
                <div className=" w-4/6">
                  <label
                    htmlFor="cardNumber"
                    className="text-sm font-medium text-gray-700"
                  >
                    Card Number
                  </label>
                  <InputMask
                    id="cardNumber"
                    mask="9999999999999999"
                    placeholder="Kart Numarası"
                    className="w-full p-3 border rounded-md  focus:outline-none focus:ring-2 focus:ring-secondary text-center md:text-start"
                    {...formik.getFieldProps("paymentCard.cardNumber")}
                  />
                  {formik.errors.paymentCard?.cardNumber &&
                    formik.touched.paymentCard?.cardNumber && (
                      <div className="text-red-600 text-xs mt-1">
                        {formik.errors.paymentCard?.cardNumber}
                      </div>
                    )}
                </div>
                <div className="w-2/6">
                  <label
                    htmlFor="paymentCard.cvc"
                    className="text-sm font-medium text-gray-700"
                  >
                    CVC
                  </label>
                  <InputMask
                    id="cvc"
                    mask="999"
                    placeholder="CVC"
                    className="w-full p-3 border rounded-md  focus:outline-none focus:ring-2 focus:ring-secondary text-center md:text-start"
                    {...formik.getFieldProps("paymentCard.cvc")}
                  />
                  {formik.errors.paymentCard?.cvc &&
                    formik.touched.paymentCard?.cvc && (
                      <div className="text-red-600 text-xs mt-1">
                        {formik.errors.paymentCard?.cvc}
                      </div>
                    )}
                </div>
              </div>
            </div>
            <div className=" flex flex-col justify-center w-full  gap-4">
              <p className="text-xs font-medium text-gray-700">
                Kart Son Kullanım Tarihi
              </p>
              <div className="flex gap-2 justify-between items-center">
                <div className="flex flex-col">
                  <label>Son Kullanma Ay</label>
                  <Dropdown
                    name="paymentCard.expireMonth"
                    options={months}
                    value={formik.values.paymentCard.expireMonth}
                    onChange={formik.handleChange}
                    placeholder="Ay seçiniz"
                    panelClassName="bg-white border-t"
                    className="w-full p-dropdown border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary p-1"
                  />
                  {formik.errors.paymentCard?.expireMonth &&
                    formik.touched.paymentCard?.expireMonth && (
                      <div className="text-red-600 text-xs mt-1">
                        {formik.errors.paymentCard?.expireMonth}
                      </div>
                    )}
                </div>

                <div className=" flex flex-col ">
                  <label>Son Kullanma Yıl</label>
                  <Dropdown
                    name="paymentCard.expireYear"
                    options={years}
                    value={formik.values.paymentCard.expireYear}
                    onChange={formik.handleChange}
                    placeholder="Yıl seçiniz"
                    panelClassName="bg-white border-t"
                    className="w-full p-dropdown border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary p-1"
                  />
                  {formik.errors.paymentCard?.expireYear &&
                    formik.touched.paymentCard?.expireYear && (
                      <div className="text-red-600 text-xs mt-1">
                        {formik.errors.paymentCard?.expireYear}
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>

          {/* Alıcı Bilgileri */}
          <h3 className="text-xl font-semibold mb-3 text-gray-700">
            Alıcı Bilgileri
          </h3>
          <div className="flex flex-col gap-6">
            <div className="flex flex-row gap-4 sm:gap-6">
              <div className="w-1/2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  İsim
                </label>
                <InputText
                  id="name"
                  placeholder="Ad"
                  className="w-full p-3 border rounded-md  focus:outline-none focus:ring-2 focus:ring-secondary"
                  {...formik.getFieldProps("buyer.name")}
                />
                {formik.errors.buyer?.name && formik.touched.buyer?.name && (
                  <div className="text-red-600 text-xs mt-1">
                    {formik.errors.buyer?.name}
                  </div>
                )}
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="surname"
                  className="text-sm font-medium text-gray-700"
                >
                  Soy isim
                </label>
                <InputText
                  id="surname"
                  placeholder="Soyad"
                  className="w-full p-3 border rounded-md  focus:outline-none focus:ring-2 focus:ring-secondary"
                  {...formik.getFieldProps("buyer.surname")}
                />
                {formik.errors.buyer?.surname &&
                  formik.touched.buyer?.surname && (
                    <div className="text-red-600 text-xs mt-1">
                      {formik.errors.buyer?.surname}
                    </div>
                  )}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <div className="w-full sm:w-1/2">
                <label
                  htmlFor="gsmNumber"
                  className="text-sm font-medium text-gray-700"
                >
                  Telefon
                </label>
                <InputMask
                  id="gsmNumber"
                  mask="9999999999"
                  placeholder="Telefon"
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                  value={formik.values.buyer?.gsmNumber}
                  onChange={(e) =>
                    formik.setFieldValue("buyer.gsmNumber", e.target.value)
                  } // Value'nun Formik'e set edilmesi
                />
                {formik.errors.buyer?.gsmNumber &&
                  formik.touched.buyer?.gsmNumber && (
                    <div className="text-red-600 text-xs mt-1">
                      {formik.errors.buyer?.gsmNumber}
                    </div>
                  )}
              </div>
              <div className="w-full sm:w-1/2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <InputText
                  id="email"
                  placeholder="E-Posta"
                  className="w-full p-3 border rounded-md  focus:outline-none focus:ring-2 focus:ring-secondary"
                  {...formik.getFieldProps("buyer.email")}
                />
                {formik.errors.buyer?.email && formik.touched.buyer?.email && (
                  <div className="text-red-600 text-xs mt-1">
                    {formik.errors.buyer?.email}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              {/* Posta Kodu Alanı */}
              <div className="w-full">
                <label
                  htmlFor="zipCode"
                  className="text-sm font-medium text-gray-700"
                >
                  Posta Kodu
                </label>
                <InputText
                  id="zipCode"
                  placeholder="Posta Kodu"
                  type="number"
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                  value={formik.values.shoppingAddress?.zipCode}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "shoppingAddress.zipCode",
                      e.target.value
                    )
                  }
                />
                {formik.errors.shoppingAddress?.zipCode &&
                  formik.touched.shoppingAddress?.zipCode && (
                    <div className="text-red-600 text-xs mt-1">
                      {formik.errors.shoppingAddress?.zipCode}
                    </div>
                  )}
              </div>

              {/* Şehir Seçme Alanı */}
              <div className="w-full">
                <label
                  htmlFor="city"
                  className="text-sm font-medium text-gray-700"
                >
                  Şehir Seç
                </label>
                <Dropdown
                  id="city"
                  name="city"
                  value={formik.values.shoppingAddress?.city}
                  onChange={(e) =>
                    formik.setFieldValue("shoppingAddress.city", e.value)
                  }
                  options={Cities}
                  placeholder="Şehir Seçin"
                  className="w-full p-dropdown border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary py-3 px-1"
                  panelClassName="bg-white border"
                />
                {formik.errors.shoppingAddress?.city &&
                  formik.touched.shoppingAddress?.city && (
                    <div className="text-red-600 text-xs mt-1">
                      {formik.errors.shoppingAddress?.city}
                    </div>
                  )}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="w-full">
                <label
                  htmlFor="address"
                  className="text-sm font-medium text-gray-700"
                >
                  Sipariş Adresi
                </label>
                <InputTextarea
                  id="address"
                  placeholder="Adres..."
                  rows={5}
                  cols={30}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                  value={formik.values.shoppingAddress?.address}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "shoppingAddress.address",
                      e.target.value
                    )
                  }
                  onBlur={formik.handleBlur}
                />

                {formik.errors.shoppingAddress?.address &&
                  formik.touched.shoppingAddress?.address && (
                    <div className="text-red-600 text-xs mt-1">
                      {formik.errors.shoppingAddress?.address}
                    </div>
                  )}
              </div>
              <div className="">
                <label
                  htmlFor="address"
                  className="text-sm font-medium text-gray-700"
                >
                  Faturamı Farklı Adrese Gönder
                </label>
                <Checkbox
                  onChange={(e) => {
                    const isChecked = e.target.checked;

                    if (!isChecked) {
                      formik.setFieldValue("billingAddress", {
                        ...formik.values.shoppingAddress,
                      });
                    } else {
                      formik.setFieldValue("billingAddress", {
                        contactName: formik.values.buyer.name,
                        address: "",
                        city: formik.values.shoppingAddress.city,
                        country: formik.values.shoppingAddress.country,
                        zipCode: formik.values.shoppingAddress.zipCode,
                      });
                    }

                    setChecked(isChecked);
                  }}
                  checked={checked}
                />
              </div>
              <div className={`${checked ? "relative" : " hidden"} `}>
                <InputTextarea
                  id="billingAddress"
                  placeholder="Fatura Adresi"
                  rows={5}
                  cols={30}
                  className="w-full p-3 border rounded-md  focus:outline-none focus:ring-2 focus:ring-secondary"
                  value={formik.values.billingAddress?.address}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "billingAddress.address",
                      e.target.value
                    )
                  }
                  onBlur={formik.handleBlur}
                />
                {formik.errors.billingAddress?.address &&
                  formik.touched.billingAddress.address && (
                    <div className="text-red-600 text-xs mt-1">
                      {formik.errors.billingAddress?.address}
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full  md:w-1/2">
        {!carts || carts.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            <div className="flex flex-col-reverse md:flex-col gap-5 w-full]">
              <div className="w-full max-h-72 md:max-h-96 overflow-y-auto border px-1 rounded-lg">
                {carts.map((cart) => {
                  const discountedPrice =
                    cart.price - (cart.price * cart.discountPercent) / 100;
                  return (
                    <div
                      key={cart.id}
                      className="flex flex-row justify-between items-start border-b border-gray-200 py-4 gap-4"
                    >
                      <div className="flex justify-center sm:justify-start">
                        <Image
                          src={cart.image}
                          alt={cart.name}
                          width={80}
                          height={80}
                          priority
                          className="rounded-md object-cover h-12 w-12"
                        />
                      </div>

                      <div className="w-full sm:w-3/4 flex flex-row justify-around items-center sm:items-start gap-2 sm:gap-5">
                        <h3 className="font-semibold text-xs text-gray-900">
                          {TextClip(cart.name)}
                        </h3>
                        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                          <p className="text-gray-500 text-xs">{cart.size}</p>
                          <p className="text-gray-500 text-xs">{cart.color}</p>
                        </div>
                        <div className="flex flex-col  items-center jsutif-center">
                          <p className="font-semibold text-gray-900 text-xs">
                            {discountedPrice}
                            {t("CartPage.cartPriceSymbol")}
                          </p>
                          <p className="text-gray-500 text-xs">
                            {cart.quantity} {t("CartPage.quantity")}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="w-full flex justify-center items-center">
                <div className=" w-full px-4  md:px-10  bg-gray-50 border border-gray-200 rounded-lg">
                  {/* Heading and Close button */}
                  <Heading
                    text={t("CartPage.cartSummary.title")}
                    font="bold"
                    textSize="2xl"
                  />
                  <div className="w-full flex flex-col gap-2 mt-4   ">
                    {/* Kargo */}
                    <div className="flex justify-between items-center  rounded-md">
                      <span className="text-sm font-bold">
                        {t("CartPage.cartSummary.shipping")}
                      </span>
                      <span className="text-sm font-semibold text-primary">
                        {t("CartPage.cartSummary.freeShipping")}
                      </span>
                    </div>

                    {/* Vergi */}
                    <div className="flex justify-between items-center  rounded-md">
                      <span className="text-sm font-bold">
                        {t("CartPage.cartSummary.tax")}
                      </span>
                      <span className="text-sm font-semibold text-primary">
                        {finalPrice} {t("CartPage.cartSummary.symbol")}
                      </span>
                    </div>

                    {/* Toplam */}
                    <div className="flex justify-between items-center  rounded-md">
                      <span className="text-sm font-bold">
                        {t("CartPage.cartSummary.total")}
                      </span>
                      <span className="text-sm font-semibold text-primary">
                        {tax}
                        {t("CartPage.cartSummary.symbol")}
                      </span>
                    </div>
                  </div>

                  {/* Buttons and Input */}
                  <div className="flex flex-col items-center justify-center w-full mt-2 gap-2 ">
                    <div className="w-full flex justify-center items-center gap-4">
                      <InputText
                        id="discountCode"
                        name="discountCode"
                        placeholder={t(
                          "CartPage.cartSummary.discountCodePlaceholder"
                        )}
                        className="p-inputtext w-1/2 px-3 py-2 border rounded-lg outline-primary"
                      />

                      <Button
                        type="submit"
                        label={t("CartPage.cartSummary.submitDiscountCode")}
                        className="p-button  w-1/2  text-sm bg-primary text-white px-3 py-1  rounded-lg transition-all duration-300 hover:scale-105 h-8"
                      />
                    </div>

                    <div className=" flex flex-row w-full justify-center items-center gap-2 mb-3 mt-2">
                      <Button
                        label={t("CartPage.cartSummary.continueShopping")}
                        color="primary"
                        size="large"
                        onClick={() => {}}
                        icon={"FaArrowRightLong"}
                        className="w-full  text-sm bg-primary text-white px-3 py-1  rounded-lg transition-all duration-300 hover:scale-105 h-8"
                      />

                      <Button
                        type="submit"
                        label={t("CartPage.cartSummary.proceedToPayment")}
                        color="primary"
                        size="large"
                        icon="FaRegCreditCard"
                        className="w-full  text-sm bg-primary text-white px-3 py-1  rounded-lg transition-all duration-300 hover:scale-105 h-8"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </form>
  );
};

export default PaymentPage;

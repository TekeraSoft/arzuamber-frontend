import * as Yup from "yup";
import { useTranslations } from "next-intl";

export const usePaymentValidationSchema = () => {
  const t = useTranslations("paymentForm");

  return Yup.object({
    paymentCard: Yup.object({
      cardHolderName: Yup.string().required(t("paymentCard.cardHolderName")),
      cardNumber: Yup.string()
          .matches(/^[0-9]{16}$/, t("paymentCard.cardNumber"))
          .required(t("paymentCard.cardNumberRequired")),
      expireMonth: Yup.number()
          .min(1, t("paymentCard.expireMonth.min"))
          .max(12, t("paymentCard.expireMonth.max"))
          .required(t("paymentCard.expireMonth.required")),
      expireYear: Yup.number()
          .min(new Date().getFullYear(), t("paymentCard.expireYear.min"))
          .required(t("paymentCard.expireYear.required")),
      cvc: Yup.string()
          .matches(/^[0-9]{3}$/, t("paymentCard.cvc"))
          .required(t("paymentCard.cvcRequired")),
    }),
    buyer: Yup.object({
      name: Yup.string().required(t("buyer.name")),
      surname: Yup.string().required(t("buyer.surname")),
      gsmNumber: Yup.string().required(t("buyer.gsmNumber")),
      email: Yup.string()
          .email(t("buyer.email.email"))
          .required(t("buyer.email.required")),
      ip: Yup.string().nullable(),
      identyNumber: Yup.string().nullable(),
      lastLogin: Yup.string().nullable(),
      registrationDate: Yup.string().nullable(),
    }),
    shippingAddress: Yup.object({
      address: Yup.string()
          .required(t("shippingAddress.address"))
          .min(10, t("shippingAddress.addressMin"))
          .max(200, t("shippingAddress.addressMax")),
      city: Yup.string().required(t("shippingAddress.city")),
      country: Yup.string().required(t("shippingAddress.country")),
      zipCode: Yup.number()
          .min(10000, t("shippingAddress.zipCodeMin"))
          .max(99999, t("shippingAddress.zipCodeMax"))
          .required(t("shippingAddress.zipCodeRequired")),
    }),
    billingAddress: Yup.object({
      contactName: Yup.string().required(t("billingAddress.contactName")),
      address: Yup.string()
          .required(t("billingAddress.address"))
          .min(10, t("billingAddress.addressMin"))
          .max(200, t("billingAddress.addressMax")),
      city: Yup.string().required(t("billingAddress.city")),
      country: Yup.string().required(t("billingAddress.country")),
      zipCode: Yup.number()
          .min(10000, t("billingAddress.zipCodeMin"))
          .max(99999, t("billingAddress.zipCodeMax"))
          .required(t("billingAddress.zipCodeRequired")),
    }),
  });
};
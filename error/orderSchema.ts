import * as yup from "yup";
import { useTranslations } from "next-intl";

export const useOrderValidationSchema = (openBillingAddress) => {
  const t = useTranslations();

  return yup.object().shape({
    paymentCard: yup.object().shape({
      cardHolderName: yup
          .string()
          .required(t("paymentForm.paymentCard.cardHolderName")),
      cardNumber: yup
          .string()
          .required(t("paymentForm.paymentCard.cardNumber")),
      expireMonth: yup
          .string()
          .required(t("paymentForm.paymentCard.expireMonth.required")),
      expireYear: yup
          .string()
          .required(t("paymentForm.paymentCard.expireYear.required")),
      cvc: yup.string().required(t("paymentForm.paymentCard.cvcRequired")),
    }),
    buyer: yup.object({
      name: yup.string().required(t("paymentForm.buyer.name")),
      surname: yup.string().required(t("paymentForm.buyer.surname")),
      gsmNumber: yup.string().required(t("paymentForm.buyer.gsmNumber")),
      email: yup
          .string()
          .email(t("paymentForm.buyer.email.email"))
          .required(t("paymentForm.buyer.email.required")),
    }),
    shippingAddress: yup.object({
      city: yup.string().required(t("paymentForm.shippingAddress.city")),
      state: yup.string().required(t("paymentForm.shippingAddress.district")),
      address: yup.string().required(t("paymentForm.shippingAddress.address")),
      street: yup
          .string()
          .required(t("paymentForm.shippingAddress.Neighbourhood")),
    }),
    ...(openBillingAddress
        ? {
          billingAddress: yup.object({
            city: yup.string().required(t("paymentForm.shippingAddress.city")),
            state: yup.string().required(t("paymentForm.shippingAddress.district")),
            address: yup.string().required(t("paymentForm.shippingAddress.address")),
            street: yup
                .string()
                .required(t("paymentForm.shippingAddress.Neighbourhood")),
          }),
        }
        : {}),
  });
};
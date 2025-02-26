import * as yup from "yup";
import { useTranslations } from "next-intl";

export const useOrderValidationSchema = () => {
  const t = useTranslations("paymentForm");

  return yup.object().shape({
    cardHolderName: yup.string().required(t("paymentCard.cardHolderName")),
    cardNumber: yup
      .string()
      .length(16, t("paymentCard.cardNumber"))
      .required(t("paymentCard.cardNumber")),
    expireMonth: yup
      .string()
      .min(2)
      .max(2)
      .required(t("paymentCard.expireMonth.required")),
    expireYear: yup
      .string()
      .min(2)
      .max(2)
      .required(t("paymentCard.expireYear.required")),
    cvc: yup.string().required(t("paymentCard.cvcRequired")),

    buyer: yup.object({
      name: yup.string().required(t("buyer.name")),
      surname: yup.string().required(t("buyer.surname")),
      gsmNumber: yup.string().required(t("buyer.gsmNumber")),
      email: yup
        .string()
        .email(t("buyer.email.email"))
        .required(t("buyer.email.required")),
    }),
    shippingAddress: yup.object({
      city: yup.string().required(t("shippingAddress.city")),
      state: yup.string().required(t("shippingAddress.district")),
      address: yup.string().required(t("shippingAddress.address")),
      street: yup.string().required(t("shippingAddress.Neighbourhood")),
    }),
  });
};

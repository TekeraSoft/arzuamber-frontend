import * as Yup from "yup";

export const paymentValidationSchema = Yup.object({
  paymentCard: Yup.object({
    cardHolderName: Yup.string().required("Kart sahibi adı gerekli"),
    cardNumber: Yup.string()
      .matches(/^[0-9]{16}$/, "Geçerli bir kart numarası girin")
      .required("Kart numarası gerekli"),
    expireMonth: Yup.number()
      .min(1, "Son kullanma ayı 1'den küçük olamaz")
      .max(12, "Son kullanma ayı 12'yi geçemez")
      .required("Son kullanma ayı gerekli"),
    expireYear: Yup.number()
      .min(new Date().getFullYear(), "Geçerli bir yıl girin")
      .required("Son kullanma yılı gerekli"),
    cvc: Yup.string()
      .matches(/^[0-9]{3}$/, "Geçerli bir CVC girin")
      .required("CVC gerekli"),
  }),
  buyer: Yup.object({
    name: Yup.string().required("Ad gerekli"),
    surname: Yup.string().required("Soyad gerekli"),
    gsmNumber: Yup.string().required("Telefon numarası gerekli"),
    email: Yup.string()
      .email("Geçerli bir e-posta girin")
      .required("E-posta gerekli"),
    ip: Yup.string().nullable(),
    identyNumber: Yup.string().nullable(),
    lastLogin: Yup.string().nullable(),
    registrationDate: Yup.string().nullable(),
  }),
  shoppingAddress: Yup.object({
    address: Yup.string()
      .required("Adres alanı boş bırakılamaz")
      .min(10, "Adres en az 10 karakter olmalı")
      .max(200, "Adres en fazla 200 karakter olabilir"),
    city: Yup.string().required("Şehir gerekli"),
    country: Yup.string().required("Ülke gerekli"),
    zipCode: Yup.number()
      .min(10000, "Posta kodu en az 5 haneli olmalıdır")
      .max(99999, "Posta kodu en fazla 5 haneli olabilir")
      .required("Posta Kodu gerekli"),
  }),
  billingAddress: Yup.object({
    contactName: Yup.string().required("İletişim adı gerekli"),
    address: Yup.string()
      .required("Fatura adresi boş bırakılamaz")
      .min(10, "Adres en az 10 karakter olmalı")
      .max(200, "Adres en fazla 200 karakter olabilir"),
    city: Yup.string().required("Şehir gerekli"),
    country: Yup.string().required("Ülke gerekli"),
    zipCode: Yup.number()
      .min(10000, "Posta kodu en az 5 haneli olmalıdır")
      .max(99999, "Posta kodu en fazla 5 haneli olabilir")
      .required("Posta Kodu gerekli"),
  }),
});

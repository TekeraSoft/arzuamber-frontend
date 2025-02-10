import * as yup from "yup";
import {getCookie} from "cookies-next";
import {translations} from "@/utils/translations/formErrorTranslations";

const currentLang = getCookie("NEXT-LOCALE");

const createUserSchema = yup.object().shape({
    name: yup.string().required(translations[currentLang]?.required),
    surname: yup.string().required(translations[currentLang]?.required),
    email: yup.string().email().required(translations[currentLang]?.required),
    password: yup.string().required(translations[currentLang]?.required),
    rePassword: yup.string()
        .oneOf([yup.ref('password'), null], translations[currentLang]?.passwordMatch)
        .required(translations[currentLang]?.required),
})
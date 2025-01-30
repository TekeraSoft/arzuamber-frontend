import axios from "axios";
import { getCookie } from "cookies-next";
import { RequestOptions } from "@/types/index";

axios.defaults.withCredentials = true;

export const getGuardRequest = async (
  requestParameter = RequestParameter,
  id?: string
) => {
  const lang = getCookie("NEXT_LOCALE");
  const url = `${process.env.NEXT_PUBLIC_BACKEND_API}/${
    requestParameter.controller
  }${requestParameter.action ? `/${requestParameter.action}` : ""}${
    id ? `/${id}` : ""
  }`;
  return await axios.get(url, {
    params: { ...requestParameter.params, lang: lang },
  });
};

export const getRequest = async (requestParameter = RequestParameter) => {
  const locale = getCookie("NEXT_LOCALE");
  const url = `${process.env.NEXT_PUBLIC_BACKEND_API}/${
    requestParameter.controller
  }${requestParameter.action ? `/${requestParameter.action}` : ""}${
    requestParameter.id ? `/${requestParameter.id}` : ""
  }`;
  return await axios.get(url, {
    params: { ...requestParameter.params, lang: locale },
  });
};

export const getGuardParamsRequest = async (
  requestParameter = RequestParameter
) => {
  const locale = getCookie("NEXT_LOCALE");
  const url = `${process.env.NEXT_PUBLIC_BACKEND_API}/${
    requestParameter.controller
  }${requestParameter.action ? `/${requestParameter.action}` : ""}${
    requestParameter.id ? `/${requestParameter.id}` : ""
  }`;
  return await axios.get(url, {
    params: { ...requestParameter.params, lang: locale },
  });
};

export const postGuardRequest = async (
  requestParameter = RequestParameter,
  body: object
) => {
  const locale = getCookie("NEXT_LOCALE");
  const url = `${process.env.NEXT_PUBLIC_BACKEND_API}/${
    requestParameter.controller
  }${requestParameter.action ? `/${requestParameter.action}` : ""}${
    requestParameter.id ? `/${requestParameter.id}` : ""
  }`;
  return await axios.post(url, body, {
    params: { ...requestParameter.params, lang: locale },
  });
};

const RequestParameter: RequestOptions = {
  id: "",
  controller: "",
  action: "",
  lang: "",
  params: Object,
};

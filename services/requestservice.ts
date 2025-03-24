import axios from "axios";
import { getCookie } from "cookies-next";
import { RequestOptions } from "@/types";

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

export const patchRequest = async (requestParameter = RequestParameter,body:object) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_API}/${
      requestParameter.controller
  }${requestParameter.action ? `/${requestParameter.action}` : ""}${
      requestParameter.id ? `/${requestParameter.id}` : ""
  }`;
  return await axios.patch(url, body,{
    params: { ...requestParameter.params },
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

export const putGuardRequest = async (
    requestParameter = RequestParameter,
    body: object
) => {
  const locale = getCookie("NEXT_LOCALE");
  let url = `${process.env.NEXT_PUBLIC_BACKEND_API}/${requestParameter.controller}${
      requestParameter.action ? `/${requestParameter.action}` : ""
  }`;
  return await axios.put(url, body, {
    params: { ...requestParameter.params, lang: locale }
  });
};

export const deleteGuardRequest = async (
    requestParameter = RequestParameter,
) => {
  let url = `${process.env.NEXT_PUBLIC_BACKEND_API}/${requestParameter.controller}${
      requestParameter.action ? `/${requestParameter.action}` : ""
  }`;
  return await axios.delete(url, {
    params: {...requestParameter.params}
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

export const postGuardRequestMultipart = async (
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
    headers: { "Content-Type": "multipart/form-data" }
  });
};

const RequestParameter: RequestOptions = {
  id: "",
  controller: "",
  action: "",
  lang: "",
  params: Object,
};
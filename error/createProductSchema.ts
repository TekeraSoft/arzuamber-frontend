import * as yup from "yup";

export const createProductSchema = yup.object().shape({
    name: yup.string().required(),
    price: yup.number().required(),
    description: yup.string().required(),
    populate: yup.string().required(),
    category: yup.string().required(),
    subCategory: yup.string().required(),
})
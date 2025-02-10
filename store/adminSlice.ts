import { createSlice } from "@reduxjs/toolkit";
import {Product, ProductProps} from "@/types";
import {getGuardRequest, getRequest, postGuardRequest} from "@/services/requestservice";
import {toast} from "react-toastify";
import {Dispatch} from "react";

const initialState: ProductProps = {
    products: [],
    product: null,
    categories: []
}

export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        getProducts: (state, action) => {
            state.products = action.payload;
        },
        getProduct: (state, action) => {
            state.products = action.payload;
        },
        getCategories: (state, action) => {
            state.categories = action.payload;
        }
    }
})

export const createProductDispatch = (formData: FormData,resetForm:()=> void) => async(dispatch) => {
    postGuardRequest({controller:'admin',action: 'create-product'}, formData).then((res)=> {
        toast.success(res.data.message);
        resetForm()
    }).catch(err => {
        toast.error(err.response.data.message);
    })
}

export const getAllProductDispatch = (page: number, size: number) => async(dispatch:Dispatch) => {
    getGuardRequest({controller:'admin',action:'get-all-product', params:{page: page, size: size}}).then(res=>{
        dispatch(getProducts(res.data))
    })
}

export const createCategoryDispatch = (value: object) => async(dispatch) => {
    postGuardRequest({controller:'admin',action: 'create-category'}, value).then((res)=> {
        dispatch(res.data.message)
    })
}

export const getCategoriesDispatch = () => async (dispatch) => {
    getRequest({controller:'admin', action:'get-all-category'}).then(res=> {
        dispatch(getCategories(res.data))
    })
}

//export const getProductsDispatch = (page:number,size:number) => async(dispatch) => {
//    getGuardRequest({})
//}

export const { getProducts, getProduct ,getCategories} = adminSlice.actions;
export default adminSlice.reducer;
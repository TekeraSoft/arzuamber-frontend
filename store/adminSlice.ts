import { createSlice } from "@reduxjs/toolkit";
import {Product, ProductProps} from "@/types";
import {
    deleteGuardRequest,
    getGuardRequest,
    getRequest, patchRequest,
    postGuardRequest,
    putGuardRequest
} from "@/services/requestservice";
import {toast} from "react-toastify";
import {Dispatch} from "react";
import {setTimeout} from "next/dist/compiled/@edge-runtime/primitives";

const initialState: ProductProps = {
    products: [],
    product: null,
    categories: [],
    page: {},
    loading: false,
}

export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        getProducts: (state, action) => {
            state.products = action.payload._embedded.productDtoes;
            state.page = action.payload.page;
        },
        getProduct: (state, action) => {
            state.product = action.payload;
        },
        getCategories: (state, action) => {
            state.categories = action.payload;
        },
        deleteProduct: (state, action) => {
            state.products = state.products.filter((item) => item.id !== action.payload);
        },
        loading: (state, action) => {
            state.loading = action.payload;
        }
    }
})

export const createProductDispatch = (formData: FormData,resetForm:()=> void) => async(dispatch) => {
    postGuardRequest({controller:'admin',action: 'create-product'}, formData).then((res)=> {
        toast.success(res.data.message);
        resetForm()
    }).catch(err => {
        toast.error(err.response.data);
    })
}

export const updateProductDispatch = (formData: FormData) => async(dispatch) => {
    dispatch(loading(true))
    putGuardRequest({controller:'admin',action: 'update-product'}, formData).then((res) => {
        dispatch(loading(false))
        toast.success(res.data.message);
    }).catch(err => {
        dispatch(loading(false))
        toast.error(err.response.data);
    }).finally(()=> {
        dispatch(loading(false))
    })
}

export const updateActiveDispatch = (id,active) => async(dispatch) => {
    dispatch(loading(true))
    patchRequest({controller:'admin', action: 'update-product-active', params:{productId: id,active: active}})
        .then((res)=> {
            location.reload()
        toast.success(res.data.message);
        dispatch(loading(false))
    }).catch(err => {
        dispatch(loading(false))
        console.log("Axios Request Hatası:", err.config.url);
        toast.error(err.response.data);
    })
}

export const getAllProductDispatch = (page: number, size: number) => async(dispatch) => {
    dispatch(loading(true))
    getGuardRequest({controller:'admin',action:'get-all-product', params:{page: page, size: size}}).then(res=>{
        dispatch(getProducts(res.data))
        dispatch(loading(false))
    }).finally(()=> {
        dispatch(loading(false))
    })
}

export const getProductDispatch = (id: string) => async(dispatch) => {
    dispatch(loading(true))
    getGuardRequest({controller:'admin', action: 'get-product', params: {id: id}}).then(res=> {
        dispatch(getProduct(res.data))
        dispatch(loading(false))
    }).catch(err=> {
      toast.error(err.response.data);
    }).finally(()=> {
        dispatch(loading(false))
    })
}

export const deleteProductDispatch = (id:string) => async(dispatch) => {
    dispatch(loading(true))
    deleteGuardRequest({controller:'admin',action:'delete-product',params:{id: id}}).then(res=>{
        toast.success(res.data.message);
        dispatch(deleteProduct(id))
        dispatch(loading(false))
    }).catch(err => {
        toast.error(err.response.data.message);
    })
        .finally(()=> {
        dispatch(loading(false))
    })
}

export const createCategoryDispatch = (value: object) => async(dispatch) => {
    dispatch(loading(true))
    postGuardRequest({controller:'admin',action: 'create-category'}, value).then((res)=> {
        dispatch(loading(false))
       toast.success(res.data.message);
    }).catch(err => {
        dispatch(loading(false))
        toast.error(err.response.data);
    }).finally(()=> {
        dispatch(loading(false))
    })
}

export const getCategoriesDispatch = () => async (dispatch) => {
    dispatch(loading(true))
    getRequest({controller:'admin', action:'get-all-category'}).then(res=> {
        dispatch(getCategories(res.data))
        dispatch(loading(false))
    }).catch(err => {
        toast.error(err.response.data.message);
        dispatch(loading(false))
    }).finally(()=> {
        dispatch(loading(false))
    })
}

export const updatePriceByPercentageDispatch = (updatedValue: Number) => async(dispatch) => {
    putGuardRequest({controller:'admin',action:'update-price-by-percentage'},{percentage: updatedValue}).then(res=> {
        dispatch(loading(true))
        dispatch(getAllProductDispatch(0,10))
        toast.success(res.data.message)
    }).catch(err => {
        dispatch(loading(false))
        toast.error(err.response.data)
    }).finally(()=> {
        dispatch(loading(false))
    })
}

//export const getProductsDispatch = (page:number,size:number) => async(dispatch) => {
//    getGuardRequest({})
//}

export const {
    loading,
    deleteProduct,
    getProducts,
    getProduct ,
    getCategories} = adminSlice.actions;
export default adminSlice.reducer;
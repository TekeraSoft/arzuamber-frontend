import { createSlice } from "@reduxjs/toolkit";
import {Product} from "@/types";
import {getGuardRequest} from "@/services/requestservice";


// Sepet Tipi
export interface CartState {
  products: Product[];
  newSeasonProducts: Product[];
  populateProducts: Product[];
  filterProducts: Product[];
  product: Product |null;
  page: {}
  loading: boolean;
}

const initialState: CartState = {
  products: [],
  newSeasonProducts: [],
  populateProducts: [],
  filterProducts: [],
  page: {},
  product: null,
  loading: false
}

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getNewSeasonProducts: (state,action) => {
      state.newSeasonProducts = action.payload;
    },
    getPopulateProducts: (state,action) => {
      state.populateProducts = action.payload;
    },
    getProducts: (state, action) => {
      state.products = action.payload._embedded.productDtoes;
      state.page = action.payload.page;
    },
    getProduct: (state, action) => {
      state.product = action.payload;
    },
    getFilterProducts: (state, action) => {
      state.filterProducts = action.payload._embedded.productDtoes;
      state.page = action.payload.page;
    },
    loading: (state,action) => {
      state.loading = action.payload;
    }
  },
});

export const getNewSeasonProductsDispatch = (page: number, size: number) => async(dispatch) => {
  dispatch(loading(true))
  getGuardRequest({controller:'product',action: 'get-all-new-season',params: {page:page, size:size}}).then(res=> {
    dispatch(getNewSeasonProducts(res.data))
    dispatch(loading(false))
  }).finally(()=> {
    dispatch(loading(false))
  })
}

export const getPopulateProductsDispatch = (page: number, size: number) => async(dispatch) => {
  dispatch(loading(true))
  getGuardRequest({controller:'product',action: 'get-all-populate',params: {page:page, size:size}}).then(res=> {
    dispatch(getPopulateProducts(res.data))
    dispatch(loading(false))
  }).finally(()=> {
    dispatch(loading(false))
  })
}

export const getAllProductsDispatch = (page: number, size: number) => async(dispatch) => {
  dispatch(loading(true))
  getGuardRequest({controller:'product', action: 'products',params:{page:page, size:size}}).then(res=> {
    dispatch(getProducts(res.data))
    dispatch(loading(false))
  }).finally(()=> {
    dispatch(loading(false))
  })
}

export const getProductBySlugDispatch = (slug: string) => async(dispatch) => {
  dispatch(loading(true))
  getGuardRequest({controller:'product',action: 'get-product',params: {slug: slug}}).then(res=> {
    dispatch(getProduct(res.data))
    dispatch(loading(false))
  }).finally(()=> {
    dispatch(loading(false))
  })
}

export const filterProductDispatch = (params: object) => async(dispatch) => {
  dispatch(loading(true))
  getGuardRequest({controller:'product', action:'filter-product',params: {
    size: params.size,
      color: params.color,
      category: params.category,
      length: params.length,
      page:params.page,
      pageSize: params.pageSize }}).then(res=> {
    dispatch(getFilterProducts(res.data))
    dispatch(loading(false))
  }).finally(()=> {
    dispatch(loading(false))
  })
}

// Reducer'ları dışa aktarma
export const {
  loading,
  getProducts,
  getNewSeasonProducts,
  getProduct,
  getFilterProducts,
  getPopulateProducts} = productSlice.actions;

export default productSlice.reducer;

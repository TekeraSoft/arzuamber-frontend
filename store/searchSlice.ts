import { createSlice } from "@reduxjs/toolkit";
import {getGuardRequest} from "@/services/requestservice";

const searchSlice = createSlice({
    name: "search",
    initialState: {
        searchProducts: [],
        loading: false,
    },
    reducers: {
        getSearchProducts: (state, action) => {
            state.searchProducts = action.payload;
        },
        clearState: (state, action) => {
            state.searchProducts = [];
        },
        loading: (state, action) => {
            state.loading = action.payload;
        }
    }
})

export const searchProductsDispatch = (searchTerm:string) => async(dispatch) => {
    dispatch(loading(true))
    getGuardRequest({controller:'product',action:'search-products',params:{searchTerm:searchTerm}}).then(res=> {
        dispatch(loading(false))
        dispatch(getSearchProducts(res.data))
    }).catch(err=> {
        dispatch(loading(false))
    })
}

export const {getSearchProducts, clearState,loading} = searchSlice.actions;
export default searchSlice.reducer;
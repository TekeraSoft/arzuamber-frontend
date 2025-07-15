import {createSlice} from "@reduxjs/toolkit";
import {
    deleteGuardRequest,
    getGuardRequest,
    getTekeraGuardRequest,
    postGuardRequest,
    putGuardRequest
} from "@/services/requestservice";
import {toast} from "react-toastify";

export const fashionCollectionSlice = createSlice({
    name: "fashionCollection",
    initialState: {
        collections: [],
        collection: [],
        loading: false,
    },
    reducers: {
        setCollections: (state, action) => {
            state.collections = action.payload;
        },
        setCollection: (state, action) => {
            state.collection = action.payload;
        },
        loading(state, action) {
            state.loading = action.payload;
        }
    }
})

export const getAllFashionCollectionDispatch = (page: number, size: number) => async (dispatch) => {
    dispatch(loading(true));
    getTekeraGuardRequest({controller: 'fashion-collection', action: 'getFashionCollectionsByCompany',
        params: { page, size, companyId: process.env.NEXT_PUBLIC_COMPANY_ID }})
        .then(res => {
        dispatch(setCollections(res?.data));
        dispatch(loading(false));
    }).catch(e => {
        toast.error(e?.response?.data);
        dispatch(loading(false))
    })
}

export const getFashionCollectionDispatch = (id: string) => async (dispatch) => {
    dispatch(loading(true))
    getTekeraGuardRequest({controller: 'fashion-collection', action: 'getFashionCollection', params: { id:id }}).then(res => {
        dispatch(setCollection(res?.data));
        dispatch(loading(false));
    }).catch(e => {
        toast.error(e?.response?.data);
    })
}


export const {setCollections,setCollection, loading} = fashionCollectionSlice.actions
export default fashionCollectionSlice.reducer;
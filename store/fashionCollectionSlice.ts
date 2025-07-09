import {createSlice} from "@reduxjs/toolkit";
import {deleteGuardRequest, getGuardRequest, postGuardRequest, putGuardRequest} from "@/services/requestservice";
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
    getGuardRequest({controller: 'super-admin', action: 'getAllFashionCollection', params: { page, size }}).then(res => {
        dispatch(setCollections(res?.data));
        dispatch(loading(false));
    }).catch(e => {
        toast.error(e?.response?.data);
        dispatch(loading(false))
    })
}

export const getFashionCollectionDispatch = (id: string) => async (dispatch) => {
    dispatch(loading(true))
    getGuardRequest({controller: 'super-admin', action: 'getFashionCollection', params: { id:id }}).then(res => {
        dispatch(setCollection(res?.data));
    })
}

export const createFashionCollectionDispatch = (body: any) => async (dispatch) => {
    dispatch(loading(true))
    postGuardRequest({controller:'super-admin',action:'createFashionCollection'},body).then(res => {
        dispatch(loading(false))
        toast.success(res?.data?.message);
    }).catch(err => {
        dispatch(loading(false));
        toast.error(err?.response?.data);
    }).finally(() => {
        dispatch(loading(false));
    })
}

export const updateFashionCollectionDispatch = (body: any) => async (dispatch) => {
    dispatch(loading(true))
    putGuardRequest({controller: 'super-admin', action:'updateFashionCollection'}, body).then(res => {
        dispatch(loading(false))
        toast.success(res?.data?.message);
    }).catch(err => {
        dispatch(loading(false));
        toast.error(err?.response?.data);
    }).finally(() => {
        dispatch(loading(false));
    })
}

export const deleteFashionCollectionDispatch = (id: string) => async (dispatch) => {
    dispatch(loading(true))
    deleteGuardRequest({controller:'super-admin',action:'deleteFashionCollection'}).then(res => {
        dispatch(loading(false))
        toast.success(res?.data?.message);
    }).catch(err => {
        dispatch(loading(false));
        toast.error(err?.response?.data);
    }).finally(() => {
        dispatch(loading(false));
    })
}


export const {setCollections,setCollection, loading} = fashionCollectionSlice.actions
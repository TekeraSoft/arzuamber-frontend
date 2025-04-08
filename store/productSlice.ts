import { createSlice } from "@reduxjs/toolkit";
import { Product } from "@/types";
import { getGuardRequest, postGuardRequest } from "@/services/requestservice";
import { toast } from "react-toastify";
import { comments } from "@/constans/Comment";

export interface Comment {
  id: string;
  text: string;
  createdAt: string;
  productImages?: string[];
  rating?: number;
  author: {
    name: string;
    email: string;
  };
}

export interface CartState {
  products: Product[];
  newSeasonProducts: Product[];
  populateProducts: Product[];
  filterProducts: Product[];
  product: Product | null;
  page: object;
  loading: boolean;
  colors: [];
  comments: Comment[];
  FilteredProductsOnly: boolean;
}

const initialState: CartState = {
  products: [],
  newSeasonProducts: [],
  populateProducts: [],
  filterProducts: [],
  page: {},
  product: null,
  loading: false,
  colors: [],
  comments: [],
  FilteredProductsOnly: false,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getNewSeasonProducts: (state, action) => {
      state.newSeasonProducts = action.payload;
    },
    getProductComments: (state, action) => {
      state.comments = action.payload;
    },
    getPopulateProducts: (state, action) => {
      state.populateProducts = action.payload;
    },
    getProducts: (state, action) => {
      state.products = action.payload._embedded?.productDtoes;
      state.page = action.payload.page;
    },
    getProduct: (state, action) => {
      state.product = action.payload;
    },
    getFilterProducts: (state, action) => {
      state.filterProducts = action.payload._embedded?.productDtoes;
      state.page = action.payload.page;
    },
    getColors: (state, action) => {
      state.colors = action.payload;
    },
    setFilteredProductsOnly: (state, action) => {
      state.FilteredProductsOnly = action.payload;
    },
    loading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const createCommentDispatch = (values) => async (dispatch) => {
  try {
    dispatch(loading(true));

    const res = await postGuardRequest({
      controller: "product",
      action: "create-comment",
      params: { ...values },
    });

    toast.success(res.data?.message);
  } catch (err) {
    toast.error(err.response?.data || "Bir hata oluştu.");
  } finally {
    dispatch(loading(false));
  }
};

export const getProductCommentsDispatch = (id: string) => async (dispatch) => {
  // dispatch(loading(true));
  getGuardRequest({
    controller: "product",
    action: "get-product-comment",
    params: { id },
  })
    .then((res) => {
      dispatch(getProductComments(res.data));
      dispatch(loading(false));
    })
    .catch((err) => {
      dispatch(loading(false));
      console.log(err);
    })
    .finally(() => {
      dispatch(loading(false));
    });
};

export const getNewSeasonProductsDispatch =
  (page: number, size: number) => async (dispatch) => {
    dispatch(loading(true));
    getGuardRequest({
      controller: "product",
      action: "get-all-new-season",
      params: { page: page, size: size },
    })
      .then((res) => {
        dispatch(getNewSeasonProducts(res.data));
        dispatch(loading(false));
      })
      .finally(() => {
        dispatch(loading(false));
      });
  };

export const getPopulateProductsDispatch =
  (page: number, size: number) => async (dispatch) => {
    dispatch(loading(true));
    getGuardRequest({
      controller: "product",
      action: "get-all-populate",
      params: { page: page, size: size },
    })
      .then((res) => {
        dispatch(getPopulateProducts(res.data));
        dispatch(loading(false));
      })
      .finally(() => {
        dispatch(loading(false));
      });
  };

export const getAllProductsDispatch =
  (page: number, size: number) => async (dispatch) => {
    dispatch(loading(true));
    getGuardRequest({
      controller: "product",
      action: "products",
      params: { page: page, size: size },
    })
      .then((res) => {
        dispatch(getProducts(res.data));
        dispatch(loading(false));
      })
      .finally(() => {
        dispatch(loading(false));
      });
  };

export const getProductBySlugDispatch = (slug: string) => async (dispatch) => {
  dispatch(loading(true));
  getGuardRequest({
    controller: "product",
    action: "get-product",
    params: { slug: slug },
  })
    .then((res) => {
      dispatch(getProduct(res.data));
      dispatch(loading(false));
    })
    .finally(() => {
      dispatch(loading(false));
    });
};

export const filterProductDispatch = (params: object) => async (dispatch) => {
  dispatch(loading(true));
  getGuardRequest({
    controller: "product",
    action: "filter-product",
    params: {
      size: params.size,
      color: params.color,
      category: params.category,
      subcategory: params.subcategory,
      length: params.length,
      sortDirection: params.sortDirection,
      onlyDiscounted: params.onlyDiscounted,
      page: params.page,
      pageSize: params.pageSize,
    },
  })
    .then((res) => {
      dispatch(getFilterProducts(res.data));
      dispatch(loading(false));
    })
    .catch(() => {
      dispatch(loading(false));
    })
    .finally(() => {
      dispatch(loading(false));
    });
};

export const getAllColorsDispatch = () => async (dispatch) => {
  dispatch(loading(true));
  getGuardRequest({ controller: "product", action: "get-all-colors" })
    .then((res) => {
      dispatch(loading(false));
      dispatch(getColors(res.data));
    })
    .catch((err) => {
      dispatch(loading(false));
      toast.error(err.response.data);
    });
};

// Reducer'ları dışa aktarma
export const {
  loading,
  getProducts,
  getNewSeasonProducts,
  getProduct,
  getFilterProducts,
  getColors,
  getPopulateProducts,
  setFilteredProductsOnly,
  getProductComments,
} = productSlice.actions;

export default productSlice.reducer;

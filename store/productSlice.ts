import { createSlice } from "@reduxjs/toolkit";
import { Product } from "@/types";
import {
  deleteGuardRequest,
  getGuardRequest, getTekeraGuardRequest,
  patchRequest,
  postGuardRequest,
} from "@/services/requestservice";
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
  targetPicture: object;
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
  targetPicture: {},
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
    getTargetPicture: (state, action) => {
      state.targetPicture = action.payload;
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
    setNewCommentList: (state, action) => {
      state.product.comments = state.product.comments.filter(
        (c) => c.id !== action.payload.id,
      );
    },
    loading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const createCommentDispatch =
  (productId: string, formData) => async (dispatch) => {
    dispatch(loading(true));
    postGuardRequest(
      {
        controller: "comment",
        action: "create-comment",
        params: { productId: productId },
      },
      formData,
    )
      .then((res) => {
        dispatch(loading(false));
        toast.success(res?.data.message);
      })
      .catch((err) => {
        dispatch(loading(false));
        toast.error(err.response?.data);
      })
      .finally(() => {
        dispatch(loading(false));
      });
  };

export const getProductCommentsDispatch = (id: string) => async (dispatch) => {
  dispatch(loading(true));
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
    })
    .finally(() => {
      dispatch(loading(false));
    });
};

export const getNewSeasonProductsDispatch =
  (page: number, size: number, tag: string) => async (dispatch) => {
    dispatch(loading(true));
    getTekeraGuardRequest({
      controller: "product",
      action: "findCompanyPopularOrNewSeasonProducts",
      params: { page: page, size: size, companyId: process.env.NEXT_PUBLIC_COMPANY_ID, tag: tag }
    })
      .then((res) => {
        dispatch(getNewSeasonProducts(res?.data));
        dispatch(loading(false));
      })
      .finally(() => {
        dispatch(loading(false));
      });
  };

export const getPopularProductsDispatch =
    (page: number, size: number, tag: string) => async (dispatch) => {
      dispatch(loading(true));
      getTekeraGuardRequest({
        controller: "product",
        action: "findCompanyPopularOrNewSeasonProducts",
        params: { page: page, size: size, companyId: process.env.NEXT_PUBLIC_COMPANY_ID, tag: tag }})
          .then((res) => {
            dispatch(getPopulateProducts(res.data));
            dispatch(loading(false));
          })
          .finally(() => {
            dispatch(loading(false));
          });
    };

/*export const getPopulateProductsDispatch =
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
  };*/

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
  getTekeraGuardRequest({
    controller: "product",
    action: "findCompanyReturnProductDetail",
    params: { slug: slug, companyId: process.env.NEXT_PUBLIC_COMPANY_ID  },
  })
    .then((res) => {
      dispatch(getProduct(res?.data));
      dispatch(loading(false));
    })
    .finally(() => {
      dispatch(loading(false));
    });
};

export const getTargetPictureDispatch = (id: string) => async (dispatch) => {
  dispatch(loading(true));
  getTekeraGuardRequest({
    controller: "digital-fashion",
    action: "getTargetImageByProductId",
    params: { productId: id  },
  })
      .then((res) => {
        dispatch(getTargetPicture(res?.data));
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

export const deleteCommentDispatch =
  (id: string, rateId: string) => async (dispatch) => {
    dispatch(loading(true));
    deleteGuardRequest({
      controller: "comment",
      action: "delete-comment",
      params: { commentId: id, rateId: rateId },
    })
      .then((res) => {
        dispatch(loading(false));
        dispatch(setNewCommentList({ id: id }));
        toast.success(res.data?.message);
      })
      .catch((err) => {
        dispatch(loading(false));
        toast.error(err.response?.data);
      });
  };

// Reducer'ları dışa aktarma
export const {
  loading,
  getProducts,
  getNewSeasonProducts,
  getProduct,
    getTargetPicture,
  getFilterProducts,
  getColors,
  getPopulateProducts,
  setFilteredProductsOnly,
  getProductComments,
  setNewCommentList,
} = productSlice.actions;

export default productSlice.reducer;

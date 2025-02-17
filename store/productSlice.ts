import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "@/types";
import { getGuardRequest } from "@/services/requestservice";

export interface CartState {
  products: Product[];
  newSeasonProducts: Product[];
  filterProducts: Product[];
  product: Product | null;
  loading: boolean;
  error: boolean;
}

const initialState: CartState = {
  products: [],
  newSeasonProducts: [],
  filterProducts: [],
  product: null,
  loading: false,
  error: false,
};

export const getNewSeasonProductsDispatch = createAsyncThunk(
  "products/getNewSeasonProducts",
  async (
    { page, size }: { page: number; size: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await getGuardRequest({
        controller: "product",
        action: "get-all-new-season",
        params: { page, size },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllProductsDispatch = createAsyncThunk(
  "products/getAllProducts",
  async (
    { page, size }: { page: number; size: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await getGuardRequest({
        controller: "product",
        action: "products",
        params: { page, size },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getProductBySlugDispatch = createAsyncThunk(
  "products/getProductBySlug",
  async (slug: string, { rejectWithValue }) => {
    try {
      const res = await getGuardRequest({
        controller: "product",
        action: "get-product",
        params: { slug: slug },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const filterProductDispatch = createAsyncThunk(
  "products/filterProduct",
  async (params: object, { rejectWithValue }) => {
    try {
      const res = await getGuardRequest({
        controller: "product",
        action: "filter-product",
        params: {
          size: params.size,
          color: params.color,
          category: params.category,
          length: params.length,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// productSlice
export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    loading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNewSeasonProductsDispatch.fulfilled, (state, action) => {
        state.newSeasonProducts = action.payload;
        state.loading = false;
      })
      .addCase(getAllProductsDispatch.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(getProductBySlugDispatch.fulfilled, (state, action) => {
        state.product = action.payload;
        state.loading = false;
      })
      .addCase(filterProductDispatch.fulfilled, (state, action) => {
        state.filterProducts = action.payload;
        state.loading = false;
      })
      .addCase(getNewSeasonProductsDispatch.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProductsDispatch.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductBySlugDispatch.pending, (state) => {
        state.loading = true;
      })
      .addCase(filterProductDispatch.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNewSeasonProductsDispatch.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        console.error(action.payload);
      })
      .addCase(getAllProductsDispatch.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        console.error(action.payload);
      })
      .addCase(getProductBySlugDispatch.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        console.error(action.payload);
      })
      .addCase(filterProductDispatch.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        console.error(action.payload);
      });
  },
});

// Reducer'ları dışa aktarma
export const { loading } = productSlice.actions;

export default productSlice.reducer;

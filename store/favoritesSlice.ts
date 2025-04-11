import { deleteGuardRequest, getGuardRequest } from "@/services/requestservice";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  favorites: [],
  loading: false,
};

export const favoritesSlice = createSlice({
  name: "favs",
  initialState,
  reducers: {
    getAllFavoritesDispatch: (state, action) => {
      state.favorites = action.payload;
    },
    updateFavoritesDispatch: (state, action) => {
      // Eğer aynı ürün daha önce eklenmişse tekrar ekleme (opsiyonel kontrol)
      const exists = state.favorites.some(
        (item) => item.id === action.payload.id
      );
      if (!exists) {
        state.favorites.push(action.payload);
      }
    },
    deleteFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (item) => item.id !== action.payload
      );
    },
    loading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const deleteToFav =
  (productId: string, userId: string) => async (dispatch) => {
    dispatch(loading(true));
    deleteGuardRequest({
      controller: "user",
      action: "remove-favorite",
      params: { productId: productId, userId: userId },
    })
      .then((res) => {
        toast.success(res.data?.message);
        dispatch(deleteFavorite(productId));
        dispatch(loading(false));
      })
      .catch((err) => {
        toast.error(err.response.data?.message);
      })
      .finally(() => {
        dispatch(loading(false));
      });
  };

export const getAllFavorites = (userId: string) => async (dispatch) => {
  dispatch(loading(true));
  getGuardRequest({
    controller: "user",
    action: "get-favorites-for-user",
    params: { userId: userId },
  })
    .then((res) => {
      dispatch(getAllFavoritesDispatch(res.data));
      dispatch(loading(false));
    })
    .catch((err) => {
      dispatch(loading(false));
      toast.error(err.response?.data);
      console.log(err);
    })
    .finally(() => {
      dispatch(loading(false));
    });
};

// Reducer'ları dışa aktarma
export const {
  getAllFavoritesDispatch,
  deleteFavorite,
  updateFavoritesDispatch,
  loading,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;

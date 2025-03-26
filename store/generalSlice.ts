import { helpItems } from "@/constans/Help";
import { howToBuyList } from "@/constans/HowToBuy";
import { getGuardRequest } from "@/services/requestservice";
import { createSlice } from "@reduxjs/toolkit";
import { IconType } from "react-icons";
import { toast } from "react-toastify";

interface Question {
  id: number;
  question: string;
  answer: string;
}

interface HelpCategory {
  id: number;
  title: string;
  icon: IconType;
  questions: Question[];
}

export interface GeneralState {
  homeSliderImages: [];
  howToBuyImages: { id: string; url: string }[];
  HowToBuyModalStatus: boolean;
  loading: boolean;
  helpItems: HelpCategory[];
}

// Başlangıç durumu (initialState)
const initialState: GeneralState = {
  homeSliderImages: [],
  howToBuyImages: howToBuyList,
  HowToBuyModalStatus: false,
  loading: false,
  helpItems: helpItems,
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    getHomeSliders: (state, action) => {
      state.homeSliderImages = action.payload;
    },
    loading: (state, action) => {
      state.loading = action.payload;
    },
    setHowToBuyModalStatus: (state, action) => {
      state.HowToBuyModalStatus = action.payload;
    },
  },
});

export const getAllHomeSliderImages = () => async (dispatch) => {
  dispatch(loading(true));
  getGuardRequest({ controller: "slider" })
    .then((res) => {
      dispatch(loading(false));
      dispatch(getHomeSliders(res.data));
    })
    .catch((err) => {
      dispatch(loading(false));
      toast.error(err.response.data);
    });
};

// Reducer'ları dışa aktarma
export const { getHomeSliders, setHowToBuyModalStatus, loading } =
  generalSlice.actions;

export default generalSlice.reducer;

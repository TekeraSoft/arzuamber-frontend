import { helpItems } from "@/constans/Help";
import { howToBuyList } from "@/constans/HowToBuy";
import { getGuardRequest } from "@/services/requestservice";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface Question {
  id: number;
  question: string;
  answer: string;
}

interface HelpCategory {
  id: number;
  title: string;
  icon: string;
  questions: Question[];
}

interface SpecialDayTimer {
  discountTitle: string;
  discountDescription: string;
  discountEndTime: number;
  specialDayTimerStatus: boolean;
}

export interface GeneralState {
  homeSliderImages: [];
  howToBuyImages: { id: string; url: string }[];
  HowToBuyModalStatus: boolean;
  loading: boolean;
  helpItems: HelpCategory[];
  specialDayTimer: SpecialDayTimer;
}

// Başlangıç durumu (initialState)
const initialState: GeneralState = {
  homeSliderImages: [],
  howToBuyImages: howToBuyList,
  HowToBuyModalStatus: false,
  loading: false,
  helpItems: helpItems,
  specialDayTimer: {
    discountTitle: "500 ₺ Ve Üzeri Alışverilere Bluz Hediye!",
    discountDescription: "Kaçırmayın! Bu fırsat kısa süreliğine geçerli 🎉",
    discountEndTime: new Date("2025-04-12T00:00:00").getTime(),
    specialDayTimerStatus: true,
  },
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
    setSpecialDayTimer(state, action) {
      state.specialDayTimer = action.payload;
    },
    setSpecialDayTimerStatus(state, action) {
      state.specialDayTimer.specialDayTimerStatus = action.payload;
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
export const {
  getHomeSliders,
  setHowToBuyModalStatus,
  setSpecialDayTimer,
  setSpecialDayTimerStatus,
  loading,
} = generalSlice.actions;

export default generalSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ModalState {
  isRegisterModalOpen: boolean;
  isLoginModalOpen: boolean;
  isCartModalOpen: boolean;
  isForgotPassModalOpen: boolean;
  activeModal: { isOpen: boolean; title: string; content: string };
}

const initialState: ModalState = {
  isRegisterModalOpen: false,
  isLoginModalOpen: false,
  isCartModalOpen: false,
  isForgotPassModalOpen: false,
  activeModal: { isOpen: false, title: "", content: "" },
};

export const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setRegisterModal(state, action) {
      state.isRegisterModalOpen = action.payload;
    },

    setLoginModal(state, action) {
      state.isLoginModalOpen = action.payload;
    },

    openCartModal(state) {
      state.isCartModalOpen = true;
    },
    closeCartModal(state) {
      state.isCartModalOpen = false;
    },
    setForgotPassModal(state, action) {
      state.isForgotPassModalOpen = action.payload;
    },

    openDynamicModal(
      state,
      action: PayloadAction<{ title: string; content: string }>
    ) {
      state.activeModal = {
        isOpen: true,
        title: action.payload.title,
        content: action.payload.content,
      };
    },
    closeDynamicModal(state) {
      state.activeModal.isOpen = false;
      state.activeModal.title = "";
      state.activeModal.content = "";
    },
  },
});

export const {
  setRegisterModal,
  setLoginModal,
  openCartModal,
  closeCartModal,
  openDynamicModal,
  closeDynamicModal,
  setForgotPassModal,
} = modalsSlice.actions;

export default modalsSlice.reducer;

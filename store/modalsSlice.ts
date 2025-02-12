import { createSlice } from "@reduxjs/toolkit";

export interface ModalState {
  isRegisterModalOpen: boolean;
  isLoginModalOpen: boolean;
  isCartModalOpen: boolean;
}

const initialState: ModalState = {
  isRegisterModalOpen: false,
  isLoginModalOpen: false,
  isCartModalOpen: false,
};

export const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    openRegisterModal(state) {
      state.isRegisterModalOpen = true;
    },
    closeRegisterModal(state) {
      state.isRegisterModalOpen = false;
    },
    openLoginModal(state) {
      state.isLoginModalOpen = true;
    },
    closeLoginModal(state) {
      state.isLoginModalOpen = false;
    },
    openCartModal(state) {
      state.isCartModalOpen = true;
    },
    closeCartModal(state) {
      state.isCartModalOpen = false;
    },
  },
});

export const {
  openRegisterModal,
  closeRegisterModal,
  openLoginModal,
  closeLoginModal,
  openCartModal,
  closeCartModal,
} = modalsSlice.actions;

export default modalsSlice.reducer;

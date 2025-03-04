import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ModalState {
  isRegisterModalOpen: boolean;
  isLoginModalOpen: boolean;
  isCartModalOpen: boolean;
  activeModal: { isOpen: boolean; title: string; content: string };
}

const initialState: ModalState = {
  isRegisterModalOpen: false,
  isLoginModalOpen: false,
  isCartModalOpen: false,
  activeModal: { isOpen: false, title: "", content: "" },
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
  openRegisterModal,
  closeRegisterModal,
  openLoginModal,
  closeLoginModal,
  openCartModal,
  closeCartModal,
  openDynamicModal,
  closeDynamicModal,
} = modalsSlice.actions;

export default modalsSlice.reducer;

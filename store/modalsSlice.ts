import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ModalState {
  isRegisterModalOpen: boolean;
  isLoginModalOpen: boolean;
  isCartModalOpen: boolean;
  activeModal: { isOpen: boolean; title: string; content: string };
  checkedItems: { [key: string]: boolean }; // checkbox item'larının durumu
}

const initialState: ModalState = {
  isRegisterModalOpen: false,
  isLoginModalOpen: false,
  isCartModalOpen: false,
  activeModal: { isOpen: false, title: "", content: "" },
  checkedItems: {
    "KVKK Onayı": false,
    "Gizlilik Politikası": false,
    "Kullanım Koşulları": false,
    "Hizmet Şartları": false,
  },
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

    // Checkbox'ları toggle et
    toggleCheckbox(state, action: PayloadAction<string>) {
      const { title } = action.payload;
      state.checkedItems[title] = !state.checkedItems[title];
    },
    // Tüm checkbox'ları sıfırla
    resetCheckboxes(state) {
      for (const key in state.checkedItems) {
        state.checkedItems[key] = false;
      }
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
  toggleCheckbox,
  resetCheckboxes,
} = modalsSlice.actions;

export default modalsSlice.reducer;

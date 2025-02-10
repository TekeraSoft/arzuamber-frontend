import { createSlice } from "@reduxjs/toolkit";

export interface ModalState {
    isRegisterModalOpen: boolean;
    isLoginModalOpen: boolean;
}

const initialState: ModalState = {
    isRegisterModalOpen: false,
    isLoginModalOpen: false,
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
        openLoginModal(state, action) {
            state.isLoginModalOpen = true;
        },
        closeLoginModal(state, action) {
            state.isLoginModalOpen = false;
        },
    },
});

export const {
    openRegisterModal,
    closeRegisterModal,
    openLoginModal,
    closeLoginModal,
} = modalsSlice.actions;

export default modalsSlice.reducer;
import { closeLoginModal, closeRegisterModal } from "@/store/modalsSlice";
import { RootState } from "@/store/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

function AuthLayout() {
  const dispatch = useDispatch();
  const { isLoginModalOpen, isRegisterModalOpen } = useSelector(
    (state: RootState) => state.modals
  );

  const closeModal = (e: React.MouseEvent) => {
    // Modal dışına tıklanırsa, ilgili modal'ı kapat
    if (e.target === e.currentTarget) {
      dispatch(closeLoginModal());
      dispatch(closeRegisterModal());
    }
  };

  return (
    <div
      onClick={closeModal}
      className={`${
        isLoginModalOpen || isRegisterModalOpen ? "fixed" : "hidden"
      } px-5 md:px-0 inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50`}
    >
      <div className="w-full md:w-2/4 lg:w-4/12 xl:w-3/12 h-auto bg-white rounded-2xl px-6 py-5 shadow-lg relative transform transition-all duration-300 animate__animated animate__fadeIn">
        {isLoginModalOpen && <LoginForm />}
        {isRegisterModalOpen && <RegisterForm />}
      </div>
    </div>
  );
}

export default AuthLayout;

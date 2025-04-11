import { Dialog } from "primereact/dialog";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import {
  setFavWarningModalStatus,
  setLoginModal,
  setRegisterModal,
} from "@/store/modalsSlice";
import { FaRegSmileWink, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { motion } from "framer-motion";

function FavWarningModal() {
  const dispatch = useDispatch();
  const { FavWarningModalStatus } = useSelector(
    (state: RootState) => state.modals
  );

  const hideModal = () => {
    dispatch(setFavWarningModalStatus(false));
  };

  const handleRegister = () => {
    dispatch(setLoginModal(true));
    dispatch(setFavWarningModalStatus(false));
  };

  const handleLogin = () => {
    dispatch(setRegisterModal(true));
    dispatch(setFavWarningModalStatus(false));
  };

  return (
    <Dialog visible={FavWarningModalStatus} onHide={hideModal} header="Uyarı">
      <div className="flex justify-center items-center w-full max-w-xs md:max-w-lg">
        <motion.div
          className="rounded-2xl p-6 w-full max-w-lg "
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <FaRegSmileWink className="text-primary text-2xl" />
            <h2 className="text-lg font-semibold text-gray-800">
              Hesabınıza Erişim Sağlayın
            </h2>
          </div>

          <p className="text-center text-sm text-gray-600 mb-6">
            Favorilerinizi kaydedebilmek için lütfen giriş yapın veya üye olun.
          </p>

          <div className="flex flex-col gap-4">
            {/* Giriş Yap */}
            <motion.button
              onClick={handleRegister}
              className="w-full flex items-center justify-center gap-3 bg-primary text-white py-3 rounded-lg font-medium text-sm md:text-base shadow-md hover:bg-primary-dark transition transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaSignInAlt className="text-lg" />
              Giriş Yap
            </motion.button>

            {/* Üye Ol */}
            <motion.button
              onClick={handleLogin}
              className="w-full flex items-center justify-center gap-3 bg-secondary text-white py-3 rounded-lg font-medium text-sm md:text-base shadow-md hover:bg-secondary-dark transition transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaUserPlus className="text-lg" />
              Üye Ol
            </motion.button>
          </div>
        </motion.div>
      </div>
    </Dialog>
  );
}

export default FavWarningModal;

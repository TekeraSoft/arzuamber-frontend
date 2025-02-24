import React from "react";

function authLayout() {
  return (
    <div
      onClick={(e) => {
        // Form dışına tıklanırsa kapanmasını sağlıyoruz
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
      className={`${
        isRegisterModalOpen ? "fixed" : "hidden"
      } px-4 md:px-0 inset-0  bg-black bg-opacity-50 flex justify-center items-center z-50   `}
    >
      authLayout
    </div>
  );
}

export default authLayout;

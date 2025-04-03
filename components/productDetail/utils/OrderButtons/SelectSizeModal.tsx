import React from "react";
import { FaTimes } from "react-icons/fa"; // Kapatma ikonu
import { AiFillWarning } from "react-icons/ai";

function SelectSizeModal({ closeModal }) {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-3/4 sm:w-1/3 text-center relative transform transition-all duration-300 ease-in-out scale-95 hover:scale-100">
        {/* Modal Başlık */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <AiFillWarning size={30} className="text-primary " />
          {/* Başlık ikonu */}
          <h2 className="text-2xl font-bold text-primary">
            Lütfen Beden Seçin
          </h2>
        </div>

        {/* Modal İçeriği */}
        <p className="text-secondary text-sm md:text-base ">
          Ürünü sipariş verebilmek için bir Beden seçmelisiniz.
        </p>

        {/* Kapatma Butonu */}
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-primary hover:text-secondary focus:outline-none transition-all duration-300"
        >
          <FaTimes className="text-2xl md:text-3xl hover:text-secondary transition-all duration-200" />
        </button>

        {/* Kapat Butonu */}
        <button
          onClick={closeModal}
          className="bg-primary hover:bg-secondary text-white py-3 px-6 rounded-lg shadow-lg transition-all duration-300 w-full mt-6 transform hover:scale-105"
        >
          Kapat
        </button>
      </div>
    </div>
  );
}

export default SelectSizeModal;

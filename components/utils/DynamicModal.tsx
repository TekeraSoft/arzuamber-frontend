import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeDynamicModal } from "@/store/modalsSlice";
import { RootState } from "@/store/store";

const DynamicModal = () => {
  const dispatch = useDispatch();
  // RootState tipini kullanalım
  const { activeModal } = useSelector((state: RootState) => state.modals);

  const handleCloseModal = () => {
    dispatch(closeDynamicModal());
  };

  return (
    activeModal.isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-md w-3/4 md:w-1/2">
          <h3 className="text-xl font-semibold mb-4">{activeModal.title}</h3>
          <p className="mb-4">{activeModal.content}</p>
          <button
            onClick={handleCloseModal}
            className="bg-red-500 text-white p-2 rounded-md mt-4"
          >
            Close
          </button>
        </div>
      </div>
    )
  );
};

export default DynamicModal;

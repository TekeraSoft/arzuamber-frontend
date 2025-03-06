import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeDynamicModal } from "@/store/modalsSlice";
import { RootState } from "@/store/store";
import { IoMdClose } from "react-icons/io";

const DynamicModal = () => {
  const dispatch = useDispatch();
  const { activeModal } = useSelector((state: RootState) => state.modals);

  const handleCloseModal = () => {
    dispatch(closeDynamicModal());
  };

  return (
    activeModal.isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white px-6 py-10 rounded-md w-full max-w-lg max-h-[80vh] relative">
          {/* Close Button - Right Top Corner */}
          <button
            onClick={handleCloseModal}
            className="absolute top-2 right-2 text-2xl bg-red-500 text-white rounded-md "
          >
            <IoMdClose />
          </button>
          {/* Modal Title */}
          <h3 className="text-xl font-semibold mb-4">{activeModal.title}</h3>
          {/* Modal Content */}
          <div className="mb-4 max-h-[60vh] overflow-y-auto pr-2">
            <p>{activeModal.content}</p>
          </div>
          {/* Close Button for Modal */}
        </div>
      </div>
    )
  );
};

export default DynamicModal;

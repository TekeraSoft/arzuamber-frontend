import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { setHowToBuyModalStatus } from "@/store/generalSlice";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaMinus } from "react-icons/fa";

import Image from "next/image";
import "animate.css";

function HowToBuyModal() {
  const dispatch = useDispatch<AppDispatch>();

  const { howToBuyImages, HowToBuyModalStatus } = useSelector(
    (state: RootState) => state.general
  );

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [disable, setDisable] = useState({
    prevDisabled: false,
    nextDisabled: false,
  });

  // Sonraki resim fonksiyonu
  const nextImage = () => {
    if (currentImageIndex < howToBuyImages.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  // Önceki resim fonksiyonu
  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  // Modal dışına tıklayınca kapanma
  const closeModal = () => {
    dispatch(setHowToBuyModalStatus(false));
  };

  // Disable state'i, image index değiştiğinde güncelleme
  useEffect(() => {
    setDisable({
      prevDisabled: currentImageIndex === 0,
      nextDisabled: currentImageIndex === howToBuyImages.length - 1,
    });
  }, [currentImageIndex, howToBuyImages.length]);

  return (
    <div
      className={`${
        HowToBuyModalStatus ? "fixed" : "hidden"
      } inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 `}
      onClick={closeModal}
    >
      {/* Modal Container */}
      <div
        className="relative flex flex-col justify-center items-center bg-white px-4 py-3 md:py-6 rounded-lg shadow-xl animate__animated animate__fadeIn max-w-md md:max-w-2xl lg:max-w-3xl   gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <div className="w-full flex justify-end">
          <button
            className="text-primary hover:scale-105 transition duration-300"
            onClick={closeModal}
          >
            <IoMdCloseCircleOutline size={34} />
          </button>
        </div>

        <h2 className=" md:mb-4 text-2xl md:text-3xl font-semibold text-center underline underline-offset-4">
          Nasıl Ürün Alırım?
        </h2>

        <div className="flex items-center justify-between gap-4 ">
          {/* Previous Button */}
          <button
            onClick={prevImage}
            className={`${
              disable.prevDisabled
                ? " bg-red-500 cursor-not-allowed"
                : " bg-secondary hover:bg-primary"
            }  absolute left-1 md:left-2 flex justify-center items-center text-white p-1 rounded-full transition transform hover:scale-110`}
            disabled={disable.prevDisabled}
          >
            {disable.prevDisabled ? (
              <FaMinus size={25} />
            ) : (
              <FaChevronLeft size={25} />
            )}
          </button>

          {/* Image */}
          <div className="relative w-72 h-64 md:w-96 md:h-[355px]      rounded-lg">
            <Image
              src={howToBuyImages[currentImageIndex].url}
              alt={`Image ${currentImageIndex + 1}`}
              fill
              className="rounded-lg object-cover w-auto h-auto"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* Next Button */}
          <button
            onClick={nextImage}
            className={`${
              disable.nextDisabled
                ? " bg-red-500 cursor-not-allowed"
                : " bg-secondary hover:bg-primary"
            }  absolute right-1 md:right-2  flex justify-center items-center text-white p-1 rounded-full transition transform hover:scale-110`}
            disabled={disable.nextDisabled}
          >
            {disable.nextDisabled ? (
              <FaMinus size={25} />
            ) : (
              <FaChevronRight size={25} />
            )}
          </button>
        </div>

        {/* Mobile-friendly text */}
        <div className="md:mt-4 text-center text-xs sm:text-base">
          <p>
            Ürün alım sürecini öğrenmek için sağdaki okları kullanarak
            görselleri gezebilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HowToBuyModal;

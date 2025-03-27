"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { setSpecialDayTimerStatus } from "@/store/generalSlice";
import { FaBell, FaExclamationCircle } from "react-icons/fa"; // React Icons'dan ikon
import { motion } from "framer-motion"; // Framer Motion

function Timer() {
  const dispatch = useDispatch<AppDispatch>();
  const { specialDayTimer } = useSelector((state: RootState) => state.general);

  const {
    discountTitle,
    discountDescription,
    discountEndTime,
    specialDayTimerStatus,
  } = specialDayTimer;

  const calculateTimeLeft = useCallback(() => {
    const now = new Date().getTime();
    const difference = discountEndTime - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      dispatch(setSpecialDayTimerStatus(true));
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }
  }, [discountEndTime, dispatch]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  // Eğer status false ise, farklı bir topbar göstereceğiz.
  if (!specialDayTimerStatus) {
    return (
      <div className="w-full flex justify-center items-center bg-secondary text-black font-bold py-2 shadow-md">
        <div className="navbarContainer flex flex-col md:flex-row justify-between items-center gap-2 px-2 md:px-4 text-center md:text-left">
          {/* Kampanya Sonu Mesajı */}
          <p className="flex justify-center items-center bg-white text-black px-4 py-0.5 rounded-md text-xs md:text-sm font-semibold shadow-sm w-full md:w-auto ">
            <motion.span
              className="mr-2 inline-block"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "loop" }}
            >
              <FaExclamationCircle size={16} />
            </motion.span>
            <span className="text-[10px] md:text-xs">
              Mevcut kampanya sona erdi. Yeni fırsatlar için bizi takip edin!
            </span>
          </p>

          {/* Yeni Kampanyalar İçin Takip Mesajı */}
          <div className="flex items-center justify-center gap-2 bg-mywhite w-full md:w-64 rounded-md py-0.5">
            <span className="text-[11px] md:text-sm text-black font-semibold">
              Yeni Kampanyalar için takipte kalın !
            </span>
            <motion.span
              className="inline-block text-xl text-red-500"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "loop" }}
            >
              <FaBell className="text-yellow-500 text-xs md:text-base" />
            </motion.span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center items-center bg-gradient-to-r from-primary to-secondary text-white font-bold py-2 shadow-md">
      <div className="navbarContainer flex justify-between items-center gap-4 px-2 md:px-4 text-center">
        {/* Kampanya Başlığı */}
        <p className="bg-white text-primary px-4 py-1 rounded-md text-xs md:text-lg whitespace-nowrap font-semibold shadow-sm">
          {discountTitle}
        </p>

        {/* Açıklama */}
        <p className=" hidden md:flex text-xs  opacity-80">
          {discountDescription}
        </p>

        {/* Geri Sayım Zamanlayıcı */}
        <div className="flex gap-2">
          {["Gün", "Saat", "Dakika", "Saniye"].map((label, index) => {
            const values = [
              timeLeft.days,
              timeLeft.hours,
              timeLeft.minutes,
              timeLeft.seconds,
            ];
            return (
              <div
                key={index}
                className="flex flex-col items-center bg-black bg-opacity-25 md:px-2 md:first-letter py-1 rounded-md shadow-sm min-w-10 md:min-w-[50px]"
              >
                <span className="text-[10px] md:text-base font-bold">
                  {values[index]}
                </span>
                <span className="text-[10px] md:text-xs opacity-75">
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Timer;

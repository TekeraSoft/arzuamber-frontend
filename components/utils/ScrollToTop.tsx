"use client";
import { useState, useEffect } from "react";
import { IoIosArrowUp } from "react-icons/io";

export default function ScrollToTop() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 200); // 300px aşağı kayınca buton gözüksün
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 z-50 right-5 bg-secondary border text-white p-1 md:p-3 rounded-full shadow-lg hover:scale-105 transition-all text-2xl"
        >
          <IoIosArrowUp />
        </button>
      )}
    </>
  );
}

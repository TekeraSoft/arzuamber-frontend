"use client";

import { useTranslations } from "next-intl";
import { BiSearch } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";

import { motion } from "framer-motion";

function SearchBar({ SearchOpen, setSearchOpen }) {
  const t = useTranslations();

  // Animasyon ayarları
  const searchVariants = {
    hidden: {
      opacity: 0,
      x: "-100%", // Mobilde soldan başlar
    },
    visible: {
      opacity: 1,
      x: "0",
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const desktopSearchVariants = {
    hidden: {
      opacity: 0,
      x: "20%", // Masaüstünde sağdan başlar
    },
    visible: {
      opacity: 1,
      x: "0",
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="w-full flex justify-start lg:justify-end items-center ">
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={
          window.innerWidth < 1024 ? searchVariants : desktopSearchVariants
        } // Mobil & Desktop farkı
        className="  hidden  lg:flex justify-between items-center bg-mywhite text-black px-5 py-1 border-b md:border-none min-w-full gap-1"
      >
        <div
          className=" lg:hidden  flex justify-center items-center bg-secondary text-mywhite w-7 h-7  md:w-8 md:h-8 rounded-full cursor-pointer hover:bg-secondaryDark transition duration-300"
          onClick={() => setSearchOpen(false)}
        >
          <IoMdClose className="text-sm" />
        </div>

        <div className="w-full flex transition duration-300 hover:shadow hover:shadow-secondary rounded-lg">
          <input
            type="text"
            placeholder={t("SearchBar.placeHolder")}
            className="px-4 py-1 outline-none bg-white w-full text-sm border border-secondary rounded-l-lg pr-10 text-primary selection:bg-secondary selection:text-mywhite"
          />
          <button className="flex items-center justify-center bg-secondary text-white px-3 rounded-r-lg hover:bg-secondaryDark transition duration-300">
            <BiSearch size={18} />
          </button>
        </div>
      </motion.div>

      {SearchOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={
            window.innerWidth < 1024 ? searchVariants : desktopSearchVariants
          } // Mobil & Desktop farkı
          className={` ${
            SearchOpen ? "flex" : "hidden"
          }  justify-between items-center bg-mywhite text-black px-5 py-1 border-b md:border-none min-w-full gap-1`}
        >
          <div
            className=" lg:hidden  flex justify-center items-center bg-secondary text-mywhite w-7 h-7  md:w-8 md:h-8 rounded-full cursor-pointer hover:bg-secondaryDark transition duration-300"
            onClick={() => setSearchOpen(false)}
          >
            <IoMdClose className="text-sm" />
          </div>

          <div className="w-full flex transition duration-300 hover:shadow hover:shadow-secondary rounded-lg">
            <input
              type="text"
              placeholder={t("SearchBar.placeHolder")}
              className="px-4 py-1 outline-none bg-white w-full text-sm border border-secondary rounded-l-lg pr-10 text-primary selection:bg-secondary selection:text-mywhite"
            />
            <button className="flex items-center justify-center bg-secondary text-white px-3 rounded-r-lg hover:bg-secondaryDark transition duration-300">
              <BiSearch size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default SearchBar;

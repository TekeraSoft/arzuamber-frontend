"use client";

import { useLocale, useTranslations } from "next-intl";
import { BiSearch } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import useDebounce from "@/hooks/debounceHook";
import { clearState, searchProductsDispatch } from "@/store/searchSlice";
import Image from "next/image";
import { InputText } from "primereact/inputtext";
import { SpinnerIcon } from "primereact/icons/spinner";
import { useRouter } from "@/i18n/routing";
import { MdCancel } from "react-icons/md";

function SearchBar({ SearchOpen, setSearchOpen }) {
  const t = useTranslations();
  const router = useRouter();
  const locale = useLocale();
  const dispatch = useDispatch<AppDispatch>();
  const [searchTerm, setSearchTerm] = useState("");
  const { searchProducts, loading } = useSelector(
    (state: RootState) => state.search
  );
  const [isMobile, setIsMobile] = useState(false);
  const searchResultsRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 1024);
    }
    if (debouncedSearchTerm) {
      dispatch(searchProductsDispatch(debouncedSearchTerm));
    } else {
      dispatch(clearState());
    }
    const handleClickOutside = (event) => {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target)
      ) {
        setIsFocused(false); // **Dışarı tıklanınca kapanması için**
        // Redux state'ini temizle
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [debouncedSearchTerm, dispatch]);

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
    <div className="w-full flex justify-start lg:justify-end items-center">
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={isMobile ? searchVariants : desktopSearchVariants} // Mobil & Desktop farkı
        className={`${
          SearchOpen == false ? "lg:flex" : "hidden"
        } relative flex-col justify-between items-center bg-mywhite text-black px-5 py-1 border-b md:border-none min-w-full gap-1`}
      >
        <div className="flex w-full transition duration-300 hover:shadow hover:shadow-secondary rounded-lg">
          <span className="p-input-icon-right w-full">
            {loading ? (
              <SpinnerIcon />
            ) : searchProducts.length > 0 ? (
              <MdCancel
                onClick={() => {
                  dispatch(clearState());
                  setSearchTerm("");
                }}
                size={18}
                className={"cursor-pointer"}
              />
            ) : (
              <BiSearch size={18} />
            )}
            <InputText
              onFocus={() => setIsFocused(true)}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={"w-full rounded !shadow-none !outline-none !h-8"}
              placeholder={t("SearchBar.placeHolder")}
            />
          </span>
        </div>
        {isFocused && searchProducts.length > 0 && (
          <div
            ref={searchResultsRef}
            className={
              "bg-white border max-h-[345px] w-full flex flex-col gap-y-3 overflow-y-auto shadow-md rounded-lg top-12 p-3 absolute z-40 animate__animated animate__fadeIn"
            }
          >
            {searchProducts.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  router.push(`/product/${item.slug}`);
                  setIsFocused(false);
                }}
                className={
                  "flex flex-row gap-x-4 pb-2 border-b hover:bg-gray-100 cursor-pointer transition-all p-1"
                }
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${item.colorSize[0].images[0]}`}
                  width={40}
                  height={40}
                  alt={item.colorSize[0].images[0]}
                  className={"rounded"}
                />
                <span className={"flex flex-col items gap-y-2 w-full"}>
                  <div
                    className={
                      "flex flex-row items-center justify-between w-full"
                    }
                  >
                    <h4 className={"text-black font-semibold"}>{item.name}</h4>
                    <strong>
                      {item.price.toLocaleString("tr-TR", {
                        style: "currency",
                        currency: "TRY",
                      })}
                    </strong>
                  </div>
                  <span
                    className={"flex flex-row justify-start flex-wrap gap-x-4"}
                  >
                    {item.colorSize.flatMap((cs, index) => (
                      <span key={index} className={"flex flex-row gap-x-2"}>
                        <p>{cs.color}</p>:{" "}
                        {cs.stockSize.map((ss, index) => (
                          <span
                            key={index}
                            className={`${
                              ss.stock === 0 ? "line-through" : ""
                            } border px-2 h-6 flex items-center justify-center rounded text-[10px]`}
                          >
                            {ss.size}
                          </span>
                        ))}
                      </span>
                    ))}
                  </span>
                </span>
              </button>
            ))}
          </div>
        )}
      </motion.div>

      {SearchOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={isMobile ? searchVariants : desktopSearchVariants} // Mobil & Desktop farkı
          className={`${
            SearchOpen ? "flex" : "hidden"
          } relative bg-mywhite justify-center items-center text-black px-5 py-1 border-b md:border-none min-w-full gap-2`}
        >
          <div
            className="lg:hidden flex justify-center items-center bg-secondary text-mywhite p-1  rounded-full cursor-pointer hover:bg-secondaryDark transition duration-300"
            onClick={() => setSearchOpen(false)}
          >
            <IoMdClose className="text-sm" />
          </div>

          <div className="w-full  flex transition duration-300 !focus:outline-secondary">
            <span className="p-input-icon-right w-full">
              {loading ? (
                <SpinnerIcon />
              ) : searchProducts.length > 0 ? (
                <MdCancel
                  onClick={() => {
                    dispatch(clearState());
                    setSearchTerm("");
                    setSearchOpen(!SearchOpen);
                  }}
                  size={18}
                  className={"cursor-pointer"}
                />
              ) : (
                <BiSearch size={18} />
              )}
              <InputText
                onFocus={() => setIsFocused(true)}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={
                  "w-full rounded !shadow-none !outline-none !hover:shadow-none !hover:outline-none !h-8 shadow-secondary "
                }
                placeholder={t("SearchBar.placeHolder")}
              />
            </span>
          </div>
          {isFocused && searchProducts.length > 0 && (
            <div
              ref={searchResultsRef}
              className={
                "bg-white border-t md:border max-h-[345px] flex flex-col gap-y-3 overflow-y-auto md:rounded-lg top-10  w-full p-3 absolute z-40 animate__animated animate__fadeIn   "
              }
            >
              {searchProducts.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    router.push(`/product/${item.slug}`);
                    setIsFocused(false);
                  }}
                  className={
                    "flex flex-row gap-x-4 pb-2 border-b hover:bg-gray-100 cursor-pointer transition-all p-1"
                  }
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${item.colorSize[0].images[0]}`}
                    width={40}
                    height={40}
                    alt={item.colorSize[0].images[0]}
                    className={"rounded"}
                  />
                  <span className={"flex flex-col items gap-y-2 w-full"}>
                    <div
                      className={
                        "flex flex-row items-center justify-between w-full"
                      }
                    >
                      <h4 className={"text-black"}>{item.name}</h4>
                      <strong>
                        {item.price.toLocaleString("tr-TR", {
                          style: "currency",
                          currency: "TRY",
                        })}
                      </strong>
                    </div>
                    <span
                      className={
                        "flex flex-row justify-start flex-wrap gap-x-4"
                      }
                    >
                      {item.colorSize.flatMap((cs, index) => (
                        <span key={index} className={"flex flex-row gap-x-1"}>
                          <p>{cs.color}</p>:{" "}
                          {cs.stockSize.map((ss, index) => (
                            <span
                              key={index}
                              className={`${
                                ss.stock === 0 ? "line-through" : ""
                              } border px-2 h-6 flex items-center justify-center rounded text-[10px]`}
                            >
                              {ss.size}
                            </span>
                          ))}
                        </span>
                      ))}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

export default SearchBar;

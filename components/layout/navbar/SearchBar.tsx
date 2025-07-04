"use client";

import { useTranslations } from "next-intl";
import { BiSearch } from "react-icons/bi";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import useDebounce from "@/hooks/debounceHook";
import {
  clearState,
  searchProductsDispatch,
  setFilterStatus,
} from "@/store/searchSlice";
import Image from "next/image";
import { InputText } from "primereact/inputtext";
import { SpinnerIcon } from "primereact/icons/spinner";
import { usePathname, useRouter } from "@/i18n/routing";
import { MdCancel } from "react-icons/md";

function SearchBar({ SearchOpen, setSearchOpen }) {
  const t = useTranslations();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [searchTerm, setSearchTerm] = useState("");
  const { searchProducts, filterStatus, loading } = useSelector(
    (state: RootState) => state.search,
  );
  const [isMobile, setIsMobile] = useState(false);
  const searchResultsRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

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

  const [isVisible, setIsVisible] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    if (pathName.startsWith("/category/") || pathName === "/products" || pathName === "/df") {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [pathName]);

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={"w-full rounded !shadow-none !outline-none !h-8"}
              placeholder={t("SearchBar.placeHolder")}
            />
          </span>
        </div>
        {isFocused && searchProducts.length > 0 && (
          <div
            className={
              "bg-white border max-h-[345px] w-full flex flex-col gap-y-3 overflow-y-auto shadow-md rounded-lg top-12 p-3 absolute z-40 animate__animated animate__fadeIn"
            }
          >
            {searchProducts.map((item, index) => (
              <button
                key={index}
                type={"button"}
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
                    <div className="flex justify-center items-center gap-2">
                      {item.discountPrice > 0 &&
                      item.discountPrice !== item.price ? (
                        <>
                          <span className="text-red-700 text-[10px] md:text-sm line-through">
                            {item.price.toLocaleString("tr-TR", {
                              style: "currency",
                              currency: "TRY",
                            })}
                          </span>
                          <p className="text-xs text-secondary md:text-sm font-extrabold">
                            {item.discountPrice.toLocaleString("tr-TR", {
                              style: "currency",
                              currency: "TRY",
                            })}
                          </p>
                        </>
                      ) : (
                        <p className="text-xs text-secondary  md:text-sm font-extrabold">
                          {item.price.toLocaleString("tr-TR", {
                            style: "currency",
                            currency: "TRY",
                          })}
                        </p>
                      )}
                    </div>
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
          } relative bg-mywhite justify-center items-center text-black px-4 py-1 border-b md:border-none min-w-full gap-2`}
        >
          {/* <div
            className="lg:hidden flex justify-center items-center bg-secondary text-mywhite p-1  rounded-full cursor-pointer hover:bg-secondaryDark transition duration-300"
            onClick={() => setSearchOpen(false)}
          >
            <IoMdClose className="text-sm" />
          </div> */}

          <button
            onClick={() => dispatch(setFilterStatus(!filterStatus))}
            className={`${
              isVisible ? "hidden" : "flex"
            } lg:hidden px-6 py-0.5 text-myblack border border-myblack rounded-md justify-center items-center bg-transparent backdrop-blur-md font-extrabold`}
          >
            {t("Filter.title")}
          </button>

          <div className="w-full  flex transition duration-300 !focus:outline-secondary">
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={
                  "w-full rounded !shadow-none !outline-none !hover:shadow-none !hover:outline-none !h-8 shadow-secondary "
                }
                placeholder={t("SearchBar.placeHolder")}
              />
            </span>
          </div>
          {isFocused && searchProducts.length > 0 ? (
            <div
              ref={searchResultsRef}
              className="bg-white border max-h-[345px] w-full flex flex-col gap-y-3 overflow-y-auto shadow-md rounded-lg top-10 p-3 absolute z-40 animate__animated animate__fadeIn"
            >
              {searchProducts.map((item, index) => (
                <button
                  key={index}
                  type={"button"}
                  onClick={() => {
                    router.push(`/product/${item.slug}`);
                    setIsFocused(false);
                  }}
                  className="flex flex-row gap-x-4 pb-2 border-b hover:bg-gray-100 cursor-pointer transition-all p-1"
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${item.colorSize[0].images[0]}`}
                    width={40}
                    height={40}
                    alt={item.colorSize[0].images[0]}
                    className="rounded"
                  />
                  <span className="flex flex-col items gap-y-2 w-full">
                    <div className="flex flex-row items-center justify-between w-full">
                      <h4 className="text-black font-semibold">{item.name}</h4>
                      <div className="flex justify-center items-center gap-2">
                        {item.discountPrice > 0 &&
                        item.discountPrice !== item.price ? (
                          <>
                            <span className="text-red-700 text-[10px] md:text-sm line-through">
                              {item.price.toLocaleString("tr-TR", {
                                style: "currency",
                                currency: "TRY",
                              })}
                            </span>
                            <p className="text-xs text-secondary md:text-sm font-extrabold">
                              {item.discountPrice.toLocaleString("tr-TR", {
                                style: "currency",
                                currency: "TRY",
                              })}
                            </p>
                          </>
                        ) : (
                          <p className="text-xs text-secondary md:text-sm font-extrabold">
                            {item.price.toLocaleString("tr-TR", {
                              style: "currency",
                              currency: "TRY",
                            })}
                          </p>
                        )}
                      </div>
                    </div>
                    <span className="flex flex-row justify-start flex-wrap gap-x-4">
                      {item.colorSize.flatMap((cs, index) => (
                        <span key={index} className="flex flex-row gap-x-2">
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
          ) : isFocused &&
            searchTerm.length !== 0 &&
            searchProducts.length === 0 ? (
            <div className="bg-white border border-slate-300 max-h-[345px] w-full flex flex-col items-center justify-center gap-y-3 overflow-y-auto shadow-md rounded-lg top-10 p-3 absolute z-10 animate__animated animate__fadeIn">
              <div className="flex items-center justify-center gap-2">
                <BiSearch size={20} className="text-gray-400" />
                <p className="text-gray-500 text-sm">
                  Aradığınız ürün bulunamadı.
                </p>
              </div>
            </div>
          ) : null}
        </motion.div>
      )}
    </div>
  );
}

export default SearchBar;

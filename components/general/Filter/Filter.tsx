"use client";

import React, { useEffect, useState } from "react";
import { filterData } from "../../../constans/Filter";
import { FaMinus, FaPlus, FaTimes } from "react-icons/fa";
import { MdFilterListAlt } from "react-icons/md";
import { useTranslations } from "next-intl";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store/store";
import {filterProductDispatch, getAllProductsDispatch} from "@/store/productSlice";
import {getCategoriesDispatch} from "@/store/categorySlice";

function Filter({currnetPage, pageSize}: {currnetPage: number, pageSize: number}) {
  const t = useTranslations();
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector((state:RootState)=> state.category)
  // Durum yönetimi: Kullanıcı seçimlerini saklamak için
  const [selectedFilters, setSelectedFilters] = useState({
    sizes: null,
    colors: null,
    categories: null,
    lengths: null,
  });

  const [openState, setOpenState] = React.useState({
    size: true,
    color: false,
    category: false,
    length: false,
  });

  // Menü görünürlüğünü kontrol etmek için
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Filtre seçimlerini güncelleme işlevi
  useEffect(() => {
    // Eğer herhangi bir filtre değiştiyse
    const hasFilterChanged =
      selectedFilters.sizes ||
      selectedFilters.colors ||
      selectedFilters.categories ||
      selectedFilters.lengths;

    if (hasFilterChanged) {
      // Burada eski ve yeni filtreleri karşılaştırabiliriz
      dispatch(
        filterProductDispatch({
          size: selectedFilters.sizes,
          color: selectedFilters.colors,
          category: selectedFilters.categories,
          length: selectedFilters.lengths,
          page: currnetPage,
          pageSize: pageSize
        })
      );
    } else {
      dispatch(getAllProductsDispatch(currnetPage, pageSize))
    }
    dispatch(getCategoriesDispatch())
  }, [
    selectedFilters.sizes, // Boyut değiştiğinde
    selectedFilters.colors, // Renk değiştiğinde
    selectedFilters.categories, // Kategori değiştiğinde
    selectedFilters.lengths, // Uzunluk değiştiğinde
    dispatch, // Dispatch fonksiyonu da bağımlılık olarak eklenmeli
  ]);

  // Menü açma / kapama işlemi
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative md:w-1/4 z-40  ">
      {/* Mobil Menü Butonu */}
      <button
        onClick={toggleMenu}
        className={`${
          isMenuOpen ? "hidden" : "fixed"
        }   top-20 right-4  md:hidden p-1 text-myblack  border  border-myblack rounded-md  flex justify-center items-center bg-transparent backdrop-blur-md  `}
      >
        <MdFilterListAlt size={24} />
      </button>

      {/* Açılır Menü */}
      <div
        className={`fixed inset-0 backdrop-blur-sm z-50 md:hidden transform transition-transform   ${
          isMenuOpen
            ? "translate-x-0 animate__fadeInLeft animate__animated animate__faster"
            : "-translate-x-full "
        }`}
        onClick={toggleMenu}
      >
        <div
          className="  bg-white flex flex-col gap-5  p-6 w-3/4 h-full z-2 overflow-y-auto "
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col justify-center items-end  mt-12 w-full">
            <button
              onClick={toggleMenu}
              className=" w-6 h-6 md:hidden p-1 text-primary  border  border-primary rounded-md   flex justify-center items-center  bg-mywhite transition-all duration-500 hover:scale-105 "
            >
              <FaTimes size={16} />
            </button>
            <h3 className="text-center text-2xl font-bold text-primary  w-full border-b border-secondary ">
              {t("Filter.title")}
            </h3>
          </div>

          {/* Bedenler */}
          <div className={"flex flex-col "}>
            <div
              className={
                "flex flex-row items-center justify-between  cursor-pointer mb-2 transition-all duration-300  text-secondaryDark hover:text-primary"
              }
              onClick={() =>
                setOpenState({ ...openState, size: !openState.size })
              }
            >
              <h3 className={"text-lg  font-semibold"}>{t("Filter.sizes")}</h3>
              {openState.size ? (
                <FaMinus className={"font-semibold"} />
              ) : (
                <FaPlus className={"font-semibold"} />
              )}
            </div>
            <ul
              className={`transition-[max-height] duration-500 ease-in-out overflow-hidden gap-1 ${
                openState.size ? "max-h-[500px]" : "max-h-0"
              } flex flex-col`}
            >
              {filterData.sizes.values.map((size, index) => (
                <li
                  key={index}
                  className={"flex flex-row justify-start items-center gap-x-2"}
                >
                  <input
                    type="radio"
                    className="appearance-none w-5 h-5 border-2 cursor-pointer border-gray-400 rounded-md checked:bg-primary checked:border-secondary transition-all duration-300"
                    checked={selectedFilters.sizes === size}
                    value={size}
                    onChange={(e) =>
                      setSelectedFilters({
                        ...selectedFilters,
                        sizes: e.target.value,
                      })
                    }
                  />

                  <label
                    className={`font-medium transition-all duration-300 text-base ${
                      selectedFilters.sizes === size
                        ? "text-primary font-bold"
                        : "text-gray-500 font-thin"
                    }`}
                  >
                    {size}
                  </label>
                </li>
              ))}
            </ul>
            <hr className={"bg-secondaryDark mt-1"} />
          </div>

          {/* Renkler */}
          <div className={"flex flex-col"}>
            <div
              className={
                "flex flex-row items-center justify-between  cursor-pointer mb-2 transition-all duration-300  text-secondaryDark hover:text-primary"
              }
              onClick={() =>
                setOpenState({ ...openState, color: !openState.color })
              }
            >
              <h3 className={"text-lg font-semibold"}>{t("Filter.colors")}</h3>
              {openState.color ? (
                <FaMinus className={"font-semibold"} />
              ) : (
                <FaPlus className={" font-semibold"} />
              )}
            </div>
            <ul
              className={`transition-[max-height] duration-500 ease-in-out overflow-hidden gap-1 ${
                openState.color ? "max-h-[500px]" : "max-h-0"
              } flex flex-col`}
            >
              {filterData.colors.values.map((color, index) => (
                <li
                  key={index}
                  className={"flex flex-row justify-start items-center gap-x-2"}
                >
                  <input
                    type="radio"
                    className="appearance-none w-5 h-5 border-2 cursor-pointer border-gray-400 rounded-md checked:bg-primary checked:border-secondary transition-all duration-300"
                    checked={selectedFilters.colors === color}
                    value={color}
                    onChange={(e) =>
                      setSelectedFilters({
                        ...selectedFilters,
                        colors: e.target.value,
                      })
                    }
                  />

                  <label
                    className={`font-medium transition-all duration-300 text-base ${
                      selectedFilters.colors === color
                        ? "text-primary font-bold"
                        : "text-gray-500 font-thin"
                    }`}
                  >
                    {t(`Filter.${color}`)}
                  </label>
                </li>
              ))}
            </ul>
            <hr className={"bg-secondaryDark mt-1"} />
          </div>

          {/* Kategoriler */}
          <div className={"flex flex-col"}>
            <div
              onClick={() =>
                setOpenState({ ...openState, category: !openState.category })
              }
              className={
                "flex flex-row items-center justify-between  cursor-pointer mb-2 transition-all duration-300  text-secondaryDark hover:text-primary"
              }
            >
              <h3 className={"text-lg font-semibold"}>
                {t("Filter.categories")}
              </h3>
              {openState.category ? (
                <FaMinus className={" font-semibold"} />
              ) : (
                <FaPlus className={"font-semibold"} />
              )}
            </div>
            <ul
              className={`transition-[max-height] duration-500 ease-in-out overflow-hidden gap-1 ${
                openState.category ? "max-h-[500px]" : "max-h-0"
              } flex flex-col`}
            >
              {categories.map((category, index) => (
                <li
                  key={index}
                  className={"flex flex-row justify-start items-center gap-x-2"}
                >
                  <input
                    type="radio"
                    className="appearance-none w-5 h-5 border-2 cursor-pointer border-gray-400 rounded-md checked:bg-primary checked:border-secondary transition-all duration-300"
                    checked={selectedFilters.categories === category.name}
                    value={category}
                    onChange={(e) =>
                      setSelectedFilters({
                        ...selectedFilters,
                        categories: e.target.value,
                      })
                    }
                  />

                  <label
                    className={`font-medium transition-all duration-300 text-base ${
                      selectedFilters.categories === category.name
                        ? "text-primary font-bold"
                        : "text-gray-500 font-thin"
                    }`}
                  >
                    {category.name}
                  </label>
                </li>
              ))}
            </ul>
            <hr className={"bg-secondaryDark mt-1"} />
          </div>

          {/* Uzunluk */}
          <div className={"flex flex-col"}>
            <div
              className={
                "flex flex-row items-center justify-between  cursor-pointer mb-2 transition-all duration-300  text-secondaryDark hover:text-primary"
              }
              onClick={() =>
                setOpenState({ ...openState, length: !openState.length })
              }
            >
              <h3 className={"text-lg font-semibold"}>{t("Filter.lengths")}</h3>
              {openState.length ? (
                <FaMinus className={"font-semibold"} />
              ) : (
                <FaPlus className={"font-semibold"} />
              )}
            </div>
            <ul
              className={`transition-[max-height] duration-500 ease-in-out overflow-hidden gap-1 ${
                openState.length ? "max-h-[500px]" : "max-h-0"
              } flex flex-col`}
            >
              {filterData.lengths.values.map((length, index) => (
                <li
                  key={index}
                  className={"flex flex-row justify-start items-center gap-x-2"}
                >
                  <input
                    type="radio"
                    className="appearance-none w-5 h-5 border-2 cursor-pointer border-gray-400 rounded-md checked:bg-primary checked:border-secondary transition-all duration-300"
                    checked={selectedFilters.lengths === length}
                    value={length}
                    onChange={(e) =>
                      setSelectedFilters({
                        ...selectedFilters,
                        lengths: e.target.value,
                      })
                    }
                  />
                  <label
                    className={`font-medium transition-all duration-300 text-base ${
                      selectedFilters.lengths === length
                        ? "text-primary font-bold"
                        : "text-gray-500 font-thin"
                    }`}
                  >
                    {length}
                  </label>
                </li>
              ))}
            </ul>
            <hr className={"bg-secondaryDark mt-1"} />
          </div>
        </div>
      </div>

      {/* Desktop'ta sabit filtreler */}
      <div className="hidden md:flex flex-col gap-4 w-3/4 min-h-96">
        <h3 className="text-center text-2xl font-bold text-primary border-b border-secondary">
          {t("Filter.title")}
        </h3>

        {/* Bedenler */}
        <div className={"flex flex-col"}>
          <div
            className={
              "flex flex-row items-center justify-between  cursor-pointer mb-2 transition-all duration-300  text-secondaryDark hover:text-primary"
            }
            onClick={() =>
              setOpenState({ ...openState, size: !openState.size })
            }
          >
            <h3 className={"text-lg font-semibold"}>{t("Filter.sizes")}</h3>
            {openState.size ? (
              <FaMinus className={"font-semibold"} />
            ) : (
              <FaPlus className={" font-semibold"} />
            )}
          </div>
          <ul
            className={`transition-[max-height] duration-500 ease-in-out overflow-hidden gap-1 ${
              openState.size ? "max-h-[300px]" : "max-h-0"
            } flex flex-col`}
          >
            {filterData.sizes.values.map((size, index) => (
              <li key={index} className={"flex flex-row gap-x-3"}>
                <input
                  type="radio"
                  className="appearance-none w-5 h-5 border-2 cursor-pointer border-gray-400 rounded-md checked:bg-primary checked:border-secondary transition-all duration-300"
                  checked={selectedFilters.sizes === size}
                  value={size}
                  onChange={(e) =>
                    setSelectedFilters({
                      ...selectedFilters,
                      sizes: e.target.value,
                    })
                  }
                />
                <label
                  className={`font-medium transition-all duration-300 text-sm ${
                    selectedFilters.sizes === size
                      ? "text-primary font-bold"
                      : "text-gray-500 font-thin"
                  }`}
                >
                  {size}
                </label>
              </li>
            ))}
          </ul>
          <hr className={"bg-secondaryDark mt-1"} />
        </div>

        {/* Renkler */}
        <div className={"flex flex-col"}>
          <div
            className={
              "flex flex-row items-center justify-between  cursor-pointer mb-2 transition-all duration-300  text-secondaryDark hover:text-primary"
            }
            onClick={() =>
              setOpenState({ ...openState, color: !openState.color })
            }
          >
            <h3 className={"text-lg font-semibold"}>{t("Filter.colors")}</h3>
            {openState.color ? (
              <FaMinus className={" font-semibold"} />
            ) : (
              <FaPlus className={" font-semibold"} />
            )}
          </div>
          <ul
            className={`transition-[max-height] duration-500 ease-in-out overflow-hidden gap-1 ${
              openState.color ? "max-h-[300px]" : "max-h-0"
            } flex flex-col`}
          >
            {filterData.colors.values.map((color, index) => (
              <li key={index} className={"flex flex-row gap-x-3"}>
                <input
                  type="radio"
                  className="appearance-none w-5 h-5 border-2 cursor-pointer border-gray-400 rounded-md checked:bg-primary checked:border-secondary transition-all duration-300"
                  checked={selectedFilters.colors === color}
                  value={color}
                  onChange={(e) =>
                    setSelectedFilters({
                      ...selectedFilters,
                      colors: e.target.value,
                    })
                  }
                />

                <label
                  className={`font-medium transition-all duration-300 text-sm ${
                    selectedFilters.colors === color
                      ? "text-primary font-bold"
                      : "text-gray-500 font-thin"
                  }`}
                >
                  {t(`Filter.${color}`)}
                </label>
              </li>
            ))}
          </ul>
          <hr className={"bg-secondaryDark mt-1"} />
        </div>

        {/* Kategoriler */}
        <div className={"flex flex-col"}>
          <div
            className={
              "flex flex-row items-center justify-between  cursor-pointer mb-2 transition-all duration-300  text-secondaryDark hover:text-primary"
            }
            onClick={() =>
              setOpenState({ ...openState, category: !openState.category })
            }
          >
            <h3 className={"text-lg font-semibold"}>
              {t("Filter.categories")}
            </h3>
            {openState.category ? (
              <FaMinus className={" font-semibold"} />
            ) : (
              <FaPlus className={" font-semibold"} />
            )}
          </div>
          <ul
            className={`transition-[max-height] duration-500 ease-in-out overflow-hidden gap-1 ${
              openState.category ? "max-h-[500px]" : "max-h-0"
            } flex flex-col`}
          >
            {categories.map((category, index) => (
              <li key={index} className={"flex flex-row gap-x-3"}>
                <input
                  type="radio"
                  className="appearance-none w-5 h-5 border-2 cursor-pointer border-gray-400 rounded-md checked:bg-primary checked:border-secondary transition-all duration-300"
                  checked={selectedFilters.categories === category.name}
                  value={category.name}
                  onChange={(e) =>
                    setSelectedFilters({
                      ...selectedFilters,
                      categories: e.target.value,
                    })
                  }
                />

                <label
                  className={`font-medium transition-all duration-300 text-sm ${
                    selectedFilters.categories === category.name
                      ? "text-primary font-bold"
                      : "text-gray-500 font-thin"
                  }`}
                >
                  {category.name}
                </label>
              </li>
            ))}
          </ul>
          <hr className={"bg-secondaryDark mt-1"} />
        </div>

        {/* Uzunluk */}
        <div className={"flex flex-col"}>
          <div
            className={
              "flex flex-row items-center justify-between  cursor-pointer mb-2 transition-all duration-300  text-secondaryDark hover:text-primary"
            }
            onClick={() =>
              setOpenState({ ...openState, length: !openState.length })
            }
          >
            <h3 className={"text-lg font-semibold"}>{t("Filter.lengths")}</h3>
            {openState.length ? (
              <FaMinus className={" font-semibold"} />
            ) : (
              <FaPlus className={" font-semibold"} />
            )}
          </div>
          <ul
            className={`transition-[max-height] duration-500 ease-in-out overflow-hidden gap-1 ${
              openState.length ? "max-h-[500px]" : "max-h-0"
            } flex flex-col`}
          >
            {filterData.lengths.values.map((length, index) => (
              <li
                key={index}
                className="flex flex-row justify-start items-center gap-x-3"
              >
                <input
                  type="radio"
                  className="appearance-none w-5 h-5 border-2 cursor-pointer border-gray-400 rounded-md checked:bg-primary checked:border-secondary transition-all duration-300"
                  checked={selectedFilters.lengths === length}
                  value={length}
                  onChange={(e) =>
                    setSelectedFilters({
                      ...selectedFilters,
                      lengths: e.target.value,
                    })
                  }
                />
                <label
                  className={`font-medium transition-all duration-300 text-sm ${
                    selectedFilters.lengths === length
                      ? "text-primary font-bold"
                      : "text-gray-500 font-thin"
                  }`}
                >
                  {length}
                </label>
              </li>
            ))}
          </ul>
          <hr className={"bg-secondaryDark mt-1"} />
        </div>
      </div>
    </div>
  );
}

export default Filter;

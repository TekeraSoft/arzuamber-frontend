"use client";

import React, { useEffect, useState } from "react";
import { filterData } from "@/constans/Filter";
import { FaMinus, FaPlus, FaTimes } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  filterProductDispatch,
  getAllColorsDispatch,
  getAllProductsDispatch,
} from "@/store/productSlice";
import {
  getCategoriesDispatch,
  resetFilters,
  setShortCategory,
} from "@/store/categorySlice";
import { setFilterStatus } from "@/store/searchSlice";

function Filter({
  currnetPage,
  pageSize,
  slug,
}: {
  currnetPage: number;
  pageSize: number;
  slug?: string;
}) {
  const t = useTranslations();
  const dispatch = useDispatch<AppDispatch>();
  const { categories, shortCategory } = useSelector(
    (state: RootState) => state.category,
  );
  const { colors, FilteredProductsOnly } = useSelector(
    (state: RootState) => state.products,
  );
  const { filterStatus } = useSelector((state: RootState) => state.search);
  // Durum yönetimi: Kullanıcı seçimlerini saklamak için

  const [initialCategory, setInitialCategory] = useState(slug || null);

  const [selectedFilters, setSelectedFilters] = useState({
    sizes: null,
    colors: null,
    categories: initialCategory,
    lengths: null,
    sortDirection: null,
    onlyDiscounted: FilteredProductsOnly ? true : false,
  });

  const handleCheckboxChange = (e) => {
    setSelectedFilters({
      ...selectedFilters,
      onlyDiscounted: e.target.checked, // Checkbox işaretlendiğinde true, kaldırıldığında false
    });
  };

  const [openState, setOpenState] = useState({
    size: false,
    color: false,
    category: true,
    length: false,
  });

  // Filtre seçimlerini güncelleme işlevi
  useEffect(() => {
    const activeCategory = shortCategory
      ? shortCategory
      : selectedFilters.categories;

    if (activeCategory == shortCategory) {
      selectedFilters.categories = shortCategory;
    }

    // Eğer herhangi bir filtre değiştiyse
    const hasFilterChanged =
      selectedFilters.onlyDiscounted ||
      selectedFilters.sizes ||
      selectedFilters.colors ||
      selectedFilters.categories ||
      selectedFilters.lengths ||
      selectedFilters.sortDirection;

    if (hasFilterChanged) {
      // Burada eski ve yeni filtreleri karşılaştırabiliriz

      dispatch(
        filterProductDispatch({
          size: selectedFilters.sizes,
          color: selectedFilters.colors,
          category: activeCategory,
          length: selectedFilters.lengths,
          sortDirection: selectedFilters.sortDirection,
          onlyDiscounted: selectedFilters.onlyDiscounted,
          page: currnetPage,
          pageSize: pageSize,
        }),
      );
    } else {
      dispatch(getAllProductsDispatch(currnetPage, pageSize));
      dispatch(
        filterProductDispatch({
          size: selectedFilters.sizes,
          color: selectedFilters.colors,
          category: activeCategory,
          length: selectedFilters.lengths,
          sortDirection: selectedFilters.sortDirection,
          onlyDiscounted: selectedFilters.onlyDiscounted,
          page: currnetPage,
          pageSize: pageSize,
        }),
      );
    }

    dispatch(getCategoriesDispatch());
    dispatch(getAllColorsDispatch());

    dispatch(resetFilters(""));
  }, [
    selectedFilters.sizes,
    selectedFilters.colors,
    selectedFilters.categories,
    selectedFilters.lengths,
    dispatch,
    currnetPage,
    pageSize,
    slug,
    selectedFilters,
    shortCategory,
  ]);

  const handleSortingChange = (order) => {
    setSelectedFilters((prev) => ({
      ...prev,
      sortDirection: prev.sortDirection === order ? null : order, // Aynı değere tıklarsa sıfırlasın
    }));
  };

  return (
    <div className="relative lg:w-1/4 z-40  ">
      {/* Mobil Menü Butonu */}
      {/* <button
       onClick={() => dispatch(setFilterStatus(!filterStatus))}
        className={`${
          isMenuOpen ? "hidden" : "fixed"
        }   top-40 right-3  lg:hidden px-6 py-0.5 text-myblack  border  border-myblack rounded-md  flex justify-center items-center bg-transparent backdrop-blur-md  font-extrabold `}
      >
        {t("Filter.title")}
      </button> */}

      {/* Açılır Menü */}
      <div
        className={`fixed inset-0 backdrop-blur-sm z-50 lg:hidden transform transition-transform   ${
          filterStatus
            ? "translate-x-0 animate__fadeInLeft animate__animated animate__faster"
            : "-translate-x-full "
        }`}
        onClick={() => dispatch(setFilterStatus(!filterStatus))}
      >
        <div
          className="  bg-white flex flex-col gap-5  p-6 w-3/4 max-w-96 h-full z-2 overflow-y-auto "
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col justify-center items-end  mt-40 md:mt-48 w-full">
            <button
              onClick={() => dispatch(setFilterStatus(!filterStatus))}
              className=" w-6 h-6 lg:hidden p-1 text-primary  border  border-primary rounded-md   flex justify-center items-center  bg-mywhite transition-all duration-500 hover:scale-105 "
            >
              <FaTimes size={16} />
            </button>
            <h3 className="text-center text-2xl font-bold text-primary  w-full border-b border-secondary ">
              {t("Filter.title")}
            </h3>
          </div>

          {/* Mobil sabit filtreler */}

          {/*  Price Boxes && Discounted Products */}
          <div className="w-full flex flex-col gap-2">
            <div className="w-full flex gap-2 justify-start items-center">
              <input
                type="checkbox"
                className="appearance-none w-5 h-5 border-2 cursor-pointer border-gray-400 rounded-md checked:bg-primary checked:border-secondary transition-all duration-300"
                checked={selectedFilters.sortDirection === "asc"}
                onChange={() => handleSortingChange("asc")}
              />
              <label
                className={`text-sm transition-all duration-300 ${
                  selectedFilters.sortDirection === "asc"
                    ? "text-primary font-semibold"
                    : "text-gray-500 font-normal"
                }`}
              >
                {t("Filter.highToLow")}
              </label>
            </div>

            <div className="w-full flex gap-2 justify-start items-center">
              <input
                type="checkbox"
                className="appearance-none w-5 h-5 border-2 cursor-pointer border-gray-400 rounded-md checked:bg-primary checked:border-secondary transition-all duration-300"
                checked={selectedFilters.sortDirection === "desc"}
                onChange={() => handleSortingChange("desc")}
              />
              <label
                className={`text-sm transition-all duration-300 ${
                  selectedFilters.sortDirection === "desc"
                    ? "text-primary font-semibold"
                    : "text-gray-500 font-normal"
                }`}
              >
                {t("Filter.lowToHigh")}
              </label>
            </div>

            {/*    indirimli ürünler*/}
            <div className="flex justify-start items-center gap-2">
              <input
                type="checkbox"
                checked={selectedFilters.onlyDiscounted}
                onChange={handleCheckboxChange}
                className="appearance-none w-5 h-5 border-2 cursor-pointer border-gray-400 rounded-md checked:bg-primary checked:border-secondary transition-all duration-300"
              />
              <label
                className={`font-medium text-sm ${
                  selectedFilters.onlyDiscounted == true
                    ? "text-primary font-bold"
                    : "text-gray-500 font-thin"
                }`}
              >
                {t("Filter.discountedProducts")}
              </label>
            </div>
          </div>

          {/* Kategoriler */}
          <div className="flex flex-col">
            <div
              className="flex flex-row items-center justify-between cursor-pointer mb-2 transition-all duration-300 text-secondaryDark hover:text-primary"
              onClick={() =>
                setOpenState({ ...openState, category: !openState.category })
              }
            >
              <h3 className="text-lg font-semibold">
                {t("Filter.categories")}
              </h3>
              {openState.category ? (
                <FaMinus className="font-semibold" />
              ) : (
                <FaPlus className="font-semibold" />
              )}
            </div>
            <ul
              className={`transition-all duration-500 ease-in-out overflow-hidden gap-1 ${
                openState.category ? "max-h-[1000px]" : "max-h-0"
              } flex flex-col`}
            >
              {categories.map((category, index) => (
                <li key={index} className="flex flex-col gap-y-2">
                  <div
                    className="flex items-center gap-x-3"
                    onClick={() => dispatch(setShortCategory(""))}
                  >
                    <input
                      type="checkbox" // checkbox olarak kullanıyoruz
                      className="appearance-none w-5 h-5 border-2 cursor-pointer border-gray-400 rounded-md checked:bg-primary checked:border-secondary transition-all duration-300"
                      checked={selectedFilters.categories === category.name} // selectedFilters.categories sadece tek bir kategori
                      value={category.name}
                      onChange={(e) => {
                        if (selectedFilters.categories === category.name) {
                          // Eğer bu kategori zaten seçiliyse, seçili kategoriyi kaldır

                          setSelectedFilters({
                            ...selectedFilters,
                            categories: null, // Kategoriyi kaldır
                            // subCategories: null, // Alt kategoriyi sıfırla
                          });
                        } else {
                          // Eğer kategori seçili değilse, yeni kategoriye ata
                          setSelectedFilters({
                            ...selectedFilters,
                            categories: e.target.value,
                            // subCategories: null, // Alt kategoriyi sıfırla
                          });
                        }
                      }}
                    />
                    <label
                      className={`font-medium text-sm ${
                        selectedFilters.categories === category.name
                          ? "text-primary font-bold"
                          : "text-gray-500 font-thin"
                      }`}
                    >
                      {category.name}
                    </label>
                  </div>

                  {/* Alt Kategoriler
                  {selectedFilters.categories === category.name && (
                    <div className="ml-6 flex flex-col gap-1">
                      {category.subCategories.map((subcategory, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-start gap-2"
                        >
                          <input
                            type="checkbox" // checkbox olarak alt kategoriye de tıklanabilir
                            className="appearance-none w-5 h-5 border-2 cursor-pointer border-gray-400 rounded-md checked:bg-primary checked:border-secondary transition-all duration-300"
                            checked={
                              selectedFilters.subCategories === subcategory
                            } // selectedFilters.subCategories sadece tek bir alt kategori
                            value={subcategory}
                            onChange={(e) => {
                              if (
                                selectedFilters.subCategories === subcategory
                              ) {
                                // Eğer bu alt kategori zaten seçiliyse, alt kategoriyi kaldır
                                setSelectedFilters({
                                  ...selectedFilters,
                                  subCategories: null, // Alt kategoriyi kaldır
                                });
                              } else {
                                // Eğer alt kategori seçili değilse, yeni alt kategoriyi ata
                                setSelectedFilters({
                                  ...selectedFilters,
                                  subCategories: e.target.value,
                                });
                              }
                            }}
                          />
                          <label
                            className={`font-medium text-xs break-words ${
                              selectedFilters.subCategories === subcategory
                                ? "text-primary font-bold"
                                : "text-gray-500 font-thin"
                            }`}
                          >
                            {subcategory}
                          </label>
                        </div>
                      ))}
                    </div>
                  )} */}
                </li>
              ))}
            </ul>

            <hr className="bg-secondaryDark mt-2" />
          </div>

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
                openState.size ? "max-h-[1000px]" : "max-h-0"
              } flex flex-col h-full`}
            >
              {filterData.sizes.values.map((size, index) => (
                <li key={index} className="flex flex-row gap-x-3">
                  <input
                    type="checkbox"
                    className="appearance-none w-5 h-5 border-2 cursor-pointer border-gray-400 rounded-md checked:bg-primary checked:border-secondary transition-all duration-300"
                    checked={selectedFilters.sizes === size}
                    value={size}
                    onChange={() =>
                      setSelectedFilters({
                        ...selectedFilters,
                        sizes: selectedFilters.sizes === size ? null : size,
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
                <FaMinus className={"font-semibold"} />
              ) : (
                <FaPlus className={" font-semibold"} />
              )}
            </div>
            <ul
              className={`transition-[max-height] duration-500 ease-in-out overflow-hidden gap-1 ${
                openState.color ? "max-h-[1000px]" : "max-h-0"
              } flex flex-col`}
            >
              {colors.map((color, index) => (
                <li
                  key={index}
                  className={"flex flex-row justify-start items-center gap-x-2"}
                >
                  <input
                    type="checkbox"
                    className="appearance-none w-5 h-5 border-2 cursor-pointer border-gray-400 rounded-md checked:bg-primary checked:border-secondary transition-all duration-300"
                    checked={selectedFilters.colors === color.name}
                    value={color.name}
                    onChange={() => {
                      setSelectedFilters({
                        ...selectedFilters,
                        colors:
                          selectedFilters.colors === color.name
                            ? null
                            : color.name,
                      });
                    }}
                  />
                  <label
                    className={`font-medium transition-all duration-300 text-base ${
                      selectedFilters.colors === color.name
                        ? "text-primary font-bold"
                        : "text-gray-500 font-thin"
                    }`}
                  >
                    {color.name}
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
                openState.length ? "max-h-[1000px]" : "max-h-0"
              } flex flex-col`}
            >
              {filterData.lengths.values.map((length, index) => (
                <li
                  key={index}
                  className="flex flex-row justify-start items-center gap-x-3"
                >
                  <input
                    type="checkbox"
                    className="appearance-none w-5 h-5 border-2 cursor-pointer border-gray-400 rounded-md checked:bg-primary checked:border-secondary transition-all duration-300"
                    checked={selectedFilters.lengths === length}
                    value={length}
                    onChange={() =>
                      setSelectedFilters({
                        ...selectedFilters,
                        lengths:
                          selectedFilters.lengths === length ? null : length,
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

      {/* Desktop'ta sabit filtreler */}
      <div className="hidden lg:flex flex-col gap-4 w-3/4 min-h-96">
        <h3 className="text-center text-2xl font-bold text-primary border-b border-secondary">
          {t("Filter.title")}
        </h3>

        {/*  Price Boxes && Discounted Products */}
        <div className="w-full flex flex-col gap-2">
          <div className="w-full flex gap-2 justify-start items-center">
            <input
              type="checkbox"
              className="appearance-none w-5 h-5 border-2 cursor-pointer border-gray-400 rounded-md checked:bg-primary checked:border-secondary transition-all duration-300"
              checked={selectedFilters.sortDirection === "asc"}
              onChange={() => handleSortingChange("asc")}
            />
            <label
              className={`text-sm transition-all duration-300 ${
                selectedFilters.sortDirection === "asc"
                  ? "text-primary font-semibold"
                  : "text-gray-500 font-normal"
              }`}
            >
              {t("Filter.lowToHigh")}
            </label>
          </div>

          <div className="w-full flex gap-2 justify-start items-center">
            <input
              type="checkbox"
              className="appearance-none w-5 h-5 border-2 cursor-pointer border-gray-400 rounded-md checked:bg-primary checked:border-secondary transition-all duration-300"
              checked={selectedFilters.sortDirection === "desc"}
              onChange={() => handleSortingChange("desc")}
            />
            <label
              className={`text-sm transition-all duration-300 ${
                selectedFilters.sortDirection === "desc"
                  ? "text-primary font-semibold"
                  : "text-gray-500 font-normal"
              }`}
            >
              {t("Filter.highToLow")}
            </label>
          </div>

          {/*    indirimli ürünler*/}
          <div className="flex justify-start items-center gap-2">
            <input
              type="checkbox"
              checked={selectedFilters.onlyDiscounted}
              onChange={handleCheckboxChange}
              className="appearance-none w-5 h-5 border-2 cursor-pointer border-gray-400 rounded-md checked:bg-primary checked:border-secondary transition-all duration-300"
            />
            <label
              className={`font-medium text-sm ${
                selectedFilters.onlyDiscounted == true
                  ? "text-primary font-bold"
                  : "text-gray-500 font-thin"
              }`}
            >
              {t("Filter.discountedProducts")}
            </label>
          </div>
        </div>

        {/* Kategoriler */}
        <div className="flex flex-col">
          <div
            className="flex flex-row items-center justify-between cursor-pointer mb-2 transition-all duration-300 text-secondaryDark hover:text-primary"
            onClick={() =>
              setOpenState({ ...openState, category: !openState.category })
            }
          >
            <h3 className="text-lg font-semibold">{t("Filter.categories")}</h3>
            {openState.category ? (
              <FaMinus className="font-semibold" />
            ) : (
              <FaPlus className="font-semibold" />
            )}
          </div>

          <ul
            className={`transition-all duration-500 ease-in-out overflow-hidden gap-1 ${
              openState.category ? "max-h-[1000px]" : "max-h-0"
            } flex flex-col`}
          >
            {categories.map((category, index) => (
              <li key={index} className="flex flex-col gap-y-2">
                <div
                  className="flex items-center gap-x-3"
                  onClick={() => dispatch(setShortCategory(""))}
                >
                  <input
                    type="checkbox" // checkbox olarak kullanıyoruz
                    className="appearance-none w-5 h-5 border-2 cursor-pointer border-gray-400 rounded-md checked:bg-primary checked:border-secondary transition-all duration-300"
                    checked={selectedFilters.categories === category.name} // selectedFilters.categories sadece tek bir kategori
                    value={category.name}
                    onChange={(e) => {
                      if (selectedFilters.categories === category.name) {
                        // Eğer bu kategori zaten seçiliyse, seçili kategoriyi kaldır
                        setSelectedFilters({
                          ...selectedFilters,
                          categories: null, // Kategoriyi kaldır
                          // subCategories: null, // Alt kategoriyi sıfırla
                        });
                      } else {
                        // Eğer kategori seçili değilse, yeni kategoriye ata
                        setSelectedFilters({
                          ...selectedFilters,
                          categories: e.target.value,
                          // subCategories: null, // Alt kategoriyi sıfırla
                        });
                      }
                    }}
                  />
                  <label
                    className={`font-medium text-sm ${
                      selectedFilters.categories === category.name
                        ? "text-primary font-bold"
                        : "text-gray-500 font-thin"
                    }`}
                  >
                    {category.name}
                  </label>
                </div>

                {/* Alt Kategoriler
                  {selectedFilters.categories === category.name && (
                    <div className="ml-6 flex flex-col gap-1">
                      {category.subCategories.map((subcategory, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-start gap-2"
                        >
                          <input
                            type="checkbox" // checkbox olarak alt kategoriye de tıklanabilir
                            className="appearance-none w-5 h-5 border-2 cursor-pointer border-gray-400 rounded-md checked:bg-primary checked:border-secondary transition-all duration-300"
                            checked={
                              selectedFilters.subCategories === subcategory
                            } // selectedFilters.subCategories sadece tek bir alt kategori
                            value={subcategory}
                            onChange={(e) => {
                              if (
                                selectedFilters.subCategories === subcategory
                              ) {
                                // Eğer bu alt kategori zaten seçiliyse, alt kategoriyi kaldır
                                setSelectedFilters({
                                  ...selectedFilters,
                                  subCategories: null, // Alt kategoriyi kaldır
                                });
                              } else {
                                // Eğer alt kategori seçili değilse, yeni alt kategoriyi ata
                                setSelectedFilters({
                                  ...selectedFilters,
                                  subCategories: e.target.value,
                                });
                              }
                            }}
                          />
                          <label
                            className={`font-medium text-xs break-words ${
                              selectedFilters.subCategories === subcategory
                                ? "text-primary font-bold"
                                : "text-gray-500 font-thin"
                            }`}
                          >
                            {subcategory}
                          </label>
                        </div>
                      ))}
                    </div>
                  )} */}
              </li>
            ))}
          </ul>

          <hr className="bg-secondaryDark mt-2" />
        </div>

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
              openState.size ? "max-h-[1000px]" : "max-h-0"
            } flex flex-col h-full`}
          >
            {filterData.sizes.values.map((size, index) => (
              <li key={index} className="flex flex-row gap-x-3">
                <input
                  type="checkbox"
                  className="appearance-none w-5 h-5 border-2 cursor-pointer border-gray-400 rounded-md checked:bg-primary checked:border-secondary transition-all duration-300"
                  checked={selectedFilters.sizes === size}
                  value={size}
                  onChange={() =>
                    setSelectedFilters({
                      ...selectedFilters,
                      sizes: selectedFilters.sizes === size ? null : size,
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
              <FaMinus className={"font-semibold"} />
            ) : (
              <FaPlus className={" font-semibold"} />
            )}
          </div>
          <ul
            className={`transition-[max-height] duration-500 ease-in-out overflow-hidden gap-1 ${
              openState.color ? "max-h-[1000px]" : "max-h-0"
            } flex flex-col`}
          >
            {colors.map((color, index) => (
              <li
                key={index}
                className={"flex flex-row justify-start items-center gap-x-2"}
              >
                <input
                  type="checkbox"
                  className="appearance-none w-5 h-5 border-2 cursor-pointer border-gray-400 rounded-md checked:bg-primary checked:border-secondary transition-all duration-300"
                  checked={selectedFilters.colors === color.name}
                  value={color.name}
                  onChange={() => {
                    setSelectedFilters({
                      ...selectedFilters,
                      colors:
                        selectedFilters.colors === color.name
                          ? null
                          : color.name,
                    });
                  }}
                />
                <label
                  className={`font-medium transition-all duration-300 text-base ${
                    selectedFilters.colors === color.name
                      ? "text-primary font-bold"
                      : "text-gray-500 font-thin"
                  }`}
                >
                  {color.name}
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
              openState.length ? "max-h-[1000px]" : "max-h-0"
            } flex flex-col`}
          >
            {filterData.lengths.values.map((length, index) => (
              <li
                key={index}
                className="flex flex-row justify-start items-center gap-x-3"
              >
                <input
                  type="checkbox"
                  className="appearance-none w-5 h-5 border-2 cursor-pointer border-gray-400 rounded-md checked:bg-primary checked:border-secondary transition-all duration-300"
                  checked={selectedFilters.lengths === length}
                  value={length}
                  onChange={() =>
                    setSelectedFilters({
                      ...selectedFilters,
                      lengths:
                        selectedFilters.lengths === length ? null : length,
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

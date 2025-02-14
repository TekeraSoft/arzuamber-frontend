import React, {useEffect, useState} from "react";
import { filterData } from "../../../constans/Filter";
import FilterOption from "./FilterOption";
import {FaMinus, FaPlus, FaTimes} from "react-icons/fa";
import { MdFilterListAlt } from "react-icons/md";
import { useTranslations } from "next-intl";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/store/store";
import {filterProductDispatch} from "@/store/productSlice";

function Filter() {
  const t = useTranslations();
  const dispatch = useDispatch<AppDispatch>();
  // Durum yönetimi: Kullanıcı seçimlerini saklamak için
  const [selectedFilters, setSelectedFilters] = useState({
    sizes: "",
    colors: "",
    categories: "",
    lengths: "",
  });

  const [openState, setOpenState] = React.useState({size: false, color:false, category: false, length: false});

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
          })
      );
    }

  }, [
    selectedFilters.sizes,  // Boyut değiştiğinde
    selectedFilters.colors,  // Renk değiştiğinde
    selectedFilters.categories, // Kategori değiştiğinde
    selectedFilters.lengths, // Uzunluk değiştiğinde
    dispatch,  // Dispatch fonksiyonu da bağımlılık olarak eklenmeli
  ]);

  // Menü açma / kapama işlemi
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative md:w-1/4 z-50">
      {/* Mobil Menü Butonu */}
      <button
        onClick={toggleMenu}
        className={`${
          isMenuOpen ? "hidden" : "fixed"
        }   top-20 right-4  md:hidden p-1 text-myblack  border  border-myblack rounded-md z-50  flex justify-center items-center  bg-mywhite`}
      >
        <MdFilterListAlt size={24} />
      </button>

      {/* Açılır Menü */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden transform transition-transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={toggleMenu}
      >
        <div
          className="   p-6 w-3/4 h-full z-2"
          onClick={(e) => e.stopPropagation()} // Menü dışına tıklanmasını engellemek için
        >
          <h3 className="text-center text-2xl font-bold text-primary mb-4">
            {t("Filter.title")}
          </h3>

          <button
            onClick={toggleMenu}
            className="fixed top-6 left-60  md:hidden p-1 text-myblack  border  border-myblack rounded-md z-50  flex justify-center items-center  bg-mywhite"
          >
            <FaTimes size={16} />
          </button>

          {/* Bedenler */}
          <div className="w-full mb-4">
            <FilterOption
              title={t("Filter.sizes")}
              values={filterData.sizes.values}
              selectedValue={selectedFilters.sizes}
              onChange={(value) => handleFilterChange("sizes", value)}
            />
          </div>

          {/* Renkler */}
          <div className="w-full mb-4">
            <FilterOption
              title={t("Filter.colors")}
              values={filterData.colors.values}
              selectedValue={selectedFilters.colors}
              onChange={(value) => handleFilterChange("colors", value)}
            />
          </div>

          {/* Kategoriler */}
          <div className="w-full mb-4">
            <FilterOption
              title={t("Filter.categories")}
              values={filterData.categories.values}
              selectedValue={selectedFilters.categories}
              onChange={(value) => handleFilterChange("categories", value)}
            />
          </div>

          {/* Uzunluk */}
          <div className="w-full mb-4">
            <FilterOption
              title={t("Filter.lengths")}
              values={filterData.lengths.values}
              selectedValue={selectedFilters.lengths}
              onChange={(value) => handleFilterChange("lengths", value)}
            />
          </div>
        </div>
      </div>

      {/* Desktop'ta sabit filtreler */}
      <div className="hidden md:flex flex-col gap-4 w-3/4">
        <h3 className="text-center text-2xl font-bold text-primary">Filter</h3>

        {/* Bedenler */}

        <div className={'flex flex-col'}>
          <div className={'flex flex-row items-center justify-between pb-4'}>
            <h3 className={'text-lg text-secondaryDark font-semibold'}>{t('Filter.sizes')}</h3>
            {
              openState.size ? (
                  <FaMinus onClick={() => setOpenState({...openState, size: !openState.size})}
                           className={'text-secondaryDark cursor-pointer font-semibold'}/>
              ) : (
                  <FaPlus onClick={() => setOpenState({...openState, size: !openState.size})}
                          className={'text-secondaryDark cursor-pointer font-semibold'}/>
              )
            }
          </div>
          <ul className={`${openState.size ? 'block' : 'hidden'} flex flex-col gap-y-2 mt-2`}>
            {
              filterData.sizes.values.map((size, index) => (
                  <li key={index} className={'flex flex-row gap-x-3'}>
                    <input type={'radio'} checked={selectedFilters.sizes === size} value={size}
                           onChange={e => setSelectedFilters({...selectedFilters, sizes: e.target.value})}/>
                    <label>{size}</label>
                  </li>
              ))
            }
          </ul>
          <hr className={'bg-secondaryDark mt-4'}/>
        </div>

        {/* Renkler */}

        <div className={'flex flex-col'}>
          <div className={'flex flex-row items-center justify-between pb-4'}>
            <h3 className={'text-lg text-secondaryDark font-semibold'}>{t('Filter.colors')}</h3>
            {
              openState.color ? (
                  <FaMinus onClick={() => setOpenState({...openState, color: !openState.color})}
                           className={'text-secondaryDark cursor-pointer font-semibold'}/>
              ) : (
                  <FaPlus onClick={() => setOpenState({...openState, color: !openState.color})}
                          className={'text-secondaryDark cursor-pointer font-semibold'}/>
              )
            }
          </div>
          <ul className={`${openState.color ? 'block' : 'hidden'} transition-all flex flex-col gap-y-2 mt-2`}>
            {
              filterData.colors.values.map((color, index) => (
                  <li key={index} className={'flex flex-row gap-x-3'}>
                    <input type={'radio'} checked={selectedFilters.colors === color} value={color}
                           onChange={e => setSelectedFilters({...selectedFilters, colors: e.target.value})}/>
                    <label>{t(`Filter.${color}`)}</label>
                  </li>
              ))
            }
          </ul>
          <hr className={'bg-secondaryDark mt-4'}/>
        </div>

        {/* Kategoriler */}

        <div className={'flex flex-col'}>
          <div className={'flex flex-row items-center justify-between pb-4'}>
            <h3 className={'text-lg text-secondaryDark font-semibold'}>{t('Filter.categories')}</h3>
            {
              openState.category ? (
                  <FaMinus onClick={() => setOpenState({...openState, category: !openState.category})}
                           className={'text-secondaryDark cursor-pointer font-semibold'}/>
              ) : (
                  <FaPlus onClick={() => setOpenState({...openState, category: !openState.category})}
                          className={'text-secondaryDark cursor-pointer font-semibold'}/>
              )
            }
          </div>
          <ul className={`${openState.category ? 'block' : 'hidden'} transition-all flex flex-col gap-y-2 mt-2`}>
            {
              filterData.categories.values.map((category, index) => (
                  <li key={index} className={'flex flex-row gap-x-3'}>
                    <input type={'radio'} checked={selectedFilters.categories === category} value={category}
                           onChange={e => setSelectedFilters({...selectedFilters, categories: e.target.value})}/>
                    <label>{category}</label>
                  </li>
              ))
            }
          </ul>
          <hr className={'bg-secondaryDark mt-4'}/>
        </div>

        {/* Uzunluk */}

        <div className={'flex flex-col'}>
          <div className={'flex flex-row items-center justify-between pb-4'}>
            <h3 className={'text-lg text-secondaryDark font-semibold'}>{t('Filter.lengths')}</h3>
            {
              openState.length ? (
                  <FaMinus onClick={() => setOpenState({...openState, length: !openState.length})}
                           className={'text-secondaryDark cursor-pointer font-semibold'}/>
              ) : (
                  <FaPlus onClick={() => setOpenState({...openState, length: !openState.length})}
                          className={'text-secondaryDark cursor-pointer font-semibold'}/>
              )
            }
          </div>
          <ul className={`${openState.length ? 'block' : 'hidden'} transition-all flex flex-col gap-y-2 mt-2`}>
            {
              filterData.lengths.values.map((length, index) => (
                  <li key={index} className={'flex flex-row gap-x-3'}>
                    <input type={'radio'} checked={selectedFilters.lengths === length} value={length}
                           onChange={e => setSelectedFilters({...selectedFilters, lengths: e.target.value})}/>
                    <label>{length}</label>
                  </li>
              ))
            }
          </ul>
          <hr className={'bg-secondaryDark mt-4'}/>
        </div>
      </div>
    </div>
  );
}

export default Filter;

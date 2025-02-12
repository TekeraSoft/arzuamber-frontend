import { useState } from "react";
import { filterData } from "../../../constans/Filter";
import FilterOption from "./FilterOption";
import { FaTimes } from "react-icons/fa";
import { MdFilterListAlt } from "react-icons/md";
import { useTranslations } from "next-intl";

function Filter() {
  const t = useTranslations();
  // Durum yönetimi: Kullanıcı seçimlerini saklamak için
  const [selectedFilters, setSelectedFilters] = useState({
    sizes: "",
    colors: "",
    categories: "",
    lengths: "",
  });

  // Menü görünürlüğünü kontrol etmek için
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Filtre seçimlerini güncelleme işlevi
  const handleFilterChange = (filterCategory: string, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterCategory]: value,
    }));
  };

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
        <hr className="w-full" />

        {/* Bedenler */}

        <FilterOption
          title={t("Filter.sizes")}
          values={filterData.sizes.values}
          selectedValue={selectedFilters.sizes}
          onChange={(value) => handleFilterChange("sizes", value)}
        />

        {/* Renkler */}

        <FilterOption
          title={t("Filter.colors")}
          values={filterData.colors.values}
          selectedValue={selectedFilters.colors}
          onChange={(value) => handleFilterChange("colors", value)}
        />

        {/* Kategoriler */}

        <FilterOption
          title={t("Filter.categories")}
          values={filterData.categories.values}
          selectedValue={selectedFilters.categories}
          onChange={(value) => handleFilterChange("categories", value)}
        />

        {/* Uzunluk */}

        <FilterOption
          title={t("Filter.lengths")}
          values={filterData.lengths.values}
          selectedValue={selectedFilters.lengths}
          onChange={(value) => handleFilterChange("lengths", value)}
        />
      </div>
    </div>
  );
}

export default Filter;

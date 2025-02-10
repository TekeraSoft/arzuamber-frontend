import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

interface FilterOptionProps {
  title: string;
  values: string[];
  selectedValue: string;
  onChange: (value: string) => void;
}

const FilterOption: React.FC<FilterOptionProps> = ({
  values,
  selectedValue,
  onChange,
  title,
}) => {
  // Başlık tıklandığında içerik görünürlüğünü kontrol etmek için durum yönetimi
  const [isOpen, setIsOpen] = useState(false);

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col justify-center items-start gap-2">
      {/* Başlık kısmı ve ikon */}
      <div
        className="flex justify-between items-center cursor-pointer w-full"
        onClick={toggleFilter}
      >
        <h4 className="text-primary font-bold w-full">{title}</h4>
        {isOpen ? (
          <FaMinus className="text-primary" />
        ) : (
          <FaPlus className="text-primary" />
        )}
      </div>
      <hr className="w-full my-1" />

      {/* İçerik kısmı - sadece tıklanınca görünür */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {isOpen && (
          <div className="form-check-inline">
            {values.map((value, index) => (
              <div
                key={index}
                className="form-check form-check-inline flex justify-start items-center gap-2"
              >
                <input
                  type="radio"
                  value={value}
                  checked={selectedValue === value}
                  onChange={() => onChange(value)}
                  className="form-check-input"
                />
                <label
                  className={`form-check-label ${
                    selectedValue === value ? "font-bold" : ""
                  }`}
                >
                  {value}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterOption;

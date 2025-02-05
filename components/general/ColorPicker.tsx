import React from "react";

interface ColorPickerProps {
  colors: string[];
  onColorSelect: (color: string) => void;
  selectedColor: string | null;
}

const colorMapping: { [key: string]: string } = {
  red: "bg-red-500",
  green: "bg-green-500",
  blue: "bg-blue-500",
  black: "bg-black",
  white: "bg-white text-black",
  yellow: "bg-yellow-500",
  purple: "bg-purple-500",
  gray: "bg-gray-500",
};

const ColorPicker = ({
  colors,
  onColorSelect,
  selectedColor,
}: ColorPickerProps) => {
  const handleColorSelect = (color: string) => {
    onColorSelect(color); // Seçilen rengi üst bileşene gönder
  };

  return (
    <div className="flex  gap-2 md:space-x-4 flex-wrap  items-center justify-center w-full">
      {colors.map((color, index) => {
        const normalizedColor = color.toLowerCase();
        const bgClass = colorMapping[normalizedColor] || "bg-gray-300";

        return (
          <div
            key={index}
            className={`md:w-10 md:h-10 h-8 w-8 p-1 rounded-full cursor-pointer flex items-center justify-center border-2 ${
              selectedColor === color ? "border-myblack" : "border-gray-300"
            }`}
            onClick={() => handleColorSelect(color)}
          >
            <div className={`w-full h-full rounded-full ${bgClass}`}></div>
          </div>
        );
      })}
    </div>
  );
};

export default ColorPicker;

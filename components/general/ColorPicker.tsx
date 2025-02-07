import Image from "next/image";
import React from "react";

interface Color {
  name: string;
  imageUrl: string;
}

interface ColorPickerProps {
  colors: Color[];
  onColorSelect: (color: Color) => void;
  selectedColor: Color | null;
}

const ColorPicker = ({
  colors,
  onColorSelect,
  selectedColor,
}: ColorPickerProps) => {
  const handleColorSelect = (color: Color) => {
    onColorSelect(color); // Seçilen rengi üst bileşene gönder
  };

  return (
    <div className="flex gap-2 md:space-x-4 flex-wrap items-center justify-start w-full">
      {colors.map((color, index) => (
        <div
          key={index}
          className={`relative p-1 cursor-pointer flex items-center justify-center border-2 
            ${
              selectedColor?.name === color.name
                ? "border-myblack"
                : "border-gray-300"
            }`}
          onClick={() => handleColorSelect(color)} // Seçilen rengin tamamı gönderiliyor
        >
          <div className="relative w-12 h-12">
            <Image
              src={color.imageUrl}
              alt={`Color option ${color.name}`}
              fill
              sizes="(max-width: 640px) 30vw, (max-width: 1024px) 20vw, 10vw"
              className="object-cover"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ColorPicker;

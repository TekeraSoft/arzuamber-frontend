import Image from "next/image";
import React from "react";

interface ColorPickerProps {
  colors: { name: string; imageUrl: string }[];
  onColorSelect: (colorName: string) => void;
  selectedColor: { name: string } | null;
}

const ColorPicker = ({
  colors,
  onColorSelect,
  selectedColor,
}: ColorPickerProps) => {
  const handleColorSelect = (color: { name: string; imageUrl: string }) => {
    onColorSelect(color.name); // sadece renk ismini üst bileşene gönder
  };

  return (
    <div className="flex gap-2  items-start justify-center w-full flex-wrap">
      {colors.map((color, index) => (
        <div
          key={index}
          className={`relative p-1 cursor-pointer flex items-center justify-center border-2 
            ${
              selectedColor?.name === color.name
                ? "border-myblack"
                : "border-gray-300"
            }`}
          onClick={() => handleColorSelect(color)}
        >
          <div className="relative w-10 h-12">
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

import React from "react";
import { IconType } from "react-icons";

interface ButtonProps {
  text?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  size?: "icon" | "small" | "medium" | "large" | "cart" | "cartIcon" | "center";
  color?: "primary" | "secondary" | "third" | "fourth" | "default";
  outline?: boolean;
  icon?: IconType | undefined;
  disabled?: boolean;
  animation?: boolean;
  iconSize?: number;
  className?: string;
  type?: "button" | "submit" | "reset";
}

function Button({
  text,
  onClick,
  size = "medium",
  outline,
  disabled,
  icon: Icon,
  animation,
  iconSize = 20,
  className,
  color = "primary",
}: ButtonProps) {
  const sizeClasses = {
    icon: "w-[40px] h-[40px]",
    cart: "w-[70px]",
    small: "w-[250px]",
    medium: "w-[800px]",
    large: "w-full h-10",
    center: "w-3/4 h-10",
    cartIcon:
      "w-8 h-8 flex justify-center items-center r text-mywhite rounded-lg hover:bg-secondaryLight hover:text-primary hover:scale-110 transition-all shadow-md",
  };

  const colorClasses = {
    primary: "bg-primary text-mywhite",
    secondary: "bg-secondary text-mywhite",
    third: "bg-third text-mywhite",
    fourth: "bg-fourth text-mywhite",
    default: " text-sm rounded-md md:rounded-none",
  };

  const buttonClasses = outline
    ? `border border-myblack bg-mywhite text-${color}`
    : colorClasses[color];

  return (
    <button
      className={`rounded-lg flex justify-center items-center gap-2 text-center    
        ${className}
        ${buttonClasses} 
        ${sizeClasses[size]} 
        ${size === "cartIcon" ? "p-0" : "p-3"}
        ${
          animation
            ? "hover:brightness-110 hover:scale-105 transition-all duration-300 transform-origin-center"
            : ""
        }
      `}
      disabled={disabled}
      onClick={onClick}
    >
      {text} {Icon && <Icon size={iconSize} />}
    </button>
  );
}

export default Button;

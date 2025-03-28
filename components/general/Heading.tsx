import React from "react";

interface HeadingProps {
  center?: boolean;
  text: string;
  color?: "black" | "white";
  font?: "bold" | "semibold" | "extrabold";
  textSize?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
  hr?: boolean;
}

const Heading = ({
  center,
  text,
  color = "black",
  font = "semibold",
  textSize = "2xl",
  hr,
}: HeadingProps) => {
  return (
    <div className="mt-7 mb-4 md:mb-8 flex items-center justify-center flex-col">
      <h3
        className={`px-3 md:px-10
          ${center ? "text-center" : "text-start"}
          ${hr ? "mb-5" : "mb-0"}
          ${color === "black" ? "text-black" : "text-white"}
          ${
            font === "extrabold"
              ? "font-extrabold"
              : font === "semibold"
                ? "font-semibold"
                : "font-bold"
          }
          text-${textSize}
          
          // Responsive adjustments
          sm:text-lg md:text-xl lg:text-2xl xl:text-3xl  // Farklı ekran boyutları için metin boyutu
        `}
      >
        {text}
      </h3>
      {hr ? (
        <hr
          className={`  text-center w-3/4 md:w-full
            ${color === "black" ? "bg-myblack" : "bg-mywhite"}
            sm:w-2/3 md:w-3/4 lg:w-full`} // Responsive hr genişliği
        />
      ) : null}
    </div>
  );
};

export default Heading;

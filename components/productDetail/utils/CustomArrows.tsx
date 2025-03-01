import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { ArrowProps } from "react-multi-carousel";

export function CustomLeftArrow({ onClick }: ArrowProps) {
  return (
    <button
      className="absolute rounded-full left-0 z-5 opacity-70 bg-mywhite p-2 md:p-3 hover:opacity-100"
      onClick={onClick}
    >
      <BiLeftArrow className="text-secondary" size={24} />
    </button>
  );
}

export function CustomRightArrow({ onClick }: ArrowProps) {
  return (
    <button
      className="absolute rounded-full right-0 z-5 opacity-70 bg-mywhite p-2 md:p-3 hover:opacity-100"
      onClick={onClick}
    >
      <BiRightArrow className="text-secondary" size={24} />
    </button>
  );
}

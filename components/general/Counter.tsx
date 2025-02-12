import { CardProductProps } from "@/types/Props";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
  cardProduct: CardProductProps;
  increaseFunc: () => void;
  descreaseFunc: () => void;
}

function Counter({ cardProduct, increaseFunc, descreaseFunc }: CounterProps) {
  const buttonStyle =
    "border border-secondary rounded-lg px-4 py-2 text-base text-gray-600 hover:bg-primary hover:text-white transition-all transform hover:scale-110";

  return (
    <div className="flex items-center justify-center gap-4  w-full">
      <button onClick={descreaseFunc} className={buttonStyle}>
        <AiOutlineMinus />
      </button>

      <p className="text-xl font-semibold">{cardProduct.quantity}</p>

      <button onClick={increaseFunc} className={buttonStyle}>
        <AiOutlinePlus />
      </button>
    </div>
  );
}

export default Counter;

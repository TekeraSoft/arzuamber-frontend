import { Link } from "@/i18n/routing";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useTranslations } from "next-intl";

import { closeCartModal } from "@/store/modalsSlice";
import { useDispatch } from "react-redux";

const EmptyCart = () => {
  const t = useTranslations();
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeCartModal());
  };

  return (
    <div className="flex justify-center items-center  border-y">
      <div className="p-6 text-center max-w-md flex justify-center items-center flex-col">
        <AiOutlineShoppingCart className="w-12 h-12 md:w-24 md:h-24 mx-auto text-secondary mb-4" />
        <p className="text-3xl font-semibold text-gray-700">
          {t("CartPage.emptyCart.title")}
        </p>

        <Link href={`/products`} onClick={() => handleCloseModal()}>
          <p className="text-mywhite mt-4 bg-secondary px-1 py-2 rounded-lg shadow-lg md:text-lg w-72 hover:scale-105 transition duration-300">
            {t("CartPage.emptyCart.message")}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;

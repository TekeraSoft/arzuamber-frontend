"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { removeFromCart } from "@/store/cartSlice";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import Loading from "../utils/Loading";
import TextClip from "../utils/TextClip";
import Heading from "../general/Heading";
import CartSummary from "./CartSummary";
import { MdOutlineDeleteOutline, MdClose } from "react-icons/md";
import { useTranslations } from "next-intl";
import Button from "../general/Button";
import { closeCartModal } from "@/store/modalsSlice";
import EmptyCart from "./EmptyCart";

function CartSidebar() {
  const dispatch = useDispatch();
  const t = useTranslations();
  const carts = useSelector((state: RootState) => state.cart.carts);
  const { isCartModalOpen } = useSelector((state: RootState) => state.modals);
  const [isClient, setIsClient] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        dispatch(closeCartModal());
      }
    };

    if (isCartModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCartModalOpen, dispatch]);

  if (!isClient) {
    return <Loading />;
  }

  const removeItemFromCart = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const toggleModal = () => {
    dispatch(closeCartModal());
  };

  return (
    <div>
      {isCartModalOpen && (
        <div className="fixed inset-0 z-50 bg-gray-500 bg-opacity-50 flex justify-end items-start">
          <div
            ref={modalRef}
            className="w-full sm:w-96 md:w-2/4 lg:w-1/4 h-full flex flex-col justify-start items-center gap-5 bg-white border border-gray-200 overflow-hidden px-5"
          >
            <div className="absolute top-3 right-3">
              <Button
                icon={MdClose}
                onClick={toggleModal}
                size="icon"
                color="secondary"
              />
            </div>

            <Heading
              text={t("CartPage.heading")}
              center
              textSize="4xl"
              font="bold"
            />

            {!carts || carts.length === 0 ? (
              <EmptyCart />
            ) : (
              <>
                <div className="flex flex-col gap-5 w-full">
                  <div className="w-full max-h-72 md:max-h-96 overflow-y-auto border px-1 rounded-lg">
                    {carts.map((cart) => {
                      const discountedPrice =
                        cart.price - (cart.price * cart.discountPercent) / 100;
                      return (
                        <div
                          key={cart.id}
                          className="flex flex-row justify-between items-start border-b border-gray-200 py-4 gap-4"
                        >
                          <div className="flex justify-center sm:justify-start">
                            <Image
                              src={cart.image}
                              alt={cart.name}
                              width={80}
                              height={80}
                              priority
                              className="rounded-md object-cover h-12 w-12"
                            />
                          </div>

                          <div className="w-full sm:w-3/4 flex flex-row justify-around items-center sm:items-start gap-2 sm:gap-5">
                            <h3 className="font-semibold text-xs text-gray-900">
                              {TextClip(cart.name)}
                            </h3>
                            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                              <p className="text-gray-500 text-xs">
                                {cart.size}
                              </p>
                              <p className="text-gray-500 text-xs">
                                {cart.color}
                              </p>
                            </div>
                            <div className="flex flex-col  items-center jsutif-center">
                              <p className="font-semibold text-gray-900 text-xs">
                                {discountedPrice}
                                {t("CartPage.cartPriceSymbol")}
                              </p>
                              <p className="text-gray-500 text-xs">
                                {cart.quantity} {t("CartPage.quantity")}
                              </p>
                            </div>
                          </div>

                          <div className="w-16 flex justify-center items-center">
                            <Button
                              type="button"
                              onClick={() => removeItemFromCart(cart.id)}
                              icon={MdOutlineDeleteOutline}
                              iconSize={20}
                              color="third"
                              className="w-full sm:w-auto h-8"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <CartSummary
                    total={
                      carts.reduce(
                        (total, item) =>
                          total +
                          (item.price -
                            (item.price * item.discountPercent) / 100) *
                            item.quantity,
                        0
                      ) + 150
                    }
                    tax={150}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CartSidebar;

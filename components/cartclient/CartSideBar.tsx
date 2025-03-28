"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { removeFromCart } from "@/store/cartSlice";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import Loading from "../utils/Loading";
import Heading from "../general/Heading";
import CartSummary from "./CartSummary";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useTranslations } from "next-intl";
import Button from "../general/Button";
import { closeCartModal } from "@/store/modalsSlice";
import EmptyCart from "./EmptyCart";
import { IoIosClose } from "react-icons/io";

function CartSidebar() {
  const dispatch = useDispatch();
  const t = useTranslations();
  const { cartProducts, total, loading } = useSelector(
    (state: RootState) => state.cart
  );
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
        <div className="fixed inset-0 z-50 bg-gray-500 bg-opacity-50 flex justify-end items-start ">
          <div
            ref={modalRef}
            className={`w-96  md:w-2/4 lg:w-2/5 xl:w-1/4 h-full flex flex-col justify-start items-center gap-5 bg-white border border-gray-200 overflow-hidden px-6 animate__animated animate__fadeInRight animate__faster`}
          >
            {loading && (
              <div
                className={
                  "absolute bg-opacity-100 bg-secondary w-full h-screen"
                }
              >
                <Loading />
              </div>
            )}
            <div className="absolute top-3 right-3">
              <button
                onClick={toggleModal}
                className="bg-secondary text-white w-8 h-8 flex justify-center items-center rounded-lg hover:opacity-75 transition duration-300"
              >
                <IoIosClose size={25} />
              </button>
            </div>

            <Heading
              text={t("CartPage.heading")}
              center
              textSize="4xl"
              font="bold"
            />

            {!cartProducts || cartProducts.length === 0 ? (
              <EmptyCart />
            ) : (
              <>
                <div className="flex flex-col gap-5 w-full">
                  <div className="w-full max-h-72 md:max-h-96 overflow-y-auto border px-2 rounded-lg">
                    {cartProducts.map((cart, index) => {
                      return (
                        <div
                          key={index}
                          className="flex flex-row justify-between items-center border-b border-gray-200 py-4 gap-4"
                        >
                          <div className="flex justify-center sm:justify-start">
                            <Image
                              src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${cart.image}`}
                              alt={cart.image}
                              width={80}
                              height={80}
                              priority
                              className="rounded-md object-cover h-12 w-12"
                            />
                          </div>

                          <div className="w-full sm:w-3/4 flex flex-row justify-around items-center sm:items-start gap-2 sm:gap-5">
                            <h3 className="font-semibold text-xs text-gray-900">
                              {cart.name}
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
                              <p className="text-gray-500 text-xs">
                                {cart.quantity} {t("CartPage.quantity")}
                              </p>
                            </div>
                          </div>

                          <div className="w-16 flex justify-center items-center">
                            <Button
                              type="button"
                              onClick={() =>
                                removeItemFromCart({
                                  id: cart.id,
                                  color: cart.color,
                                  size: cart.size,
                                })
                              }
                              icon={MdOutlineDeleteOutline}
                              iconSize={18}
                              color="third"
                              className="w-full sm:w-auto h-8"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <CartSummary total={total} />
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

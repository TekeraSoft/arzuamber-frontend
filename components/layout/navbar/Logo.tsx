import { Link } from "@/i18n/routing";
import { clearOrderSummaryProduct } from "@/store/cartSlice";
import { AppDispatch } from "@/store/store";
import Image from "next/image";
import React from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";

function Logo({ setOpenMenu, openMenu }) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="flex justify-center items-center">
      <button
        onClick={() => setOpenMenu(!openMenu)}
        className=" lg:hidden  text-secondary  md:text-xl focus:outline-none border border-secondary rounded-md p-1"
      >
        {openMenu ? <FaTimes /> : <FaBars />}
      </button>

      <Link href="/" onClick={() => dispatch(clearOrderSummaryProduct())}>
        <div className="relative w-full h-auto">
          <Image
            src="/images/logo/navbarlogo.svg"
            alt="logo image"
            width={250}
            height={50}
            className="object-cover bg-center bg-cover w-28 md:w-64"
            priority
          />
        </div>
      </Link>
    </div>
  );
}

export default Logo;

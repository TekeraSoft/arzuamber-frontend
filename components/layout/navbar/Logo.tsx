import { Link } from "@/i18n/routing";
import Image from "next/image";
import React from "react";

function Logo() {
  return (
    <Link href="/">
      <div className="relative w-full h-auto">
        <Image
          src="/images/logo/navbarlogo.svg"
          alt="logo image"
          width={250}
          height={50}
          className="object-cover bg-center bg-cover w-36 md:w-64"
        />
      </div>
    </Link>
  );
}

export default Logo;

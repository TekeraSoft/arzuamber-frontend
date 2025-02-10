import { Link } from "@/i18n/routing";
import Image from "next/image";
import React from "react";

function Logo() {
  return (
    <div className="relative w-72 h-10 flex justify-center items-center ">
      <Link href="/">
        <Image
          src="/images/logo/8.png" // Doğru yol
          alt="logo image"
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 10vw"
          className=" w-full h-full object-contain"
        />
      </Link>
    </div>
  );
}

export default Logo;

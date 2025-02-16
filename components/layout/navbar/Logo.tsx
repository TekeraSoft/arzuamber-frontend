import { Link } from "@/i18n/routing";
import Image from "next/image";
import React from "react";

function Logo() {
  return (
    <Link href="/">
      <Image
        src="/images/logo/navbarlogo.svg"
        alt="logo image"
        width={250}
        height={50}
        layout="responsive"
        className="object-cover  bg-center bg-cover"
      />
    </Link>
  );
}

export default Logo;

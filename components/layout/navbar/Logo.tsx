import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <div className="text-2xl md:text-4xl font-serif font-bold underline underline-offset-4 md:text-secondary text-myblack">
      <Link href="/">ARZUAMBER</Link>
    </div>
  );
}

export default Logo;

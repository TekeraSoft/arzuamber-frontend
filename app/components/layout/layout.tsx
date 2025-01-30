"use client";

import React from "react";

import Footer from "./footer/footer";
import { ToastContainer } from "react-toastify";
import { usePathname } from "next/navigation";
import Navbar from "./navbar/Navbar";

interface RoutesLayoutProps {
  children: React.ReactNode;
}

function LayoutProvider({ children }: RoutesLayoutProps) {
  const pathname = usePathname();

  return (
    <div
      className={`flex flex-col ${
        pathname.startsWith("/admin") ? "h-screen" : "h-full"
      }`}
    >
      <Navbar />
      <ToastContainer />
      <main className="flex-grow mt-16 md:mt-28">{children}</main>
      <Footer />
    </div>
  );
}

export default LayoutProvider;

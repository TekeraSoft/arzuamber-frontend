"use client";

import React from "react";

import Footer from "./footer/footer";
import { ToastContainer } from "react-toastify";
import { usePathname } from "next/navigation";
import Navbar from "./navbar/Navbar";
import RegisterForm from "@/components/auth/RegisterForm";
import LoginForm from "@/components/auth/LoginForm";

interface RoutesLayoutProps {
  children: React.ReactNode;
}

function LayoutProvider({ children }: RoutesLayoutProps) {

  return (
    <div
      className={`flex flex-col`}
    >
      <Navbar />
      <ToastContainer position={'bottom-right'} />
      <main className="flex-grow mt-16 md:mt-28">
        <RegisterForm />
        <LoginForm />
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default LayoutProvider;

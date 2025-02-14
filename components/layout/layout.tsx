"use client";

import React from "react";

import Footer from "./footer/footer";
import { ToastContainer } from "react-toastify";
import Navbar from "./navbar/Navbar";
import RegisterForm from "../auth/RegisterForm";
import LoginForm from "../auth/LoginForm";
import {usePathname} from "@/i18n/routing";

interface RoutesLayoutProps {
  children: React.ReactNode;
}

function LayoutProvider({ children }: RoutesLayoutProps) {
    const path = usePathname()

  return (
    <div className={`flex flex-col `}>
        {path.startsWith("/admin") ? null : <Navbar />}
      <ToastContainer position={'bottom-right'} duration={300} autoClose={2000} />
      <main className={`${path.startsWith("/admin") ? '': 'flex-grow mt-16 md:mt-28'}`}>
        <RegisterForm />
        <LoginForm />
        {children}
      </main>
        {path.startsWith("/admin") ? null : <Footer />}
    </div>
  );
}

export default LayoutProvider;

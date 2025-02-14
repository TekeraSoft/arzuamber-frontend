"use client";

import React from "react";

import Footer from "./footer/footer";
import { ToastContainer } from "react-toastify";
import Navbar from "./navbar/Navbar";
import RegisterForm from "../auth/RegisterForm";
import LoginForm from "../auth/LoginForm";
import CartSidebar from "../cartclient/CartSideBar";
import GradientColorContainer from "../Containers/BackGroundImageContainer";
import {usePathname} from "@/i18n/routing";

interface RoutesLayoutProps {
  children: React.ReactNode;
}

function LayoutProvider({ children }: RoutesLayoutProps) {

  const path = usePathname()


  return (
    <div className={`flex flex-col `}>
      <GradientColorContainer>
        {path.startsWith("/admin") ? null:<Navbar />}
        <ToastContainer />
        <main className={`${path.startsWith("/admin") ? '':'flex-grow mt-16 md:mt-28'}`}>
          <CartSidebar />
          <RegisterForm />
          <LoginForm />
          {children}
        </main>
        {path.startsWith("/admin") ? null:<Footer />}
      </GradientColorContainer>
    </div>
  );
}

export default LayoutProvider;

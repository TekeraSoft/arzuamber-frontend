"use client";

import React from "react";

import Footer from "./footer/footer";
import { ToastContainer } from "react-toastify";
import Navbar from "./navbar/Navbar";
import RegisterForm from "../auth/RegisterForm";
import LoginForm from "../auth/LoginForm";
import CartSidebar from "../cartclient/CartSideBar";
import GradientColorContainer from "../Containers/BackGroundImageContainer";

interface RoutesLayoutProps {
  children: React.ReactNode;
}

function LayoutProvider({ children }: RoutesLayoutProps) {
  return (
    <div className={`flex flex-col `}>
      <GradientColorContainer>
        <Navbar />
        <ToastContainer />
        <main className="flex-grow mt-16 md:mt-28">
          <CartSidebar />
          <RegisterForm />
          <LoginForm />
          {children}
        </main>
        <Footer />
      </GradientColorContainer>
    </div>
  );
}

export default LayoutProvider;

"use client";

import React from "react";
import Footer from "./footer/footer";
import { ToastContainer } from "react-toastify";
import Navbar from "./navbar/Navbar";
import CartSidebar from "../cartclient/CartSideBar";
import GradientColorContainer from "../Containers/BackGroundImageContainer";
import { usePathname } from "@/i18n/routing";
import { PrimeReactProvider } from "primereact/api";
import AuthLayout from "@/components/auth/authLayout";
import "primereact/resources/themes/saga-blue/theme.css";
import 'primereact/resources/primereact.css'; // PrimeReact stilleri

interface RoutesLayoutProps {
  children: React.ReactNode;
}

function LayoutProvider({ children }: RoutesLayoutProps) {
  const path = usePathname();

  return (
    <div className={`flex flex-col `}>
      <PrimeReactProvider>
        <GradientColorContainer>
          {path.startsWith("/admin") ? null : <Navbar />}
          <ToastContainer position={"bottom-center"} autoClose={3000} />
          <main
            className={`${
              path.startsWith("/admin") ? "" : "flex-grow mt-14 md:mt-[65px]"
            }`}
          >
            <CartSidebar />
            <AuthLayout />
            {children}
          </main>
          {path.startsWith("/admin") ? null : <Footer />}
        </GradientColorContainer>
      </PrimeReactProvider>
    </div>
  );
}

export default LayoutProvider;

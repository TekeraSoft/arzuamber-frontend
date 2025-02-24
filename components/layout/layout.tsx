"use client";

import React from "react";
import Footer from "./footer/footer";
import { ToastContainer } from "react-toastify";
import Navbar from "./navbar/Navbar";
import CartSidebar from "../cartclient/CartSideBar";
import GradientColorContainer from "../Containers/BackGroundImageContainer";
import { usePathname } from "@/i18n/routing";
import { PrimeReactProvider } from "primereact/api";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";

interface RoutesLayoutProps {
  children: React.ReactNode;
}

function LayoutProvider({ children }: RoutesLayoutProps) {
  const path = usePathname();

  const { isRegisterModalOpen, isLoginModalOpen } = useSelector(
    (state: RootState) => state.modals
  );

  // Lazy load için modalları dinamik olarak içe aktar
  const RegisterForm = dynamic(() => import("../auth/RegisterForm"), {
    ssr: false,
  });
  const LoginForm = dynamic(() => import("../auth/LoginForm"), { ssr: false });

  return (
    <div className={`flex flex-col `}>
      <PrimeReactProvider>
        <GradientColorContainer>
          {path.startsWith("/admin") ? null : <Navbar />}
          <ToastContainer position={"top-center"} />
          <main
            className={`${
              path.startsWith("/admin") ? "" : "flex-grow mt-14 md:mt-[65px]"
            }`}
          >
            <CartSidebar />
            {/* Modalları sadece açık olduklarında render et */}
            {isRegisterModalOpen && <RegisterForm />}
            {isLoginModalOpen && <LoginForm />}

            {children}
          </main>
          {path.startsWith("/admin") ? null : <Footer />}
        </GradientColorContainer>
      </PrimeReactProvider>
    </div>
  );
}

export default LayoutProvider;

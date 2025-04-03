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
import ScrollToTop from "../utils/ScrollToTop";
import LayoutSocialButtons from "../utils/LayoutSocialButtons";
import HowToBuyModal from "../modals/HowToBuyModal";
import Cookies from "./Cookies/Cookies";
import "primereact/resources/themes/lara-light-purple/theme.css";
import "primereact/resources/primereact.css";

interface RoutesLayoutProps {
  children: React.ReactNode;
}

function LayoutProvider({ children }: RoutesLayoutProps) {
  const path = usePathname();

  return (
    <div className={`flex flex-col  `}>
      <PrimeReactProvider>
        <GradientColorContainer>
          {path.startsWith("/admin") ? null : <Navbar />}
          <ToastContainer position={"bottom-center"} autoClose={3000} />
          <main
            className={` overflow-x-hidden overflow-y-hidden  ${
              path.startsWith("/admin") ? "" : "flex-grow mt-36 md:mt-40"
            }`}
          >
            <CartSidebar />
            <HowToBuyModal />
            <AuthLayout />
            {children}
            <ScrollToTop />
            <LayoutSocialButtons />
            <Cookies />
          </main>
          {path.startsWith("/admin") ? null : <Footer />}
        </GradientColorContainer>
      </PrimeReactProvider>
    </div>
  );
}

export default LayoutProvider;

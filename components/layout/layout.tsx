"use client";

import React, { useEffect } from "react";

import Footer from "./footer/footer";
import { ToastContainer } from "react-toastify";
import Navbar from "./navbar/Navbar";
import RegisterForm from "../auth/RegisterForm";
import LoginForm from "../auth/LoginForm";
import CartSidebar from "../cartclient/CartSideBar";
import GradientColorContainer from "../Containers/BackGroundImageContainer";
import { usePathname } from "@/i18n/routing";
import { PrimeReactProvider } from "primereact/api";
import { useRouter } from "next/navigation";

interface RoutesLayoutProps {
  children: React.ReactNode;
}

function LayoutProvider({ children }: RoutesLayoutProps) {
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (path.startsWith("/profile")) {
      // '/profile' sayfasına gidilmeye çalışıldığında anasayfaya yönlendir
      router.push("/");
    }
  }, [path, router]);

  return (
    <div className={`flex flex-col `}>
      <PrimeReactProvider>
        <GradientColorContainer>
          {path.startsWith("/admin") ? null : <Navbar />}
          <ToastContainer position={"bottom-right"} />
          <main
            className={`${
              path.startsWith("/admin") ? "" : "flex-grow mt-14 md:mt-24"
            }`}
          >
            <CartSidebar />
            <RegisterForm />
            <LoginForm />
            {children}
          </main>
          {path.startsWith("/admin") ? null : <Footer />}
        </GradientColorContainer>
      </PrimeReactProvider>
    </div>
  );
}

export default LayoutProvider;

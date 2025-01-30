"use client";

import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="h-full min-h-screen flex items-center justify-center bg-[url('/images/Brand/single-campaign.png')] bg-cover bg-center p-6 bg-opacity-75 overflow-hidden">
      {children}
    </div>
  );
}

export default AuthLayout;

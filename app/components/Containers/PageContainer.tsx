import React from "react";

function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto w-full h-full min-h-screen ">
      {children}
    </div>
  );
}

export default PageContainer;

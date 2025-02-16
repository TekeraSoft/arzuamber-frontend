import React from "react";

function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto w-full h-full mb-20 mt-32">
      {children}
    </div>
  );
}

export default PageContainer;

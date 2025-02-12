import React from "react";

function GradientColorContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-repeat bg-[url('/images/background/bg1.png')]  ">
      {children}
    </div>
  );
}

export default GradientColorContainer;

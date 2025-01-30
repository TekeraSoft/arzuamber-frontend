import React from "react";

function GradientColorContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className=" bg-gradient-to-t from-white to-secondary">{children}</div>
  );
}

export default GradientColorContainer;

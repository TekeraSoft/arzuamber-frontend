import React from "react";

function HomeContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="SliderContainer mx-auto w-full h-full">{children}</div>
  );
}

export default HomeContainer;

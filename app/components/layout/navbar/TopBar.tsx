import React from "react";

function TopBar() {
  return (
    <div className="top-bar hidden md:flex justify-center items-center bg-secondaryLight text-sm py-2">
      Up to <span className="text-myblack px-1">50% Off</span> on New Season
      Products!!!
      <span className="text-myblack px-1 cursor-pointer hover:underline">
        Check it out!
      </span>
    </div>
  );
}

export default TopBar;

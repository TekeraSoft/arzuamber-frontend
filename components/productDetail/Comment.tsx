"use client";

import React, { useState } from "react";
import Avatar from "../general/Avatar";

import { Rating } from "@mui/material";
import { Review } from "@/types/Props";

function Comment({ prd }: { prd: Review }) {
  const [isExpanded, setIsExpanded] = useState(false); // "Daha Fazla" ve "Daha Az" için state

  const toggleExpand = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <div className="flex flex-wrap md:flex-nowrap items-start gap-4 p-4 md:p-6  border-b  mb-6 w-full">
      {/* Kullanıcı Avatarı */}
      <div className="w-16 h-16 relative rounded-full border border-black p-2 flex-shrink-0">
        <Avatar
          image={
            prd?.user?.image
              ? prd?.user?.image
              : "https://res.cloudinary.com/dgoothqal/image/upload/v1730673960/avatar3_oronth.png"
          }
        />
      </div>

      {/* Kullanıcı Bilgileri ve Yorumlar */}
      <div className="flex flex-col flex-grow">
        {/* Kullanıcı İsmi ve Tarih */}
        <div className="flex items-center justify-between">
          <div className="font-semibold text-lg text-gray-700">
            {prd?.user?.name || "User"}
          </div>
          <p className="text-gray-500 text-sm">{prd.createDate}</p>
        </div>

        {/* Kullanıcı Oylaması */}
        <Rating
          name="read-only"
          value={prd.rating}
          precision={0.5}
          readOnly
          size="small"
          className="mt-1"
        />

        {/* Kullanıcı Yorumu */}
        <div
          className={`text-gray-600 mt-2 ${
            !isExpanded && prd.comment.length > 150
              ? "line-clamp-2 md:line-clamp-4"
              : ""
          }`}
        >
          {prd.comment}
        </div>

        {/* "Daha Fazla" ve "Daha Az" Butonu */}
        {prd.comment.length > 150 && (
          <button
            onClick={toggleExpand}
            className="text-primary hover:underline mt-2 text-sm"
          >
            {isExpanded ? "Daha Az" : "Daha Fazla"}
          </button>
        )}
      </div>
    </div>
  );
}

export default Comment;

"use client";

import { BlogProps } from "@/types/Props";
import React, { useState } from "react";
import { FaCalendar, FaShareAlt } from "react-icons/fa";
import PageContainer from "../Containers/PageContainer";
import Image from "next/image";
import { Snackbar, SnackbarContent } from "@mui/material";
import Button from "../general/Button";
import { useTranslations } from "next-intl";

function BlogClient({ blog }: { blog: BlogProps }) {
  const t = useTranslations();

  //Copy
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.href); // Sayfa linkini kopyalar

    setOpenSnackbar(true); // Snackbar'ı aç
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); // Snackbar'ı kapat
  };

  return (
    <PageContainer>
      <div className="bg-white shadow-lg rounded-lg h-full py-5 mb-5 ">
        {/* Blog Image */}
        <div className="w-full h-[300px] sm:h-[400px] md:h-[550px] relative">
          <Image
            src={blog.image}
            alt={blog.title}
            priority
            fill
            className="rounded-t-lg object-cover"
          />
        </div>

        {/* Blog Content */}
        <div className="p-6">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-primary mb-4  ">
            {blog.title}
          </h1>
          <hr className=" my-2 bg-secondary" />
          {/* Author & Date */}
          <div className="flex items-center text-gray-600 text-sm mb-3">
            <div className="flex items-center mr-6">
              <FaCalendar className="mr-2 text-secondary text-md md:text-xl" />
              <span className="text-gray-800  text-lg">{blog.date}</span>
            </div>
            <div className="flex items-center ">
              <Button
                size="icon"
                iconSize={15}
                icon={FaShareAlt}
                onClick={handleShareClick}
              />

              <Snackbar
                open={openSnackbar}
                autoHideDuration={1500}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              >
                <SnackbarContent
                  message="Share Link Copied ✓ "
                  sx={{
                    backgroundColor: "#8174A0",
                    color: "white",
                  }}
                />
              </Snackbar>
            </div>
          </div>

          {/* Blog Category */}
          {blog.category && (
            <div className="mb-3 flex items-center justify-start gap-1">
              <span className="text-sm text-primary font-semibold">
                {t("blogPage.category")}:
              </span>
              <span className="text-secondary text-base bg-gray-200 py-1 px-2 rounded-md">
                {blog.category}
              </span>
            </div>
          )}

          {/* Blog Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mb-4 flex  justify-start items-center gap-1 w-full">
              <p className="text-md text-primary font-semibold ">
                {t("blogPage.Tags")}:
              </p>
              <ul className="flex flex-wrap gap-2 w-full">
                {blog.tags.map((tag, index) => (
                  <li
                    key={index}
                    className="text-secondary text-xs bg-gray-200 py-1 px-3 rounded-md"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <hr className=" my-2 bg-secondary" />
          {/* Description */}
          <p className="text-gray-700 leading-relaxed text-sm md:text-md">
            {blog.description}
          </p>
        </div>
      </div>
    </PageContainer>
  );
}

export default BlogClient;

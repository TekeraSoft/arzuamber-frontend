"use client";

import { BlogProps } from "@/types/Props";
import React, { useState } from "react";
import { FaShareAlt } from "react-icons/fa";
import PageContainer from "../Containers/PageContainer";
import Image from "next/image";
import { Snackbar, SnackbarContent } from "@mui/material";
import Button from "../general/Button";
import { useTranslations } from "next-intl";
// import NextSeoHead from "../utils/NextSeoHead";

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
      {/* <NextSeoHead
        name={blog.title}
        description={blog.content}
        image={blog.image}
      /> */}

      <div className=" shadow-lg rounded-lg h-full py-5 mb-5 ">
        {/* Blog Image */}
        <div className="w-full h-[300px] sm:h-[400px] md:h-[550px] relative">
          <Image
            src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${blog.image}`}
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
                  message="Paylaşım linki kopyalandı. "
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

          <hr className=" my-2 bg-secondary" />
          {/* Description */}
          <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
        </div>
      </div>
    </PageContainer>
  );
}

export default BlogClient;

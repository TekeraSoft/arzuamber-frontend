// components/BlogItem.tsx
import React from "react";
import Image from "next/image";
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import { Link } from "@/i18n/routing";
import { BlogProps } from "@/types/Props";
import { useTranslations } from "next-intl";

const BlogCartItem = ({ blog }: { blog: BlogProps }) => {
  const t = useTranslations();

  return (
    <div className=" shadow-md rounded-lg p-5 flex flex-col justify-center items-center">
      <Link href={`/blog/${blog.slug}`}>
        <div className="relative w-full h-56 sm:h-72 lg:h-72">
          <Image
            className="object-cover w-full h-full rounded-lg"
            src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${blog.image}`}
            alt={blog.title}
            width={400}
            height={300}
            priority
            unoptimized
          />
        </div>
      </Link>
      <span className="inline-flex px-3 py-1 text-xs font-semibold tracking-widest uppercase rounded-full mt-6 bg-indigo-100 text-primary">
        {blog.category}
      </span>
      <p className="mt-4 text-lg font-semibold ">
        <Link
          href={`/blog/${blog.slug}`}
          className="text-primary hover:underline line-clamp-1 "
        >
          {blog.title}
        </Link>
      </p>
      <p className="mt-3 text-gray-600 line-clamp-2 text-sm">{blog.content}</p>
      <div className="h-0 mt-6 mb-4 border-t-2 border-gray-200 border-dashed"></div>

      <div className="flex items-center justify-between gap-2 text-xs font-bold tracking-widest text-gray-500 uppercase w-full">
        <div className="flex">
          <FaCalendarAlt className="mr-2 text-gray-400 text-sm" />
          {blog.date}
        </div>
        <p className=" text-sm md:text-md flex justify-end items-center ">
          <Link
            href={`/blog/${blog.slug}`}
            className="flex items-center text-primary font-semibold transition duration-300 text-xs hover:underline underline-offset-1"
          >
            <span className="mr-2">{t("blogPage.readMore")}</span>
            <FaArrowRight />
          </Link>
        </p>
      </div>
    </div>
  );
};

export default BlogCartItem;

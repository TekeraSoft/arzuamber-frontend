"use client";

import PageContainer from "@/components/Containers/PageContainer";
import Loading from "@/components/utils/Loading";
import { Link } from "@/i18n/routing";
import { RootState } from "@/store/store";
import Image from "next/image";
import {
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
  FaArrowRight,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import React from "react";
import NotFoundPage from "@/components/utils/WarningText";
import { useTranslations } from "next-intl";

export default function BlogsPage() {
  const t = useTranslations();
  const { blogs, loading } = useSelector((state: RootState) => state.blogs);
  const [currentPage, setCurrentPage] = React.useState(0);
  const blogsPerPage = 6; // Adjust the number of blogs per page

  // Handle the pagination
  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  if (loading) {
    return (
      <PageContainer>
        <Loading />
      </PageContainer>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <NotFoundPage
        title={t("blogPage.NoBlogsTitle")}
        text={t("blogPage.NoBlogsText")}
      />
    );
  }

  // Slice the blogs to show only the current page's blogs
  const startIndex = currentPage * blogsPerPage;
  const currentBlogs = blogs.slice(startIndex, startIndex + blogsPerPage);

  return (
    <>
      <PageContainer>
        <section className="all-blogs-main-div border-t my-3  rounded-lg">
          <div className="px-2 mx-auto sm:px-4 lg:px-0 max-w-7xl">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl mt-5">
                Latest from Blog
                {/* {t("blogPage.title")} */}
              </h2>
              <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">
                Blogumuzda en son makaleler, ipuçları ve içgörüleri takip edin.
                Düzenli olarak heyecan verici yeni içerikler keşfedin.
                {/* {t("blogPage.text")} */}
              </p>
            </div>

            {/* Blogs list */}
            <div className="grid grid-cols-1 gap-4 mt-12 md:grid-cols-2 lg:grid-cols-3">
              {currentBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className="bg-white shadow-lg rounded-lg p-5 flex flex-col justify-center items-center"
                >
                  <Link href={`/blog/${blog.id}`}>
                    <div className="relative w-full h-56 sm:h-72 lg:h-72">
                      <Image
                        className="object-cover w-full h-full rounded-lg"
                        src={blog.image}
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
                      href={`/blog/${blog.id}`}
                      className="text-primary hover:underline "
                    >
                      {blog.title}
                    </Link>
                  </p>
                  <p className="mt-3 text-gray-600 line-clamp-2 text-sm">
                    {blog.description}
                  </p>
                  <div className="h-0 mt-6 mb-4 border-t-2 border-gray-200 border-dashed"></div>

                  <div className="flex items-center justify-between gap-2 text-xs font-bold tracking-widest text-gray-500 uppercase w-full">
                    <div className="flex">
                      <FaCalendarAlt className="mr-2 text-gray-400 text-sm" />
                      {blog.date}
                    </div>
                    <p className=" text-sm md:text-md flex justify-end items-center ">
                      <Link
                        href={`/blog/${blog.id}`}
                        className="flex items-center text-primary font-semibold transition duration-300 text-xs hover:underline underline-offset-1"
                      >
                        <span className="mr-2">
                          {t("blogPage.blogsPageButton")}
                        </span>
                        <FaArrowRight />
                      </Link>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-5">
              <ReactPaginate
                previousLabel={<FaChevronLeft className="text-gray-600" />}
                nextLabel={<FaChevronRight className="text-gray-600" />}
                pageCount={Math.ceil(blogs.length / blogsPerPage)}
                onPageChange={handlePageChange}
                containerClassName="flex items-center space-x-3"
                pageClassName="px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 hover:text-black cursor-pointer"
                activeClassName="bg-secondary text-white"
                breakClassName="px-4 py-2 text-gray-500"
                pageLinkClassName="cursor-pointer"
                breakLinkClassName="cursor-pointer"
                disabledClassName="cursor-not-allowed text-gray-400"
              />
            </div>
          </div>
        </section>
      </PageContainer>
    </>
  );
}

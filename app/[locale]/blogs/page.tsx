"use client";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import React, { useEffect, useState } from "react";
import PageContainer from "@/components/Containers/PageContainer";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import Loading from "@/components/utils/Loading";
import BlogCartItem from "@/components/blogs/BlogItem";
import { getBlogsDispatch } from "@/store/blogSlice";

import NotFoundBlogs from "@/components/error/NotFoundBlogs";

function AllBlog() {
  const dispatch = useDispatch<AppDispatch>();
  const t = useTranslations();
  const { blogs, loading, page } = useSelector(
    (state: RootState) => state.blog
  );
  const [pageable, setPageable] = useState({ currentPage: 0, size: 9 });

  useEffect(() => {
    dispatch(getBlogsDispatch(pageable.currentPage, pageable.size));
  }, [pageable.currentPage, pageable.size, dispatch]);

  if (loading) return <Loading />;

  return (
    <PageContainer>
      <section className="all-blogs-main-div border-t my-3 rounded-lg">
        <div className="px-2 mx-auto sm:px-4 lg:px-0 max-w-7xl">
          {blogs && blogs.length > 0 ? (
            // Blog listesi
            <>
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl mt-5">
                  {t("blogPage.title")}
                </h2>
                <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">
                  {t("blogPage.text")}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 mt-12 md:grid-cols-2 lg:grid-cols-3">
                {blogs.map((blog, index) => (
                  <BlogCartItem key={index} blog={blog} />
                ))}
              </div>
            </>
          ) : (
            <NotFoundBlogs />
          )}
        </div>
      </section>
    </PageContainer>
  );
}

export default AllBlog;

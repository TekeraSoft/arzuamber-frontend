"use client";

import BlogClient from "@/components/blogDetail/BlogClient";
import Loading from "@/components/utils/Loading";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogDispatch } from "@/store/blogSlice";
import { useParams } from "next/navigation";
// import { useTranslations } from "next-intl";
import NotFoundBlog from "@/components/error/notFoundBlog";

function BlogPage() {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const { blog, loading } = useSelector((state: RootState) => state.blog);
  // const t = useTranslations();

  useEffect(() => {
    dispatch(getBlogDispatch(params.slug));
  }, [params.slug, dispatch]);

  return (
    <div>
      {loading || !params.slug ? (
        <Loading />
      ) : blog ? (
        <BlogClient blog={blog} />
      ) : (
        <NotFoundBlog />
      )}
    </div>
  );
}
export default BlogPage;

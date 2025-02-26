"use client";

import BlogClient from "@/components/blogDetail/BlogClient";
import Loading from "@/components/utils/Loading";
import WarningText from "@/components/utils/WarningText";
import {AppDispatch, RootState} from "@/store/store";
import { BlogProps } from "@/types/Props";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {getBlogDispatch} from "@/store/blogSlice";
import {useParams} from "next/navigation";
import {useTranslations} from "next-intl";

function BlogPage() {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const { blog, loading } = useSelector((state: RootState) => state.blog);
  const t = useTranslations();

  useEffect(() => {
   dispatch(getBlogDispatch(params.slug))
  }, [params.slug]);

  return (
    <div>
      {loading || !params.slug ? (
        <Loading />
      ) : blog ? (
        <BlogClient blog={blog} />
      ) : (
        <WarningText
           title={t("warningText.BlogNotFoundTitle")}
           text={t("warningText.BlogNotFoundText")}
        />
      )}
    </div>
  );
}
export default BlogPage;

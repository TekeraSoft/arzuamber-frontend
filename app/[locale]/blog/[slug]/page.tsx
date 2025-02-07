"use client";

import BlogClient from "@/components/blogDetail/BlogClient";
import Loading from "@/components/utils/Loading";
import WarningText from "@/components/utils/WarningText";
import { RootState } from "@/store/store";
import { BlogProps } from "@/types/Props";
// import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState<string | null>(null);
  const { blogs, loading } = useSelector((state: RootState) => state.blogs);
  // const t = useTranslations("warningText");

  useEffect(() => {
    const fetchSlug = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    };

    fetchSlug();
  }, [params]);

  const blog = blogs.find((blog: BlogProps) => blog.id === slug);

  return (
    <div>
      {loading || !slug ? (
        <Loading />
      ) : blog ? (
        <BlogClient blog={blog} />
      ) : (
        <WarningText
          title="Blog Not Found"
          text="The blog you're looking for could not be found."
          // title={t("warningText.BlogNotFoundTitle")}
          // text={t("warningText.BlogNotFoundText")}
        />
      )}
    </div>
  );
}
export default BlogPage;

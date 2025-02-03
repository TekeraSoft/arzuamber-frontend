import { BlogProps } from "@/types/Props";
import React from "react";
import PageContainer from "../Containers/PageContainer";

function BlogClient({ blog }: { blog: BlogProps }) {
  return (
    <PageContainer>
      <h1>{blog.title}</h1>
      <p>{blog.description}</p>
    </PageContainer>
  );
}

export default BlogClient;

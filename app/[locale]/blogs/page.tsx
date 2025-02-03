"use client";

import PageContainer from "@/components/Containers/PageContainer";
import Loading from "@/components/utils/Loading";
import { Link } from "@/i18n/routing";
import { RootState } from "@/store/store";
import Image from "next/image";
import { FaCalendarAlt, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function BlogsPage() {
  const { blogs, loading } = useSelector((state: RootState) => state.blogs);

  if (loading) {
    return (
      <PageContainer>
        <Loading />
      </PageContainer>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-lg font-semibold text-gray-600">
            No blogs available.
          </p>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <section className="py-10 bg-white sm:py-16 lg:py-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
              Latest from Blog
            </h2>
            <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis.
            </p>
          </div>

          <div className="grid max-w-md grid-cols-1 mx-auto mt-12 lg:max-w-full lg:mt-16 lg:grid-cols-3 gap-x-16 gap-y-12">
            {blogs.map((blog) => (
              <div key={blog.id}>
                <Link href={`/blog/${blog.id}`}>
                  <div className="relative aspect-[4/3]">
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
                <span
                  className={`inline-flex px-4 py-2 text-xs font-semibold tracking-widest uppercase rounded-full  mt-6`}
                >
                  {blog.category}
                </span>
                <p className="mt-4 text-xl font-semibold">
                  <Link
                    href={`/blogs/${blog.id}`}
                    className="text-black hover:underline"
                  >
                    {blog.title}
                  </Link>
                </p>
                <p className="mt-3 text-gray-600">{blog.description}</p>
                <div className="h-0 mt-6 mb-4 border-t-2 border-gray-200 border-dashed"></div>
                <div className="flex items-center text-sm font-bold tracking-widest text-gray-500 uppercase">
                  <FaUser className="mr-2 text-gray-400" /> {blog.author}
                  <span className="mx-2">•</span>
                  <FaCalendarAlt className="mr-2 text-gray-400" /> {blog.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageContainer>
  );
}

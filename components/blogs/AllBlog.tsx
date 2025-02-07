import React from "react";
import PageContainer from "../Containers/PageContainer";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
// import { useTranslations } from "next-intl";
import Loading from "../utils/Loading";
import NotFoundPage from "../utils/WarningText";
import BlogCartItem from "./BlogItem";

function AllBlog() {
  //   const t = useTranslations();
  const { blogs, loading } = useSelector((state: RootState) => state.blogs);
  const [currentPage, setCurrentPage] = React.useState(0);
  const blogsPerPage = 6; // Adjust the number of blogs per page

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
        title="No Blogs Title"
        text="blogPage.NoBlogsText"
        // title={t("blogPage.NoBlogsTitle")}
        // text={t("blogPage.NoBlogsText")}
      />
    );
  }

  // Handle the pagination
  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  // Slice the blogs to show only the current page's blogs
  const startIndex = currentPage * blogsPerPage;
  const currentBlogs = blogs.slice(startIndex, startIndex + blogsPerPage);

  return (
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
          <div className="grid grid-cols-1 gap-4 mt-12 md:grid-cols-2 lg:grid-cols-3 ">
            {currentBlogs.map((blog) => (
              <BlogCartItem key={blog.id} blog={blog} /> // BlogItem kullanımı
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
  );
}

export default AllBlog;

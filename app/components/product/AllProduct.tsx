"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Loading from "@/app/components/utils/Loading";
import ProductCartItem from "./ProductCartItem";
import Heading from "../general/Heading";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Filter from "../general/Filter";

function AllProduct() {
  const { products, loading } = useSelector(
    (state: RootState) => state.products
  );

  // Sayfa başına ürün sayısı
  const productsPerPage = 8;

  // Sayfaları takip etmek için state
  const [currentPage, setCurrentPage] = React.useState(0);

  // Sayfa değiştiğinde çalışacak fonksiyon
  const handlePageClick = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  // Sayfa başına ürünleri almak
  const offset = currentPage * productsPerPage;
  const currentProducts = products.slice(offset, offset + productsPerPage);

  // Toplam sayfa sayısını hesaplamak
  const pageCount = Math.ceil(products.length / productsPerPage);

  return (
    <main className="mx-auto container  rounded-lg">
      {loading ? (
        <Loading />
      ) : (
        <div className="all-product-main-div">
          <Heading text="All Products" center hr textSize="3xl" />
          <div className="flex w-full h-full mt-3 gap-2">
            <Filter />
            <div className="w-full mb-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-8 items-center ">
                {currentProducts.map((product, i) => (
                  <ProductCartItem product={product} key={i} />
                ))}
              </div>

              <ReactPaginate
                breakLabel="..."
                nextLabel={
                  <span className="flex items-center justify-center w-8 h-8 text-mywhite bg-primary rounded-md hover:bg-primaryLight">
                    <FaChevronRight />
                  </span>
                }
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel={
                  <span className="flex items-center justify-center w-8 h-8 text-mywhite bg-primary rounded-md hover:bg-primaryLight">
                    <FaChevronLeft />
                  </span>
                }
                renderOnZeroPageCount={null}
                containerClassName="flex items-center justify-center space-x-2 mt-4"
                pageClassName="mx-1"
                pageLinkClassName="px-3 py-1 border rounded-md text-mywhite bg-primary hover:bg-secondaryLight"
                activeClassName="font-bold rounded-md border-2 border-third bg-third text-mywhite"
                disabledClassName="text-myblack cursor-not-allowed"
                breakClassName="text-secondary"
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default AllProduct;

"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Loading from "@/components/utils/Loading";
import ProductCartItem from "./ProductCartItem";
import Heading from "../general/Heading";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import { useTranslations } from "next-intl";
// import Filter from "../general/Filter";

function AllProduct() {
  // const t = useTranslations();

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
        <div className="all-product-main-div border-t ">
          <Heading
            text="All Products"
            // text={t("allProduct.allProducts")}
            center
            hr
            textSize="3xl"
          />
          <div className="flex w-full h-full mt-3 gap-2">
            {/* <Filter /> */}

            <div className="w-full mb-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 items-center ">
                {currentProducts.map((product, i) => (
                  <ProductCartItem product={product} key={i} />
                ))}
              </div>

              <div className="flex justify-center mt-5 mb-2">
                <ReactPaginate
                  previousLabel={<FaChevronLeft className="text-gray-600" />}
                  nextLabel={<FaChevronRight className="text-gray-600" />}
                  pageCount={pageCount}
                  onPageChange={handlePageClick}
                  containerClassName="flex items-center space-x-4"
                  pageClassName="px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 hover:text-black cursor-pointer"
                  activeClassName="bg-secondary text-white"
                  breakClassName="px-4 py-2 text-gray-500"
                  pageLinkClassName="cursor-pointer"
                  breakLinkClassName="cursor-pointer"
                  disabledClassName="cursor-not-allowed text-gray-400"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default AllProduct;

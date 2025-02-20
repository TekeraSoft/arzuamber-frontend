"use client";
import Filter from "@/components/general/Filter/Filter";
import ProductCartItem from "@/components/products/ProductCartItem";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getAllProductsDispatch } from "@/store/productSlice";
import Loading from "@/components/utils/Loading";
import { useTranslations } from "next-intl";

function Products() {
  const dispatch = useDispatch<AppDispatch>();
  const t = useTranslations();

  const { products, filterProducts, loading } = useSelector(
    (state: RootState) => state.products
  );

  // Sayfa başına ürün sayısı
  const productsPerPage = 6;

  // Toplam sayfa sayısını hesaplamak
  const pageCount = Math.ceil(products.length / productsPerPage);

  useEffect(() => {
    dispatch(getAllProductsDispatch(0, 25));
  }, [dispatch]);

  return (
    <main className="mx-auto container  rounded-lg">
      <div className="all-product-main-div border-t grid gap- ">
        <div className="flex w-full h-full  gap-2 items-start justify-center mt-4">
          <Filter />

          <div className="w-full mb-3 h-full">
            <h2 className="text-center mb-5 text-3xl pb-2 font-semibold ">
              {t("allProduct.allProducts")}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-3 gap-6  items-start ">
              {loading ? (
                <Loading />
              ) : filterProducts.length > 0 ? (
                filterProducts.map((product, i) => (
                  <ProductCartItem product={product} key={i} />
                ))
              ) : (
                products.map((product, i) => (
                  <ProductCartItem product={product} key={i} />
                ))
              )}
            </div>

            {/*
            <div className="flex justify-center mt-5 mb-2">
              <ReactPaginate
                previousLabel={<FaChevronLeft className="text-gray-600" />}
                nextLabel={<FaChevronRight className="text-gray-600" />}
                pageCount={pageCount}
                containerClassName="flex items-center space-x-4"
                pageClassName="px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 hover:text-black cursor-pointer"
                activeClassName="bg-secondary text-white"
                breakClassName="px-4 py-2 text-gray-500"
                pageLinkClassName="cursor-pointer"
                breakLinkClassName="cursor-pointer"
                disabledClassName="cursor-not-allowed text-gray-400"
              />
            </div>
            */}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Products;

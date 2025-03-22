"use client";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import Filter from "@/components/general/Filter/Filter";
import ProductCartItem from "@/components/products/ProductCartItem";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import Loading from "@/components/utils/Loading";
import { useTranslations } from "next-intl";
import { Paginator } from "primereact/paginator";
import NotFoundProduct from "@/components/error/notFoundProduct";
import { getCategoriesDispatch } from "@/store/adminSlice";
import Image from "next/image";
import { setShortCategory } from "@/store/categorySlice";

function Products() {
  const dispatch = useDispatch<AppDispatch>();
  const t = useTranslations("");
  const [pageable, setPageable] = useState({ currentPage: 0, size: 9 });

  const { products, filterProducts, loading, page } = useSelector(
    (state: RootState) => state.products
  );

  const onPageChange = (event) => {
    setPageable({ size: event.rows, currentPage: event.page });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    dispatch(getCategoriesDispatch());
  }, [dispatch]);

  const { categories } = useSelector((state: RootState) => state.category);

  return (
    <main className=" flex flex-col justify-center items-center  w-full   overflow-hidden">
      <div className="flex w-full h-full gap-2 items-start justify-center mt-4 md:mt-0 SliderContainer">
        <Filter currnetPage={pageable.currentPage} pageSize={pageable.size} />

        <div className="w-full my-5 h-full">
          <div
            className="  flex items-center justify-between overflow-x-auto  space-x-4 p-0.5 md:py-0.5 mb-2 "
            style={{
              scrollbarWidth: "none", // Firefox'ta kaydırma çubuğunu gizler
              msOverflowStyle: "none", // Internet Explorer ve Edge tarayıcıları için
            }}
          >
            {categories?.length > 0 &&
              categories.map((category, index) => (
                <div
                  onClick={() => dispatch(setShortCategory(category.name))}
                  key={index}
                  className="flex flex-col items-center justify-center  cursor-pointer"
                >
                  {/* Kategori Resmi ve İsim */}
                  <div className="flex flex-col items-center">
                    {/* Kategori Resmi */}
                    <div className="relative w-12 h-12 md:w-16 md:h-16 mb-2 overflow-hidden rounded-full border-2 border-secondary shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105  hover:border-red-600">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${category.image}`}
                        alt={category.name}
                        fill
                        priority
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>

                    {/* Kategori İsmi */}
                    <h3 className="text-center text-xs md:text-sm max-w-[5rem] truncate">
                      {category.name}
                    </h3>
                  </div>
                </div>
              ))}
          </div>

          {/* <h2 className="text-center my-3 text-3xl pb-2 font-semibold ">
            {t("allProduct.allProducts")}
          </h2>
 */}
          {loading ? (
            <Loading />
          ) : // Ürünler var mı? Ve undefined/null değilse.
          (filterProducts && filterProducts.length > 0) ||
            (products && products.length > 0) ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 items-start">
                {(filterProducts && filterProducts.length > 0
                  ? filterProducts
                  : products
                ).map((product, i) => (
                  <ProductCartItem product={product} key={i} />
                ))}
              </div>

              <Paginator
                className={"my-12 "}
                first={pageable.currentPage * pageable.size}
                rows={pageable.size}
                totalRecords={page.totalElements}
                rowsPerPageOptions={[9, 20, 30]}
                onPageChange={onPageChange}
              />
            </>
          ) : (
            <NotFoundProduct />
          )}
        </div>
      </div>
    </main>
  );
}

export default Products;

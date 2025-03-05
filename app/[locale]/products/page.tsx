"use client";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import Filter from "@/components/general/Filter/Filter";
import ProductCartItem from "@/components/products/ProductCartItem";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import Loading from "@/components/utils/Loading";
import { useTranslations } from "next-intl";
import { Paginator } from "primereact/paginator";
import NotFoundProduct from "@/components/error/notFoundProduct";

function Products() {
  const dispatch = useDispatch<AppDispatch>();
  const t = useTranslations();
  const [pageable, setPageable] = useState({ currentPage: 0, size: 9 });

  const { products, filterProducts, loading, page } = useSelector(
    (state: RootState) => state.products
  );

  const onPageChange = (event) => {
    setPageable({ size: event.rows, currentPage: event.page });
  };

  return (
    <main className="mx-auto container mt-28">
      <div className="flex w-full h-full gap-2 items-start justify-center mt-4">
        <Filter currnetPage={pageable.currentPage} pageSize={pageable.size} />

        <div className="w-full mb-3 h-full">
          <h2 className="text-center mb-5 text-3xl pb-2 font-semibold ">
            {t("allProduct.allProducts")}
          </h2>

          {loading ? (
            <Loading />
          ) : // Ürünler var mı? Ve undefined/null değilse.
          (filterProducts && filterProducts.length > 0) ||
            (products && products.length > 0) ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 items-start">
                {(filterProducts && filterProducts.length > 0
                  ? filterProducts
                  : products
                ).map((product, i) => (
                  <ProductCartItem product={product} key={i} />
                ))}
              </div>

              <Paginator
                className={"my-12 "}
                first={pageable.currentPage}
                rows={pageable.size}
                totalRecords={page.totalElements}
                rowsPerPageOptions={[10, 20, 30]}
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

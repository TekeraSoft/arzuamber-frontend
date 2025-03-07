"use client";

import Loading from "@/components/utils/Loading";
import WarningText from "@/components/utils/WarningText";
import { RootState } from "@/store/store";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Filter from "@/components/general/Filter/Filter";
import { Paginator } from "primereact/paginator";
import ProductCartItem from "@/components/products/ProductCartItem";
import NotFoundProduct from "@/components/error/notFoundProduct";

function CategoryFilteredProducts() {
  const params = useParams();
  const t = useTranslations("");
  const { filterProducts, loading, page } = useSelector(
    (state: RootState) => state.products
  );

  const { slug } = params;

  const [pageable, setPageable] = useState({ currentPage: 0, size: 9 });

  const onPageChange = (event) => {
    setPageable({ size: event.rows, currentPage: event.page });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="mx-auto container mt-28">
      <div className="flex w-full h-full gap-2 items-start justify-center mt-4">
        <Filter
          slug={slug}
          currnetPage={pageable.currentPage}
          pageSize={pageable.size}
        />

        <div className="w-full mb-3 h-full">
          <h2 className="text-center mb-5 text-3xl pb-2 font-semibold ">
            {t("allProduct.allProducts")}
          </h2>

          {loading ? (
            <Loading />
          ) : // Ürünler var mı? Ve undefined/null değilse.
          filterProducts && filterProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 items-start">
                {filterProducts.map((product, i) => (
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

//! lazım
// <WarningText
// title={t("warningText.notFoundFilteredProduct.title")}
// text={t("warningText.notFoundFilteredProduct.message")}
// buttonText={t("warningText.notFoundFilteredProduct.browseMore")}
// href="/products"
// />

export default CategoryFilteredProducts;
